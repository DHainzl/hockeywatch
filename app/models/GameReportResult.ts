import { HockeydataResult } from './HockeydataResult';

export interface GameReportResult extends HockeydataResult {
	data: {
		gameData: GameReportGameData;
		homeGoals: GameReportGoals[];
		homePenalties: GameReportPenalties[];
		homeFieldPlayers: GameReportFieldPlayers[];
		homeGoalKeepers: GameReportGoalKeepers[];
		homeTeamStats: GameReportTeamStats;
		homeGoalKeeperChanges: GameReportGoalKeeperChanges[];
		awayGoals: GameReportGoals[];
		awayPenalties: GameReportPenalties[];
		awayFieldPlayers: GameReportFieldPlayers[];
		awayGoalKeepers: GameReportGoalKeepers[];
		awayTeamStats: GameReportTeamStats;
		awayGoalKeeperChanges: GameReportGoalKeeperChanges[];
	}
}


export interface GameReportGameData {
	id: string;						// guid
	scheduledDate: GameReportDate;
	scheduledTime: string;			// hh:mm
	startTime: string;				// hh:mm
	endTime: string;				// hh:mm
	isOvertime: number;				// 0 or 1
	isShootOut: number;				// 0 or 1
	homeTeamId: number;
	homeTeamLongname: string;
	homeTeamShortname: string;
	homeTeamFlavourname: string;
	homeTeamScore: number;
	awayTeamId: number;
	awayTeamLongname: string;
	awayTeamShortname: string;
	awayTeamFlavourname: string;
	awayTeamScore: number;
	gameStatus: number;
	gameExtendedStatus: number;
	gameExtendedStatusInfoText: string;
	gameName: string;
	gameDay: any;					// TODO
	gameRound: number;
	location: GameReportLocation;
	attendance: number;
	liveTime: number;
	liveTimeFormatted: string;		// hh:mm
	liveTimePeriod: string;
	periodStats: GameReportPeriodStats[];
	gameOfficials: GameReportGameOfficials;
	teamOfficials: GameReportTeamOfficials;
	liveTimePeriodBar: any;			// TODO
	youTubeLink: any;				// TODO
}

export interface GameReportDate {
	formattedShort: string;			// DD.MM.YY
	formattedLong: string;			// DD. MMMM YYYY
	timestamp: number;
	value: string;					//YYYY-MM-DD
	diffToNow: number;
}

export interface GameReportLocation {
	longname: string;
	shortname: string;
	coordinates: GameReportCoordinates;
}

export interface GameReportCoordinates {
	lat: number;
	lng: number;
}

export interface GameReportPeriodStats {
	period: string;					// "1", "2", "3", "OT"
	startTime: string;
	endTime: string;
	homeScore: number;
	awayScore: number;
	homeShotsOnGoal: number;
	awayShotsOnGoal: number;
}

export interface GameReportGameOfficials {
	ref1: GameReportFullName;
	ref2: GameReportFullName;
	linesman1: GameReportFullName;
	linesman2: GameReportFullName;
}

export interface GameReportTeamOfficials {
	headcoachhome: GameReportFullName;
	headcoachaway: GameReportFullName;
}

export interface GameReportFullName {
	lastname: string;
	firstname: string;
}

export interface GameReportGoals {
	gameTime: number;
	gameTimeFormatted: string;			// hh:mm
	gameTimePeriod: string;				// "1", "2", "3", "OT", "GWS"
	scoredBy: GameReportPlayer;
	assistBy: GameReportPlayer;
	assist2By: GameReportPlayer;
	newScore: string;					//x:x
	goalNr: number;
	gameStrength: string;
	isEmptyNet: boolean;
	isPenaltyShot: boolean;
	isGameWinningGoal: boolean;
	isGameTieingGoal: boolean;
	homePlayersOnIce: GameReportPlayer[];
	awayPlayersOnIce: GameReportPlayer[];
	youTubeLink: any;					// TODO
}

export interface GameReportPlayer {
	id: number;
	playerLastname: string;
	playerFirstname: string;
	playerJerseyNr: number;
}

export interface GameReportPenalties {
	gameTime: number;
	gameTimeFormatted: string;			// hh:mm
	gameTimePeriod: string;
	startTime: number;
	startTimeFormatted: string;			// hh:mm
	startTimePeriod: string;
	endTime: number;
	endTimeFormatted: string;			// hh:mm
	endTimePeriod: string;
	offender: GameReportPlayer;
	servedBy: any;						// TODO
	offence: string;					// "INTRF", "TRIP"
	penaltyLength: number;
}

export interface GameReportFieldPlayers {
	id: number;
	playerLastname: string;
	playerFirstname: string;
	playerJerseyNr: number;
	assists: number;
	goals: number;
	penaltyMinutes: number;
	plusMinus: number;
	points: number;
	position: string;
	lineupLine: number;
	shotsOnGoal: number;
	shotsTaken: number;
	faceoffsWon: number;
	faceoffsTotal: number;
	isStartingPlayer: boolean;
}

export interface GameReportGoalKeepers {
	id: number;
	playerLastname: string;
	playerFirstname: string;
	playerJerseyNr: number;
	assists: number;
	goals: number;
	penaltyMinutes: number;
	plusMinus: number;
	points: number;
	position: string;
	goalsAgainstAverage: string;		// Number with german comma
	playingTime: number;
	goalsAgainst: number;
	shotsAgainst: number;
	savePercentage: string;				// number with german comma
	saves: number;
	isStartingPlayer: number;
}

export interface GameReportTeamStats {
	faceoffsWon: number;
	faceoffsTotal: number;
	shotsOnGoal: number;
	shotsBlocked: number;
	penaltyMinutes: number;
	timeValues: GameReportTimeValues;
}

export interface GameReportTimeValues {
	leading: number;
	tied: number;
	trailing: number;
	onPowerplay: number;
	shortHanded: number;
}

export interface GameReportGoalKeeperChanges {
	gametime: number;
	gameTimeFormatted: string;			// hh:mm
	gameTimePeriod: string;				// "1", "2", "3", "OT", "GWS"
	player: GameReportPlayer;
	action: string;						// "on" or "off"
}