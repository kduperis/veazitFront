import { useEffect, useState } from 'react';
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
                        title='1/5'
                        onPress={() => {setIsVisible(false); props.navigation.navigate('StackNavigation')}} />
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
      width:100,
      height:100,
      alignItems:'center',
      justifyContent: "center",
      backgroundColor:'white',
      opacity:1
  }
});
