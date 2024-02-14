import { Feature, Map, View } from 'ol';
import { MousePosition, OverviewMap, ScaleLine, Zoom } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Popup from 'ol-ext/overlay/Popup';
import { Extent } from 'ol/extent';
import { standardizedRenderingPixelSize } from '../consts/pixel-size';
import Scale from 'ol-ext/control/Scale';
import { FitOptions } from 'ol/View';
import { Interaction } from 'ol/interaction';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
//Popups
export const autoInfoOverlay = new Popup({
  id: 'autoInfoOverlay',
  popupClass: 'tooltips',
  closeBox: false,
  positioning: 'bottom-auto',
  autoPan: true,
  autoPanAnimation: { duration: 250 },
});
export const routePopup = new Popup({
  id: 'routePopup',
  popupClass: 'tooltips marginTooltip',
  closeBox: false,
  positioning: 'bottom-auto',
  autoPan: true,
  autoPanAnimation: { duration: 250 },
});
export const coordsPopup = new Popup({
  id: 'coordsPopup',
  popupClass: 'tooltips marginTooltip',
  closeBox: false,
  positioning: 'bottom-auto',
  autoPan: true,
  autoPanAnimation: { duration: 250 },
});

//controles
// export const zoomControl = new Zoom();
// export const overviewMapControl = new OverviewMap({
//   className: 'ol-overviewmap ol-custom-overviewmap',
//   layers: [
//     new TileLayer({
//       source: new OSM({
//         url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
//       }),
//     }),
//   ],
//   collapsed: true,
//   tipLabel: 'Mapa de referencia',
//   label: '«',
//   collapseLabel: '»',
// });

//mouse
export const addMouseControlToMap = (target: HTMLElement, map: Map) => {
  const mouse = new MousePosition({
    coordinateFormat: function (coordinates) {
      var coord_x = coordinates?.[0].toFixed(3);
      var coord_y = coordinates?.[1].toFixed(3);
      return (
        `x:` +
        coord_x +
        ' | ' +
        `y:` +
        coord_y +
        ` (${map.getView().getProjection().getCode()})`
      );
    },
    target: target,
  });
  map.addControl(mouse);
};

//scales
export const addNumericScaleToMap = (target: HTMLElement, map: Map) => {
  map.addControl(new Scale({ target: target, editable: true }));
}
export const addLineScaleToMap = (target: HTMLElement, map: Map) => {
  map.addControl(new ScaleLine({ target: target, units: 'metric' }));
}

// export const monitorZoomAndScale = (map: Map) => {
//   let currZoom = map.getView().getZoom();
//   map.on('moveend', (e) => {
//     const newZoom = map.getView().getZoom();
//     const resolution = map.getView().getResolution();
//     const scale = resolution! / (standardizedRenderingPixelSize / 1000); //projection 25831 es metros

//     if (currZoom !== newZoom) {
//       console.log(
//         'Zoom changed, new zoom: ' + newZoom + ', new scale: ' + scale
//       );
//       currZoom = newZoom;
//     }
//   });
// };

//extent
export const fitToExtent = (map: Map, ext: Extent, padding = false, maxZoom?: number): void => {
  let fitOptions: FitOptions = {
    size: map.getSize(),
    nearest: true,
    duration: 250,
    maxZoom: 17,
  };
  if (padding) {
    fitOptions = { ...fitOptions, padding: [300, 300, 300, 300] };
  }
  if (maxZoom) {
    fitOptions = { ...fitOptions, maxZoom };
  }
  return map
    .getView()
    .fit(ext, fitOptions);
};

//projections
export const getEpsgFromMap = (map: Map): string => {
  return map.getView().getProjection().getCode();
}

export const getsridFromMap = (map: Map): number => {
  const code = map.getView().getProjection().getCode();
  return parseInt(code.split(':')[1]);
}

//interactions
export const removeGivenInteraction = (map: Map, interaction: Interaction):Map  => {
  map.removeInteraction(interaction);
  return map;
}
