import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { Material } from '../../../models/Material';
import { ClienteService } from '../../services/ClienteService';
import { MaterialService } from '../../services/MaterialService';


//Interfaz de los materiales que se mostrarán 
declare interface materialesTabla {
  id: number,
  nombre: string,
  cantidad: number,
  estado: number,
}



@Component({
  selector: 'app-material-listar',
  templateUrl: './material-listar.component.html',
  styleUrls: ['./material-listar.component.scss']
})



export class MaterialListarComponent implements OnInit {

  private obra : number;

  private materiales: materialesTabla[] = [];//materiales
  private columnasMateriales: string[] = ['nombre','cantidad','estado','solicitar'];//Columnas a mostrar en la tabla
  private dataSourceMateriales: MatTableDataSource<materialesTabla>


  private materialAux: materialesTabla = {
    id: null,
    nombre: null,
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
    
    

    if(this.obra){
      this.materialesService.obtenerMaterialesObra(Number(this.obra)).subscribe(
        (response: Material[]) => {
  
          response.forEach(material => {
            this.materialAux = {
              id: material.material_id,
              nombre: material.nombre,
              cantidad: material.cantidad,
              estado: material.estado
            }
            this.materiales.push(this.materialAux)
          })
  
          //Datasource para la tabla y su correspondiende sorter y paginator
          this.dataSourceMateriales = new MatTableDataSource<materialesTabla>(this.materiales)
          this.dataSourceMateriales.sort = this.sort;
          this.dataSourceMateriales.paginator = this.paginator;
          console.log(response);
          
        }
      )
    }
    else{
      this.materialesService.obtenerMateriales().subscribe(
        (response: Material[]) => {
  
          response.forEach(material => {
            this.materialAux = {
              id: material.material_id,
              nombre: material.nombre,
              cantidad: material.cantidad,
              estado: material.estado
            }
            this.materiales.push(this.materialAux)
          })
  
          //Datasource para la tabla y su correspondiende sorter y paginator
          this.dataSourceMateriales = new MatTableDataSource<materialesTabla>(this.materiales)
          this.dataSourceMateriales.sort = this.sort;
          this.dataSourceMateriales.paginator = this.paginator;
        }
      )
    }

    
  }

   //Filtrado
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMateriales.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMateriales.paginator) {
      this.dataSourceMateriales.paginator.firstPage();
    }
  }

}
