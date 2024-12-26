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
  }


  public onSave(): void {

    console.log( this.myForm.value );
    console.log( `Es valido? ${this.myForm.valid}` );
  }


}
