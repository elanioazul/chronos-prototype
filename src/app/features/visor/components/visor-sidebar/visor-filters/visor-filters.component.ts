import { Component, OnInit, computed, inject } from '@angular/core';
import { MapService } from '@features/visor/core/services/map.service';
import VectorSource from 'ol/source/Vector';
import { TreeNode } from 'primeng/api/treenode';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { resourceStyle, resourceInvisibleStyle } from '../../../../visor/core/utils/ol-styles';

@Component({
  selector: 'app-visor-filters',
  templateUrl: './visor-filters.component.html',
  styleUrls: ['./visor-filters.component.scss']
})
export class VisorFiltersComponent implements OnInit {

  mapService = inject(MapService);

  recursosLyr = computed(() => this.mapService.recursosLyr());

  recursosSource!: VectorSource;

  NODEINSTANCE: TreeNode = {
    label: 'TIPORECURSO',  // Adjust the label as needed
    children: []  // Add any other properties as needed
  };
  treeNodes: TreeNode[] = [];
  selectedNodes: any;

  tipoRecursoVisibilityMap: Map<string, boolean> = new Map();

  constructor() {
    //console.log('sourceState' + this.recursosLyr()[0].ol.getSource()?.getState())
    const layerSource = this.recursosLyr()[0].ol.getSource();
    if (layerSource && layerSource instanceof VectorSource) {
      this.recursosSource = layerSource;
      // console.log('Layer source is a VectorSource.');
      // const features = layerSource.getFeatures()
      // console.log(features);
      // const format = layerSource.getFormat()
      // console.log(format);
      
      // const featuresCollection = layerSource.getFeaturesCollection()
      // console.log(featuresCollection);

      // const featuresWayTwo  = layerSource.getFormat()?.readFeatures(layerSource);
      // console.log('GeoJSON Features:', featuresWayTwo);
      
    }
  }

  ngOnInit() {
    const features = this.recursosSource.getFeatures();

    const uniqueTIPORECURSOValues = new Set<string>();
    features.forEach(feature => {
      const tipoRecurso = feature.get('TIPORECURSO');
      uniqueTIPORECURSOValues.add(tipoRecurso);
      this.tipoRecursoVisibilityMap.set(tipoRecurso, true);
      feature.set('resourceStyle', resourceStyle)
    });

    uniqueTIPORECURSOValues.forEach((value: string) => {
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
    this.tipoRecursoVisibilityMap.set(event.node.label, true)
    this.updateFeatureVisibility(event.node.label);
  }

  onCheckboxIsUnSelected(event: any, node: TreeNode): void {
    this.tipoRecursoVisibilityMap.set(event.node.label, false)
    this.updateFeatureVisibility(event.node.label);
  }

  updateFeatureVisibility(tipo: string): void {
    const features = this.recursosSource.getFeatures();
    features.forEach(feat => {
      const tipoRecurso = feat.get('TIPORECURSO');
      const isVisible = this.tipoRecursoVisibilityMap.get(tipoRecurso);
      // if (isVisible) {
      //   feat.setStyle(new Style({}))
      // } else {
      //   feat.setStyle(this.resourceInvisibleStyle);
      // }
      if (tipo === tipoRecurso) {
        //feat.setStyle(isVisible ? feat.getStyle() : resourceInvisibleStyle);
        feat.setStyle(isVisible ? resourceStyle : resourceInvisibleStyle);
      }
      //feat.setStyle(isVisible ? feat.getStyle() : this.resourceInvisibleStyle);
    })
  }

  // makeInvisible(feature: any): void {
  //   feature.setStyle(this.resourceInvisibleStyle);
  // }

  // makeVisivle(feature: any): void {
  //   feature.setStyle();
  // }

}
