import { Component, View } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet, Router } from 'angular2/router';

@Component({
  
})
@View({
  template: `<h1>Hello from a public route</h1>`
})
class PublicRoute {
	constructor() {
		console.log('Starting Public Route');
	}
}

@Component({
  
})
@View({
  template: `<h1>Hello from private route</h1>`
})
class PrivateRoute {
	constructor () {
		console.log('Starting Private Route');
	}
}

@Component({
	selector: 'hockeywatch',
	directives: [ RouterLink, RouterOutlet ],
	templateUrl: './app/components/MainView/MainView.html'
})
@RouteConfig([
	{ path: '/public-route', component: PublicRoute, as: 'PublicRoute' },
	{ path: '/private-route', component: PrivateRoute },
	{ path: '/', redirectTo: [ './PublicRoute' ] }
])
export class MainView {
	hasRoute(route: string) : boolean {
		return location.hash.substr(1) == route;
	}

	publicRouteActive() : boolean {
		return this.hasRoute('/public-route');
	}

	privateRouteActive() : boolean {
		return this.hasRoute('/private-route');
	}
}