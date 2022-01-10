import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../services/ClienteService';

//Interfaz de los clientes que se mostrarán
declare interface clientesTabla {
  nit: string,
  nombre: string,
  apellido: string,
  correo: string,
  direccion: string,
}

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})



export class ClienteListarComponent implements OnInit {

  private clientes: clientesTabla[] = [];//clientes
  private columnasClientes: string[] = ['nit', 'nombre', 'apellido', 'correo', 'direccion', 'editar'];//Columnas a mostrar en la tabla
  private dataSourceClientes: MatTableDataSource<clientesTabla>


  private clienteAux: clientesTabla = {
    nit: null,
    nombre: null,
    apellido: null,
    correo: null,
    direccion: null,
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private clientesService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.generarMenuClientes();
  }


  generarMenuClientes() {


    this.clientesService.obtenerClientes().subscribe(
      (response: Cliente[]) => {

        response.forEach(cliente => {
          this.clienteAux = {
            nit: cliente.numero_nit,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            direccion: cliente.direccion,
          }
          this.clientes.push(this.clienteAux)
        })

        //Datasource para la tabla y su correspondiende sorter y paginator
        this.dataSourceClientes = new MatTableDataSource<clientesTabla>(this.clientes)
        this.dataSourceClientes.sort = this.sort;
        this.dataSourceClientes.paginator = this.paginator;
      }
    )
  }

   //Filtrado
   applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClientes.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClientes.paginator) {
      this.dataSourceClientes.paginator.firstPage();
    }
  }

}
