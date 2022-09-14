import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  getTestMqtt(payload: number[]) {
    const userProperties = { 'x-version': '1.0.0' };
const record = new MqttRecordBuilder(`${payload}`)
  .setProperties({ userProperties })
  .setQoS(1)
  .build();
    this.client.send('send-room', `This room Id is: ${record}`).subscribe((response) => console.log(response));
  }
}
