import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';

export default function ConnectScreen(props) {

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
    <View style={styles.container}>
      <Text>Connection Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
