import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { visorTabsConfig } from '@features/visor/core/consts/visor-sidebar-tabs-config';
import { SidebarService } from '@features/visor/core/services/sidebar.service';
import { MessageService } from 'primeng/api';
import { VisorSidebarTabNoTemplateComponent } from '../visor-sidebar-tab-no-template/visor-sidebar-tab-no-template.component';
import { VisorSidebarTabComponent } from '../visor-sidebar-tab/visor-sidebar-tab.component';
import { ISidebarTab } from '@core/interfaces/sidebar/sidebar-tab.interfaz';
@Component({
  selector: 'app-visor-sidebar',
  templateUrl: './visor-sidebar.component.html',
  styleUrls: ['./visor-sidebar.component.scss'],
})
export class VisorSidebarComponent implements AfterViewInit {
  sidebar = inject(SidebarService);
  messageService = inject(MessageService);

  visorTabsConfig = visorTabsConfig;

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  container!: ViewContainerRef;

  @ViewChild('sidebar') sidebarDiv!: ElementRef<HTMLElement>;

  divSidebar?: any;

  constructor() {}

  emptyTemplateTabsOptionsByType = (type: string) => {
    switch (type) {
      case 'routebyclicks':
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab-no-template/visor-sidebar-tab-no-template.component'
            ).then((m) => m.VisorSidebarTabNoTemplateComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
      default:
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab-no-template/visor-sidebar-tab-no-template.component'
            ).then((m) => m.VisorSidebarTabNoTemplateComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
    }
  };

  templateTabsOptionsByType = (type: string) => {
    switch (type) {
      case 'layers':
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab/visor-sidebar-tab.component'
            ).then((m) => m.VisorSidebarTabComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
      case 'routes':
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab/visor-sidebar-tab.component'
            ).then((m) => m.VisorSidebarTabComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
      case 'info':
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab/visor-sidebar-tab.component'
            ).then((m) => m.VisorSidebarTabComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
      case 'searchbycoord':
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab/visor-sidebar-tab.component'
            ).then((m) => m.VisorSidebarTabComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
      default:
        return {
          component: () =>
            import(
              '@features/visor/components/visor-sidebar-tab/visor-sidebar-tab.component'
            ).then((m) => m.VisorSidebarTabComponent),
          inputs: visorTabsConfig.find((item) => item['id'] === type)!,
        };
    }
  };

  updateSidebar(): void {
    const element = this.sidebarDiv.nativeElement;
    this.divSidebar = element;
    this.sidebar.updateSidebarNode(this.divSidebar);
  }

  ngAfterViewInit(): void {
    this.updateSidebar();
  }

  onSelectTab(tab: any): void {
    const tabConfig = this.visorTabsConfig.find(
      (config: ISidebarTab) => config.id === tab
    );
    if (!tabConfig?.openableSidebarNeeded) {
      this.container.clear();
      this.createDynamicNoTemplateTab(tab);
    } else {
      this.createDynamicSidebarTab(tab);
    }
  }

  private async createDynamicSidebarTab(type: string) {
    this.clearToasts();

    this.container.clear();
    const { component, inputs } = this.templateTabsOptionsByType(type);

    const componentInstance = await component();
    const componentRef: ComponentRef<VisorSidebarTabComponent> =
      this.container.createComponent(componentInstance);
    this.updateSidebar();
    componentRef.instance.configOptions = inputs;
    componentRef.instance.messageEvent.subscribe((data: any) => {
      console.log(data);
    });
  }

  private async createDynamicNoTemplateTab(type: string) {
    this.clearToasts();

    this.container.clear();
    const { component, inputs } = this.emptyTemplateTabsOptionsByType(type);

    this.showToastMessage(inputs.toasterMessage);

    const componentInstance = await component();
    const componentRef: ComponentRef<VisorSidebarTabNoTemplateComponent> =
      this.container.createComponent(componentInstance);
    this.updateSidebar();
    componentRef.instance.configOptions = inputs;
    // componentRef.instance.messageEvent.subscribe((data:any)=>{
    //   console.log(data);
    // })
  }

  private showToastMessage(message?: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  private clearToasts() {
    this.messageService.clear();
  }
}
