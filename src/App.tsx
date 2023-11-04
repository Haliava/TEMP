import * as React from 'react';
import {Provider} from "react-redux";

import CardForm from './components/CardForm';
import * as styles from "./styles.module.css";
import {store} from "./store/store";

function App() {
    return (
        <Provider store={store} >
            <div className={styles.root}>
                <CardForm />
            </div>
        </Provider>
    );
}

export default App;
