import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

import { MainView } from './components/components';

bootstrap(MainView, [
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_BASE_HREF, { useValue: '/' })
]);