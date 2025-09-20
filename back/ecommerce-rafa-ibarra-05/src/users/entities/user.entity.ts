import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: 'uuid-user-123',
    description: 'ID unico del usuario',
  })
  id: string;

  @ApiProperty({
    example: 'Juan perez',
    description: 'Nombre completo del usuario',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    example: 'juan@gmail.com',
    description: 'Correo electrónico único del usuario',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de teléfono (opcional)',
    maxLength: 20,
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @ApiProperty({
    example: 'Argentina',
    description: 'País de residencia (opcional)',
    maxLength: 50,
    required: false,
  })
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección del usuario (opcional)',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty({
    example: 'Córdoba',
    description: 'Ciudad de residencia (opcional)',
    maxLength: 50,
    required: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @ApiProperty({
    example: false,
    description: 'Indica si el usuario es administrador',
    default: false,
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;
  @ApiProperty({
    type: () => [Order],
    description: 'Lista de órdenes asociadas al usuario',
  })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
