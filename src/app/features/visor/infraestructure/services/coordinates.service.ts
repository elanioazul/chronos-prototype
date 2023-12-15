import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICoordinateSystemDto } from '@core/interfaces/dto/coordinate-system.dto';
import {
  COORD_SYSTEMS_API_URL,
  TRANSFORM_API_URL,
} from '@features/visor/core/consts/endpoints';
import { CoordinateSystem } from '@features/visor/core/models/coord-system';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoordinatesService {
  http = inject(HttpClient);

  private transformed = new Subject<any>();
  transformed$ = this.transformed.asObservable();

  constructor() {}

  getCoordSystems$ = this.http
    .get<ICoordinateSystemDto[]>(COORD_SYSTEMS_API_URL)
    .pipe(
      //tap(data => console.log('coord systems are :', JSON.stringify(data))),
      catchError(this.handleError)
    )
    .pipe(
      map((data: ICoordinateSystemDto[]) =>
        data.map((item: any) => {
          return new CoordinateSystem(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
          );
        })
      )
    );

  sendCoordToTransform(payload: any): Observable<any> {
    return this.http.post(TRANSFORM_API_URL, payload).pipe(
      catchError((error) => of(error)),
      map((res: any) => {
        if (!res) {
          throw new Error('Error enviando coordenadas que grabar');
        } else {
          return res;
        }
      }),
      tap((res) => this.transformed.next(res))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
