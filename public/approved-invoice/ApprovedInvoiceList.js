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
var mountedInvoices = [];

document.addEventListener('DOMContentLoaded',function(){

const invoicesContainer = document.querySelector('#request-container')
ref.onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var invoices = doc.data()
    if(!mountedInvoices.includes(doc.id) && invoices.status === 'Approved') {
      mountedInvoices.push(doc.id)
      var documentId = doc.id
      documentId = documentId.slice(0,4)
      invoicesContainer.innerHTML += `
        
      <div data-id="${doc.id}" id="${doc.id}" data-action="view" style="cursor: pointer;">
      <table class="ui fixed table">
      <tbody  class >
              <tr>
                <td>#INV-${documentId}</td>
                <td>${invoices.name}</td>
                <td class="${invoices.statusColor} ui button"  style=" width: 120px;text-align: center;">${invoices.status}</td>
                <td>${invoices.totalAmount}</td>
                <td>${invoices.attorneyName}</td>
                <td>${invoices.service}</td>
                <td>${invoices.dueDate}</td>
                
              </tr>
               </tbody>
        </table >
        <div class="ui divider" ></div>
      `
    }
});

})
    
var clickedElement
invoicesContainer.addEventListener('click', (e) => {
  
  if (e.target.parentElement.parentElement.parentElement.parentElement.dataset.action === 'view') {
    clickedElement=e.target.parentElement.parentElement.parentElement.parentElement.id
    console.log(e.target.parentElement.parentElement.parentElement.parentElement.id)
    sessionStorage.setItem("clickedElement", clickedElement);
    window.location = '/unapproved-invoice'
  }})
  
})