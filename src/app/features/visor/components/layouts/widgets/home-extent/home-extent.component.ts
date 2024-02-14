import { Component } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
import { fitToExtent, getEpsgFromMap } from '@features/visor/core/utils/utils-ol';
import { ProjUtilities } from '@features/visor/core/utils/utils-proj';
import { Extent } from 'ol/extent';
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

  onClick(): void {
    console.log('eee clicked from homeExtent component');
    this.cursorService.setCursorStyle(CursorStyle.default);
    fitToExtent(this.mapService.map()!, this.predefinedExtent!)
  }
}
