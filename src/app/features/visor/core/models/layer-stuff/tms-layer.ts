import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';
import { ChronosLayer } from './chronos-layer';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { HttpProxyService } from '../../services/http-proxy.service';
import { ITMSLayer } from '../../interfaces/layer-stuff/tms-layer.interfaz';
import XYZ from 'ol/source/XYZ.js';
export class TMSChronosLayer extends ChronosLayer {
  private _identifier: string;

  get identifier() {
    return this._identifier;
  }

  constructor(
    public options: ITMSLayer,
    private httpProxyService: HttpProxyService
  ) {
    super(options as ILayer);
    this._identifier = options.identifier;
    this.initWrapperTMSLayer();
  }

  private initWrapperTMSLayer(): void {
    this.createVectorLayer();
  }

  private createVectorLayer() {

    this.ol = new TileLayer({
        source: this.createSource()
    });
  }

  private createSource(): OSM | XYZ {
    let source;
    if (this.name.indexOf('osmfoundation') !== -1) {
      source =  new OSM({
        url: this.url,
        maxZoom: 18
      })
    } else {
      source = new XYZ({
        url: this.url,
        maxZoom: 18
      })
    }
    return source;
  }
}
