import {inject, NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthGuard} from "./core/guards/auth-guard";
import {ErrorComponent} from "./shared/components/error/error.component";
import {JwtService} from "./shared/services/auth/jwt.service";
import {ProfileService} from "./shared/services/auth/profile.service";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
};

const routes: Routes = [
    {
        path: '',
        redirectTo: '/private/process-profile',
        pathMatch: 'full'},
    {
        path: 'private',
        canActivate: [AuthGuard],
        component: AppLayoutComponent,
        children: [{
            resolve: {
                tokenData: () =>   inject(JwtService).init(),
                profileData: () => inject(ProfileService).init(),
            },
            path: '',
            loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule)
        },
        ]
    },
    {
        path: 'auth',
        data: {breadcrumb: 'Auth'},
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'error',
        component: ErrorComponent,
    },
    {path: '**', redirectTo: '/notfound', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
