import { ChronosMapView } from '@features/visor/core/models/map-stuff/chronos-map-view';
import { Collection, Overlay } from 'ol';
import { Control } from 'ol/control';
import { Interaction } from 'ol/interaction';

export interface IMap {
	target: string;
	pixelRatio: number;
	view: ChronosMapView;
	keyboardEventTarget: Document;
	interactions: Collection<Interaction>;
	controls: Collection<Control>;
	overlays: Overlay[];
}