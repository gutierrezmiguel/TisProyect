import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Obra } from '../../../models/Obra';
import { ObraService } from '../../services/ObraService'

import Swal from 'sweetalert2';
@Component({
  selector: 'app-obra-editar',
  templateUrl: './obra-editar.component.html',
  styleUrls: ['./obra-editar.component.scss']
})

export class ObraEditarComponent implements OnInit {
  private obra_id: number;

  editarObraForm: FormGroup = this.fb.group({


    obra_id: [{ value: '', disabled: true }],
    nombre: [{ value: '', disabled: true }, Validators.required],
    direccion: [{ value: '', disabled: true }, Validators.required],
    ciudad: [{ value: '', disabled: false }, Validators.required],
    fase: [{ value: '', disabled: true }, Validators.required],
    latitud: [{ value: '', disabled: false }, Validators.required],
    longitud: [{ value: '', disabled: false }, Validators.required],

  })


  constructor(private fb: FormBuilder, private obraService: ObraService, private aRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.obra_id = parseInt(this.aRoute.snapshot.paramMap.get("obra_id"));
    //this.obtenerObra()
  }



  obtenerObra() {
    this.obraService.obtenerObra(Number(this.obra_id)).subscribe(
      (response: Obra) => {
        console.log(response)
        this.editarObraForm.patchValue({
          obra_id: response.obra_id,
          nombre: response.nombre,
          direccion: response.direccion,
          ciudad: response.ciudad,
          latitud: response.latitud,
          longitud: response.longitud,
        })

      }
    )
  }

  editarObra() {
    const editadoObra: any = {
      obra_id: this.editarObraForm.get('obra_id')?.value,
      nombre: this.editarObraForm.get('nombre')?.value,
      direccion: this.editarObraForm.get('direccion')?.value,
      ciudad: this.editarObraForm.get('ciudad')?.value,
      latitud: this.editarObraForm.get('latitud')?.value,
      longitud: this.editarObraForm.get('longitud')?.value,
    }




    this.obraService.actualizarObra(editadoObra).subscribe(
      (response: any) => {
        if(response){
          Swal.fire('Éxitoso!','Obra actualizada','success');
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }

      }
    )

    // this.obtenerObra();
    this.editarObraForm.reset();

  }


}
