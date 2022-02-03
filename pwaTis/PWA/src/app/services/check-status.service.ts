import { Injectable } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { ScoreService } from './score.service';

@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {

  status: OnlineStatusType; //Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;
  offline: any;
  
  constructor(private onlineStatusService: OnlineStatusService) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
      this.offline = (status === this.onlineStatusCheck.OFFLINE)

      console.log(this.offline);
      
     
      
      
    });
   }

   
}
