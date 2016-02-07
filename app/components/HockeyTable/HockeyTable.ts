import { Component, Input } from 'angular2/core';

import { StandingsResult } from '../../models/models';
import { StandingsService } from '../../services/services';

import { TeamLogoPipe } from '../../pipes/pipes';

@Component({
	selector: 'hockey-table',
	templateUrl: './app/components/HockeyTable/HockeyTable.html',
	pipes: [ TeamLogoPipe ]
})
export class HockeyTable {
	standingsService: StandingsService;

	@Input("divisionId") divisionId: number;

	loading: boolean = true;
	data: StandingsResult;

	constructor (standingsService: StandingsService) {
		this.standingsService = standingsService;
	}

	ngOnInit() {
		this.standingsService.get(this.divisionId)
			.subscribe(
				result => {
					this.data = result;
					this.loading = false;
				},
				error => console.log('Error! ', error)
			);
	}
}