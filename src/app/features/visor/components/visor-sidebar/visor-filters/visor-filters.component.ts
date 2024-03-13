import { Component, OnInit, computed, inject } from '@angular/core';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { TreeNode } from 'primeng/api/treenode';
import { resourceStyle, resourceInvisibleStyle } from '../../../../visor/core/utils/ol-styles';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

@Component({
  selector: 'app-visor-filters',
  templateUrl: './visor-filters.component.html',
  styleUrls: ['./visor-filters.component.scss']
})
export class VisorFiltersComponent implements OnInit {

  mapService = inject(MapService);

  recursosLyr = computed(() => this.mapService.recursosLyr());

  recursosSource!: VectorSource;
  features!: Feature<Geometry>[];

  NODEINSTANCE: TreeNode = {
    label: 'TIPORECURSO',
    children: []
  };
  treeNodes: TreeNode[] = [];
  selectedNodes: any;

  uniqueTIPORECURSOValues = new Set<string>();
  tipoRecursoVisibilityMap: Map<string, boolean> = new Map();

  constructor() {
    if (this.recursosLyr()[0].ol.getSource()?.getState() === 'ready')
    this.obtainResourcesSource()
  }

  obtainResourcesSource(): void {
    const layerSource = this.recursosLyr()[0].ol.getSource();
    if (layerSource && layerSource instanceof VectorSource) {
      this.recursosSource = layerSource;
    }
  }

  ngOnInit() {
    this.processFeatures();
    this.buildTreeNodes();
  }

  processFeatures(): void {
    this.features = this.recursosSource.getFeatures();
    this.features.forEach(feature => {
      const tipoRecurso = feature.get('TIPORECURSO');
      this.uniqueTIPORECURSOValues.add(tipoRecurso);
      this.tipoRecursoVisibilityMap.set(tipoRecurso, true);
    });
  }

  buildTreeNodes(): void {
    this.uniqueTIPORECURSOValues.forEach((value: string) => {
      if (this.NODEINSTANCE.children) {
        const childNode: TreeNode = {
          label: value,
          type: 'checkbox'
        };
        this.NODEINSTANCE.children.push(childNode);
      }
    });

    this.treeNodes.push(this.NODEINSTANCE);
    this.treeNodes.forEach((node: TreeNode) => {
      this.selectedNodes = [];
      this.selectedNodes.push(node);
      if (node.children) {
        node.children.forEach((node:TreeNode) => {
          this.selectedNodes.push(node);
        })
      }
    })
  }

  onCheckboxIsSelected(event: any, node: TreeNode) {
    this.tipoRecursoVisibilityMap.set(event.node.label, true);
    if (event.node.label === 'TIPORECURSO') {
      this.recursosLyr()[0].ol.setVisible(true)
      this.features.forEach(feature => {
        const tipoRecurso = feature.get('TIPORECURSO');
        this.tipoRecursoVisibilityMap.set(tipoRecurso, true);
        const isVisible = this.tipoRecursoVisibilityMap.get(tipoRecurso);
          feature.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
      });
    } else {
      this.updateFeatureVisibility(event.node.label);
    }
  }

  onCheckboxIsUnSelected(event: any, node: TreeNode): void {
    this.tipoRecursoVisibilityMap.set(event.node.label, false);
    if (event.node.label === 'TIPORECURSO') {
      this.recursosLyr()[0].ol.setVisible(false)
      this.features.forEach(feature => {
        const tipoRecurso = feature.get('TIPORECURSO');
        this.tipoRecursoVisibilityMap.set(tipoRecurso, false);
        const isVisible = this.tipoRecursoVisibilityMap.get(tipoRecurso);
          feature.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
      });
    } else {
      this.updateFeatureVisibility(event.node.label);
    }
  }

  updateFeatureVisibility(tipo: string): void {
    this.features.forEach(feat => {
      const tipoRecurso = feat.get('TIPORECURSO');
      const isVisible = this.tipoRecursoVisibilityMap.get(tipoRecurso);
      if (tipo === tipoRecurso) {
        feat.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
      }
    })
    if (this.recursosLyr()[0].ol.isVisible() == false) {
      this.recursosLyr()[0].ol.setVisible(true)
    }
  }


}
