import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
