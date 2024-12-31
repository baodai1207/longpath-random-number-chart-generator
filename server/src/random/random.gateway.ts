import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RandomGateway {
    @WebSocketServer()
    server: Server;

    private intervalId: NodeJS.Timeout | null = null;

    @SubscribeMessage('start')
    startStreaming(@MessageBody() frequency: number) {
        if (this.intervalId) clearInterval(this.intervalId);

        this.intervalId = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            const timestamp = new Date().toISOString();
            this.server.emit('data', { value: randomNumber, timestamp });
        }, frequency);
    }

    @SubscribeMessage('updateFrequency')
    updateFrequency(@MessageBody() frequency: number) {
        if (this.intervalId) clearInterval(this.intervalId);

        this.intervalId = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            const timestamp = new Date().toISOString();
            this.server.emit('data', { value: randomNumber, timestamp });
        }, frequency);
    }

    @SubscribeMessage('stop')
    stopStreaming() {
        if (this.intervalId) clearInterval(this.intervalId);
    }
}
