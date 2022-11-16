import { Input } from 'react-native-elements';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FormInput(props){
    const [value, setValue] = useState(null);
    return(
      <View>
      <Text style={styles.instructionContent}>
        {props.label}
      </Text>
      <View style={styles.dropDownRow}>
        <View style={styles.inputRow}>
      <Input
        style={styles.inputField}
        placeholder='Enter Ingredient Name'
        onChangeText={item => {
          setValue(item);
        }}
      />
      </View>
      <TouchableOpacity
        style={styles.addMore}
        onPress={()=>props.onChangeText(value)}>
        <Ionicons name="add-circle-sharp" size={24} color="#acacac" />
        </TouchableOpacity>
      </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    label: {
        marginHorizontal: 16,
        paddingTop: 8,
        fontSize: 16,
      },dropDownRow: {
        flexDirection: 'row',
        margin: 5,
        width: '100%',
      },inputRow: {
        flex: 10,
      },inputField: {
        fontFamily: "Cochin",
        fontSize: 16,
        color: '#9dc7c8',
      }, addMore: {
        flex: 1,
        margin: 16,
      },instructionContent: {
        fontFamily: "Cochin",
        fontSize: 18,
        margin: 10,
        color: '#9dc7c8',
      },
  });