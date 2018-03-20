import { Routes } from '@angular/router';

import { ContainerComponent } from './container/container.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';

import { DataLoaderComponent } from './data-loader/data-loader.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'auth', component: LoginComponent },
     { path: 'load', component: DataLoaderComponent },

    {
        path: 'home', component: ContainerComponent,
        children: [
            { path: '', redirectTo: 'my', pathMatch: 'full' },
            {
                path: 'my', component: DashboardComponent, children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', component: DashboardComponent },
                ]
            },
            // { path: 'family', component: FamilyListComponent },
            // { path: 'test', component: TestsComponent },
        ]
    },

];
// The layout will be like so:
// ->Login
// ->Loading
// ->Main Container
//     ->Other Pages
// ->Other Pages which does not encapsulate the Sidebar-Toolbar-Content layout