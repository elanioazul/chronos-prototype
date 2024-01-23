import { ILayer } from './layer.interfaz';

export interface IWFSLayer extends ILayer {
  identifier: string;
  version?: '1.0.0' | '1.1.0' | '1.1.1' | '1.3.0';
}
