import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-data-loader',
    templateUrl: './data-loader.component.html',
    styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {
    times = [{ odd: true }, { odd: false }, { odd: true }, { odd: false }];

    constructor(private router: Router) {
    }

    ngOnInit() {
        console.log('Init Data Loader');
        this.fetchUserInfo();

    }

    fetchUserInfo() {
       
            this.router.navigate(['/home/customer/dashboard'])
        }

}
