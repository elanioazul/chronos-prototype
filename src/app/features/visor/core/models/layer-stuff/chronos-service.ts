import { IReadCapa } from '@features/visor/core/interfaces/dto/capa.dto';
import { ServiceType } from '../../types/ol-layer-service.types';

import { IExtendedReadService } from '@features/visor/core/interfaces/layer-stuff/service.extended.interfaz';
import { Extent } from 'ol/extent';
import { ChronosLayer } from './chronos-layer';
import { Coordinate } from 'ol/coordinate';

export abstract class ChronosService {
  protected _layers!: ChronosLayer[];

  // Se declaran como privadas y no se generan setters (el setteo de los valores se realiza en el constructor),
  // de esta forma se impide que desde fuera se puedan manipular los atributos del servicio

  private _id!: number;
  private _name!: string;
  private _alias!: string;
  private _description!: string;
  private _url!: string;
  private _opacity!: number;
  private _extent!: Extent | null;
  private _tiled!: boolean | null;
  private _format!: string;
  private _queryable!: boolean;
  private _showInLegend!: boolean;
  private _matrixSet?: string;
  private _scaleDenominators?: number[];
  private _topLeftCorner?: Coordinate | Coordinate[];
  private _minZoom!: number | null;
  private _maxZoom!: number | null;

  private _type!: ServiceType;
  private _capabilities!: any;
  private _autoInfo: boolean;
	private _toolTip: boolean;
  private _isDraggable: boolean;

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get alias(): string {
    return this._alias;
  }
  get description(): string {
    return this._description;
  }
  get url(): string {
    return this._url;
  }
  get opacity(): number {
    return this._opacity;
  }
  get extent(): Extent | null {
    return this._extent;
  }
  get tiled(): boolean | null {
    return this._tiled;
  }
  get format(): string {
    return this._format;
  }
  get queryable(): boolean {
    return this._queryable;
  }
  get showInLegend(): boolean {
    return this._showInLegend;
  }
  get matrixSet(): string | undefined {
		return this._matrixSet;
	}
  get scaleDenominators(): number[] | undefined {
		return this._scaleDenominators;
	}
  get topLeftCorner(): Coordinate | Coordinate[] | undefined {
		return this._topLeftCorner;
	}
  get minZoom(): number | null {
    return this._minZoom;
  }
  get maxZoom(): number | null {
    return this._maxZoom;
  }
  get layers(): ChronosLayer[] {
    return this._layers;
  }
  get type(): ServiceType {
    return this._type;
  }
  get capabilities(): any {
    return this._capabilities;
  }
  get isDraggable(): boolean {
		return this._isDraggable;
	}
	get autoInfo(): boolean {
		return this._autoInfo;
	}
	get toolTip(): boolean {
		return this._toolTip;
	}

  constructor(options: IExtendedReadService) {
    this._id = options.id;
    this._alias = options.alias;
    this._url = options.host.url;
    this._opacity = options.opacidad;
    this._tiled = options.tiled;
    this._format = options.format;
    this._showInLegend = options.displayInLegend;
    this._type = options.type;
    this._capabilities = options.capabilities;
    this._isDraggable = options.draggable
    this._autoInfo = options.autoInfo;
		this._toolTip = options.toolTip;

    // Parámetros opcionales propios de un servicio genérico (pueden venir o no de del mock de config de visor)
    if (options.hasOwnProperty('name')) {
      this._name = options.nombre;
    }
    if (options.hasOwnProperty('description')) {
      this._description = options.descripcion;
    }
    if (options.hasOwnProperty('extent')) {
      this._extent = options.extent;
    }
    if (options.hasOwnProperty('matrixSet')) {
			this._matrixSet = options.matrixSet;
		}
    if (options.hasOwnProperty('scaleDenominators')) {
			this._scaleDenominators = options.scaleDenominators;
		}
    if (options.hasOwnProperty('topLeftCorner')) {
			this._topLeftCorner = options.topLeftCorner;
		}
    if (options.hasOwnProperty('maxZoom')) {
      this._maxZoom = options.maxZoom;
    }
    if (options.hasOwnProperty('minZoom')) {
      this._minZoom = options.minZoom;
    }
  }

  protected abstract setLayers(layers: IReadCapa[]): ChronosLayer[];
}
