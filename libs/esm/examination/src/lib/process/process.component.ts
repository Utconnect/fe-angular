import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  ConnectorModel,
  DiagramComponent,
  DiagramConstraints,
  DiagramModule,
  NodeModel,
  SnapConstraints,
  SnapSettingsModel,
} from '@syncfusion/ej2-angular-diagrams';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';
import { map, Observable } from 'rxjs';
import { ExaminationProcessStore } from './process.store';

export const TAIGA_UI = [TuiIslandModule, TuiProgressModule];

@Component({
  selector: 'esm-examination-process',
  templateUrl: './process.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DiagramModule, LetModule, ...TAIGA_UI],
  providers: [ExaminationProcessStore],
})
export class EsmExaminationProcessComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationProcessStore);

  // VIEWCHILD
  @ViewChild('diagram')
  public diagram?: DiagramComponent;

  // PUBLIC PROPERTIES
  startDate = new Date(2023, 5, 1);
  endDate = new Date(2023, 5, 30);
  modulesCount = 100;
  subjectsCount = 1000;
  candidatesCount = 10000;
  invigilatorsCount = 1000;
  readonly status$ = this.store.status$;
  readonly constraints = DiagramConstraints.Zoom;
  readonly snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.All & ~SnapConstraints.ShowLines,
  };
  readonly diagramData$: Observable<{
    nodes: NodeModel[];
    connectors: ConnectorModel[];
  }>;

  // PRIVATE PROPERTIES
  readonly events$ = this.store.data$;

  // CONSTRUCTOR
  constructor() {
    this.diagramData$ = this.events$.pipe(
      map(() =>
        [].reduce(
          (acc, curr, i) => {
            acc.nodes.push({
              id: `node${i}`,
              offsetY: 20,
              offsetX: 70 * i,
              // annotations: [{ id: `label${i}`, content: `${curr.status}` }],
            });
            if (i > 0) {
              acc.connectors.push({
                id: `connector${i - 1}${i + 1}`,
                sourceID: `node${i - 1}`,
                targetID: `node${i}`,
              });
            }
            return acc;
          },
          {
            nodes: [] as NodeModel[],
            connectors: [] as ConnectorModel[],
          },
        ),
      ),
    );
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getEvents();
  }

  // PUBLIC METHODS
  created(): void {
    this.diagram?.fitToPage();
  }

  readonly getNodeDefaults: (node: NodeModel) => NodeModel = (node) => {
    if (node.style) {
      node.style.strokeColor = 'var(--tui-neutral-fill)';
    }
    return node;
  };

  getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';

    if (connector.style)
      connector.style.strokeColor = 'var(--tui-neutral-fill)';
    if (connector.sourceDecorator?.style) {
      connector.sourceDecorator.style.strokeColor = 'var(--tui-neutral-fill)';
      connector.sourceDecorator.style.fill = 'var(--tui-neutral-fill)';
    }
    if (connector.targetDecorator?.style) {
      connector.targetDecorator.style.strokeColor = 'var(--tui-neutral-fill)';
      connector.targetDecorator.style.fill = 'var(--tui-neutral-fill)';
    }

    return connector;
  }
}
