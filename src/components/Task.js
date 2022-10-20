import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import commomStyles from "../commomStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Swipeable } from "react-native-gesture-handler";
import moment from "moment";
import 'moment/locale/pt-br';

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}
    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    /*const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color="#FFF" />
            </TouchableOpacity>
        )
    } 
    
    const getLeftContent = () => {
        return (
            <TouchableOpacity style={styles.left}>
                <Icon name="trash" size={30} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir </Text>
            </TouchableOpacity>
        )
    }*/

    return(
        /*<Swipeable renderRightActions={getRightContent}
            renderLeftActions={getLeftActions}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}> */
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.taskContainer}>
                    <View style={styles.taskInfo}>
                        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.right}
                        onPress={() => props.onDelete && props.onDelete(props.id)}>
                        <Icon name="trash" size={25} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        /*</Swipeable> */
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color="#FFF" />
            </View>
        )
    } else {

        return (
            <View style={styles.pending}>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        position: "relative",
        backgroundColor: '#FFF',
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.mainText,
        fontSize: 15
    },
    taskInfo: {
        maxWidth: '40%'
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginRight: 10
    },
    left: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    }
})