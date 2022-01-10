import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../services/ClienteService';
import { ObraService } from '../../services/ObraService';
import { TrabajadorService } from '../../services/TrabajadorService';
import Swal  from 'sweetalert2';

interface clienteLista{
  cliente_id: number;
  cliente_nombre: string;
}


@Component({
  selector: 'app-obra-registrar',
  templateUrl: './obra-registrar.component.html',
  styleUrls: ['./obra-registrar.component.scss']
})


export class ObraRegistrarComponent implements OnInit{
  public clientes: clienteLista[] = []

  
  constructor(private fb: FormBuilder, private router: Router, private clienteServicio: ClienteService, private obraServicio: ObraService) {}

  loader = new Loader({
    apiKey : 'AIzaSyDi3vXai4YsLlN7j9nV03i_cp_Gk_-4IMY'
  })


  title = 'Registrar Evidencia'
  latitud =  3.6070813999999993;
  longitud = -76.25948679999999;
  zoom = 5;

  formattedAddress = '';

  options = {
    componentRestrictions:{
      country:['CO']
    }
  }

  
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  


  registrarObraForm: FormGroup = this.fb.group({
    ciudad_obra: [{value:'', disabled: false},Validators.required],
    nombre_obra: ['',Validators.required],
    direccion_obra: ['',Validators.required],
    latitud: [{value: '', disabled: true},Validators.required],
    longitud: [{value: '', disabled: true },Validators.required],
    cliente_obra: ['',Validators.required],
  

  })
   

  
  ngOnInit() {

    this.obtenerClientes();
    
    this.loader.load().then(()=>{
      new google.maps.Map(document.getElementById("map"),{
        center:{lat: this.latitud , lng: this.longitud},
        zoom: this.zoom,
        mapId: '6ce8ed066b2273c1'
      })
    })
  }

 

  public handleAddressChange(address: Address){
    console.log(address);
    this.latitud = address.geometry.location.lat()
    this.longitud = address.geometry.location.lng()
    this.zoom = 15;

    this.registrarObraForm.patchValue({
      latitud: address.geometry.location.lat(),
      longitud: address.geometry.location.lat(),
      direccion_obra: address.vicinity
    })


    this.loader.load().then(()=>{
      let map = new google.maps.Map(document.getElementById("map"),{
        center:{lat: this.latitud , lng: this.longitud},
        zoom: this.zoom,
        mapId: '6ce8ed066b2273c1'

      })

      new google.maps.Marker({
        position : {lat: this.latitud , lng: this.longitud},
        map: map,
        title: "Evidencia"
      })
    })

    
    
  }

  public handleAddressChangeCity(address: Address){
    this.registrarObraForm.patchValue({
      ciudad_obra: address.vicinity
    })

    
  }
 
  public setCurrentLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.zoom = 15
      })
    }

  }

  public obtenerClientes(){
    this.clienteServicio.obtenerClientes().subscribe(
      (response:Cliente[])=>{

        response.forEach(cliente => {
          let clienteAux ={
            cliente_id : cliente.cliente_id,
            cliente_nombre : cliente.nombre
          }

          this.clientes.push(clienteAux);
          
        });
        
      }
    )
  }

  public registrarObra(){

    const newObra: any={
      nombre: this.registrarObraForm.get('nombre_obra')?.value,
      direccion: this.registrarObraForm.get('direccion_obra')?.value,
      ciudad: this.registrarObraForm.get('ciudad_obra')?.value,
      latitud: this.registrarObraForm.get('latitud')?.value,
      longitud: this.registrarObraForm.get('longitud')?.value,
      cliente: this.registrarObraForm.get('cliente_obra')?.value
    
    }
    console.log(newObra.cliente)

    console.log(newObra);
    

    this.obraServicio.registrarObra(newObra).subscribe(
      (response:any)=>{
        if(response){
          Swal.fire('Éxitoso!','Obra registrada','success');
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }

        this.router.navigateByUrl("/admin/listarObras")
    
        this.registrarObraForm.reset();
        
      }
    )
    
  }

 
  //Registro 

}