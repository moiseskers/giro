import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessProfileComponent} from "./shared/components/process-profile/process-profile.component";
import {AdminAuthGuard} from '../core/guards/admin-auth-guard';
import {ManagerAuthGuard} from '../core/guards/manager-auth-guard';
import {ProducerAuthGuard} from '../core/guards/producer-auth-guard';
import {IndustrialAuthGuard} from '../core/guards/industrial-auth-guard';
import {CityAuthGuard} from '../core/guards/city-auth-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'process-profile',
                component: ProcessProfileComponent
            },
            {
                path: 'admin',               canActivate: [AdminAuthGuard], loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
            },
            {
                path: 'manager',             canActivate: [ManagerAuthGuard], loadChildren: () => import('./manager/manager.module').then((m) => m.ManagerModule)
            },
            {
                path: 'producer',            canActivate: [ProducerAuthGuard], loadChildren: () => import('./producer/producer.module').then((m) => m.ProducerModule)
            },
            {
                path: 'industrial-consumer', canActivate: [IndustrialAuthGuard], loadChildren: () => import('./industrial-consumer/industrial-consumer.module').then((m) => m.IndustrialConsumerModule)
            },
            {
                path: 'city',                canActivate: [CityAuthGuard], loadChildren: () => import('./city/city.module').then((m) => m.CityModule)
            },
        ], )
    ],
    exports: [RouterModule]
})
export class PrivateRoutingModule {
}

