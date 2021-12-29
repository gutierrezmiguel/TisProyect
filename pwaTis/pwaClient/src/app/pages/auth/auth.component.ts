import { Component, OnInit } from '@angular/core';
import { Login, UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthService,
              private formbuilder : FormBuilder) { }

  user !: UserResponse;
  
  loginForm !: FormGroup;

  login : Login = {username: '',
                   password:''};

  ngOnInit(): void {
    this.authService.getUser(0).subscribe(
      (user => {
        this.user = user;
        console.log(user);
      })
      
    )
    this.loginForm = this.formbuilder.group({
      username:'',
      password:''
    })
  }

  onLogin(): void {    
    this.login.username = this.loginForm.get('username')?.value
    this.login.password = this.loginForm.get('password')?.value
    this.authService.logIn(this.login).subscribe(
      (res => {
        console.log(res)
      })
    )

  }


}
