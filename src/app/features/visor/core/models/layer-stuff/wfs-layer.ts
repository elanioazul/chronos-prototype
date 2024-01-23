import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';
import { ChronosLayer } from './chronos-layer';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import { HttpProxyService } from '../../services/http-proxy.service';
import { IWFSLayer } from '../../interfaces/layer-stuff/wfs-layer';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

export class WFSChronosLayer extends ChronosLayer {
  private _version: string;
  private _identifier: string;

  get version(): string {
    return this._version;
  }
  get identifier() {
    return this._identifier;
  }

  constructor(
    public options: IWFSLayer,
    private httpProxyService: HttpProxyService
  ) {
    super(options as ILayer);
    this._identifier = options.identifier;
    this._version = options.version ? options.version : '1.3.0';
    this.initWrapperWFSLayer();
  }

  private initWrapperWFSLayer(): void {
    this.createVectorLayer();
  }

  private createVectorLayer() {
    const finalUrlParams = [
      'SERVICE=WFS',
      `VERSION=${this.version}`,
      'REQUEST=GetFeature',
      `typeName=${this.identifier}`,
      `bbox=${this.options.extent}`,
      `EPSG=4326`,
      `OUTPUTFORMAT=${this.format}`
    ];
    
    const lyrSource = new VectorSource({
      url: this.url.concat(finalUrlParams.join('&')),
      format: new GeoJSON()
    })

    this.ol = new VectorLayer({
      source: lyrSource,
      visible: this.visible,
      opacity: this.opacity,
    });
  }
}
