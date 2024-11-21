import React from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const Home = ({ navigation }) => {

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        index: index,
                        type: section.title,
                        name: item.name,
                        image: item.image,
                    });
                }}
            >
                <Image source={{ uri: item.image }} style={styles.imageStyle} />
                <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar />
            <Button title="Add Pokemon" onPress={() => navigation.navigate('Add')} />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
                )}
                keyExtractor={(item, index) => `${item.name}-${index}`}
            />
        </View>
    );
};

export default Home;
