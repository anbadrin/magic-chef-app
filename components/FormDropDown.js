import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FormDropDown(props){
    const [value, setValue] = useState(null);
    return(
    <View>
    <Text style={styles.instructionContent}>
      {props.label}
    </Text>
    <View style={styles.dropDownRow}>
      <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.list}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      />
      <TouchableOpacity
        style={styles.addMore}
        onPress={()=>
          props.onChange(value)
          }>
          <Ionicons name="add-circle-sharp" size={24} color="#acacac" />
        </TouchableOpacity>
      </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        flex: 10
      },dropDownRow: {
        flexDirection: 'row',
      },label: {
        marginHorizontal: 16,
        paddingTop: 8,
        fontSize: 16,
      },placeholderStyle: {
        fontSize: 16,
        color: '#acacac',
        fontFamily: 'Cochin'
      },selectedTextStyle: {
        fontSize: 16,
        color: '#acacac',
        fontFamily: 'Cochin'
      },iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
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