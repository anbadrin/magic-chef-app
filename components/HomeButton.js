import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function HomeButton(props) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.screenName)
        }}
        color="black"
        style={styles.home}
      >
        <FontAwesome name="home" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    paddingHorizontal: 15
  },
});