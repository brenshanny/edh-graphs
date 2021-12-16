import React from 'react';
import { readString } from 'react-papaparse';

import EdhGraphsStore from './store/EdhGraphsStore';
import EdhStatsApp from './Components/EdhStatsApp';
import { StoreProvider } from './lib/contextHelpers';

import stats from './stats.csv';

const store = EdhGraphsStore.create({});
window.store = store;

const papaConfig = {
  complete: (results, file) => {
    store.setRawData(results);
    store.loadRawData();
  },
  download: true,
  error: (error, file) => {
    console.log('Error while parsing:', error, file);
  },
};
readString(stats, papaConfig);


function App() {
  return (
    <StoreProvider store={store}>
      <EdhStatsApp />
    </StoreProvider>
  );
}

export default App;
