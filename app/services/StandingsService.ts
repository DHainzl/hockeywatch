import { Injectable } from 'angular2/core';
import { Jsonp } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { StandingsResult } from '../models/models';

declare var config: any;

@Injectable()
export class StandingsService {
	private jsonp: Jsonp;
	private static url: string = 'http://api.hockeydata.net/data/ebel/Standings?callback=JSONP_CALLBACK&apiKey=' + config.apiKey + '&referer=' + config.apiReferer + '&lang=en'

	constructor(jsonp: Jsonp) {
		this.jsonp = jsonp;
	}

	get(divisionId: number): Observable<StandingsResult> {
		return this.jsonp
			.request(StandingsService.url + '&divisionId=' + divisionId)
			.map(result => result.json());
	}
}