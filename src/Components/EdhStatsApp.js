import React from 'react';
import { observer } from "mobx-react";
import cx from 'classnames';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { withStore } from "../lib/contextHelpers";
import GlobalStatsBoard from './GlobalStatsBoard';
import PlayersStatsBoard from './PlayersStatsBoard';
import GamesStatsBoard from './GamesStatsBoard';
import GameLog from './GameLog';

import 'antd/dist/antd.css';
import '../App.css';

// TODO use later
// <Menu.Item key="games">Game List</Menu.Item>

@withStore
@observer
class EdhStatsApp extends React.Component {
  get contentComponentMap() {
    return {
      "global": GlobalStatsBoard,
      "players": PlayersStatsBoard,
      "games": GamesStatsBoard,
      "gameLog": GameLog,
    };
  }

  render() {
    const { store } = this.props;
    const ContentComponent = this.contentComponentMap[store.tab];
    return (
      <Layout>
        <Layout.Header className="header">
          <div className="header-title">ElderDoddyHighlanders</div>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={({ key }) => {store.set({ tab: key })}}
            selectedKeys={[store.tab]}
            defaultSelectedKeys={['global']}
          >
            <Menu.Item key="global">Global Stats</Menu.Item>
            <Menu.Item key="players">Player Stats</Menu.Item>
            <Menu.Item key="gameLog">Game Log</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Layout.Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ContentComponent />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default EdhStatsApp;
