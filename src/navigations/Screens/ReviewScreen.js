import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../../components/ProgressBar';
import { useSteps } from '../../context/StepContext';
import { useNavigation } from '@react-navigation/native';
import image from '../../assets/React-icon.svg.png';

const ReviewScreen = ({ route }) => {
    const { currentStep, setCurrentStep } = useSteps();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const { jobData } = route.params;

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        navigation.goBack();
    };

    const submitJob = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.100.10:3000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData) 
            });
            const jsonResponse = await response.json();
            console.log('Job posted:', jsonResponse);
            setCurrentStep(3); 
            navigation.navigate('Posted Screen'); 
        } catch (error) {
            console.error('Error posting job:', error);
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const badgeColors = ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#FF69B4', '#00BFFF', '#FFA500', '#8A2BE2'];
    const getBadgeColor = (index) => badgeColors[index % badgeColors.length];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="chevron-left" size={20} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Review Job Post</Text>
            </View>
            <ProgressBar currentStep={currentStep} totalSteps={3} labels={['Details', 'Review', 'Submit']} />
            <ScrollView style={styles.container}>
                <Text style={styles.PreviewText}>This is Preview of what your job post will look like to job seeker</Text>
                <View style={styles.jobContainer}>
                    <View style={styles.jobMainContainer}>
                        <View style={styles.titleContainer}>
                            <Image source={image} style={styles.logo} />
                            <Text style={styles.jobTitle}>{jobData.title}</Text>
                        </View>

                        <View style={styles.skillsContainer}>
                            {jobData.skills.map((skill, index) => (
                                <View key={index} style={[styles.skillBadge, { backgroundColor: getBadgeColor(index) }]}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Job Description</Text>
                    <Text style={styles.description}>{jobData.description}</Text>

                    <Text style={styles.sectionTitle}>Requirements</Text>
                    <Text style={styles.description}>Type: {jobData.jobType}</Text>
                    <Text style={styles.description}>Education: {jobData.education}</Text>
                    <Text style={styles.description}>Experience: {jobData.experience}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={submitJob}>
                    <Text style={styles.buttonText}>Confirm and Proceed</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#ccc'
    },
    headerTitle: {
        flex: 1,
        left: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    jobMainContainer: {
        borderBottomWidth: 0.2,
        padding: 4
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    PreviewText: {
        left: 6,
        height: 42
    },
    jobContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -10,
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        bottom: 10
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 7,
        left: 55
    },
    skillBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        marginRight: 5,
        marginBottom: 1,
        top: 5

    },
    skillText: {
        fontSize: 10,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 15,
        color: '#111',
        marginTop: 10,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify',
        fontWeight: '200'
    },
    button: {
        backgroundColor: '#32CD32',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ReviewScreen;
