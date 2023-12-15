import { Observable } from 'rxjs';
import { ICoordinateSystemDto } from '@features/visor/core/interfaces/dto/coordinate-system.dto';
import { CoordinateSystem } from '@features/visor/core/models/coord-system';

export abstract class CoordinatesRepository {
  abstract getCoordSystems(): Observable<CoordinateSystem[]>;
  abstract transformCoords(): Observable<any>;
}