import { timeout } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { MqttPubSubClient } from './client-proxy';
import { SendRoomDto } from './dto/send-room.dto';
import { ConfigNetworkDto } from './dto/config-network-dto';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  private readonly mqttPubSubClient = new MqttPubSubClient();

  async sendRoomIdToSubscriber(payload: SendRoomDto) {
    try {
      const userProperties = { 'x-version': '1.0.0' };
      const record = new MqttRecordBuilder(payload).setProperties({ userProperties }).setQoS(1).build();
      return await this.client
        .send('/get-room', record?.data)
        .pipe(timeout(10000))
        .subscribe(
          (response) => console.log(response),
          (error) => console.error(error.message),
        );
    } catch (error) {
      throw error;
    }
  }

  async sendInfoHubToSubscriber(payload: ConfigNetworkDto) {
    try {
      const record = new MqttRecordBuilder(payload).setQoS(1).build();
      return await this.client
        .send('/network/configuration/infohub', record?.data)
        .pipe(timeout(10000))
        .subscribe(
          (response) => console.log(response),
          (error) => console.error(error.message),
        );
    } catch (error) {
      throw error;
    }
  }
}
