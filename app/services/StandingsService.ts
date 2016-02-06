import { Injectable } from 'angular2/core';
import { Jsonp } from 'angular2/http';

import { StandingsResult } from '../models/models';

declare var config: any;

@Injectable()
export class StandingsService {
	private jsonp: Jsonp;
	private static url: string = 'http://api.hockeydata.net/data/ebel/Standings?callback=JSONP_CALLBACK&apiKey=' + config.apiKey + '&referer=' + config.apiReferer + '&lang=en&divisionId='

	constructor(/* jsonp: Jsonp */) {
		// this.jsonp = jsonp;
	}

	get(divisionId: number) : StandingsResult {
// 		return this.jsonp
//			.get(StandingsService.url + divisionId)
//			.map(data => data.json())
//			.map(data => <StandingsResult>data);

		let data: StandingsResult = {
			"statusId": 1,
			"statusMsg": "Ok",
			"data": {
				"isUnOfficial": false,
				"rows": [
					{
						"id": 189,
						"tableRank": 1,
						"tableRankImprovement": 0,
						"teamLongname": "EC Red Bull Salzburg",
						"teamShortname": "RBS",
						"gamesPlayed": 44,
						"gamesWon": 26,
						"gamesWonInOt": 5,
						"gamesTied": 0,
						"gamesLostInOt": 3,
						"gamesLost": 10,
						"goalsFor": 168,
						"goalsAgainst": 112,
						"goalDifference": "+56",
						"points": 91,
						"labels": []
					},
					{
						"id": 189,
						"tableRank": 1,
						"tableRankImprovement": 0,
						"teamLongname": "EC VSV",
						"teamShortname": "RBS",
						"gamesPlayed": 44,
						"gamesWon": 26,
						"gamesWonInOt": 5,
						"gamesTied": 0,
						"gamesLostInOt": 3,
						"gamesLost": 10,
						"goalsFor": 168,
						"goalsAgainst": 112,
						"goalDifference": "+56",
						"points": 91,
						"labels": []
					}
				]
			}
		};

		return data;
	}
}