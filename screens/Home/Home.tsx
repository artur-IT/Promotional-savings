import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import YearSaving from '../../components/Home/YearSaving';
import MonthSaving from '../../components/Home/MonthSaving';
import LastAdd from '../../components/Home/LastAdd';
import GoalProgress from '../../components/Goal/GoalProgress';
import Top from '../../components/Top';

const PlaceholderImage = require('../../assets/images/money-bag_big.png');

export default function HomeWithGoal() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={PlaceholderImage} style={styles.image} />
      <View style={styles.titleContainer}>
        <Top hideImage={true} />
      </View>

      <View style={styles.year}>
        <YearSaving />
      </View>

      <View style={styles.circles}>
        <MonthSaving />
        <LastAdd />
      </View>

      <GoalProgress variant="home" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: 50,
  },
  titleContainer: {
    alignSelf: 'center',
    display: 'flex',
    marginBottom: 40,
    width: '100%',
  },
  title: {
    fontFamily: 'PoiretOne', // Prosta nazwa pliku
    color: colors.text.title,
    textAlign: 'center',
    fontSize: 32,
    letterSpacing: 1, // Dodatkowo dla piękna
  },
  topImage: {
    position: 'absolute',
    top: -170,
    right: -10,
    width: '100%',
    maxWidth: 400,
    height: 400,
  },
  image: {
    position: 'absolute',
    top: 190,
    width: '90%',
    maxWidth: 370,
    height: 370,
    opacity: 0.3,
  },
  year: {
    marginTop: 100,
    alignSelf: 'flex-start',
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 40,
  },
});
