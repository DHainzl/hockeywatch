import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import { HTTP_PROVIDERS, Jsonp } from 'angular2/http';

import { MainView } from './components/components';
import { StandingsService } from './services/services';

bootstrap(MainView, [
	StandingsService,

	HTTP_PROVIDERS, Jsonp,

	// Router
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_BASE_HREF, { useValue: '/' })
]);