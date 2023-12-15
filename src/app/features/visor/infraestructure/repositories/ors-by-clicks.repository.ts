import { Observable } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { IOpenRouteServiceResDTO } from '../dto/ors.response.dto';

export abstract class OrsByClicksRepository {
  abstract getStartPoint(): Observable<Coordinate | null>;
  abstract getEndPoint(): Observable<Coordinate | null>;
  
  abstract getDistance(): Observable<string | null>;
  abstract getDuration(): Observable<string | null>;
  abstract getOrsInfo(): Observable<IOpenRouteServiceResDTO>;
}
