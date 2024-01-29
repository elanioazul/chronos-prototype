import { Observable, map } from 'rxjs';
import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';
import { IWMSLayer } from '../../interfaces/layer-stuff/wms-layer.interface';
import { ChronosLayer } from './chronos-layer';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { ImageWMS, TileWMS } from 'ol/source';
import { Image, Tile } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import { ChronosMap } from '../map-stuff/chronos-map';
import { HttpProxyService } from '../../services/http-proxy.service';

export class WMSChronosLayer extends ChronosLayer {
  private _version: string;
  private _tiled: boolean | null;
  private _identifier: string;

  private selectionLayer!: WMSChronosLayer;

  get tiled(): boolean | null{
    return this._tiled;
  }
  get version(): string {
    return this._version;
  }
  get identifier() {
    return this._identifier;
  }

  constructor(
    public options: IWMSLayer,
    private httpProxyService: HttpProxyService
  ) {
    super(options as ILayer);
    this._tiled = options.tiled;
    this._identifier = options.identifier;
    this._version = options.version ? options.version : '1.3.0';
    this.initWrapperWMSLayer();
  }

  private initWrapperWMSLayer(): void {
    if (!this.tiled) {
      this.createImageLayer();
    } else {
      this.createTileLayer();
    }
  }

  private createImageLayer() {
    const layerSource = new ImageWMS({
      url: this.url,
      params: {
        LAYERS: this.identifier,
        TILED: this.tiled,
        //SRS: this.projection,
        VERSION: this.version,
        //STYLES: this.activeStyle ? this.activeStyle.name : '',
        FORMAT: this.format,
      },
      //projection: this.projection,
    });

    this.ol = new Image({
      source: layerSource,
      visible: this.visible,
      opacity: this.opacity,
    });
  }

  private createTileLayer() {
    const layerSource = new TileWMS({
      url: this.url,
      params: {
        LAYERS: this.identifier,
        TILED: this.tiled,
        //SRS: this.projection,
        VERSION: this.version,
        //STYLES: this.activeStyle ? this.activeStyle.name : '',
        FORMAT: this.format,
      },
    });

    this.ol = new Tile({
      source: layerSource,
      visible: this.visible,
      opacity: this.opacity,
    });
  }
}
