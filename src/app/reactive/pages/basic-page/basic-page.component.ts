import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit{

  /// FORMA 1: CREAR UN FORMULARIO CON CONSTRUCTOR DE FORMGROUP
  ///-------------------------------------
  // public myForm: FormGroup = new FormGroup( {
  //   /// PARAMETROS DEL CONSTRUCTOR DE FormControl
  //   // new FormControl( <valor por defecto> , < array de validaciones síncronas>, < array de validaciones asíncronas>  )
  //   name:   new FormControl('', [], [] ),
  //   price:  new FormControl(0, [], [] ),
  //   stock:  new FormControl(0, [], [] ),
  // } );

  /// FORMA 2: CREAR FORMULARIO CON FORM BUILDER
  //---------------------------------------------
  /*
   * 1- Inyectar el servicio FormBuilder en el constructor
   * 2- Implementas la interfz onInit.
   * 3- Inicializas el formulario dentro del ngOnInit().
   */

  public myForm!: FormGroup;

  constructor( private fb: FormBuilder ){}

  public ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required,
                   Validators.maxLength(50),
                   Validators.minLength(3)
                  ],
                  []
            ],
      price: [0, [ Validators.required,
                   Validators.min(0)
                  ],
                 []
            ],
      stock: [0, [ Validators.required,
                   Validators.min(0)
                  ],
                  []
            ],
    });

    /// INICIALIZACIÓN DE MI FORMULARIO
    const productFromBackend = { name: 'VALOR INICIAL', price: 1234, stock: 1234 };

    // this.myForm.reset( productFromBackend );


  }

  public onSave(): void {
    console.log( this.myForm.value );
    console.log( `Es valido? ${this.myForm.valid}` );
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.myForm.reset( {name: 'Nombre Reseteado', price: 99, stock: 100} );
  }

  public isInvalidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null{

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys( errors )) {
      switch( key ){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo requiere mínimo ${errors['minlength'].requiredLength} caracteres.`
      }
    }
    return null;
  }



}
