import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})


export class MapaComponent implements OnInit  {

  @Input() latitud : number;
  @Input() longitud : number;
  @Input() descripcion : string;
  @Input() fecha : string;
  @Input() trabajador : string;
  @Input() enlace : string;

  title = 'google-maps';

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    
    let loader = new Loader({
      apiKey : 'AIzaSyDi3vXai4YsLlN7j9nV03i_cp_Gk_-4IMY'
    })


    loader.load().then(()=>{
      let map = new google.maps.Map(document.getElementById("map"),{
        center:{lat: this.latitud , lng: this.longitud},
        zoom: 10,
        mapId: '6ce8ed066b2273c1'
      })

      new google.maps.Marker({
        position : {lat: this.latitud , lng: this.longitud},
        map: map,
        title: "Evidencia"
      })
    })
    
  }
  ngOnInit() {

    console.log(this.enlace);
    

    let loader = new Loader({
      apiKey : 'AIzaSyDi3vXai4YsLlN7j9nV03i_cp_Gk_-4IMY'
    })


    loader.load().then(()=>{
      let map = new google.maps.Map(document.getElementById("map"),{
        center:{lat: this.latitud , lng: this.longitud},
        zoom: 10,
        mapId: '6ce8ed066b2273c1'
      })

      new google.maps.Marker({
        position : {lat: this.latitud , lng: this.longitud},
        map: map,
        title: "Evidencia"
      })
    })
  }

}

 