import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

    constructor(private keycloakService: KeycloakService,  private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the Keycloak token
        const token = this.keycloakService.getKeycloakInstance().token;

        // Clone the request and append the token to the headers
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            });
        }

        // Pass the request to the next interceptor or handler
        return next.handle(request).pipe(
            catchError(async (error: HttpErrorResponse) => {
                // Check if the error is a 401 Unauthorized response
                if (error.status === 401) {
                    // Redirect to the login page

                    const state = window.location.pathname + window.location.search +  window.location.hash;

                    await this.keycloakService.login({
                        redirectUri: window.location.origin + state
                    });
                }
                // Pass the error through to the error handler
                throw error;
            })
        );

    }
}
