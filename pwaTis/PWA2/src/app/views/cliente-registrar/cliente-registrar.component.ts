import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/ClienteService';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-registrar',
  templateUrl: './cliente-registrar.component.html',
  styleUrls: ['./cliente-registrar.component.scss']
})
export class ClienteRegistrarComponent implements OnInit {

  registroCliente = true;
  edicion = false;

  registrarClienteForm: FormGroup = this.fb.group({
    
    
    numero_nit: ['',Validators.required],
    nombre: ['',Validators.required],
    apellido: ['',Validators.required],
    correo: ['',Validators.required],
    direccion: ['',Validators.required],
    contrasena: ['',Validators.required],
    cargo: [{value: 'SUPERVISOR', disabled: true},Validators.required]
  
  })

  constructor(private fb: FormBuilder,private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  registrarCliente() {
    const newCliente: any = {
     numero_nit: this.registrarClienteForm.get('numero_nit')?.value,
     nombre: this.registrarClienteForm.get('nombre')?.value,
     apellido: this.registrarClienteForm.get('apellido')?.value,
     correo: this.registrarClienteForm.get('correo')?.value,
     direccion: this.registrarClienteForm.get('direccion')?.value,
     contrasena: this.registrarClienteForm.get('contrasena')?.value,
     cargo: this.registrarClienteForm.get('cargo')?.value
   }

   this.clienteService.registrarCliente(newCliente).subscribe(
     (response: any)=>{
       console.log(response)
       if(response){
         Swal.fire('Éxitoso!','Trabajador registrado','success');
       } else{
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Something went wrong!',
         })
       }
       
     }
   )

  this.router.navigateByUrl('admin/listarClientes')  
  this.registrarClienteForm.reset();
 }
}
