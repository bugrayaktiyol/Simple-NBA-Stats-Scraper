const axios = require("axios");
const cheerio = require("cheerio");
const {config}= require("dotenv");
config();

class scrapSelector {
  constructor(url, dataSelector) {
    this.url = url;
    this.dataSelector = dataSelector;
  }

  async fetchAndLoadData() {
    const { data } = await axios.get(this.url);
    this.$ = cheerio.load(data);
  }

  selectTable() {
    return this.$(this.dataSelector);
  }
}


async function scrapePlayerNames() {
  const scrap = new scrapSelector(process.env.SCRAP_URL, 'td[data-stat="player"]');
  await scrap.fetchAndLoadData();
  const playersList = scrap.selectTable();

  const players = playersList.map((_, e) => {
    const player = scrap.$(e);

    const id = player.attr('data-append-csv');
    const playerName = player.children('a').text().split(" ");
    const team = player.parent().children('td[data-stat="team_id"]').children('a').text();

    const [firstName, ...lastName] = playerName;
    return { playerId: id, name: firstName, surname: lastName.join(" "), team: team };
  }).get();

  return players;
}

module.exports = {
  scrapePlayerNames
}