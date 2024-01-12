import { ICampo } from '../layer-stuff/campo.interfaz';
export interface IReadCapa {
  id: number;
  nombre: string;
  identificador: string;
  orden?: number;
  campos?: ICampo[];
  defaultStyle?: string;
}
export interface ICapabilitesCapa {
  name: string;
  identifier: string;
  abstract?: string;
  title: string;
  $?: any;
  keywordlist?: Array<any>;
  boundingbox: Array<any>;
  crs?: Array<string>;
  style?: any;
  exgeographicboundingbox?: any;
}
