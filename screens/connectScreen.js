import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function connectScreen(props) {

  const tokenUser = useSelector(state => state.token);
  
  if(!tokenUser){
    props.navigation.navigate("SignUp")
  }
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
