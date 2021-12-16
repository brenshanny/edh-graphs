import { types } from 'mobx-state-tree';

import Player from './Player';

const MatchPair = types.model(
  "MatchPair",
  {
    player: types.reference(types.late(() => Player)),
    commander: types.string,
  },
);

export default MatchPair;
