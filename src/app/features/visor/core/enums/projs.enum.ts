export enum Proj4Projs {
  mercator = 'EPSG:3857',
  wgs84 = '+proj=longlat +datum=WGS84 +no_defs +type=crs',
  ed50 = '+proj=utm +zone=31 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs +type=crs',
  etrs89geo = '+proj=longlat +ellps=GRS80 +no_defs +type=crs',
  etrs89proj = '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
}
