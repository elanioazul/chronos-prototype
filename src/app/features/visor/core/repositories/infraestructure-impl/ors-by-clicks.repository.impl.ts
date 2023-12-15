import { Observable } from 'rxjs';
import { Coordinate } from 'ol/coordinate';
import { IOpenRouteServiceResDTO } from '../../../infraestructure/dto/ors.response.dto';
import { inject } from '@angular/core';
import { OrsByClicksRepository } from '../../../infraestructure/repositories/ors-by-clicks.repository';
import { OrsByClicksService } from '../../../infraestructure/services/ors-by-clicks.service';

export class OrsByClicksRepositoryImpl implements OrsByClicksRepository {
  orsByclicksService = inject(OrsByClicksService);

  getStartPoint(): Observable<Coordinate | null> {
    return this.orsByclicksService.startPoint$;
  }
  getEndPoint(): Observable<Coordinate | null> {
    return this.orsByclicksService.endPoint$;
  }

  getDistance(): Observable<string | null> {
    return this.orsByclicksService.distance$;
  }
  getDuration(): Observable<string | null> {
    return this.orsByclicksService.duration$;
  }

  getOrsInfo(): Observable<IOpenRouteServiceResDTO> {
    return this.orsByclicksService.orsInfo$;
  }
}
