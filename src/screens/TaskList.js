import React, {Component} from "react";
import { Alert, FlatList, ImageBackground, TouchableOpacity, Platform, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import AddTask from "./AddTask";
import Task from "../components/Task";
import commomStyles from "../commomStyles";
import todayImage from '../../assets/imgs/today.jpg';
import moment from "moment/moment";
import 'moment/locale/pt-br';
import axios from "axios";
import { server, showError } from '../commom'

import Icon from "react-native-vector-icons/FontAwesome";

const initialState = {
    showAddTask: false,
    showDoneTasks: true,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }

    addTask = async (newTask) => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert("Dados inválidos", "Descrição não informada!")

            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimatedAt: newTask.date
            })

            this.setState({ showAddTask: false }, this.loadTasks)

        } catch (e) {
            showError(e)
        }

    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.stringify(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    isPending = task => {
        return task.doneAt === null //retorna verdadeiro ou falso dependendo do valor "doneAt" do elemento
    }

    filterTasks = () => {
        let visibleTasks = null

        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                    onCancel={() => this.setState({showAddTask: false})}
                    onSave={this.addTask} />
                <ImageBackground 
                    source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                                size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                        ></FlatList>
                </View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => this.setState({showAddTask: true})}
                    activeOpacity={0.7}>
                    <Icon name="plus" size={20} color={commomStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 50,
        color: commomStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 15
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commomStyles.colors.today,
        justifyContent: "center",
        alignItems: "center"
    }

})