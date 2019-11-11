import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon, Input, Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import { onUserLogin } from '../actions'
import { StackActions, NavigationActions } from 'react-navigation'

class LoginForm extends Component {
    state = {
        passHidden: true,
        email : '',
        password: ''
    }

    componentDidUpdate () {     
        if (this.props.user) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'DrawerMain' })]
            })
            this.props.navigation.dispatch(resetAction)

            if(this.state.email !==''
                && this.state.password!== '') {
                this.setState({ email: '', password: '' })      
            }

        }
    }

    onBtnLoginPress = () => {
        if(!this.props.loading) {
            this.props.onUserLogin({
                email: this.state.email,
                password: this.state.password
            })
        }

    }

    render() {
        if (this.props.authChecked && !this.props.user) {
            return (
                <View style={style.containerStyle}>
                    <Animatable.Text animation={'fadeInDown'}>
                        <Text h3>Instagrin</Text>
                    </Animatable.Text>
                    <View style={style.inputStyle}>
                        <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='email'
                            size={24}
                            />
                        }
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                        />
    
                        <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            />
                        }
                        rightIcon={
                            <Icon
                            name={this.state.passHidden ? 'visibility-off' : 'visibility'}
                            size={24}
                            color={this.state.passHidden ? '#bfc3c9' : 'black'}
                            onPress={() => this.setState({passHidden: !this.state.passHidden})}
                            />
                        }
                        secureTextEntry={this.state.passHidden}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        />
                    </View>
    
                    <Text style={{ color: 'red'}}>{this.props.error}</Text>
    
                    <Button
                        title="Login"
                        containerStyle={{width: '95%', marginBottom: 10}}
                        buttonStyle={{ backgroundColor: 'black'}}
                        loading={this.props.loading}
                        onPress={this.onBtnLoginPress}
                    />
    
                    <Button
                        title="Register"
                        containerStyle={{ width: '95%' }}
                        buttonStyle={{borderColor: 'black', borderWidth: 1}}
                        titleStyle={{color: 'black'}}
                        type="outline"
                        onPress={() => this.props.navigation.navigate('Register')}
                    />   
                </View>
            )
        }

        return (
            <View style={style.containerStyle}>
                <Animatable.Text animation={'bounce'} iterationCount="infinite">
                    <Text h3>Authenticating...</Text>
                </Animatable.Text>

            </View>
        )
    }
}

const style = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10
    },
    inputStyle : {
        marginTop: 50,
        marginBottom: 100,
        width: '100%'
    }
})

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
        loading: auth.loadingLogin,
        error: auth.errorLogin,
        authChecked: auth.authChecked
    }
}

export default connect(mapStateToProps, { onUserLogin })(LoginForm);