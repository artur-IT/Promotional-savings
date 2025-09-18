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
      // contentContainerStyle={styles.contentContainer}
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

      <View style={styles.goalProgress}>
        <GoalProgress variant="home" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    // minHeight: '100%',
    // paddingBottom: 50,
  },
  titleContainer: {
    alignSelf: 'center',
    // display: 'flex',
    flex: 1,
    // marginBottom: 40,
    width: '100%',
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
    position: 'relative',
    top: 130,
    alignSelf: 'flex-start',
  },
  circles: {
    position: 'relative',
    top: 180,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  goalProgress: {
    position: 'relative',
    top: 240,
  },
});
