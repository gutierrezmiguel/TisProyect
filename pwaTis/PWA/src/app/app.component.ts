import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { SwPush } from '@angular/service-worker';
import { Options } from 'selenium-webdriver';
import { ApiRestService } from './services/api-rest.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {

  public readonly VAPID_PUBLIC_KEY = 'BBWuyJrS0zSAZ_ZJhg6vsKxUaNAk7FS4xcHe2OLLK7ITnxsxJ-4616o3sqC6Drb0IwLZMTa8YoPJF8QcbHBReb0';



  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private swPush: SwPush,
    private apiRest: ApiRestService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
    this.subscribeToNotifications();
  }

  subscribeToNotifications():any {
    this.swPush.requestSubscription( {
      serverPublicKey : this.VAPID_PUBLIC_KEY
    }).then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
    //console.log("PjOOOOOOOOOOOOOOOOOOOOOOOO :", token);
    this.apiRest.saveToken(token).subscribe((res:Object) => {
      console.log(res);
    }, (err) =>{
      console.log('ERR', err);
    });

    }).catch(err => console.error('UPS: (', err))
  }


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
