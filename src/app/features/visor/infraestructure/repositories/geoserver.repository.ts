import { Observable } from 'rxjs';
import { FeatureCollectionDTO } from '../../core/interfaces/dto/recurso-geojson.dto';

export abstract class GeoserverRepository {
  abstract getRecursosGeoJson(): Observable<FeatureCollectionDTO>;
}
