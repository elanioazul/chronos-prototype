import { Injectable } from '@angular/core';
import { MapperGeneric } from '../mappers/generic-mapper';
import { IReadVisor } from '../interfaces/visor-stuff/visor.interfaz';
import { IMap } from '../interfaces/map-stuff/chronos-map.interfaz';
import { Extent } from 'ol/extent';
import { ChronosMapView } from '../models/map-stuff/chronos-map-view';
import { ProjUtilities } from '../utils/utils-proj';
import { KeyboardPan, defaults as defaultInteractions } from 'ol/interaction';
import * as condition from 'ol/events/condition';
import { Collection } from 'ol';
import {
  overviewMapControl,
  scaleControl,
  zoomControl,
  autoInfoOverlay,
  routePopup,
  coordsPopup
} from '../utils/utils-ol';
@Injectable({
  providedIn: 'root',
})

export class VisorToMapMapperService extends MapperGeneric<IReadVisor, IMap> {
  protected map(props: IReadVisor): IMap {
    const projection = ProjUtilities.getOlProj(props.spatialReference);
    const extent: Extent = ProjUtilities.transformExtent(
      props.extent,
      `EPSG:4326`,
      `EPSG:${props.spatialReference.srid}`
    );
    return {
      // Al incluir el extent en la creación de la vista limitamos
      // la extensión por la cual el usuario puede desplazar sobre el mapa
      view: new ChronosMapView({
        projection,
        extent,
        enableRotation: false,
        maxZoom: 20,
      }),
      // The ratio between physical pixels and device-independent pixels (dips) on the device.
      // Si no se pone a 1, provoca errores de encuadre entre capas
      pixelRatio: 1,
      // Referencia del nodo dom "map"
      target: 'map',
      // Es necesario para que el KeyboardPan funcione (con la solución basada en tabindex el mapa pierde el foco)
      // (src: https://gis.stackexchange.com/questions/188338/openlayers3-keyboardpan-not-working)
      keyboardEventTarget: document,
      interactions: defaultInteractions().extend([
        new KeyboardPan({
          condition: condition.shiftKeyOnly,
          pixelDelta: 512,
        }),
      ]),
      overlays: [autoInfoOverlay, routePopup, coordsPopup],
      controls: new Collection([overviewMapControl, zoomControl, scaleControl]),
    };
  }
}
