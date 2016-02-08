import { Component, Input } from 'angular2/core';

import { DivisionTeam } from '../../../components/components';
import { RouteParams } from 'angular2/router';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-teams',
	directives: [ DivisionTeam ],
	templateUrl: './app/components/pages/Teams/Teams.html'
})
export class PageTeams {
	divisions = config.divisions.all;
}