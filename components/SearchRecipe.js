import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Collapse } from './Collapse.js';
import { Checkbox } from 'react-native-paper';

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

export function SearchRecipe(props) {
  var allIngredients = []

  const [condiments, setCondiments] = useState({
    "AllSpice": false,
    "Black Pepper": false,
    "Cloves": false,
    "Cumin": false,
    "Mustard": false,
    "Nutmeg": false,
    "Paprika": false,
    "Salt": false,
    "Bay Leaves": false,
    "Cayenne Pepper": false,
    "Chili Powder": false,
    "Chives": false,
    "Cinnamon": false,
    "Curry Powder": false,
    "Fennel Seeds": false,
    "Parsley": false,
    "Red Pepper": false,
    "Sesame Seeds": false,
    "Thyme": false,
  });

  const [dairy, setDairy] = useState({
    "Eggs": false,
    "Milk": false,
    "Yoghurt": false,
    "Cheese": false,
    "Buttermilk": false,
    "Whipped Cream": false,
    "Heavy Cream": false,
  });

  const [canned, setCanned] = useState({
    "Kidney Beans": false,
    "Black Beans": false,
    "Garbanzo Beans": false,
    "Refried Beans": false,
  });

  const [meat, setMeat] = useState({
    "Bacon": false,
    "Chicken Breast": false,
    "Beef": false,
    "Ground Turkey": false,
    "Ham": false,
    "Meat Balls": false,
    "Sausage": false,
    "Pork Roast": false,
    "Salami": false,
    "Sliced Chicken": false,
    "Steak": false,
    "Brisket": false,
    "Ground Beef": false,
    "Ground Pork": false,
    "Hot Dog": false,
    "Lamb": false,
    "Pepperoni": false,
  });

  const [pasta, setPasta] = useState({
    "Elbow Macaroni": false,
    "Gnocchi": false,
    "Lasagna": false,
    "Pasta Noodles": false,
    "Spaghetti Noodles": false,
    "White Rice": false,
    "Ravioli": false,
    "Mac and Cheese": false,
    "Ramen": false,
    "Rigatoni": false,
    "Shell": false,
    "Tortilleni": false,
  });

  const [produce, setProduce] = useState({
    "Apples": false,
    "Asparagus": false,
    "Banana": false,
    "Black Olives": false,
    "Broccoli": false,
    "Butternut Squash": false,
    "Carrot": false,
    "Celery": false,
    "Cherry Tomatoes": false,
    "Coconut": false,
    "Cranberries": false,
    "Eggplant": false,
    "Garlic": false,
    "Grapes": false,
    "Green Chilis": false,
    "Green Onions": false,
    "Jalapenos": false,
    "Lettuce": false,
    "Mango": false,
    "Olives": false,
    "Oranges": false,
    "Pears": false,
    "Peppers": false,
    "Pineapple": false,
    "Potatoes": false,
    "Red Peppers": false,
    "Scallions": false,
    "Squash": false,
    "Tomatoes": false,
    "Vegetables": false,
    "Yellow Peppers": false,
    "Kale": false,
    "Avocado": false,
    "Blueberries": false,
    "Brussel Sprouts": false,
    "Cabbage": false,
    "Cauliflower": false,
    "Cherries": false,
    "Corn": false,
    "Cucumber": false,
    "Green Peppers": false,
    "Lemons": false,
    "Mushrooms": false,
    "Onions": false,
    "Peaches": false,
    "Peas": false,
    "Pumpkin": false,
  });

  const [seafood, setSeafood] = useState({
    "Tuna": false,
    "Clams": false,
    "Crab": false,
    "Scallops": false,
    "Tilapia": false,
    "Cod": false,
    "Fish": false,
    "Salmon": false,
    "Shrimp": false,
  });

  const handleCondimentsChange = (e) => {
    setCondiments((state) => setCondiments({ ...state, [e]: !state[e] }))
  }

  const handleDairyChange = (e) => {
    setDairy((state) => setDairy({ ...state, [e]: !state[e] }))
  }

  const handleCannedChange = (e) => {
    setCanned((state) => setCanned({ ...state, [e]: !state[e] }))
  }

  const handleMeatChange = (e) => {
    setMeat((state) => setMeat({ ...state, [e]: !state[e] }))
  }

  const handlePastaChange = (e) => {
    setPasta((state) => setPasta({ ...state, [e]: !state[e] }))
  }

  const handleProduceChange = (e) => {
    setProduce((state) => setProduce({ ...state, [e]: !state[e] }))
  }

  const handleSeafoodChange = (e) => {
    setSeafood((state) => setSeafood({ ...state, [e]: !state[e] }))
  }

  const resetCheckbox = async () => {
    setCondiments({
      "AllSpice": false,
      "Black Pepper": false,
      "Cloves": false,
      "Cumin": false,
      "Mustard": false,
      "Nutmeg": false,
      "Paprika": false,
      "Salt": false,
      "Bay Leaves": false,
      "Cayenne Pepper": false,
      "Chili Powder": false,
      "Chives": false,
      "Cinnamon": false,
      "Curry Powder": false,
      "Fennel Seeds": false,
      "Parsley": false,
      "Red Pepper": false,
      "Sesame Seeds": false,
      "Thyme": false,
    });

    setDairy({
      "Eggs": false,
      "Milk": false,
      "Yoghurt": false,
      "Cheese": false,
      "Buttermilk": false,
      "Whipped Cream": false,
      "Heavy Cream": false,
    });

    setCanned({
      "Kidney Beans": false,
      "Black Beans": false,
      "Garbanzo Beans": false,
      "Refried Beans": false,
    });

    setMeat({
      "Bacon": false,
      "Chicken Breast": false,
      "Beef": false,
      "Ground Turkey": false,
      "Ham": false,
      "Meat Balls": false,
      "Sausage": false,
      "Pork Roast": false,
      "Salami": false,
      "Sliced Chicken": false,
      "Steak": false,
      "Brisket": false,
      "Ground Beef": false,
      "Ground Pork": false,
      "Hot Dog": false,
      "Lamb": false,
      "Pepperoni": false,
    });

    setPasta({
      "Elbow Macaroni": false,
      "Gnocchi": false,
      "Lasagna": false,
      "Pasta Noodles": false,
      "Spaghetti Noodles": false,
      "White Rice": false,
      "Ravioli": false,
      "Mac and Cheese": false,
      "Ramen": false,
      "Rigatoni": false,
      "Shell": false,
      "Tortilleni": false,
    });

    setProduce({
      "Apples": false,
      "Asparagus": false,
      "Banana": false,
      "Black Olives": false,
      "Broccoli": false,
      "Butternut Squash": false,
      "Carrot": false,
      "Celery": false,
      "Cherry Tomatoes": false,
      "Coconut": false,
      "Cranberries": false,
      "Eggplant": false,
      "Garlic": false,
      "Grapes": false,
      "Green Chilis": false,
      "Green Onions": false,
      "Jalapenos": false,
      "Lettuce": false,
      "Mango": false,
      "Olives": false,
      "Oranges": false,
      "Pears": false,
      "Peppers": false,
      "Pineapple": false,
      "Potatoes": false,
      "Red Peppers": false,
      "Scallions": false,
      "Squash": false,
      "Tomatoes": false,
      "Vegetables": false,
      "Yellow Peppers": false,
      "Kale": false,
      "Avocado": false,
      "Blueberries": false,
      "Brussel Sprouts": false,
      "Cabbage": false,
      "Cauliflower": false,
      "Cherries": false,
      "Corn": false,
      "Cucumber": false,
      "Green Peppers": false,
      "Lemons": false,
      "Mushrooms": false,
      "Onions": false,
      "Peaches": false,
      "Peas": false,
      "Pumpkin": false,
    });

    setSeafood({
      "Tuna": false,
      "Clams": false,
      "Crab": false,
      "Scallops": false,
      "Tilapia": false,
      "Cod": false,
      "Fish": false,
      "Salmon": false,
      "Shrimp": false,
    });
  }

  const navigation = useNavigation();
  let recipeArray = []

  //const API_KEY = "dce523266emshebcbdd167205bf2p17d2e6jsnef3223cc188a"
  const API_KEY = "d0ef34dbeamsh997a7ce9316199fp13f04cjsn8f65a7349dbe"
  const apiURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients="
  const apiURLGetRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"

  const getRecipes = async () => {
    var ingredients = ""
    allIngredients.map((ingredient) => {
      ingredients = ingredients + "," + ingredient
    })
    const recipeURL = apiURL + ingredients

    const recipeResponse = await fetch(recipeURL, {
      headers: {
        'X-RapidAPI-Key': API_KEY
      }
    })
    const jsonResponse = await recipeResponse.json()

    let recipeList = jsonResponse

    for (let i = 0; i < recipeList.length; i++) {
      const item = recipeList[i];
      let ingredientList = item.usedIngredients
      let ingredientArray = []
      let summary = ''
      let preparationMinutes = 0
      let cookingMinutes = 0
      let servings = 0
      let stepsArray = []
      var descriptionURL = ''

      ingredientList.forEach((ingredient, index) => {
        ingredientArray.push(ingredient.name)
      })

      descriptionURL = apiURLGetRecipe + item.id + '/information'

      var descriptionResponse = await fetch(descriptionURL, {
        headers: {
          'X-RapidAPI-Key': API_KEY
        }
      })
      var description = await descriptionResponse.json();
      summary = description.summary
      preparationMinutes = description.preparationMinutes
      cookingMinutes = description.cookingMinutes
      servings = description.servings

      if (description.analyzedInstructions[0]) {
        let instructionList = description.analyzedInstructions[0].steps
        let instructionsArray = []

        instructionList.forEach((instruction, index) => {
          instructionsArray.push(instruction.step)
        })
        stepsArray = instructionsArray
      }


      let recipeObject = {
        id: item.id,
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
    }

  }

  const clearFields = async () => {
    allIngredients = []
    resetCheckbox()
  }

  const getData = async () => {
    const docRef = collection(db, "userRecipes")
    const queryString = query(docRef, where("ingredients", "array-contains-any", allIngredients))
    const docSnap = await getDocs(queryString)
    docSnap.docs.forEach((doc) => {
      let recipeList = doc.data()
      let recipeObject = {
        id: doc.id,
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

  const addSelectedIngredients = async () => {
    for (const [key, value] of Object.entries(condiments)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(dairy)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(canned)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(meat)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(pasta)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(produce)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(seafood)) {
      if (value == true) {
        allIngredients.push(key)
      }
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <Text style={styles.headerStyles}>Ingredients in my kitchen</Text>

      <Collapse title="Condiments">
        {
          Object.entries(condiments).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleCondimentsChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Dairy">
        {
          Object.entries(dairy).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleDairyChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Canned">
        {
          Object.entries(canned).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleCannedChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Meat">
        {
          Object.entries(meat).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleMeatChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Pasta">
        {
          Object.entries(pasta).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handlePastaChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Produce">
        {
          Object.entries(produce).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleProduceChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <Collapse title="Seafood">
        {
          Object.entries(seafood).map(([k, v]) => (
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={v ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleSeafoodChange(k)

                }}
                color='green'
                uncheckedColor='#9dc7c8'
              />
              <Text style={styles.label}>{k}</Text>
            </View>
          ))
        }
      </Collapse>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#9dc7c8',
          borderRadius: 50,
          width: '50%',
          height: 30,
          margin: 10,
          alignSelf: 'center'
        }}
        onPress={async () => {
          await addSelectedIngredients()
          await getRecipes(allIngredients)
          if (allIngredients.length == 0) {
            return (
              alert("No recipes present for these ingredients. Add some more ingredients to get some results!")
            )
          }
          else if (allIngredients.length > 0) {
            await getData()
            await clearFields()
          }
          if (recipeArray.length == 0) {
            return (
              alert("No recipes present for these ingredients. Add some more ingredients to get some results!")
            )
          }
          else {
            await clearFields()
            navigation.navigate("RecipeList", { 'recipes': recipeArray })
          }
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
  }, pills: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9dc7c8',
    borderRadius: 50,
    height: 20,
    flex: 1,
    margin: 10,
    alignSelf: 'center'
  }, switch: {
    margin: 10
  }, instructionContent: {
    fontFamily: "Cochin",
    fontSize: 18,
    margin: 10,
    color: '#9dc7c8',
  }, background: {
    backgroundColor: '#070707'
  }, checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  }, label: {
    margin: 8,
    fontFamily: "Cochin",
    color: '#9dc7c8',
    fontSize: 18,
  },
});