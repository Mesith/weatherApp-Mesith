import React from 'react';
import {StyleSheet, Text} from 'react-native';

const LocationHeaderView = ({city}) => {
  return <Text style={style.tempStyle}>{city}</Text>;
};

export default LocationHeaderView;

const style = StyleSheet.create({
  tempStyle: {
    fontSize: 32,
    padding: 20,
    fontWeight: '700',
  },
});
