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

  test_url: string = "https://healthcubed.cidaas.de/oauth2-login/oauth2/authz?redirect_uri=http://portal.centralindia.cloudapp.azure.com/auth/callback&response_type=token&client_id=9ff6b0ae36bb4181aa415da24201e995&viewtype=login";

  dev_url: string = "https://healthcubed.cidaas.de/oauth2-login/oauth2/authz?redirect_uri=http://portal.centralindia.cloudapp.azure.com/auth/callback&response_type=token&client_id=9ff6b0ae36bb4181aa415da24201e995&viewtype=login";

  prod_url: string = "https://healthcubed.cidaas.de/oauth2-login/oauth2/authz?redirect_uri=http://portal.centralindia.cloudapp.azure.com/auth/callback&response_type=token&client_id=9ff6b0ae36bb4181aa415da24201e995&viewtype=login";


  constructor(private auth: AuthService, private router: Router) {
    console.log('Init LoginComponent');
  }

  ngOnInit() {
    localStorage.clear();
  }

  doLogin() {
    console.log("Login here");
    if (environment.production)
      window.location.href = this.prod_url;
    else if (environment.test)
      window.location.href = this.test_url;
    else
      window.location.href = this.dev_url;
  }


}