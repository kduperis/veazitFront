import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import homepageScreen from './screens/homepageScreen';
import homefilterScreen from './screens/homefilterScreen';
import mapScreen from './screens/mapScreen';
import connectScreen from './screens/connectScreen';
import filterScreen from './screens/filterScreen';
import questScreen from './screens/questScreen';
import trophyScreen from './screens/trophyScreen';
import signupScreen from './screens/signupScreen';
import signinScreen from './screens/signinScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut, faTrophy, faMapLocationDot, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons'
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux'
import token from './reducers/token';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers({token}))

var stackNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = faMapLocationDot
        } else if (route.name === 'Filter') {
          iconName = faFilter
        } else if (route.name === 'Quest') {
          iconName = faFortAwesome
        } else if (route.name === 'Trophy') {
          iconName = faTrophy
        } else if (route.name === 'Profil') {
          iconName = faUserAstronaut
        }
        return <FontAwesomeIcon icon={iconName} color={color} />;
      },
    })}

      tabBarOptions={{
        activeTintColor: '#06D4B6',
        inactiveTintColor: '#4b667f',
        style: {
          backgroundColor: '#2C3A47',
        }
      }}

    >
      <Tab.Screen name="Map" component={mapScreen} />
      <Tab.Screen name="Filter" component={filterScreen} />
      <Tab.Screen name="Quest" component={questScreen} />
      <Tab.Screen name="Trophy" component={trophyScreen} />
      <Tab.Screen name="Profil" component={connectScreen} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home" component={homepageScreen}/>
          <Stack.Screen name="HomeFilter" component={homefilterScreen} />
          <Stack.Screen name="StackNavigation" component={stackNavigation} />
          <Stack.Screen name="SignUp" component={signupScreen} />
          <Stack.Screen name="SignIn" component={signinScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
