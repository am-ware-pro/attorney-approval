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

document.addEventListener('DOMContentLoaded', function() {
    
    const invoicesForm=document.querySelector('#user-form')
    const secondaryMenu=document.querySelector('#secondry-menu')

    

    secondaryMenu.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e.target)
        
        const firstName = invoicesForm.querySelector('#firstName').value
        const lastName = invoicesForm.querySelector('#lastName').value
        const email = invoicesForm.querySelector('#email').value
        const password = invoicesForm.querySelector('#password').value
        const orgName = invoicesForm.querySelector('#orgName').value
        const authorityType = document.getElementById("authority").selectedIndex
        const auth = document.getElementsByTagName("option")[authorityType].value
        const id = 0

        ref.add({
            firstName,
            lastName,
            email,
            password,
            orgName,
            auth,
            id
        }).then((docRef) => {
            console.error("User Data Addded: ", docRef);
            alert("User Created Successfully");
            invoicesForm.querySelector('#firstName').disabled = true;
            invoicesForm.querySelector('#lastName').disabled = true;
            invoicesForm.querySelector('#email').disabled = true;
            invoicesForm.querySelector('#password').disabled = true;
            invoicesForm.querySelector('#orgName').disabled = true;
            document.getElementsByTagName("option").disabled = true;
        })
          .catch((error) => {
            console.error("Error adding User: ", error);
        });
   })



 })