import { Fill, Icon, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Style from 'ol/style/Style';

export const resourceStyle = new Style({
    image: new CircleStyle({
      radius: 10,
      stroke: new Stroke({
        color: '#42ed09',
        width: 2
      }),
      fill: new Fill({
        color: '#030303',
      }),
    }),
  });

export const resourceInvisibleStyle  = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)',
    }),
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0)',
    }),
  });