import { Test, TestingModule } from '@nestjs/testing'
import { OrdersController } from './orders.controller'
import { describe, beforeEach, it } from 'node:test'

describe('OrdersController', () => {
  let controller: OrdersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    }).compile()

    controller = module.get<OrdersController>(OrdersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
