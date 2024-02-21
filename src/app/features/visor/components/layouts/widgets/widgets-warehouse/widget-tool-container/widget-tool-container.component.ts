import { Component, ElementRef, Input, Renderer2, ViewChild, computed, inject } from '@angular/core';
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

  @ViewChild('toolContainerButton', {
    static: true,
  })
  toolContainerButton!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.addWidgetToState();
    //this.setWidgetColor();
  }

  public onClick() {
    //TODO
    const nameActive = this.mapActiveWidget()?.key
    if (nameActive === 'tools' || nameActive === 'measurements' || nameActive === 'bookmarks') {
      console.log('aqui debería hacer que el active dejase de ser el tools el measurements o el bookmarks y cerrar todo lo relacionado a ellos');
      
    }
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

  // private setWidgetColor(): void {
  //   this.renderer.removeClass(
	// 		this.toolContainerButton.nativeElement,
	// 		"tool-container-button"
	// 	);
	// }
  private addWidgetToState() {
    this.visorService.addWidget$.next(this.widget);
	}
}
