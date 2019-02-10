import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, StatusBar, Image, Button } from "react-native";
import io from "socket.io-client";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CheckBox from 'react-native-checkbox-component';
import { Constants, FileSystem, Asset } from "expo";
import { Permissions } from "expo-permissions";
import { Camera } from "expo-camera";


export default class DashboardArtificial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      newPicture: "",
      newPictures: []
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.64.30:3000");

    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      },1000)
    });

    this.socket.on("new picture", newP => {
      this.setState({ newPictures: [...this.state.newPictures, newP] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }



  render() {
  const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text
        style={styles.arrayObjects}
        key={chatMessage}>
        {chatMessage}
      </Text>
    ));
/*
  const newPictures = this.state.newPictures.map((newPicture,item) => (
    return(
      <Image
        style={styles.arrayPictures}
        key={newPicture}
        source={{uri: 'data:image/png,'+ {newPicture}}}
        />
      )
    ));
*/

/*
const newPictures = this.state.newPictures.map(newPicture => {
  console.log(newPicture);
  return (
        <Image
          style={styles.arrayPictures}
          key={newPicture}
          source={{uri: 'data:image/png;base64,{newPicture}'}}
          />
        )
      });
*/


const newPictures = this.state.newPictures.map((newPicture,index) => {
        console.log(newPicture);
        console.log(index);
        return (
              <Image
                style={styles.arrayPictures}
                key={index}
                source={{uri: `data:image/png;base64,${newPicture}`}}

                />
              )
            });



/*
      render() {
    const contents = this.state.cards.map((item, index) => {
      return (
          <Card>
            <Image
                key={index}
                source={{uri: {item.url}}} />
          </Card>
      )
    });

*/


    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />

        <Text style={styles.headerArtificial}>
        </Text>
        <View style={styles.terminalWindow}>
          <Text style={styles.terminalText}>
          </Text>
        </View>
        <View
          style={styles.dashboardData}>
          {newPictures}
        <View
          style={styles.performance}>
            <View
              style={styles.encartData}>
                <Text style={styles.realityTag}>💸 CASHFLOW</Text>
                <Text
                  style={styles.dataPerformance}>
                  000,000
                </Text>
            </View>
            <View
              style={styles.encartData}>
                <Text style={styles.realityTag}>🧮 OPÉRATION</Text>
                <Text
                  style={styles.dataPerformance}>
                  000,000
                </Text>
            </View>
        </View>
        <View
          style={styles.encartData}>
            <Text style={styles.realityTag}>💬 REALITY WINDOW</Text>
            <TextInput
              style={styles.realityInput}
              autoCorrect={false}
              Text='Entrer un objet du réel'
              color='#ffffff'
              value={this.state.chatMessage}
              onSubmitEditing={() => this.submitChatMessage()}
              onChangeText={chatMessage => {
                this.setState({ chatMessage });
              }}
            />
          </View>
          {chatMessages}
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    height: hp("100%"),
    width: wp("100%")
  },
  terminalWindow: {
    padding: 10,
    height: hp("20%"),
    color: "red",
    borderBottomWidth:0.5,
    borderBottomColor:"#ffffff"
  },
  terminalText: {
    fontSize:6,
    color:'#ffffff'
  },
  headerArtificial: {
    color: "grey",
    height: hp('2%'),
    backgroundColor:'#000000',
    fontSize: 10,
    padding: 10,
    alignItems: "center"
  },
  dashboardData:{
    alignItems: 'center',
    marginTop: 20,
  },
  arrayObjects: {
    color:"#ffffff",
    fontSize: 54,
  },
  arrayPictures: {
    width:100,
    height:100,
    resizeMode: 'contain',
    borderWidth:0.5,
    borderColor:'white'
  },
  realityTag: {
    color: "#ffffff",
    marginBottom: -8,
    fontSize: 10,
    backgroundColor: '#141414',
    width: wp('30%'),
    zIndex: 100
  },
  realityInput: {
    height: 60,
    width: wp("95%"),
    borderWidth: 0.5,
    borderColor: "#ffffff",
    color: "#ffffff",
    padding: 10
  },
  performance:{
    flexDirection: 'row',
  },
  encartData:{
    marginTop:10,
  },
  dataPerformance:{
    width: wp('46%'),
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    color:'#ffffff',
    padding: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff'
  },
});
