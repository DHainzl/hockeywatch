import { Injectable } from 'angular2/core';
import { Jsonp } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { ScheduleResult } from '../models/models';

declare var config: any;

@Injectable()
export class ScheduleService {
	private jsonp: Jsonp;
	private static url: string = 'http://api.hockeydata.net/data/ebel/Schedule?callback=JSONP_CALLBACK&apiKey=' + config.apiKey + '&referer=' + config.apiReferer + '&lang=en'

	constructor(jsonp: Jsonp) {
		this.jsonp = jsonp;
	}

	get(divisionId: number, live: boolean = false): Observable<ScheduleResult> {
		var url = ScheduleService.url + '&divisionId=' + divisionId + + '&timestamp=' + Date.now();
		if (live) {
			url += '&widgetOptions={"live":true}';
		}

		return this.jsonp
			.request(url)
			.map(result => result.json());
	}
}