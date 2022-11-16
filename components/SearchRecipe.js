import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { FormDropDown } from './FormDropDown';
import { FormInput } from './FormInput';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where} from "firebase/firestore";
import { Checkbox } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

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

export function SearchRecipe(props){
    let spices=[{
      label:'Pepper',
      value: 'Pepper',
    },{
      label:'Chilli Powder',
      value: 'Chilli Powder',
    },{
      label: 'Nutmeg',
      value: 'Nutmeg'
    }
    ]
  
    let vegetables_and_meat=[
      {
        label: 'Avocado',
        value: 'Avocado'
      },{
        label: 'Chicken Breast',
        value: 'Chicken Breast'
      },{
        label: 'Zuccini',
        value: 'Zuccini'
      }
    ]
  
    const [selectedSpices, setSelectedSpices] = useState([]);
    const [selectedVegAndMeat, setSelectedVegAndMeat] = useState([]);
    const [otherIngredients, setOtherIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const vegetarianIngredients = [
      {condiments : "AllSpice", isSelected: false},
      {condiments : "Black Pepper", isSelected: false},
      {condiments : "Cloves", isSelected: false},
      {condiments : "Cumin", isSelected: false},
      {condiments : "Mustard", isSelected: false},
      {condiments : "Nutmeg", isSelected: false},
      {condiments : "Paprika", isSelected: false},
      {condiments : "Salt", isSelected: false},
      {condiments : "Bay Leaves", isSelected: false},
      {condiments : "Cayenne Pepper", isSelected: false},
      {condiments : "Chili Powder", isSelected: false},
      {condiments : "Chives", isSelected: false},
      {condiments : "Cinnamon", isSelected: false},
      {condiments : "Curry Powder", isSelected: false},
      {condiments : "Fennel Seeds", isSelected: false},
      {condiments : "Parsley", isSelected: false},
      {condiments : "Red Pepper", isSelected: false},
      {condiments : "Sesame Seeds", isSelected: false},
      {condiments : "Thyme", isSelected: false},
    ];

    const navigation = useNavigation();
    let recipeArray = []
    
    //const API_KEY = "dce523266emshebcbdd167205bf2p17d2e6jsnef3223cc188a"
    const API_KEY = "d0ef34dbeamsh997a7ce9316199fp13f04cjsn8f65a7349dbe"
    const apiURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients="
    const apiURLGetRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"
  
    const getRecipes = async() => {
      var ingredients = ""
      allIngredients.map((ingredient) =>{
        ingredients = ingredients+","+ingredient
      })
      const recipeURL = apiURL+ingredients
    
      const recipeResponse = await fetch(recipeURL, {headers:{
        'X-RapidAPI-Key':API_KEY
      }})
      const jsonResponse = await recipeResponse.json()
      
        let recipeList = jsonResponse

        for (let i = 0; i < recipeList.length; i++) {
          const item = recipeList[i];
          let ingredientList = item.usedIngredients
          let ingredientArray = []
          //let descriptions = []
          let summary = ''
          let preparationMinutes = 0
          let cookingMinutes = 0
          let servings = 0
          let stepsArray = []
          var descriptionURL = ''
          
          ingredientList.forEach((ingredient, index)=>{
            ingredientArray.push(ingredient.name)
          })
          
          descriptionURL = apiURLGetRecipe+item.id+'/information'
          console.log("Description URL=",descriptionURL)
    
          var descriptionResponse = await fetch(descriptionURL, {headers:{
            'X-RapidAPI-Key':API_KEY
          }})
          var description = await descriptionResponse.json();
            summary = description.summary
            preparationMinutes = description.preparationMinutes
            cookingMinutes = description.cookingMinutes
            servings = description.servings
            
            if (description.analyzedInstructions[0]){
            let instructionList = description.analyzedInstructions[0].steps
            let instructionsArray = []

            instructionList.forEach((instruction, index)=>{
              //console.log("The instruction is:",instruction)
              instructionsArray.push(instruction.step)
            })
            stepsArray = instructionsArray
          }
       

          let recipeObject = {
            id:item.id,
            title: item.title,
            ingredients: ingredientArray,
            image: item.image,
            summary: description.summary,
            preparationMinutes: description.preparationMinutes,
            cookingMinutes: description.cookingMinutes,
            servings: description.servings,
            instructions: stepsArray
          }

          recipeArray.push(recipeObject)
          //console.log("The recipeArray is:", recipeArray)
        }

    }

    const getData = async()=>{
      const docRef = collection(db, "userRecipes")
      //console.log(allIngredients)
      const queryString = query(docRef, where("ingredients", "array-contains-any", allIngredients) )
      const docSnap = await getDocs(queryString)
      //console.log(docSnap.docs)
        docSnap.docs.forEach((doc) => {
          //console.log(doc.data())
          let recipeList = doc.data()
          let recipeObject = {
            id:doc.id,
            title: recipeList.title,
            ingredients: recipeList.ingredients,
            image: recipeList.image,
            summary: recipeList.summary,
            preparationMinutes: recipeList.preparationMinutes,
            cookingMinutes: recipeList.cookingMinutes,
            servings: recipeList.servings,
            instructions: recipeList.instructions
          }
          recipeArray.push(recipeObject)
        });
    }
  
    const setAllIngredientsFunction = async(selectedIngredient)=>{
      setAllIngredients([...allIngredients,selectedIngredient])
    }
  
    useEffect(()=>{
      if(selectedSpices[selectedSpices.length-1] != undefined){
      setAllIngredientsFunction(selectedSpices[selectedSpices.length-1])
      }
    } ,[selectedSpices])
  
    useEffect(()=>{
      if(selectedVegAndMeat[selectedVegAndMeat.length-1] != undefined){
      setAllIngredientsFunction(selectedVegAndMeat[selectedVegAndMeat.length-1])
      }
    },[selectedVegAndMeat])
  
    useEffect(()=>{
      if (otherIngredients[otherIngredients.length-1] != undefined){
      setAllIngredientsFunction(otherIngredients[otherIngredients.length-1])
      }
    },[otherIngredients])
  
    return(
      <KeyboardAwareScrollView style={styles.background}>
        <Text style={styles.headerStyles}>Ingredients in my kitchen</Text>
      {/*<Text style={styles.instructionContent}>Are you looking for vegetarian recipes?</Text>
      <Switch
        trackColor={{ false: "#A43232", true: "#327D32" }}
        thumbColor={isEnabled ? "#fff" : "#fff"}
        ios_backgroundColor="#AE3232"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <Text style={styles.subHeaderStyles}>Condiments</Text>
      
      {vegetarianIngredients.map((ingredient, index) =>
      <View style={styles.checkboxContainer}>
      <Checkbox.Android
            status={vegetarianIngredients[index].isSelected ? 'checked' : 'unchecked'}
            onPress={() => {
               //console.log(vegetarianIngredients[index].isSelected)
               vegetarianIngredients[index].isSelected = !vegetarianIngredients[index].isSelected
               //console.log(vegetarianIngredients[index].isSelected)
               setAllIngredients([...allIngredients,ingredient.condiments]);
               //console.log(allIngredients)
            }}
            color='green'
            uncheckedColor='#9dc7c8'
          />
        <Text style={styles.label}>{ingredient.condiments}</Text>
          </View>
          )
          }*/}
      <FormDropDown label="Select the spices" list={spices} onChange={(value) => setSelectedSpices([...selectedSpices, value])} />
      <View style={{flexDirection:'row', height:20}}>
      {selectedSpices.map((spice) =>
      <TouchableOpacity
          style={styles.pills}
          onPress={()=>{
            var deleteIndex = selectedSpices.indexOf(spice);
            selectedSpices.pop(deleteIndex);
            setSelectedSpices(selectedSpices)
          }}
        >
          <View>
          <Text>{spice}</Text>
          </View>   
        </TouchableOpacity>)
        }
       </View>
       <FormDropDown label="Select vegetables and Meat" list={vegetables_and_meat} onChange={(value) => setSelectedVegAndMeat([...selectedVegAndMeat, value])} />
      <View style={{flexDirection:'row', height:20}}>
      {selectedVegAndMeat.map((veg) =>
      <TouchableOpacity
          style={styles.pills}
          onPress={()=>{
            var deleteIndex = selectedVegAndMeat.indexOf(veg);
            selectedVegAndMeat.pop(deleteIndex);
            setSelectedVegAndMeat(selectedVegAndMeat)
          }}
        >
        <View>
          <Text>{veg}</Text>
          </View>   
        </TouchableOpacity>)
        }
       </View>
       <FormInput label="Other Ingredients" onChangeText={(value) => setOtherIngredients([...otherIngredients, value])}/>
      <View style={{flexDirection:'row', height:20}}>
      {otherIngredients.map((other) =>
      <TouchableOpacity
          style={styles.pills}
          onPress={()=>{
            var deleteIndex = otherIngredients.indexOf(other);
            otherIngredients.pop(deleteIndex);
            setOtherIngredients(otherIngredients)
          }}
        >
          <View>
          <Text>{other}</Text>
          </View>   
        </TouchableOpacity>)
        }
      </View>

       <TouchableOpacity
        style={{
          borderWidth:1,
              borderColor:'black',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#9dc7c8',
              borderRadius:50,
              width: '50%',
              height: 30, 
              margin: 10,
              alignSelf: 'center'
        }}
        onPress={async()=>{
          await getRecipes(allIngredients)
          await getData()
          //console.log("The new recipe array is:",recipeArray)
          navigation.navigate("RecipeList",{'recipes': recipeArray})
        }}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }

  const styles = StyleSheet.create({
    headerStyles: {
      fontFamily: "Cochin",
      fontSize: 35,
      margin: 10,
      fontWeight: 'bold',
      color: '#9dc7c8',
    }, 
    subHeaderStyles: {
      fontFamily: "Cochin",
      fontSize: 27,
      margin: 10,
      fontWeight: 'bold',
      color: '#9dc7c8',
    },pills:{
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#9dc7c8',
        borderRadius:50,
        height:20,
        flex:1,
        margin:10,
        alignSelf: 'center'
      },switch: {
        margin: 10
      }, instructionContent: {
        fontFamily: "Cochin",
        fontSize: 18,
        margin: 10,
        color: '#9dc7c8',
      },background: {
        backgroundColor: '#070707'
      }, checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },label: {
        margin: 8,
        fontFamily: "Cochin",
        color: '#9dc7c8',
        fontSize: 18,
      },
  });