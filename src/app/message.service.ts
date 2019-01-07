import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  // Cache
  public messages: string[] = [];

  constructor() { }

  public addMessage(message: string)
  {
    this.messages.push(message);
  }

  public clear()
  {
    this.messages = [];
  }
}
