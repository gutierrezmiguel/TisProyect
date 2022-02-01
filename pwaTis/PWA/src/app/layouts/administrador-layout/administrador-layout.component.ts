import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './administrador_nav';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-administrador-layout',
  templateUrl: './administrador-layout.component.html',
  styleUrls: ['./administrador-layout.component.scss']
})
export class AdministradorLayoutComponent implements OnInit {

  
  installEvent = null;

  

  installByUser () {
    console.log("instalevent: " + this.installEvent)
    if(this.installEvent){
      console.log("entra pero no hace nada installbyuser")
      this.installEvent.prompt();
      this.installEvent.userChoice.then(rta => {
        console.log(rta);
      })
      
    }
  }

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

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event : Event) {
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }
}
