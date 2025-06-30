import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YearSaving from '../../components/Home/YearSaving';
import MonthSaving from '../../components/Home/MonthSaving';
import LastAdd from '../../components/Home/LastAdd';
import GoalProgress from '../../components/Home/GoalProgress';
import Button from '../../components/Button';

const TopImage = require('../../assets/images/top_bg.jpg');
const PlaceholderImage = require('../../assets/images/money-bag.jpg');

export default function HomeWithGoal() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
      <Image source={PlaceholderImage} style={styles.image} />
      <Text style={styles.slogan}>Promocyjne oszczędności</Text>

      <View style={styles.year}>
        <YearSaving />
      </View>

      <View style={styles.circles}>
        <MonthSaving />
        <LastAdd />
      </View>

      <GoalProgress />

      <View style={styles.buttons}>
        <Button
          title="Dodaj oszczędność"
          onPress={() => (navigation as any).navigate('NewSaving')}
          width={150}
        />

        <Button
          title="Dodaj Cel"
          onPress={() => (navigation as any).navigate('Goal')}
          width={150}
        />

        <Button
          title="Historia oszczędności"
          onPress={() => (navigation as any).navigate('History')}
          width={150}
        />

        <Button
          title="O aplikacji"
          onPress={() => (navigation as any).navigate('About')}
          width={150}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  link: { marginTop: 30, padding: 10, borderRadius: 5 },
  slogan: {
    marginLeft: -30,
    fontSize: 32,
    lineHeight: 40,
    marginTop: 30,
    marginBottom: 30,
    color: '#0084CE',
  },
  topImage: {
    position: 'absolute',
    top: -170,
    right: -10,
    width: 400,
    height: 400,
  },
  image: {
    position: 'absolute',
    top: 190,
    width: 370,
    height: 370,
    opacity: 0.3,
  },
  year: {
    position: 'relative',
    left: -110,
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 40,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
});
