
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {
  constructor(private http: HttpClient) { }

  submitQualityCheck(data: any) {
    return this.http.post('YOUR_API_ENDPOINT', data);
  }
}
