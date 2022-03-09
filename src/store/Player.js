import { types, getRoot } from 'mobx-state-tree';
import { sortBy, reduce, countBy, keys, uniqueId } from 'lodash';

const Player = types.model(
  "Player",
  {
    id: types.optional(types.identifier, () => uniqueId('Player_')),
    name: types.string,
    commanders: types.array(types.string),
  },
).views(self => ({
  get gamesWon() {
    return getRoot(self).gamesWonByPlayer[self.id] || [];
  },

  get gamesPlayed() {
    return getRoot(self).gamesPlayedByPlayer[self.id] || [];
  },

  get winPercentage() {
    return (self.gamesWon.length / self.gamesPlayed.length) * 100;
  },

  get winPercentageByGames() {
    return (self.winPercentage / 100) * self.gamesPlayed.length
  },

  get easyPrint() {
    return `${self.name} - ${self.gamesWon.length} - ${self.gamesPlayed.length} - ${self.winPercentage}`;
  },

  get winsByType() {
    return countBy(self.gamesWon, game => game.wincon ? game.wincon : "Untracked");
  },

  get winsByCommander() {
    return countBy(self.gamesWon, game => game.winner.commander);
 },

  get winsByDate() {
    let lastKey = null;
    return reduce(self.gamesWon, (acc, game) => {
      const previousCount = acc[lastKey] || 0;
      if (acc[game.date]) {
        acc[game.date] += 1
      } else {
        acc[game.date] = previousCount + 1;
      }

      lastKey = game.date;

      return acc;
    }, {});
  },

  get stats() {
    return {
      "Win Percentage by Player": parseInt(self.winPercentage, 10),
      "Wins by Player": self.gamesWon.length,
      "Games Played by Player": self.gamesPlayed.length,
    }
  },

  get playerStatsData() {
    return {
      "Wins by Type": keys(self.winsByType).map(wincon => ({
        x: wincon, y: self.winsByType[wincon],
      })),
      "Wins by Commander": keys(self.winsByCommander).map(commander => ({
        x: commander, y: self.winsByCommander[commander],
      })),
      "Win Percentage": [
        { x: "Games Lost", y: self.gamesPlayed.length - self.gamesWon.length },
        { x: "Games Won", y: self.gamesWon.length },
      ],
      "Wins over Time": sortBy(keys(self.winsByDate), date => new Date(date)).map(key => ({
        x: new Date(key), y: self.winsByDate[key],
      })),
    };
  },

  get color() {
    const colorMap = {
      "Brendan": "orange",
      "Reese": "green",
      "Alex": "yellow",
      "John": "purple",
      "Greg": "blue",
      "Phil": "red",
      "Andrew": "pink",
      "Nolan": "magenta",
    }

    if (colorMap[self.name]) {
      return colorMap[self.name];
    }

    return 'black';
  },
}));

export default Player;
