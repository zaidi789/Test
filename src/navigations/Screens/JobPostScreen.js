import React, { useState , useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../../components/ProgressBar';
import { useSteps } from '../../context/StepContext';
import { useNavigation , useFocusEffect} from '@react-navigation/native';

const JobPostScreen = () => {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [jobType, setJobType] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const totalSteps = 3;
  const { currentStep, setCurrentStep } = useSteps();

  useFocusEffect(
    useCallback(() => {
        setJobTitle('');
        setDescription('');
        setSkills([]);
        setJobType('');
        setEducation('');
        setExperience('');
        return () => {};
    }, [])
);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      const updatedSkills = [...skills, skillInput.trim()];
      setSkills(updatedSkills);
      setSkillInput('');
      console.log('Skills after addition:', updatedSkills);
    }
  };

  const removeSkill = (skill) => {
    const filteredSkills = skills.filter(s => s !== skill);
    setSkills(filteredSkills);
    console.log('Skills after removal:', filteredSkills); 
  };
  const renderSkill = ({ item }) => (
    <View style={styles.skillChip}>
      <Text style={styles.skillText}>{item}</Text>
      <TouchableOpacity onPress={() => removeSkill(item)}>
        <Icon name="times-circle" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );

  

  const navigateToPreview = () => {
    setCurrentStep(2); 
    navigation.navigate('Job Review Screen', {
      jobData: {
        title: jobTitle,
        description: description,
        skills: skills,
        jobType: jobType,
        education: education,
        experience: experience
      }
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="chevron-left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post a Job</Text>
      </View>
        <ProgressBar
          currentStep={currentStep}
          totalSteps={3}
          labels={['Details', 'Review', 'Submit']}
        />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            value={jobTitle}
            onChangeText={setJobTitle}
            style={styles.input}
            placeholder="Enter job title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter job description here..."
            multiline
            textAlignVertical='top'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Skills</Text>
          <View style={styles.skillInputContainer}>
            <TextInput
              value={skillInput}
              onChangeText={setSkillInput}
              style={styles.skillInput}
              placeholder="Type skill"
            />
            <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={skills}
            renderItem={renderSkill}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={styles.skillsList}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Job Type</Text>
          <Picker
            selectedValue={jobType}
            onValueChange={setJobType}
            style={styles.picker}>
            <Picker.Item label="Select job type" value="" />
            <Picker.Item label="Full Time" value="full_time" />
            <Picker.Item label="Part Time" value="part_time" />
            <Picker.Item label="Contract" value="contract" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Education</Text>
          <Picker
            selectedValue={education}
            onValueChange={setEducation}
            style={styles.picker}>
            <Picker.Item label="Enter education" value="" />
            <Picker.Item label="Bachelor's" value="bachelors" />
            <Picker.Item label="Master's" value="masters" />
            <Picker.Item label="PhD" value="phd" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Experience Level</Text>
          <Picker
            selectedValue={experience}
            onValueChange={setExperience}
            style={styles.picker}>
            <Picker.Item label="Enter experience level" value="" />
            <Picker.Item label="Entry Level" value="entry" />
            <Picker.Item label="Mid Level" value="mid" />
            <Picker.Item label="Senior Level" value="senior" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button}  onPress={navigateToPreview}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
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
  descriptionInput: {
    height: 320,
    paddingTop: 10,
    textAlign: 'left'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 10
  },

  contentContainer: {
    paddingBottom: 20
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#111'
  },
  input: {
    fontSize: 16,
    backgroundColor: '#F6F5F2',
    borderRadius: 8,
    padding: 10
  },
  picker: {
    backgroundColor: '#F6F5F2',
    borderRadius: 8
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  skillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  skillInput: {
    flex: 1,
    paddingRight: 40,
    backgroundColor: '#F6F5F2',
    borderRadius: 8
  },
  addSkillButton: {
    position: 'absolute',
    right: 9,
    top: 6,
    backgroundColor: '#32CD32',
    padding: 7,
    borderRadius: 5
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 5
  },
  skillText: {
    marginRight: 5
  },
  skillsList: {
    marginTop: 10
  }
});

export default JobPostScreen;
