import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(

      catchError(this.handleError)
    );
  }

  addGroup(group: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, group).pipe(
      catchError(this.handleError)
    );
  }

  updateGroup(id: string, group: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, group).pipe(
      catchError(this.handleError)
    );
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
