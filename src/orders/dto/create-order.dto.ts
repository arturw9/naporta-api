import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator'
import { Type } from 'class-transformer'
import { IsPositiveNumber } from 'src/common/validators/is-positive-number'
import { IsCPF } from 'src/common/validators/is-cpf'
import { IsFutureDate } from 'src/common/validators/is-future-date'

class OrderItemDto {
  @ApiProperty({ example: 'Produto X' })
  @IsString()
  @IsNotEmpty()
  description!: string

  @ApiProperty({ example: 99.9 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositiveNumber()
  price!: number
}

export class CreateOrderDto {
  @ApiProperty({ example: 'PED-001' })
  @IsString()
  @IsNotEmpty()
  orderNumber!: string

  @ApiProperty({ example: '2026-06-20' })
  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate()
  expectedDeliveryDate!: string

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  customerName!: string

  @ApiProperty({ example: '12345678900' })
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  customerDocument!: string

  @ApiProperty({ example: 'Rua A, 123' })
  @IsString()
  @IsNotEmpty()
  deliveryAddress!: string

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[]
}