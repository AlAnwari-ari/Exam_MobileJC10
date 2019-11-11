import React from 'react'
// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'
import Home from './Home';
// import ProfileDrawer from './ProfileDrawer';
import StackProfile from './StackProfile';
import PostPhoto from './PostPhoto'
import StackExplore from './ExploreStack';


export default createAppContainer(createBottomTabNavigator(
  {
    Home: Home,
    PostPhoto: PostPhoto,
    StackExplore: StackExplore,
    StackProfile: StackProfile

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
          
        } else if(routeName === 'StackProfile') {
          iconName = 'account-box'
        } else if(routeName === 'PostPhoto') {
          iconName = 'add-box'
        } else if(routeName === 'StackExplore') {
          iconName = 'search'
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
));