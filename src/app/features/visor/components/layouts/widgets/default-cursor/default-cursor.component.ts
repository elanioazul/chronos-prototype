import { Component } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
@Component({
  selector: 'app-default-cursor',
  templateUrl: './default-cursor.component.html',
  styleUrls: ['./default-cursor.component.scss']
})
export class DefaultCursorComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor dragZoom comp');
  }
  ngOnInit(): void {
    console.log('ngOninit dragZoom comp');
    
  }

  onClick(): void {
    console.log('eee clicked from defaultCursor component');
    this.cursorService.setCursorStyle(CursorStyle.default);
    const dragZoomTooltip = this.mapService.map()!.getOverlayById('dragZoomTooltip');
    this.mapService.map()!.removeOverlay(dragZoomTooltip);
    // console.log(this.mapService.map()!.getInteractions());
    
    
    
  }
}
