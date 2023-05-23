import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor() {}

  sendHello(): Observable<string> {
    return of('Hello from ChildService').pipe(delay(2000));
  }
}
