import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { DataTableModule, SharedModule, DropdownModule, TooltipModule,CheckboxModule, DataGridModule,AutoCompleteModule,GMapModule, DialogModule, CalendarModule, RadioButtonModule, AccordionModule, TabViewModule, ChipsModule } from 'primeng/primeng';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContainerComponent } from './container/container.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { HttpServiceInterceptor } from './interceptor/http.interceptor';
import { OAuthGuard } from './login/oauthguard.service';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { CircularProgressComponent } from './widgets/circular-progress/circular-progress.component';
import { AuthService } from './service/auth.service';
import { WindowService } from './service/window.service';
import { UserService } from './service/user.service';
import { InputFieldTextComponent } from './widgets/input-field-text/input-field-text.component';
import { InputFieldNumberComponent } from './widgets/input-field-number/input-field-number.component';
import { InputFieldBooleanComponent } from './widgets/input-field-boolean/input-field-boolean.component';
import { InputFieldOptionsComponent } from './widgets/input-field-options/input-field-options.component';
import { InputFieldMultipleComponent } from './widgets/input-field-multiple/input-field-multiple.component';
import { VehicleService } from './service/vehicle.service';
import { VehicleListEditComponent } from './vehicle/vehicle-list-edit/vehicle-list-edit.component';
import { TabbarComponent } from './tabbar/tabbar.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { Communicator } from "./service/communicator.service";
import { CardComponent } from './widgets/card/card.component';
import { ButtonComponent } from './widgets/button/button.component';
import { VehicleServiceComponent } from './widgets/vehicle-service/vehicle-service.component';
import { VehicleServiceDirective } from './directives/vehicle-service.directive';
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";
import { DataStorageService } from './service/data-storage.service';
import { NewPartDialogComponent } from './dialogs/new-part-dialog/new-part-dialog.component';
import { NewServiceDialogComponent } from './dialogs/new-service-dialog/new-service-dialog.component';
import { InputFieldAutoCompleteComponent } from './widgets/input-field-auto-complete/input-field-auto-complete.component';
import { MultiSelectModule } from 'primeng/primeng';
import { VehicleSearchDialogComponent } from './dialogs/vehicle-search-dialog/vehicle-search-dialog.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { VehicleCloneTemplateComponent } from './vehicle/vehicle-clone-template/vehicle-clone-template.component';
import { ClonePartDialogComponent } from './dialogs/clone-part-dialog/clone-part-dialog.component';
import { CloneVehicleDialogComponent } from './dialogs/clone-vehicle-dialog/clone-vehicle-dialog.component';
import { ClonePartsComponent } from './vehicle/clone-parts/clone-parts.component';
import { CopyPasteVehicleComponent } from './vehicle/copy-paste-vehicle/copy-paste-vehicle.component';
import { VehiclePasteComponent } from './vehicle/vehicle-paste/vehicle-paste.component';
import { CloneVehicleComponent } from './vehicle/clone-vehicle/clone-vehicle.component';

import { MainComponent } from './registration/main/main.component';
import { ProfileComponent } from './registration/profile/profile.component';
import { WorkingHoursComponent } from './registration/working-hours/working-hours.component';
import { SalesServiceComponent } from './registration/sales-service/sales-service.component';
import { ImageComponent } from './registration/image/image.component';
import { FileUploaderComponent } from './widgets/file-uploader/file-uploader.component';
import { SizePipe } from './utils/pipes/size.pipe';

import { ImageService } from './service/image.service';
import { DealerService } from './service/dealer.service';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { SearchDealerComponent } from './create-dealer/search-dealer/search-dealer.component';
import { DealerListComponent } from './create-dealer/dealer-list/dealer-list.component';
import { InputFieldMultipleOptionComponent } from './widgets/input-field-multiple-option/input-field-multiple-option.component';
import { InputFieldAutocompleteAddressComponent } from './widgets/input-field-autocomplete-address/input-field-autocomplete-address.component';
import { CloneDealerComponent } from './create-dealer/clone-dealer/clone-dealer.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    DataLoaderComponent,
    LoginComponent,
    SidebarComponent,
    ToolbarComponent,
    ContainerComponent,
    VehicleComponent,
    VehicleListComponent,
    VehicleDetailComponent,
    VehicleCreateComponent,
    LoaderComponent,
    CircularProgressComponent,
    InputFieldTextComponent,
    InputFieldNumberComponent,
    InputFieldBooleanComponent,
    InputFieldOptionsComponent,
    InputFieldMultipleComponent,
    VehicleListEditComponent,
    TabbarComponent,
    VehicleSearchComponent,
    CardComponent,
    ButtonComponent,
    VehicleServiceComponent,
    VehicleServiceDirective,
    NewPartDialogComponent,
    NewServiceDialogComponent,
    InputFieldAutoCompleteComponent,
    VehicleSearchDialogComponent,
    MainComponent,
    ProfileComponent,
    WorkingHoursComponent,
    SalesServiceComponent,
    ImageComponent,
    FileUploaderComponent,
    SizePipe,
    DragDropDirective,
    CreateDealerComponent,
    SearchDealerComponent,
    DealerListComponent,
    InputFieldMultipleOptionComponent,
    VehicleCloneTemplateComponent,
    ClonePartDialogComponent,
    CloneVehicleDialogComponent,
    ClonePartsComponent,
    CloneVehicleComponent,
    CopyPasteVehicleComponent,
    VehiclePasteComponent,
    InputFieldAutocompleteAddressComponent,
    CloneDealerComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDd07ZUbURPyQfbjeLpXcOMQsn2znqEcok",
      libraries: ["places"]
    }),
    BrowserModule,
    AgmCoreModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    DropdownModule,
    TooltipModule,
    AutoCompleteModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    AccordionModule,
    TabViewModule,
    ChipsModule,
    ToasterModule,
    OverlayPanelModule,
    FlexLayoutModule,
    CheckboxModule,
    DataGridModule,
    GMapModule
  ],
  providers: [{ provide: Http, useClass: HttpServiceInterceptor }, OAuthGuard, AuthService,ImageService, DealerService,  WindowService, UserService, VehicleService, Communicator, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
