import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';

import { withStore } from "../lib/contextHelpers";

@withStore
@observer
class GameLog extends React.Component {
  getDataSource = () => {
    const data = this.props.store.games.slice().reverse();
    return data.map((game, index) => ({
      ...game,
      key: `${game.date}-${index}`,
    }));
  }

  renderPlayer = (game, index) => {
    const player = game.players[index];
    if (!player) {
      return null;
    }

    return <div>{`${player.player.name} / ${player.commander}`}</div>;

  }

  getColumns = () => {
    return [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      },
      {
        title: "Winner",
        dataIndex: "winner",
        key: "winner",
        render: (text, record, index) => {
          return (
            <div>{`${record.winner.player.name} / ${record.winner.commander}`}</div>
          );
        },
      },
      {
        title: "Wincon",
        dataIndex: "wincon",
        key: "wincon",
      },
      {
        title: "Player 1",
        key: "player1",
        render: (text, record, index) => this.renderPlayer(record, 0)
      },
      {
        title: "Player 2",
        key: "player2",
        render: (text, record, index) => this.renderPlayer(record, 1)
      },
      {
        title: "Player 3",
        key: "player3",
        render: (text, record, index) => this.renderPlayer(record, 2)
      },
      {
        title: "Player 4",
        key: "player4",
        render: (text, record, index) => this.renderPlayer(record, 3)
      },
      {
        title: "Player 5",
        key: "player5",
        render: (text, record, index) => this.renderPlayer(record, 4)
      },
      {
        title: "Player 6",
        key: "player6",
        render: (text, record, index) => this.renderPlayer(record, 5)
      },
    ];
  }
  render() {
    return (
      <Table dataSource={this.getDataSource()} columns={this.getColumns()} size="middle" />
    );
  }
}

export default GameLog;
