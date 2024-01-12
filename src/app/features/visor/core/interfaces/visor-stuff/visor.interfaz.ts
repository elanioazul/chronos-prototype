import { Extent } from 'ol/extent';
import { IReadService } from '../layer-stuff/service.interfaz';
import { ISpatialReference } from '../spatial-reference.interfaz';

export interface IReadVisor {
  id: number,
  nombre: string;
  spatialReference: ISpatialReference;
  extent: Extent;
  serviciosInicio?: IReadService[];
  serviciosBase?: IReadService[];
  serviciosOverview?: IReadService[];
}
