import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {TodoBox, ToDay, NextWeek, Projects} from '../../pages/Main';
import {Login, Register} from '../../pages/RegisterAndLogin';

function TodoBoxFuc({navigation}) {
  return <TodoBox navigation={navigation}></TodoBox>;
}

function ToDayFuc({navigation}) {
  return <ToDay navigation={navigation}></ToDay>;
}

function NextWeekFuc({navigation}) {
  return <NextWeek navigation={navigation}></NextWeek>;
}

function ProjectsFuc({navigation}) {
  return <Projects navigation={navigation}></Projects>;
}

function LoginFuc({navigation}) {
  return <Login navigation={navigation}></Login>;
}

function RegisterFuc({navigation}) {
  return <Register navigation={navigation}></Register>;
}

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MyMain() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginFuc} />
      <Stack.Screen name="Register" component={RegisterFuc} />
      <Stack.Screen name="Drawer" component={MyDrawer}></Stack.Screen>
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Projects">
      <Drawer.Screen
        name="TodoBox"
        component={TodoBoxFuc}
        options={{drawerLabel: '관리함'}}
      />
      <Drawer.Screen
        name="ToDay"
        component={ToDayFuc}
        options={{drawerLabel: '오늘'}}
      />
      <Drawer.Screen
        name="NextWeek"
        component={NextWeekFuc}
        options={{drawerLabel: '다음 7일'}}
      />
      <Drawer.Screen
        name="Projects"
        component={ProjectsFuc}
        options={{drawerLabel: '프로젝트'}}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MyMain />
    </NavigationContainer>
  );
}
