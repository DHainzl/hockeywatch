import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { DivisionTeam, GameResults } from '../../../components/components';
import { TeamDetailsService, ScheduleService } from '../../../services/services';
import { TeamLogoPipe, ReplaceAllPipe } from '../../../pipes/pipes';
import { TeamDetailsResult, ScheduleResult, ScheduleResultRow } from '../../../models/models';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-team-details',
	directives: [DivisionTeam, GameResults],
	templateUrl: './app/components/pages/TeamDetails/TeamDetails.html',
	pipes: [ TeamLogoPipe, ReplaceAllPipe ]
})
export class PageTeamDetails {
	routeParams: RouteParams;
	teamDetailsService: TeamDetailsService;
	scheduleService: ScheduleService;

	teamId: number;
	divisionId: number;

	loading: boolean = true;
	scheduleLoading: boolean = true;

	data: TeamDetailsResult;
	pastGames: ScheduleResultRow[];
	liveGames: ScheduleResultRow[];
	futureGames: ScheduleResultRow[];

	constructor(routeParams: RouteParams, teamDetailsService: TeamDetailsService, scheduleService: ScheduleService) {
		this.routeParams = routeParams;
		this.teamDetailsService = teamDetailsService;
		this.scheduleService = scheduleService;
	}

	ngOnInit () {
		this.teamId = +this.routeParams.params['teamId'];
		this.divisionId = +this.routeParams.params['divisionId'];

		this.reloadGamesList();

		this.teamDetailsService.get(this.divisionId, this.teamId)
			.subscribe(result => {
				this.data = result;
				this.loading = false;
			});
	}

	reloadGamesList() {
		let promises: Promise<ScheduleResult>[] = config.divisions.current.map(division => this.scheduleService.get(division.id).toPromise());

		Promise.all(promises)
			.then(results => {
				this.pastGames = [];
				this.liveGames = [];
				this.futureGames = [];

				results
					.forEach(result => {
						let rows: ScheduleResultRow[] = result.data.rows.filter(row => {
							return row.awayTeamId == this.teamId || row.homeTeamId == this.teamId;
						});

						this.pastGames = this.pastGames.concat(rows.filter(row => row.gameStatus > 1));
						this.liveGames = this.liveGames.concat(rows.filter(row => row.gameStatus == 1));
						this.futureGames = this.futureGames.concat(rows.filter(row => row.gameStatus == 0));
					});

				// Filtering;
				let lastGameDate: moment.Moment = moment.max(this.pastGames.map(row => moment(row.gameUtcTimestamp).startOf('day')));
				let nextGameDate: moment.Moment = moment.min(this.futureGames.map(row => moment(row.gameUtcTimestamp).startOf('day')));

				this.pastGames = this.pastGames.filter(row => moment(row.gameUtcTimestamp).isSame(lastGameDate, 'day'));
				this.futureGames = this.futureGames.filter(row => moment(row.gameUtcTimestamp).isSame(nextGameDate, 'day'));

				this.pastGames = this.pastGames.slice(0, 1);
				this.liveGames = this.liveGames.slice(0, 1);
				this.futureGames = this.futureGames.slice(0, 1);

				this.scheduleLoading = false;
			})
			.catch(error => console.error('Error', error));
	}
}