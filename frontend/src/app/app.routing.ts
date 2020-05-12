import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SitesCreateComponent } from '@app/sites/create/sites.create.component';
import { AuthGuard } from './_helpers';
import { ShowSiteComponent } from '@app/sites/show/site.show.component';
import { AnalyticsComponent } from '@app/analytics/analytics.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'sites/:id', component: ShowSiteComponent, canActivate: [AuthGuard] },
    { path: 'site-crete', component: SitesCreateComponent, canActivate: [AuthGuard] },
    { path: 'site-analytics/:id', component: AnalyticsComponent, canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
