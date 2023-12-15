import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
//import { FeatureCollection } from 'geojson';
import { FeatureCollectionDTO } from '@features/visor/core/interfaces/dto/recurso-geojson.dto';
import { RECURSOS_GEOJSON_LOCAL_GEOSERVER_URL } from '../../core/consts/endpoints';

@Injectable({
  providedIn: 'root',
})
export class GeoserverService {
  http = inject(HttpClient);

  constructor() {}

  getRecursosGeoJson$ = this.http
    .get<FeatureCollectionDTO>(RECURSOS_GEOJSON_LOCAL_GEOSERVER_URL)
    .pipe(catchError(this.handleError));
  // .pipe(
  //   map((data: any) =>
  //     console.log(data)
  //   )
  // );

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
