import { timeout } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { MqttPubSubClient } from './client-proxy';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  private mqttPubSubClient = new MqttPubSubClient();

  async sendRoomIdToSubscriber(payload: string) {
    try {
      const userProperties = { 'x-version': '1.0.0' };
      const record = new MqttRecordBuilder(`${payload}`).setProperties({ userProperties }).setQoS(1).build();
      return await this.client
        .send('get-room', record?.data)
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
