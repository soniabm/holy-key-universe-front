import {Component, Input, OnInit} from '@angular/core';
import {RelationService} from './relation.service';
import {Relation} from './relation.model';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.less']
})
export class DiagramComponent implements OnInit {
  @Input() unitTitle: string;
  relations: Relation[];
  errorMessage: string;

  constructor(private relationService: RelationService) { }

  ngOnInit(): void {
    this.relationService.getUnitRelations(this.unitTitle).subscribe(
      (relations) => {
        this.relations = relations;
      },
      () => {
        this.errorMessage = 'Hubo algún problema al cargar el diagrama de la unidad: ' + this.unitTitle;
      }
    );
  }

}
