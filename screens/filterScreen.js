import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, CheckBox, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import {PressStart2P_400Regular} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import themeContext from '../config/themeContext';

export default function FilterScreen(props) {

  const theme = useContext(themeContext);

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
                                  buttonStyle={[styles.buttonStyle,{backgroundColor:theme.background}]}
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

          <View style={[styles.content,{backgroundColor:theme.background}]}>
            <Text style={[styles.contentTitle,{color: theme.color}]}>Filter Screen !</Text>

            <Text style={{ color: theme.color, fontSize: 14, fontFamily: "PressStart2P_400Regular", marginBottom: 20}}>Modifiez vos genres de lieu ici : </Text>

            <CheckBox
              center
              title="Aquatique"
              checked={check1}
              checkedColor={theme.color}
              onPress={() => setCheck1(!check1)}
            />

            <CheckBox
              center
              title="Domaine"
              checked={check2}
              checkedColor={theme.color}
              onPress={() => setCheck2(!check2)}
            />

            <CheckBox
              center
              title="Parc"
              checked={check3}
              checkedColor={theme.color}
              onPress={() => setCheck3(!check3)}
            />

            <CheckBox
              center
              title="category 4"
              checked={check4}
              checkedColor={theme.color}
              onPress={() => setCheck4(!check4)}
            />
            
            <TouchableOpacity 
                style={[styles.button,{borderColor: theme.color}]}
                onPress={() => setModalVisible(false)}>
                <Text
                    style={[styles.buttonText,{color: theme.color}]}>Go !</Text>

            </TouchableOpacity>

          </View>

        </Modal>

      
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
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
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:25,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
  },
  buttonStyle: {
    height: 60,
    width: 60,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
