import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'sfcontainer',
  templateUrl: './sf-container.component.html',
})
export class SfContainerComponent {
  @Input() sfProps = {
    showAbout: false,
    showAnalysisInformationTool: false,
    showAuthor: false,
    showClose: false,
    showCustomizableHeader: false,
    showDodPanel: false,
    showExportFile: false,
    showExportVisualization: false,
    showFilterPanel: false,
    showHelp: true,
    showLogout: false,
    showPageNavigation: true,
    showAnalysisInfo: false,
    showReloadAnalysis: false,
    showStatusBar: false,
    showToolBar: false,
    showUndoRedo: false
  };

  @Input() sfServer;
  @Input() sfAnalysis;
  @Input() sfMarkingOn;
  @Input() sfMarkingMaxRows;

  @Output() outputMarking;
  @Output() markingEvent = new EventEmitter();

  marking(event){
    console.log('Marking: ' , event);
    this.outputMarking = event;
    this.markingEvent.emit(this.outputMarking);
  }

}
