import { useContext } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

export default function WhoScreen(props) {

  const theme = useContext(themeContext);

  return (

    <View style={[styles.content, { backgroundColor: theme.background }]}>
      <Text style={[styles.contentTitle, { color: theme.color }]}>Qui est la Bande à Picsou ?</Text>
      <View>
        <View flexDirection='row' style={{ alignItems: 'center', width: '70%', marginTop: 25}}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646841698/veazit/kevin_jrojd2.jpg' }}
            size={150}
            rounded={true}
            marginTop={5}
            marginBottom={10}
          />
          <View style={{flexDirection:'column', alignItems: 'flex-start', width: '70%', marginLeft:20 }}>
            <Text style={{ color: '#06D6b6', fontSize: 24, fontWeight:'bold'}}>KEVIN</Text>
            <Text style={{ color: 'white', fontSize: 24 }}>Stagiaire Full Stack</Text>
          </View>
        </View>

        <View flexDirection='row' style={{ alignItems: 'center', width: '70%' }}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646842845/veazit/regis_iwb9wn.jpg' }}
            size={150}
            rounded={true}
            marginBottom={10}
          />
          <View style={{flexDirection:'column', alignItems: 'flex-start', width: '70%', marginLeft:20 }}>
            <Text style={{ color: '#06D6b6', fontSize: 24, fontWeight:'bold'}}>RÉGIS</Text>
            <Text style={{ color: 'white', fontSize: 24 }}>Développeur Senior</Text>
          </View>
        </View>

        <View flexDirection='row' style={{ alignItems: 'center', width: '70%' }}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646841698/veazit/nicolas_a7vwkl.jpg' }}
            size={150}
            rounded={true}
            marginBottom={10}
          />
          <View style={{flexDirection:'column', alignItems: 'flex-start', width: '70%', marginLeft:20 }}>
            <Text style={{ color: '#06D6b6', fontSize: 24, fontWeight:'bold'}}>NICOLAS</Text>
            <Text style={{ color: 'white', fontSize: 24 }}>Directeur Artistique</Text>
          </View>
        </View>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation', { screen: 'ConnectScreen' })}>
          <View style={[styles.buttonPrevious, { borderColor: theme.color }]}>
            <Icon name='arrow-left' size={24} color={theme.color} />
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  buttonPrevious: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'row'
  },
  avatar: {
    position: 'absolute',
    top: 0
  }
});