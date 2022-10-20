import React, { Component } from "react";
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native";

import backgroundImage from '../../assets/imgs/login.jpg'
import commomStyles from "../commomStyles";

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false,
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert("Sucesso", "Criar Conta")
        } else {
            Alert.alert("Sucesso", "Criar Conta")
        }
    }

    render() {
        return (
            <ImageBackground 
                source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? "Crie sua conta" : "Informe seus dados"}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput 
                        placeholder="Nome" 
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={name => this.setState({ name })} />
                    }

                    <TextInput 
                        placeholder="E-mail" 
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })} />
                
                    <TextInput 
                        placeholder="Senha" 
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    
                    {this.state.stageNew &&
                        <TextInput 
                        placeholder="Confirmação de Senha" 
                        value={this.state.confirmPassword}
                        style={styles.input}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })} />}

                    <TouchableOpacity 
                        onPress={this.signinOrSignup}
                        style={styles.button}>
                        <View>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{padding: 10}}
                        onPress={
                            () => this.setState({stageNew: !this.state.stageNew})
                        }>
                            <Text style={styles.question}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                            </Text>

                    </TouchableOpacity>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    
    },
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: "#FFF",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    question: {
        fontFamily: commomStyles.fontFamily,
        color: "#FFF",
        fontSize: 17,
        textAlign: 'center',
        marginTop: 13,
    },
    input: {
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: Platform.Os == 'ios' ? 15 : 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 20,
        width: '90%',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: "center"
    },
    buttonText: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})