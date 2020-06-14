import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View, Button} from 'react-native';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';
import useLinking from './navigation/useLinking';
import HomeScreen from './screens/HomeScreen';
import FiltersScreen from './screens/FiltersScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const {getInitialState} = useLinking(containerRef);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();
                setInitialNavigationState(await getInitialState());
                await Font.loadAsync({
                    ...Ionicons.font
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    const store = configureStore();

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen
                                name="Home" component={HomeScreen}
                                options={({ navigation, route }) => ({
                                    headerRight: () => (
                                        <View style={styles.icon}>
                                            <Icon name='filter'
                                                  size={30}
                                                  onPress={() => navigation.push('Filters')}
                                            />
                                        </View>
                                    ),
                                })}
                            />
                            <Stack.Screen name="Filters" component={FiltersScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon:{
        marginRight:15
    }
});
