
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {
  constructor(private http: HttpClient) { }

  submitQualityCheck(data: any) {
    console.log(data);
    return this.http.post('', data);
  }
}
