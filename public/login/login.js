var settings = {timestampsInSnapshots: true};
var config = {
    apiKey: "AIzaSyAl8P8-_X9iD5nbKzjfQs7IxQ8vouqxxf8",
    authDomain: "attorney-approval.firebaseapp.com",
    databaseURL: "https://attorney-approval.firebaseio.com",
    projectId: "attorney-approval",
    storageBucket: "attorney-approval.appspot.com",
    messagingSenderId: "586856800702",
    appId: "1:586856800702:web:6ca057b878b4a0437dd9ef",
    measurementId: "G-N3M5QF815K"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
firebase.firestore().settings(settings);

var ref = firebase.firestore().collection('user');
var loginValidated = false;

document.addEventListener('DOMContentLoaded', function() {
    
    const invoicesForm=document.querySelector('#user-form')

    invoicesForm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log(e.target)
            const email = invoicesForm.querySelector('#email').value
            const password = invoicesForm.querySelector('#password').value
            ref.onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var user = doc.data()
                    if(email==`${user.email}`&&password==`${user.password}`) {
                        sessionStorage.clear();
                        sessionStorage.setItem("email", `${user.email}`);
                        sessionStorage.setItem("auth", `${user.auth}`);
                        sessionStorage.setItem("firstName", `${user.firstName}`);
                        sessionStorage.setItem("userId", `${doc.id}`);
                        sessionStorage.setItem("clickedProfileId", `${doc.id}`);
                        loginValidated = true;
                        window.location = '/home'
                    }
                });
            });
     })
 })