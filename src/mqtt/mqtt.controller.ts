import { Controller, InternalServerErrorException, UseFilters, UseInterceptors } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { ConfigNetworkDto } from './dto/config-network-dto';
import { SendRoomDto } from './dto/send-room.dto';
import { MqttService } from './mqtt.service';
import { ExceptionFilter } from './rpc-exception.filter';
import { TransformInterceptor } from './transform.interceptor';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('/send-room')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  async sendRoomId(@Payload() data: SendRoomDto, @Ctx() context: MqttContext) {
    try {
      console.log(`Topic: ${context.getTopic()}`);
      console.log(`Data:`, data);
      if (data.roomId && data.hubId) {
        await this.mqttService.sendRoomIdToSubscriber(data);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @MessagePattern('/network/configuration')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  async configNetwork(@Payload() data: ConfigNetworkDto, @Ctx() context: MqttContext) {
    try {
      console.log(`Topic: ${context.getTopic()}`);
      console.log(`Data:`, data);
      if (data.macaddr && data.token) {
        await this.mqttService.sendInfoHubToSubscriber(data);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //subscriber

  @MessagePattern('/get-room')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  subSendRoomId(@Payload() data: string, @Ctx() context: MqttContext): string {
    return 'OK';
  }

  @MessagePattern('/network/configuration/callback')
  @UseFilters(new ExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  subConfigNetwork(@Payload() data: string, @Ctx() context: MqttContext): string {
    return 'OK';
  }
}
