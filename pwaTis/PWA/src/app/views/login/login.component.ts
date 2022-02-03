import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../models/user.interface';
import { SyncService } from '../../services/sync.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  
  constructor(private fb: FormBuilder,private router: Router, private scoreService : SyncService ){   
  }

  credentialsForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]

  })


  ngOnInit(): void {
    
    
    
    if(localStorage.getItem('username')){
        this.router.navigateByUrl('/Ovas')
    }
    
      
  }

  register(){
     this.router.navigateByUrl("register")
  }

  logIn(){

    
    
    const credentials: User = {
      username  : this.credentialsForm.get('user')?.value,
      password  : this.credentialsForm.get('password')?.value
    }

    //console.log(credentials);
    

    this.scoreService.logIn(credentials).then(
      
      (response: UserResponse)=>{
        //console.log("user encontrado: ",response);
        
        localStorage.setItem('username',response.username);
        localStorage.setItem('password',response.password);
        localStorage.setItem('id',String(response.idUser));
        this.router.navigateByUrl('/Ovas')

        
      }

      
    )

  }


}


