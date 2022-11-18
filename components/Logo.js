import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/logo.png';

export function Logo(props) {
  return (
    <View>
      <Image source={logo} style={styles.brand} />
    </View>
  )
}

const styles = StyleSheet.create({
  brand: {
    width: 60,
    height: 40,
    paddingHorizontal: 15
  },
});