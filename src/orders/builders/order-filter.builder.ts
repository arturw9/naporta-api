import { FindOrdersQueryDto } from '../dto/find-orders-query.dto'
import { OrderStatus } from '@prisma/client'

export class OrderFilterBuilder {
    private where: any = {
        deletedAt: null,
    }

    constructor(private readonly filters: FindOrdersQueryDto) { }

    build() {
        this.applyNumberFilter()
        this.applyStatusFilter()
        this.applyDateFilter()

        return this.where
    }

    private applyNumberFilter() {
        if (!this.filters.number) return

        this.where.orderNumber = {
            contains: this.filters.number,
        }
    }

    private applyStatusFilter() {
        if (!this.filters.status) return

        const normalized = this.filters.status.toUpperCase()

        const isValid = Object.values(OrderStatus).includes(
            normalized as OrderStatus,
        )

        if (!isValid) {
            throw new Error(`Status inválido: ${this.filters.status}`)
        }

        this.where.status = normalized as OrderStatus
    }

    private parseStatus(status?: string) {
        if (!status) return null

        const key = status.toUpperCase()

        return OrderStatus[key as keyof typeof OrderStatus] ?? null
    }

    private applyDateFilter() {
        if (!this.filters.startDate && !this.filters.endDate) return

        this.where.expectedDeliveryDate = {}

        if (this.filters.startDate) {
            this.where.expectedDeliveryDate.gte = new Date(this.filters.startDate)
        }

        if (this.filters.endDate) {
            this.where.expectedDeliveryDate.lte = new Date(this.filters.endDate)
        }
    }
}
