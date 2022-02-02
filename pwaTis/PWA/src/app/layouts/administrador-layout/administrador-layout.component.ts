import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { CheckStatusService } from '../../services/check-status.service';
import { ScoreService } from '../../services/score.service';
import { navItems } from './administrador_nav';

@Component({
  selector: 'app-administrador-layout',
  templateUrl: './administrador-layout.component.html',
  styleUrls: ['./administrador-layout.component.scss']
})
export class AdministradorLayoutComponent implements OnInit {


  installEvent = null;

  

  installByUser () {
    console.log("entra pero no hace nada installbyuser")
    if(this.installEvent){
      this.installEvent.prompt();
      this.installEvent.userChoice.then(rta => {
        console.log(rta);
      })
      
    }
  }

  constructor(private scoreService: ScoreService,private router: Router) {


    
   }
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
