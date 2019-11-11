import React, { Component } from 'react'
import { View, Platform, Image } from 'react-native'
import { Icon, Header } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';


class App extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: 'black' }}
          centerComponent={{ text: 'MY TITLE', style: { color: 'black' } }}
          rightComponent={{ icon: 'home', color: 'black' }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            marginTop: Platform.OS === 'ios' ? 0 : - 25,
          }}
        />
        <Icon
          reverse
          name='ios-american-football'
          type='ionicon'
          color='#517fa4'
        />
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'data:image/jpeg;base64,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'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SMEM5F4Mn7jXjQTiWBaKMUj2YwJ74Tbf-q0G-N4aKlZ7VdIh'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon type="ionicon" name="md-thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon type="ionicon" name="md-chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
      </View>
    )
  }
}

export default App