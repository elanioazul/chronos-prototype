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
  private _tiled: boolean;
  private _identifier: string;

  private selectionLayer!: WMSChronosLayer;

  get tiled(): boolean {
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

  public getGeometries(
    where: string,
    srs: string
  ): Observable<Array<Feature<Geometry>>> {
    const source = this.ol.getSource();
    let url;
    let params;
    if (source instanceof ImageWMS) {
      url = source.getUrl();
      params = source.getParams();
    }
    const baseUrl = url.replace(/\?$/, '');
    let layers = [];
    if (params.LAYERS) {
      layers = params.LAYERS.split(',');
    }

    //Por ahora layers[0], ya veremos si hace falta preguntar a todas las capas
    const finalParams = [
      'REQUEST=GetFeature',
      'SERVICE=WFS',
      'OUTPUTFORMAT=application/json',
      `SRSNAME=${srs}`,
      `CQL_FILTER=${where}`,
      `TYPENAME=${layers[0]}`,
    ];
    const separator = baseUrl.match(/\?/) ? '&' : '?';
    return this.httpProxyService
      .get<Array<Feature<Geometry>>>(
        `${baseUrl}${separator}${finalParams.join('&')}`
      )
      /*.pipe(map((r) => new GeoJSON().readFeatures(r)))*/;
  }

  public select(mapa: ChronosMap, where: string, style: string) {
    if (!this.selectionLayer) {
      this.selectionLayer = new WMSChronosLayer(
        this.options,
        this.httpProxyService
      );
    }
    this.selectionLayer.ol.setMap(mapa);
    const source = (this.selectionLayer.ol as Image<ImageWMS>).getSource();
    // 20211129 @ADR: Ñapa infame para dar estilo siendo LAYER GROUP (cogemos una de las capas)
    /*if (this.selectionLayer.id === 4) {
		source.updateParams({ LAYERS: 'desarrollorural:ccnn_ptosinteres_25' });
	}*/
    source?.updateParams({ STYLES: style });
    source?.updateParams({ CQL_FILTER: where });
  }
  public clearSelect() {
    this.selectionLayer?.ol.setMap(null);
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
        FORMAT: this.imageFormat,
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
        FORMAT: this.imageFormat,
      },
    });

    this.ol = new Tile({
      source: layerSource,
      visible: this.visible,
      opacity: this.opacity,
    });
  }
}
