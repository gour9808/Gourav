import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appVehicleService]'
})
export class VehicleServiceDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
