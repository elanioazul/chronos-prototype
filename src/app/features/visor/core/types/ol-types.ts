import { Image, Tile, VectorTile } from 'ol/layer';
import { ImageWMS, TileWMS, WMTS } from 'ol/source';

export type olTypes = Image<ImageWMS> | Tile<TileWMS> | Tile<WMTS> | VectorTile;