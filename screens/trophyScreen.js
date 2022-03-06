
import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { axios } from 'axios';
import { IP_URL } from '@env'


export default function TrophyScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [badgeData, setBadgeData] = useState([])

  var badge = [{ title: "Beginner", description: "first travel", img: "../assets/kevin.jpeg" }]


  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IP_URL}/users/badgesData`);
      var response = await rawResponse.json();
      console.log(response);
    }
    loadData();

  }, [])


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
          <ScrollView>
            <Image
              size={15}
              source={require("../assets/kevin.jpeg")}
              containerStyle={{
                borderColor: '#c0c0c0',
                borderWidth: 3,
              }}
            />
            <View style={styles.badge}>
              <Text style={styles.nameScorePlayer}>{badge[0].title}</Text>
              <Text style={styles.nameScorePlayer}>{badge[0].description}</Text>
            </View>
            <Image
              source={require("../assets/kevin.jpeg")}
              containerStyle={{
                borderColor: '#c0c0c0',
                borderWidth: 3,
              }}
            />
            <View style={styles.badge}>
              <Text >{badge[0].title}</Text>
              <Text >{badge[0].description}</Text>
            </View>

          </ScrollView>

        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height: 500,


  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttonStyle: {
    height: 60,
    width: 60,
    backgroundColor: '#2C3A47'
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },

});
