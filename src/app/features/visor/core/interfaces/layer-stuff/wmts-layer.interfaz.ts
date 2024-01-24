import { ILayer } from './layer.interfaz';
export interface IWMTSLayer extends ILayer {
  matrixSet?: string;
  scaleDenominators?: number[];
  identifier: string;
  projection: string;
  selectedStyleName?: string;
}
