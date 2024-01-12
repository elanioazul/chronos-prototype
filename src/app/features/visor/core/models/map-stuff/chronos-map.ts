import { IMap } from '@features/visor/core/interfaces/map-stuff/chronos-map.interfaz';
import { Map } from 'ol';

export class ChronosMap extends Map {
	constructor(props: IMap) {
		super(props);
	}
}