import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChronosMap } from '@features/visor/core/models/map-stuff/chronos-map';
import { getEpsgFromMap } from '@features/visor/core/utils/utils-ol';
import { ProjUtilities } from '@features/visor/core/utils/utils-proj';
import { OverviewMap } from 'ol/control';
import { LayerConfigTypes } from '@features/visor/core/enums/layers-type';
import { ChronosLayer } from '@features/visor/core/models/layer-stuff/chronos-layer';
import { ChronosMapView } from '@features/visor/core/models/map-stuff/chronos-map-view';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

@Component({
  selector: 'app-overview-map',
  templateUrl: './overview-map.component.html',
  styleUrls: ['./overview-map.component.scss']
})
export class OverviewMapComponent extends WidgetComponent implements OnInit, OnDestroy {
  
  private visible = false;
  private overviewMapControl!: OverviewMap;
  private visorConfig = this.visorService.config();
  constructor() {
    super();
    console.log('constructor overviewMap comp');
    this.overviewMapControl = new OverviewMap({
			className: 'ol-overviewmap ol-custom-overviewmap',
			collapsed: false,
			collapsible: false,
		});
  }

  ngOnInit(): void {
    console.log('ngOninit overviewMap comp');
    if (this.visible) {
			this.mapService.map()!.addControl(this.overviewMapControl);
		}
    const extent = ProjUtilities.transformExtent(
      this.mapService.predefinedExtent()!,
      `EPSG:4326`,
      getEpsgFromMap(this.mapService.map()!)
    );
    const projection = ProjUtilities.getOlProj(this.visorConfig!.spatialReference);
    this.overviewMapControl.getOverviewMap().getLayers().clear();
    if (this.visorConfig!.serviciosOverview) {
      const service = this.mapService.createService(
        this.visorConfig!.serviciosOverview[3],
        LayerConfigTypes.overview
      );
      service.layers.forEach((lyr: ChronosLayer) => {
        lyr.visible = true
      });
      this.overviewMapControl.getOverviewMap().addLayer(service.layers[0].ol);
      this.overviewMapControl.getOverviewMap().setView(new ChronosMapView({extent, projection, enableRotation: false}));
    }
  }

  ngOnDestroy(): void {
    this.mapService.map()!.removeControl(this.overviewMapControl);
    console.log('OnDestroy OverviewMap comp time');
  }

  override onClick(): void {
    console.log('eee clicked from overviewMap component');
    this.visible = !this.visible;
		if (this.visible) {
			this.mapService.map()!.addControl(this.overviewMapControl);
      console.log(this.mapService.map()!.getControls());
      
		} else {
			this.mapService.map()!.removeControl(this.overviewMapControl);
		}
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente overviewmap dynamico`)
  }
}
