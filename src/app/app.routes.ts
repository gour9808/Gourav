import { Routes } from '@angular/router';

import { ContainerComponent } from './container/container.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestsComponent } from './tests/tests.component';
import { FamilyListComponent } from './family-list/family-list.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback.component';
import { OAuthGuard } from './login/oauthguard.service';
import { DataLoaderComponent } from './data-loader/data-loader.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'auth', component: LoginComponent },
  //  { path: 'auth/callback', component: CallbackComponent },
     { path: 'load', component: DataLoaderComponent },

    {
        path: 'home', component: ContainerComponent,
        children: [
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
            {
                path: 'customer', component: DashboardComponent, children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', component: DashboardComponent },
                ]
            },
            { path: 'family', component: FamilyListComponent },
            { path: 'test', component: TestsComponent },
        ]
    },

];
// The layout will be like so:
// ->Login
// ->Loading
// ->Main Container
//     ->Other Pages
// ->Other Pages which does not encapsulate the Sidebar-Toolbar-Content layout