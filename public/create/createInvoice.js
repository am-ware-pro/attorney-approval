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

var ref = firebase.firestore().collection('invoices');

document.addEventListener('DOMContentLoaded', function() {
    
    const invoicesForm=document.querySelector('#request-form')
    const secondaryMenu=document.querySelector('#secondry-menu')

    

    secondaryMenu.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e.target)
        const date = new Date();

        const address = invoicesForm.querySelector('#address').value
        const attorneyName = invoicesForm.querySelector('#attorneyName').value
        const createDate = date.toLocaleDateString()
        const description = invoicesForm.querySelector('#description').value
        const dueDate =date.setDate(date.getDate()+ 10);
        const fee = invoicesForm.querySelector('#fee').value
        const id=0
        const name = invoicesForm.querySelector('#name').value
        const prevDue = invoicesForm.querySelector('#prevDue').value
        const servicetype = document.getElementById("service").selectedIndex
        const service = document.getElementsByTagName("option")[servicetype].value
        const status='Unapproved'
        const statusColor='yellow'
        const stausColor='yellow'
        const totalAmount = invoicesForm.querySelector('#totalAmount').value

        ref.add({
            address,
            attorneyName,
            createDate,
            description,
            dueDate,
            fee,
            id,
            name,
            prevDue,
            service,
            status,
            statusColor,
            stausColor,
            totalAmount
        }).then((docRef) => {
            console.error("Invoice Data Addded: ", docRef);
            alert("Invoice Created Successfully");
            window.location = '/invoice-list'
        })
          .catch((error) => {
            console.error("Error Creating Invoice: ", error);
        });
        
   })



 })