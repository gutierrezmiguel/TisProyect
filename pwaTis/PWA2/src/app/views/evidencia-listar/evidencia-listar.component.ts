import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Cliente } from '../../../models/Cliente';
import { Evidencia } from '../../../models/Evidencia';
import { ClienteService } from '../../services/ClienteService';
import { EvidenciaService } from '../../services/EvidenciaService';

//Interfaz de los evidencias que se mostrarán 
declare interface evidenciasTabla {
  tipo: number,
  obra: string,
  trabajador: string,
  fecha: string,
  descripcion: string,
  link: string,
  lat: number,
  lng: number,
  aprobado: boolean
}


@Component({
  selector: 'app-evidencia-listar',
  templateUrl: './evidencia-listar.component.html',
  styleUrls: ['./evidencia-listar.component.scss']
})

@Pipe({ name: 'transformarEstado' })
export class EvidenciaListarComponent implements OnInit {

  public latitudEvidencia;
  public longitudEvidencia;
  public descripcionEvidencia;
  public fechaEvidencia;
  public trabajadorEvidencia;
  public enlaceEvidencia;

  private evidencias: evidenciasTabla[] = [];//evidencias
  private columnasEvidencias: string[] = ['tipo', 'Obra', 'fecha', 'detalle'];//Columnas a mostrar en la tabla
  private dataSourceEvidencias: MatTableDataSource<evidenciasTabla>




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  



  constructor(private evidenciaService: EvidenciaService, private router: Router) { }

  public detallar = false;

  loader = new Loader({
    apiKey : 'AIzaSyDi3vXai4YsLlN7j9nV03i_cp_Gk_-4IMY'
  })

  private datosRegistrar ={

  title : 'Registrar Evidencia',
  latitud :  3.6070813999999993,
  longitud : -76.25948679999999,
  zoom: 5

 }



  formattedAddress = '';

  options = {
    componentRestrictions:{
      country:['CO']
    }
  }


  transform(input: number): string {
    if (input == 1) {
      return 'Audio'
    }
    else {
      return 'Fotografíá'
    }
  }
  
  ngOnInit() {
    this.generarMenuClientes();

    this.loader.load().then(()=>{
      let map = new google.maps.Map(document.getElementById("map"),{
        center:{lat: 2 , lng: 6},
        zoom: 15,
        mapId: '6ce8ed066b2273c1'

      })

      new google.maps.Marker({
        position : {lat: 2 , lng: 6},
        map: map,
        title: "Evidencia"
      })
    })
    
  }

456
  generarMenuClientes() {
    this.evidenciaService.obtenerEvidenciasPorEstadoObra(2, 'False').subscribe(
      (response: any[]) => {
        console.log(response);
        response.forEach(evidencia => {
          let evidenciaAux = {
            tipo: evidencia.tipo,
            obra: evidencia.nombre_obra,
            trabajador: evidencia.trabajador,
            fecha: evidencia.fecha,
            descripcion: evidencia.descripcion,
            link: evidencia.link,
            lat: evidencia.latitud,
            lng: evidencia.longitud,
            aprobado: evidencia.aprobado
          }
          this.evidencias.push(evidenciaAux)
        })

        console.log(response);
        

        
        

        //Datasource para la tabla y su correspondiende sorter y paginator
        this.dataSourceEvidencias = new MatTableDataSource<evidenciasTabla>(this.evidencias)
        this.dataSourceEvidencias.sort = this.sort;
        this.dataSourceEvidencias.paginator = this.paginator;
      }
    )
  }

  //Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEvidencias.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEvidencias.paginator) {
      this.dataSourceEvidencias.paginator.firstPage();
    }
  }

  detallarEvidencia(evidencia: any){

    

    console.log(evidencia);
    
    this.latitudEvidencia = evidencia.lat;
    this.longitudEvidencia = evidencia.lng;
    this.descripcionEvidencia = evidencia.descripcion;
    this.fechaEvidencia = evidencia.fecha;
    this.trabajadorEvidencia= evidencia.trabajador;
    this.enlaceEvidencia = evidencia.link
    this.detallar = true;
    console.log(evidencia.descripcion);
    
  }

  cerrarDetalle(){
    this.detallar = false;
  }

}
