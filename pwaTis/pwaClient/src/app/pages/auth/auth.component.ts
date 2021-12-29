import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthService) { }

  user !: UserResponse;

  

  ngOnInit(): void {
    this.authService.getUser(1).subscribe(
      (user => {
        this.user = user;
        console.log(user);
      })
    )
  }


}
