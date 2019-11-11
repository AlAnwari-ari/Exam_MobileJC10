import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Explore from './Explore'
import ExploreDetail from './PostDetailExplore'


const StackExplore = createAppContainer(createStackNavigator(
    {
        Explore : {
            screen: Explore
        },
        ExploreDetail: {
            screen: ExploreDetail
        }
    },
    {
        initialRouteName: 'Explore',
        headerMode: 'none'
    }
))

export default StackExplore;
