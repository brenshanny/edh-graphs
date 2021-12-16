import React from 'react';
import { observer } from "mobx-react";

import { withStore } from "../lib/contextHelpers";
import GlobalStatsBoard from './GlobalStatsBoard';
import PlayersStatsBoard from './PlayersStatsBoard';
import GamesStatsBoard from './GamesStatsBoard';

@withStore
@observer
class EdhStatsApp extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="App">
        <div className="nav">
          <span onClick={() => store.set({ tab: "global" })}>Global</span>
          <span onClick={() => store.set({ tab: "players" })}>Players</span>
          <span onClick={() => store.set({ tab: "games" })}>Games</span>
        </div>
        <GlobalStatsBoard />
        <PlayersStatsBoard />
        <GamesStatsBoard />
      </div>
    );
  }
}

export default EdhStatsApp;
