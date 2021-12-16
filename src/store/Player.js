import { types, getRoot } from 'mobx-state-tree';
import { uniqueId } from 'lodash';

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

  get stats() {
    return {
      "Win Percentage": parseInt(self.winPercentage, 10),
      "Wins": self.gamesWon.length,
      "Games Played": self.gamesPlayed.length,
      "Win Percentage by Games Played": parseInt(self.winPercentageByGames, 10),
    }
  },
}));

export default Player;
