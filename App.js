import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';
import { Camera, Permissions } from 'expo';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleApp}>RealityCheck</Text>
        <Button
          title="Je crois que je suis réel"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'Details' })
                  ],
                }))
              }}
          />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleApp}>Choisissez votre personnage</Text>
          <Button
          title="Je suis le joueur A"
          onPress={() => {
          this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
          NavigationActions.navigate({ routeName: 'JoueurA' })
                ],
              }))
            }}
        />
        <Button
        title="Je suis le joueur B"
        onPress={() => {
        this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
        NavigationActions.navigate({ routeName: 'JoueurB' })
              ],
            }))
          }}
      />

      </View>
    );
  }
}


class JoueurAScreen extends React.Component {
  render() {
    return (
      <View style={styles.terminalIndication}>
        <Text style={styles.introduction}>RealityCheck V.1.0 (2019-01-27)
Première connexion : 17/01/19 - 14:30:56
{"\n"}{"\n"}
RC est un logiciel gratuit sans AUCUNE GARANTIE quant à l’utilisation qu’il peut en être faite par les joueurs.
{"\n"}{"\n"}
RC est un jeu collaboratif avec beaucoup de contributeurs — dont vous. Pour plus d’informations tapez ‘info’ et pour connaître la liste des contributeurs tapez ‘scoreboard’.
{"\n"}{"\n"}
Pour commencer un RealityCheck tapez ‘demo’ ou ‘start’.
        </Text>
      </View>
    );
  }
}

class JoueurBScreen extends React.Component {
  state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
      <View style={styles.playerInstruction}>
        <Text>Scannez le plus d'objet pour prouver que vous êtes dans le monde réel !</Text>
        <Text>Trouvez un <a>tabouret</a></Text>
      </View>
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    };
  }



const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
  JoueurA: {
    screen: JoueurAScreen,
  },
  JoueurB: {
    screen: JoueurBScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleApp:{
    color: '#fff',
    fontSize: 32
  },
  captchaCheck:{
    color:'#acacac',
    marginTop:20,
    fontSize:18
  },
  terminalIndication: {
    backgroundColor: '#000',
  },
  introduction: {
    color: '#fff',
    margin: 10
  }

});
