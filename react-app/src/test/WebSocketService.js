// src/WebSocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.connectPromise = null;
    }

    connect(callback) {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost:8282/ws/notes');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, () => {
                this.connected = true;
                this.stompClient.subscribe('/topic/notes', (message) => {
                    if (message.body) {
                        callback(message.body);
                    }
                });
                resolve();
            }, (error) => {
                console.error('Error connecting to WebSocket:', error);
                reject(error);
            });
        });
    }

    ensureConnected() {
        if (this.connected) {
            return Promise.resolve();
        }

        if (!this.connectPromise) {
            this.connectPromise = this.connect(() => {});
        }

        return this.connectPromise;
    }

    sendContent(content) {
        return this.ensureConnected().then(() => {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send('/app/notes', {}, content);
            }
        }).catch((error) => {
            console.error('Failed to send content:', error);
        });
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;