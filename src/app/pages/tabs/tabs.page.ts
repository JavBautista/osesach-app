import { Component , OnInit} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  messages_no_read:number=0;
  constructor(
    private messagesService:MessagesService
  ) {}

  
  ngOnInit(){
    this.getCountMessages();

    this.messagesService.updateMessagesToRead
      .subscribe(msg=>{
        console.log('update Mesage Not Read')        
        this.messages_no_read=0;
      });
  }

  async getCountMessages(){
    
    await this.messagesService.getMessagesNotRead()
          .subscribe(resp=>{
            console.log(resp)
            this.messages_no_read=resp['count_messages'];
            console.log('Message no read='+this.messages_no_read)
          });
  }

}
