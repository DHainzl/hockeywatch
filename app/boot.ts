import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import { JSONP_PROVIDERS } from 'angular2/http';

import { MainView } from './components/components';
import {
	StandingsService,
	ScheduleService,
	TeamDetailsService
} from './services/services';

bootstrap(MainView, [
	StandingsService,
	ScheduleService,
	TeamDetailsService,

	JSONP_PROVIDERS,

	// Router
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_BASE_HREF, { useValue: '/' })
]);