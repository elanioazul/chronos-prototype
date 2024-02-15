/* eslint-disable no-underscore-dangle */
import { TMSChronosLayer } from './tms-layer';
import {
  ICapabilitesCapa,
  IReadCapa,
} from '@features/visor/core/interfaces/dto/capa.dto';
import { ILayer } from '@features/visor/core/interfaces/layer-stuff/layer.interfaz';
import { IExtendedReadService } from '@features/visor/core/interfaces/layer-stuff/service.extended.interfaz';
import { ChronosService } from './chronos-service';
import { HttpProxyService } from '../../services/http-proxy.service';
import { ITMSLayer } from '../../interfaces/layer-stuff/tms-layer.interfaz';

export class TMSChronosService extends ChronosService {
  constructor(
    private options: IExtendedReadService,
    private httpProxyService: HttpProxyService
  ) {
    super(options);
    if (options.capas && options.capas.length > 0) {
      this._layers = this.setLayers(options.capas);
    }
  }

  public createLayer(
    dbLayer: IReadCapa | ICapabilitesCapa
  ): TMSChronosLayer {
    let commonLayerProps: ILayer;
    let tmsLayerProps: ITMSLayer;
    if ('id' in dbLayer) {
      commonLayerProps = {
        id: dbLayer.id,
        name: dbLayer.nombre,
        url: this.url,
        showInLegend: this.showInLegend,
        format: this.format,
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
        draggable: this.isDraggable,
        zIndex: undefined,
      };
      tmsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.identificador
      };
    } else {
      commonLayerProps = {
        name: dbLayer.name,
        url: this.url,
        showInLegend: this.showInLegend,
        format: this.format,
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
        draggable: this.isDraggable,
        zIndex: undefined,
      };
      tmsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.name
      };
    }
    return new TMSChronosLayer(tmsLayerProps, this.httpProxyService);
  }

  protected setLayers(
    dbLayers: IReadCapa[] | ICapabilitesCapa[]
  ): TMSChronosLayer[] {
    return (dbLayers as (IReadCapa | ICapabilitesCapa)[]).map((dbLayer) =>
      this.createLayer(dbLayer)
    );
  }
}
