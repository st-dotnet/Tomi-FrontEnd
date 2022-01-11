import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-workloads',
  templateUrl: './workloads.component.html',
  styleUrls: ['./workloads.component.css']
})
export class WorkloadsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  active:any;

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }

}
