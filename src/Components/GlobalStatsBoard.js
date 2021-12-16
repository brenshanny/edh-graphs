import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { VictoryBar } from 'victory';

import { withStore } from "../services/store";
import TimeFrameSelect from './TimeFrameSelect';

@withStore
@observer
class GlobalStatsBoard extends React.Component {
  renderChart = () => {
    if (this.props.store.gamesWithinTimeFrame.length) {
      return null;
    }

    return (
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
    );
  }

  render() {
    const { store } = this.props;
    return (
      <div className="global-stats-board>
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
        <div style={{ height: '800px' }}>
          {chart}
        </div>
      </div>
    );
  }
));
