import { useEffect, useState } from 'react';
import { Avatar, Button, Overlay } from 'react-native-elements'
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleDot, faMapPin, faDroplet, faGopuram, faTree } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from "react-native-animated-progress";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import axios from 'axios';
import { IP_URL } from '@env'

var mapStyle = [
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#aee2e0"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#abce83"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#769E72"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7B8758"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#8dab68"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#5B5B3F"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ABCE83"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#A4C67D"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#9BBF72"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#87ae79"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f2200"
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "visibility": "on"
          },
          {
              "weight": 4.1
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#495421"
          }
      ]
  },
  {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
]

export default function mapScreen() {

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [userData, setUserData] = useState([])
  const [location, setLocation] = useState(false)

  var poi = [{ title: 'Bassin La Paix', description: 'Le bassin', latitude: -21.020110692131183, longitude: 55.66926374606402, alreadyView: true, categorie: 'Aquatique' },
  { title: 'Anse des cascades', description: 'Des cascades', latitude: -21.177591548568518, longitude: 55.83068689565736, alreadyView: false, categorie: 'Aquatique' },
  { title: 'La Vanilleraie, Domaine du Grand Hazier', description: 'Domaine 1', latitude: -20.898463033811716, longitude: 55.59040358066711, alreadyView: false, categorie: 'Domaine' },
  { title: "Musée de l'Imprimerie et de la Communication graphique", description: 'Domaine 2', latitude: 45.76511763913665, longitude: 4.834717377872742, alreadyView: true, categorie: 'Domaine' },
  { title: 'Musée des Moulages', description: 'Domaine 3', latitude: 45.75224289744716, longitude: 4.854372604035073, alreadyView: false, categorie: 'Domaine' },
  { title: 'Parc Sergent Blandan', description: 'Parc 1', latitude: 45.74555369377989, longitude: 4.854344965036273, alreadyView: false, categorie: 'Parc' }]

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

    var showOverlay = (title, description) => {
      setTitle(title)
      setDescription(description)
      setVisible(true)
    }


    return (
      <Marker
        key={i}
        coordinate={{ latitude: lieu.latitude, longitude: lieu.longitude }}
        onPress={() => showOverlay(lieu.title, lieu.description)}>
        <FontAwesomeIcon icon={iconCustom} color={colorCustom} />
      </Marker>
    )

  })

  useEffect(() => {
    axios.get(`http://${IP_URL}:3000/users/best-users`).then((res) => setUserData(res.data.bestUserName));

  }, [])

  userData.sort((a, b) => {
    return b.score - a.score
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

  var launchNavigation = () => {

  }

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
  if (!fontLoaded) {
    return <AppLoading />
  }

  var bestUserCard = userData.map((user, i) => {
    return (
      <View style={styles.cardPlayer}>
        <View>
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
        </View>
        <View style={styles.detailPlayer}>
          <Text style={styles.nameScorePlayer}>
            {user.username}
          </Text>
          <Text style={styles.nameScorePlayer}>
            {user.score}
          </Text>
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.subtitle}>
        <Text style={styles.desc}>
          Nos meilleurs Veaziteurs:
        </Text>
      </View>

      <View style={styles.best}>

        {bestUserCard[0]}
        {bestUserCard[1]}
        {bestUserCard[2]}

      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={() => { setVisible(false) }}
      >
        <View style={styles.overlayPoi}>
          <Image
            source={require('../assets/noImg.jpg')}
            style={styles.item}
          />
          <Text>{title}</Text>
          <Text>{description}</Text>
          <Button
            title='Go veazit'
            onPress={() => launchNavigation()} />
        </View>

      </Overlay>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation={location}
        showsCompass={true}
        showsMyLocationButton={true}>
        
        {listPointOfInterest}
      
      </MapView>

      <View style={styles.progressContainer}>
        <Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 8 }} > Ta progression avant le prochain niveau </Text>
      </View>

      <ProgressBar progress={80} height={20} backgroundColor="#06D4B6" />

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
    width: 100,
    height: 100,
    borderRadius: 100
  },
  best: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C3A47',
    padding: 5
  },
  cardPlayer: {
    flexDirection: 'row'
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3A47',
    paddingTop: '10%',
  },
  desc: {
    color: '#06D4B6',
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
    backgroundColor: "#2C3A47",
    height: 20

  },
});
