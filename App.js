import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppNavigator} from './src/system';
import {store, persistor} from './src/reducers';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <View style={styles.container}>
            <AppNavigator ref={(el) => (this.navigation = el)} />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
