import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardList from './CardList';
import CardDetails from "./CardDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();

const Details = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CardList" component={CardList} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
    </Stack.Navigator>
  );
};

export default Details;
