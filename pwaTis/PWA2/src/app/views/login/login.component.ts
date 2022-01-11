import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService){   
  }

  credentialsForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]

  })


  ngOnInit(): void {

    
    
    if(localStorage.getItem('username')){
        this.router.navigateByUrl('/admin')
    }
    
      
  }

  logIn(){

    
    
    const credentials: User = {
      username  : this.credentialsForm.get('user')?.value,
      password  : this.credentialsForm.get('password')?.value
    }

    console.log(credentials);
    

    this.authService.logIn(credentials).subscribe(
      
      (response: UserResponse)=>{
        console.log(response);
        localStorage.setItem('username',response.username);
        localStorage.setItem('password',response.password);
        this.router.navigateByUrl('/admin')

        
      }

      
    )

  }


}


