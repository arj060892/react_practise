import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isUsernameFocused: false,
      isPasswordFocused: false,
      usernameValid: true,
      passwordValid: true,
      userValid: false,
      isLoggingIn: false,
      loginErrorMessage: ""
    };
  }

  onFocusActive(type) {
    if (type == "username") {
      this.setState({ isUsernameFocused: true });
    } else if (type == "password") {
      this.setState({ isPasswordFocused: true });
    }
  }
  userLogin = async () => {
    this.setState({ isLoggingIn: true });
    fetch("https://data.advance88.hasura-app.io/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.warn(responseJson);
        this.setState({ isLoggingIn: false, loginErrorMessage: "" });
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isLoggingIn: false,
          loginErrorMessage: "Invalid Credentials"
        });
      });
  };

  validate(text, type) {
    usernameRegx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    passwordRegx = /^\S+$/;
    if (type == "username") {
      if (usernameRegx.test(text)) {
        this.setState({ usernameValid: true,username:text });
      } else {
        this.setState({ usernameValid: false });
      }
    } else if (type == "password") {
      if (passwordRegx.test(text)) {
        this.setState({ passwordValid: true ,password:text});
      } else {
        this.setState({ passwordValid: false });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#388e3c" />
        <Image
          source={require("../../images/login-logo.png")}
          style={styles.logo}
        />
        <TextInput
          editable={!this.state.isLoggingIn}
          selectTextOnFocus={!this.state.isLoggingIn}
          placeholder="User Name"
          onFocus={() => this.onFocusActive("username")}
          onChangeText={username => this.validate(username, "username")}
          style={[
            this.state.isUsernameFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
            !this.state.usernameValid ? styles.inputTextError : null
          ]}
        />
        {!this.state.usernameValid ? <Text>Username invalid!</Text> : null}

        <TextInput
          secureTextEntry={true}
          editable={!this.state.isLoggingIn}
          selectTextOnFocus={!this.state.isLoggingIn}
          onFocus={() => this.onFocusActive("password")}
          onChangeText={text => this.validate(text, "password")}
          placeholder="Password"
          style={[
            this.state.isPasswordFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
            !this.state.passwordValid ? styles.inputTextError : null
          ]}
        />
        {!this.state.passwordValid ? <Text>Password invalid!</Text> : null}
        {this.state.loginErrorMessage != "" ? (
          <Text>{this.state.loginErrorMessage}</Text>
        ) : null}

        {this.state.isLoggingIn ? (
          <ActivityIndicator
            animating={this.state.isLoggingIn}
            color="#188b0c"
            size="large"
          />
        ) : (
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
                  SignUp
                </Text>
              </TouchableHighlight>
            </View>

            <View style={{ width: "50%" }}>
              <TouchableHighlight
                style={styles.roundedCorners}
                underlayColor="#188b0c"
                onPress={this.userLogin.bind(this)}
              >
                <Text
                  style={[
                    styles.roundedCorners,
                    styles.text,
                    styles.marginLeft
                  ]}
                >
                  Login
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
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
  inputTextError: {
    borderBottomColor: "red",
    borderBottomWidth: 1
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
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
