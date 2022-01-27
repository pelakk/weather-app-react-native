import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather'

const API_KEY = 'f77cd802a6ef1b758ad202551f4d478c';


export default function App() {

  const [weather, setWeather] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeather(cityName) {
      setLoaded(false);
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      try {
          const response = await fetch(API);
          if(response.status == 200) {
            const data = await response.json();
            setWeather(data);
          } else {
            setWeather(null);
          }
          setLoaded(true);
          
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    fetchWeather('Dubai');
    console.log(weather);
  }, [])
  

  if(!loaded) {
    return (
      <View style={styles.container}>
          <ActivityIndicator color='gray'  size={36} />
      </View>
    )
  }

  else if(weather === null) {
      return (
          <View style={styles.container}>
              <Text>City Not Found! Try Different City</Text>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weather} fetchWeather={fetchWeather}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
