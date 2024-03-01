import { Component, ComponentRef, Input, ViewChild, ViewContainerRef, computed, inject } from '@angular/core';
import { widgetsIndex } from '@features/visor/core/consts/widgets-dictionary';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
import { VisorService } from '@features/visor/core/services/visor.service';
@Component({
  selector: 'app-widget-dialog-floating',
  templateUrl: './widget-dialog-floating.component.html',
  styleUrls: ['./widget-dialog-floating.component.scss']
})
export class WidgetDialogFloatingComponent {
  visorService = inject(VisorService);
  mapActiveWidget = computed(() => this.visorService.mapActiveWidget());
  
  @Input() widget!: IWidget;
  @Input() toolContainer: string | null = null;

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  container!: ViewContainerRef;

  visible: boolean = false;

  newComponent!: ComponentRef<WidgetComponent>;

  widgetsDictionary = widgetsIndex;

  constructor() {}

  ngOnInit(): void {
    this.loadComponent();
  }

  showDialog(event: any) {
    this.visible = true;
    this.visorService.toogleWidget$.next(this.widget);
    this.newComponent.instance.onClick();
  }

  private async loadComponent() {
    if (this.widgetsDictionary[this.widget.key]) {
      this.container.clear();

      const componentInstance = await this.widget.widget();
      this.newComponent = this.container.createComponent(componentInstance);
      this.newComponent.instance.widget = this.widget;
      this.visorService.addWidget$.next(this.widget);
    }
  }
}
