import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements  OnChanges {

  @Input() areaSelected: string;
  @Output() jobSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  private services = ['Host', 'Tuttofore', 'Waitress', 'Dining room manager'];
  private kitchen = ['Chief', 'Sous CHef', 'Dishwasher', 'Cock'];
  positions = [];

  
  ngOnChanges() {

    if (this.areaSelected === "services") {
      this.positions = this.services;
    } else {
      this.positions = this.kitchen;
    }
    
  }

  selectedJob(job: any){
    //console.log(job);
    this.jobSelected.emit(job);
  }

}
