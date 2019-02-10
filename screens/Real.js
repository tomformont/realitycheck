import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import io from "socket.io-client";
import { Constants } from 'expo';
var count;

export class Real extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      count:0,
    };
  }


  increment() {
     this.setState({
       count: this.state.count + 1
     });
   };

  componentDidMount() {
    this.socket = io("http://192.168.92.181:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View
        style={styles.instruction}>
        <Text>Vous allez devoir filmer la réalité</Text>
        <Button onPress={() => this.props.navigation.navigate('DashboardRealScreen')} title="Commencer"/>
      </View>

    )
  }
};

export default Real;

const styles = StyleSheet.create({
  instruction:{
    fontSize: 32,
    color:'blue'
  },
  habitNameText: {
    color:'green'
  },
  countText: {
    color:'blue'
  }
});
