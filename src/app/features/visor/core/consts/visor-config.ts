import { Extent } from "ol/extent";
import { IReadVisor } from "../interfaces/visor-stuff/visor.interfaz";
import { LayerTypes } from "../enums/layers-type";
import { Coordinate } from 'ol/coordinate';
import { EPSGs } from '../enums/epsgs';

const cataloniaExtent: Extent = [-1.013489,40.751418,4.213257,42.656182];
const spainExtent: Extent = [-1.181030, 40.480381, 3.625488, 43.016697]; //EPSG:4326 //http://bboxfinder.com/
const icgcExtent: Extent = [0.030420432536880683, 40.480444616083936, 3.486242225112867, 43.05147116664476]; //WGS84BoundingBox at https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wmts/service?service=wmts&request=getCapabilities
const scaleDenominatorsICGC = [
	3928571.428571428, 1964285.714285714, 982142.857142857, 357142.8571428571,
	178571.42857142855, 89285.71428571428, 35714.28571428571,
	17857.142857142855, 7142.857142857142, 3571.428571428571,
	1785.7142857142856, 892.8571428571428, 357.1428571428571,
  ];
const topLeftCornerICGC = [258000.0, 4766600.0];
const scaleDenominatorsPNOA = [
	2.795411320714286E8, 1.397705660357143E8, 6.988528301785715E7, 3.4942641508928575E7,
	1.7471320754464287E7, 8735660.377232144, 4367830.188616072,
	2183915.094308036, 1091957.547154018, 545978.773577009,
	272989.3867885045, 136494.69339425224, 68247.34669712612,
	34123.67334856306, 17061.83667428153, 8530.918337140765,
	4265.459168570383, 2132.7295842851913, 1066.364792142596, 
	533.182396071298
  ];
  const topLeftCornersPNOA = [[-1714549.1480570585, 2.3025516E7], [-1714549.1480570585, 1.3006762E7], [-1714549.1480570585, 7997385.0], [-1714549.1480570585, 5492697.0], [-1714549.1480570585, 5492697.0], [-1714549.1480570585, 5492697.0], [-1714549.1480570585, 5179611.0], [-1714549.1480570585, 5179611.0], [-1714549.1480570585, 5179611.0], [-1714549.1480570585, 5140475.0], [-1714549.1480570585, 5120907.0], [-1714549.1480570585, 5120907.0], [-1714549.1480570585, 5116015.0], [-1714549.1480570585, 5113569.0], [-1714549.1480570585, 5113569.0], [-1714549.1480570585, 5113569.0], [-1714549.1480570585, 5113263.0], [-1714549.1480570585, 5113263.0], [-1714549.1480570585, 5113263.0], [-1714549.1480570585, 5113263.0]];
  const extentPnoa25831: Extent = [-18.67845776, 25.33623918, 6.79134266, 46.70389306]
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
			nombre: 'OI.OrthoimageCoverage',
			alias: 'Ortoimágenes de España (satélite Sentinel2 y ortofotos del PNOA máxima actualidad)',
			descripcion: `Ortofotos de máxima actualidad del proyecto PNOA (Plan Nacional de Ortofotografía Aérea) visibles a partir de una escala aproximada 1:70.000. Para escalas menores se visualizan las imágenes de satélite Sentinel2 de 10 metros de resolución. Ortoimagen Melilla: Pléiades Neo © Airbus DS (2022). La cobertura PNOA está constituida por mosaicos de distinta fecha de adquisición y distinta resolución (50 y 25 cm). Los datos PNOA se actualizan varias veces al año y los datos Sentinel2 se actualizan semestralmente. Las imágenes mundiales de fondo provienen del espectrorradiómetro de imágenes de resolución moderada de la NASA (MODIS).Estas actualizaciones se anuncian en el canal RSS del IGN (https://www.ign.es/ign/rss). Servicio de visualización Teselado conforme al perfil INSPIRE de Web Map Tile Service (WMTS) 1.0.0. Las teselas se pregeneran en formato JPEG y hasta el nivel 19 (correspondiente con una escala aproximada 1:1.000) en el Sistema de Referencia por Coordenadas WGS84 Web Mercator (EPSG:3857).`,
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/png',
			extent: extentPnoa25831/*icgcExtent*/,
			matrixSet: EPSGs.EPSG25831,
			scaleDenominators: scaleDenominatorsPNOA,
			topLeftCorner: topLeftCornersPNOA,
			minZoom: null,
			maxZoom: null,
			tiled: true,
			host: {
				url: 'https://www.ign.es/wmts/pnoa-ma?',
				tipo: LayerTypes.WMTS,
			},
			autoInfo: false,
			toolTip: false,
			visible: true,
			capas: [
				{
					id: 1,
					nombre: 'OI.OrthoimageCoverage',
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
			nombre: 'Servei WMTS Bases - ICGC - jpeg',
			descripcion: 'Servei WMTS Bases - ICGC - jpeg',
			alias: 'WMTS Bases - ICGC - jpeg',
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/jpeg',
			extent: icgcExtent,
			matrixSet: 'UTM25831',
			scaleDenominators: scaleDenominatorsICGC,
			topLeftCorner: topLeftCornerICGC,
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
					nombre: 'topo',
					identificador: 'topo',
				},
				{
					id: 2,
					nombre: 'topogris',
					identificador: 'topogris',
				}
			],
			capabilities: null,
			draggable: false
		},
		{
			id: 1,
			nombre: 'Servei WMTS Bases - ICGC - png',
			descripcion: 'Servei WMTS Bases - ICGC - png',
			alias: 'WMTS Bases - ICGC - png',
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/png',
			extent: icgcExtent,
			matrixSet: 'UTM25831',
			scaleDenominators: scaleDenominatorsICGC,
			topLeftCorner: topLeftCornerICGC,
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
					nombre: 'orto',
					identificador: '0',
				},
			],
			capabilities: null,
			draggable: false
		},
		{
			id: 1,
			nombre: 'Servicios WMS Rafa',
			descripcion: 'Servicios WMS Rafa',
			alias: 'Servicios WMS Rafa',
			opacidad: 1.0,
			identificable: false,
			displayInLegend: false,
			format: 'image/jpeg',
			extent: icgcExtent,
			matrixSet: undefined,
			scaleDenominators: undefined,
			topLeftCorner: undefined,
			minZoom: null,
			maxZoom: null,
			tiled: true,
			autoInfo: false,
			toolTip: false,
			visible: true,
			host: {
				url: 'https://gsc-gateway.apps.aroas.westeurope.aroapp.io/geoserver/cloud/ows?',
				tipo: LayerTypes.WMS,
			},
			capas: [
				{
					id: 1,
					nombre: 'Topo rafa layer group',
					identificador: 'SEM:Topográfico',
				},
				{
					id: 2,
					nombre: 'Ortofoto rafa layer group',
					identificador: 'SEM:Ortofoto',
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
			scaleDenominators: undefined,
			topLeftCorner: undefined,
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
			scaleDenominators: undefined,
			topLeftCorner: undefined,
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
			scaleDenominators: undefined,
			topLeftCorner: undefined,
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