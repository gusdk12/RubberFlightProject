// src/WebSocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.connectPromise = null;
    }

    connect(callback, id) {
        if (!this.connectPromise) {
            this.connectPromise = new Promise((resolve, reject) => {
                const socket = new SockJS(`http://localhost:8282/ws/title`);
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, () => {
                    this.connected = true;
                    this.stompClient.subscribe(`/topic/title/${id}`, (message) => {
                        if (message.body) {
                            callback(JSON.parse(message.body)); // Parse the received message
                        }
                    });
                    resolve();
                }, (error) => {
                    console.error('Error connecting to WebSocket:', error);
                    reject(error);
                });
            });
        }
        return this.connectPromise;
    }

    ensureConnected(id) {
        if (this.connected) {
            return Promise.resolve();
        }
        return this.connect(() => {}, id);
    }

    sendContent(id, title) {
        const payload = {
            id: id,
            title: title
        };
        return this.ensureConnected(id).then(() => {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send(`/app/title/${id}`, {}, JSON.stringify(payload));
            }
        }).catch((error) => {
            console.error('Failed to send content:', error);
        });
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;