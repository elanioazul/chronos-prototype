import { Observable } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { IOpenRouteServiceResDTO } from '../dto/ors.response.dto';

export abstract class OrsResourcesRepository {
  abstract getRecurso(): Observable<Coordinate | null>;
  abstract getIncidente(): Observable<Coordinate | null>;
  abstract getLatestRuteDetails(): Observable<[Coordinate | null, Coordinate | null]>;
  abstract getDistance(): Observable<string | null>;
  abstract getDuration(): Observable<string | null>;
  abstract getOrsInfo(): Observable<IOpenRouteServiceResDTO>
}