import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import logo from '../assets/logo.png';
import { StatusBar } from 'expo-status-bar';

export function HomePage(props){

    return (
      <ScrollView style={styles.background}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.headerStyles}>About Us</Text>
        <Text style={styles.content}>You have nothing in your kitchen and you feel hungry? Look no further! 
        Magic Chef is your go to app for such situations. Enter what you have in your kitchen, into the app and get a wide variety 
        of recipes to choose from. Choose from our vast list of ingredients or enter your own ingredients. We provide you with a 
        selection of recipes from a large database which also includes your fellow users' recipes that they have created in their 
        own kitchen.
        </Text>
        <Text style={styles.content}>Are you a master in your kitchen and would like to showcase your talents and recipes? 
        You can even add recipes to the application for other users to check out. Just add a few details about your recipe and share 
        it with other passionate cooks.
        </Text>
        <Text style={styles.headerStyles}>How to use the app?</Text>
        <Text style={styles.subHeaderStyles}>Search a recipe</Text>
        <Text style={styles.instructionContent}>1. Open the Search Recipe UI by clicking on Search Recipe option from the bottom left of your screen</Text>
        <Text style={styles.instructionContent}>2. Toggle for vegetarian and non-vegetarian options</Text>
        <Text style={styles.instructionContent}>3. Check all the boxes of the ingredients that you have in your kitchen</Text>
        <Text style={styles.instructionContent}>4. Enter any other ingredients that you own</Text>
        <Text style={styles.instructionContent}>5. Click on search button to get some delicious recipes</Text>
        <Text style={styles.subHeaderStyles}>Add a recipe</Text>
        <Text style={styles.instructionContent}>1. Open the Add Recipe UI by clicking on Add Recipe option from the bottom of your screen</Text>
        <Text style={styles.instructionContent}>2. Enter the details on the screen and click on add recipe button</Text>
        <Text style={styles.instructionContent}>3. An alert would be displayed when the recipe is added</Text>
        <Text style={styles.subHeaderStyles}>My cookbook</Text>
        <Text style={styles.instructionContent}>1. Open the My Cookbook UI by clicking on My Cookbook option from the bottom right of your screen</Text>
        <Text style={styles.instructionContent}>2. You can see all the recipes added by you</Text>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    headerStyles: {
      fontFamily: "Cochin",
      fontSize: 35,
      margin: 10,
      fontWeight: 'bold',
      color: '#9dc7c8',
    }, background: {
      backgroundColor: '#070707'
    }, content: {
      fontFamily: "Cochin",
      fontSize: 20,
      margin: 10,
      color: '#9dc7c8',
    }, subHeaderStyles: {
      fontFamily: "Cochin",
      fontSize: 27,
      margin: 10,
      fontWeight: 'bold',
      color: '#9dc7c8',
    }, instructionContent: {
      fontFamily: "Cochin",
      fontSize: 18,
      margin: 10,
      color: '#9dc7c8',
    }, logo: {
      width: '100%',
      height: 210,
    }
  });