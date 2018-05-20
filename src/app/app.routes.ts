import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
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

        ]
    },

];
// The layout will be like so:
// ->Login
// ->Loading
// ->Main Container
//     ->Other Pages
// ->Other Pages which does not encapsulate the Sidebar-Toolbar-Content layout