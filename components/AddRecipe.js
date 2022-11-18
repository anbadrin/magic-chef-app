import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
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

export function AddRecipe(props){
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preparationMinutes, setPreparationMinutes] = useState(0);
  const [cookingMinutes, setCookingMinutes] = useState(0);
  const [servings, setServings] = useState(0);

  const saveData = async()=>{
    const docRef= await addDoc(collection(db,"userRecipes"),{
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

    return(
      <KeyboardAwareScrollView style={styles.background}>
        <Text style={styles.headerStyles}>Show your creativity, submit your own recipe!</Text>
      <Text style={styles.instructionContent}>Name of the Recipe:</Text>
      <TextInput
          style={styles.instructionContentInput}
          placeholder="Enter the name of your recipe"
          placeholderTextColor={'#acacac'}
          onChangeText={title => setTitle(title)}
        />
      <Text style={styles.instructionContent}>Description:</Text>
      <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.instructionContentTextArea}
          placeholderTextColor={'#acacac'}
          placeholder="Write a description about your recipe"
          onChangeText={description => setDescription(description)}
        />
        <IngredientInputs label="Ingredients" onChangeText={(value) => setIngredients([...ingredients, value])}/>
      <View style={{flexDirection:'row', height:10}}>
      {ingredients.map((ingredient) =>
      <TouchableOpacity
          style={styles.pills}
          onPress={()=>{
            var deleteIndex = ingredients.indexOf(ingredient);
            ingredients.pop(deleteIndex);
            setInstructions(ingredients)
          }}
        >
          <View>
          <Text>{ingredient}</Text>
          </View>   
        </TouchableOpacity>)
        }
       </View>
      <Text style={styles.instructionContent}>Image url:</Text>
      <TextInput
          style={styles.instructionContentInput}
          placeholder="Image Url"
          placeholderTextColor={'#acacac'}
          onChangeText={imageUrl => setImageUrl(imageUrl)}
        />
      <Text style={styles.instructionContent}>Preparation Time:</Text>
      <TextInput
          style={styles.instructionContentInput}
          placeholder="Preparation Time"
          placeholderTextColor={'#acacac'}
          onChangeText={preparationMinutes => setPreparationMinutes(preparationMinutes)}
        />
      <Text style={styles.instructionContent}>Cooking Time:</Text>
      <TextInput
          style={styles.instructionContentInput}
          placeholder="Cooking Time"
          placeholderTextColor={'#acacac'}
          onChangeText={cookingMinutes => setCookingMinutes(cookingMinutes)}
        />
      <Text style={styles.instructionContent}>Servings:</Text>
      <TextInput
          style={styles.instructionContentInput}
          placeholder="Servings"
          placeholderTextColor={'#acacac'}
          onChangeText={servings => setServings(servings)}
        />
      <InstructionInputs label="Instructions" onChangeText={(value) => setInstructions([...instructions, value])}/>
      <View style={{flexDirection:'row', height:20}}>
      {instructions.map((instruction) =>
      <TouchableOpacity
          style={styles.pills}
          onPress={()=>{
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
          await saveData()
          alert("Recipe Saved Successfully");
        }}
        >
          <Text>Add Recipe</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
    
    )
  }

function InstructionInputs(props){
  const [value, setValue] = useState(null);
    return(
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
        onPress={()=>props.onChangeText(value)}>
        <Ionicons name="add-circle-sharp" size={24} color='#acacac' />
        </TouchableOpacity>
      </View>
      </View>
    )
}

function IngredientInputs(props){
  const [value, setValue] = useState(null);
    return(
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
        onPress={()=>props.onChangeText(value)}>
        <Ionicons name="add-circle-sharp" size={24} color='#acacac'/>
        </TouchableOpacity>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
    description:{
        textAlign: 'justify',
        margin: 20
      },input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },inputDescription: {
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },cardContainer: {
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
      },instructionContent: {
        fontFamily: "Cochin",
        fontSize: 18,
        margin: 10,
        color: '#9dc7c8',
      },instructionContentInput:{
        borderColor: '#9dc7c8',
        borderWidth: 1,
        height: 40,
        width: '90%',
        margin: 10,
        padding: 10,
        fontFamily: "Cochin",
        color: '#9dc7c8',
      },instructionContentTextArea: {
        borderColor: '#9dc7c8',
        borderWidth: 1,
        height: 100,
        width: '90%',
        margin: 10,
        padding: 10,
        fontFamily: "Cochin",
        color: '#9dc7c8',
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
      }
});