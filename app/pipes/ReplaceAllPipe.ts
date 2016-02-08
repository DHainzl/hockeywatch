import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'replaceAll'
})
export class ReplaceAllPipe implements PipeTransform {
	transform(value: string, args: string[]): any {
		if (arguments.length != 2) {
			console.log('ReplaceAllPipe: Not enough parameters: ', arguments.length, arguments);
			return;
		}

		return value.replace(new RegExp(args[0], 'g'), args[1]);
	}
}
