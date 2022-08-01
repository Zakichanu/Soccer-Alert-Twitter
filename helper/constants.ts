interface fixture{
    fixtureId: number;
    status: string;
    homeId: number;
    homeName: string;
    homeGoal: number;
    awayId: number;
    awayName: string;
    awayGoal: number;
    winner: boolean;

}

const premierLeague = {
    "id": 39 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const ligue1 = {
    "id": 61 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const ucl = {
    "id": 2 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const europaLeague = {
    "id": 3 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const serieA = {
    "id": 135 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const bundesliga = {
    "id": 78 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const laLiga = {
    "id": 140 as number,
    "fixtureOfTheDay": Array<fixture>()
    
}

const currentSeason: number = 2021

export default {premierLeague, laLiga, currentSeason, ligue1, ucl, europaLeague, serieA, bundesliga}