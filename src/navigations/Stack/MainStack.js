import { createStackNavigator } from '@react-navigation/stack';
import JobPostScreen from '../Screens/JobPostScreen';
import PostedScreen from '../Screens/PostedScreen';
import ReviewScreen from '../Screens/ReviewScreen';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false  
            }}
            initialRouteName="Job Post Screen"  
        >
            <Stack.Screen name="Job Post Screen" component={JobPostScreen}/>
            <Stack.Screen name="Job Review Screen" component={ReviewScreen} />
            <Stack.Screen name="Posted Screen" component={PostedScreen} />
        </Stack.Navigator>
    );
}

export default MainStack;
