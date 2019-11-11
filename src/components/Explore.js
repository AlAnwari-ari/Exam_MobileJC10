import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectExpPost } from '../actions';

class Explore extends Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };
    

    selectPostPress = (selectedPost) => {
        this.props.selectExpPost(selectedPost)
        this.props.navigation.navigate('ExploreDetail')
    }

    renderListPost = () => {
        var filter = (post) => {
            return (this.props.user.uid != post.userId && post.caption.toLowerCase().includes(this.state.search.toLowerCase()))
        }
        var filteredPostList = this.props.postList.filter(filter)
        var i = 2

        return filteredPostList.map((item, index) => {
            var styleObj = { width: '33%', marginVertical: 1 }
            if((index + 1) === i ) {
                i += 3
                styleObj.marginHorizontal = '0.5%'
            }

            return (
                <TouchableWithoutFeedback onPress={() => this.selectPostPress(item)}>
                    <View 
                        style={styleObj}
                    >
                        <Image source={{uri: item.imageURL }} style={{height: 125, width: '100%' }}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }

    render() {
        console.log(this.props.user)
        if(this.props.user) {
            return (
                <View style={{ flex: 1 }}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        containerStyle={{ backgroundColor: '#fff' }}
                        inputContainerStyle={{ backgroundColor: '#fff' }}
                        inputStyle={{ color: 'black'}}
                        lightTheme={true}
                        searchIcon={{ size: 27 }}
                    />
                    <ScrollView>
                        <View 
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1
                            }}
                        >
                            {this.renderListPost()}
                        </View>
                    </ScrollView>
                </View>
            )
        }

        return <View />
    }
}

const mapStateToProps = ({ auth, post }) => {
    return { user: auth.user, postList: post.postList }
}

export default connect(mapStateToProps, { selectExpPost })(Explore);