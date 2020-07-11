import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import {RelationService} from './relation.service';
import {Relation} from './relation.model';
import {Unit} from './utilsDiagram/unit';
import {LineSvg} from './svg.model';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.less']
})
export class DiagramComponent implements OnInit {
  @Input() unitTitle: string;
  diagramLoaded = false;
  relations: Relation[];
  errorMessage: string;
  unit: Unit;

  constructor(
    private relationService: RelationService,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.diagramLoaded){
      this.formatDiagram();
    }
  }

  ngOnInit(): void {
   this.getUnitRelations();
  }

  getUnitRelations() {
    this.relationService.getUnitRelations(this.unitTitle).subscribe(
      (relations) => {
        this.printDiagram(relations);
      },
      () => {
        this.errorMessage = 'Hubo algún problema al cargar el diagrama de la unidad: ' + this.unitTitle;
      }
    );
  }

  printDiagram(relations) {
    this.relations = relations;
    this.unit = new Unit(this.unitTitle, this.relations);
    this.diagramLoaded = true;
    this.cdr.detectChanges();
    this.formatDiagram();
  }

  changeCentralClass(unit): void {
    this.diagramLoaded = false;
    this.unitTitle = unit;
    this.getUnitRelations();
  }

  formatDiagram(): void {
    this.initSvg();
    this.createSvg();
    const wholes = this.el.nativeElement.querySelector('#wholes');
    const bases = this.el.nativeElement.querySelector('#bases');
    const classDiagram = this.el.nativeElement.querySelector('#classDiagram');
    const parts = this.el.nativeElement.querySelector('#parts');
    const derivatives = this.el.nativeElement.querySelector('#derivatives');
    const aggregates = this.el.nativeElement.querySelector('#aggregates');
    const elements = this.el.nativeElement.querySelector('#elements');
    const used = this.el.nativeElement.querySelector('#used');
    const usedBy = this.el.nativeElement.querySelector('#usedBy');

    this.centerBox(bases || wholes || elements, classDiagram, derivatives || parts || aggregates);
    this.setVerticalLine(false, wholes, bases, elements, usedBy);
    this.setVerticalLine(true, derivatives, parts, aggregates, used);

    this.linkLateralBoxes(classDiagram, usedBy, used);
    this.linkCenterClasses(bases || wholes || elements, derivatives || parts || aggregates, classDiagram);
    if ((bases && (wholes || elements)) || (!bases && wholes && elements)){
      this.linkBottomUpperRightClasses(true, classDiagram, bases ? wholes : null, elements);
    }

    if ((derivatives && (parts || aggregates)) || (!derivatives && parts && aggregates)){
      this.linkBottomUpperRightClasses(false, classDiagram, derivatives ? parts : null, aggregates);
    }
  }

  createSvg(){
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'diagram-lines';
    this.renderer.appendChild(this.el.nativeElement, svg);
  }

  initSvg(){
    const svg = this.el.nativeElement.querySelector('#diagram-lines');
    if (svg){
      this.renderer.removeChild(this.el.nativeElement, svg);
    }
  }

  centerBox(...boxes){
    const filterBoxes = boxes.filter(box => box !== null);
    const boxesInfo = [];
    let maxCenter = 0;
    filterBoxes.forEach((box) => {
      box.style.paddingLeft = '0';
      const center = this.getCenterPosition(box);
      boxesInfo.push({
        box,
        center
      });
      maxCenter = maxCenter > center ? maxCenter : center;
    });

    boxesInfo.forEach((boxInfo) => {
      if (boxInfo.center < maxCenter){
        this.addLeftPadding(boxInfo.box, maxCenter - boxInfo.center);
      }
    });
  }

  getCenterPosition(box: any): number{
    return box.offsetLeft + box.offsetWidth / 2;
  }

  addLeftPadding(box: any, padding: number){
    box.style.paddingLeft = Math.ceil(padding) + 'px';
  }

  setVerticalLine(up: boolean, ...boxes){
    const filterBoxes = boxes.filter(box => box !== null);
    filterBoxes.forEach((box) => {
      const classes = box.children;
      if (box.children.length > 1 || this.isLateralBox(box)){
        for (const clazz of classes) {
          const line: LineSvg = {
            x1: Math.ceil(this.getCenterPosition(clazz)),
            x2: Math.ceil(this.getCenterPosition(clazz)),
            y1: Math.ceil(up ? clazz.offsetTop - 30 : clazz.offsetTop + clazz.offsetHeight),
            y2: Math.ceil(up ? clazz.offsetTop : clazz.offsetTop + clazz.offsetHeight + 30)
          };
          this.createLine(line);
          if ((!this.isLateralBox(box) && !up) || (this.isLateralBox(box) && up)){
              this.createRelation(line, box);
          }
        }
        if (!this.isLateralBox(box)){
          this.setHorizontalLine(classes[0], classes[classes.length - 1], up);
        }
      }
    });
  }

  isLateralBox(box: any): boolean{
    return box.id === 'used' || box.id === 'usedBy';
  }

  setHorizontalLine(firstClass, lastClass, up: boolean){
    const line: LineSvg = {
      x1: Math.ceil(this.getCenterPosition(firstClass) - 1),
      x2: Math.ceil(this.getCenterPosition(lastClass) + 1),
      y1: Math.ceil(up ? firstClass.offsetTop - 30 : firstClass.offsetHeight + firstClass.offsetTop + 30),
      y2: Math.ceil(up ? firstClass.offsetTop - 30 : firstClass.offsetHeight + firstClass.offsetTop + 30)
    };
    this.createLine(line);
  }

  createLine(line: LineSvg){
    const svg = this.el.nativeElement.querySelector('#diagram-lines');
    const lineNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineNode.setAttributeNS(null, 'x1', line.x1 + 'px');
    lineNode.setAttributeNS(null, 'y1', line.y1 + 'px');
    lineNode.setAttributeNS(null, 'x2', line.x2 + 'px');
    lineNode.setAttributeNS(null, 'y2', line.y2 + 'px');
    this.renderer.appendChild(svg, lineNode);
  }

  createRelation(origin: LineSvg, box: any){
    switch (box.id) {
      case 'bases':
      case 'derivatives':
        this.createTriangle(origin);
        break;
      case 'aggregates':
      case 'elements':
        this.createDiamond(origin, 'aggregation');
        break;
      case 'wholes':
      case 'parts':
        this.createDiamond(origin, 'composition');
        break;
      case 'used':
        this.createAngle(origin, false);
        break;
      case 'usedBy':
        this.createAngle(origin, true);
    }
  }

  createTriangle(origin: LineSvg){
    const svg = this.el.nativeElement.querySelector('#diagram-lines');
    const triangleNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const upperPoint = origin.x1 + ',' + origin.y1;
    const leftPoint = (origin.x1 - 8) + ',' + (origin.y1 + 20);
    const rightPoint = (origin.x1 + 8) + ',' + (origin.y1 + 20);
    triangleNode.classList.add('inheritance');
    triangleNode.setAttributeNS(null, 'points', `${upperPoint} ${rightPoint} ${leftPoint}`);
    this.renderer.appendChild(svg, triangleNode);
  }

  createDiamond(origin: LineSvg, style: string){
    const svg = this.el.nativeElement.querySelector('#diagram-lines');
    const diamondNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const upperPoint = origin.x1 + ',' + origin.y1;
    const leftPoint = (origin.x1 - 6) + ',' + (origin.y1 + 10);
    const rightPoint = (origin.x1 + 6) + ',' + (origin.y1 + 10);
    const bottomPoint = origin.x1 + ',' + (origin.y1 + 20);
    diamondNode.classList.add(style);
    diamondNode.setAttributeNS(null, 'points', `${upperPoint} ${rightPoint} ${bottomPoint} ${leftPoint}`);
    this.renderer.appendChild(svg, diamondNode);
  }

  createAngle(origin: LineSvg, rotate: boolean){
    const lineLeft: LineSvg = {
      x1 : origin.x1,
      x2: rotate ? origin.x1 - 10 : origin.x1 - 6,
      y1: origin.y2,
      y2: rotate ? origin.y2 - 6 : origin.y2 - 10,
    };
    this.createLine(lineLeft);
    const lineRight = lineLeft;
    if (rotate){
      lineRight.y2 += 12;
    }else{
      lineRight.x2 += 12;
    }
    this.createLine(lineRight);
  }

  linkCenterClasses(upperClasses, bottomClasses, classDiagram){
    const line: LineSvg = { x1: 0, x2: 0, y1: 0, y2: 0 };
    line.x1 = Math.ceil(this.getCenterPosition(classDiagram.children[0]));
    line.x2 = Math.ceil(this.getCenterPosition(classDiagram.children[0]));
    if (upperClasses){
      const y1 = upperClasses.children[0].offsetHeight + upperClasses.children[0].offsetTop;
      line.y1 = Math.ceil(upperClasses.children.length > 1 ? y1 + 30 : y1);
      line.y2 = Math.ceil(classDiagram.children[0].offsetTop);
      this.createLine(line);
      if (upperClasses.children.length === 1) {
        this.createRelation(line, upperClasses);
      }
    }
    if (bottomClasses){
      const y2 = bottomClasses.children[0].offsetTop;
      line.y1 = Math.ceil(classDiagram.children[0].offsetHeight + classDiagram.children[0].offsetTop);
      line.y2 = Math.ceil(bottomClasses.children.length > 1 ? y2 - 30 : y2);
      this.createLine(line);
      this.createRelation(line, bottomClasses);
    }
  }

  linkBottomUpperRightClasses(upper: boolean, classDiagram: any, ...boxes){
    const filterBoxes = boxes.filter(box => box !== null);
    filterBoxes.forEach((box, index) => {
      const verticalLine: LineSvg = { x1: 0, x2: 0, y1: 0, y2: 0 };
      const horizontalLine: LineSvg = { x1: 0, x2: 0, y1: 0, y2: 0 };
      verticalLine.y1 = upper ? box.children[0].offsetHeight + box.children[0].offsetTop : box.children[0].offsetTop;
      verticalLine.y1 = box.children.length > 1 ? verticalLine.y1 + (upper ? 30 : -30) : verticalLine.y1;
      horizontalLine.x2 = verticalLine.x1 = verticalLine.x2 =  this.getCenterPosition(box.children.length > 1 ? box : box.children[0]);
      if (upper){
        verticalLine.y2 = box.children[0].offsetHeight + box.children[0].offsetTop + 35 + 15 * (index + 1);
      }else{
        verticalLine.y2 = box.children[0].offsetTop - (35 + 15 * (index + 1));
      }
      this.createLine(verticalLine);
      if (upper && box.children.length === 1) {
        this.createRelation(verticalLine, box);
      }
      horizontalLine.y1 = horizontalLine.y2 = verticalLine.y1 = verticalLine.y2;
      verticalLine.y1 = classDiagram.children[0].offsetTop + (upper ? 0 : classDiagram.children[0].offsetHeight);
      verticalLine.x1 = classDiagram.children[0].offsetWidth + classDiagram.children[0].offsetLeft - 40 + (index * 30);
      verticalLine.x2 = horizontalLine.x1 = verticalLine.x1;
      this.createLine(verticalLine);
      if (!upper){
        this.createRelation(verticalLine, box);
      }
      horizontalLine.x1--;
      horizontalLine.x2++;
      this.createLine(horizontalLine);
    });
  }

  linkLateralBoxes(classDiagram: any, ...boxes){
    const filterBoxes = boxes.filter(box => box !== null);
    filterBoxes.forEach((box) => {
      const TopDirection = box.id === 'used';
      const horizontalLine: LineSvg = { x1: 0, x2: 0, y1: 0, y2: 0 };
      horizontalLine.y1 = box.children[0].offsetTop + (TopDirection ? -30 : box.children[0].offsetHeight + 30);
      horizontalLine.y2 = horizontalLine.y1;
      if (TopDirection){
        horizontalLine.x2 = this.getCenterPosition(box.children[box.children.length - 1]);
        horizontalLine.x1 = classDiagram.children[0].offsetWidth + classDiagram.children[0].offsetLeft;
        this.createLine(horizontalLine);
      }else{
        horizontalLine.x2 = this.getCenterPosition(box.children[0]);
        horizontalLine.x1 = classDiagram.children[0].offsetLeft;
        this.createLine(horizontalLine);
        this.createRelation(horizontalLine, box);
      }
    });
  }
}
