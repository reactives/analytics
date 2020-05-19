import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SitesComponent } from '@app/sites';
import { RegisterComponent } from '@app/register';
import { SitesCreateComponent } from '@app/sites/create/sites.create.component';
import { ShowSiteComponent } from '@app/sites/show/site.show.component';
import { AnalyticsComponent } from '@app/analytics/analytics.component';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './pie/pie.component';
import { UserPieComponent } from './user-pie/user-pie.component';
import { NavComponent } from './nav/nav.component';
import { UserDevicesComponent } from './user-devices/user-devices.component';


@NgModule({
  imports: [
    BrowserModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,

  ],
    declarations: [
        AppComponent,
        HomeComponent,
        SitesComponent,
        SitesCreateComponent,
        ShowSiteComponent,
        RegisterComponent,
        AnalyticsComponent,
        LoginComponent,
        PieComponent,
        UserPieComponent,
        NavComponent,
        UserDevicesComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
