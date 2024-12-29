import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  public cantBeStrider = ( control: FormControl ) => {
    const value: string = control.value.trim().toLowerCase();
    if( value === 'strider' )
      return { strider: true }
    return null;
  }

  public isInvalidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors &&
           form.controls[field].touched;
  }

  /// NOTA: UNA VALIDACIÓN ASÍNCRONA ES UN MÉTODO QUE TE DEVUELVE UNA "PROMESA" O UN "OBSERVABLE"
  /// DONDE LA PROMESA/OBSERVABLE DEVUELVE EL ERROR ( { "isAuthorized": true } ), O NULL ( EN CASO QUE NO HALLA ERROR ).


  public isFieldOneEqualsFieldTwo( field1: string, field2: string ): Function {
    return ( formGroup: FormControl ): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      if( field1Value !== field2Value ) {
        formGroup.get(field2)?.setErrors( { areEqual: false } );
        return { areEqual: false };
      }
      return null;

    }
  }


}
