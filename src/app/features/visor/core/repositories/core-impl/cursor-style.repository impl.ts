import { Observable } from 'rxjs';
import { CursorStyleService } from '../../services/cursor-style.service';
import { inject } from '@angular/core';
import { CursorStyleRepository } from '../cursor-style.repository';


export abstract class CursorStyleRepositoryImpl implements CursorStyleRepository {
    cursorStyleService = inject(CursorStyleService);

    getCursorStyle(): Observable<string> {
        return this.cursorStyleService.cursorStyle$;
      }
}