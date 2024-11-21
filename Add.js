import React, { useState } from 'react';
import { Button, TextInput, View, StatusBar, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonType, setPokemonType] = useState('Fire'); // Default value

    const handleAdd = () => {
        if (!pokemonName || !pokemonImage || !pokemonType) {
            Alert.alert('Error', 'Please fill in all fields before submitting!');
            return;
        }

        const sectionIndex = datasource.findIndex((section) => section.title === pokemonType);

        const newPokemon = {
            name: pokemonName,
            image: pokemonImage,
        };

        if (sectionIndex !== -1) {
            // Add to existing section
            datasource[sectionIndex].data.push(newPokemon);
        } else {
            // Create a new section
            datasource.push({
                title: pokemonType,
                bgcolor: 'grey', // Default color for new types
                data: [newPokemon],
            });
        }

        navigation.navigate('Home'); // Navigate back to Home
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.label}>Pokemon Name:</Text>
            <TextInput
                style={styles.input}
                maxLength={100}
                value={pokemonName}
                onChangeText={(text) => setPokemonName(text)}
                placeholder="Enter Pokémon name"
            />

            <Text style={styles.label}>Pokemon Image URL:</Text>
            <TextInput
                style={styles.input}
                maxLength={300}
                value={pokemonImage}
                onChangeText={(text) => setPokemonImage(text)}
                placeholder="Enter image URL"
            />

            <Text style={styles.label}>Pokemon Type:</Text>
            <RNPickerSelect
                value={pokemonType}
                onValueChange={(value) => setPokemonType(value)}
                items={[
                    { label: 'Electric', value: 'Electric' },
                    { label: 'Fire', value: 'Fire' },
                    { label: 'Water', value: 'Water' },
                    { label: 'Psychic', value: 'Psychic' },
                    { label: 'Grass', value: 'Grass' },
                    { label: 'Steel', value: 'Steel' },
                    { label: 'Dark', value: 'Dark' },
                    { label: 'Flying', value: 'Flying' },
                    { label: 'Dragon', value: 'Dragon' },
                    { label: 'Fairy', value: 'Fairy' },
                    { label: 'Bug', value: 'Bug' },
                    { label: 'Ghost', value: 'Ghost' },
                    { label: 'Fighting', value: 'Fighting' },
                    { label: 'Normal', value: 'Normal' },
                    { label: 'Rock', value: 'Rock' },
                ]}
            />

            <Button title="Add Pokemon" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

export default Add;
