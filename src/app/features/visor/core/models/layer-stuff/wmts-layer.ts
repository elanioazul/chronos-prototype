import WMTSTileGrid from "ol/tilegrid/WMTS";
import { ChronosMap } from "../map-stuff/chronos-map";
import { ChronosLayer } from "./chronos-layer";
import { WMTS } from "ol/source";
import { Tile } from "ol/layer";
import { IWMTSLayer } from "../../interfaces/layer-stuff/wmts-layer.interfaz";
import { ILayer } from "../../interfaces/layer-stuff/layer.interfaz";
import * as olproj from 'ol/proj';
import {
	getTopLeft as extentGetTopLeft,
	getWidth as extentGetWidth,
} from 'ol/extent.js';
export class WMTSChronosLayer extends ChronosLayer {
	private _matrixSet: string;
	private _activeStyleName: string;
	private _identifier: string;
	private _projection: string;

	get identifier(): string {
		return this._identifier;
	}
	get matrixSet(): string {
		return this._matrixSet;
	}
	get activeStyleName(): string {
		return this._activeStyleName;
	}
	get projection(): string {
		return this._projection;
	}

	constructor(options: IWMTSLayer) {
		super(options as ILayer);
		this._matrixSet = options.matrixSet!;
		this._projection = options.projection;
		this._identifier = options.identifier;
		this._activeStyleName = options.selectedStyleName
			? options.selectedStyleName
			: '';
		this.initWrapperWMTSLayer();
	}

	public select(mapa: ChronosMap, where: string, style: string) {
		
	}
	public clearSelect() {
		
	}

	private initWrapperWMTSLayer() {
		const defaultTileGrid: WMTSTileGrid = this.createDefaultTileGrid(
			this.projection
		);
		const scaleDenominatorTileGrid: WMTSTileGrid = this.createTileGridBasedOnScaleDenominator(
			this.projection
		);

		const layerSource = new WMTS({
			// 20220125 @ADR: Pendiente cambiar el valor del host en BD
			url: this.url,
			/*this.identifier === 'mapa_base'
					? 'https://wmts.mapama.gob.es/sig/comun/mapa_base/gwc/service/wmts?'
					: this.url,*/
			matrixSet: this.matrixSet,
			format: this.format,
			layer: this.name,
			tileGrid: scaleDenominatorTileGrid,
			style: this.activeStyleName,
		});

		const tileGrid = layerSource.getTileGrid();

		this.ol = new Tile({
			source: layerSource,
			visible: this.visible,
			opacity: this.opacity,
			minResolution: tileGrid?.getResolution(tileGrid.getMaxZoom()),
			maxResolution: tileGrid?.getResolution(tileGrid.getMinZoom()),
		});
	}

	private createDefaultTileGrid(epsg: string): WMTSTileGrid {
		const projection = olproj.get(epsg);
		const projectionExtent = projection!.getExtent();
		const size = extentGetWidth(projectionExtent) / 256;
		const resolutions = new Array(20);
		const matrixIds = new Array(20);
		for (let z = 0; z < 20; ++z) {
			resolutions[z] = size / Math.pow(2, z);
			matrixIds[z] = z;
		}

		return new WMTSTileGrid({
			origin: extentGetTopLeft(projectionExtent),
			resolutions,
			matrixIds,
		});
	}

	private createTileGridBasedOnScaleDenominator = (epsg: string): WMTSTileGrid => {
		const projection = olproj.get(epsg);
		const projectionExtent = projection!.getExtent();
	  
		//https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wmts/service?service=wmts&request=getCapabilities
		const scaleDenominators = [
		  3928571.428571428, 1964285.714285714, 982142.857142857, 357142.8571428571,
		  178571.42857142855, 89285.71428571428, 35714.28571428571,
		  17857.142857142855, 7142.857142857142, 3571.428571428571,
		  1785.7142857142856, 892.8571428571428, 357.1428571428571,
		];
		const matrixIds = new Array(13);
		const resolutions = new Array(13);
		const meterPerUnit = 0.00028; 
		for (let z = 0; z < 13; ++z) {
		  resolutions[z] = meterPerUnit * scaleDenominators[z]; 
		  matrixIds[z] = z;
		}
	  
		// console.log('TileGridBasedOnScaleDenominator-resolutions', resolutions);
		// console.log('TileGridBasedOnScaleDenominator-matrixIds', matrixIds);
	  
	  
		return new WMTSTileGrid({
		  origin: extentGetTopLeft(projectionExtent),
		  resolutions,
		  matrixIds,
		});
	  };
}