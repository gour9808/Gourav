import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'callback',
    template: `<div class="app-header" style="position:relative;width:100%;height:100%">
            <img class="logo animated zoomIn" src="assets/logo.png" style="position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;" />
        </div>`
})
export class CallbackComponent implements OnInit {
    constructor(private router: Router, private currentRoute: ActivatedRoute) {
    }

    ngOnInit() {
        console.log("Callback", this.router.url);
        var str = this.router.url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        console.log("Access token is", str);
        if (str != null && str != undefined) {
            localStorage.setItem("session", JSON.stringify({ authenticated: true, token: str }));
            this.router.navigate(['/load']);
        } else {
            this.router.navigate(['/auth']);
        }
    }
}