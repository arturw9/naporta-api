import { PartialType } from '@nestjs/mapped-types'
import { CreateOrderDto } from './create-order.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsNotEmpty, IsString } from 'class-validator'
import { OrderStatus } from '@prisma/client'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiPropertyOptional({ example: 'João Silva' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    customerName?: string

    @ApiPropertyOptional({ example: 'Rua A, 123' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    deliveryAddress?: string

    @ApiPropertyOptional({
        enum: OrderStatus,
        example: OrderStatus.DELIVERED,
    })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus
}