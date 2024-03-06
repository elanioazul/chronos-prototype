import { Component, EventEmitter, Output } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { fitToExtent, getEpsgFromMap } from '@features/visor/core/utils/utils-ol';
import { ProjUtilities } from '@features/visor/core/utils/utils-proj';
import { Extent } from 'ol/extent';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

@Component({
  selector: 'app-home-extent',
  templateUrl: './home-extent.component.html',
  styleUrls: ['./home-extent.component.scss']
})
export class HomeExtentComponent extends WidgetComponent {
  
  private predefinedExtent!: Extent;
  constructor() {
    super();
    console.log('constructor homeExtent comp');
  }
  ngOnInit(): void {
    console.log('ngOninit homeExtent comp');
    this.predefinedExtent = ProjUtilities.transformExtent(
      this.mapService.predefinedExtent()!,
      `EPSG:4326`,
      getEpsgFromMap(this.mapService.map()!)
    );
    
  }

  override onClick(): void {
    console.log('eee clicked from homeExtent component');
    this.mapService.setCursor(CursorStyle.default);
    fitToExtent(this.mapService.map()!, this.predefinedExtent!)
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente home-extent dynamico`)
  }
}
