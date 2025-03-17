// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDXKJZKQqGHPwBaKDgWjXuYPHCZZZVJNDc",
    authDomain: "biblia-pwa.firebaseapp.com",
    databaseURL: "https://biblia-pwa-default-rtdb.firebaseio.com",
    projectId: "biblia-pwa",
    storageBucket: "biblia-pwa.appspot.com",
    messagingSenderId: "1073427022004",
    appId: "1:1073427022004:web:3d3d8c2c6a5b5b5b5b5b5b"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar las instancias que necesitamos
const auth = firebase.auth();
const db = firebase.firestore();

console.log('Firebase configurado correctamente');
