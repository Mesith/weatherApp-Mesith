import * as React from 'react';
import {
  Alert,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from './appNavigator';
import GetLocation from 'react-native-get-location';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_LOCATION,
} from '../../actions/actionTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HelpScreen from './helpScreen';
import {
  getCurrentWeather,
  getForcastWeather,
} from '../../reducers/weatherReducer';
import LocationHeaderView from '../components/locationHeader';
import WeatherView from '../components/weatherView';

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const setLocation = location =>
    dispatch({type: SET_LOCATION, payload: location});

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setLocation({lat: location.latitude, lng: location.longitude});
        dispatch(getCurrentWeather({lat:location.latitude,lng:location.longitude}))
        dispatch(getForcastWeather({lat:location.latitude,lng:location.longitude}))
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={style.weatherCardView}>
        <WeatherView weather={item} />
      </View>
    );
  };

  return (
    <View>
      {state &&
        state.weather.isLoading &&
        <ActivityIndicator size="large" />
      }
      {state &&
        !state.weather.isLoading &&
        Object.keys(state.weather.currentWeather).length !== 0 && (
          <>
            <LocationHeaderView city={state.weather.currentWeather.name} />
            <WeatherView weather={state.weather.currentWeather} />
            <Text style={style.subHeaderStyle}>{'5 Day / 3 Hour Forcast'}</Text>
            <FlatList
              horizontal={true}
              data={state.weather.forcastWeather.list}
              extraData={state.weather.forcastWeather.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </>
        )}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const HomeStack = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
      }}
      initialRouteName="Weather">
      <Tab.Screen
        name="Weather"
        component={HomeScreen}
        options={{
          headerTitle: 'Weather',
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              title="Sign Out"
            />
          ),
        }}
      />
      <Tab.Screen name="Help" component={HelpScreen} options={{}} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  subHeaderStyle: {
    fontSize: 24,
    padding: 20,
    fontWeight: '700',
  },
  weatherCardView: {
    backgroundColor: '#DBD7D7',
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
});

export default HomeStack;
