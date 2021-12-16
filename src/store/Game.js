import { types } from 'mobx-state-tree';

import MatchPair from './MatchPair';

const Game = types.model(
  "Game",
  {
    winner: types.maybeNull(MatchPair),
    players: types.array(MatchPair),
    wincon: types.maybeNull(types.string),
    date: types.maybeNull(types.string),
    notes: types.maybeNull(types.string),
  },
);

export default Game;
