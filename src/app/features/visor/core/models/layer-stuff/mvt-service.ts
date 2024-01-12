import { ICapabilitesCapa, IReadCapa } from '../../interfaces/dto/capa.dto';
import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';
import { IExtendedReadService } from '../../interfaces/layer-stuff/service.extended.interfaz';
import { ChronosService } from './chronos-service';
import { MVTChronosLayer } from './mvt-layer';

export class MVTChronosService extends ChronosService {
  zIndex = 30;
  constructor(private options: IExtendedReadService) {
    super(options);
    if (options.capas && options.capas.length > 0) {
      this._layers = this.setLayers(options.capas);
    }
  }

  public createLayer(dbLayer: IReadCapa | ICapabilitesCapa): MVTChronosLayer {
    let commonLayerProps: ILayer;
    if ('id' in dbLayer) {
      commonLayerProps = {
        id: dbLayer.id,
        name: dbLayer.nombre,
        url: this.url,
        showInLegend: this.showInLegend,
        imageFormat: this.imageFormat,
        opacity: this.opacity,
        type: this.type,
        visible:
          this.type === 'available' || this.type === 'base' ? false : true,
        serviceId: this.id,
        autoInfo: this.autoInfo,
        toolTip: this.toolTip,
        extent: this.extent,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        maxResolution: null,
        minResolution: null,
        zIndex: this.zIndex++,
      };
    } else {
      commonLayerProps = {
        name: dbLayer.name,
        url: this.url,
        showInLegend: this.showInLegend,
        imageFormat: this.imageFormat,
        opacity: this.opacity,
        type: this.type,
        visible:
          this.type === 'available' || this.type === 'base' ? false : true,
        serviceId: this.id,
        autoInfo: this.autoInfo,
        toolTip: this.toolTip,
        extent: this.extent,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        maxResolution: null,
        minResolution: null,
        zIndex: this.zIndex++,
      };
    }
    return new MVTChronosLayer(commonLayerProps);
  }

  protected setLayers(
    dbLayers: IReadCapa[] | ICapabilitesCapa[]
  ): MVTChronosLayer[] {
    return (dbLayers as (IReadCapa | ICapabilitesCapa)[]).map((dbLayer) =>
      this.createLayer(dbLayer)
    );
  }
}
