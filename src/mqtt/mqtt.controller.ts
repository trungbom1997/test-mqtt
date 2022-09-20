import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { ExceptionFilter } from './rpc-exception.filter';
import { TransformInterceptor } from './transform.interceptor';


@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('send-room')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  async sendRoomId(@Payload() data: string, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log(JSON.stringify(data))
    return await this.mqttService.sendRoomIdToSubscriber(data as any);
  }

  @MessagePattern('get-room')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  replaceEmoji(@Payload() data: string, @Ctx() context: MqttContext): string {
    return 'OK';
  }
}
