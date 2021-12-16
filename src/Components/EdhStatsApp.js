import React from 'react';
import { observer } from "mobx-react";
import cx from 'classnames';

import { withStore } from "../lib/contextHelpers";
import GlobalStatsBoard from './GlobalStatsBoard';
import PlayersStatsBoard from './PlayersStatsBoard';
import GamesStatsBoard from './GamesStatsBoard';

import '../App.css';

@withStore
@observer
class EdhStatsApp extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="App">
        <div className="nav">
          <span className={cx("nav-item", { 'active': store.tab === 'global' })} onClick={() => store.set({ tab: "global" })}>Global Stats</span>
          <span className={cx("nav-item", { 'active': store.tab === 'players'})} onClick={() => store.set({ tab: "players" })}>Player Stats</span>
        </div>
        <GlobalStatsBoard />
        <PlayersStatsBoard />
        <GamesStatsBoard />
      </div>
    );
  }
}

export default EdhStatsApp;
