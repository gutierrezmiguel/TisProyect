import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Obra } from '../../../models/Obra';
import { Trabajador } from '../../../models/Trabajador';
import { ObraService } from '../../services/ObraService';
import { TrabajadorService } from '../../services/TrabajadorService';
import Swal  from 'sweetalert2';

interface puestoLista{
  puesto_nombre: string;
}

@Component({
  selector: 'app-trabajador-registrar',
  templateUrl: 'trabajador-registrar.component.html',
  styleUrls: ['./trabajador-registrar.component.scss']
})


export class RegistroTrabajadorComponent implements OnInit {

  public puestos : puestoLista[] = [
    {
    puesto_nombre: "ADMINISTRADOR"
  },
  {
    puesto_nombre: "OBRERO"
  },
  {
    puesto_nombre: "JEFE_ALMACEN"
  },
  {
    puesto_nombre: "JEFE_OBRA"
  },
  
]

  

  registrarTrabajadorForm: FormGroup = this.fb.group({


    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cedula: ['', Validators.required],
    direccion: ['', Validators.required],
    celular: ['', Validators.required],
    contrasena: ['', Validators.required],
    c_contrasena: ['', Validators.required],
    cargo: ['', Validators.required]


  })



  constructor(private obraService: ObraService, private fb: FormBuilder, private trabajadorService: TrabajadorService, private router: Router) { }

  ngOnInit(): void {

    
    

  }

  //Registro 

  registrarTrabajador() {



    const newTrabajador: any = {
      numero_cedula: this.registrarTrabajadorForm.get('cedula')?.value,
      nombre: this.registrarTrabajadorForm.get('nombre')?.value,
      apellido: this.registrarTrabajadorForm.get('apellido')?.value,
      direccion: this.registrarTrabajadorForm.get('direccion')?.value,
      numero_celular: this.registrarTrabajadorForm.get('celular')?.value,
      contrasena: this.registrarTrabajadorForm.get('contrasena')?.value,
      cargo: this.registrarTrabajadorForm.get('cargo')?.value
    }

    this.trabajadorService.registrarTrabajador(newTrabajador).subscribe(
      (response: any)=>{

        if(response){
          Swal.fire('Éxitoso!','Trabajador registrado','success');
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }



        this.router.navigateByUrl("/admin/listarTrabajadores")
      }
    )

    console.log(newTrabajador);

    this.registrarTrabajadorForm.reset();
  }




}
