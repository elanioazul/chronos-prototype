import { ILayer } from './layer.interfaz';
export interface IWMTSLayer extends ILayer {
  matrixSet?: string;
  identifier: string;
  projection: string;
  selectedStyleName?: string;
}
