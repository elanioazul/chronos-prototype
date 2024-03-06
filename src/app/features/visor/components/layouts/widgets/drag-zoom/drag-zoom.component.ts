import { Component, EventEmitter, OnDestroy, OnInit, Output, computed, inject } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { DragZoom } from 'ol/interaction';
import * as condition from 'ol/events/condition';
import Tooltip from 'ol-ext/overlay/Tooltip';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

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

  override onClick(): void {
    console.log('eee clicked from dragZoom component');
    this.enableDragZoom();
  }

  enableDragZoom(): void {
    this.mapService.setCursor(CursorStyle.crosshair);
    this.mapService.map()!.addInteraction(this.dragZoom);
    this.tooltip = new Tooltip({
			getHTML: this.getHTML,
      // className: 'dragZoomTooltip',
      // id: 'dragZoomTooltip'
		});
    this.mapService.map()!.addOverlay(this.tooltip)
  }

  disableDragZoom(): void {
    this.mapService.setCursor(CursorStyle.default);
    this.mapService.map()!.removeOverlay(this.tooltip);
    this.mapService.map()!.removeInteraction(this.dragZoom)
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente dragzoom dynamico`)
  }

	private getHTML = () =>
		`Presiona para comenzar, desliza y suelta`;
}
