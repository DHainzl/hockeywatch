import { Component, View } from 'angular2/core';

import { StandingsService } from '../../../services/services';
import { StandingsResult } from '../../../models/models';

declare var config: any;		// I can't get any interface to work -_-

@Component({
	selector: 'page-home',
	directives: [ ],
	templateUrl: './app/components/pages/Home/Home.html'
})
export class PageHome {
	standingsService: StandingsService;
	standings: StandingsResult;

	loading: boolean = true;

	constructor (standingsService: StandingsService) {
		this.standingsService = standingsService;

		let division = config.divisions.ebel.division_201516.base;
		this.standings = this.standingsService.get(division);
		this.loading = false;
		/*
			.subscribe(
				result => this.standings = result,
				error => console.error('Error', error),
				() => console.log('Completed!')
			);
		*/
	}
}