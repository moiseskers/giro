import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {default as esJson} from '../assets/prime-ng-languages/es.json';
import {CssHelper} from './shared/helpers/css.helper';

export let browserRefresh = false;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    subscription: Subscription;
    primaryColor = CssHelper.cssVariableAsHash('--primary-color');

    constructor(private primengConfig: PrimeNGConfig,
                private router: Router) {
        this.subscription = router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                browserRefresh = !router.navigated;
            }
        });


        this.primengConfig.setTranslation(esJson);
    }

    // clearCookies() {
    //     // Get all cookies
    //     const cookies = document.cookie.split(";");
    //
    //     // Loop through each cookie and clear it by setting its expiry date to a past date
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i];
    //         const eqPos = cookie.indexOf("=");
    //         const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    //     }
    //
    //     // Optionally, you can also clear cookies from specific paths or domains if needed
    //     // document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    //     // document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.example.com; path=/';
    //
    //     // After clearing cookies, you may want to perform further actions or notify the user
    //     console.log('Cookies cleared successfully');
    // }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        // this.clearCookies()
    }
}
