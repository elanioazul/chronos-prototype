import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

@Component({
  selector: 'app-zoom-out',
  templateUrl: './zoom-out.component.html',
  styleUrls: ['./zoom-out.component.scss']
})
export class ZoomOutComponent extends WidgetComponent implements OnInit, OnDestroy {

  constructor() {
    super();
    console.log('constructor zoom-out comp');
  }
  ngOnInit(): void {
    console.log('ngOninit zoom-in comp');
    
  }

  ngOnDestroy(): void {
    console.log('OnDestroy zoomOut time');
  }

  override onClick(): void {
    console.log('eee clicked from zoomOut component');
    this.mapService.setCursor(CursorStyle.default);
    this.mapService.map()?.getView().animate({
      zoom: this.mapService.map()?.getView().getZoom()! - 1,
      duration: 250
    })
    
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente zoomout dynamico`)
  }
}
