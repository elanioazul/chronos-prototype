import { ILayer } from './layer.interfaz';

export interface IWMSLayer extends ILayer {
  tiled: boolean | null;
  identifier: string;
  version?: '1.0.0' | '1.1.0' | '1.1.1' | '1.3.0';
}
