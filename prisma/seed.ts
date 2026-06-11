import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@naporta.com',
        password,
      },
      {
        name: 'Carlos Mendes',
        email: 'carlos@naporta.com',
        password,
      },
      {
        name: 'Mariana Souza',
        email: 'mariana@naporta.com',
        password,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.order.create({
    data: {
      orderNumber: 'PED-001',
      customerName: 'João Silva',
      customerDocument: '12345678900',
      deliveryAddress: 'Rua A, 123',

      expectedDeliveryDate: new Date(),

      items: {
        create: [
          {
            description: 'Notebook Dell Inspiron',
            price: 3500.0,
          },
          {
            description: 'Mouse Logitech MX Master 3',
            price: 650.0,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'PED-002',
      customerName: 'Maria Oliveira',
      customerDocument: '98765432100',
      deliveryAddress: 'Av. Central, 456',

      expectedDeliveryDate: new Date(),

      items: {
        create: [
          {
            description: 'Smartphone Samsung Galaxy S23',
            price: 4200.0,
          },
          {
            description: 'Capinha Protetora',
            price: 80.0,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'PED-003',
      customerName: 'Pedro Almeida',
      customerDocument: '11122233344',
      deliveryAddress: 'Rua das Flores, 789',

      expectedDeliveryDate: new Date(),

      items: {
        create: [
          {
            description: 'Teclado Mecânico Redragon',
            price: 300.0,
          },
          {
            description: 'Monitor 24 polegadas',
            price: 900.0,
          },
          {
            description: 'Headset Gamer',
            price: 250.0,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'PED-004',
      customerName: 'Fernanda Lima',
      customerDocument: '55566677788',
      deliveryAddress: 'Rua Brasil, 321',

      expectedDeliveryDate: new Date(),

      items: {
        create: [
          {
            description: 'Cadeira Gamer',
            price: 1200.0,
          },
          {
            description: 'Mesa Escritório',
            price: 800.0,
          },
        ],
      },
    },
  });
}

main();