import {IErrorMessages} from '../form-error-interfaces/i-error-messages';
import {IMessages} from '../form-error-interfaces/imessages';

export class Messages implements IMessages {

    message(): IErrorMessages {
        return {
            minLength: 'Longitud mínima',
            maxLength: 'Longitud máxima',
            strongPassword: 'Tu contraseña debe contener al menos una letra mayúscula, una letra minúscula y un dígito',
            equalsToPassword: 'Las contraseñas no coinciden',
            required: 'Este campo es obligatorio',
            email: 'El correo electrónico proporcionado no es válido',
            min: 'Mínimo',
            max: 'Máximo',
            notValidUrl: 'La URL no es válida'
        };
    }

}
