import { Observable } from 'rxjs';
import { ICoordinateSystemDto } from '@features/visor/core/interfaces/dto/coordinate-system.dto';
import { CoordinateSystem } from '@features/visor/core/models/coord-system';
import { CoordinateTransformed } from '@features/visor/core/models/coord-transformed';

export abstract class CoordinatesRepository {
  abstract getCoordSystems(): Observable<CoordinateSystem[]>;
  abstract transformCoords(): Observable<any>;
  abstract getIncidentes(): Observable<CoordinateTransformed[]>;
}
