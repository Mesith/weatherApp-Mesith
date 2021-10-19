import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import InfoItemView from './infoItemView';
import TemparatureView from './temparature';

const WeatherView = ({weather}) => {
  return (
    <View style={style.weatherContainer}>
      <View style={style.textContentStyle}>
        <TemparatureView temparature={weather?.main?.temp} />
        <Text style={style.infoItem}>{weather?.weather[0].main}</Text>
        <Text
          style={
            style.infoItem
          }>{`Feel Like ${weather?.main?.feels_like}`}</Text>
        <Text
          style={
            style.infoItem
          }>{`Day ${weather?.main?.temp_max} Night ${weather?.main?.temp_min}`}</Text>
        <Text
          style={
            style.infoItem
          }>{`Humidity ${weather?.main?.humidity}% ${weather?.weather[0].description}`}</Text>
      </View>
      <View style={style.iconContentStyle}>
        <Image
          style={{width: 50, height: 50}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/252/252035.png',
          }}
        />
        <InfoItemView imageSrc="https://www.iconsdb.com/icons/preview/caribbean-blue/rain-xxl.png" infoValue={weather?.wind?.speed}/>
        <InfoItemView imageSrc="https://w7.pngwing.com/pngs/285/581/png-transparent-windsock-artpostel-ivanovo-meteorology-fritz-g-m-b-h-kalte-klima-luftung-cool-weather-thumbnail.png" infoValue={weather?.wind?.deg}/>
      </View>
    </View>
  );
};

export default WeatherView;

const style = StyleSheet.create({
  weatherContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    marginRight:5,
    marginLeft:5,
    flexDirection: 'row',
  },
  textContentStyle: {
    flexDirection: 'column',
    flexGrow: 3,
  },
  iconContentStyle: {
    flexDirection: 'column',
    display: 'flex',
    flexGrow: 2,
    alignItems: 'center',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
  },
  infoItem: {
    paddingBottom: 10,
    fontSize: 16,
  },
});
