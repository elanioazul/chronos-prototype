import { Observable } from 'rxjs';


export abstract class CursorStyleRepository {
 abstract getCursorStyle(): Observable<string>;
}