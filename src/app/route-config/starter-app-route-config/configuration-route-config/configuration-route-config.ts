import {
  GeneralConfigResolver,
  TibcoCloudSettingsGeneralComponent,
  TibcoCloudSettingLandingComponent,
  GeneralLandingPageConfigResolver
} from '@tibco-tcstk/tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver,
  LaConfigResolver,
  LiveAppsSettingsComponent,
  LiveAppsSettingsRecentCasesComponent,
  LiveAppsSettingsRolesComponent,
  LiveAppsSettingsSummaryCardsComponent,
  AccessControlConfigurationResolver,
  LiveAppsSettingsAccessControlComponent,
  LiveAppsSettingsFormsComponent,
  LiveAppsSettingsLandingComponent, RoleActiveResolver,AuthGuard
} from '@tibco-tcstk/tc-liveapps-lib';
import {SettingsSpotfireComponent, SpotfireConfigResolver} from "@tibco-tcstk/tc-spotfire-lib";
import {SplashComponent} from "../../../routes/splash/splash.component";

export const CONFIGURATION_ROUTE_CONFIG = [
  {
    path: 'splash',
    component: SplashComponent,
    canActivate: [AuthGuard],
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      activeRoleHolder: RoleActiveResolver,
      landingPages: GeneralLandingPageConfigResolver
    }
  },
  {
    path: 'general-application-settings',
    component: TibcoCloudSettingsGeneralComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver
    }
  },
  {
    path: 'general-application-roles',
    component: LiveAppsSettingsRolesComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver,
      allRoles: AllRolesResolver,
      allGroups: AllGroupsResolver
    }
  },
  {
    path: 'general-application-landing-page',
    component: LiveAppsSettingsLandingComponent,
    resolve: {
      landingPagesConfigHolder: GeneralLandingPageConfigResolver,
      claims: ClaimsResolver,
      allRolesHolder: AllRolesResolver
    }
  },
  {
    path: 'general-application-access-control',
    component: LiveAppsSettingsAccessControlComponent,
    resolve: {
      claims: ClaimsResolver,
      accessControlConfigHolder: AccessControlConfigurationResolver,
      allRoles: AllRolesResolver
    }
  },
  {
    path: 'live-apps-app-selection',
    component: LiveAppsSettingsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-recent-cases',
    component: LiveAppsSettingsRecentCasesComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-summary-cards',
    component: LiveAppsSettingsSummaryCardsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-forms',
    component: LiveAppsSettingsFormsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },{
    path: 'spotfire-settings',
    component: SettingsSpotfireComponent,
    resolve: {
      spotfireConfigHolder: SpotfireConfigResolver,
      claimsHolder: ClaimsResolver
    }
  },
  {
    path: '', redirectTo: '/starterApp/configuration/general-application-settings', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/starterApp/configuration/general-application-settings'
  }
];

export const CONFIGURATION_ROUTE_PROVIDERS = [
  GeneralConfigResolver,
  RoleActiveResolver,
  ClaimsResolver,
  AllRolesResolver,
  AllGroupsResolver,
  GeneralLandingPageConfigResolver,
  AccessControlConfigurationResolver,
  SpotfireConfigResolver
]
