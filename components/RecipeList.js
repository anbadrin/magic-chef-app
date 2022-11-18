import { CardList } from 'react-native-card-list';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

export function RecipeList(props) {
  const navigation = useNavigation();
  const cards = []
  for (let i = 0; i < props.route.params.recipes.length; i++) {
    cards.push({
      id: props.route.params.recipes[i].id.toString(),
      title: props.route.params.recipes[i].title,
      picture: { uri: props.route.params.recipes[i].image },
      content:
        <View>
          <Text style={styles.description}><RenderHtml source={{ html: props.route.params.recipes[i].summary }} /></Text>
          <Text style={styles.description}>Preparation Time: {props.route.params.recipes[i].preparationMinutes}</Text>
          <Text style={styles.description}>Cooking Time: {props.route.params.recipes[i].cookingMinutes}</Text>
          <Text style={styles.description}><Text style={{ fontWeight: 'bold' }}>Servings: </Text>{props.route.params.recipes[i].servings}</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 50
            }}
            onPress={async () => {
              navigation.navigate("Recipe", { 'recipes': props.route.params.recipes[i] })
            }}
          >
            <Text>Read More</Text>
          </TouchableOpacity>
        </View>
    });
  }
  return (
    <View style={styles.cardContainer}>
      <CardList cards={cards} />
    </View>
  )
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, description: {
    textAlign: 'justify',
    margin: 20
  },
});