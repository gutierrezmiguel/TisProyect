import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItemsJefeAlmacen, navItemsOperario, navItemsJefeObra } from './trabajador_nav';

@Component({
  selector: 'app-trabajador-layout',
  templateUrl: './trabajador-layout.component.html',
  styleUrls: ['./trabajador-layout.component.scss']
})
export class TrabajadorLayoutComponent implements OnInit {

  constructor(private router: Router) { }
  public sidebarMinimized = false;
  public navItems = [];

  ngOnInit(): void {


    let log = localStorage.getItem("log");
    
    if (log) {
      if (localStorage.getItem("admin")) {
        
        this.router.navigateByUrl('/admin')
      }

      else if(localStorage.getItem("cliente")){
        this.router.navigateByUrl('/cliente')
      }
      else {
        if (localStorage.getItem("obrero")) {
          this.navItems= navItemsOperario
        }
        else if(localStorage.getItem("almacen")){
          this.navItems= navItemsJefeAlmacen
        }
        else if(localStorage.getItem("jefe")){
          this.navItems = navItemsJefeObra
        }
      }

    }
    else{
      this.router.navigateByUrl('/login')
    }



  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
