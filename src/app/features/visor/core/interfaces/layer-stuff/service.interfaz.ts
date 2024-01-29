import { IHost } from '../host.interfaz';
import { IReadCapa, ICapabilitesCapa } from '../dto/capa.dto';
import { Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
export interface IReadService {
  id: number;
  nombre: string;
  alias: string;
  descripcion: string;
  displayInLegend: boolean;
  identificable: boolean;
  tiled: boolean | null;
  format: string;
  opacidad: number;
  host: IHost;
  capas: IReadCapa[] | ICapabilitesCapa[];
  extent: Extent | null;
  matrixSet: string | undefined;
  scaleDenominators: number[] | undefined;
  topLeftCorner: Coordinate | Coordinate[] | undefined;
  minZoom: number | null;
  maxZoom: number | null;
  autoInfo: boolean;
	toolTip: boolean;
  visible: boolean;
  capabilities: any;
  draggable: boolean;
}
