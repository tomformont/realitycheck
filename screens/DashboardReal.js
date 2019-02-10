import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button, StatusBar, Image } from "react-native";
import { Permissions } from "expo-permissions";
import { Camera } from "expo-camera";
import { Constants, FileSystem, Asset } from "expo";
import io from "socket.io-client";


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class DashboardReal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPicture: "",
      counting: 0,
      newPictures: [],
      chatMessage: "",
      chatMessages: []
    };

  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    PicturePath: ""
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
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
      setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      },1000)
    });

  }

  takePicture = () => {
    this.camera
      .takePictureAsync({
        base64: true,
        quality: 0.1,
        compress:0,
        exif: false
      })
      .then(data => {
        //console.log(data.base64);
        const newPicture = data.base64;
        this.setState({ newPicture });
      });
    this.socket.emit("new picture", this.state.newPicture);
    this.setState({ newPicture: "" });
    this.setState({counting: this.state.counting+1});

  };
  /*
saveAvatar = async (uri) => {
   await Expo.FileSystem.moveAsync({
   from: uri,
   to: Expo.FileSystem.documentDirectory + 'avatar/profile'
  })
}
*/


  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text
        style={styles.arrayObjects}
        key={chatMessage}>{chatMessage}</Text>
    ));


    const newPictures = this.state.newPictures.map(newPicture => (
      <Text
        style={styles.arrayObjects}
        key={newPicture}>{newPicture}</Text>
    ));

    const wordCounter = this.state.counting
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

          <Camera
            style={{ flex: 1 }}
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
            >
          <View style={styles.multipleElements}>
            <View style={styles.headerContainer}>
              <Text style={styles.instructionProgress}>
                IDENTIFICATION DE LA RÉALITÉ - {wordCounter*4}%
              </Text>
              <View style={styles.progressBarContainer}>
              <View style={{
                  width: wordCounter*4,
                  height: 16,
                  backgroundColor:'#005CFF'}}>
              </View>
              </View>
              <Text style={styles.instructionProgress}>
                 En attente de l'identification de {chatMessages[wordCounter]}
              </Text>
            </View>
            <View>
            </View>
            <View style={styles.buttonCTA}>
              <Button
                style={styles.textButton}
                onPress={this.takePicture.bind(this)}
                title="CAPTURER L'OBJET"
                color='white'
              />
            </View>
            </View>
            </View>

          </Camera>
          <View>
        </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  searchObject: {
    fontSize: 26,
    margin: 20
  },
  multipleElements: {
    alignItems:'center',
  },
  buttonCTA: {
    backgroundColor: "#005CFF",
    borderWidth: 2,
    borderColor: "white",
    width:wp ('50%'),
    marginTop: hp('20%'),
    shadowColor: 'black',
    shadowOffset: {width:7, height:7},
    shadowOpacity: (0.6),
    shadowRadius: (0)
  },
  textButton: {
    color: 'white',
    fontSize:20,
    margin:10,
  },
  progressBarContainer: {
    width: wp('80%'),
    marginLeft:10,
    height: 20,
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: {width:7, height:7},
    shadowOpacity: (0.6),
    borderWidth:2,
    borderColor: 'white',
    shadowRadius: (0)
  },
  headerContainer: {
    width: wp('90%'),
    backgroundColor: '#005CFF',
    borderWidth: 2,
    marginTop: hp('2%'),
    borderColor: "white",
    shadowColor: 'black',
    shadowOffset: {width:7, height:7},
    shadowOpacity: (0.6),
    shadowRadius: (0)
  },
  instructionProgress: {
    fontSize: 16,
    color: 'white',
    margin: 10,
  }
});
