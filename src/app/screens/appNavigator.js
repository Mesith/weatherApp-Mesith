import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './splashScreen';
import SignInScreen from './signInScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './homeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../../actions/actionTypes';

// @ts-ignore
export const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({type: RESTORE_TOKEN, token: null});
    }, 2000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        if (data.username === 'Test@test.com' && data.password ==='Test@123') {
         dispatch({type: SIGN_IN, token: 'dummy-auth-token'});
        } else {
          dispatch({type: SIGN_IN, token: null});
          alert('Sign in Error')
        }
      },
      signOut: () => {
        dispatch({type: SIGN_OUT});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.auth.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.auth.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeStack}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
