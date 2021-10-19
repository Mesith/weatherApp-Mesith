import React from 'react'
import {StyleSheet, Text} from 'react-native'

const TemparatureView = ({temparature}) => {
    return (
            <Text style={style.tempStyle}>{Math.round(temparature)}°</Text>
    )
}

export default TemparatureView

const style = StyleSheet.create({
    tempStyle:{
        fontSize:42,
        paddingBottom:10,
        fontWeight:'700'
    }
})