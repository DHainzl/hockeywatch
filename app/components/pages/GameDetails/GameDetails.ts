import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import {  } from '../../../components/components';
import { GameReportService } from '../../../services/services';
import { TeamLogoPipe } from '../../../pipes/pipes';
import { GameReportResult } from '../../../models/models';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-game-details',
	directives: [ ],
	templateUrl: './app/components/pages/GameDetails/GameDetails.html',
	pipes: [ TeamLogoPipe ]
})
export class PageGameDetails {
	routeParams: RouteParams;
	gameReportService: GameReportService;

	divisionId: number;
	gameId: string;

	data: GameReportResult;
	loading: boolean = true;

	constructor(routeParams: RouteParams, gameReportService: GameReportService) {
		this.routeParams = routeParams;
		this.gameReportService = gameReportService;
	}

	ngOnInit () {
		this.divisionId = +this.routeParams.params['divisionId'];
		this.gameId = this.routeParams.params['gameId'];

		this.gameReportService.get(this.gameId)
			.subscribe(
				result => {
					this.data = result;
					this.loading = false;
				},
				error => console.error('Error!', error)
			);
	}
}