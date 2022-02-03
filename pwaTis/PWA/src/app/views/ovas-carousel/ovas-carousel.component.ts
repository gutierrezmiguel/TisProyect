import { Component, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Ova } from '../../models/ova.interface';
import { OvaService } from '../../services/ova.service';




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

  installEvent = null;


  constructor(private router: Router, private ovaService: OvaService) { }



  ngOnInit(): void {

    this.getOvas();


  }

  installByUser () {
    console.log("instalevent: " + this.installEvent)
    if(this.installEvent){
      console.log("entra pero no hace nada installbyuser")
      this.installEvent.prompt();
      this.installEvent.userChoice.then(rta => {
        console.log(rta);
      })
      
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event : Event) {
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }

  getOvas() {

    this.ovaService.getOvas().subscribe(
      (response: any) => {

        this.ovaService.setOvas(response)
        this.ovas = response;
        this.ovas = this.ovas.sort(function (a, b) {
          return a.rating - b.rating
        })


      }
    )

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
