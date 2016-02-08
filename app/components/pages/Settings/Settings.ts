import { Component, View } from 'angular2/core';
import { CanDeactivate } from 'angular2/router';

@Component({
	selector: 'page-settings',
	directives: [ ],
	templateUrl: './app/components/pages/Settings/Settings.html'
})
export class PageSettings {
	storage = localStorage;
}