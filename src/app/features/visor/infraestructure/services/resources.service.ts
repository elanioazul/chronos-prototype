import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RESOURCES_API_URL } from '@features/visor/core/consts/endpoints';
import { IResourcesByRadioResDto } from '@features/visor/core/interfaces/dto/recurso.dto';
import { Resource } from '@features/visor/core/models/resource';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  http = inject(HttpClient);

  private selectedResourceRow: any = null;

  getSelectedRowElement(): HTMLTableRowElement {
    return this.selectedResourceRow;
  }
  setSelectedRowElement(rowElement: HTMLTableRowElement): void {
    this.selectedResourceRow = rowElement;
  }

  public requestedDistance = new BehaviorSubject<number>(2);
  public requestedUnit = new BehaviorSubject<string>('KILOMETER');
  public selectedSrid = new BehaviorSubject<number>(4326);
  public latitude = new BehaviorSubject<number>(41.585404);
  public longitude = new BehaviorSubject<number>(2.551060);

  private resourcesByRaadio = new Subject<IResourcesByRadioResDto>();
  resourcesByRaadio$ = this.resourcesByRaadio.asObservable();

  constructor() { }

  setRequestedDistance(distance: number): void {
    this.requestedDistance.next(distance);
  }
  getRequestedDistance(): number {
    return this.requestedDistance.getValue();
  }

  setRequestedUnit(unit: string): void {
    this.requestedUnit.next(unit);
  }
  getRequestedUnit(): string {
    return this.requestedUnit.getValue();
  }

  setSelectedSrid(srid: number): void {
    this.selectedSrid.next(srid);
  }
  getSelectedSrid(): number {
    return this.selectedSrid.getValue();
  }

  setLatitude(lat: number): void {
    this.latitude.next(lat);
  }
  getLatitude(): number{
    return this.latitude.getValue();
  }

  setLongitude(lon: number): void {
    this.longitude.next(lon);
  }
  getLongitude(): number {
    return this.longitude.getValue();
  }

  getResourcesByRadio(page: number, size: number): Observable<IResourcesByRadioResDto> {

    let params = new HttpParams()
    .set('latitudeId', this.getLatitude())
    .set('longitudeId', this.getLongitude())
    .set('distance', this.getRequestedDistance())
    .set('unit', this.getRequestedUnit())
    .set('selectedSrid', this.getSelectedSrid())
    // .set('resourceSrid', 25831)
    // .set('targetSrid', 4326)
    .set('page', page)
    .set('size', size);

    return this.http.get<IResourcesByRadioResDto>(RESOURCES_API_URL, { params })
    .pipe(
      map((res: IResourcesByRadioResDto) => ({
        ...res, content: res.content.map((item: any) => new Resource(item))
      })),
      tap((res) =>
        this.resourcesByRaadio.next(res)
      ),
      catchError(this.handleError),
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
