import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            // { path: '', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
            { path: 'request-access', loadChildren: () => import('./pages/request-access/request-access.module').then((m) => m.RequestAccessModule) },
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
