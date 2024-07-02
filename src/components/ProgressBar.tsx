import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, labels }) => {
  return (
    <View style={styles.progressBarContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={styles.progressItem}>
          <View style={styles.stepContainer}>
            <View style={[
              styles.circle,
              { backgroundColor: index < currentStep ? '#32CD32' : '#DCDCDC' }
            ]} />
            <Text style={styles.label}>{labels[index]}</Text>
          </View>
          {index < totalSteps - 1 && (
            <View style={[
              styles.line,
              { backgroundColor: index < currentStep ? '#32CD32' : '#DCDCDC' }
            ]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#F6F5F2',
    height: 62
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
   flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  line: {
    width: 60, 
    height: 2, 
    bottom:9 
  },
  label: {
    marginTop: 5, 
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
});

export default ProgressBar;
