import { types } from 'mobx-state-tree';
import { countBy, keys, each, reduce, groupBy, compact, keyBy } from 'lodash';

import Game from './Game';
import Player from './Player'

const EdhGraphStore = types.model(
  "EdhGraphStore",
  {
    players: types.array(types.late(() => Player)),
    games: types.array(Game),
    timeFrame: types.maybeNull(types.optional(types.number, 100)),
    globalCalc: types.maybeNull(types.optional(types.string, "Wins by Player")),
    playerCalc: types.maybeNull(types.optional(types.string, "Wins by Type")),
    gamesCalc: types.maybeNull(types.optional(types.string, "Wins by Type")),
    tab: types.maybeNull(types.optional(types.string, "global")),
    selectedPlayer: types.maybeNull(types.reference(Player)),
  }
).volatile(() => ({
  rawData: null,
})).actions(self => ({
  set(attrs) {
    console.log("Setting: ", attrs);
    each(attrs, (v, k) => {
      self[k] = v;
    });
  },

  setRawData(data) {
    self.rawData = data;
  },

  parseGame(game) {
    const [notes, date, winner, wincon, p1, p2, p3, p4, p5, p6] = game;
    const players = compact([p1, p2, p3, p4, p5, p6].map(player => {
      if (!player) {
        return null;
      }
      const [name, commanderName] = player.split(" / ");
      if (!self.playersByName[name]) {
        self.players.push({ name });
      }
      const playerModel = self.playersByName[name];
      if (playerModel.commanders.indexOf(commander => commander === commanderName) === -1) {
        playerModel.commanders.push(commanderName);
      }
      return {
        player: playerModel.id,
        commander: commanderName,
      }
    }));

    const [winnerName, winnerCommander] = winner.split(" / ");

    const winnerMatchPair = {
      player: self.playersByName[winnerName].id,
      commander: winnerCommander,
    }

    self.games.push({
      players,
      wincon,
      date,
      notes,
      winner: winnerMatchPair,
    });
  },

  loadRawData() {
    self.rawData.data.forEach(game => {
      if (game[1] === "Date") {
        return;
      }

      if (!game[1]) {
        return;
      }

      self.parseGame(game);
    });
    if (self.players.length) {
      self.set({ selectedPlayer: self.players[0].id });
    }
  },
})).views(self => ({
  get playersByName() {
    return keyBy(self.players, 'name');
  },

  get commandersByName() {
    return keyBy(self.commanders, 'name');
  },

  get gamesWithinTimeFrame() {
    console.log("Computing games within timeframe: ", self.timeFrame);
    if (!self.timeFrame) {
      return self.games;
    }
    const length = self.games.length;
    return self.games.slice(length - self.timeFrame, length);
  },

  get gamesWonByPlayer() {
    return groupBy(self.gamesWithinTimeFrame, game => game.winner.player.id);
  },

  get gamesWonByType() {
    return countBy(self.gamesWithinTimeFrame, game => game.wincon ? game.wincon : "Untracked");
  },

  get gamesPlayedByPlayer() {
    return reduce(self.gamesWithinTimeFrame, (res, game) => {
      game.players.forEach(pair => {
        if (!res[pair.player.id]) {
          res[pair.player.id] = [];
        }
        res[pair.player.id].push(game);
      });
      return res;
    }, {})
  },

  get playersWithWins() {
    return compact(self.players.map(player => {
      if (player.gamesWon.length) {
        return player;
      }
      return null;
    }));
  },

  get globalStatsData() {
    const generalizedData = self.playersWithWins.map(player => ({
      x: player.name, y: player.stats[self.globalCalc]
    }))

    return {
      "Games Played by Player": generalizedData,
      "Wins by Player": generalizedData,
      "Win Percentage by Player": generalizedData,
      "Wins by Type": keys(self.gamesWonByType).map(wincon => ({ x: wincon, y: self.gamesWonByType[wincon] })),
      "Wins over Time by Player": self.players.map(player => player.playerStatsData['Wins over Time']),
    };
  },
}));

export default EdhGraphStore;
