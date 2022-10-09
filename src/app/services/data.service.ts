import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataObs$ = new Subject();
  
  constructor() { }

    getData() {
        return this.dataObs$;
    }

    updateData(data: boolean) {
        this.dataObs$.next(data);
    }
}
