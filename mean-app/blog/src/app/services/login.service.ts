import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dataSource = new BehaviorSubject<string>(''); 
  currentData = this.dataSource.asObservable(); 

  constructor() { }

  changeData(data: string) {
    this.dataSource.next(data); 
  }
}
