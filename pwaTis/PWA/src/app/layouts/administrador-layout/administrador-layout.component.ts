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

    
    if(!localStorage.getItem('username')){
      this.router.navigateByUrl('/login')
  }




  }
  
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
