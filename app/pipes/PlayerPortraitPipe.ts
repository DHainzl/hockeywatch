import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'playerPortrait'
})
export class PlayerPortraitPipe implements PipeTransform {
	transform (value: number, args: string[]) : any {
		return 'http://api.hockeydata.net/img/icehockey/ebel/player-portraits/18/' + value + '.png';
	}
}