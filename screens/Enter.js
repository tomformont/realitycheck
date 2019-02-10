import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Font } from 'expo';





export class Enter extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>RealityCheck</Text>
        <Button onPress={() => this.props.navigation.navigate('ChoiceScreen')} title="commencer"/>
      </View>
    )
  }
}

export default Enter;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    },
  appTitle: {
    fontSize: 32,
    color: '#fff'
  }
});
