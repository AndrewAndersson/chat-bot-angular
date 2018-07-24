import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

export class Message {
  constructor( public author: string, public content: string ) {}
}

@Injectable()
export class ChatService {

  constructor() { }
  conversation = new Subject<Message[]>();
  messageMap = {
    "Привет!": "Приветствую Вас!",
    "Кто Вы такой?": "Я ангулар бот, что Вы хотите узнать",
    "default": "Я не понимаю, пожалуйста задайте вопрос еще раз"
  };
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);

    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }

}
