import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import io from "socket.io-client";
import { Constants, Camera, Permissions, FileSystem } from "expo";

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons'

if (this.camera) {
  this.camera.takePictureAsync().then(data => console.log(data));
}

export default class DahsboardReal extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: "",
    url: "",
    photo:""

  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.94.152:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  takePicture = () => {
     if (this.camera){
        console.log('worked');
       this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
       console.log(photo.uri);
     }
   };



  onPictureSaved = async photo => {
  await FileSystem.moveAsync({
    from: photo.uri,
    to: Expo.FileSystem.documentDirectory + 'photos/myFile'
    //to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
  });
  this.setState({ newPhotos: true });

}

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          /*<Text style={styles.instructionHeader}>
            Trouvez un(e) {chatMessages} et capturez le pour prouver que vous
            êtes réel.
          </Text>*/
            <View style={{ flex: 1 }}>

              <Camera
                style={{ flex: 1 }}
                type={this.state.type}
                ref={ref => {
                    this.camera = ref;
}
}
              >

                <View
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    flexDirection: "row"
                  }}
                >
                <View style={styles.headerLoad}>
                <Text style={styles.instructionHeader}>
                Pour prouver que vous êtes humain, commencez par scanner un(e){chatMessages}
                </Text>
                </View>
                </View>
              </Camera>
              <TouchableOpacity
               onPress={this.takePicture}
               style={{ alignSelf: 'center' }}
             >
               <Ionicons name="ios-radio-button-on" size={70} color="black" />
             </TouchableOpacity>

            </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  instruction: {
    fontSize: 32,
    color: "blue"
  },
  habitNameText: {
    color: "green"
  },
  countText: {
    color: "blue"
  },
  buttonStyle: {
    color: "black",
    fontSize: 32,
    backgroundColor: "red"
  },
  headerLoad: {
    height: hp('10%'),
    width: wp ('90%'),
    marginTop: hp('5%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    backgroundColor: 'black'
  },
  instructionHeader: {
    fontSize: 16,
    marginTop:20,
    color: "#ffffff"
  }
});
