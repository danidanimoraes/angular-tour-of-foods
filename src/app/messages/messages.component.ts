import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // MessageService is public because will be binded to the template
  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }

}
