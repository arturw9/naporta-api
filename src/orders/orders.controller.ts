import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrdersService } from './orders.service'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { UpdateOrderDto } from './dto/update-order.dto'
import { FindOrdersQueryDto } from './dto/find-orders-query.dto'

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() query: FindOrdersQueryDto) {
    return this.service.findAll(query)
  }

  @Put(':id')
  @ApiBody({
    type: UpdateOrderDto,
    examples: {
      exemplo1: {
        summary: 'Atualização de pedido',
        value: {
          customerName: 'João Silva',
          customerDocument: '12345678900',
          deliveryAddress: 'Rua A, 123',
          expectedDeliveryDate: '2026-06-20',
          status: 'DELIVERED',
          items: [
            {
              description: 'Produto Atualizado',
              price: 199.9,
            },
          ],
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
