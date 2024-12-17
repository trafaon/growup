import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "../screens/LoginScreen";
import { GoalScreen } from "../screens/GoalScreen";
import { RealityScreen } from "../screens/RealityScreen";
import { OptionsScreen } from "../screens/OptionsScreen";
import { WayForwardScreen } from "../screens/WayForwardScreen";
import { SummaryScreen } from "../screens/SummaryScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "PDI - Login" }}
            />
            <StackNavigator.Screen
                name="Goal"
                component={GoalScreen}
                options={{ title: "Define Your Goal" }}
            />
            <StackNavigator.Screen
                name="Reality"
                component={RealityScreen}
                options={{ title: "Current Reality" }}
            />
            <StackNavigator.Screen
                name="Options"
                component={OptionsScreen}
                options={{ title: "Explore Options" }}
            />
            <StackNavigator.Screen
                name="WayForward"
                component={WayForwardScreen}
                options={{ title: "Way Forward" }}
            />
            <StackNavigator.Screen
                name="Summary"
                component={SummaryScreen}
                options={{ title: "PDI Summary" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);