import { useState } from 'react';

import { StyleSheet,  View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

export default function QuestScreen() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>

      <Button onPress={() => setModalVisible(true)}
                      buttonStyle={styles.buttonStyle}
                      icon={{
                        name: 'fort-awesome',
                        type: 'font-awesome',
                        size: 18,
                        color: '#4b667f',
                      }}
                      iconPosition='top'
                      title={<Text style={{ fontSize: 10, color:'#4b667f', marginTop:7 }}>Quest</Text>}
      />

      
      <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => {setModalVisible(false)}}
          style={styles.contentView}
        >

          <View style={styles.content}>
            <Text style={styles.contentTitle}>Quest Screen !</Text>
          </View>

        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height:500,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttonStyle: {
    height: 60,
    width: 60,
    marginLeft:20,
    marginRight:20,
    backgroundColor:'#2C3A47'
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
