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
        const backUrl = process.env.REACT_APP_BACK_URL;
        if (!this.connectPromise) {
            this.connectPromise = new Promise((resolve, reject) => {
                const socket = new SockJS(`${backUrl}/ws/title`);
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, () => {
                    this.connected = true;
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

    sendDates(id, dates, deleteIndex) {
        const payload = {
            scheduleId: id,
            dates: dates,
            deleteIndex: deleteIndex,
        };
        return this.ensureConnected(id).then(() => {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send(`/app/dates/${id}`, {}, JSON.stringify(payload));
            }
        }).catch((error) => {
            console.error('Failed to send content:', error);
        });
    }

    subscribeTo(id, callback, link) {
        return this.ensureConnected(id).then(() => {
            this.stompClient.subscribe(`/topic/${link}/${id}`, (message) => {
                if (message.body) {
                    // console.log(callback(JSON.parse(message.body).title));
                    link==="title" && callback(JSON.parse(message.body).title);
                    link==="title" || callback(JSON.parse(message.body));
                }
            });
        });
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;