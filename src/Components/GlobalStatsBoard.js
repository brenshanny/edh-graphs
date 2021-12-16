import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { VictoryBar } from 'victory';

import { withStore } from "../lib/contextHelpers";
import TimeFrameSelect from './TimeFrameSelect';

@withStore
@observer
class GlobalStatsBoard extends React.Component {
  renderChart = () => {
    const { store } = this.props
    if (!store.gamesWithinTimeFrame.length) {
      return null;
    }

    return (
      <div style={{ height: '800px' }}>
        <VictoryBar
          colorScale="qualitative"
          sortKey={(datum) => datum.y}
          sortOrder="ascending"
          style={{ labels: { fill: "blue", fontSize: 8 } }}
          data={store.globalStatsData[store.globalCalc]}
          labels={({ datum }) => `${datum.x} - ${datum.y}`}
        />
      </div>
    );
  }

  render() {
    const { store } = this.props;
    if (store.tab !== 'global') {
      return null;
    }

    return (
      <div className="global-stats-board">
        <div className="toolbar">
          <TimeFrameSelect />
          <div className="Select calculationSelect">
            <div className="Select-label">Stat Type</div>
            <Select
              options={["Games Played by Player", "Wins by Player", "Win Percentage by Player", "Wins by Type"].map(opt => ({ value: opt, label: opt }))}
              value={store.globalCalc ? { value: store.globalCalc, label: store.globalCalc } : null}
              onChange={val => store.set({ globalCalc: val ? val.value : val })}
            />
          </div>
        </div>
        {this.renderChart()}
      </div>
    );
  }
}

export default GlobalStatsBoard;
