import { Component, View } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet, Router } from 'angular2/router';

import {
	PageHome,
	PageTeams,
	PageGames,
	PageSettings
} from '../pages/pages';

@Component({
	selector: 'hockeywatch',
	directives: [ RouterLink, RouterOutlet ],
	templateUrl: './app/components/MainView/MainView.html'
})
@RouteConfig([
	{ path: '/home', component: PageHome, as: 'Home' },
	{ path: '/teams', component: PageTeams, as: 'Teams' },
	{ path: '/games', component: PageGames, as: 'Games' },
	{ path: '/settings', component: PageSettings, as: 'Settings' },
	{ path: '/', redirectTo: [ './Home' ] }
])
export class MainView {
	routeActive(route: string) : boolean {
		let match = location.hash.match(/\/([^\/]+)\/?/);
		return match && match[1] == route;
	}
}