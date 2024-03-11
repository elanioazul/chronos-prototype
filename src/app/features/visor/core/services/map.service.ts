import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ChronosMap } from '../models/map-stuff/chronos-map';
import { Message } from 'primeng/api';
import { ChronosService } from '../models/layer-stuff/chronos-service';
import { Extent } from 'ol/extent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IReadVisor } from '../interfaces/visor-stuff/visor.interfaz';
import { IMap } from '../interfaces/map-stuff/chronos-map.interfaz';
import { VisorService } from './visor.service';
import { SessionStorageService } from './session-storage.service';
import { FitOptions } from 'ol/View';
import { ProjUtilities } from '../utils/utils-proj';
import { ChronosLayer } from '../models/layer-stuff/chronos-layer';
import { ServiceType } from '../types/ol-layer-service.types';
import { IReadService } from '../interfaces/layer-stuff/service.interfaz';
import { IExtendedReadService } from '../interfaces/layer-stuff/service.extended.interfaz';
import { LayerTypes, LayerConfigTypes } from '../enums/layers-type';
import { WMSChronosService } from '../models/layer-stuff/wms-service';
import { WMTSChronosService } from '../models/layer-stuff/wmts-service';
import { HttpProxyService } from './http-proxy.service';

import { VisorToMapMapperService } from './visor-to-map-mapper.service';
import { WFSChronosService } from '../models/layer-stuff/wfs-service';
import { TMSChronosService } from '../models/layer-stuff/tms-service';
import { EPSGs } from '../enums/epsgs';

const layerConfigTypes = LayerConfigTypes;
export interface MapState {
  map: ChronosMap | null;
  services: ChronosService[];
  overviewLayers: ChronosLayer[];
  tileDebugLayer: boolean;
  // view: View | null,
  // controls: Control[];
  predefinedExtent: Extent | null;
  created: boolean;
  error: Message | null;
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  visorService = inject(VisorService);
  visorToMapMapperService = inject(VisorToMapMapperService)
  sessionStorageService = inject(SessionStorageService);
  httpProxyService = inject(HttpProxyService);
  // state
  private state = signal<MapState>({
    map: null,
    services: [],
    overviewLayers: [],
    tileDebugLayer: false,
    predefinedExtent: null,
    // view: null,
    // controls: [],
    created: false,
    error: null,
  });

  // selectors
  map = computed(() => this.state().map);
  services = computed(() => this.state().services);
  overviewlayers = computed(() => this.state().overviewLayers);
  tileDebugLayer = computed(() => this.state().tileDebugLayer);
  predefinedExtent = computed(() => this.state().predefinedExtent);
  // view = computed(() => this.state().view)
  // controls = computed(() => this.state().controls)
  created = computed(() => this.state().created);
  simpleTocLayers = computed(() =>
    this.state().services.flatMap((srv) =>
      srv.layers.filter(
        (lyr) => lyr.type === layerConfigTypes.overview || lyr.type === layerConfigTypes.base
      )
    )
  );

  recursosLyr = computed(() =>
    this.state().services.flatMap((srv) =>
      srv.layers.filter(
        (lyr) =>
          lyr.type === layerConfigTypes.initial &&
          lyr.name === 'Chronos WFS RESOURCES'
      )
    )
  );

  //sources
  createMap$ = new Subject<IMap>();
  setPredefinedExtent$ = new Subject<Extent>();
  setService$ = new Subject<ChronosService>();
  setOverviewLayer$ = new Subject<ChronosLayer>();

  //   centerMap$ = new Subject<Coordinate>();
  //   flyMap$ = new Subject<Coordinate>();
  //   reprojectMap$ = new Subject<string>(); //new Subject<Proj4Projs>();
  //   addLayer$ = new Subject<BaseLayer | Collection<BaseLayer> | LayerGroup>();
  //   removeLayer$ = new Subject<BaseLayer | Collection<BaseLayer> | LayerGroup>();
  //   toggleLayer$ = new Subject<BaseLayer | Collection<BaseLayer> | LayerGroup>();
  //   dragLayer$ = new Subject<BaseLayer | Collection<BaseLayer> | LayerGroup>();

  constructor() {
    this.createMap$.pipe(takeUntilDestroyed()).subscribe((mapProps: IMap) =>
      this.state.update((state) => ({
        ...state,
        map: this.createMap(mapProps),
      }))
    );

    this.setPredefinedExtent$
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (extent: Extent) =>
        this.state.update((state) => ({
          ...state,
          predefinedExtent: extent,
        }))
      });

    this.setService$
      .pipe(takeUntilDestroyed())
      .subscribe((service: ChronosService) =>
        this.state.update((state) => ({
          ...state,
          services: [...state.services, service],
        }))
      );

    this.setOverviewLayer$
      .pipe(takeUntilDestroyed())
      .subscribe((overviewLyr: ChronosLayer) =>
        this.state.update((state) => ({
          ...state,
          overviewLayers: [...state.overviewLayers, overviewLyr],
        }))
      );

    //effects
    // effect(() => {
    //   if (this.map()) {
    //     this.populateMap(this.visorService.config()!);
    //     this.applyConfigData(this.visorService.config()!);
    //   }
    // });
  }

  private createMap(props: IMap): ChronosMap {
    return new ChronosMap(props);
  }

  private addLayer(layer: ChronosLayer, zIndex: number): void {
    layer.ol.setZIndex(zIndex);
    this.map()!.addLayer(layer.ol);
    layer.zIndex = zIndex;
  }

  public populateMap(visorConfig: IReadVisor): void {
    let extent = visorConfig.extent;
    const mapProj = this.getMapProjCode();
    // el extent de la config del visor viene en...4326 => transformarlo a 25381 igual que hago en VisorToMapMapperService
    if (mapProj !== EPSGs.EPSG25831) {
      extent = ProjUtilities.transformExtent(
        visorConfig.extent,
        `EPSG:4326`,
        mapProj
      );
    }
    this.zoomToExtent(extent);
    this.setPredefinedExtent$.next(extent);
  }

  private getMapProjCode(): string {
    return this.map()!.getView().getProjection().getCode();
  }

  private zoomToExtent(extent: Extent, padding = false, maxZoom?: number): void {
    let fitOptions: FitOptions = {
      size: this.map()!.getSize(),
      nearest: true,
      duration: 250,
      maxZoom: 17,
    };
    if (padding) {
      fitOptions = { ...fitOptions, padding: [300, 300, 300, 300] };
    }
    if (maxZoom) {
      fitOptions = { ...fitOptions, maxZoom };
    }
    this.map()!.getView().fit(extent, fitOptions);
  }

  public applyConfigData(visorConfig: IReadVisor): void {
    if (
      visorConfig.serviciosOverview &&
      visorConfig.serviciosOverview.length > 0
    ) {
      this.handleOverviewServices(visorConfig.serviciosOverview);
    }

    if (visorConfig.serviciosBase && visorConfig.serviciosBase.length > 0) {
      this.handleBaseServices(visorConfig.serviciosBase);
    }

    if (visorConfig.serviciosInicio && visorConfig.serviciosInicio.length > 0) {
      this.handleInitialServices(visorConfig.serviciosInicio)
    }
  }

  private handleOverviewServices (srvs: IReadService[]): void {
    srvs.forEach((serviceInfo) => {
      const service: ChronosService = this.createService(
        serviceInfo,
        layerConfigTypes.overview
      );
      this.setService$.next(service);
      service.layers.forEach((overviewLayer: ChronosLayer) => {
        this.addLayer(overviewLayer, 0);
        // console.log(overviewLayer);
        
      });
    });
  }
  private handleBaseServices (srvs: IReadService[]): void {
    srvs.forEach((serviceInfo) => {
      const service: ChronosService = this.createService(
        serviceInfo,
        layerConfigTypes.base
      );
      this.setService$.next(service);
      service.layers.forEach((baseLayer: ChronosLayer) => {
        this.addLayer(baseLayer, 1);
        //console.log(baseLayer);
      });
    });
  }
  private handleInitialServices (srvs: IReadService[]): void {
    srvs.forEach(
      (serviceInfo: IReadService, index) => {
        const service: ChronosService = this.createService(
          serviceInfo,
          layerConfigTypes.initial
        );
        this.setService$.next(service);
        service.layers.forEach((initialLayer: ChronosLayer, indexPrima) => {
          this.addLayer(initialLayer, 100 - index - indexPrima);
          // Capas iniciales por defecto con visibilidad
          initialLayer.visible = serviceInfo.visible;
          initialLayer.opacity = serviceInfo.opacidad;
        });
        if (service.toolTip) {
          //TODO implementar utfcgrid
          // const firstLyr = service.layers[0].id;
          // if (firstLyr !== undefined) {
          //   this.setAutoInfoLayers([firstLyr]);
          // }
        }
      }
    );
  }

  /* Este método recibe la información del servicio y devuelve un Servicio con sus capas ya creadas */
  private createService(
    serviceInfo: IReadService,
    type: ServiceType
  ): ChronosService {
    let chronosService: ChronosService;
    const props: IExtendedReadService = { ...serviceInfo, type };
    switch (serviceInfo.host.tipo) {
      case LayerTypes.WMS:
        chronosService = new WMSChronosService(props, this.httpProxyService);
        break;
      case LayerTypes.WMTS:
        chronosService = new WMTSChronosService(props, this.getMapProjCode());
        break;
      case LayerTypes.WFS:
        chronosService = new WFSChronosService(props, this.httpProxyService);
        break;
      case LayerTypes.TMS:
        chronosService = new TMSChronosService(props, this.httpProxyService);
        break;
    }
    return chronosService;
  }


}
