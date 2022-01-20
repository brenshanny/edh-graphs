import React from 'react';
import { observer } from 'mobx-react';

import { withStore } from "../lib/contextHelpers";

@withStore
@observer
class GameLog extends React.Component {
  render() {
    return <div>Game Log Here</div>;
  }
}

export default GameLog;
