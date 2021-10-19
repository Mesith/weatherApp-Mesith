import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const InfoItemView = ({imageSrc, infoValue}) => {
  return (
    <View style={style.infoItemContiner}>
      <Image
        style={{width: 25, height: 25}}
        source={{
          uri: imageSrc,
        }}
      />
      <Text style={style.infoValue}>{infoValue}</Text>
    </View>
  );
};

export default InfoItemView;

const style = StyleSheet.create({
  infoItemContiner: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  infoValue: {
    padding: 10,
    fontSize: 14,
  },
});
