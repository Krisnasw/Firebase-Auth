import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAI5TNgwYtC_8fgjye0caar6avo9izHcfI",
            authDomain: "my-project-1508824317021.firebaseapp.com",
            databaseURL: "https://my-project-1508824317021.firebaseio.com",
            projectId: "my-project-1508824317021",
            storageBucket: "my-project-1508824317021.appspot.com",
            messagingSenderId: "279537373704"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Firebase Auth" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
