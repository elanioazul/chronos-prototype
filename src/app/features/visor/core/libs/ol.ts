import { Feature, Map, View } from 'ol';
import {  MousePosition } from 'ol/control';

export const addMouseControlToMap = (target: HTMLElement, map: Map) => {
    const mouse = new MousePosition({
      coordinateFormat: function (coordinates) {
        var coord_x = coordinates?.[0].toFixed(3);
        var coord_y = coordinates?.[1].toFixed(3);
        return `x:` + coord_x + ' | ' + `y:` + coord_y + ` (${map.getView().getProjection().getCode()})`;
      },
      target: target
    });
    map.addControl(mouse);
  }