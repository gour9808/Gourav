import { Routes } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleListEditComponent } from './vehicle/vehicle-list-edit/vehicle-list-edit.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleServiceComponent } from './widgets/vehicle-service/vehicle-service.component';


export const appRoutes: Routes = [
  
    { path: 'load', component: DataLoaderComponent }, //Get all the basic data like user info and org info here before redirecting to the main screen
    {
        path: 'home', component: ContainerComponent,
        children: [
            { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
            {
                path: 'vehicle', component: VehicleComponent, children: [
                    { path: '', redirectTo: 'new', pathMatch: 'full' },
                    { path: 'new', component: VehicleCreateComponent },
                    { path: 'list', component: VehicleListComponent },
                   
                    { path: 'search', component: VehicleSearchComponent },
                    { path: 'update/:id', component: VehicleDetailComponent },
                ]
            },
            {
                path: 'dealer', component: VehicleListComponent, children: [
                    { path: '', redirectTo: 'profile', pathMatch: 'full' },
                    { path: 'profile', component: VehicleListComponent },
                    { path: 'clone', component: VehicleListComponent },
                    { path: 'list', component: VehicleListComponent },
                    { path: 'search', component: VehicleListComponent }                                     
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