import {
  Component,
  ComponentFactory,
  ComponentRef,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver, AfterViewInit
} from '@angular/core';
import {RouteAction, TcButtonsHelperService} from '@tibco-tcstk/tc-core-lib';
import {
  LiveAppsHomeCockpitComponent,
  Roles,
  RouteAccessControlConfigurationElement
} from '@tibco-tcstk/tc-liveapps-lib';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {MatDialog} from '@angular/material/dialog';
import {TcRolesService} from '@tibco-tcstk/tc-liveapps-lib';
import {SfContainerComponent} from './sf-container.component';


export interface sfDemo {
  location: string;
  display: string;
}

@Component({
  selector: 'app-home-cockpit',
  templateUrl: './home-cockpit.component.html',
  styleUrls: ['./home-cockpit-style.css']
})

export class HomeCockpitComponent extends LiveAppsHomeCockpitComponent implements OnInit, AfterViewInit {

  constructor(private resolver: ComponentFactoryResolver, protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, protected rolesService: TcRolesService) {
    super(buttonsHelper, dialog, rolesService);
    this.incRefreshButton = false;
  }

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The name of the logged user
   */
  @Input() userName: string;

  /**
   * The ID of the logged user
   */
  @Input() userId: string;

  /**
   * * NOT USED but is the email address of the user (comes from resolver)
   */
  @Input() email: string;

  /**
   * page title comes from config resolver
   */
  @Input() title: string;

  /**
   * Roles - The users current roles
   */
  @Input() roles: Roles;

  /**
   * RouteAccessControlConfig - basically the config for access control
   */
  @Input() access: RouteAccessControlConfigurationElement;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Enable legacy workitems
   */
  @Input() legacyWorkitems: boolean = this.legacyWorkitems ? this.legacyWorkitems : false;

  /**
   * Enable legacy creators
   */

  @Input() legacyCreators: boolean = this.legacyCreators ? this.legacyCreators : false;
  /**
   * ~event routeAction : Component requests route to another page
   * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  @ViewChild('spotfireContainer', {read: ViewContainerRef}) container;

  public componentRef: ComponentRef<SfContainerComponent>;

  public selectedMarking = '';

  public sfCustom = {
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
    showPageNavigation: false,
    showAnalysisInfo: false,
    showReloadAnalysis: false,
    showStatusBar: false,
    showToolBar: true,
    showUndoRedo: false
  };

  public sfServer = 'https://demo.spotfire.cloud.tibco.com';
  public sfAnalysis = '/Public/Sales and Marketing';

  public sfDemos: sfDemo[] = [
    {location: '/Public/Race Car', display: 'Race Car'},
    {location: '/Public/SDR Flights', display: 'Flights'},
    {location: '/Public/Airbnb Boston Listings', display: 'Airbnb Listings'},
    {location: '/Public/Oil Well Equipment Surveillance', display: 'Oil Well Equipment Surveillance'},
    {location: '/Public/Live Wikipedia Edits', display: 'Live Wikipedia Edits'},
    {location: '/Public/Dashboard - Telco X Campaign Analysis', display: 'Telco X Campaign Analysis'},
    {location: '/Public/COVID19 Insights', display: 'COVID19 Insights'},
    {location: '/Public/Expense Analyzer Dashboard', display: 'Expense Analyzer Dashboard'},
    {location: '/Public/Sales and Marketing', display: 'Sales and Marketing'},
    {location: '/Public/Delivery Routing', display: 'Delivery Routing'},
    {location: '/Public/Victoria Housing Market', display: 'Victoria Housing Market'},
    {location: '/Public/Trade Areas', display: 'Trade Areas'},
    {location: '/Public/Oil & Gas Production Overview', display: 'Oil & Gas Production Overview'},
    {location: '/Public/Visitor Ratings at SFO Airport', display: 'Visitor Ratings at SFO Airport'},
    {
      location: '/Public/SpotCoffee Demand Forecasting and Route Optimization',
      display: 'Coffee Demand Forecasting and Route Optimization'
    },
    {location: '/Public/California Drought Analysis - SFX', display: 'California Drought Analysis'},
    {location: '/Public/Price Elasticity of Grapes V14 - visuals 10', display: 'Price Elasticity of Grapes'}
  ];

  public sfMarkingOn = '*';
  public sfMarkingMaxRows = 1000;

  public sfCustomString = '';

  ngOnInit() {
    this.sfCustomString = JSON.stringify(this.sfCustom);
  }

  ngAfterViewInit() {
    this.upDateSFComponent();
  }

  upDateSFComponent() {
    if (this.container) {
      this.container.clear();
    }
    const factory: ComponentFactory<SfContainerComponent> = this.resolver.resolveComponentFactory(SfContainerComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.sfProps = this.sfCustom;
    this.componentRef.instance.sfServer = this.sfServer;
    this.componentRef.instance.sfAnalysis = this.sfAnalysis;
    this.componentRef.instance.sfMarkingOn = this.sfMarkingOn;
    this.componentRef.instance.sfMarkingMaxRows = this.sfMarkingMaxRows;
    this.sfCustomString = JSON.stringify(this.sfCustom);
    this.componentRef.instance.markingEvent.subscribe(event => {
      console.log('GOT', event);
      this.selectedMarking = JSON.stringify(event);

    });
  }

  selectionChanged(event) {
    console.log('CHANGE ', event);
    this.upDateSFComponent();
  }

  marking(event) {
    console.log(event);
  }

}
