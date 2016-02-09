import { Injectable } from 'angular2/core';
import { Jsonp } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { GameReportResult } from '../models/models';

declare var config: any;

@Injectable()
export class GameReportService {
	private jsonp: Jsonp;
	private static url: string = 'http://api.hockeydata.net/data/ebel/GetGameReport?callback=JSONP_CALLBACK&apiKey=' + config.apiKey + '&referer=' + config.apiReferer + '&lang=en'

	constructor(jsonp: Jsonp) {
		this.jsonp = jsonp;
	}

	get(gameId: string): Observable<GameReportResult> {
		var url = GameReportService.url + '&gameId=' + gameId + '&timestamp=' + Date.now();

		return this.jsonp
			.request(url)
			.map(result => result.json());
	}
}