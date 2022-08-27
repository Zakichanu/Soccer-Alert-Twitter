import cron from 'node-cron';
import constants, { fixtureResponse } from '../helper/constants';
import functions from '../helper/functions';

// Function to retrieve the match of the day
const fixturePreview = () => {
    cron.schedule('0 12 * * *', async () => {
        console.log("It's 12 o'clock !!! Match preview of the day...");
        callResult("⏰ Match of the day | ");

    })
}

const fixtureResult = () => {
    cron.schedule('55 23 * * *', async () => {
        console.log("It's almost midnight !!! Match result of the day...");
        callResult("📊 Today's match result | ");

    })
}


const callResult = async (type: string) => {
    let premierLeagueFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.premierLeague.id);
    constants.premierLeague.fixtureOfTheDay = premierLeagueFixtures;
    if (constants.premierLeague.fixtureOfTheDay.length > 0) {
        console.log("Premier League...")
        constants.listOfTweetsThread.push(type + "#PremierLeague")
        await fillArrayForThreadTweet(constants.premierLeague.fixtureOfTheDay);
    }


    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    let ligue1Fixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.ligue1.id);
    constants.ligue1.fixtureOfTheDay = ligue1Fixtures;
    if (constants.ligue1.fixtureOfTheDay.length > 0) {
        console.log("Ligue 1...")
        constants.listOfTweetsThread.push(type + "#Ligue1")
        await fillArrayForThreadTweet(constants.ligue1.fixtureOfTheDay);
    }

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    let bundesligaFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.bundesliga.id);
    constants.bundesliga.fixtureOfTheDay = bundesligaFixtures;
    if (constants.bundesliga.fixtureOfTheDay.length > 0) {
        console.log("Bundesliga...")
        constants.listOfTweetsThread.push(type + "#Bundesliga")
        await fillArrayForThreadTweet(constants.bundesliga.fixtureOfTheDay);
    }

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    let laLigaFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.laLiga.id);
    constants.laLiga.fixtureOfTheDay = laLigaFixtures;
    if (constants.laLiga.fixtureOfTheDay.length > 0) {
        console.log("LaLiga...")
        constants.listOfTweetsThread.push(type + "#LaLiga")
        await fillArrayForThreadTweet(constants.laLiga.fixtureOfTheDay);
    }

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    let uclFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.ucl.id);
    constants.ucl.fixtureOfTheDay = uclFixtures;
    if (constants.ucl.fixtureOfTheDay.length > 0) {
        console.log("UCL...")
        constants.listOfTweetsThread.push(type + "#UCL")
        await fillArrayForThreadTweet(constants.ucl.fixtureOfTheDay);
    }

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);


    let europaLeagueFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.europaLeague.id);
    constants.europaLeague.fixtureOfTheDay = europaLeagueFixtures;
    if (constants.europaLeague.fixtureOfTheDay.length > 0) {
        console.log("Europa League...")
        constants.listOfTweetsThread.push(type + "#EL")
        await fillArrayForThreadTweet(constants.europaLeague.fixtureOfTheDay);
    }


    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    let serieAFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.serieA.id);
    constants.serieA.fixtureOfTheDay = serieAFixtures;
    if (constants.serieA.fixtureOfTheDay.length > 0) {
        console.log("Serie A...")
        constants.listOfTweetsThread.push(type + "#SerieA")
        await fillArrayForThreadTweet(constants.serieA.fixtureOfTheDay);
    }

    console.log("Done !");
}

const fillArrayForThreadTweet = async (fixtureResult: Array<fixtureResponse>) => {
    for (const iterator of fixtureResult) {
        const homeGoal: number = iterator.goals.home === null ? 0 : iterator.goals.home;
        const awayGoal: number = iterator.goals.away === null ? 0 : iterator.goals.away;

        const result: string = iterator.teams.home.name + " " + homeGoal + " - " + awayGoal + " " + iterator.teams.away.name + "\n🕚" + new Date(iterator.fixture.date).getHours() + ":" + (new Date(iterator.fixture.date).getMinutes() < 10 ? '0' : '') + new Date(iterator.fixture.date).getMinutes();
        constants.listOfTweetsThread.push(result);
        console.log(result);
    }
    await functions.tweetThread(constants.userClient);
}
export default { fixturePreview, fixtureResult };