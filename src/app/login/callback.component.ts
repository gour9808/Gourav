import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../service/user.service';
import { Cache } from '../service/storage.provider';
import { AuthService } from '../service/auth.service';
import * as moment from 'moment';

@Component({
    selector: 'callback',
    template: `<div class="app-header" style="position:relative;width:100%;height:100%">
            <img class="logo animated zoomIn" src="assets/logo.png" style="position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;" />
        </div>`
})
export class CallbackComponent implements OnInit {
    @Cache({ pool: 'Session' }) userSession: any;
    @Cache({ pool: 'User' }) userInfo: any;

    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService, private user: UserService) {
    }

    ngOnInit() {
       const str = (this.router.url.match(/\#(?:access_token)\=([\S\s]*?)\&/) || this.router.url.match(/\#(?:access_token)\%3D([\S\s]*?)%26/))[1];
        console.log('Access token is', str);
        if (str != null && str !== undefined) {
            this.userSession = {
                token: str, expires: moment().add(1, 'days')
            };
            this.router.navigate(['/load']);
        } else {
            this.router.navigate(['/auth']);
        }
    }
}
