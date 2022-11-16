import { CardList } from 'react-native-card-list';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where} from "firebase/firestore";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyApYyz1kvVE50l3EOF6S7fJpX3wxMkm-ew",
  authDomain: "magicchef-87681.firebaseapp.com",
  projectId: "magicchef-87681",
  storageBucket: "magicchef-87681.appspot.com",
  messagingSenderId: "315051786569",
  appId: "1:315051786569:web:774f3dcd477e98714e5a98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function CookBook(props){
  const navigation = useNavigation();
  const cards = []
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    getData()
    console.log("Recipe list:", recipes)
  },[])

  const getData = async()=>{
    const docRef = collection(db, "userRecipes")
    console.log("I am here")
    const recipeArray = []
    //console.log(allIngredients)
    //const queryString = query(docRef, where("ingredients", "array-contains-any", allIngredients) )
    const docSnap = await getDocs(docRef)
    console.log(docSnap.docs)
      docSnap.docs.forEach((doc) => {
        console.log("id=",doc.id)
        recipeArray.push(doc.data())
        console.log("Recipes here are:",recipeArray)
      });
      setRecipes(...recipes,recipeArray)
  }
  console.log("Length:",recipes)
  for (let i = 0; i < recipes.length; i++) {
    cards.push({
      id: recipes[i].id.toString(),
      title: recipes[i].title,
      picture: {uri:recipes[i].image},
      content: 
      <View>
      <Text style={styles.description}><RenderHtml source={{html:recipes[i].summary} }/></Text>
      <Text style={styles.description}>Preparation Time: {recipes[i].preparationMinutes}</Text>
      <Text style={styles.description}>Cooking Time: {recipes[i].cookingMinutes}</Text>
      <Text style={styles.description}><Text style={{fontWeight:'bold'}}>Servings: </Text>{recipes[i].servings}</Text>
      <TouchableOpacity
      style={{
        borderWidth:1,
            borderColor:'black',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#fff',
            borderRadius:50
      }}
      onPress={async()=>{
        navigation.navigate("Recipe",{'recipes': recipes[i]})
        //<Recipe recipes={props.route.params.recipes[0]} description={props.route.params.description[0]}/>
      }}
      >
        <Text>Read More</Text>
      </TouchableOpacity>
      </View>
    });
}
console.log("Cards=",cards);
  return(
      <View style={styles.cardContainer}>
      <CardList cards={cards} />
      </View>
  )
}

const styles = StyleSheet.create({
  cardContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  }, description:{
    textAlign: 'justify',
    margin: 20
  },
});