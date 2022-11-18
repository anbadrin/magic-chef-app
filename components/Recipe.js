import RenderHtml from 'react-native-render-html';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export function Recipe(props){
  
    const API_KEY = "dce523266emshebcbdd167205bf2p17d2e6jsnef3223cc188a"
    const apiURLGetRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/657563/information?id="
  
    /*const getRecipeById = async(id) => {
      console.log(id)
      const reviewURL = apiURLGetRecipe+id
    
      fetch(reviewURL, {headers:{
        'X-RapidAPI-Key':API_KEY
      }})
      .then(response => response.json())
      .then(results=>{
        console.log("The recipe is:", results)
      })
    }*/
    const prepTime = parseInt(props.route.params.recipes.preparationMinutes) + parseInt(props.route.params.recipes.cookingMinutes)
    console.log(parseInt(props.route.params.recipes.preparationMinutes))
    return(
      <ScrollView style={styles.background}>
      <View>
      <Text style={styles.headerStyles}>{props.route.params.recipes.title}</Text>
      <Image style={styles.recipeImage} source={{uri:props.route.params.recipes.image} }/>
      <Text style={styles.instructionContent}>{props.route.params.recipes.summary}</Text>
      <Text style={styles.instructionContent}><Text style={{fontWeight:'bold'}}>Time Required: </Text>{prepTime}</Text>
      <Text style={styles.instructionContent}>Preparation Time: {props.route.params.recipes.preparationMinutes}</Text>
      <Text style={styles.instructionContent}>Cooking Time: {props.route.params.recipes.cookingMinutes}</Text>
      <Text style={styles.instructionContent}><Text style={{fontWeight:'bold'}}>Servings: </Text>{props.route.params.recipes.servings}</Text>
      <Text  style={styles.instructionContent}>Instructions:</Text>
      {props.route.params.recipes.instructions.map(instruction=>
        <Text style={styles.instructionContent}>{instruction}</Text>
      )}
      </View>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    pageTitle: {
        margin: 16,
        textAlign: 'center',
        fontSize: 18
      },recipeImage:{
        height: 200,
        contentWidth:"80%",
        justifyContent: "center",
        alignItems: "center",
        margin: 20
      }, description:{
        textAlign: 'justify',
        margin: 20
      },background: {
        backgroundColor: '#070707'
      },instructionContent: {
        fontFamily: "Cochin",
        fontSize: 18,
        margin: 10,
        color: '#9dc7c8',
      },
      headerStyles: {
        fontFamily: "Cochin",
        fontSize: 35,
        margin: 10,
        fontWeight: 'bold',
        color: '#9dc7c8',
        textAlign: 'center',
      }, 
  });