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

export default function mapScreen() {

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [userData, setUserData] = useState([])
  const [location, setLocation] = useState(false)
  const [visibleWin, setVisibleWin] = useState(false)

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
    setVisibleWin(true)
    setVisible(false)
  }

  var addScore = () => {
    setVisibleWin(false)
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

      <Overlay
        isVisible={visibleWin}
        onBackdropPress={() => { setVisibleWin(false) }}
      >
        <View style={styles.overlayPoi}>
          <Image
            source={require('../assets/noImg.jpg')}
            style={styles.item}
          />
          <Text>Félicitations tu remportes:</Text>
          <Text>100 pts</Text>
          <Button
            title='Veazited'
            onPress={() => addScore()} />
        </View>

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
