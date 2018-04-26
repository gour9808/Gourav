import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
/**
 * For data manager, check if user is assiged to a data-manager group. If not assigned, then the user cannot access this page.
 * Show error.
 * 
 * Use this class for loading necessary data before showing the user interface for the user.
 * Do not get. Use fetch instead. This ensures fresh data after every login.
 * Although there could be some better way to do this, I'm in a hurry to push this to test env, so ¯\_(ツ)_/¯
 */
export class DataLoaderComponent implements OnInit {

  constructor(private router: Router,private userservice: UserService)  { }

  ngOnInit() {
    console.log("Init Data Loader");
    this.getUserInfo();
  }

   updateUserGroupList(info) {
    var body = {
      "userId": info.userId,
      "groupList": [
        {
          "groupId": "cbp-dm-1151-00",
          "groupName": "DataManager"
        }
      ]
    };
    this.userservice.updateUserGroup(body).subscribe(res => {
      console.log("Group Updated for User");
    });
  }

  getUserInfo() {
    this.userservice.fetchUserInfo().subscribe(userInfo => {
      console.log("User info is", userInfo);
     this.getOrganisationInfo();
    });
  }

  getOrganisationInfo() {
    this.userservice.fetchUserOrgInfo().subscribe((user) => {
      console.log("Info from CIDAAS", user);
      if (user.groups != null)
        this.userservice.fetchGroupListForUser(user.ssoId).subscribe(lists => {
          console.log("Group List is ", lists);
          lists = _.reverse(lists); //read the last inserted item instead of the first to get the latest orgId.
          let orgID = _.find(lists, function (item) {
            return item.groupId != "" && item.groupName == "DataManager";
          });
          console.log("Found Org with ID", orgID);
          if (orgID != null && orgID != undefined) {
            if (orgID.groupId != null && orgID.groupId != "") {
              localStorage.setItem("orgId", orgID.groupId);
              this.router.navigate(['/home/vehicle']);
            } else {
              this.router.navigate(['/auth']);
            }
          } else {
            this.router.navigate(['/auth']);
          }
        }, (error) => {
          console.log("Error Fetching");
          this.router.navigate(['/auth']); //No OrgId found. Redirect to user profile.
        });
      else
        this.router.navigate(['/auth']); //No OrgId found. Redirect to user profile.
    }, (error) => {
      console.log("Error Fetching");
      this.router.navigate(['/server-error']);
    });
  }
}
