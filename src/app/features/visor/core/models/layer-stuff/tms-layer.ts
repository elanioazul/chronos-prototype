import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';
import { ChronosLayer } from './chronos-layer';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { HttpProxyService } from '../../services/http-proxy.service';
import { ITMSLayer } from '../../interfaces/layer-stuff/tms-layer.interfaz';
import VectorLayer from 'ol/layer/Vector';

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
        source: new OSM({
            url: this.url,
            maxZoom: 18
        }),
    });
  }
}
