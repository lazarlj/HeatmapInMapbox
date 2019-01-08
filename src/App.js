import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// utils
import { IS_ANDROID } from './utils';
import config from './utils/config';

import Heatmap from './components/Heatmap';


MapboxGL.setAccessToken(config.get('accessToken'));


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
    };
  }

  async componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }

  render() {
    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <View style={styles.container}>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Heatmap />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:  {
    flex: 1,
  },
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
