import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CoordinatesRepository } from '@features/visor/infraestructure/repositories/coordinates.repository';
// import { ICoordinateSystemDto } from '../../interfaces/dto/coordinate-system.dto';
import { CoordinatesService } from '@features/visor/infraestructure/services/coordinates.service';
import { CoordinateSystem } from '../../models/coord-system';

export class CoordinatesRepositoryImpl implements CoordinatesRepository {
  coordService = inject(CoordinatesService);

  getCoordSystems(): Observable<CoordinateSystem[]> {
    return this.coordService.getCoordSystems$;
  }
  transformCoords(): Observable<any> {
    return this.coordService.transformed$
  }
}