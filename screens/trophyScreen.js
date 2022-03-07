
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Avatar } from 'react-native-elements';
import Modal from 'react-native-modal';
import { IP_URL } from '@env'

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function TrophyScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [badgeData, setBadgeData] = useState([])




  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IP_URL}:3000/users/badgesData`);
      var response = await rawResponse.json();
      setBadgeData(response.badgeCollection);
    }
    loadData();

  }, [])

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
  if (!fontLoaded) {
    return <AppLoading />
  }

  var badgeCard = badgeData.map((badge, i) => {

    return (
      <ScrollView>
        <View key={i} style={{ flexDirection: "row" }}>

          <Avatar
            size={50}
            source={{ uri: badge.img }}
            containerStyle={{
              borderColor: '#c0c0c0',
              borderWidth: 3,
              borderRadius: 50,
              marginLeft: 0
            }}
          />
          <View style={{ marginLeft: 40, marginTop: 10 }}>
            <Text style={{ fontFamily: "PressStart2P_400Regular", fontSize: 12 }} >{badge.title}</Text>
            <Text style={{ fontFamily: "PressStart2P_400Regular" }} >{badge.description}</Text>
          </View>

        </View>
      </ScrollView>

    )
  })

  return (
    <View>

      <Button onPress={() => setModalVisible(true)}
        buttonStyle={styles.buttonStyle}
        icon={{
          name: 'trophy',
          type: 'font-awesome',
          size: 18,
          color: '#4b667f',
        }}
        iconPosition='top'
        title={<Text style={{ fontSize: 10, color: '#4b667f', marginTop: 7 }}>Trophy</Text>}
      />

      <Modal
        backdropOpacity={0.3}
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
        style={styles.contentView}
      >
        <View style={styles.content}>

          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.contentTitle}> Liste des trophées</Text>
          </View>


          {badgeCard}

        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor:'#2C3A47',
    padding: 22,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height: 500,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: "#06D4B6",
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonStyle: {
    height: 60,
    width: 60,
    backgroundColor:'#2C3A47'
  },
});
