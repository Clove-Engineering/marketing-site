import {initializeApp, getApps, setLogLevel, onLog} from "firebase/app";
import * as firestore from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBIRlUFxpLe5i2gg2UL-uPyOhCCIMTMNos",
    authDomain: "clov-prod.firebaseapp.com",
    databaseURL: "https://clov-prod-default-rtdb.firebaseio.com",
    projectId: "clov-prod",
    storageBucket: "clov-prod.appspot.com",
    messagingSenderId: "175287908418",
    appId: "1:175287908418:web:8bc8b3042a7854b2d755db"
};

const getFirestore = () => {
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
        return firestore.initializeFirestore(firebaseApp, {
            experimentalForceLongPolling: true
        })
    } catch (e) {
        return firestore.getFirestore(firebaseApp);
    }
}

export const addDoc = async (doc, collection_name, schema) => {
    doc = await schema.validateSync(doc, {strict: true})
    // Add date and new: True to schema
    doc = {
        ...doc,
        date: new Date(),
        new: true
    }
    try {
        await firestore.addDoc(firestore.collection(getFirestore(), collection_name), doc);
        console.log("Added document.")
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
