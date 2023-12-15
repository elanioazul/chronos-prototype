import { Observable } from 'rxjs';

import { IMaps } from '../interfaces/maps.interfaz';
import { ElementRef } from '@angular/core';
import { ILayers } from '../interfaces/layers.interfaz';

export abstract class MapRepository {
 abstract getMaps(): Observable<IMaps>;
 abstract getLayers(): Observable<ILayers>;
}