import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './cliente_nav';

@Component({
  selector: 'app-cliente-layout',
  templateUrl: './cliente-layout.component.html',
  styleUrls: ['./cliente-layout.component.scss']
})
export class ClienteLayoutComponent implements OnInit {

  constructor(private router : Router) { }
  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {

    let log = localStorage.getItem("log");
    
    if (log) {
      if (localStorage.getItem("admin")) {
        
        this.router.navigateByUrl('/admin')
      }

      else if(localStorage.getItem("obrero")){
        this.router.navigateByUrl('/trabajador')
      }
      else {
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
