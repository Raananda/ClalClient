import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppInitRequestDTO } from '../models/AppInitRequestDTO';
import { AppInitResponseDTO } from '../models/AppInitResponseDTO';
import { UserDTO } from '../models/UserDTO';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class InfraServerService {

  // infraUrl = 'http://localhost:5001/api/Init/';


  constructor(private http: HttpClient) { }

  getInit(): Observable<AppInitResponseDTO> {
    return this.http.get<AppInitResponseDTO>("api/infra/get-init")
      .pipe( 
        catchError(this.handleError)
      );
  }

  getListFromJsonFile(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>("api/JsonLocalFile/get-json-data")
      .pipe( 
        catchError(this.handleError)
      );
  }
  postInit(data:AppInitRequestDTO): Observable<any> {
    return this.http.post<AppInitResponseDTO>("api/infra/post-init",data,httpOptions)
      .pipe( 
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
