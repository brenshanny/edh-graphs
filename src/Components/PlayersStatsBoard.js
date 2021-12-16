import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { VictoryPie, VictoryBar } from 'victory';

import { withStore } from "../lib/contextHelpers";
import TimeFrameSelect from './TimeFrameSelect';

@withStore
@observer
class PlayersStatsBoard extends React.Component {
  get chartMap() {
    return {
      "Wins by Type": VictoryBar,
      "Win Percentage": VictoryPie,
    }
  }

  renderChart = () => {
    const { store } = this.props
    if (!store.gamesWithinTimeFrame.length) {
      return null;
    }

    if (!store.selectedPlayer) {
      return null;
    }

    // -------------------------------
    // wins over time
    // wins per month
    // wins per commander

    const DesiredChart = this.chartMap[store.playerCalc];

    return (
      <div style={{ height: '800px' }}>
        <DesiredChart
          colorScale= "qualitative"
          sortKey={(datum) => datum.y}
          sortOrder="ascending"
          style={{ labels: { fill: "blue", fontSize: 8 } }}
          data={store.selectedPlayer.playerStatsData[store.playerCalc]}
          labels={({ datum }) => `${datum.x} - ${datum.y}`}
        />
      </div>
    );
  }

  render() {
    const { store } = this.props;
    if (store.tab !== 'players') {
      return null;
    }

    return (
      <div className="players-stats-board">
        <div className="toolbar">
          <TimeFrameSelect />
          <div className="playerSelect">
            <Select
              options={store.players.map(player => ({ value: player.id, label: player.name }))}
              value={store.selectedPlayer ? { value: store.selectedPlayer.id, label: store.selectedPlayer.name } : null}
              onChange={val => store.set({ selectedPlayer: val ? val.value : val })}
            />
          </div>
          <div className="calculationSelect">
            <Select
              options={["Wins by Type", "Win Percentage"].map(opt => ({ value: opt, label: opt }))}
              value={store.playerCalc ? { value: store.playerCalc, label: store.playerCalc } : null}
              onChange={val => store.set({ playerCalc: val ? val.value : val })}
            />
          </div>
        </div>
        {this.renderChart()}
      </div>
    );
  }
}

export default PlayersStatsBoard;
