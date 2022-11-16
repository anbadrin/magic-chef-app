import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import React from 'react';
import { HomeButton } from './components/HomeButton.js';
import { AddRecipe } from './components/AddRecipe.js';
import { SearchRecipe } from './components/SearchRecipe.js';
import { RecipeList } from './components/RecipeList.js';
import { CookBook } from './components/CookBook.js';
import { Recipe } from './components/Recipe.js';
import { HomePage } from './components/HomePage.js';
import { Logo } from './components/Logo.js';
import { Title } from './components/Title.js';
import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const Tap = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tap.Navigator
        initialRouteName = "HomePage"
      >
        <Tap.Screen
          name="Home Page"
          component={HomePage}
          options={{
            headerStyle: {
              backgroundColor: '#9dc7c8',
            },
            headerTintColor: '#070707',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarButton: (props) => null,
          }}
          />
          <Tap.Screen
          name="Search Recipe"
          component={Search}
          options={{
            tabBarIcon:()=>(<Ionicons name="ios-search" size={24} color="black" />),
            headerShown: false
          }}
        />
        <Tap.Screen
          name="Add Recipe"
          component={AddRecipe}
          options={{
            headerStyle: {
              backgroundColor: '#9dc7c8',
            },
            headerTintColor: '#070707',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: () => (
              <Title title="Add your own recipe"/>
            ),
            headerRight: () => (
              <HomeButton screenName={'Home Page'}/>
            ),
            headerLeft: () => (
              <Logo/>
            ),
            tabBarIcon:()=>(<Ionicons name="add-circle-sharp" size={24} color="black" />)
          }}
        />
        <Tap.Screen
          name="My Cookbook"
          component={Mycookbook}
          options={{
            headerShown: false,
            /*headerStyle: {
              backgroundColor: '#9dc7c8',
            },
            headerTintColor: '#070707',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: () => (
              <Title title="My Cookbook"/>
            ),
            headerRight: () => (
              <HomeButton screenName={'Home Page'}/>
            ),
            headerLeft: () => (
              <Logo/>
            ),*/
            tabBarIcon:()=>(<MaterialCommunityIcons name="bookshelf" size={24} color="black" />)
          }}
        />
        
        {/*<Tap.Screen
          name="Recipe"
          component={Recipe}
          options={{
            headerTitle: () => (
              <Title title="Recipe"/>
            ),
            headerRight: () => (
              <HomeButton screenName={'Home Page'}/>
            ),
            headerLeft: () => (
              <Logo/>
            ),
            tabBarIcon:()=>(<Ionicons name="ios-search" size={24} color="black" />),
            tabBarButton: (props) => null,
          }}
        />*/}
        {/*<Tap.Screen
          name="RecipeList"
          component={RecipeList}
          options={{
            headerTitle: () => (
              <Title title="RecipeList"/>
            ),
            headerRight: () => (
              <HomeButton screenName={'Home Page'}/>
            ),
            headerLeft: () => (
              <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
                color="black"
              >
              <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
              </View>
            ),
            tabBarIcon:()=>(<Ionicons name="ios-search" size={24} color="black" />),
            tabBarButton: (props) => null,
          }}
        />*/}
      </Tap.Navigator>
    </NavigationContainer>
  );
}

const Search = ()  => {

  return (
    <Stack.Navigator initialRouteName="SearchPanel">
      <Stack.Screen 
        name="Search Recipe" 
        component={SearchRecipe}
        options={{
          headerStyle: {
            backgroundColor: '#9dc7c8',
          },
          headerTintColor: '#070707',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <Title title="Search Recipe"/>
          ),
          headerRight: () => (
            <HomeButton screenName={'Home Page'}/>
          ),
          headerLeft: () => (
            <Logo/>
          ),
          tabBarIcon:()=>(<Ionicons name="ios-search" size={24} color="black" />)
        }}
        />
        <Stack.Screen 
        name="RecipeList" 
        component={RecipeList}
        options={{
          headerStyle: {
            backgroundColor: '#9dc7c8',
          },
          headerTintColor: '#070707',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <Title title="Searched Recipes"/>
          ),
          headerRight: () => (
            <HomeButton screenName={'Home Page'}/>
          ),
        }}
        />
        <Stack.Screen 
        name="Recipe" 
        component={Recipe}
        options={{
          headerStyle: {
            backgroundColor: '#9dc7c8',
          },
          headerTintColor: '#070707',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <Title title="Recipe Card"/>
          ),
          headerRight: () => (
            <HomeButton screenName={'Home Page'}/>
          ),
        }}
        />
    </Stack.Navigator>
  )
}

const Mycookbook = ()  => {
  return (
    <Stack.Navigator initialRouteName="CookBook">
      <Stack.Screen 
        name="My Cook Book" 
        component={CookBook}
        options={{
          headerStyle: {
            backgroundColor: '#9dc7c8',
          },
          headerTintColor: '#070707',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <Title title="Search Recipe"/>
          ),
          headerRight: () => (
            <HomeButton screenName={'Home Page'}/>
          ),
          headerLeft: () => (
            <Logo/>
          ),
          tabBarIcon:()=>(<Ionicons name="ios-search" size={24} color="black" />)
        }}
        />
        <Stack.Screen 
        name="Recipe" 
        component={Recipe}
        options={{
          headerStyle: {
            backgroundColor: '#9dc7c8',
          },
          headerTintColor: '#070707',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <Title title="Recipe Card"/>
          ),
          headerRight: () => (
            <HomeButton screenName={'Home Page'}/>
          ),
        }}
        />
    </Stack.Navigator>
  )
}