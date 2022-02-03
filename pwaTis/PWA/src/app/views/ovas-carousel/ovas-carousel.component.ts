import { Component, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Ova } from '../../models/ova.interface';
import { OvaService } from '../../services/ova.service';
import { SyncService } from '../../services/sync.service';




@Component({
  selector: 'app-ovas-carousel',
  templateUrl: './ovas-carousel.component.html',
  styleUrls: ['./ovas-carousel.component.scss']
})


export class OvasCarouselComponent implements OnInit {



  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public filter;
  public filterType;
  public orderBy;
  ovas: Ova[];


  onlineStatusCheck: any = OnlineStatusType;
  status: OnlineStatusType; //Enum provided by ngx-online-status
  offline: any;
  installEvent = null;



  constructor(private syncService: SyncService, private onlineStatusService: OnlineStatusService, private router: Router, private ovaService: OvaService) {
    this.onlineStatusService.status.subscribe(async (status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
      this.offline = (status === this.onlineStatusCheck.OFFLINE)

      if (!this.offline) {
        
        console.log("///////////////////////////////////");

        console.log("OVAS CARRUSEL ONLINE ACTUALMENTE: ");

        console.log("ONLINE");
        this.syncService.deleteOvasDB().then(
          (async response => {
            this.syncService.setOvasIndexDB().then(
              (async response => {

                this.getOnlineOvas();


              })
            )
          })
        );


      }
      else {
        console.log("///////////////////////////////////");
        console.log("OVAS CARRUSEL OFFLINE");
        this.ovas = await this.syncService.getOvasDB()
      }

      console.log("///////////////////////////////////");


    });
  }



  ngOnInit(): void{

    
    this.getOnlineOvas(); 
    

    


  }

  installByUser() {
    console.log("instalevent: " + this.installEvent)
    if (this.installEvent) {
      console.log("entra pero no hace nada installbyuser")
      this.installEvent.prompt();
      this.installEvent.userChoice.then(rta => {
        console.log(rta);
      })

    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }

  getOnlineOvas() {
    this.syncService.getOvas().subscribe(
      (response: Ova[]) => {
        this.ovas = response
        console.log(this.ovas);
        
      }
    )
  }

  getOfflineOvas() {
    this.ovas = this.ovaService.ovas;
  }

  detallarOva(id_ova) {
    this.router.navigateByUrl("Ovas/details/" + id_ova)

  }





  change(event) {

    if (this.filter && this.filterType) {
      if (this.filterType == 1) {
        let filtro = this.ovaService.ovas.filter(ova => ova.title.includes(this.filter))
        this.ovas = filtro;

      }
      else if (this.filterType == 2) {
        this.ovas = this.ovas.filter(ova => ova.creator.includes(this.filter))
      }
      else if (this.filterType == 3) {
        this.ovas = this.ovas.filter(ova => ova.subject.includes(this.filter))
      }
      else if (this.filterType == 4) {
        this.ovas = this.ovas.filter(ova => ova.creator.includes(this.filter))
      }
    }


    else {
      this.ovas = this.ovaService.ovas;
    }




  }

  clickRadio(e) {
    this.ovas = this.ovaService.ovas
    this.filter = ""

  }
  clickOrder(e) {

    let orderType = this.orderBy

    console.log(orderType);

    if (orderType == 1) {
      this.ovas.sort(function (a, b) {
        if (a.rating > b.rating) {
          return 1;
        }

        if (a.rating < b.rating) {
          return -1;
        }
        return 0;
      })
    }
    else if (orderType == 2) {
      this.ovas.sort(function (a, b) {
        if (a.rating > b.rating) {
          return -1;
        }

        if (a.rating < b.rating) {
          return 1;
        }
        return 0;
      })

    }
    else if (orderType == 3) {
      this.ovas.sort(function (a, b) {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;
      })


    }
    else if (orderType == 4) {
      this.ovas.sort(function (a, b) {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? -1 : 1;
      })

    }



  }


}
