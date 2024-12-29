import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class EmailValidator implements AsyncValidator{

  constructor( private http: HttpClient) { }

  public validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return new Observable( ( subscriber ) => {
        console.log( { email } );
        if( email === 'fernando@gmail.com' )
          subscriber.next( { isTaken: true } );
        else
          subscriber.next( null );

        subscriber.complete();
    });
  }


  // ESTA ES LA PRIMERA VERSION
  //--------------------------------
  // public validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   return of( { emailTaken: true } );
  // }

  // ESTO ES COMO SE HARIA EN LA VIDA REAL
  //-----------------------------------------
  // public validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   return this.http.get<any>( `https://myapp/users?email=${email}`)
  //                     .pipe( map( ( {isTaken} )  => isTaken === true ? null: { isTaken } ) );
  // }
}
