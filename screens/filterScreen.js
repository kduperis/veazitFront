import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import {PressStart2P_400Regular} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function FilterScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const checked = useSelector((state) => state.category)

  var filter = ["aquatique", "Domaine", "Parc", "category 4"]

  useEffect(() => {
    function checkB(allCategory, selected) {
      for (var i = 0; i < selected.length; i++) {

        switch (allCategory.indexOf(selected[i])) {
          case 0:
            setCheck1(true);
            break;
          case 1:
            setCheck2(true);
            break;
          case 2:
            setCheck3(true);
            break;
          case 3:
            setCheck4(true);
            break;
        }
      }
    }
    checkB(filter, checked)
  }, [])

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (

    <View>

      <Button onPress={() => setModalVisible(true)}
                                  buttonStyle={styles.buttonStyle}
                                  icon={{
                                    name: 'filter',
                                    type: 'font-awesome',
                                    size: 18,
                                    color: '#4b667f',
                                  }}
                                  iconPosition='top'
                                  title={<Text style={{ fontSize: 10, color:'#4b667f', marginTop:7 }}>Filter</Text>}
      />


        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => {setModalVisible(false)}}
          style={styles.contentView}
        >

          <View style={styles.content}>
            <Text style={styles.contentTitle}>Filter Screen !</Text>

            <Text style={{ color: "#06D4B6", fontSize: 14, fontFamily: "PressStart2P_400Regular", marginBottom: 20}}>Modifiez vos genres de lieu ici : </Text>

            <CheckBox
              center
              title="Aquatique"
              checked={check1}
              checkedColor="#06D4B6"
              onPress={() => setCheck1(!check1)}
            />

            <CheckBox
              center
              title="Domaine"
              checked={check2}
              checkedColor="#06D4B6"
              onPress={() => setCheck2(!check2)}
            />

            <CheckBox
              center
              title="Parc"
              checked={check3}
              checkedColor="#06D4B6"
              onPress={() => setCheck3(!check3)}
            />

            <CheckBox
              center
              title="category 4"
              checked={check4}
              checkedColor="#06D4B6"
              onPress={() => setCheck4(!check4)}
            />
            
            <Button
                title={`Go !`}
                containerStyle={{
                  width: '50%',
                  marginHorizontal: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#06D4B6',
                  marginTop:20,
                }}
                buttonStyle={{
                    backgroundColor:"#2C3A47",
                    height:50,
                }}
                titleStyle={{
                    fontFamily: "PressStart2P_400Regular",
                    fontSize: 20,
                    color: "#06D4B6",
                }}
                onPress={() => setModalVisible(false)}
              />

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
    height:500,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom:20,
  },
  button: {
    backgroundColor: "#2C3A47",
    borderWidth: 1,
    borderColor: "#06D4B6",
    padding: 15,
    paddingTop: 25,
    borderRadius: 30,
    marginTop:20,
  },
  buttonText: {
    color: "#06D4B6",
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular"
  },
  buttonStyle: {
    height: 60,
    width: 60,
    backgroundColor:'#2C3A47'
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
