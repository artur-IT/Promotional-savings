import { StyleSheet, Text, View, Image } from 'react-native';

const TopImage = require('../assets/images/top_bg.gif');
const PlaceholderImage = require('../assets/images/money-bag_big.png');

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
      <Text style={styles.slogan}>Promocyjne</Text>
      <Image source={PlaceholderImage} style={styles.image} />
      <Text style={styles.slogan}>oszczędności</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  topImage: {
    position: 'absolute',
    top: -70,
    width: '100%',
    height: 400,
  },
  slogan: {
    position: 'relative',
    top: 20,
    fontSize: 24,
    color: '#ffffff',
  },
  image: {
    position: 'relative',
    top: 20,
    width: 70,
    height: 70,
  },
});
