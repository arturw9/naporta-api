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
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UpdateOrderDto } from './dto/update-order.dto'
import { FindOrdersQueryDto } from './dto/find-orders-query.dto'

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) { }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo pedido',
    description:
      'Cria um pedido no sistema com cliente, endereço e itens vinculados.',
  })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação dos dados' })
  @ApiResponse({ status: 401, description: 'Não autorizado (token inválido)' })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({
    summary: 'Listar pedidos',
    description:
      'Retorna todos os pedidos cadastrados, com possibilidade de filtros por número, status e datas.',
  })
  @ApiResponse({ status: 200, description: 'Lista de pedidos retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Nenhum pedido encontrado' })
  findAll(@Query() query: FindOrdersQueryDto) {
    return this.service.findAll(query)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar pedido',
    description:
      'Atualiza dados de um pedido existente, incluindo status, cliente, endereço, data ou itens.',
  })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação dos dados' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  @ApiBody({
    type: UpdateOrderDto,
    examples: {
      exemplo1: {
        summary: 'Exemplo de atualização de pedido',
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
  @ApiOperation({
    summary: 'Excluir pedido',
    description:
      'Remove um pedido do sistema (exclusão lógica, mantendo histórico).',
  })
  @ApiResponse({ status: 200, description: 'Pedido removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}