/* eslint-disable no-underscore-dangle */
import { WMSChronosLayer } from './wms-layer';
import {
  ICapabilitesCapa,
  IReadCapa,
} from '@features/visor/core/interfaces/dto/capa.dto';
import { ILayer } from '@features/visor/core/interfaces/layer-stuff/layer.interfaz';
import { IExtendedReadService } from '@features/visor/core/interfaces/layer-stuff/service.extended.interfaz';
import { ChronosService } from './chronos-service';
import { HttpProxyService } from '../../services/http-proxy.service';
import { IWFSLayer } from '../../interfaces/layer-stuff/wfs-layer';
import { WFSChronosLayer } from './wfs-layer';

export class WFSChronosService extends ChronosService {
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
  ): WFSChronosLayer {
    let commonLayerProps: ILayer;
    let wfsLayerProps: IWFSLayer;
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
      wfsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.identificador,
        version: '1.0.0'
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
      wfsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.name,
        version: '1.0.0'
      };
    }
    return new WFSChronosLayer(wfsLayerProps, this.httpProxyService);
  }

  protected setLayers(
    dbLayers: IReadCapa[] | ICapabilitesCapa[]
  ): WFSChronosLayer[] {
    return (dbLayers as (IReadCapa | ICapabilitesCapa)[]).map((dbLayer) =>
      this.createLayer(dbLayer)
    );
  }
}
