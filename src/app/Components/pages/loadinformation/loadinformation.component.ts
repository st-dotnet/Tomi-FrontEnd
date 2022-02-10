import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loadinformation',
  templateUrl: './loadinformation.component.html',
  styleUrls: ['./loadinformation.component.css']
})
export class LoadinformationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  open(content: any) {
  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',windowClass: 'modal-loadinfo' }).result.then((result) => {
      
    }, (reason) => {
    });
  }

}
