import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GeoserverRepository } from '../../../infraestructure/repositories/geoserver.repository';
import { GeoserverService } from '../../../infraestructure/services/geoserver.service';
import { FeatureCollectionDTO } from '@features/visor/core/interfaces/dto/recurso-geojson.dto';

export class GeoserverRepositoryImpl implements GeoserverRepository {
  geoserverService = inject(GeoserverService);

  getRecursosGeoJson(): Observable<FeatureCollectionDTO> {
    return this.geoserverService.getRecursosGeoJson$;
  }
}
