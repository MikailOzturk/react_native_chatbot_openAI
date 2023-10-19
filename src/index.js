import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const ChatGBT = () => {
    const [data, setData] = useState([]);
    const apiKey = 'Your OpenAi api key'
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions'
    const [textInput, setTextInput] = useState('');
    
    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiUrl,{
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const text = response.data.choices[0].text;
        setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}]);
        setTextInput('');

    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style= {styles.body}
        renderItem={({item}) => (
          <View style= {{flexDirection:'row', padding:10}}>
            <Text style={{fontWeight:'bold', color:item.type === 'user' ? 'green' : 'red'}}>
              {item.type === 'user' ? 'Person: ' : 'Bot: ' }  
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View> 
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text) }
        placeholder='Ask me anything'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSend}
      >
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatGBT

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffc9',
      alignItems: 'center',
    },
    title: {
        fontSize:28,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:70
    },
    body: {
        backgroundColor: '#ffc9',
        width:'102%',
        margin: 10
    },
    bot: {
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        paddingStart: 10
    },
    button: {
        backgroundColor: 'purple',
        width: '90%',
        height:60,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:10
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
  });