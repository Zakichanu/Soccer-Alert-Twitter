import cron from 'node-cron';
import constants, { fixtureResponse, events } from '../helper/constants';
import functions from '../helper/functions';
const liveScore = () => {
    try {
        console.log("Running live score analysis...");
        console.log("Live Score for : " + constants.premierLeague.id);
        callLiveScore(constants.premierLeague.fixtureOfTheDay, constants.premierLeague.id);
        // console.log("Live Score for : " + constants.ligue1.id);
        // callLiveScore(constants.ligue1.fixtureOfTheDay, constants.ligue1.id);
        // console.log("Live Score for : " + constants.bundesliga.id);
        // callLiveScore(constants.bundesliga.fixtureOfTheDay, constants.bundesliga.id);
        // console.log("Live Score for : " + constants.laLiga.id);
        // callLiveScore(constants.laLiga.fixtureOfTheDay, constants.laLiga.id);
        // console.log("Live Score for : " + constants.ucl.id);
        // callLiveScore(constants.ucl.fixtureOfTheDay, constants.ucl.id);
        // console.log("Live Score for : " + constants.europaLeague.id);
        // callLiveScore(constants.europaLeague.fixtureOfTheDay, constants.europaLeague.id);
        // console.log("Live Score for : " + constants.serieA.id);
        // callLiveScore(constants.serieA.fixtureOfTheDay, constants.serieA.id);
    } catch (error) {
        throw error;
    }
}

const callLiveScore = async (matchOfTheDay: Array<fixtureResponse>, idLeague: number) => {
    try {
        let triggerCall: boolean = false;

        for (const match of matchOfTheDay) {
            const currentDate: Date = new Date();
            const matchDate: Date = new Date(match.fixture.date);
            if (currentDate >= matchDate && (match.fixture.status.short === 'NS' || match.fixture.status.short === '1H' || match.fixture.status.short == 'HT' || match.fixture.status.short == '2H'
                || match.fixture.status.short == 'ET' || match.fixture.status.short == 'P' || match.fixture.status.short == 'BT')) {

                triggerCall = true;
                break;
            }
        }
        if (triggerCall) {
            let fixtures: Array<fixtureResponse> = await functions.getLiveScore(idLeague);

            for (const iterator of fixtures) {
                let matchOFDAssociate: fixtureResponse | undefined = matchOfTheDay.find(fixture => fixture.fixture.id === iterator.fixture.id);
                if (matchOFDAssociate) {
                    // Managing events
                    manageEvents(matchOFDAssociate, iterator)
                    const indexOfMatchToUpdate: number = matchOfTheDay.findIndex(fixture => fixture === matchOFDAssociate);
                    matchOfTheDay[indexOfMatchToUpdate] = iterator;
                } else {
                    console.log('No match found');
                }
            }
        }

        functions.wait(90000).then(() => callLiveScore(functions.getMatchOftheDay(idLeague), idLeague));
    } catch (error) {
        throw error;
    }
}

const manageEvents = async (existantMatch: fixtureResponse, matchLive: fixtureResponse) => {
    try {
        // New goal
        const allGoalsLive = matchLive.events?.filter(event => event.type === 'Goal') as unknown as Array<events>;
        const allGoalsMatch = existantMatch.events?.filter(event => event.type === 'Goal') as unknown as Array<events>;
        if ((allGoalsMatch && allGoalsLive.length > allGoalsMatch.length && matchLive.goals !== existantMatch.goals) || (!allGoalsMatch && allGoalsLive.length > 0 && matchLive.goals !== existantMatch.goals)) {
            if (allGoalsLive[allGoalsLive.length - 1].detail === 'Own Goal') {
                console.log(allGoalsLive[allGoalsLive.length - 1].time.elapsed + "' ➡️ Own Goal! From : " + allGoalsLive[allGoalsLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
            }
            else if (allGoalsLive[allGoalsLive.length - 1].detail === 'Normal Goal') {
                console.log(allGoalsLive[allGoalsLive.length - 1].time.elapsed + "' ➡️ Goal! From : " + allGoalsLive[allGoalsLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
            }
            else if (allGoalsLive[allGoalsLive.length - 1].detail === 'Penalty') {
                console.log(allGoalsLive[allGoalsLive.length - 1].time.elapsed + "' ➡️ Penalty GOAL! From : " + allGoalsLive[allGoalsLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
            }
            else if (allGoalsLive[allGoalsLive.length - 1].detail === 'Missed Penalty') {
                console.log(allGoalsLive[allGoalsLive.length - 1].time.elapsed + "' ➡️ Missed Penalty! From : " + allGoalsLive[allGoalsLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
            }
        }
        // New red card
        const allRedCardsLive = matchLive.events?.filter(event => event.detail === 'Red Card') as unknown as Array<events>;
        const allRedCardsMatch = existantMatch.events?.filter(event => event.detail === 'Red Card') as unknown as Array<events>;
        if ((allRedCardsMatch && allRedCardsLive.length > allRedCardsMatch.length) || (!allRedCardsMatch && allRedCardsLive.length > 0)) {
            console.log(allRedCardsLive[allRedCardsLive.length - 1].time.elapsed + "' ➡️ Red Card! From : " + allRedCardsLive[allRedCardsLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        }
        // VAR
        const allVARLive = matchLive.events?.filter(event => event.detail === 'Goal cancelled') as unknown as Array<events>;
        const allVARMatch = existantMatch.events?.filter(event => event.detail === 'Goal cancelled') as unknown as Array<events>;
        if ((allVARMatch && allVARLive.length > allVARMatch.length) || (!allVARMatch && allVARLive.length > 0)) {
            console.log(allVARLive[allVARLive.length - 1].time.elapsed + "' ➡️ Goal cancelled! From : " + allVARLive[allVARLive.length - 1].player.name + " Score : " + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        }

        // HF or FT
        if (matchLive.fixture.status.short === 'HT' && existantMatch.fixture.status.short === '1H') {
            console.log('Halftime !! Score: ' + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        } else if (matchLive.fixture.status.short === '2H' && existantMatch.fixture.status.short === 'HT') {
            console.log('Second Half !! Score: ' + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        } else if (matchLive.fixture.status.short === '1H' && existantMatch.fixture.status.short === 'NS') {
            console.log('Beginning of the match !! Score: ' + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        } else if (matchLive.fixture.status.short === 'FT' && existantMatch.fixture.status.short === '2H') {
            console.log('Fulltime !! Score: ' + matchLive.teams.home.name + ' ' + matchLive.goals.home + " - " + matchLive.goals.away + ' ' + matchLive.teams.away.name);
        }
    } catch (errors) {
        throw errors;

    }
}

export default { liveScore }
