import { StyleSheet, View } from 'react-native';
import { Button, Text, CheckBox } from 'react-native-elements';
import { useState } from 'react';


export default function homefilterScreen(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  return (

    <View style={styles.container}>
      <Text style={{ color: "#D1D8E0" }}>Quel genre de lieu souhaitez-vous Veaziter ?</Text>
      <CheckBox
        center
        title="LIEUX CULTURELS"
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />

      <CheckBox
        center
        title="LA BONNE BOUFFE"
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />
      <CheckBox
        center
        title="MICKEY"
        checked={check3}
        onPress={() => setCheck3(!check3)}
      />
      <CheckBox
        center
        title="PLUTO"
        checked={check4}
        onPress={() => setCheck4(!check4)}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3A47',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
