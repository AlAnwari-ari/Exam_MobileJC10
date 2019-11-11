import React, { Component } from 'react'
import { View, ActivityIndicator, Image, ScrollView } from 'react-native'
import { Header, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { inputEditCaptionChange, saveEditPost, selectProfilePostRefresh } from '../actions'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';


class EditPostDetail extends Component {

    // componentDidUpdate () {
    //     if(this.props.captionEdit === '') {
    //         this.props.navigation.navigate('PostDetail', {
    //             onGoBack: () => this.props.selectProfilePostRefresh(this.props),
    //           });
    //     }
    // }

    onBtnSaveEditPost = () => {
        this.props.saveEditPost({
            id: this.props.id,
            caption: this.props.captionEdit, 
            imageURL: this.props.imageURL, 
            userId: this.props.userId
        })
        this.props.selectProfilePostRefresh(this.props.id)
        this.props.navigation.goBack();
    }

    render () {
        return (
            <View style={{ flex: 1}}>
                <Header
                    placement="left"
                    leftComponent={{ 
                        icon: 'clear', 
                        color: 'black',
                        onPress: () => this.props.navigation.goBack() 
                    }}
                    centerComponent={{ 
                        text: 'Edit Info', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    rightComponent={this.props.loading ? <ActivityIndicator size="small" color="#4388d6"/> : { 
                        icon: 'done', 
                        color: '#4388d6',
                        onPress: () => this.onBtnSaveEditPost()
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />

                <ScrollView>
                    <Card>
                        <CardItem>
                            <Left style={{flex: 3}}>
                                <Thumbnail source={{uri : this.props.userPhoto}}/>
                                <Body>
                                    <Text>{this.props.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Icon 
                                    name='more-vert'
                                    size={20}
                                    onPress={() => this.setState({ isVisible: true })}    
                                />
                            </Right>
                        </CardItem>
                        <CardItem cardBody>
                                <Image source={{uri: this.props.imageURL }} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Input 
                                    placeholder="Caption" 
                                    value={this.props.captionEdit}
                                    onChangeText={this.props.inputEditCaptionChange}       
                                />
                                <Text>{this.props.error}</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </ScrollView>
                
            </View>

        )
    }
}

const mapStateToProps = ({ editPost, post }) => {
    return {
        ...editPost,
        ...post.selectedPostDetailProfile

    }
}

export default connect(mapStateToProps, { inputEditCaptionChange, saveEditPost, selectProfilePostRefresh })(EditPostDetail);