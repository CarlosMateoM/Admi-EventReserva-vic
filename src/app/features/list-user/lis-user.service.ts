import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/listUser.interface';

@Injectable({
  providedIn: 'root'
})
export class LisUserService {
  private readonly API_URL = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/usuarios`);
  }
}
