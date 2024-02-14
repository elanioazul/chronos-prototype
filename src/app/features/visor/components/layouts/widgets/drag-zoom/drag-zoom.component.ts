import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
import { DragZoom } from 'ol/interaction';
import * as condition from 'ol/events/condition';
import Tooltip from 'ol-ext/overlay/Tooltip';
@Component({
  selector: 'app-drag-zoom',
  templateUrl: './drag-zoom.component.html',
  styleUrls: ['./drag-zoom.component.scss']
})
export class DragZoomComponent extends WidgetComponent implements OnInit/*, OnDestroy*/ {
  private dragZoom: DragZoom;
  private tooltip: Tooltip;
  constructor() {
    super();
    console.log('constructor dragZoom comp');
    this.dragZoom = new DragZoom({
			//necesario para que se habilite directamente sin necesidad de usar la tecla shift al dibujar la caja
			condition: condition.always
		});

    
  }
  ngOnInit(): void {
    console.log('ngOninit dragZoom comp');
    
  }
  
  // ngOnDestroy(): void {
  //   this.disableDragZoom();
  // }

  onClick(): void {
    console.log('eee clicked from dragZoom component');
    this.enableDragZoom();
  }

  enableDragZoom(): void {
    this.cursorService.setCursorStyle(CursorStyle.crosshair);
    this.mapService.map()!.addInteraction(this.dragZoom);
    this.tooltip = new Tooltip({
			getHTML: this.getHTML,
      className: 'dragZoomTooltip',
      id: 'dragZoomTooltip'
		});
    this.mapService.map()!.addOverlay(this.tooltip)
  }

  disableDragZoom(): void {
    this.cursorService.setCursorStyle(CursorStyle.default);
    this.mapService.map()!.removeOverlay(this.tooltip);
    this.mapService.map()!.removeInteraction(this.dragZoom)
  }

	private getHTML = () =>
		`Presiona para comenzar, desliza y suelta`;
}
