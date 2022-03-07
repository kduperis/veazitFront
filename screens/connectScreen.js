import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners'
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
import {ListItem, Switch, Divider, Avatar} from 'react-native-elements'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPowerOff, faGear, faHeart, faCoins, faFolder, faCircleHalfStroke, faQuestion } from '@fortawesome/free-solid-svg-icons'

import AsyncStorage from '@react-native-async-storage/async-storage';

import themeContext from '../config/themeContext';

export default function ConnectScreen(props) {

  const [light,setLight] =useState(false)

  const theme = useContext(themeContext);

  const tokenUser = useSelector(state => state.token);

  const isFocused = useIsFocused();

  useEffect(()=>{
    var verifyUser = () => {
      if(!tokenUser){
        props.navigation.navigate("SignUp")
      } 
    }
    verifyUser()
  },[isFocused])


  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>

      <View style={{
        alignItems:'center',
        marginVertical:20, 
      }}>
        <Avatar
          size={200}
          rounded
          source={require('../assets/noImg.jpg')}
          containerStyle={{ marginVertical:25 }}
        />
        <Text style={[styles.contentTitle,{color: theme.color}]}>Username</Text>
        <Text style={[styles.contentDesc,{color: theme.color}]}>Score: XXX</Text>
      </View>

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('param')}>
        <FontAwesomeIcon icon={faGear} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Parametres</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem containerStyle={[styles.containerList,{backgroundColor:theme.background}]}>
        <FontAwesomeIcon icon={faCircleHalfStroke} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Apparence</Text>
        </ListItem.Content>
        <Switch
        color={"#06D4B6"}
        value={light}
        onValueChange={(value) => {
          setLight(value);
          // send to user
          EventRegister.emit('myCustomEvent', light);}}
        />
      </ListItem>

      <Divider />

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('favorite')}>
        <FontAwesomeIcon icon={faHeart} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Favoris POI</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('old')}>
        <FontAwesomeIcon icon={faFolder} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Archive POI</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('how')}>
        <FontAwesomeIcon icon={faCoins} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Comment gagner des points ?</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('who')}>
        <FontAwesomeIcon icon={faQuestion} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList,{color:theme.color}]}>Qui sommes nous ?</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem 
          containerStyle={[styles.containerList,{backgroundColor:theme.background}]}
          onPress={()=>console.log('deco')}>
        <FontAwesomeIcon icon={faPowerOff} color="#EA4335" size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={{
            fontSize:10,
            fontFamily: "PressStart2P_400Regular",
            color:"#EA4335",
          }}>Deconnexion</Text>
        </ListItem.Content>
      </ListItem>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentTitle: {
    fontSize: 24,
    marginBottom:20,
    fontFamily: "PressStart2P_400Regular",
  },
  contentDesc:{
    fontSize: 16,
    marginBottom:20,
    fontFamily: "PressStart2P_400Regular",
  },
  containerList:{
    height:50,
  },
  textList:{
    fontSize:10,
    fontFamily: "PressStart2P_400Regular",
  }
});
