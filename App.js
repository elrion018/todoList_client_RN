import React, {useEffect} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {AppNavigator} from './src/system';
import {store, persistor} from './src/reducers';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    messaging().registerForRemoteNotifications();
    messaging().onMessage(async (remoteMessage) => {
      try {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    });
    messaging()
      .getToken()
      .then((token) => {
        alert(token);
        console.log(token);
        return;
      });
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
