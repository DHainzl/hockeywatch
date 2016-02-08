import { Injectable } from 'angular2/core';
import { Jsonp } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TeamDetailsResult, TeamInformation } from '../models/models';

declare var config: any;

@Injectable()
export class TeamDetailsService {
	private jsonp: Jsonp;
	private static url: string = 'http://api.hockeydata.net/data/ebel/GetTeamDetails?callback=JSONP_CALLBACK&apiKey=' + config.apiKey + '&referer=' + config.apiReferer + '&lang=en'
	private static teamInfoMapping = {
		fullName: 'Vollständiger Vereinsname',
		colors: 'Klubfarben',
		successes: 'Größte Erfolge',
		address: 'Adresse',
		phone: 'Telefon',
		fax: 'Fax',
		email: 'Email',
		stadion: 'Stadion',
		stadionCapacity: 'Kapazität',
		mapsLink: 'Anfahrtsplan',
		president: 'Präsident',
		trainer: 'Trainer',
		coTrainer: 'Co-Trainer'
	}

	constructor(jsonp: Jsonp) {
		this.jsonp = jsonp;
	}

	get(divisionId: number, teamId: number): Observable<TeamDetailsResult> {
		var url = TeamDetailsService.url + '&divisionId=' + divisionId + '&teamId=' + teamId + '&timestamp=' + Date.now();

		return this.jsonp
			.request(url)
			.map(result => result.json())
			.map(result => {
				let teamInfoRaw = JSON.parse(result.data.teamData.teamInformation);
				let teamInfo = new TeamInformation();

				teamInfoRaw.forEach(infoLine => {
					Object.keys(TeamDetailsService.teamInfoMapping).forEach(key => {
						if (TeamDetailsService.teamInfoMapping[key] == infoLine.label) {
							teamInfo[key] = infoLine.text;
						}
					});
				});

				result.data.teamData.teamInformationParsed = teamInfo;
				return result;
			})
	}
}