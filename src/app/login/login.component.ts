import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router) {
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