import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
      username: 'root',
      password: '123',
      host: 'localhost'
    },
  });
  await app.listen();
  const app1 = await NestFactory.create(AppModule);
  await app1.listen(7000);
}
bootstrap();
