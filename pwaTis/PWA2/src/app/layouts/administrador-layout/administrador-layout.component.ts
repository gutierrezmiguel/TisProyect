import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './administrador_nav';

@Component({
  selector: 'app-administrador-layout',
  templateUrl: './administrador-layout.component.html',
  styleUrls: ['./administrador-layout.component.scss']
})
export class AdministradorLayoutComponent implements OnInit {

  constructor(private router: Router) { }
  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {

    let log = localStorage.getItem("log");

    if (log) {
      if (localStorage.getItem("cliente")) {

        this.router.navigateByUrl('/cliente')
      }

      else if (localStorage.getItem("obrero")) {
        this.router.navigateByUrl('/trabajador')
      }
      else {
      }

    }
    else {
      this.router.navigateByUrl('/login')
    }




  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
