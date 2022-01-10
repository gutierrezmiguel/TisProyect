import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../services/MaterialService';
import { TrabajadorService } from '../../services/TrabajadorService';

interface proveedorLista{
  proveedor_id: number;
  proveedor_nombre: string;
}

interface materialLista{
  material_id: number;
  material_nombre: string;
}

@Component({
  selector: 'app-material-comprar',
  templateUrl: './material-comprar.component.html',
  styleUrls: ['./material-comprar.component.scss']
})
export class MaterialComprarComponent implements OnInit {

  private nombreMaterial: string;
  
  public proveedores: proveedorLista[] = [
    {
      proveedor_id: 1,
      proveedor_nombre: "proveedor 1"
    },
    {
      proveedor_id: 2,
      proveedor_nombre: "proveedor 2"
    },
    {
      proveedor_id: 3,
      proveedor_nombre: "proveedor 3"
    },
    {
      proveedor_id: 4,
      proveedor_nombre: "proveedor 4"
    },

  ];

  comprarMaterialForm: FormGroup = this.fb.group({
    
    
    proveedor: ['',Validators.required],
    material: ['',Validators.required],
    precio: ['',Validators.required],
    unidades: ['',Validators.required],
  

  })


  constructor(private fb: FormBuilder,private materialService: MaterialService, private aRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.comprarMaterialForm.patchValue({material : this.aRoute.snapshot.paramMap.get("material_id")});
    this.nombreMaterial = this.aRoute.snapshot.paramMap.get("material_nombre")
    
  }

  obtenerProveedoresMaterial(){
    console.log("hola");

  }

  setValorMaterial(){
    let proveedor_consulta = this.comprarMaterialForm.get('proveedor')?.value;

    console.log(proveedor_consulta);

  }

  comprarMaterial(){
    

  }



  

}