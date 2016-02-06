import { HockeydataResult } from './HockeydataResult';

export interface StandingsResult extends HockeydataResult {
	data: {
		isUnOfficial: boolean;

		rows: StandingsResultRow[];
	}
}

export interface StandingsResultRow {
	id: number;
	tableRank: number;
	tableRankImprovement: number;
	teamLongname: string;
	teamShortname: string;
	gamesPlayed: number;
	gamesWon: number;
	gamesWonInOt: number;
	gamesTied: number;
	gamesLostInOt: number;
	gamesLost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: string;
	points: number;
	labels: any;				// No idea, some array of strings maybe?
}