import { StyleSheet, Text, View } from 'react-native';

export default function filterScreen() {
  return (
    <View style={styles.container}>
      <Text>Filter Screen</Text>
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
