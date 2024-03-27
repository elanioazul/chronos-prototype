import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

@Component({
  selector: 'app-default-cursor',
  templateUrl: './default-cursor.component.html',
  styleUrls: ['./default-cursor.component.scss']
})
export class DefaultCursorComponent extends WidgetComponent implements OnInit, OnDestroy {
  
  constructor() {
    super();
    console.log('constructor defaultCursor comp');
  }
  ngOnInit(): void {
    console.log('ngOninit defaultCursor comp');
    
  }
  ngOnDestroy(): void {
    console.log('ngDestroy defaultCursor comp time');
  }

  override onClick(): void {
    console.log('eee clicked from defaultCursor component');
    this.mapService.setCursor(CursorStyle.default)
    // const dragZoomTooltip = this.mapService.map()!.getOverlayById('dragZoomTooltip');
    // this.mapService.map()!.removeOverlay(dragZoomTooltip);
    // console.log(this.mapService.map()!.getInteractions());
    
    
    
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente default-cursor dynamico`)
  }
}
