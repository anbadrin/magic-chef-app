import { StyleSheet, Text, View } from 'react-native';

export function Title(props){
    return(
    <View>
      <Text styles={styles.headerTitle}>{props.title}</Text>
    </View>
    )
  }

  const styles = StyleSheet.create({

  });