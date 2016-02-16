import { Component, View } from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { HockeyTable, GameResults } from '../../components';
import { ScheduleService } from '../../../services/services';
import { ScheduleResult, ScheduleResultRow } from '../../../models/models';
import { TeamLogoPipe } from '../../../pipes/pipes';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-home',
	directives: [ HockeyTable, GameResults ],
	templateUrl: './app/components/pages/Home/Home.html',
	pipes: [TeamLogoPipe]
})
export class PageHome {
	scheduleService: ScheduleService;
	scheduleLoading: boolean = true;
	scheduleLastRefresh: moment.Moment;

	pastGames: ScheduleResultRow[] = [];
	liveGames: ScheduleResultRow[] = [];
	futureGames: ScheduleResultRow[] = [];

	divisions = config.divisions.current;

	constructor (scheduleService: ScheduleService) {
		this.scheduleService = scheduleService;

		this.reloadGamesList();
	}

	reloadGamesList () {
		let promises: Promise<ScheduleResult>[] = config.divisions.current.map(division => this.scheduleService.get(division.id).toPromise());

		Promise.all(promises)
			.then(results => {
				this.pastGames = [];
				this.liveGames = [];
				this.futureGames = [];

				results.forEach(result => {
					this.pastGames = this.pastGames.concat(result.data.rows.filter(row => row.gameStatus > 1));
					this.liveGames = this.liveGames.concat(result.data.rows.filter(row => row.gameStatus == 1));
					this.futureGames = this.futureGames.concat(result.data.rows.filter(row => row.gameStatus == 0));
				});

				// Filtering;
				let lastGameDate: moment.Moment = moment.max(this.pastGames.map(row => moment(row.gameUtcTimestamp).startOf('day')));
				let nextGameDate: moment.Moment = moment.min(this.futureGames.map(row => moment(row.gameUtcTimestamp).startOf('day')));

				this.pastGames = this.pastGames.filter(row => moment(row.gameUtcTimestamp).isSame(lastGameDate, 'day'));
				this.futureGames = this.futureGames.filter(row => moment(row.gameUtcTimestamp).isSame(nextGameDate, 'day'));

				this.scheduleLastRefresh = moment();
				this.scheduleLoading = false;
				window.setTimeout(() => this.reloadGamesList(), 30000);
			})
			.catch(error => console.error('Error', error));
	}
}