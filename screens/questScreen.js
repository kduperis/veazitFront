import { StyleSheet, Text, View } from 'react-native';

export default function questScreen() {
  return (
    <View style={styles.container}>
      <Text>Quest Screen</Text>
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
