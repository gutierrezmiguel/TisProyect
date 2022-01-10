import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Material } from '../../../models/Material';
import { MaterialService } from '../../services/MaterialService';


//Interfaz de los materiales que se mostrarán 
declare interface solicitudesTabla {
  material_id: number,
  material_nombre: string,
  obra_nombre: string
  obra_id: number,
  cantidad: number,
  estado: number,
}

@Component({
  selector: 'app-material-solicitudes',
  templateUrl: './material-solicitudes.component.html',
  styleUrls: ['./material-solicitudes.component.scss']
})




export class MaterialSolicitudesComponent implements OnInit {

  private materiales: solicitudesTabla[] = [];//materiales
  private columnasMateriales: string[] = ['material', 'obra', 'cantidad', 'autorizar'];//Columnas a mostrar en la tabla
  private dataSourceMateriales: MatTableDataSource<solicitudesTabla>


  private materialAux: solicitudesTabla = {
    material_id: null,
    material_nombre: null,
    obra_nombre: null,
    obra_id: null,
    cantidad: null,
    estado: null
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private materialesService: MaterialService, private router: Router) { }

  ngOnInit() {
    this.generarMenuMateriales();
  }


  generarMenuMateriales() {
    this.materialesService.obtenerSolicitudesMaterialesObras().subscribe(
      (response: any) => {

        console.log(response);
        


        response.data.forEach(solicitud => {
          this.materialAux = {
            material_id: solicitud.material,
            material_nombre: solicitud.nombre_material,
            obra_id: solicitud.obra,
            obra_nombre: solicitud.nombre_obra,
            cantidad: solicitud.cantidad,
            estado: solicitud.aprobado
          }
          this.materiales.push(this.materialAux)
          console.log(this.materialAux);
          
        })

        //Datasource para la tabla y su correspondiende sorter y paginator
        this.dataSourceMateriales = new MatTableDataSource<solicitudesTabla>(this.materiales)
        this.dataSourceMateriales.sort = this.sort;
        this.dataSourceMateriales.paginator = this.paginator;
 

      }
    )
  }

  //Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMateriales.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMateriales.paginator) {
      this.dataSourceMateriales.paginator.firstPage();
    }
  }

  cambiarEstadoSolicitud(material,obra,respuesta){

    /*
    this.materialesService.cambiarEstadoMaterial({
      material_id: material,
      obra_id: obra,
      aprobado: respuesta,
    }).subscribe(
      (response: any)=>{
        console.log(response);
        
      }
    )
    */


    
  }

}
