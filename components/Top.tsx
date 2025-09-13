import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { fonts } from '../constants/fonts';

const PlaceholderImage = require('../assets/images/money-bag_big.png');

// Props interface - definiuje jakie właściwości może przyjąć komponent
interface TopProps {
  hideImage?: boolean; // ? oznacza, że to opcjonalne
}

export default function Header({ hideImage = false }: TopProps) {
  return (
    <View style={styles.container}>
      {/* SVG background */}
      <Svg
        height="270"
        width="100%"
        viewBox="0 0 450 270"
        style={styles.topSvg}
        preserveAspectRatio="none"
      >
        <Path
          d="M0 70L18.8 69C37.7 68 75.3 66 112.8 78.2C150.3 90.3 187.7 116.7 225.2 118.8C262.7 121 300.3 99 337.8 86.7C375.3 74.3 412.7 71.7 431.3 70.3L450 69L450 0L431.3 0C412.7 0 375.3 0 337.8 0C300.3 0 262.7 0 225.2 0C187.7 0 150.3 0 112.8 0C75.3 0 37.7 0 18.8 0L0 0Z"
          fill="#0073e6"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </Svg>

      <Text style={styles.slogan}>
        {hideImage ? 'PROMOCYJNE' : 'Promocyjne'}
      </Text>
      {/* Pokazuj obrazek tylko gdy hideImage nie jest true */}
      {!hideImage && <Image source={PlaceholderImage} style={styles.image} />}
      <Text style={styles.slogan}>
        {hideImage ? ' OSZCZĘDNOŚCI' : 'Oszczędności'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  topSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 270,
    pointerEvents: 'none', // Allows touch events to pass through
  },
  slogan: {
    position: 'relative',
    top: 20,
    fontFamily: fonts.family.primary,
    color: '#ffffff',
    fontSize: 24,
  },
  image: {
    position: 'relative',
    top: 20,
    width: 70,
    height: 70,
  },
});
