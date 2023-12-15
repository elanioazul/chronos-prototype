import { Observable } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { IOpenRouteServiceResDTO } from '../../../infraestructure/dto/ors.response.dto';
import { inject } from '@angular/core';
import { OrsResourcesService } from '../../../infraestructure/services/ors-resources.service';
import { OrsResourcesRepository } from '../../../infraestructure/repositories/ors-resources.repository';

export class OrsResourcesRepositoryImpl implements OrsResourcesRepository {
  orsResourcesService = inject(OrsResourcesService);

  getRecurso(): Observable<Coordinate | null> {
    return this.orsResourcesService.recurso$;
  }
  getIncidente(): Observable<Coordinate | null> {
    return this.orsResourcesService.incidente$;
  }
  getLatestRuteDetails(): Observable<[Coordinate | null, Coordinate | null]> {
    return this.orsResourcesService.getLatestRuteDetails$;
  }

  getDistance(): Observable<string | null> {
    return this.orsResourcesService.distance$;
  }
  getDuration(): Observable<string | null> {
    return this.orsResourcesService.duration$;
  }

  getOrsInfo(): Observable<IOpenRouteServiceResDTO> {
    return this.orsResourcesService.orsInfo$;
  }
}
