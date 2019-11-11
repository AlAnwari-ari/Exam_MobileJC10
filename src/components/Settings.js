import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { onUserLogout } from '../actions'
import { StackActions, NavigationActions } from 'react-navigation'

class Settings extends Component {
    componentDidUpdate () {
        if(!this.props.user) {
            // this.props.screenProps.rootStackNavigator.navigation('Login')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })]
            })
            this.props.screenProps.rootStackNavigator.dispatch(resetAction)

        }
    }

    render() {
        return (
            <View>
                <Header
                    placement='left'
                    centerComponent={{ 
                        text: 'Settings', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftComponent={{
                        icon: 'arrow-back',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />
                <Button
                    title="Log Out"
                    containerStyle={{
                        margin: 15,
                        borderWidth: 0.5,
                        borderColor: 'gray'
                    }}
                    buttonStyle={{ borderColor: 'gray'}}
                    titleStyle={{ color: 'black'}}
                    type='outline'
                    onPress={this.props.onUserLogout}     
                />

            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, { onUserLogout })(Settings);