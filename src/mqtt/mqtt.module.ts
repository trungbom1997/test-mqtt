import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Module({
  controllers: [MqttController],
  providers: [
    MqttService,
    {
      provide: 'MQTT_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.MQTT,
          options: {
            url: 'mqtt://localhost:1883',
            username: 'root',
            password: '123',
            host: 'localhost',
          },
        }),
    },
  ],
})
export class MqttModule {}
