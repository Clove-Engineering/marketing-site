import {initializeApp, getApps, setLogLevel, onLog} from "firebase/app";
import {getFirestore, initializeFirestore} from "firebase/firestore"

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
    let firebaseApp;
    // console.log(firebaseApps.length)
    if (firebaseApps.length) {
        firebaseApp = firebaseApps[0]
    } else {
        firebaseApp = initializeApp(firebaseConfig)
        // setLogLevel("debug")
    }

    try {
        return initializeFirestore(firebaseApp, {
            experimentalForceLongPolling: true
        })
    } catch (e) {
        return getFirestore(firebaseApp);
    }
}

export default getFirestoreWrapper;