import { Extent } from 'ol/extent';
import { Projection } from 'ol/proj';

export interface IView {
	projection: Projection;
	extent?: Extent;
	enableRotation?: boolean;
	maxZoom?: number;
}