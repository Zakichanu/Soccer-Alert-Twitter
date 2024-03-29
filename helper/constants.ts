import { TwitterApi } from "twitter-api-v2";
import dotenv from 'dotenv';
dotenv.config();

// Interfaces mapping json of fixtures response
export interface fixtureResponse {
    fixture: fixture;
    league: league;
    teams: teams;
    goals: goals;
    events: Array<events>;
}

interface fixture{
    id: number;
    referee: string;
    timezone: string;
    date: string;
    venue: venue;
    status: status;
}

interface league{
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
}

interface teams{
    home: team;
    away: team;
}

interface goals{
    home: number;
    away: number;
}

interface score{
    halftime: goals;
    fulltime: goals;
    extratime: goals;
    penalty: goals;
}

interface venue{
    id: number;
    name: string;
    city: string;
}

interface team {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

interface status {
    long: string;
    short: string;
    elapsed: number;
}

export interface events{
    time: time;
    team: team;
    player: player;
    assist: player;
    type: string;
    detail: string;
    comments: string;
}

interface player{
    id: number;
    name: string;
}
interface time{
    elapsed: number;
    extra: number;
}
//////////////////////////////////////////////////////////////////////////////////////////////

// constants for each league
const premierLeague = {
    "id": 39 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const ligue1 = {
    "id": 61 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const ucl = {
    "id": 2 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const europaLeague = {
    "id": 3 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const serieA = {
    "id": 135 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const bundesliga = {
    "id": 78 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}

const laLiga = {
    "id": 140 as number,
    "fixtureOfTheDay": Array<fixtureResponse>()
    
}
//////////////////////////////////////////////////////////////////////////////////////////////


// Season number
const currentSeason: number = 2022

// Array of all tweets that need to be tweeted
const listOfTweets = Array<string>();

// Array of tweets of a thread
const listOfTweetsThread = Array<string>();

// Instanciate with desired auth type
const userClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_KEY_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });

export default { premierLeague, laLiga, currentSeason, ligue1, ucl, europaLeague, serieA, bundesliga, listOfTweets, listOfTweetsThread, userClient };