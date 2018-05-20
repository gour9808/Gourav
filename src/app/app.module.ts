import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { PanelModule } from 'primeng/panel';
import { DataTableModule, SharedModule, DropdownModule, TooltipModule, CheckboxModule, DataGridModule, AutoCompleteModule, GMapModule, DialogModule, CalendarModule, RadioButtonModule, AccordionModule, TabViewModule, ChipsModule } from 'primeng/primeng';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContainerComponent } from './container/container.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { CircularProgressComponent } from './widgets/circular-progress/circular-progress.component';
import { CardComponent } from './widgets/card/card.component';
import { ButtonComponent } from './widgets/button/button.component';
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";
import { DataViewModule } from 'primeng/dataview';

import { MultiSelectModule } from 'primeng/primeng';
import { SizePipe } from './utils/pipes/size.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DashTileComponent } from './widgets/dash-tile/dash-tile.component';
import { MenuItemComponent } from './widgets/menu-item/menu-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ChartModule } from 'primeng/primeng';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SplashLoaderComponent } from './splash-loader/splash-loader.component';
import  {  TableModule  }  from  'primeng/table';
import { ProductsService } from './services/products.service';
import { FeatureService } from './services/feature.service';
import { BrandService } from './services/brand.service';
import { CatagoriesService } from './services/catagories.service';


@NgModule({
  declarations: [
    AppComponent,
    DashTileComponent,
    SidebarComponent,
    ToolbarComponent,
    ContainerComponent,
    LoaderComponent,
    CircularProgressComponent,
    CardComponent,
    ButtonComponent,
    SizePipe,
    DashboardComponent,
    MenuItemComponent,
    ListItemComponent,
    SplashLoaderComponent, 



  ],
  imports: [
    RouterModule.forRoot(appRoutes), DataViewModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule, ChartModule,
    DataTableModule,
    SharedModule, TableModule,
    DropdownModule,
    TooltipModule,
    AutoCompleteModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    AccordionModule,
    TabViewModule,
    ChipsModule,
    PanelModule,
    OverlayPanelModule,
    FlexLayoutModule,
    CheckboxModule,
    DataGridModule, HttpClientModule,
    GMapModule,
    NgxChartsModule
  ],
  providers: [ProductsService, FeatureService, BrandService, CatagoriesService],

  bootstrap: [AppComponent]
})
export class AppModule { }
