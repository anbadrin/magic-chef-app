import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
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

export function AddRecipe(props) {
  const [instructions, setInstructions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preparationMinutes, setPreparationMinutes] = useState(0);
  const [cookingMinutes, setCookingMinutes] = useState(0);
  const [servings, setServings] = useState(0);

  var ingredients = []

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

  const addSelectedIngredients = async () => {
    for (const [key, value] of Object.entries(condiments)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(dairy)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(canned)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(meat)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(pasta)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(produce)) {
      if (value == true) {
        ingredients.push(key)
      }
    }

    for (const [key, value] of Object.entries(seafood)) {
      if (value == true) {
        ingredients.push(key)
      }
    }
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


  const saveData = async () => {
    await addSelectedIngredients();
    const docRef = await addDoc(collection(db, "userRecipes"), {
      title: title,
      ingredients: ingredients,
      image: imageUrl,
      summary: description,
      preparationMinutes: preparationMinutes,
      cookingMinutes: cookingMinutes,
      servings: servings,
      instructions: instructions
    });
  }

  const clearFields = async () => {
    setInstructions([]);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setPreparationMinutes(0);
    setCookingMinutes(0);
    setServings(0);

    ingredients = []
    resetCheckbox()
  }

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <Text style={styles.headerStyles}>Show your creativity, submit your own recipe!</Text>
      <Text style={styles.instructionContent}>Name of the Recipe:</Text>
      <TextInput
        value={title}
        style={styles.instructionContentInput}
        placeholder="Enter the name of your recipe"
        placeholderTextColor={'#acacac'}
        onChangeText={title => setTitle(title)}
      />
      <Text style={styles.instructionContent}>Description:</Text>
      <TextInput
        value={description}
        multiline={true}
        numberOfLines={10}
        style={styles.instructionContentTextArea}
        placeholderTextColor={'#acacac'}
        placeholder="Write a description about your recipe"
        onChangeText={description => setDescription(description)}
      />
      <Text style={styles.instructionContent}>
        Ingredients:
      </Text>
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
      <Text style={styles.instructionContent}>Image url:</Text>
      <TextInput
        value={imageUrl}
        style={styles.instructionContentInput}
        placeholder="Image Url"
        placeholderTextColor={'#acacac'}
        onChangeText={imageUrl => setImageUrl(imageUrl)}
      />
      <Text style={styles.instructionContent}>Preparation Time:</Text>
      <TextInput
        value={preparationMinutes}
        style={styles.instructionContentInput}
        placeholder="Preparation Time"
        placeholderTextColor={'#acacac'}
        onChangeText={preparationMinutes => setPreparationMinutes(preparationMinutes)}
      />
      <Text style={styles.instructionContent}>Cooking Time:</Text>
      <TextInput
        value={cookingMinutes}
        style={styles.instructionContentInput}
        placeholder="Cooking Time"
        placeholderTextColor={'#acacac'}
        onChangeText={cookingMinutes => setCookingMinutes(cookingMinutes)}
      />
      <Text style={styles.instructionContent}>Servings:</Text>
      <TextInput
        value={servings}
        style={styles.instructionContentInput}
        placeholder="Servings"
        placeholderTextColor={'#acacac'}
        onChangeText={servings => setServings(servings)}
      />
      <InstructionInputs label="Instructions" onChangeText={(value) => setInstructions([...instructions, value])} />
      <View style={{ flexDirection: 'column', flex: 1 }}>
        {instructions.map((instruction) =>
          <TouchableOpacity
            style={styles.pills}
            onPress={() => {
              var deleteIndex = instructions.indexOf(instruction);
              instructions.pop(deleteIndex);
              setInstructions(instructions)
            }}
          >
            <View>
              <Text>{instruction}</Text>
            </View>
          </TouchableOpacity>)
        }
      </View>
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
          await saveData()
          alert("Recipe Saved Successfully");
          await clearFields()
        }}
      >
        <Text>Add Recipe</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>

  )
}

function InstructionInputs(props) {
  const [value, setValue] = useState(null);
  return (
    <View>
      <Text style={styles.instructionContent}>
        {props.label}:
      </Text>
      <View style={styles.dropDownRow}>
        <View style={styles.inputRow}>
          <Input
            style={styles.inputField}
            placeholder='Enter Instruction'
            placeholderTextColor={'#acacac'}
            onChangeText={item => {
              setValue(item);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.addMore}
          onPress={() => props.onChangeText(value)}>
          <Ionicons name="add-circle-sharp" size={24} color='#acacac' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function IngredientInputs(props) {
  const [value, setValue] = useState(null);
  return (
    <View>
      <Text style={styles.instructionContent}>
        {props.label}:
      </Text>
      <View style={styles.dropDownRow}>
        <View style={styles.inputRow}>
          <Input
            style={styles.inputField}
            placeholder='Enter Ingredient'
            placeholderTextColor={'#acacac'}
            onChangeText={item => {
              setValue(item);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.addMore}
          onPress={() => props.onChangeText(value)}>
          <Ionicons name="add-circle-sharp" size={24} color='#acacac' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    margin: 20
  }, input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }, inputDescription: {
    height: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }, cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, label: {
    marginHorizontal: 16,
    paddingTop: 8,
    fontSize: 16,
  }, addMore: {
    flex: 1,
    margin: 16,
  }, pills: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9dc7c8',
    alignContent: 'center',
    borderRadius: 50,
    height: 30,
    flex: 1,
    margin: 10,
    alignSelf: 'center',
    width: '90%'
  },

  headerStyles: {
    fontFamily: "Cochin",
    fontSize: 35,
    margin: 10,
    fontWeight: 'bold',
    color: '#9dc7c8',
  },
  background: {
    backgroundColor: '#070707'
  }, instructionContent: {
    fontFamily: "Cochin",
    fontSize: 18,
    margin: 10,
    color: '#9dc7c8',
  }, instructionContentInput: {
    borderColor: '#9dc7c8',
    borderWidth: 1,
    height: 40,
    width: '90%',
    margin: 10,
    padding: 10,
    fontFamily: "Cochin",
    color: '#9dc7c8',
  }, instructionContentTextArea: {
    borderColor: '#9dc7c8',
    borderWidth: 1,
    height: 100,
    width: '90%',
    margin: 10,
    padding: 10,
    fontFamily: "Cochin",
    color: '#9dc7c8',
  }, dropDownRow: {
    flexDirection: 'row',
    margin: 5,
    width: '100%',
  }, inputRow: {
    flex: 10,
  }, inputField: {
    fontFamily: "Cochin",
    fontSize: 16,
    color: '#9dc7c8',
  }, checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  }, label: {
    margin: 8,
    fontFamily: "Cochin",
    color: '#9dc7c8',
    fontSize: 18,
  },
});