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
var mountedUsers = [];

document.addEventListener('DOMContentLoaded',function(){

    const invoicesContainer = document.querySelector('#userlist-container')    
    const authority = sessionStorage.getItem("auth");
    if (authority=='Admin'){
      ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var user = doc.data()
        if(!mountedUsers.includes(doc.id)) {
          mountedUsers.push(doc.id)
          invoicesContainer.innerHTML += `
        <div data-id="${doc.id}" id="${doc.id}" data-action="view" style="cursor: pointer;">
        <table class="ui fixed table" style=" margin-bottom: 0px">
        <tbody >
                <tr>
                  <td>USR0${doc.id}</td>
                  <td>${user.firstName}</td>
                   <td>${user.lastName}</td>
                  <td>${user.auth}</td>
                  <td>${user.orgName}</td>
                  <td>${user.email}</td>
                  
                </tr>
                 </tbody>
          </table >
          <div class="ui divider" style="margin-bottom: 4px;margin-top: 4px;" ></div>
        `
        }
        });
      });

      invoicesContainer.addEventListener('click', (e) => {
  
      if (e.target.parentElement.parentElement.parentElement.parentElement.dataset.action === 'view') {
        clickedElement=e.target.parentElement.parentElement.parentElement.parentElement.id
        console.log(e.target.parentElement.parentElement.parentElement.parentElement.id)
        sessionStorage.setItem("clickedProfileId", clickedElement);
        window.location = '/profile'
      }})
    }

    else
    {
      document.getElementById('userlist-container').innerHTML = ""
      invoicesContainer.innerHTML += `
      <img  src='403-01.png'; style="background-repeat: no-repeat;height: 100%;background-position: top;background-repeat: no-repeat;background-size: cover;">
      
      

      `
    }
  
})