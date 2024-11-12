import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import BarraPesquisa from './BarraPesquisa'; // Certifique-se de importar a BarraPesquisa

const TelaMapa = () => {
    const [regiao, setRegiao] = useState(null);
    const [Destino, setDestino] = useState({}); 
    const [userLocation, setUserLocation] = useState(null);
    const [rotaCoord, setRotaCoord] = useState([]);

    const fetchRoute = async () => {
        const origin = `${userLocation.latitude},${userLocation.longitude}`;
        const dest = `${Destino.latitude},${Destino.longitude}`;

        const apiKey = 'AIzaSyBueXL8uHxfmt_X991-3c7hxhChCIgu30Q'; 
        
        try {
            
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${apiKey}`);
            const data = await response.json();
            console.log("OLaaaaaaaaaaaaaaaaaaaaaaaaaaa")

            if (data.routes.length > 0) {
                const points = decodePolyline(data.routes[0].overview_polyline.points);
                setRotaCoord(points);
                
            } else {
                Alert.alert('Rota não encontrada', 'Não foi possível encontrar uma rota para o destino informado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar a rota. Tente novamente.');
        }
    };


    useEffect(() => {
        const getLocation = async () => {
            
            console.log("verificando userLocation e destino")
            console.log("UserLocation", userLocation)
            console.log("Destino", Destino)
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão de localização necessária!', 'Por favor, permita o acesso à sua localização.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            setRegiao({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        };

        getLocation();
    }, []); 

    
    useEffect(() => {
        if (userLocation && Destino.latitude !== undefined && Destino.longitude !== undefined) {
            console.log('Usuario:', userLocation)
            console.log('Destino:', Destino)
            setRegiao({
                latitude: Destino.latitude,
                longitude: Destino.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }); 
      
            fetchRoute();
        }
    }, [userLocation, Destino]); 
   
  
    const decodePolyline = (t) => {
        
        let points = [];
        let index = 0, len = t.length;
        let lat = 0, lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result >> 1) ^ -(result & 1));
            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result >> 1) ^ -(result & 1));
            lng += dlng;

            points.push({
                latitude: (lat / 1E5),
                longitude: (lng / 1E5),
            });
        }
        return points;
    };

    if (!regiao) {
        return null; 
    }

    return (
        <View style={style.container}>
            <MapView style={style.map} region={regiao}>
                {userLocation && <Marker coordinate={userLocation} title='Você está aqui' />}
                {Destino.latitude && Destino.longitude && <Marker coordinate={Destino} title='Destino' />}
                <Polyline coordinates={rotaCoord} strokeWidth={5} strokeColor='blue' />
            </MapView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default TelaMapa;
