import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Edit = ({ navigation, route }) => {
    const [pokemonName, setPokemonName] = useState(route.params.name); // Pre-fill name
    const [pokemonImage, setPokemonImage] = useState(route.params.image); // Pre-fill image
    const [pokemonType, setPokemonType] = useState(route.params.type); // Pre-fill type

    const handleSave = () => {
        if (!pokemonName || !pokemonImage || !pokemonType) {
            alert('Please fill in all fields!');
            return;
        }

        const currentSectionIndex = datasource.findIndex(
            (section) => section.title === route.params.type
        );

        const newSectionIndex = datasource.findIndex(
            (section) => section.title === pokemonType
        );

        // Remove the Pokémon from the current section
        datasource[currentSectionIndex].data.splice(route.params.index, 1);

        // Add the Pokémon to the new section or create a new section
        if (newSectionIndex !== -1) {
            datasource[newSectionIndex].data.push({
                name: pokemonName,
                image: pokemonImage,
            });
        } else {
            datasource.push({
                title: pokemonType,
                bgcolor: 'grey',
                data: [{ name: pokemonName, image: pokemonImage }],
            });
        }

        navigation.navigate('Home'); // Navigate back to Home
    };

    const handleDelete = () => {
        Alert.alert('Are you sure?', '', [
            {
                text: 'Yes',
                onPress: () => {
                    const currentSectionIndex = datasource.findIndex(
                        (section) => section.title === route.params.type
                    );

                    // Remove the Pokémon from the current section
                    datasource[currentSectionIndex].data.splice(route.params.index, 1);

                    navigation.navigate('Home'); // Navigate back to Home
                },
            },
            { text: 'No' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokemon Name:</Text>
            <TextInput
                style={styles.input}
                maxLength={100}
                value={pokemonName}
                onChangeText={(text) => setPokemonName(text)}
            />

            <Text style={styles.label}>Pokemon Image URL:</Text>
            <TextInput
                style={styles.input}
                maxLength={300}
                value={pokemonImage}
                onChangeText={(text) => setPokemonImage(text)}
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
                    { label: 'Ground', value: 'Ground' },
                ]}
            />

            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default Edit;
