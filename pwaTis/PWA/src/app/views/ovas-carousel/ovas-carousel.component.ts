import { Component, OnInit } from '@angular/core';
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

  Ovas : Ova[];

  constructor(private router: Router, private ovaService: OvaService) { }

  ngOnInit(): void {

    this.getOvas();
    
  }

  getOvas(){

    this.ovaService.getOvas().subscribe(
      (response: any)=>{
        this.Ovas = response;
        console.log(response);
        
      }
    )

  }

}
