import { types, getRoot } from 'mobx-state-tree';
import { countBy, keys, uniqueId } from 'lodash';

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
        { x: "Games Played", y: self.gamesPlayed.length },
        { x: "Games Won", y: self.gamesWon.length },
      ],
    };
  },
}));

export default Player;
