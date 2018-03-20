import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { DataTableModule, SharedModule, DropdownModule, TooltipModule, CheckboxModule, DataGridModule, AutoCompleteModule, GMapModule, DialogModule, CalendarModule, RadioButtonModule, AccordionModule, TabViewModule, ChipsModule } from 'primeng/primeng';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContainerComponent } from './container/container.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { CircularProgressComponent } from './widgets/circular-progress/circular-progress.component';

import { InputFieldTextComponent } from './widgets/input-field-text/input-field-text.component';
import { InputFieldNumberComponent } from './widgets/input-field-number/input-field-number.component';
import { InputFieldBooleanComponent } from './widgets/input-field-boolean/input-field-boolean.component';
import { InputFieldOptionsComponent } from './widgets/input-field-options/input-field-options.component';
import { InputFieldMultipleComponent } from './widgets/input-field-multiple/input-field-multiple.component';

import { CardComponent } from './widgets/card/card.component';
import { ButtonComponent } from './widgets/button/button.component';
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";

import { MultiSelectModule } from 'primeng/primeng';
import { SizePipe } from './utils/pipes/size.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DashTileComponent } from './widgets/dash-tile/dash-tile.component';
import { TestsComponent } from './tests/tests.component';
import { MenuItemComponent } from './widgets/menu-item/menu-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ChartModule } from 'primeng/primeng';
import { FamilyListComponent } from './family-list/family-list.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { OAuthGuard } from './login/oauthguard.service';
import { CallbackComponent } from './login/callback.component';
import { AuthService } from './service/auth.service';
import { WindowService } from './service/window.service';
import { Communicator } from "./service/communicator.service";
import { DataStorageService } from './service/data-storage.service';
import { InputFieldMultipleOptionComponent } from './widgets/input-field-multiple-option/input-field-multiple-option.component';
import { UserService } from './service/user.service';
import { HttpInterceptorService } from './interceptor/http.interceptor.service';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { StorageService } from './service/storage.provider';
import { SplashLoaderComponent } from './splash-loader/splash-loader.component';
import { TableModule } from 'primeng/table'; 
import { PlaceholdersComponent } from './widgets/placeholders/placeholders.component';


@NgModule({
  declarations: [
    AppComponent,
    DashTileComponent,
    SidebarComponent,
    ToolbarComponent,
    ContainerComponent,
    CallbackComponent,
    LoaderComponent,
    CircularProgressComponent,
    InputFieldTextComponent,
    InputFieldNumberComponent,
    InputFieldBooleanComponent,
    InputFieldOptionsComponent,
    InputFieldMultipleComponent,
    CardComponent,
    ButtonComponent,
    InputFieldMultipleOptionComponent,
    SizePipe,
    DashboardComponent,
    TestsComponent,
    MenuItemComponent,
    ListItemComponent,
    FamilyListComponent,
    LoginComponent,
    DataLoaderComponent,
    SplashLoaderComponent,PlaceholdersComponent
    


  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule, ChartModule,
    DataTableModule,
    SharedModule,TableModule,
    DropdownModule,
    TooltipModule,
    AutoCompleteModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    AccordionModule,
    TabViewModule,
    ChipsModule,
   
    OverlayPanelModule,
    FlexLayoutModule,
  CheckboxModule,
    DataGridModule,HttpClientModule,
    GMapModule,
    NgxChartsModule
  ],
  providers: [ {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }, OAuthGuard,UserService, AuthService, WindowService, Communicator, DataStorageService, StorageService
        ],

  bootstrap: [AppComponent]
})
export class AppModule { }
