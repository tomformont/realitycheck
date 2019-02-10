import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export class Choice extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('ArtificialScreen')} title="Je suis artificiel"/>
        <Text style={styles.informationChoice}>En cochant cette case, vous devrez apprendre des humains pour construire une intelligence qui les détectera automatiquement</Text>
        <Button onPress={() => this.props.navigation.navigate('RealScreen')} title="Je suis réel"/>
        <Text style={styles.informationChoice}>En cochant cette case, vous devrez détourner et devancer les systèmes de reconnaissance en place pour prouver que vous êtes humain.</Text>

      </View>
    )
  }
};

export default Choice;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
    },
  appTitle: {
    fontSize: 32,
    color: '#fff'
  },
  informationChoice: {
    fontSize: 12,
    color:"#ffffff"
  }
});
