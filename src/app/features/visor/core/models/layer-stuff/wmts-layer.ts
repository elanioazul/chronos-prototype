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
import { EPSGs } from "../../enums/epsgs";
import { Coordinate } from "ol/coordinate";
export class WMTSChronosLayer extends ChronosLayer {
	private _matrixSet: string;
	private _scaleDenominators: number[] | undefined;
	private _topLeftCorner: Coordinate | undefined;
	private _activeStyleName: string;
	private _identifier: string;
	private _projection: string;

	get identifier(): string {
		return this._identifier;
	}
	get matrixSet(): string {
		return this._matrixSet;
	}
	get scaleDenominators(): number[] | undefined {
		return this._scaleDenominators;
	}
	get topLeftCorner(): Coordinate | undefined {
		return this._topLeftCorner;
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
		this._scaleDenominators = options.scaleDenominators;
		this._topLeftCorner = options.topLeftCorner;
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
			this.projection,
			this.scaleDenominators!,
			this.topLeftCorner!
		);

		const layerSource = new WMTS({
			url: this.url,
			matrixSet: this.matrixSet,
			format: this.format,
			layer: this.name,
			tileGrid: this.scaleDenominators === undefined && this.topLeftCorner === undefined ? defaultTileGrid : scaleDenominatorTileGrid,
			style: this.activeStyleName,
			projection: EPSGs.EPSG25831
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

	private createTileGridBasedOnScaleDenominator = (epsg: string, scaleDenominators: number[], topLeftCorner: Coordinate): WMTSTileGrid => {
		// const projection = olproj.get(epsg);
		// const projectionExtent = projection!.getExtent();

		const matrixIds = new Array(scaleDenominators.length);
		const resolutions = new Array(scaleDenominators.length);
		const meterPerUnit = 0.00028; 
		for (let z = 0; z < scaleDenominators.length; ++z) {
		  resolutions[z] = meterPerUnit * scaleDenominators[z]; 
		  matrixIds[z] = z;
		}
	  
		return new WMTSTileGrid({
		  origin: topLeftCorner, /*extentGetTopLeft(projectionExtent),*/
		  resolutions,
		  matrixIds,
		  tileSize: [256, 256],
		});
	  };
}