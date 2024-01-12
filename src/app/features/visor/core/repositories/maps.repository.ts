import { Observable } from 'rxjs';

import { IMaps } from '../interfaces/map-stuff/maps.interfaz';

export abstract class MapRepository {
 abstract getMaps(): Observable<IMaps>;
}