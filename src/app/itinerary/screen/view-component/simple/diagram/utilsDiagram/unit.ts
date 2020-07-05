import {Relation, RELATION_TYPE} from '../relation.model';

export class Unit {
  name: string;
  bases: string[] = [];
  derivatives: string[] = [];
  parts: string[] = [];
  wholes: string[] = [];
  elements: string[] = [];
  aggregates: string[] = [];
  useds: string[] = [];
  usedsBy: string[] = [];

  constructor(title: string, relations: Relation[]) {
    this.name = title;
    relations.forEach(relation => {
      relation.unitFrom === this.name ? this.setAfferents(relation) : this.setEfferents(relation);
    });
  }

  setAfferents(relation) {
    switch (relation.type) {
      case RELATION_TYPE.INHERITANCE:
        this.derivatives.push(relation.unitTo);
        break;
      case RELATION_TYPE.COMPOSITION:
        this.parts.push(relation.unitTo);
        break;
      case RELATION_TYPE.AGGREGATION:
        this.aggregates.push(relation.unitTo);
        break;
      case RELATION_TYPE.USE:
        this.useds.push(relation.unitTo);
    }
  }

  setEfferents(relation) {
    switch (relation.type) {
      case RELATION_TYPE.INHERITANCE:
        this.bases.push(relation.unitTo);
        break;
      case RELATION_TYPE.COMPOSITION:
        this.wholes.push(relation.unitTo);
        break;
      case RELATION_TYPE.AGGREGATION:
        this.elements.push(relation.unitTo);
        break;
      case RELATION_TYPE.USE:
        this.usedsBy.push(relation.unitTo);
    }
  }

  getName() {
    return this.name;
  }

}
