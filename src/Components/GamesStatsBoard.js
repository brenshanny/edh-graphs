import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { VictoryBar } from 'victory';

import { withStore } from "../lib/contextHelpers";
import TimeFrameSelect from './TimeFrameSelect';

@withStore
@observer
class GamesStatsBoard extends React.Component {
  renderChart = () => {
    const { store } = this.props
    if (!store.gamesWithinTimeFrame.length) {
      return null;
    }

    // -------------------------------
    // wins over time
    // games played per month
    // wins per commander

    return (
      <div style={{ height: '800px' }}>
        <VictoryBar
          colorScale="qualitative"
          sortKey={(datum) => datum.y}
          sortOrder="ascending"
          style={{ labels: { fill: "blue", fontSize: 8 } }}
          data={store.playersWithWins.map(player => ({
            x: player.name, y: player.stats[store.calculation]
          }))}
          labels={({ datum }) => `${datum.x} - ${datum.y}`}
        />
      </div>
    );
  }

  render() {
    const { store } = this.props;
    if (store.tab !== 'games') {
      return null;
    }

    return (
      <div className="global-stats-board">
        <div className="toolbar">
          <TimeFrameSelect />
          <div className="calculationSelect">
            <Select
              options={["Win Percentage by Games Played", "Games Played", "Wins", "Win Percentage"].map(opt => ({ value: opt, label: opt }))}
              value={store.calculation ? { value: store.calculation, label: store.calculation } : null}
              onChange={val => store.set({ calculation: val ? val.value : val })}
            />
          </div>
        </div>
        {this.renderChart()}
      </div>
    );
  }
}

export default GamesStatsBoard;
