import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StatusBar} from 'react-native-web';

export default function App() {
    // Estados: o que o usuario digita e o nome salvo
    const [nome, setNome] = useState('');
    const [nomeSalvo, setNomeSalvo] = useState('');

    // Busca o nome salvo quando o app abre
    useEffect(() => {
        async function buscarNome() {
            const nomeGuardado = await AsyncStorage.getItem('nomeUsuario');
            if (nomeGuardado) {
                setNomeSalvo(nomeGuardado); 
            }
        }
        buscarNome();
    }, []);

    
    // Função para salvar o nome
    const salvarNome = async () => {
        if (nome === '') {
            alert ('Digite um nome primeiro!');
            return;
        }
        await AsyncStorage.setItem('nomeUsuario', nome);
        setNomeSalvo(nome);
        setNome(''); // Limpa o campo
        alert('Nome salvo com sucesso!');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <Text style={styles.titulo}>Meu Primeiro App!</Text>
            {/* Mostra o nome salva*/}
    <Text style={styles.texto}>
        {nomeSalvo ? "Ola, $ {nomeSalvo}!" : "Nenhum nome salvo."}
    </Text>
            {/* Input para digitar o nome */}
            <TextInput 
                style={styles.input}
                placeholder="Digite seu nome"
                value={nome}
                onChangeText={setNome}
            />
            {/* Botão para salvar*/}
            <Button title="Salvar Nome" onPress={salvarNome} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    texto: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },

    input: {
        borderWidht: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        haderRadius: 5,
    },
});
