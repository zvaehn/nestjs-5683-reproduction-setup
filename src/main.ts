import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { CustomModule } from './custom/custom.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(CustomModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'custom_queue',
      noAck: false,
      prefetchCount: 1,
      queueOptions: {
        durable: true,
      },
    },
  } as RmqOptions);

  customMicroservice.listen(() => Logger.debug('Listening on custom_queue'));
  app.connectMicroservice(customMicroservice);

  await app.listen(4444);
}

try {
  bootstrap();
} catch (err) {
  Logger.error('ciritical app error');
  Logger.debug(err);
}
