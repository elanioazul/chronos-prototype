import { Observable } from "rxjs";
import { ILayer } from "../../interfaces/layer-stuff/layer.interfaz";
import { ChronosMap } from "../map-stuff/chronos-map";
import { ChronosLayer } from "./chronos-layer";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource } from 'ol/source';
import { MVT } from 'ol/format';

export class MVTChronosLayer extends ChronosLayer {
	constructor(options: ILayer) {
		super(options);
		this.initVectorTileLayer();
	}

	public select(mapa: ChronosMap, where: string, style: string) {
		
	}
	public clearSelect() {
		
	}

	public getGeometries(
		where: string,
		srs: string
	): Observable<Feature<Geometry>[]> {
		throw new Error('Method not implemented.');
	}

	private initVectorTileLayer(): void {
		const layerSource = new VectorTileSource({
			format: new MVT(),
			url: this.url,
		});
		this.ol = new VectorTileLayer({
			source: layerSource,
			declutter: false,
			renderMode: 'hybrid', //'image', //image está deprecado
			visible: this.visible,
			opacity: this.opacity,
		});
	}
}