import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';
@Component({
  selector: 'app-zoom-in',
  templateUrl: './zoom-in.component.html',
  styleUrls: ['./zoom-in.component.scss']
})
export class ZoomInComponent extends WidgetComponent implements OnInit {

  constructor() {
    super();
    console.log('constructor zoomIn comp');
  }
  ngOnInit(): void {
    console.log('ngOninit zoomIn comp');
    
  }

  override onClick(): void {
    console.log('eee clicked from zoomIn component');
    this.mapService.setCursor(CursorStyle.default);
    this.mapService.map()?.getView().animate({
      zoom: this.mapService.map()?.getView().getZoom()! + 1,
      duration: 250
    })
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente zoomin dynamico`)
  }
}
