/// <reference path="../../../../typings/moment/moment.d.ts" />

import { Component, View } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { ScheduleService } from '../../../services/services';
import { ScheduleResult, ScheduleResultRow } from '../../../models/models';
import { TeamLogoPipe } from '../../../pipes/pipes';

declare var config: any;		// TODO: I can't get any interface to work -_-

@Component({
	selector: 'page-games',
	directives: [ RouterLink ],
	templateUrl: './app/components/pages/Games/Games.html',
	pipes: [ TeamLogoPipe ]
})
export class PageGames {
	private loading: boolean = true;
	private scheduleService: ScheduleService;

	private weekdays: string[] = [];

	private month: moment.Moment;
	private matches: { [index: string]: ScheduleResultRow[] } = {};


	constructor (scheduleService: ScheduleService) {
		this.month = moment().startOf('month');
		this.scheduleService = scheduleService;

		let weekdays = moment.weekdaysShort();
		let firstDoW = moment.localeData().firstDayOfWeek();

		for (let i = 0; i < 7; i++) {
			this.weekdays.push(weekdays[(i + firstDoW) % 7]);
		}
	}

	ngOnInit() {
		this.reloadGamesList();
	}

	prevMonth() {
		this.month.subtract(1, 'month');
	}
	nextMonth () {
		this.month.add(1, 'month');
	}

	// Day here is always first day of week (Sun or Mon, depending on the locale)
	// Week is always first week of the month
	getMoment(week: number, day: number): moment.Moment {
		return this.month.clone()
			.startOf('month').startOf('week')
			.add(week, 'weeks').add(day, 'days');
	}
	getDay(week: number, day: number): string {
		return this.getMoment(week, day).format('D');
	}
	getDate(week: number, day: number): string {
		return this.getMoment(week, day).format('YYYY-MM-DD');
	}
	weekHidden(week: number) : boolean {
		return this.getMoment(week, 0).isAfter(this.month, 'month');
	}
	isOtherMonth(week: number, day: number): boolean {
		return !this.getMoment(week, day).isSame(this.month, 'month');
	}
	isToday (week: number, day: number): boolean {
		return this.getMoment(week, day).isSame(moment(), 'day');
	}
	getMatches(week: number, day: number): ScheduleResultRow[] {
		return this.matches[this.getDate(week, day)] || [];
	}
	reloadGamesList () {
		let promises: Promise<ScheduleResult>[] = config.divisions.all.map(division => this.scheduleService.get(division.id).toPromise());

		Promise.all(promises)
			.then(results => {
				results.forEach(result => {
					result.data.rows.forEach(row => {
						var date = moment(row.scheduledDate.sortValue).format('YYYY-MM-DD');
						if (typeof this.matches[date] == 'undefined') {
							this.matches[date] = [];
						}
						this.matches[date].push(row);
					})
				});

				this.loading = false;
			})
			.catch(error => console.error('Error', error));
	}
}