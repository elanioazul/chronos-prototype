import { Component, Input, OnInit, inject } from '@angular/core';
import { ChronosLayer } from '@features/visor/core/models/layer-stuff/chronos-layer';
import { MapService } from '@features/visor/core/services/map.service';

@Component({
  selector: 'app-simple-layer-item',
  templateUrl: './simple-layer-item.component.html',
  styleUrls: ['./simple-layer-item.component.scss']
})
export class SimpleLayerItemComponent implements OnInit {
  
  mapServie = inject(MapService);
  @Input() layer!: ChronosLayer;
  public opacity = 100;
  
  public tocLayersAvailable = this.mapServie.simpleTocLayers()

  constructor() {}

  ngOnInit(): void {
    this.opacity = this.layer.opacity * 100;
  }

  public setOpacity(event) {
		this.layer.opacity = event.value / 100;
	}
}
