import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent implements OnInit {
  public myForm!: FormGroup;

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Dragon Age Origins', Validators.required]
      ])
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
    this.myForm.setControl('favoriteGames', this.fb.array([]));
    this.newFavorite.reset();
  }

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
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

  public isInvalidaFieldInArray( formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors &&
           formArray.controls[index].touched;
  }


  public onAddToFavorites(): void {
    if( this.newFavorite.invalid ) {
      this.newFavorite.markAsTouched();
      return;
    }
    const newFav: string = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control( newFav , Validators.required));
    this.newFavorite.reset();

  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

}
