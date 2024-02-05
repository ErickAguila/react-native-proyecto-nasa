import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import TodaysImage from '../../components/TodaysImage';
import fetchApi from '../../utils/fetch';
import {PostImage} from '../../types';
import {format, sub} from 'date-fns';

const Home = () => {
  const [todayImage, setTodayImage] = useState<PostImage>({});
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState([]);

  useEffect(() => {
    const loadTodaysImage = async () => {
      try {
        const todayImageResponse = await fetchApi();
        setTodayImage(todayImageResponse);
      } catch (error) {
        console.error(error);
        setTodayImage({}); //Valor por defecto
      }
    };

    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todayDate = format(date, 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days: 5}), 'yyyy-MM-dd');

        const lastFiveDaysImagesResponse = await fetchApi(
          `&start_date=${fiveDaysAgoDate}&end_date=${todayDate}`,
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadTodaysImage().catch(null);
    loadLast5DaysImages().catch(null);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todayImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Home;
