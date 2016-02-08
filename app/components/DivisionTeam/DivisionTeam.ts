import { Component, Input } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { StandingsService } from '../../services/services';
import { StandingsResultRow } from '../../models/models';

import { TeamLogoPipe } from '../../pipes/pipes';

@Component({
	selector: 'division-team',
	directives: [ RouterLink ],
	templateUrl: './app/components/DivisionTeam/DivisionTeam.html',
	pipes: [TeamLogoPipe]
})
export class DivisionTeam {
	private standingsService: StandingsService;

	@Input("divisionId") divisionId: number;
	@Input("divisionTitle") divisionTitle: string;

	teams: StandingsResultRow[] = [];


	constructor (standingsService: StandingsService) {
		this.standingsService = standingsService;
	}

	ngOnInit() {
		this.standingsService.get(this.divisionId).subscribe(
			result => this.teams = result.data.rows,
			error => console.log('Error!', error)
		);
	}
}