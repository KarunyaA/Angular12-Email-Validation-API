import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  private apiKey = '561a1aaa3f7540619f78b47f41af381c';
  private baseUrl = 'https://api.zerobounce.net/v1/validate';

  // private baseUrl = 'https://isitarealemail.com/api/email/validate';
  constructor(private http: HttpClient) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> {
    if (ctrl.value) {
      return this.http
        .get<{ status: string }>(
          'https://api.zerobounce.net/v2/validate?api_key=' +
            this.apiKey +
            '&email=' +
            ctrl.value
        )
        .toPromise()
        .then((result) => {
          console.log(result.status);
          if (result.status === 'invalid') {
            return { invalid: true };
          } else if (result.status === 'unknown') {
            return { invalid: true };
          } else {
            // status is valid
            return { invalid: false };
          }
        });
    } else {
      return Promise.resolve({ invalid: true });
    }
  }
}
