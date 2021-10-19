
import * as React from 'react';
import { useCallback } from 'react';
import { Button, Text, TextInput, View , StyleSheet, TouchableOpacity} from 'react-native';
import { AuthContext } from './appNavigator';

const SignInScreen = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    return (
      <View style={style.signInContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={style.textInputStyle}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={style.textInputStyle}
        />
        <TouchableOpacity
        style={style.button}
        onPress={()=>{
          signIn({ username, password })
        }}
      >
        <Text style={style.buttontext}>Sign In</Text>
      </TouchableOpacity>
      </View>
    );
  }

  const style = StyleSheet.create({
    signInContainer: {
      paddingLeft: 12,
      paddingRight: 12,
      marginRight:5,
      marginLeft:5,
      display: 'flex',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#EFE8E7',
    },
    textInputStyle: {
      fontSize:24,
      width:'100%',
      marginLeft:20,
      marginRight:20,
      backgroundColor:'white',
      textAlign:'center',
      marginTop:10,
      padding:10,
      borderRadius:5
    },
    button: {
      backgroundColor:'#228FDF',
      width:'80%',
      height:45,
      padding:10,
      borderRadius:5,
      marginLeft:35,
      marginRight:35,
      marginTop:20
    },
    buttontext: {
      alignSelf: 'center',
      fontSize:20,
      fontWeight:'400',
      color:'white'
    }
  });

export default SignInScreen;