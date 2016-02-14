import { Component } from 'angular2/core';

import { Tab } from '../components';

@Component({
	selector: 'tabs',
	directives: [],
	templateUrl: './app/components/Tabs/Tabs.html',
	pipes: []
})

export class Tabs {
	tabs: Tab[] = [];

	addTab(tab: Tab) {
		if (this.tabs.length === 0) {
			tab.active = true;
		}

		this.tabs.push(tab);
	}

	selectTab(tab: Tab) {
		this.tabs.forEach(tab => tab.active = false);
		tab.active = true;
	}
}