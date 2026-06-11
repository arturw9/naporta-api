import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import serverlessExpress from '@vendia/serverless-express'

let cachedServer: any

async function bootstrapServer() {
  const expressApp = express()

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  )

  app.setGlobalPrefix('api')
  app.enableCors()

  await app.init()

  return serverlessExpress({ app: expressApp })
}

export const handler = async (event: any, context: any, callback: any) => {
  cachedServer = cachedServer ?? (await bootstrapServer())
  return cachedServer(event, context, callback)
}