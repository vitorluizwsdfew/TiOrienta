import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, SafeAreaView, View, Keyboard, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function BarraPesquisa({ setDestino, onDestinoAtualizado }) {
  const [text, setText] = useState("");
  const apiKey = 'AIzaSyBueXL8uHxfmt_X991-3c7hxhChCIgu30Q';
  const handleChangeDestino = (novoDestino) => {
    setDestino(novoDestino);
    onDestinoAtualizado();
}
  
  const solicitar = async () => {
    Keyboard.dismiss();
    
    if (!text.trim()) {
      Alert.alert('Por favor, insira um endereço válido.');
      return;
    }
    
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=${apiKey}`);
      const resultados = await response.json();

      console.log('Resultados da API:', resultados);

      if (resultados.results && resultados.results.length > 0) {
        const location = resultados.results[0].geometry.location;

        console.log('Coordenadas do Destino:', {
          latitude: location.lat,
          longitude: location.lng,
        });
        setDestino({
          latitude: location.lat,
          longitude: location.lng,
        });
        console.log("setDestino", setDestino)
        

        onDestinoAtualizado(); // adicionei isso aqui para chamar a função de atualização do mapa
      } else {
        console.log('Nenhum resultado encontrado');
        Alert.alert('Nenhum resultado encontrado para o endereço informado.');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao solicitar o endereço. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={style.view}>
      <View style={style.cabecalho}>
        <StatusBar barStyle="light-content" />
        
        <TextInput 
          placeholder='Selecionar Destino'
          style={style.input}
          autoCorrect={false}
          autoCapitalize='none'
          value={text}
          onChangeText={setText}
          onSubmitEditing={solicitar}
        /> 

        <Ionicons
          name='search'
          size={35}
          color='white'
          onPress={solicitar}
        />
      </View>  
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  cabecalho: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 50,
    marginTop: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  view: {
    marginTop: StatusBar.currentHeight,
  },
});

export default BarraPesquisa;
