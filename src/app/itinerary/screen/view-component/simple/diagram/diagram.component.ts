import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.less']
})
export class DiagramComponent implements OnInit {
  @Input() unitTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

}
