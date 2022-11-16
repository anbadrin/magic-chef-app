import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export function Explore(props){
    const API_KEY = "dce523266emshebcbdd167205bf2p17d2e6jsnef3223cc188a"
    const apiURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples,flour,sugar"
  
    /*const getRecipes = async() => {
      const reviewURL = apiURL
    
      fetch(reviewURL, {headers:{
        'X-RapidAPI-Key':API_KEY
      }})
      .then(response => response.json())
      .then(results=>{
      })
    }*/
  
    return(
    <View style={styles.tiles}>
          <TouchableOpacity
            onPress={()=>{
              //getRecipes()
            }}
          >
            <ImageBackground
              source = {props.source}
              style = {styles.tileImages}
              resizeMode = "stretch"
              blurRadius = "6">
                <View style={styles.tileTextBackground}>
                  <Text style={styles.tileText}>{props.title}</Text>
                </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    )
  }

  const styles = StyleSheet.create({
    tiles: {
        marginVertical: 15
      },tileImages: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
      },tileTextBackground: {
        backgroundColor: 'black',
        padding: 5
      }, tileText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#dff5e5',
      }, 
  });