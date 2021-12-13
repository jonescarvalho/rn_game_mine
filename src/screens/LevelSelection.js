import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

export default props => {
    return (
        <Modal onRequestClose={props.onCancel} visible={props.isVisible} animationType="slide" transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o nível:</Text>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.1)} style={[styles.button,styles.bgEasy]}>
                        <Text style={styles.buttonLabel}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.2)} style={[styles.button,styles.bgNormal]}>
                        <Text style={styles.buttonLabel}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.3)} style={[styles.button,styles.bgHard]}>
                        <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
    },
    button: {
        marginTop: 10,
        padding: 5
    },
    bgEasy: {
        backgroundColor: '#4D7031'
    },
    bgNormal: {
        backgroundColor: '#8FBC8F'
    },
    bgHard: {
        backgroundColor: '#CD5C5C'
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'

    }
});



