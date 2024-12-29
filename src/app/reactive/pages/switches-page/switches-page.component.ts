import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit{

  public myForm!: FormGroup;

  public person = {
    gender: 'F',
    wantNotifications: true,
  }

  constructor( private fb: FormBuilder ){}


  public ngOnInit(): void {
    this.myForm = this.fb.group( {
        gender: ['M', Validators.required],
        wantNotifications: [true, Validators.required],
        termsAndConditions: [false, Validators.requiredTrue]
    });
    this.myForm.reset( this.person );
  }

  public onSave(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log( this.myForm.value );
  }

  public isInvalidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

}
