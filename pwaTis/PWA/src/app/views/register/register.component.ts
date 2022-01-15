import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  

  
  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService){   
  }

  registerForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]

  })


  ngOnInit(): void {

    if(localStorage.getItem('username')){
        //this.router.navigateByUrl('/dashboard')
    }
    
      
  }

  registerUser(){

    const credentials: User = {
      username  : this.registerForm.get('user')?.value,
      password  : this.registerForm.get('password')?.value
    }


    
    

    this.authService.registerUser(credentials).subscribe(
      (response: any)=>{
        console.log(response);
        //localStorage.setItem('username',response.username);
        //localStorage.setItem('password',response.password);

        
      }

      
    )

  }



}
