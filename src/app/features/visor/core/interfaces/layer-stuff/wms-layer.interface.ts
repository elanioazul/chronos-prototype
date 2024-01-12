import { ILayer } from './layer.interfaz';

export interface IWMSLayer extends ILayer {
  tiled: boolean;
  identifier: string;
  version?: '1.0.0' | '1.1.0' | '1.1.1' | '1.3.0';
}
