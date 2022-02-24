import { StyleSheet} from 'react-native';
import { NativeBaseProvider, Text, Box, Button} from 'native-base';

export default function homepageScreen(props) {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Home page Screen</Text>
        <Button onPress={() => props.navigation.navigate('HomeFilter')} >To Home Filter</Button>
      </Box>
    </NativeBaseProvider>
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
