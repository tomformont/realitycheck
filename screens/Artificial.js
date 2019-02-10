import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import io from "socket.io-client";
import { Constants } from "expo";
import TypeWriter from "react-native-typewriter";

export class Artificial extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.terminalWindow}>
          RealityCheck V.1.0 (2019-01-27) Première connexion : 17/01/19 -
          14:30:56
          {"\n"}
          {"\n"}
          RC est un logiciel gratuit sans AUCUNE GARANTIE quant à l’utilisation
          qu’il peut en être faite par les joueurs.
          {"\n"}
          {"\n"}
          RC est un jeu collaboratif avec beaucoup de contributeurs — dont vous.
          Pour plus d’informations tapez ‘info’ et pour connaître la liste des
          contributeurs tapez ‘scoreboard’.
          {"\n"}
          {"\n"}
          Pour commencer un RealityCheck tapez n'importe où sur l'écran.
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate("DashboardArtificialScreen")}
          title="Tapez pour commencer"
        />
      </View>
    );
  }
}

export default Artificial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  terminalWindow: {
    padding: 10,
    fontSize: 14,
    color: "#fff"
  }
});
