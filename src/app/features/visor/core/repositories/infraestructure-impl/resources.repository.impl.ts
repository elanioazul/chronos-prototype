import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ResourcesService } from '../../../infraestructure/services/resources.service';
import { ResourcesRepository } from '../../../infraestructure/repositories/resources.repository';
import { IResourcesByRadioResDto } from '@features/visor/core/interfaces/dto/recurso.dto';

export class ResourcesRepositoryImpl implements ResourcesRepository {
  resourcesService = inject(ResourcesService);

  getResourcesByRadio(): Observable<IResourcesByRadioResDto> {
    return this.resourcesService.resourcesByRaadio$;
  }
}