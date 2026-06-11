import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'

describe('OrdersController (e2e)', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )

    await app.init()

    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@naporta.com',
        password: '123456',
      })

    token = authResponse.body.access_token
  })

  afterAll(async () => {
    await app.close()
  })

  it('/POST orders - should create order', async () => {
    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orderNumber: 'PED-TEST-033',
        expectedDeliveryDate: '2026-06-20',
        customerName: 'João Silva',
        customerDocument: '12345678900',
        deliveryAddress: 'Rua A, 123',
        items: [
          {
            description: 'Produto X',
            price: 99.9,
          },
        ],
      })
  })
})