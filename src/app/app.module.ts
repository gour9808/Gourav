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
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { CircularProgressComponent } from './widgets/circular-progress/circular-progress.component';

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
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";
import { InputFieldAutoCompleteComponent } from './widgets/input-field-auto-complete/input-field-auto-complete.component';
import { MultiSelectModule } from 'primeng/primeng';

import { SizePipe } from './utils/pipes/size.pipe';

import { InputFieldMultipleOptionComponent } from './widgets/input-field-multiple-option/input-field-multiple-option.component';
import { InputFieldAutocompleteAddressComponent } from './widgets/input-field-autocomplete-address/input-field-autocomplete-address.component';

@NgModule({
  declarations: [
    AppComponent,
    DataLoaderComponent,
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
    InputFieldAutoCompleteComponent,
    SizePipe,
    InputFieldMultipleOptionComponent,
    InputFieldAutocompleteAddressComponent,
    
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
  providers: [  VehicleService, Communicator],
  bootstrap: [AppComponent]
})
export class AppModule { }
