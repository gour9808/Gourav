import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import {AuthService} from '../service/auth.service'
@Injectable()
export class OAuthGuard implements CanActivate {

    constructor(public router: Router,private auth: AuthService) { }
    canActivate() {
        console.log("Is Authnticated ", this.auth.getSession());
        if (!this.auth.isAuthenticated())
            this.router.navigate(['/auth']);

        return this.auth.isAuthenticated();
    }
}
