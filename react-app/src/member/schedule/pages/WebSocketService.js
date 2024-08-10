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
                    // this.stompClient.subscribe(`/topic/title/${id}`, (message) => {
                    //     if (message.body) {
                    //         callback(JSON.parse(message.body)); // Parse the received message
                    //     }
                    // });
                    // this.stompClient.subscribe(`/topic/users/${id}`, (message) => {
                    //     if (message.body) {
                    //         callback(JSON.parse(message.body));
                    //     }
                    // });

                    this._subscribe(`/topic/title/${id}`, callback);
                    // this._subscribe(`/topic/users/${id}`, callback);
                    resolve();
                }, (error) => {
                    console.error('Error connecting to WebSocket:', error);
                    reject(error);
                });
            });
        }
        return this.connectPromise;
    }

    _subscribe(destination, callback) {
        if (this.stompClient) {
            this.stompClient.subscribe(destination, (message) => {
                if (message.body) {
                    callback(JSON.parse(message.body));
                }
            });
        }
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

    joinPage(id, userToken) {
        return this.ensureConnected(id).then(() => {
            if (this.stompClient && this.stompClient.connected) {
                const payload = { scheduleId: id, userToken: userToken };
                this.stompClient.send(`/app/join/${id}`, {}, JSON.stringify(payload));
            }
        }).catch((error) => {
            console.error('Failed to join page:', error);
        });
    }

    leavePage(id, userToken) {
        return this.ensureConnected(id).then(() => {
            if (this.stompClient && this.stompClient.connected) {
                const payload = { scheduleId: id, userToken: userToken };
                this.stompClient.send(`/app/leave/${id}`, {}, JSON.stringify(payload));
            }
        }).catch((error) => {
            console.error('Failed to leave page:', error);
        });
    }

    subscribeToUsers(id, callback) {
        return this.ensureConnected(id).then(() => {
            this.stompClient.subscribe(`/topic/users/${id}`, (message) => {
                if (message.body) {
                    callback(JSON.parse(message.body));
                }
            });
        });
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;