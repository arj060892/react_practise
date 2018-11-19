import React, { Component } from "react";
import AppStackNavigator from "./src/Router.js";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default createAppContainer(AppStackNavigator);

// import React from "react";
// import { View, Text } from "react-native";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home sd Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   }
// });

// export default createAppContainer(AppNavigator);
