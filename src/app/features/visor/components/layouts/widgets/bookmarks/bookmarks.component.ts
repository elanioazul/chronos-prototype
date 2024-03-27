import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '../widgets-warehouse/widget/widget.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent extends WidgetComponent implements OnInit, OnDestroy {
  
  constructor() {
    super();
    console.log('constructor bookmarks comp');
  }
  ngOnInit(): void {
    console.log('ngOninit bookmarks comp');
    
  }
  
  ngOnDestroy(): void {
    console.log('ngDestroy bookmarks comp time');
  }

  override onClick(): void {
    console.log('eee clicked from bookmarks component');
    this.mapService.setCursor(CursorStyle.default);
  }

  override sendMessageToLoaderComp(): void {
    this.messageEvent.emit(`mensaje por aqui al comp cargador desde componente bookmark dynamico`)
  }
}
