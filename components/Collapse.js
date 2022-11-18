import Collapsible from 'react-native-collapsible';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export const Collapse = ({children, title}) => {
    const [collapsed, setCollapsed] = useState(true)
    //console.log("Title=",title)
    return (
    <>
    <TouchableOpacity
        style={{
            borderWidth:0,
                borderColor:'black',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#070707',
                borderRadius:50
          }}
          onPress={()=>{
            setCollapsed(collapsed => !collapsed)
          }}
        >
            <View style={styles.headerContainer}>
          <Text style={styles.subHeaderStyles}>{title}</Text> 
          <MaterialIcons name="expand-more" size={24} color="#9dc7c8"  style={styles.expand}/>
          </View>
        </TouchableOpacity>
       <Collapsible
        collapsed={collapsed}
        align="center"
        
      >
        {children}
      </Collapsible >
      </>
    )
  }

  const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row'
    },
  subHeaderStyles: {
    fontFamily: "Cochin",
    fontSize: 27,
    margin: 10,
    fontWeight: 'bold',
    color: '#9dc7c8',
    flex:5
  }, expand:{
      flex:1
  }
});