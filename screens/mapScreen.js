import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Overlay } from 'react-native-elements'
import ProgressBar from "react-native-animated-progress";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapPin, faDroplet, faGopuram, faTree,faHeart } from '@fortawesome/free-solid-svg-icons'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import axios from 'axios';

import { IP_URL } from '@env'

import themeContext from '../config/themeContext';

var mapStyle = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#AFFFA0"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "color": "#EAFFE5"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f9f8c7"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#59A499"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#F0FF8D"
      },
      {
        "weight": 2.2
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fdfabf"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#1A87D6"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default function MapScreen() {

  const theme = useContext(themeContext);

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bestList, setBestList] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(false)
  const [visibleWin, setVisibleWin] = useState(false)
  const [poiScore, setPoiScore] = useState(0)
  const [poiSelected, setPoiSelected] = useState(0)
  const [updateScore,setUpdateScore]=useState(false)
  const [firstLaunch,setFirstLaunch]=useState(true)
  const [infoMsg,setInfoMsg]=useState('')
  
  const token = useSelector((state) => state.token)
  const checked = useSelector((state) => state.category)

  const [userScore, setUserScore] = useState(0)
  const [userLevel, setUserLevel] = useState(0)

  const isFocused = useIsFocused();

  var poi = [{ title: 'Bassin La Paix', description: 'Le bassin', latitude: -21.020110692131183, longitude: 55.66926374606402, alreadyView: true, categorie: 'Aquatique', score: 100 },
  { title: 'Anse des cascades', description: 'Des cascades', latitude: -21.177591548568518, longitude: 55.83068689565736, alreadyView: false, categorie: 'Aquatique', score: 100 },
  { title: 'La Vanilleraie, Domaine du Grand Hazier', description: 'Domaine 1', latitude: -20.898463033811716, longitude: 55.59040358066711, alreadyView: false, categorie: 'Domaine', score: 100 },
  { title: "Musée de l'Imprimerie et de la Communication graphique", description: 'Domaine 2', latitude: 45.76511763913665, longitude: 4.834717377872742, alreadyView: true, categorie: 'Domaine', score: 100 },
  { title: 'Musée des Moulages', description: 'Domaine 3', latitude: 45.75224289744716, longitude: 4.854372604035073, alreadyView: false, categorie: 'Domaine', score: 4000 },
  { title: 'Parc Sergent Blandan', description: 'Parc 1', latitude: 45.74555369377989, longitude: 4.854344965036273, alreadyView: false, categorie: 'Parc', score: 100 }]


  var showOverlay = (title, description) => {
    setTitle(title)
    setDescription(description)
    setVisible(true)
  }

  var listPointOfInterest = poi.map((lieu, i) => {

    let iconCustom = faMapPin
    let colorCustom = 'green'

    if (lieu.alreadyView) {
      colorCustom = 'black'
    }

    switch (lieu.categorie) {
      case 'Aquatique':
        iconCustom = faDroplet
        break;
      case 'Domaine':
        iconCustom = faGopuram
        break;
      case 'Parc':
        iconCustom = faTree
        break;
    }

    for (var j = 0; j < checked.length; j++) {
      if (lieu.categorie == checked[j]) {
        return (
          <Marker
            key={i}
            coordinate={{ latitude: lieu.latitude, longitude: lieu.longitude }}
            onPress={() => { showOverlay(lieu.title, lieu.description); setPoiSelected(i) }}>
            <FontAwesomeIcon icon={iconCustom} color={colorCustom} />
          </Marker>
        )
      }
    }

  })

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocation(true)
        Location.watchPositionAsync({ distanceInterval: 2 },
          (location) => {
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
          }
        );
      }
    }
    askPermissions();
  }, []);

  useEffect(() => {
    async function bestUser() {
      axios.get(`http://${IP_URL}:3000/best-users?token=${token}`).then((res) => {
        var userData = res.data.bestUserName;
        var userDataToken = res.data.user;
        userData.sort((a, b) => {
          return b.score - a.score
        })
        if (userData.length <= 3) {
          userData = userData.slice(0, 1)
        } else {
          userData = userData.slice(0, 3)
        }
        setBestList(userData);
        if (res.data.result) {
          var calculScore = (userDataToken.score % 1000) / 10
          var calculLevel = parseInt(1 + Math.floor(userDataToken.score / 1000))
          var nextLv = 1000-(10*calculScore)
          setUserLevel(calculLevel)
          setUserScore(calculScore)
          setInfoMsg(`Prochain niveau dans ${nextLv} pts`)
          if(firstLaunch && userDataToken){
            setFirstLaunch(false)
            EventRegister.emit('myCustomEvent', userDataToken.apparence);            
          }
        } else {
          setUserScore(0)
          setUserLevel(1)
          setInfoMsg('Inscris toi pour profiter au maximum de Veazit')
        }
      });
    }

    bestUser();
  }, [isFocused, token, updateScore])

  var launchNavigation = async () => {
    //ADD NAVIGATION
    setVisible(false)
    setTimeout(() => setVisibleWin(true), 5000); //DEMODAY simuler la marche
  }

  var addScore = async () => {
    
  if(token==''){
    setInfoMsg('Inscris toi pour profiter au maximum de Veazit')
  }else{
    await fetch(`http://${IP_URL}:3000/best-users?`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `score=${poiScore}&token=${token}`, 
    });
  }

    setVisibleWin(false)
    setUpdateScore(!updateScore)

  }


var addToFavorite = async () => {
  console.log('Love')
}

var bestUserCard = bestList.map((user, i) => {
  return (
    <View key={i} style={styles.cardPlayer} >
      <Avatar
        size={55}
        rounded
        source={{ uri: user.avatar }}
        containerStyle={{
          borderColor: '#c0c0c0',
          borderStyle: 'solid',
          borderWidth: 3,
        }}
      />

      <View style={styles.detailPlayer}>
        <Text style={styles.nameScorePlayer}>{user.username}</Text>
        <Text style={styles.nameScorePlayer}>{user.score}</Text>
      </View>
    </View>
  )
})

let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
  if (!fontLoaded) {
    return <AppLoading />
  }

return (
  <View style={styles.container}>
    <View style={[styles.subtitle, { backgroundColor: theme.background }]}>
      <Text style={[styles.desc, { color: theme.color }]}>
        Nos meilleurs Veaziteurs:
      </Text>
    </View>

    <View style={[styles.best, { backgroundColor: theme.background }]}>

      {bestUserCard}
    </View>

    <Overlay
      isVisible={visible}
      onBackdropPress={() => { setVisible(false) }}
      overlayStyle={[styles.overlayStyle,{borderColor:theme.color, backgroundColor:theme.background}]}
    >
      <TouchableOpacity 
          style={styles.loveButton}
          onPress={()=>addToFavorite()}>
          <FontAwesomeIcon icon={faHeart} color='white' size={25}/>
      </TouchableOpacity>

      <View style={styles.overlayPoi}>
        <Image
          source={require('../assets/noImg.jpg')}
          style={styles.item}
        />
        <Text style={[styles.titleOverlay,{color:theme.color}]}>{title}</Text>
        <Text style={[styles.descOverlay,{color:theme.color}]}>{description}</Text>
        <TouchableOpacity 
            style={[styles.button,{borderColor: theme.color}]}
            onPress={() => {
              launchNavigation(); setPoiScore(poi[poiSelected].score)
            }}>
            <Text
                style={[styles.buttonText,{color: theme.color}]}>Go veazit</Text>
        </TouchableOpacity>
        

      </View>
    </Overlay>

      <View style={[styles.best, { backgroundColor: theme.background }]}>
        {bestUserCard}
      </View>
      
      <Overlay
        isVisible={visibleWin}
        onBackdropPress={() => { setVisibleWin(false) }}
        overlayStyle={[styles.overlayStyle,{borderColor:theme.color, backgroundColor:theme.background}]}
      >
          <View style={styles.overlayPoi}>
            <Image
              source={require('../assets/clap.jpg')}
              style={styles.item}
            />
            <Text style={[styles.titleOverlay,{color:theme.color}]}>Félicitations tu remportes:</Text>
            <Text style={[styles.descOverlay,{color:theme.color}]}>+ {poiScore} !</Text>
          </View>
          <TouchableOpacity 
              style={[styles.button,{borderColor: theme.color}]}
              onPress={() => addScore()}>
              <Text
                  style={[styles.buttonText,{color: theme.color}]}>Veazited</Text>
          </TouchableOpacity>
      </Overlay>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation={location}
        showsCompass={true}
        showsMyLocationButton={location}>

        {listPointOfInterest}

      </MapView>

        <View style={[styles.progressContainer, { backgroundColor: theme.background }]}>
          < Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 8 }} > Niveau: {userLevel} </Text>
        </View>

        <ProgressBar progress={userScore} height={20} backgroundColor={theme.color} />

        <View style={[styles.progressContainer, { backgroundColor: theme.background }]}>
          <Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 8}} >{infoMsg}</Text>
        </View>

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
  },
  overlayPoi: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 500,
  },
  item: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin:30
  },
  best: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  cardPlayer: {
    flexDirection: 'row'
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  desc: {
    fontSize: 13,
    fontFamily: "PressStart2P_400Regular",
    justifyContent: 'center'
  },
  detailPlayer: {
    justifyContent: 'center',
    marginLeft: 3
  },
  nameScorePlayer: {
    color: 'white',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },
  overlayStyle:{
    padding:0, 
    borderWidth:2,
},
  titleOverlay:{
    fontSize: 13,
    fontFamily: "PressStart2P_400Regular",
  },
  descOverlay:{
    marginTop:20,
    fontSize: 11,
    fontFamily: "PressStart2P_400Regular",
  },
  button: {
    width: '65%',
    marginVertical:20,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
},
buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 18,
},
loveButton: {
  position:'absolute',
  zIndex:1,
  top:20,
  right:20,
},
});
