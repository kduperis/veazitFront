import { StyleSheet, View} from 'react-native';
import { Button, Text} from 'react-native-elements';

export default function homepageScreen(props) {
  return (
    <View style={styles.container}>
      
        <Text>Home page Screen</Text>
        <Button 
        title={'To Home Filter'}
        onPress={() => props.navigation.navigate('HomeFilter')} />

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
