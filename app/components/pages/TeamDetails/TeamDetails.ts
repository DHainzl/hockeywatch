import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { DivisionTeam, GameResults, Tabs, Tab } from '../../../components/components';
import { TeamDetailsService, ScheduleService } from '../../../services/services';
import { TeamLogoPipe, PlayerPortraitPipe, ReplaceAllPipe } from '../../../pipes/pipes';
import {
	TeamDetailsResult,
	ScheduleResult,
	ScheduleResultRow,
	TeamRosterEntry
} from '../../../models/models';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-team-details',
	directives: [DivisionTeam, GameResults, Tabs, Tab],
	templateUrl: './app/components/pages/TeamDetails/TeamDetails.html',
	pipes: [TeamLogoPipe, PlayerPortraitPipe, ReplaceAllPipe]
})
export class PageTeamDetails {
	routeParams: RouteParams;
	teamDetailsService: TeamDetailsService;
	scheduleService: ScheduleService;

	teamId: number;
	divisionId: number;
	divisionName: string;

	loading: boolean = true;
	scheduleLoading: boolean = true;

	data: TeamDetailsResult;
	squad: TeamRosterEntry[];
	fullPosition = {
		"G": "Goal",
		"D": "Defense",
		"F": "Forward"
	};

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
		config.divisions.all.forEach(division => {
			if (division.id == this.divisionId) {
				this.divisionName = division.title;
			}
		});

		this.reloadGamesList();

		this.teamDetailsService.get(this.divisionId, this.teamId)
			.subscribe(result => {
				let squadSorted: TeamRosterEntry[][] = [
						[], [], [], [], [], []
					],
					indices = {
						"G": 0, "D": 1, "F": 2,
						"G0": 3, "D0": 4, "F0": 5
					};

				this.data = result;

				this.data.data.teamRoster.forEach(player => {
					var key = player.position;
					if (player.playerJerseyNr == 0) {
						key += '0';
					}
					squadSorted[indices[key]].push(player);
				});

				this.squad = [];
				squadSorted.forEach(playerArr => {
					this.squad = this.squad.concat(playerArr);
				});

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