import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Cache } from '../service/storage.provider';

@Component({
    selector: 'app-data-loader',
    templateUrl: './data-loader.component.html',
    styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {
    @Cache({ pool: 'User' }) userInfo: any;
    times = [{ odd: true }, { odd: false }, { odd: true }, { odd: false }];

    constructor(private user: UserService, private router: Router) {
    }

    ngOnInit() {
        console.log('Init Data Loader');
        this.fetchUserInfo();

    }

    fetchUserInfo() {
        this.user.fetchUserInfo().subscribe(userInfo => {
            console.log('User info is', userInfo);
            this.userInfo = userInfo;
            this.router.navigate(['/home/customer/dashboard'])
        }, error => {
            this.router.navigate(['/auth']);
        });
    }

}
