import { get as getProjection, Projection, transformExtent, transform } from 'ol/proj';
import { ISpatialReference } from "../interfaces/spatial-reference.interfaz";
import * as proj4x from 'proj4';
import { register } from 'ol/proj/proj4';
import * as olProjProj4 from 'ol/proj/proj4.js';
import { Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import {
	getTopLeft as extentGetTopLeft,
	getWidth as extentGetWidth,
  } from 'ol/extent.js';

export class ProjUtilities {
    public static getOlProj(spatialReference: ISpatialReference): Projection {
		const epsgCode = `${spatialReference.authority}:${spatialReference.srid}`;
		const proj4 = (proj4x as any).default;
		proj4.defs([
			[epsgCode, spatialReference.proj4js], //la que viene de la config del visor, la que quiere Fernando
			[
				'EPSG:23031',
				'+proj=utm +zone=31 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs +type=crs'
			],
			[
				'EPSG:3857',
				'+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs'
			],
			[
				'EPSG:4326',
				'+proj=longlat +datum=WGS84 +no_defs +type=crs'
			],
			[
				'EPSG:4258',
				'+proj=longlat +ellps=GRS80 +no_defs +type=cr'
			]
		]);
		register(proj4);
		olProjProj4.register(proj4);
        return getProjection(epsgCode) ?? new Projection({
            code: 'EPSG:3857',
            extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
            units: 'm',
        });
	}

	public static transformExtent(
		extent: Extent,
		fromCode: string,
		toCode: string
	): Extent {
		return transformExtent(extent, fromCode, toCode);
	}

	public static transform(
		coords: Coordinate,
		fromCode: string,
		toCode: string
	): Extent {
		return transform(coords, fromCode, toCode);
	}

	public static enlargeExtentForGivenProjection(epsg: string, extent: Extent): void {
		const projection = getProjection(epsg);
		const projectionExtent = projection?.getExtent();
		const currentProjectionWidth = extentGetWidth(projectionExtent!)
		const width = extentGetWidth(extent);
		if (width > currentProjectionWidth) {
			this.setExtentToProjection(epsg, extent)
		}
	}

	public static setExtentToProjection(epsg: string, extent: Extent): void {
		getProjection(epsg)?.setExtent([
			extent[0],
			extent[1],
			extent[2],
			extent[3],
		  ]);
	}
}