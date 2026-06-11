import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { FindOrdersQueryDto } from './dto/find-orders-query.dto'
import { OrderStatus } from '@prisma/client'
import { OrderFilterBuilder } from './builders/order-filter.builder'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateOrderDto) {
    await this.ensureOrderNumberIsAvailable(dto.orderNumber)

    return this.prisma.order.create({
      data: this.buildCreatePayload(dto),
      include: { items: true },
    })
  }

  async update(id: string, dto: UpdateOrderDto) {
    await this.ensureOrderExists(id)

    return this.prisma.order.update({
      where: { id },
      data: this.buildUpdatePayload(dto),
      include: { items: true },
    })
  }

  async findAll(filters: FindOrdersQueryDto) {
    const where = new OrderFilterBuilder(filters).build()

    const orders = await this.prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })

    this.ensureOrdersFound(orders)

    return orders
  }

  async remove(id: string) {
    await this.ensureOrderExists(id)

    return this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }

  private buildCreatePayload(dto: CreateOrderDto) {
    return {
      orderNumber: dto.orderNumber,
      expectedDeliveryDate: new Date(dto.expectedDeliveryDate),
      customerName: dto.customerName,
      customerDocument: dto.customerDocument,
      deliveryAddress: dto.deliveryAddress,
      items: { create: dto.items },
    }
  }

  private buildUpdatePayload(dto: UpdateOrderDto) {
    const { items, expectedDeliveryDate, ...rest } = dto

    return {
      ...rest,
      expectedDeliveryDate: expectedDeliveryDate
        ? new Date(expectedDeliveryDate)
        : undefined,
      items: items
        ? {
          deleteMany: {},
          create: items,
        }
        : undefined,
    }
  }

  private buildWhere(filters: FindOrdersQueryDto) {
    return {
      deletedAt: null,
      ...(filters.number && {
        orderNumber: { contains: filters.number },
      }),
      ...(filters.status && {
        status: this.parseStatus(filters.status),
      }),
      ...this.buildDateFilter(filters),
    }
  }

  private buildDateFilter(filters: FindOrdersQueryDto) {
    if (!filters.startDate && !filters.endDate) return {}

    return {
      expectedDeliveryDate: {
        ...(filters.startDate && {
          gte: new Date(filters.startDate),
        }),
        ...(filters.endDate && {
          lte: new Date(filters.endDate),
        }),
      },
    }
  }

  private parseStatus(status: string) {
    const normalized = status.toUpperCase()

    if (!(normalized in OrderStatus)) {
      return undefined
    }

    return OrderStatus[normalized as keyof typeof OrderStatus]
  }

  private async ensureOrderNumberIsAvailable(orderNumber: string) {
    const exists = await this.prisma.order.findUnique({
      where: { orderNumber },
    })

    if (exists) {
      throw new ConflictException(
        `Já existe um pedido com o número ${orderNumber}`,
      )
    }
  }

  private async ensureOrderExists(id: string) {
    const exists = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!exists) {
      throw new NotFoundException('Pedido não encontrado')
    }
  }

  private ensureOrdersFound(orders: any[]) {
    if (!orders.length) {
      throw new NotFoundException(
        'Nenhum pedido encontrado com os filtros informados',
      )
    }
  }
}
