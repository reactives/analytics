import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    createUser(email: string, password: string) {
      return this.http.post<User[]>(`${environment.apiUrl}/users`, {
        email: email,
        password: password
      });
    }
}
