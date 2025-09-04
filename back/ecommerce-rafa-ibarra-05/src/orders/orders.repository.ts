import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Repository, MoreThan } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { In } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async addOrder(dto: CreateOrderDto): Promise<Order> {
    // 1. Buscar al usuario
    const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // 2. Extraer IDs de productos
    const productIds = dto.products.map((p) => p.id);

    // 3. Buscar productos con stock > 0
    const products = await this.productsRepo.findBy({
      id: In(productIds),
      stock: MoreThan(0),
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException(
        'Algún producto no existe o no tiene stock suficiente',
      );
    }

    // 4. Restar 1 unidad de stock por producto
    for (const product of products) {
      product.stock -= 1;
      await this.productsRepo.save(product);
    }

    // 5. Calcular precio total
    const totalPrice = products.reduce(
      (acc, product) => acc + Number(product.price),
      0,
    );

    // 6. Crear y guardar detalle de orden
    const detail = this.orderDetailRepo.create({
      price: totalPrice,
      products,
    });
    await this.orderDetailRepo.save(detail);

    // 7. Crear y guardar la orden
    const order = this.ordersRepo.create({
      user,
      date: new Date(),
      detail,
    });
    return this.ordersRepo.save(order);
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: ['detail', 'detail.products'],
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }
}
