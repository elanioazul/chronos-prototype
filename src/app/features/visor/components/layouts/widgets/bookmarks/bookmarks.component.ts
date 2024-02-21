import { Component } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor bookmarks comp');
  }

  onClick(): void {
    console.log('eee clicked from bookmarks component');
    this.mapService.setCursor(CursorStyle.default);
  }
}
