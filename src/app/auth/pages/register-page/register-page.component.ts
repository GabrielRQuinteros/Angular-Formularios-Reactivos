import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorsService } from '../../../shared/services/custom-validators.service';
import EmailValidator from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{

  public myForm!: FormGroup;
  constructor( private fb: FormBuilder,
               private customValidator: CustomValidatorsService,
               private emailValidator: EmailValidator
  ){}

  public ngOnInit(): void {
    this.myForm = this.fb.group( {
        name: [ '', [Validators.required, Validators.pattern( this.customValidator.firstNameAndLastnamePattern )] ],
        username: [ '', [Validators.required, this.customValidator.cantBeStrider ] ],
        email: [ '', [Validators.required, Validators.pattern( this.customValidator.emailPattern )], [this.emailValidator.validate.bind(this.emailValidator)] ],
        password: [ '', [Validators.required, Validators.minLength(6)] ],
        passwordConfirmation:[ '', [Validators.required] ]
        },
        {
          /// ESTOS VALIDADORES SE APLICAN A NIVEL DE FORMULARIO (FORM GROUP)
          /// Y NO A NIVEL DE CAMPO ( NO A NIVEL DE FORM CONTROL)
          validators: [ this.customValidator.isFieldOneEqualsFieldTwo('password', 'passwordConfirmation') ]
        }

  );
  }

  public isInvalidField( field: string ): boolean | null {
    return this.customValidator.isInvalidField( this.myForm, field );
  }



  public onSubmit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log( this.myForm.value );
  }


}
