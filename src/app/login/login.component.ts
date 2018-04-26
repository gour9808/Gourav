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

  test_url: string = "https://apis-cidaas.test.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=https://apis.test.carbookplus.com/carbook-data-manager/auth/callback&response_type=token&client_id=26015e703f8f412796a0f0cf6ab10e72&viewtype=login";

  dev_url: string = "https://apis-cidaas.test.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=http://localhost:4200/auth/callback&response_type=token&client_id=26015e703f8f412796a0f0cf6ab10e72&viewtype=login";

  prod_url: string = "https://cidaas.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=https://apis.carbookplus.com/carbook-data-manager/auth/callback&response_type=token&client_id=29e27a2ee4ce4f68a554052a6dfc3680&viewtype=login";

  temp_url: string = "https://cidaas.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=http://localhost:4200/auth/callback&response_type=token&client_id=29e27a2ee4ce4f68a554052a6dfc3680&viewtype=login";

  constructor(private auth: AuthService, private router: Router) {
    console.log('Init LoginComponent');
    console.log('')
  }

  ngOnInit() {
    localStorage.clear();
  }

  doLogin() {
    console.log("Login here");
    // window.location.href = this.temp_url;
    if (environment.production)
      window.location.href = this.prod_url;
    else if (environment.test)
      window.location.href = this.test_url;
    else
      window.location.href = this.dev_url;
  }


}