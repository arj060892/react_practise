import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  TextInput,
  TouchableHighlight
} from "react-native";

const logo = require("../../images/login-logo.png");
const loginText = "Login";
const signup = "Signup";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "User Name",
      password: "Password",
      isUsernameFocused: false,
      isPasswordFocused: false
    };
  }
  onFocusChangeUsername = () => {
    this.setState({ isUsernameFocused: true });
  };
  onFocusChangePassword = () => {
    this.setState({ isPasswordFocused: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#388e3c" />
        <Image source={logo} style={styles.logo} />
        <TextInput
          placeholder={this.state.username}
          onFocus={() => this.onFocusChangeUsername()}
          style={
            this.state.isUsernameFocused
              ? styles.inputTextActive
              : styles.inputTextGrey
          }
        />

        <TextInput
          secureTextEntry={true}
          onFocus={() => this.onFocusChangePassword()}
          placeholder={this.state.password}
          style={
            this.state.isPasswordFocused
              ? styles.inputTextActive
              : styles.inputTextGrey
          }
        />

        <View style={{ flexDirection: "row", width: "80%", marginTop: 20 }}>
          <View style={{ width: "50%" }}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Register")}
              style={styles.roundedCorners}
              underlayColor="#188b0c"
            >
              <Text
                style={[
                  styles.roundedCorners,
                  styles.textButtonLight,
                  styles.marginRight
                ]}
              >
                {signup}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={[styles.text, styles.marginLeft]}>{loginText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto"
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    color: "#FFFFFF",
    backgroundColor: "#188b0c",
    borderRadius: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  textButtonLight: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    color: "#767676",
    borderColor: "#d4d4d4",
    borderWidth: 1,
    textAlign: "center"
  },
  roundedCorners: {
    borderRadius: 20
  },
  inputTextGrey: {
    width: "90%",
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 1,
    textAlign: "center",
    marginBottom: 24,
    color: "#d4d4d4",
    fontWeight: "bold",
    fontSize: 18
  },
  inputTextActive: {
    width: "90%",
    borderBottomColor: "#fe9a44",
    borderBottomWidth: 1,
    textAlign: "center",
    marginBottom: 24,
    color: "#767676",
    fontWeight: "bold",
    fontSize: 18
  },
  marginLeft: {
    marginLeft: 10
  },
  marginRight: {
    marginRight: 10
  }
});
