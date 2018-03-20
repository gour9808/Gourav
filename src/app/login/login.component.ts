import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
    console.log('Init LoginComponent');
  }

  ngOnInit() {
    localStorage.clear();
  }

  doLogin() {
    console.log("Login here");
    this.router.navigate(['/home/customer/dashboard'])
  }

}