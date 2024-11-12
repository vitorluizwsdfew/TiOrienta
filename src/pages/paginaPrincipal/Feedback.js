
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



function Feedback(){
    return(
        <View style={style.container}>
          <View style={style.top}>
            
          </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: '#E6F0FF',
        flex:1,
    },
    top:{
        backgroundColor: '005EEB',
        flex:1
    }
});
export default Feedback;