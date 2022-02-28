import { StyleSheet, View} from 'react-native';
import { Button, Text} from 'react-native-elements';

export default function homefilterScreen(props) {
  return (
    <View style={styles.container}>
 
        <Text>Home filter page Screen</Text>
        <Button 
        title={'To Nav Bar'}
        onPress={() => props.navigation.navigate('StackNavigation')} />

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
