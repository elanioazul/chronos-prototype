/* eslint-disable no-underscore-dangle */
import { WMSChronosLayer } from './wms-layer';
import {
  ICapabilitesCapa,
  IReadCapa,
} from '@features/visor/core/interfaces/dto/capa.dto';
import { ILayer } from '@features/visor/core/interfaces/layer-stuff/layer.interfaz';
import { IWMSLayer } from '@features/visor/core/interfaces/layer-stuff/wms-layer.interface';
import { IExtendedReadService } from '@features/visor/core/interfaces/layer-stuff/service.extended.interfaz';
import { ChronosService } from './chronos-service';
import { HttpProxyService } from '../../services/http-proxy.service';

export class WMSChronosService extends ChronosService {
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
  ): WMSChronosLayer {
    let commonLayerProps: ILayer;
    let wmsLayerProps: IWMSLayer;
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
      wmsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.identificador,
        tiled: this.tiled,
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
      wmsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.name,
        tiled: this.tiled,
      };
    }
    return new WMSChronosLayer(wmsLayerProps, this.httpProxyService);
  }

  protected setLayers(
    dbLayers: IReadCapa[] | ICapabilitesCapa[]
  ): WMSChronosLayer[] {
    return (dbLayers as (IReadCapa | ICapabilitesCapa)[]).map((dbLayer) =>
      this.createLayer(dbLayer)
    );
  }
}
