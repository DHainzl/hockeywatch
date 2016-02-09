import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import {  } from '../../../components/components';
import {  } from '../../../services/services';
import { TeamLogoPipe } from '../../../pipes/pipes';
import {  } from '../../../models/models';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-game-details',
	directives: [ ],
	templateUrl: './app/components/pages/GameDetails/GameDetails.html',
	pipes: [ TeamLogoPipe ]
})
export class PageGameDetails {
	routeParams: RouteParams;

	gameId: number;

	loading: boolean = true;

	constructor(routeParams: RouteParams) {
		this.routeParams = routeParams;
	}

	ngOnInit () {
		this.gameId = this.routeParams.params['gameId'];
		this.loading = false;
	}
}