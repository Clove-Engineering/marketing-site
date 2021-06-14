import {initializeApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBIRlUFxpLe5i2gg2UL-uPyOhCCIMTMNos",
    authDomain: "clov-prod.firebaseapp.com",
    databaseURL: "https://clov-prod-default-rtdb.firebaseio.com",
    projectId: "clov-prod",
    storageBucket: "clov-prod.appspot.com",
    messagingSenderId: "175287908418",
    appId: "1:175287908418:web:8bc8b3042a7854b2d755db"
};

const getFirestoreWrapper =  () => {
    const firebaseApps = getApps()
    let firebaseApp = null
    if (!firebaseApps) {
        firebaseApp = initializeApp(firebaseConfig)
    } else {
        firebaseApp = firebaseApps[0]
    }

    return getFirestore(firebaseApp);
}

export default getFirestoreWrapper;