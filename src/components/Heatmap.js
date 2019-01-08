import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { SF_OFFICE_COORDINATE } from '../utils';


const heatmapLayerStyles = MapboxGL.StyleSheet.create({
  heatmapdPoints: {
    heatmapColor: MapboxGL.StyleSheet.source(
      [
        [0, '#FFFFFF00'],
        [0.01, '#FFFFFF'],
        [0.1, '#304CCC'],
        [0.5, '#BA3A3F'],
        [1, 'yellow'],
      ],
      '$heatmapDensity',
      MapboxGL.InterpolationMode.Linear,
    ),
    heatmapWeight: MapboxGL.StyleSheet.source(
      [
        [0, 0],
        [6, 1],
      ],
      'mag',
      MapboxGL.InterpolationMode.Linear,
    ),
    heatmapIntensity: MapboxGL.StyleSheet.camera(
      {
        0: 1,
        9: 3,
      },
      MapboxGL.InterpolationMode.Linear,
    ),
    heatmapRadius: MapboxGL.StyleSheet.camera(
      {
        0: 4,
        9: 30,
      },
      MapboxGL.InterpolationMode.Linear,
    ),
    heatmapOpacity:MapboxGL.StyleSheet.camera(
      {
        0: 0.75,
        16: 1,
      },
      MapboxGL.InterpolationMode.Interval,
    ), 

  },
});

export default class Heatmap extends React.Component {
  render() {
    return (
      <MapboxGL.MapView
        zoomLevel={1}
        centerCoordinate={SF_OFFICE_COORDINATE}
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Light}>
        <MapboxGL.ShapeSource
          id="earthquakes"
          url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
          {/* <MapboxGL.HeatmapLayer
            id="heatmapdPoints"
            style={heatmapLayerStyles.heatmapdPoints}
          /> */}
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    );
  }
}


const styles = StyleSheet.create({
  container:  {
    flex: 1,
  },
});
