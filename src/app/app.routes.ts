import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback.component';
import { OAuthGuard } from "./login/oauthguard.service";
import { ContainerComponent } from './container/container.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleListEditComponent } from './vehicle/vehicle-list-edit/vehicle-list-edit.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleServiceComponent } from './widgets/vehicle-service/vehicle-service.component';
import { VehicleCloneTemplateComponent } from './vehicle/vehicle-clone-template/vehicle-clone-template.component';
import { CopyPasteVehicleComponent } from './vehicle/copy-paste-vehicle/copy-paste-vehicle.component';
import { VehiclePasteComponent } from './vehicle/vehicle-paste/vehicle-paste.component';
import { ClonePartsComponent } from './vehicle/clone-parts/clone-parts.component';

import {ProfileComponent} from './registration/profile/profile.component';
import {MainComponent} from './registration/main/main.component';
import {WorkingHoursComponent} from './registration/working-hours/working-hours.component';
import {ImageComponent} from './registration/image/image.component';
import { SalesServiceComponent } from './registration/sales-service/sales-service.component';
import { CreateDealerComponent} from './create-dealer/create-dealer.component';
import {SearchDealerComponent} from './create-dealer/search-dealer/search-dealer.component';
import { DealerListComponent } from './create-dealer/dealer-list/dealer-list.component';
import { CloneDealerComponent } from './create-dealer/clone-dealer/clone-dealer.component';

export const appRoutes: Routes = [
    { path: 'auth', component: LoginComponent },
    { path: 'auth/callback', component: CallbackComponent },
    { path: 'load', component: DataLoaderComponent, canActivate: [OAuthGuard] }, //Get all the basic data like user info and org info here before redirecting to the main screen
    {
        path: 'home', component: ContainerComponent, canActivate: [OAuthGuard],
        children: [
            { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
            {
                path: 'vehicle', component: VehicleComponent, children: [
                    { path: '', redirectTo: 'new', pathMatch: 'full' },
                    { path: 'new', component: VehicleCreateComponent },
                    { path: 'list', component: VehicleListComponent },
                    { path: 'clone', component: VehicleCloneTemplateComponent },
                    { path: 'part-clone', component: ClonePartsComponent },

                    { path: 'vehicle-clone', component: CopyPasteVehicleComponent },
                    { path: 'paste/:id', component: VehiclePasteComponent },
                    { path: 'search', component: VehicleSearchComponent },
                    { path: 'update/:id', component: VehicleDetailComponent },
                ]
            },
            {
                path: 'dealer', component: MainComponent, children: [
                    { path: '', redirectTo: 'profile', pathMatch: 'full' },
                    { path: 'profile', component: CreateDealerComponent },
                    { path: 'clone', component: CloneDealerComponent },
                    { path: 'list', component: DealerListComponent },
                    { path: 'search', component: SearchDealerComponent }                                     
                ]   
            }
        ]
    },
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'fleet-management-ui', redirectTo: '', pathMatch: 'full' }
];
// The layout will be like so:
// ->Login
// ->Loading
// ->Main Container
//     ->Other Pages
// ->Other Pages which does not encapsulate the Sidebar-Toolbar-Content layout