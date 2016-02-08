import { ScheduleResultDate } from './models';
import { HockeydataResult } from './HockeydataResult';

export interface TeamDetailsResult extends HockeydataResult {
	data: {
		teamData: TeamData;
		teamRoster: TeamRosterEntry[];
		playerStats: TeamPlayerStats[];
		goalkeeperStats: TeamGoalkeeperStats[];
		games: TeamGames[];
		teamStats: TeamStats;
	}
}

export interface TeamData {
	id: number;
	teamLongname: string;
	teamFlavourname: string;
	teamInformation: string;			// Json string in json :)
	teamInformationParsed: TeamInformation;
}

export interface TeamRosterEntry {
	id: number;
	position: string;					// F D or G
	playerJerseyNr: number;
	playerLastname: string;
	playerFirstname: string;
	playerHeight: number;
	playerWeight: number;
	shootsCatches: number;
}

export interface TeamPlayerStats {
	id: number;
	playerLastname: string;
	playerFirstname: string;
	playerJerseyNr: number;
	teamId: number;
	teamShortname: string;
	position: string;
	points: number;
	gamesPlayed: number;
	goals: number;
	assists: number;
	plusMinus: number;
	penaltyMinutes: string;
	penaltyMinutesPerGame: string;		// number with german encoded comma
	shotsOnGoal: number;
	scoringEfficiency: number;
	faceoffs: string;
	faceoffPercentage: string;
	minorPenalties: number;
	majorPenalties: number;
	misconducts: number;
	gameMisconducts: number;
	matchPenalties: number;
}

export interface TeamGoalkeeperStats {
	id: number;
	playerLastname: string;
	playerFirstname: string;
	playerJerseyNr: number;
	teamId: number;
	teamShortname: string;
	position: string;
	shotsAgainst: number;
	goalsAgainst: number;
	goalsAgainstAverage: number;
	savePercentag: number;
	gamesPlayed: number;
	gamesPlayedIn: number;
	gamesStarted: number;
	playingTime: number;
}

export interface TeamGames {
	id: string;					// guid
	isHomeGame: number;
	opponentTeamId: number;
	opponentTeamShortname: string;
	scheduledDate: ScheduleResultDate;
	scheduledTime: string;
	status: number;
	isOvertime: number;
	isShootout: number;
	gameVictoryState: string;
	score: string;
	scoredFirstGoal: string;
	wonAfterTrailing: number;
	wonWhileOutshootingOpponent: number;
	lostAfterLeading: number;
	powerPlay: string;
	penaltyKill: string;
	powerPlayGoalsAgainst: number;
	shorthandedGoalsFor: number;
	shorthandedGoalsAgainst: number;
	shotsOnGoalTotal: number;
	shotsAgainstTotal: number;
	faceOffs: string;
	timeLeading: number;
	timeTied: number;
	timeTrailing: number;
	labels: any;
	seriesStandings: any
}

export interface TeamStats {
	gamesPlayed: number;
	powerplay: string;
	powerplayPercentage: number;
	penaltykill: string;
	penaltyKillingPercentage: number;
	powerplayGoalsAgainst: number;
	shorthandedGoalsAgainst: number;
	shorthandedGoalsFor: number;
	penaltyMinutes: number;
	minorPenalties: number;
	majorPenalties: number;
	misconducts: number;
	gameMisconducts: number;
	matchPenalties: number;
	penaltyMinutesPerGaem: number;
	shotsOnGoalTotal: number;
	scoringEfficiency: string;
	faceoffs: string;
	faceoffPercentage: string;
}

export class TeamInformation {
	fullName: string;
	colors: string;
	successes: string;
	address: string;
	phone: string;
	fax: string;
	email: string;
	stadion: string;
	stadionCapacity: string;
	mapsLink: string;
	president: string;
	trainer: string;
	coTrainer: string;
}