import {KeycloakService} from 'keycloak-angular';
import {environment} from "../environments/environment";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return () =>
        keycloak.init({
            enableBearerInterceptor: true,
            config: {
                url: environment.configUrl,
                realm: environment.configRealm,
                clientId: environment.configClientId,
            },
            initOptions: {
                checkLoginIframe: false,
                redirectUri: window.location.origin
                // silentCheckSsoRedirectUri:
                //     window.location.origin + '/assets/silent-check-sso.html'
            }
        });
}

