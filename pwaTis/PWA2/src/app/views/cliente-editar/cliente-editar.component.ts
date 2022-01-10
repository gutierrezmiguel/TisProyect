import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../services/ClienteService';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})

export class ClienteEditarComponent implements OnInit {
  private cliente_nit: string;

  editarClienteForm: FormGroup = this.fb.group({
    cliente_id:[{value: '', disabled: true}],
    numero_nit: [{value: '', disabled: true}],
    nombre: [{value: '', disabled: false}],
    apellido: [{value: '', disabled: false}],
    correo: [{value: '', disabled: false},Validators.required],
    direccion: [{value: '', disabled: false},Validators.required],
    contrasena: [{value: '', disabled: false},Validators.required],
    //c_contrasena: [{value: '', disabled: false},Validators.required],
    cargo: [{value: '', disabled: false},Validators.required],
    is_active: [{value: '', disabled: false}],
  }) 

  constructor(private fb: FormBuilder,private ClienteService: ClienteService, private aRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cliente_nit = this.aRoute.snapshot.paramMap.get("cliente_nit");
    this.obtenerCliente();
  }

  obtenerCliente(){
    this.ClienteService.obtenerCliente(Number(this.cliente_nit)).subscribe(
      (response:Cliente)=>{
        response = response[0];
        this.editarClienteForm.patchValue({
          cliente_id: response.cliente_id,
          numero_nit: response.numero_nit,
          nombre:response.nombre,
          apellido:response.apellido,
          correo: response.correo,
          direccion: response.direccion,
          contrasena: response.contrasena,
          cargo: response.cargo,
          is_active: response.is_active

        })
      }  
    )
  }

  editarCliente(){
    const editadoCliente: any={
      cliente_id: this.editarClienteForm.get('cliente_id')?.value,
      numero_nit: this.editarClienteForm.get('numero_nit')?.value,
      nombre: this.editarClienteForm.get('nombre')?.value,
      apellido: this.editarClienteForm.get('apellido')?.value,
      correo: this.editarClienteForm.get('correo')?.value,
      direccion: this.editarClienteForm.get('direccion')?.value,
      contrasena: this.editarClienteForm.get('contrasena')?.value,
      cargo: this.editarClienteForm.get('cargo')?.value,
      is_active: this.editarClienteForm.get('is_active')?.value,
      
    }

    this.ClienteService.actualizarCliente(editadoCliente).subscribe(
      (response: any)=>{
        
        if(response){
          Swal.fire('Éxitoso!','Cliente actualizado','success');
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
    this.editarClienteForm.reset();

    
  }
}
