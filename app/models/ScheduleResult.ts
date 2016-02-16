import { HockeydataResult } from './HockeydataResult';

export interface ScheduleResult extends HockeydataResult {
	data: {
		rows: ScheduleResultRow[];
	}
}

export interface ScheduleResultRow {
	id: string;					// Actually a guid
	divisionId: number;
	divisionName: string;
	scheduledDate: ScheduleResultDate;
	scheduledTime: string;				// 20:20
	gameName: string;
	gameDay: any;						// TODO
	gameRound: number;
	location: ScheduleResultLocation;
	gameUtcTimestamp: number;			// seems to be the same as scheduledDate.sortValue
	awayTeamId: number;
	awayTeamLongName: string;
	awayTeamShortName: string;
	awayTeamFlavourname: string;
	homeTeamId: number;
	homeTeamLongName: string;
	homeTeamShortName: string;
	homeTeamFlavourname: string;
	homeTeamScore: number;
	awayTeamScore: number;
	// gameStatus can be:
	// 0	= scheduled
	// 1	= live
	// 2	= finished (Spielende, Strafverifizierung möglich)
	// 3	= completed (Spielende und inoffizielles Spielergebnis)
	// 4	= confirmed (Spielende und offizielles Spielergebnis)
	gameStatus: number;
	extendedStatus: any;				// TODO
	firstFuture: boolean;
	dateIsToBeDetermined: boolean;
	timeIsToBeDetermined: boolean;
	isOvertime: boolean;
	isShootOut: boolean;
	liveTime: number;							// seconds played
	liveTimeString: string;
	broadcasters: ScheduleResultBroadcasters[];		// or null
	liveTimePeriodBar: ScheduleResultPeriodBar[];
	gameHasEnded: boolean;
	labels: string[];
	periodResults: string;				// "(x:y,x:y,x:y)"
	periodResults1: string;				// "x:y"
	periodResults2: string;
	periodResults3: string;
	periodResultsOT: string;
	periodResultsSO: string;
	homeScorers: ScheduleResultScorers;
	awayScorers: ScheduleResultScorers;
	youTubeLink: any;					// TODO
}

export interface ScheduleResultDate {
	sortValue: number;					// timestamp
	value: string;						// 01.01.2001
	shortValue: string;					// 01.01
	longValue: string;					// 01. January 2001
}

export interface ScheduleResultLocation {
	// TODO
	id: any;
	longname: any;
	shortname: any;
	address: any;
}

export interface ScheduleResultBroadcasters {
	broadcasterId: number;
	broadcasterName: string;
}

export interface ScheduleResultScorers {
	rows: string[];
}

export interface ScheduleResultPeriodBar {
	maxLength: number;			// All add up to 100
	shortName: string;			// "1/3", "OT", etc.
	longName: string;			// "1st period", "Overtime", etc.
	isActive: number;			// 0 / 1
	progress: number;			// 0 - 100
}