import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Material } from '../../../models/Material';
import { MaterialService } from '../../services/MaterialService';
import { TrabajadorService } from '../../services/TrabajadorService'

import Swal from 'sweetalert2';

interface materialLista{
  material_id: number;
  material_nombre: string;
}


@Component({
  selector: 'app-material-solicitar',
  templateUrl: './material-solicitar.component.html',
  styleUrls: ['./material-solicitar.component.scss']
})

export class MaterialSolicitarComponent implements OnInit {
  
  public materiales: materialLista[] = [];


  solicitarMaterialForm: FormGroup = this.fb.group({
    
    
    material: ['',Validators.required],
    unidades: ['',Validators.required],
  

  })


  constructor(private fb: FormBuilder,private trabajadorService: TrabajadorService,private materialService: MaterialService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerMateriales();
    
    
  }

  obtenerMateriales(){
    this.materialService.obtenerMateriales().subscribe(
      (response:Material[])=>{
        response.forEach(material => {
          let materialAux : any={
            material_id:material.material_id,
            material_nombre: material.nombre
          }

          this.materiales.push(materialAux);
        });
      }
    )

  }

  setValorMaterial(valor_material : number){
    console.log("hola");
    
    console.log(valor_material);
    
    this.solicitarMaterialForm.patchValue({
    })


  }

  solicitarMaterial(){
    let newSolicitud ={
      material: this.solicitarMaterialForm.get('material')?.value,
      obra: 1,
      cantidad: this.solicitarMaterialForm.get('unidades')?.value,
    }

    this.materialService.solicitarMaterialObra(newSolicitud).subscribe(
      (response:any)=>{
        if(response){
          Swal.fire('Éxitoso!','Material Solicitado','success');
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
        
      }
    )

  }



  

}