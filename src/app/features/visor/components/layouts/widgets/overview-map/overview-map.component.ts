import { Component } from '@angular/core';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

@Component({
  selector: 'app-overview-map',
  templateUrl: './overview-map.component.html',
  styleUrls: ['./overview-map.component.scss']
})
export class OverviewMapComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor overviewMap comp');
  }
  ngOnInit(): void {
    console.log('ngOninit overviewMap comp');
    
  }

  onClick(): void {
    console.log('eee clicked from overviewMap component');
    
  }
}
