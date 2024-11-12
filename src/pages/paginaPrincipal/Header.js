import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Icones from './Icones';
import Feedback from './Feedback';
import COP30 from './COP30';
import RetornoPesquisa from './RetornoPesquisa';
import BarraPesquisa from './BarraPesquisa';
import index from '../../routes/index';
import TelaMapa from './RetornoPesquisa';

const Stack = createStackNavigator();

export default function App() {
    const [Destino, setDestino] = useState({}); 
    const [regiao, setRegiao] = useState(null);

    const handleDestinoAtualizado = () => {
        console.log('atualizando mapa com o novo destino');
        setRegiao({
            latitude: Destino.latitude,
            longitude: Destino.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log("regiao", setRegiao)
    };

        useEffect(() => {
        if (Destino.latitude && Destino.longitude) {
            handleDestinoAtualizado();
        }
    }, [Destino]);

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                options={{ headerShown: false }}>
                {() => <Header setDestino={setDestino} onDestinoAtualizado= {handleDestinoAtualizado}/>}
                
            </Stack.Screen>

            <Stack.Screen 
                name="index" 
                component={index} 
                options={{ headerShown: false }} 
            />

            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="COP30" component={COP30} />
        </Stack.Navigator>
    );
}

function Header({ setDestino, onDestinoAtualizado }) {
    const [Destino, setDestinoState] = useState({}); 

    return (
        <View style={style.fundo}>
            <View style={style.containerBack}>  
                <View style={style.container}>  
                    <TelaMapa/>
                    <BarraPesquisa setDestino={setDestino} onDestinoAtualizado={onDestinoAtualizado} />
                </View>
                <Icones /> 
            </View>
            <RetornoPesquisa Destino={Destino} />
        </View>   
    );
}

const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#E6F0FF',
        flex: 1,
    },
    container: {
        backgroundColor: '#005EEB',
        alignItems: 'center',
        paddingTop: 30,
        paddingVertical: 9,
        height: 100,
        justifyContent: 'flex-start',
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    containerBack: {
        backgroundColor: '#4891FF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});
