import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      email: '',
      password:'',
      isNameFocused: false,
      isPasswordFocused: false,
      isMobileFocused: false,
      isEmailFocused: false,
      usernameValid: true,
      passwordValid: true,
      nameValid:true,
      mobileValid:true,
      isSigning: false,
      registerErrorMessage:''
    };
  }
  static navigationOptions = {
    title: "Sign Up"
  };
  onFocusActive(type) {
    if (type == "username") {
      this.setState({ isEmailFocused: true });
    } else if (type == "password") {
      this.setState({ isPasswordFocused: true });
    } else if (type == "name") {
      this.setState({ isNameFocused: true });
    } else if (type == "mobile") {
      this.setState({ isMobileFocused: true });
    }
  }

  userRegister =async ()=>{
    this.setState({ isSigning: true });
    fetch("https://data.advance88.hasura-app.io/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        name: this.state.name,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.warn(responseJson);
        this.setState({ isLoggingIn: false, registerErrorMessage: "" });
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => {
        this.setState({
          isSigning: false,
          registerErrorMessage: "Sign Up failed"
        });
      });

  }
  validate(text, type) {
    usernameRegx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    passwordRegx = /^\S+$/;
    nameRegex=/^[a-zA-Z ]+$/;
    mobileRegex=/^[0]?[789]\d{9}$/;
    if (type == "username") {
      if (usernameRegx.test(text)) {
        this.setState({ usernameValid: true,name:text });
      } else {
        this.setState({ usernameValid: false });
      }
    } else if (type == "password") {
      if (passwordRegx.test(text)) {
        this.setState({ passwordValid: true,password:text });
      } else {
        this.setState({ passwordValid: false });
      }
    } else if (type == "name") {
      if (nameRegex.test(text)) {
        this.setState({ nameValid: true,name:text });
      } else {
        this.setState({ nameValid: false });
      }
    } else if (type == "mobile") {
      if (mobileRegex.test(text)) {
        this.setState({ mobileValid: true,mobile:text });
      } else {
        this.setState({ mobileValid: false });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#388e3c" />
        <Image source={require("../../images/pro-dummy-img.png")} style={styles.profileImg} />
        <TextInput
          onFocus={() => this.onFocusActive("name")}
          placeholder='Enter Your Name'
          editable={!this.state.isSigning}
          selectTextOnFocus={!this.state.isSigning}
          onChangeText={name => this.validate(name, "name")}
          style={[
            this.state.isNameFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
              !this.state.nameValid ? styles.inputTextError : null
          ]}
        />
         {!this.state.nameValid ? <Text>Name invalid!</Text> : null}

        <TextInput
          onFocus={() => this.onFocusActive("username")}
          placeholder='Enter Your Email-ID'
          editable={!this.state.isSigning}
          selectTextOnFocus={!this.state.isSigning}
          onChangeText={username => this.validate(username, "username")}
          style={[
            this.state.isEmailFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
              !this.state.usernameValid ? styles.inputTextError : null
          ]}
        />
         {!this.state.usernameValid ? <Text>Email invalid!</Text> : null}

          <TextInput
          onFocus={() => this.onFocusActive("mobile")}
          placeholder='Enter Mobile Number'
          editable={!this.state.isSigning}
          selectTextOnFocus={!this.state.isSigning}
          onChangeText={mobile => this.validate(mobile, "mobile")}
          style={[
            this.state.isMobileFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
              !this.state.mobileValid ? styles.inputTextError : null
          ]}
        />
         {!this.state.mobileValid ? <Text>Mobile Number invalid!</Text> : null}
         <TextInput
          onFocus={() => this.onFocusActive("password")}
          placeholder='Enter Your Password'
          editable={!this.state.isSigning}
          selectTextOnFocus={!this.state.isSigning}
          onChangeText={password => this.validate(password, "password")}
          style={[
            this.state.isPasswordFocused
              ? styles.inputTextActive
              : styles.inputTextGrey,
              !this.state.passwordValid ? styles.inputTextError : null
          ]}
        />
         {!this.state.passwordValid ? <Text>Password invalid!</Text> : null}
 {this.state.registerErrorMessage != "" ? (
          <Text>{this.state.registerErrorMessage}</Text>
        ) : null}
       {this.state.isSigning ? (
          <ActivityIndicator
            animating={this.state.isLoggingIn}
            color="#188b0c"
            size="large"
          />
        ) :  (<View style={styles.bottom}>
        <TouchableHighlight>
                style={styles.roundedCorners}
                underlayColor="#188b0c"
                onPress={this.userRegister.bind(this)}
              >
          <Text style={styles.submitText}>SUBMIT</Text>
              </TouchableHighlight>
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
  profileImg: {
    width: 135,
    height: 135,
    marginBottom: 24
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
  bottom: {
    marginTop: 24,
    position: "absolute",
    margin: "auto",
    bottom: 0,
    width: "98%",
    backgroundColor: "#188b0c",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  submitText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF"
  },
  inputTextError: {
    borderBottomColor: "red",
    borderBottomWidth: 1
  },
});
