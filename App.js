import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomepageScreen from './screens/homepageScreen';
import HomefilterScreen from './screens/homefilterScreen';
import MapScreen from './screens/mapScreen';
import ConnectScreen from './screens/connectScreen';
import FilterScreen from './screens/filterScreen';
import QuestScreen from './screens/questScreen';
import TrophyScreen from './screens/trophyScreen';
import SignupScreen from './screens/signupScreen';
import SigninScreen from './screens/signinScreen';
import TutoScreen from './screens/tutoScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut, faTrophy, faMapLocationDot, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import token from './reducers/token';
import category from './reducers/category'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers({ token, category }))

var fakeComponent = () => {
  return null
}

var StackNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = faMapLocationDot
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
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Filter" component={fakeComponent} options={{ tabBarButton: () => (<FilterScreen />), }} />
      <Tab.Screen name="Quest" component={fakeComponent} options={{ tabBarButton: () => (<QuestScreen />), }} />
      <Tab.Screen name="Trophy" component={fakeComponent} options={{ tabBarButton: () => (<TrophyScreen />), }} />
      <Tab.Screen name="Profil" component={ConnectScreen} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomepageScreen} />
          <Stack.Screen name="HomeFilter" component={HomefilterScreen} />
          <Stack.Screen name="TutoScreen" component={TutoScreen} />
          <Stack.Screen name="StackNavigation" component={StackNavigation} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          <Stack.Screen name="SignIn" component={SigninScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
