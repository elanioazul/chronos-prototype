import { Extent } from 'ol/extent';
import { ServiceType } from '@features/visor/core/types/ol-layer-service.types';

export interface ILayer {
	/* Correspondientes a BaseLayer OL src: https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html */
	// className: string; // default value 'ol-layer'
	opacity: number; // default value 1
	visible: boolean; // default value true
	/* Correspondientes a BaseLayer OL src: https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html */
	/* Como pueden ser undefined se incluyen en las opcionales */
	extent: Extent | null;
	zIndex: number | undefined;
	minResolution: number | null;
	maxResolution: number | null;
	minZoom: number | null;
	maxZoom: number | null;
	/* Customización/gestión propia */
	id?: number;
	name: string;
	showInLegend: boolean;
	url: string;
	imageFormat: string;
	type: ServiceType;
	serviceId: number;
	autoInfo: boolean;
	toolTip: boolean;
}
