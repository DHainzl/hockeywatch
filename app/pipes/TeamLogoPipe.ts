import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'teamLogo'
})
export class TeamLogoPipe implements PipeTransform {
	transform (value: number, args: string[]) : any {
		return 'http://api4.hockeydata.net/img/icehockey/ebel/team-logos/' + args[0] + '/' + value + '.png';
	}
}