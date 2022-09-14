import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('get-room')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log(`Data:`, data);
    this.mqttService.getTestMqtt(data);
  }

  @MessagePattern('pattern')
  replaceEmoji(@Payload() data: string, @Ctx() context: MqttContext): string {
    return 'OK';
  }
}
