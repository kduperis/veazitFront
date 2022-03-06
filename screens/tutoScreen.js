import { useState } from 'react';

import { StyleSheet,  View, ImageBackground, Dimensions  } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';

import imageFond from '../assets/tuto.jpg'

export default function TutoScreen(props) {

    const [isVisible,setIsVisible] = useState(true)

    return (
        

        <View>

    
            <ImageBackground source={imageFond} style={styles.image} />

            <Overlay
                isVisible={isVisible}>

                <View style={styles.overlayTuto}>
                    <Text>Tuto Screen</Text>

                    <Button
                        title={`1/5`}
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
                        onPress={() => {setIsVisible(false); props.navigation.navigate('StackNavigation')}}
                    />
                </View>

            </Overlay>

            

        </View>
            




    );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems:'center',
    justifyContent: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayTuto:{
      width:300,
      height:500,
      alignItems:'center',
      justifyContent: "center",
      backgroundColor:'white',
      opacity:1
  }
});
