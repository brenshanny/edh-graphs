import React from 'react';
import { observer } from "mobx-react";
import Select from 'react-select';

import { withStore } from "../lib/contextHelpers";

@withStore
@observer
class TimeFrameSelect extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="Select timeFrameSelect">
        <div className="Select-label">Number of Games</div>
        <Select
          options={[10, 25, 50, 100, store.games.length].map(opt => ({ value: opt, label: `${opt} Games`}))}
          value={store.timeFrame ? { value: store.timeFrame, label: `${store.timeFrame} - Games` } : null}
          onChange={val => store.set({ timeFrame: val ? val.value : val })}
        />
      </div>
    );
  }
}

export default TimeFrameSelect;
