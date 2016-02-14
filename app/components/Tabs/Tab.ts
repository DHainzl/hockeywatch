import { Component, Input } from 'angular2/core';

import { Tabs } from '../components';

@Component({
	selector: 'tab',
	directives: [],
	templateUrl: './app/components/Tabs/Tab.html',
	pipes: []
})

export class Tab {
	@Input() title: string;

	active: boolean;

	constructor(tabs: Tabs) {
		tabs.addTab(this);
	}
}