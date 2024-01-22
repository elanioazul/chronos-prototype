/* eslint-disable no-underscore-dangle */
import { WMSChronosLayer } from './wms-layer';
import {
  ICapabilitesCapa,
  IReadCapa,
} from '@features/visor/core/interfaces/dto/capa.dto';
import { ILayer } from '@features/visor/core/interfaces/layer-stuff/layer.interfaz';
import { IWMTSLayer } from '../../interfaces/layer-stuff/wmts-layer.interfaz';
import { IExtendedReadService } from '@features/visor/core/interfaces/layer-stuff/service.extended.interfaz';
import { ChronosService } from './chronos-service';
import { WMTSChronosLayer } from './wmts-layer';
import { Extent } from 'ol/extent';
import { ProjUtilities } from '../../utils/utils-proj';
import { get as getProjection} from 'ol/proj';

export class WMTSChronosService extends ChronosService {
  zIndex = 20;
  private _projection!: string;
  get projection(): string {
    return this._projection;
  }
  constructor(private options: IExtendedReadService, projection?: string) {
    super(options);
    if (projection) {
      this._projection = projection;
    }
    if (options.capas && options.capas.length > 0) {
      this._layers = this.setLayers(options.capas);
    }
  }

  public createLayer(
    dbLayer: IReadCapa | ICapabilitesCapa
  ): WMTSChronosLayer {
    let commonLayerProps: ILayer;
    let wmtsLayerProps: IWMTSLayer;
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
        extent: this.extent !== null ? this.reprojectExtentToServiceProjection(this.extent, this.projection) : this.extent,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        maxResolution: null,
        minResolution: null,
        draggable: this.isDraggable,
        zIndex: this.zIndex++,
      };
      wmtsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.identificador,
				matrixSet: this.matrixSet,
				projection: this.projection,
				selectedStyleName: dbLayer.defaultStyle
					? dbLayer.defaultStyle
					: 'default',
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
        draggable: this.isDraggable,
        zIndex: this.zIndex++,
      };
      wmtsLayerProps = {
        ...commonLayerProps,
        identifier: dbLayer.name,
				matrixSet: this.matrixSet,
				projection: this.projection,
				selectedStyleName: 'default',
      };
    }
    return new WMTSChronosLayer(wmtsLayerProps);
  }

  protected setLayers(
    dbLayers: IReadCapa[] | ICapabilitesCapa[]
  ): WMTSChronosLayer[] {
    return (dbLayers as (IReadCapa | ICapabilitesCapa)[]).map((dbLayer) =>
      this.createLayer(dbLayer)
    );
  }

  protected reprojectExtentToServiceProjection(extent: Extent, epsg: string): Extent {
    const lowerCornerTransformed = ProjUtilities.transform(
      [extent[0], extent[1]],
      'EPSG:4326',
      epsg
    )
    const upperCornerTransformed = ProjUtilities.transform(
      [extent[2], extent[3]],
      'EPSG:4326',
      epsg
    )
    const outExtent = lowerCornerTransformed.concat(upperCornerTransformed);
    const projection = getProjection(epsg);
    const projectionExtent = projection?.getExtent();
    if (projectionExtent) {
      ProjUtilities.enlargeExtentForGivenProjection(epsg, outExtent);
    } else {
      ProjUtilities.setExtentToProjection(epsg, outExtent)
    }
    return outExtent
  }
}
