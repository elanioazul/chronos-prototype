import { ServiceType } from '../../types/ol-layer-service.types';
import { IReadService } from './service.interfaz';

export interface IExtendedReadService extends IReadService {
  type: ServiceType;
}
