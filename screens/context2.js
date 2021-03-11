import React, {Component} from 'react';
import { Image, StyleSheet } from 'react-native'

  
 export default class ImageElement extends Component {
    render(){
        return(
            <Image source={this.props.imgSource} style={styles.Image}></Image>
        );
    }

 }

 const styles = StyleSheet.create({
    Image: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    }
 });