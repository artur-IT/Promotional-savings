import { Image, StyleSheet, View, ScrollView } from 'react-native';
import YearSaving from '../../components/Home/YearSaving';
import MonthSaving from '../../components/Home/MonthSaving';
import LastAdd from '../../components/Home/LastAdd';
import GoalProgress from '../../components/Goal/GoalProgress';
import colors from '../../constants/colors';

const PlaceholderImage = require('../../assets/images/money-bag_big.png');

export default function HomeWithGoal() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={PlaceholderImage} style={styles.image} />

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
    flex: 1,
    flexGrow: 1,
    paddingTop: 50,
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  image: {
    position: 'absolute',
    top: 120,
    width: '100%',
    maxWidth: 370,
    height: 370,
    opacity: 0.3,
    alignSelf: 'center',
  },
  year: {
    marginTop: 40,
    alignSelf: 'flex-start',
  },
  circles: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  goalProgress: {
    marginTop: 40,
  },
});
