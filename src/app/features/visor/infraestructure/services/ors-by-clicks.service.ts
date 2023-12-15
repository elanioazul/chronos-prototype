import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, map, throwError } from 'rxjs';
import { IOpenRouteServiceResDTO } from '../dto/ors.response.dto';
import { ORS_API_URL } from '@features/visor/core/consts/endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrsByClicksService {
  http = inject(HttpClient);

  private startPoint = new BehaviorSubject<Coordinate | null>(null);
  startPoint$ = this.startPoint.asObservable();
  private endPoint = new BehaviorSubject<Coordinate | null>(null);
  endPoint$ = this.endPoint.asObservable();

  private distanceSubject = new BehaviorSubject<number | null>(null);
  distance$: Observable<string | null> = this.distanceSubject.asObservable().pipe(
    map((distance) => (distance !== null ? this.convertDistance(distance) : null))
  );
  private durationSubject = new BehaviorSubject<number | null>(null);
  duration$: Observable<string | null> = this.durationSubject.asObservable().pipe(
    map((duration) => (duration !== null ? this.convertTime(duration) : null))
  );

  private orsInfo = new Subject<IOpenRouteServiceResDTO>();
  orsInfo$ = this.orsInfo.asObservable();

  constructor() { }

  getOrsInfo(from: Coordinate, to: Coordinate): Observable<IOpenRouteServiceResDTO> {
    return this.http
      .get<IOpenRouteServiceResDTO>(ORS_API_URL + 'start=' + `${from}` + '&end=' + `${to}`)
      .pipe(
        map((res: any) => {
          if (!res.error) {
            this.orsInfo.next(res);
            return res;
          }
        }),
        catchError((error) => {
          this.orsInfo.error(error);
          return throwError(() => error);
        })
      );
  }

  convertTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) {
      return 'Invalid input';
    }

    const hours = (seconds / 3600).toFixed(1);
    const remainingSeconds = seconds % 3600;
    const minutes = (remainingSeconds / 60).toFixed(1);
    const remainingSecondsAfterMinutes = (remainingSeconds % 60).toFixed(1);

    const hoursText =
      parseInt(hours) > 0 ? `${hours} hour${hours !== '1.0' ? 's' : ''}` : '';
    const minutesText =
      parseInt(minutes) > 0
        ? `${minutes} min${minutes !== '1.0' ? 's' : ''}`
        : '';
    const secondsText =
      parseInt(remainingSecondsAfterMinutes) > 0
        ? `${remainingSecondsAfterMinutes} sec${
            remainingSecondsAfterMinutes !== '1.0' ? 's' : ''
          }`
        : '';

    const timeParts = [hoursText, minutesText, secondsText].filter(Boolean);

    return timeParts.join(' and ');
  }

  convertDistance(meters: number): string {
    if (isNaN(meters) || meters < 0) {
      return 'Invalid input';
    }

    const kilometers = (meters / 1000).toFixed(1);
    return `${kilometers} km${kilometers !== '1.0' ? 's' : ''}`;
  }
}