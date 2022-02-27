import { StyleSheet, Text, View } from 'react-native';

export default function connectScreen() {
    return (
        <View style={styles.container}>
            <Text>Salut c'est la page de SignUp</Text>
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
