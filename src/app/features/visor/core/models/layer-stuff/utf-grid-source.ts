import UTFGrid, { CustomTile } from 'ol/source/UTFGrid';
import { fromLonLat, Projection } from 'ol/proj';
import { getKeyZXY } from 'ol/tilecoord.js';
import TileState from 'ol/TileState.js';

export class WmsUtfGrid extends UTFGrid {
	//private _projection:string;
	private _urlWMS: string;
	private _layers: string;
	private _styles: string | null;
	private _filtro: string | null;

	constructor(
		urlWMS: string,
		layers: string,
		projection: Projection,
		styles = null,
		filtro = null
	) {
		super({
			tileJSON: {
				grids: [],
				tiles: [],
			},
		});
		super.projection = projection;
		this._urlWMS = urlWMS;
		this._layers = layers;
		this._styles = styles;
		this._filtro = filtro;
	}

	public override getTile (z, x, y, pixelRatio, projection) {
		const tileCoordKey = getKeyZXY(z, x, y);

		if (this.tileCache.containsKey(tileCoordKey)) {
			return this.tileCache.get(tileCoordKey);
		} else {
			const esquinaNW = fromLonLat(
				[this.tile2long(x, z), this.tile2lat(y, z)],
				projection
			);
			const esquinaSE = fromLonLat(
				[this.tile2long(x + 1, z), this.tile2lat(y + 1, z)],
				projection
			);

			const bbox = [esquinaNW[0], esquinaSE[1], esquinaSE[0], esquinaNW[1]];
			var charSep = '?';
			if (this._urlWMS.indexOf(charSep) > -1) {
				charSep = '&';
			}
			var tileUrl =
				this._urlWMS +
				charSep +
				'BBOX=' +
				bbox.join() +
				'&SERVICE=WMS' +
				'&VERSION=1.1.0' +
				'&REQUEST=GetMap' +
				(this._layers ? '&LAYERS=' + this._layers : '') +
				'&WIDTH=256' +
				'&HEIGHT=256' +
				'&STYLES=' +
				(this._styles ? this._styles : '') +
				'&SRS=' +
				projection.getCode() +
				'&FORMAT=application/json;type=utfgrid';

			//ACR: Forma de revisar si no hay ratón, en este caso, ampliamos los dpis para hace más fácil el tap con el dedo
			if (!matchMedia('(hover:hover)').matches) {
				tileUrl += '&format_options=dpi:130&buffer=64';
			}
			this._filtro && (tileUrl += '&CQLFILTER=' + this._filtro);

			const tileCoord = [z, x, y];

			const tile = new CustomTile(
				tileCoord,
				tileUrl !== undefined ? TileState.IDLE : TileState.EMPTY,
				tileUrl !== undefined ? tileUrl : '',
				this.tileGrid!.getTileCoordExtent(tileCoord),
                true, // this.preemptive_ || true,
				false // this.jsonp_ || false
			);
			this.tileCache.set(tileCoordKey, tile);
			return tile;
		}
	};

	private tile2long(x, z) {
		return (x / Math.pow(2, z)) * 360 - 180;
	}

	private tile2lat(y, z) {
		var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
		return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
	}
}
