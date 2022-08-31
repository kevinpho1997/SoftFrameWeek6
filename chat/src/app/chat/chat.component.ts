import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageContent: string = "";
  messages: string[] = [];
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection;
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    // should be message: string but throws error
      .subscribe((message: any) => {
        this.messages.push(message);
        console.log("message pushed to array");
      });
  }

  chat() {
    if(this.messageContent) {
      this.socketService.send(this.messageContent);
      this.messageContent = "";
    } else {
      // can't put ; at end of console.log???
      console.log('no message received');
    }
  }

}
