import { Component, Input } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { ScheduleResultRow } from '../../models/models';

import { TeamLogoPipe } from '../../pipes/pipes';

@Component({
	selector: 'game-results',
	templateUrl: './app/components/GameResults/GameResults.html',
	directives: [ RouterLink ],
	pipes: [TeamLogoPipe]
})
export class GameResults {
	@Input("games") games: ScheduleResultRow[];
	@Input("title") title: string;
	@Input("subtitle") subtitle: string;
	@Input("showScore") showScore: boolean = true;

	getTime(game: ScheduleResultRow): string {
		let time = game.liveTimeString;

		if (!isNaN(+time)) {
			return Math.ceil(+time / 100) + "'";
		}
		return time;
	}
}