import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({
    example: 'uuid-cat-123',
    description: 'ID único de la categoría',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Monitor',
    description: 'Nombre de la categoría. Debe ser único.',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    type: () => [Product],
    description: 'Lista de productos asociados a esta categoría',
  })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
