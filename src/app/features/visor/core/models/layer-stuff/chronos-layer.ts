import { Extent } from 'ol/extent';
import { ServiceType } from '../../types/ol-layer-service.types';
import { olTypes } from '../../types/ol-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILayer } from '../../interfaces/layer-stuff/layer.interfaz';

export abstract class ChronosLayer {
  private _ol!: olTypes; // Instancia de OpenLayers
  private _id: number | undefined;
  private _name!: string;
  private _serviceId!: number;
  private _displayInLegend!: boolean;
  private _url!: string;
  private _imageFormat!: string;
  private _type!: ServiceType;
  private _opacity!: number;

  /* Observable properties según OL (src: https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html) */
  // extent, maxResolution, maxZoom, minResolution, minZoom, opacity, visible, zIndex
  // Generamos getters y setters para que desde el resto de la aplicación no tengamos que acceder al layer.ol
  get extent(): Extent | undefined {
    return this.ol?.getExtent();
  }
  set extent(extent: Extent) {
    this.ol?.setExtent(extent);
  }
  get maxResolution(): number {
    return this.ol?.getMaxResolution();
  }
  set maxResolution(maxResolution: number) {
    this.ol?.setMaxResolution(maxResolution);
  }
  get maxZoom(): number {
    return this.ol?.getMaxZoom();
  }
  set maxZoom(maxZoom: number) {
    this.ol?.setMaxZoom(maxZoom);
  }
  get minResolution(): number {
    return this.ol?.getMinResolution();
  }
  set minResolution(minResolution: number) {
    this.ol?.setMinResolution(minResolution);
  }
  get minZoom(): number {
    return this.ol?.getMinZoom();
  }
  set minZoom(minZoom: number) {
    this.ol?.setMinZoom(minZoom);
  }
  get zIndex(): number | undefined {
    return this.ol?.getZIndex();
  }
  set zIndex(zIndex: number) {
    this.ol?.setZIndex(zIndex);
  }

  /* Customización/gestión propia */
  get visible(): boolean {
    return this.visibleSource.value;
  }
  set visible(visible: boolean) {
    this.visibleSource.next(visible);
    this.ol?.setVisible(visible);
  }
  get opacity(): number {
    return this._opacity;
  }
  set opacity(opacity: number) {
    this._opacity = opacity;
    this.ol?.setOpacity(opacity);
  }

  get visible$(): Observable<boolean> {
    return this.visibleSource.asObservable();
  }
  get type(): ServiceType {
    return this._type;
  }
  get serviceId(): number {
    return this._serviceId;
  }
  get name(): string {
    return this._name;
  }
  get id(): number | undefined {
    return this._id;
  }
  get displayInLegend(): boolean {
    return this._displayInLegend;
  }

  get ol(): olTypes {
    return this._ol;
  }
  set ol(ol: olTypes) {
    this._ol = ol;
  }
  get url(): string {
    return this._url;
  }
  get imageFormat(): string {
    return this._imageFormat;
  }

  private visibleSource = new BehaviorSubject<boolean>(false);

  constructor(options: ILayer) {
    this._id = options.id;
    this._name = options.name;
    this._url = options.url;
    this.visible = options.visible;
    this.opacity = options.opacity;
    this._displayInLegend = options.showInLegend;
    this._imageFormat = options.imageFormat;
    this._type = options.type;

    if (options.hasOwnProperty('serviceId')) {
      this._serviceId = options.serviceId;
    }
    if (options.hasOwnProperty('extent')) {
      this.extent = options.extent!;
    }
    if (options.hasOwnProperty('zIndex')) {
      this.zIndex = options.zIndex!;
    }
    if (options.hasOwnProperty('minResolution')) {
      this.minResolution = options.minResolution!;
    }
    if (options.hasOwnProperty('maxResolution')) {
      this.maxResolution = options.maxResolution!;
    }
    if (options.hasOwnProperty('minZoom')) {
      this.minZoom = options.minZoom!;
    }
    if (options.hasOwnProperty('maxZoom')) {
      this.maxZoom = options.maxZoom!;
    }
  }
}
