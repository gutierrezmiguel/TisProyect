import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/LoginService';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {


  credentialsForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]

  })

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {


  }




  ngOnInit(): void {

    
    let log = localStorage.getItem("log");
    
    if (log) {
      if (localStorage.getItem("admin")) {
        
        this.router.navigateByUrl('/admin')
      }
      else if (localStorage.getItem("obrero")) {
        this.router.navigateByUrl('/trabajador')

      }
      else if(localStorage.getItem("almacen")){
        this.router.navigateByUrl('/trabajador')
      }

    }
  }

  iniciarSesion() {

    const credentials: any = {
      numero_cedula: this.credentialsForm.get('usuario')?.value,
      password: this.credentialsForm.get('contrasena')?.value
    }



    this.loginService.postCredentials(credentials).subscribe(
      (response: any) => {
        console.log(response.data.profile)
        let usuario = response.data.profile;
        let rol = usuario.cargo

        if (usuario.trabajador_id) {

          console.log(rol);

          localStorage.setItem("log", "true");

          localStorage.setItem("id", usuario.trabajador_id);
          localStorage.setItem("nombre", usuario.nombre);
          localStorage.setItem("apellido", usuario.apellido);
          localStorage.setItem("cargo", usuario.cargo);
          localStorage.setItem("obra", usuario.obra_participante);
          localStorage.setItem("cedula", usuario.numero_cedula);

          if (rol == "ADMINISTRADOR") {
            localStorage.setItem("admin", "true");
            this.router.navigateByUrl('/admin')
          }
          else if (rol == "OBRERO") {
            localStorage.setItem("obrero", "true");
            this.router.navigateByUrl('/trabajador')
          }
          else if (rol == "JEFE_OBRA") {
            localStorage.setItem("jefe", "true");
            this.router.navigateByUrl('/trabajador')
          }

          else if(rol == "JEFE_ALMACEN"){
            localStorage.setItem("almacen","true");
            this.router.navigateByUrl('/trabajador')
          }

        }

        else{
          this.router.navigateByUrl('/cliente')
        }
      }
    )













  }
}
