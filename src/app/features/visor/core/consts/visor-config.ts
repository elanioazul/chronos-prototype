import { Extent } from "ol/extent";
import { IReadVisor } from "../interfaces/visor-stuff/visor.interfaz";
import { LayerTypes } from "../enums/layers-type";
import { Coordinate } from 'ol/coordinate';

const spainExtent: Extent = [-1.181030, 40.480381, 3.625488, 43.016697]; //EPSG:4326 //http://bboxfinder.com/
const cataloniaExtent: Extent = [-0.686646, 40.815666, 4.540100, 42.718768]; //EPSG:4326 //http://bboxfinder.com/
export const bcnCoords:  Coordinate = [2.173404, 41.385063];

export const mockVisor: IReadVisor = {
	id: 666,
	nombre: 'Chronos-visor',
	spatialReference: {
		proj4js:
			'+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
		authority: 'EPSG',
		srid: 25831,
	},
	extent: cataloniaExtent,
	serviciosBase: [
		{
			id: 1,
			nombre: 'Ortoimágenes de España (satélite Sentinel2 y ortofotos del PNOA máxima actualidad)',
			alias: 'Ortoimágenes de España (satélite Sentinel2 y ortofotos del PNOA máxima actualidad)',
			descripcion: `Ortofotos de máxima actualidad del proyecto PNOA (Plan Nacional de Ortofotografía Aérea) visibles a partir de una escala aproximada 1:70.000. Para escalas menores se visualizan las imágenes de satélite Sentinel2 de 10 metros de resolución. Ortoimagen Melilla: Pléiades Neo © Airbus DS (2022). La cobertura PNOA está constituida por mosaicos de distinta fecha de adquisición y distinta resolución (50 y 25 cm). Los datos PNOA se actualizan varias veces al año y los datos Sentinel2 se actualizan semestralmente. Las imágenes mundiales de fondo provienen del espectrorradiómetro de imágenes de resolución moderada de la NASA (MODIS).Estas actualizaciones se anuncian en el canal RSS del IGN (https://www.ign.es/ign/rss). Servicio de visualización Teselado conforme al perfil INSPIRE de Web Map Tile Service (WMTS) 1.0.0. Las teselas se pregeneran en formato JPEG y hasta el nivel 19 (correspondiente con una escala aproximada 1:1.000) en el Sistema de Referencia por Coordenadas WGS84 Web Mercator (EPSG:3857).`,
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/jpeg',
			extent: null,
			matrixSet: 'EPSG:25831',
			minZoom: null,
			maxZoom: null,
			tiled: true,
			host: {
				url: 'https://www.ign.es/wmts/pnoa-ma',
				tipo: LayerTypes.WMTS,
			},
			autoInfo: false,
			toolTip: false,
			visible: true,
			capas: [
				{
					id: 1,
					nombre: 'Imágenes de satélite Sentinel y ortofotos PNOA',
					identificador: 'OI.OrthoimageCoverage',
				},
			],
			capabilities: null,
			draggable: false
		}
	],
	serviciosOverview: [
		{
			id: 1,
			nombre: 'WMTS Bases - ICGC',
			descripcion: 'Servei WMTS Bases - ICGC',
			alias: 'topogris',
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/jpeg',
			extent: [0.030420432536880683, 40.480444616083936, 3.486242225112867, 43.05147116664476], // WGS84BoundingBox at https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wmts/service?service=wmts&request=getCapabilities
			matrixSet: 'EPSG:25831',
			minZoom: null,
			maxZoom: null,
			tiled: true,
			autoInfo: false,
			toolTip: false,
			visible: true,
			host: {
				url: 'https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wmts/service?',
				tipo: LayerTypes.WMTS,
			},
			capas: [
				{
					id: 1,
					nombre: 'topogris',
					identificador: '0',
				},
			],
			capabilities: null,
			draggable: false
		}
	],
	serviciosInicio: [
		{
			capas: [
				{
					id: 1,
					campos: [
						{
							nombre: 'ABSCISA_ED50_UTM31N',
							alias: 'ABSCISA_ED50_UTM31N',
						},
						{
							nombre: 'ACTIVAR',
							alias: 'ACTIVAR',
						},
						{
							nombre: 'AYUDANTE',
							alias: 'AYUDANTE',
						},
						{
							nombre: 'BASE',
							alias: 'BASE',
						},
						{
							nombre: 'CODEMPRESA',
							alias: 'CODEMPRESA',
						},
						{
							nombre: 'COORDX_ETRS89_UTM31N',
							alias: 'COORDX_ETRS89_UTM31N',
						},
						{
							nombre: 'COORDY_ETRS89_UTM31N',
							alias: 'COORDY_ETRS89_UTM31N',
						},
						{
							nombre: 'DATA_ALTA',
							alias: 'DATA_ALTA',
						},
						{
							nombre: 'ESTADO',
							alias: 'ESTADO',
						},
						{
							nombre: 'FEC_CAMBIOTURNO',
							alias: 'FEC_CAMBIOTURNO',
						},
						{
							nombre: 'GPS_START_BASE',
							alias: 'GPS_START_BASE',
						},
						{
							nombre: 'GW_NOTIFY_STATE',
							alias: 'GW_NOTIFY_STATE',
						},
						{
							nombre: 'HORARIO_FIN',
							alias: 'HORARIO_FIN',
						},
						{
							nombre: 'HORARIO_INI',
							alias: 'HORARIO_INI',
						},
						{
							nombre: 'HORAS_DISPONIBLE',
							alias: 'HORAS_DISPONIBLE',
						},
						{
							nombre: 'ID_VEHICLE',
							alias: 'ID_VEHICLE',
						},
						{
							nombre: 'ISSI_MOBIL',
							alias: 'ISSI_MOBIL',
						},
						{
							nombre: 'LAST_INI_FIN',
							alias: 'LAST_INI_FIN',
						},
						{
							nombre: 'LAT_WGS84',
							alias: 'LAT_WGS84',
						},
						{
							nombre: 'LNG_WGS84',
							alias: 'LNG_WGS84',
						},
						{
							nombre: 'MATRICULA',
							alias: 'MATRICULA',
						},
						{
							nombre: 'MNEMONIC_MOBIL',
							alias: 'MNEMONIC_MOBIL',
						},
						{
							nombre: 'ORDEN',
							alias: 'ORDEN',
						},
						{
							nombre: 'ORDENADA_ED50_UTM31N',
							alias: 'ORDENADA_ED50_UTM31N',
						},
						{
							nombre: 'RECURSO',
							alias: 'RECURSO',
						},
						{
							nombre: 'RECURS_EMBARCAT',
							alias: 'RERECURS_EMBARCATCURSO',
						},
						{
							nombre: 'TELEFONO',
							alias: 'TELEFONO',
						},
						{
							nombre: 'TIME_LASTCOORD',
							alias: 'TIME_LASTCOORD',
						},
						{
							nombre: 'TIPORECURSO',
							alias: 'TIPORECURSO',
						},
						{
							nombre: 'ZONA_COBERTURA',
							alias: 'ZONA_COBERTURA',
						},
					],
					nombre: 'RESOURCES',
					identificador: 'chronos-recursos:RESOURCES',
				},
			],
			autoInfo: true,
			toolTip: false,
			visible: true,
			nombre: 'Servicios de recursos WFS',
			alias: 'Servicios de recursos WFS',
			descripcion: 'Servicios de recursos WFS desc',
			opacidad: 1.0,
			identificable: true,
			displayInLegend: false,
			format: 'application/json',
			minZoom: null,
			maxZoom: null,
			host: {
				url: 'http://localhost:8080/geoserver/chronos-recursos/wfs?',
				tipo: LayerTypes.WFS,
			},
			extent: [0.284193968135119, 40.5424652584572, 3.28576420492974, 42.7015647693928],//LatLongBoundingBox de la capa en el WFS
			matrixSet: undefined,
			tiled: null,
			id: 0,
			capabilities: null,
			draggable: true
		},
		// {
		// 	capas: [
		// 		{
		// 			id: 1,
		// 			campos: [
		// 				{
		// 					nombre: 'ABSCISA_ED50_UTM31N',
		// 					alias: 'ABSCISA_ED50_UTM31N',
		// 				},
		// 				{
		// 					nombre: 'ACTIVAR',
		// 					alias: 'ACTIVAR',
		// 				},
		// 				{
		// 					nombre: 'AYUDANTE',
		// 					alias: 'AYUDANTE',
		// 				},
		// 				{
		// 					nombre: 'BASE',
		// 					alias: 'BASE',
		// 				},
		// 				{
		// 					nombre: 'CODEMPRESA',
		// 					alias: 'CODEMPRESA',
		// 				},
		// 				{
		// 					nombre: 'COORDX_ETRS89_UTM31N',
		// 					alias: 'COORDX_ETRS89_UTM31N',
		// 				},
		// 				{
		// 					nombre: 'COORDY_ETRS89_UTM31N',
		// 					alias: 'COORDY_ETRS89_UTM31N',
		// 				},
		// 				{
		// 					nombre: 'DATA_ALTA',
		// 					alias: 'DATA_ALTA',
		// 				},
		// 				{
		// 					nombre: 'ESTADO',
		// 					alias: 'ESTADO',
		// 				},
		// 				{
		// 					nombre: 'FEC_CAMBIOTURNO',
		// 					alias: 'FEC_CAMBIOTURNO',
		// 				},
		// 				{
		// 					nombre: 'GPS_START_BASE',
		// 					alias: 'GPS_START_BASE',
		// 				},
		// 				{
		// 					nombre: 'GW_NOTIFY_STATE',
		// 					alias: 'GW_NOTIFY_STATE',
		// 				},
		// 				{
		// 					nombre: 'HORARIO_FIN',
		// 					alias: 'HORARIO_FIN',
		// 				},
		// 				{
		// 					nombre: 'HORARIO_INI',
		// 					alias: 'HORARIO_INI',
		// 				},
		// 				{
		// 					nombre: 'HORAS_DISPONIBLE',
		// 					alias: 'HORAS_DISPONIBLE',
		// 				},
		// 				{
		// 					nombre: 'ID_VEHICLE',
		// 					alias: 'ID_VEHICLE',
		// 				},
		// 				{
		// 					nombre: 'ISSI_MOBIL',
		// 					alias: 'ISSI_MOBIL',
		// 				},
		// 				{
		// 					nombre: 'LAST_INI_FIN',
		// 					alias: 'LAST_INI_FIN',
		// 				},
		// 				{
		// 					nombre: 'LAT_WGS84',
		// 					alias: 'LAT_WGS84',
		// 				},
		// 				{
		// 					nombre: 'LNG_WGS84',
		// 					alias: 'LNG_WGS84',
		// 				},
		// 				{
		// 					nombre: 'MATRICULA',
		// 					alias: 'MATRICULA',
		// 				},
		// 				{
		// 					nombre: 'MNEMONIC_MOBIL',
		// 					alias: 'MNEMONIC_MOBIL',
		// 				},
		// 				{
		// 					nombre: 'ORDEN',
		// 					alias: 'ORDEN',
		// 				},
		// 				{
		// 					nombre: 'ORDENADA_ED50_UTM31N',
		// 					alias: 'ORDENADA_ED50_UTM31N',
		// 				},
		// 				{
		// 					nombre: 'RECURSO',
		// 					alias: 'RECURSO',
		// 				},
		// 				{
		// 					nombre: 'RECURS_EMBARCAT',
		// 					alias: 'RERECURS_EMBARCATCURSO',
		// 				},
		// 				{
		// 					nombre: 'TELEFONO',
		// 					alias: 'TELEFONO',
		// 				},
		// 				{
		// 					nombre: 'TIME_LASTCOORD',
		// 					alias: 'TIME_LASTCOORD',
		// 				},
		// 				{
		// 					nombre: 'TIPORECURSO',
		// 					alias: 'TIPORECURSO',
		// 				},
		// 				{
		// 					nombre: 'ZONA_COBERTURA',
		// 					alias: 'ZONA_COBERTURA',
		// 				},
		// 			],
		// 			nombre: 'RESOURCES',
		// 			identificador: 'chronos-recursos:RESOURCES',
		// 		},
		// 	],
		// 	autoInfo: true,
		// 	toolTip: false,
		// 	visible: true,
		// 	nombre: 'Servicios de recursos',
		// 	alias: 'Servicios de recursos',
		// 	descripcion: 'Servicios de recursos desc',
		// 	opacidad: 1.0,
		// 	identificable: true,
		// 	displayInLegend: false,
		// 	format: 'image/png',
		// 	minZoom: null,
		// 	maxZoom: null,
		// 	host: {
		// 		url: 'http://localhost:8080/geoserver/chronos-recursos/wms?',
		// 		tipo: LayerTypes.WMS,
		// 	},
		// 	extent: [0.284193968135119, 40.5424652584572, 3.28576420492974, 42.7015647693928],//Native SRS de la capa más amplia
		// 	matrixSet: undefined,
		// 	tiled: false,
		// 	id: 1,
		// 	capabilities: null,
		// 	draggable: true
		// },
		{
			capas: [
				{
					id: 1,
					campos: [
						{
							nombre: 'CODIABS',
							alias: 'CODIABS',
						},
						{
							nombre: 'NOMABS',
							alias: 'NOMABS',
						},
						{
							nombre: 'CODISS',
							alias: 'CODISS',
						},
						{
							nombre: 'NOMSS',
							alias: 'NOMSS',
						},
						{
							nombre: 'CODIRS',
							alias: 'CODIRS',
						},
						{
							nombre: 'NOMRS',
							alias: 'NOMRS',
						},
						{
							nombre: 'CODIAGA',
							alias: 'CODIAGA',
						},
						{
							nombre: 'NOMAGA',
							alias: 'NOMAGA',
						},
						{
							nombre: 'ESTAT',
							alias: 'ESTAT',
						},
						{
							nombre: 'OBSER',
							alias: 'OBSER',
						},
						{
							nombre: 'CREATED_BY',
							alias: 'CREATED_BY',
						},
						{
							nombre: 'CREATED_DATE',
							alias: 'CREATED_DATE',
						},
						{
							nombre: 'MODIFIED_BY',
							alias: 'MODIFIED_BY',
						},
						{
							nombre: 'MODIFIED_DATE',
							alias: 'MODIFIED_DATE',
						}
					],
					nombre: 'ABS_2020_ETRS89',
					identificador: 'chronos-abs:ABS_2020_ETRS89',
				},
			],
			autoInfo: true,
			toolTip: false,
			visible: true,
			nombre: 'Servicios de salud',
			alias: 'Servicios de salud',
			descripcion: 'Servicios de salud desc',
			opacidad: 1.0,
			identificable: true,
			displayInLegend: false,
			format: 'image/png',
			minZoom: null,
			maxZoom: null,
			host: {
				url: 'http://localhost:8080/geoserver/chronos-abs/wms?',
				tipo: LayerTypes.WMS,
			},
			extent: [0.158543097516996, 40.52291819670317, 3.33985063914339, 42.861455494161085],//Native SRS de la capa más amplia
			matrixSet: undefined,
			tiled: false,
			id: 2,
			capabilities: null,
			draggable: true
		},
		{
			capas: [
				{
					id: 1,
					campos: [
						{
							nombre: 'NEIGHBOURHOOD',
							alias: 'NEIGHBOURHOOD',
						},
						{
							nombre: 'BOROUGH_ID',
							alias: 'BOROUGH_ID',
						},
						{
							nombre: 'BOROUGH',
							alias: 'BOROUGH',
						},
						{
							nombre: 'LOCALADMIN_ID',
							alias: 'LOCALADMIN_ID',
						},
						{
							nombre: 'LOCALADMIN',
							alias: 'LOCALADMIN',
						},
						{
							nombre: 'MACROCOUNTY_ID',
							alias: 'MACROCOUNTY_ID',
						},
						{
							nombre: 'MACROCOUNTY',
							alias: 'MACROCOUNTY',
						},
						{
							nombre: 'REGION_ID',
							alias: 'REGION_ID',
						},
						{
							nombre: 'REGION',
							alias: 'REGION',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'LAYER',
							alias: 'LAYER',
						},
						{
							nombre: 'SOURCE_DATA',
							alias: 'SOURCE_DATA',
						}
					],
					nombre: 'NEIGHBOURHOOD_BCN_ETRS89',
					identificador: 'chronos-admin-division:NEIGHBOURHOOD_BCN_ETRS89',
				},
				{
					id: 2,
					campos: [
						{
							nombre: 'LOCALADMIN',
							alias: 'LOCALADMIN',
						},
						{
							nombre: 'MACROCOUNTY_ID',
							alias: 'MACROCOUNTY_ID',
						},
						{
							nombre: 'MACROCOUNTY',
							alias: 'MACROCOUNTY',
						},
						{
							nombre: 'REGION_ID',
							alias: 'REGION_ID',
						},
						{
							nombre: 'REGION',
							alias: 'REGION',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'LAYER',
							alias: 'LAYER',
						},
						{
							nombre: 'SOURCE_DATA',
							alias: 'SOURCE_DATA',
						}
					],
					nombre: 'LOCALADMIN_CAT_ETRS89',
					identificador: 'chronos-admin-division:LOCALADMIN_CAT_ETRS89',
				},
				{
					id: 3,
					campos: [
						{
							nombre: 'LOCALADMIN_ID',
							alias: 'LOCALADMIN_ID',
						},
						{
							nombre: 'LOCALADMIN',
							alias: 'LOCALADMIN',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'LAYER',
							alias: 'LAYER',
						},
						{
							nombre: 'SOURCE_DATA',
							alias: 'SOURCE_DATA',
						}
					],
					nombre: 'LOCALADMIN_AND_ETRS89',
					identificador: 'chronos-admin-division:LOCALADMIN_AND_ETRS89',
				},
				{
					id: 4,
					campos: [
						{
							nombre: 'LOCALADMIN',
							alias: 'LOCALADMIN',
						},
						{
							nombre: 'MACROCOUNTY_ID',
							alias: 'MACROCOUNTY_ID',
						},
						{
							nombre: 'MACROCOUNTY',
							alias: 'MACROCOUNTY',
						},
						{
							nombre: 'REGION_ID',
							alias: 'REGION_ID',
						},
						{
							nombre: 'REGION',
							alias: 'REGION',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'LAYER',
							alias: 'LAYER',
						},
						{
							nombre: 'SOURCE_DATA',
							alias: 'SOURCE_DATA',
						}
					],
					nombre: 'LOCALADMIN_ESP_ETRS89',
					identificador: 'chronos-admin-division:LOCALADMIN_ESP_ETRS89',
				},
				{
					id: 5,
					campos: [
						{
							nombre: 'LOCALADMIN',
							alias: 'LOCALADMIN',
						},
						{
							nombre: 'MACROCOUNTY_ID',
							alias: 'MACROCOUNTY_ID',
						},
						{
							nombre: 'MACROCOUNTY',
							alias: 'MACROCOUNTY',
						},
						{
							nombre: 'REGION_ID',
							alias: 'REGION_ID',
						},
						{
							nombre: 'REGION',
							alias: 'REGION',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'LAYER',
							alias: 'LAYER',
						},
						{
							nombre: 'SOURCE_DATA',
							alias: 'SOURCE_DATA',
						}
					],
					nombre: 'LOCALADMIN_FRA_ETRS89',
					identificador: 'chronos-admin-division:LOCALADMIN_FRA_ETRS89',
				},
				{
					id: 6,
					campos: [
						{
							nombre: 'NAME',
							alias: 'NAME',
						},
						{
							nombre: 'TARGET_TABLE',
							alias: 'TARGET_TABLE',
						},
						{
							nombre: 'COUNTRY_ID',
							alias: 'COUNTRY_ID',
						},
						{
							nombre: 'COUNTRY',
							alias: 'COUNTRY',
						},
						{
							nombre: 'PRIORITY',
							alias: 'PRIORITY',
						}
					],
					nombre: 'COUNTRY_ETRS89',
					identificador: 'chronos-admin-division:COUNTRY_ETRS89',
				},
			],
			autoInfo: true,
			toolTip: false,
			visible: true,
			nombre: 'Servicios de admin-division',
			alias: 'Servicios de admin-division',
			descripcion: 'Servicios de admin-division desc',
			opacidad: 1.0,
			identificable: true,
			displayInLegend: false,
			format: 'image/png',
			minZoom: null,
			maxZoom: null,
			host: {
				url: 'http://localhost:8080/geoserver/chronos-admin-division/wms?',
				tipo: LayerTypes.WMS,
			},
			extent: [-18.3201264155889, 27.637723150776, 4.34014226940938, 43.9215181349627],//Native SRS de la capa más amplia
			matrixSet: undefined,
			tiled: false,
			id: 3,
			capabilities: null,
			draggable: true
		}
	],
};

export const initialPositionsBasedOnUsers = new Map();
initialPositionsBasedOnUsers.set('gironaOperator', [2.823610, 41.981651])
initialPositionsBasedOnUsers.set('lleidaOperator', [0.625800, 41.614159])
initialPositionsBasedOnUsers.set('tarragonaOperator', [1.245330, 41.118660])
initialPositionsBasedOnUsers.set('barcelonaOperator', [2.173404, 41.385063])