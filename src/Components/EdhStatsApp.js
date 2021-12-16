import React from 'react';
import { observer } from "mobx-react";
import { VictoryBar } from 'victory';

import { withStore } from "../services/store";
import GlobalStatsBoard from './GlobalStatsBoard';

@withStore
@observer
class EdhStatsApp extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="nav">
          <span>Global</span>
          <span>Players</span>
          <span>Games</span>
        </div>
        <GlobalStatsBoard />
      </div>
    );
  }
}
