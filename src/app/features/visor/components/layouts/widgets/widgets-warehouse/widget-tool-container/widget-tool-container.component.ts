import { Component, Input, computed, inject } from '@angular/core';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { VisorService } from '@features/visor/core/services/visor.service';

@Component({
  selector: 'app-widget-tool-container',
  templateUrl: './widget-tool-container.component.html',
  styleUrls: ['./widget-tool-container.component.scss']
})
export class WidgetToolContainerComponent {
  visorService = inject(VisorService);
  mapActiveWidget = computed(() => this.visorService.mapActiveWidget());
  @Input() widget!: IWidget;
  @Input() toolContainer: string | null = null;

  constructor() {}

  public onClick() {
    this.visorService.toogleWidget$.next(this.widget);
  }

  public getDirection(position: any): string {
    switch (position.desktop.toLowerCase()) {
      case 'top-left':
      case 'top-right':
        return 'column';
      case 'header':
        return 'column';
      case 'bottom-left':
        return 'row';
      case 'bottom-right':
        return 'column-reverse';

      default: 
        return 'column'
    }
	}
}
