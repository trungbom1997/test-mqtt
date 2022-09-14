import { ClientProxy, ReadPacket, WritePacket } from "@nestjs/microservices";

export class MqttPubSubClient extends ClientProxy {
    async connect(): Promise<any> {
      console.log('connect');
    }
  
    async close() {
      console.log('close');
    }
  
    async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
      return console.log('event to dispatch: ', packet);
    }
  
    publish(
      packet: ReadPacket<any>,
      callback: (packet: WritePacket<any>) => void,
    ) {
      console.log('message:', packet);
  
      // In a real-world application, the "callback" function should be executed
      // with payload sent back from the responder. Here, we'll simply simulate (5 seconds delay)
      // that response came through by passing the same "data" as we've originally passed in.
      setTimeout(() => callback({ response: packet.data }), 5000);
  
      return () => console.log('teardown');
    }

  }