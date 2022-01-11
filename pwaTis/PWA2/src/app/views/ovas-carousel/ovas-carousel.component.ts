import { Component, OnInit } from '@angular/core';
import { Ova } from '../../../models/ova.interface';




@Component({
  selector: 'app-ovas-carousel',
  templateUrl: './ovas-carousel.component.html',
  styleUrls: ['./ovas-carousel.component.scss']
})


export class OvasCarouselComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  Ovas : any[]= [{name: 'pedro'},{name: 'carlos'},{name: 'carlos'},{name: 'carlos'},{name: 'carlos'}]

  constructor() { }

  ngOnInit(): void {
  }

}
