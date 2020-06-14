import * as React from 'react';
import {Image, Platform, StyleSheet, Text,  View, FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {fetchPosts} from "../redux/actions/allPostsActions";

const HomeScreen = ({navigation}) => {
    const [count,setCount] = useState(5);
    const [data,setData] = useState(null);
    const dispatch = useDispatch();

    const allPostsfromStore = useSelector(
        (state) => state.allPostsReducer.allPosts
    );

    useEffect(() => {
        dispatch(fetchPosts("Ordinary_Drink"));
    }, []);

    useEffect(() => {
        setData(getData());
    }, [allPostsfromStore]);

    const getData = () => {
        let stack = [];
         allPostsfromStore.map((item,index)=> {
            if (index < count){
                stack.push(item)
            }
        });
        return stack.map((x, i) => ({id: i, title: x.strDrink, picture: x.strDrinkThumb }))
    };

    const _renderItem = ({item}) => {
        return (
        <View>
            <View style={flatStyles.flatRowContainer}>
                <Image
                    style={styles.image}
                    source={{uri: item.picture}}
                />
            </View>
                  <Text style={flatStyles.flatRowContainer}>{item.title}</Text>
        </View>
        )
    };

    const onEndReached = () => {
        setCount(count + 5);
        setData(getData())
    }

    return (
        <View style={flatStyles.flatContainer}>
            <Text style={flatStyles.flatTitle}>Drinks</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};

HomeScreen.navigationOptions = {
    header: null,
};

export default HomeScreen

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
});

const flatStyles = StyleSheet.create({
    flatContainer: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingTop: 20
    },
    flatTitle: {
        marginTop:-20,
        color: '#000',
        fontSize: 18,
        padding: 20
    },
    flatRowContainer: {
        flexDirection:"column",
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 20
    }
})
