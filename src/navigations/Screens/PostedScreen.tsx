import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSteps } from '../../context/StepContext'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';

type NavigationType = NavigationProp<Record<string, undefined>>;

const PostedScreen: React.FC = () => {
    const navigation = useNavigation<NavigationType>();
    const { currentStep, setCurrentStep } = useSteps();

    const handleBack = () => {
        setCurrentStep(currentStep - 2);
        navigation.navigate('Job Post Screen');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#32CD32" barStyle="light-content" />
            <View style={styles.content}>
                <Icon name="check-circle" size={80} color="white" style={styles.icon} />
                <Text style={styles.header}>Your Job is Posted!</Text>
                <Text style={styles.subheader}>
                    Congratulations! Your job has been successfully posted and is now visible to potential candidates. Good luck in your recruitment process!
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Manage Jobs</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#32CD32',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        maxWidth: 340,
    },
    icon: {
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subheader: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '70%',
    },
    buttonText: {
        color: '#32CD32',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default PostedScreen;
