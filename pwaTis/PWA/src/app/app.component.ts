import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { SyncService } from './services/sync.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {

  constructor(
    private scoreService : SyncService,
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    this.scoreService.startIndexedDB();
    this.scoreService.setUsersIndexDB();
    this.scoreService.setOvasIndexDB();

    iconSet.icons = { ...freeSet };
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
