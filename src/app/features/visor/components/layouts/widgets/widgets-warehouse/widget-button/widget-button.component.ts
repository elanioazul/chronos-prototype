import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
} from '@angular/core';
import { widgetsIndex } from '@features/visor/core/consts/widgets-dictionary';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { ScreenSizeService } from '@features/visor/core/services/screen-size.service';
import { VisorService } from '@features/visor/core/services/visor.service';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-widget-button',
  templateUrl: './widget-button.component.html',
  styleUrls: ['./widget-button.component.scss'],
})
export class WidgetButtonComponent implements OnInit {
  visorService = inject(VisorService);
  screeSizeService = inject(ScreenSizeService);

  @Input() widget!: IWidget;
  @Input() toolContainer: string | null = null;
  mapActiveWidget = computed(() => this.visorService.mapActiveWidget());
  deviceSize = computed(() => this.screeSizeService.deviceSize());

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  container!: ViewContainerRef;

  newComponent!: ComponentRef<WidgetComponent>;

  widgetsDictionary = widgetsIndex;

  constructor() {}

  ngOnInit() {
    this.loadComponent();
  }

  public onClick() {
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
