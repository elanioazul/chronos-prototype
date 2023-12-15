import { Observable } from 'rxjs';
import { IResourcesByRadioResDto } from '../../core/interfaces/dto/recurso.dto';

export abstract class ResourcesRepository {
  abstract getResourcesByRadio(): Observable<IResourcesByRadioResDto>;
}