import { Feature, Map, View } from 'ol';
import { MousePosition, OverviewMap, ScaleLine, Zoom } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Popup from 'ol-ext/overlay/Popup';
import { Extent } from 'ol/extent';

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
export const scaleControl = new ScaleLine();
export const zoomControl = new Zoom();
export const overviewMapControl = new OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
    new TileLayer({
      source: new OSM({
        url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      }),
    }),
  ],
  collapsed: true,
  tipLabel: 'Mapa de referencia',
  label: '«',
  collapseLabel: '»',
});

//map logic
// export const addMouseControlToMap = (target: HTMLElement, map: Map) => {
//   const mouse = new MousePosition({
//     coordinateFormat: function (coordinates) {
//       var coord_x = coordinates?.[0].toFixed(3);
//       var coord_y = coordinates?.[1].toFixed(3);
//       return (
//         `x:` +
//         coord_x +
//         ' | ' +
//         `y:` +
//         coord_y +
//         ` (${map.getView().getProjection().getCode()})`
//       );
//     },
//     target: target,
//   });
//   map.addControl(mouse);
// };

export const fitToExtent = (map: Map, ext: Extent): void => {
  return map
    .getView()
    .fit(ext, { padding: [100, 100, 100, 100], duration: 250 });
};
