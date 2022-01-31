import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-program-terminal',
  templateUrl: './program-terminal.component.html',
  styleUrls: ['./program-terminal.component.css']
})
export class ProgramTerminalComponent implements OnInit {

  uniqKey:any;
  isgenrateFile:boolean=false;
  constructor() { }

  ngOnInit(): void {

  }

  genratekey(){
    this.uniqKey = Guid.create();
  }
  genrateFiles(){

  }
}
