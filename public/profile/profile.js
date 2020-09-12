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

var ref = firebase.firestore().collection('user').doc(sessionStorage.getItem("clickedProfileId"));

document.addEventListener('DOMContentLoaded',function(){

    const invoicesContainer = document.querySelector('#request-container')

    ref.get().then((doc) => {
        if (doc.exists) {
            var user = doc.data()
            invoicesContainer.innerHTML += `
            <div id=${user.id}>
            <h3> User Information USR0${user.id}</h3>
            <div id='create-request' >
                <form id="request-form" class="eight wide column">
                    <div class="ui form">
                        
                        <div class="two fields">
                            <div class=" field">
                                <label>First Name</label>
                                <div class="ui disabled input">
                                <input  id="firstName" type="text"  value ="${user.firstName}">
                                </div>
                            </div>
                            <div class="field">    
                                <label>Last Name</label>
                                <div class="ui disabled input">
                                <input id="lastName" type="text" value ="${user.lastName}">
                            </div>
                            </div>
                        </div>
          
                        <div class="two fields">
                            <div class="field">    
                                <label>E-mail</label>
                                <div class="ui disabled input">
                                <input id="email" type="text" value ="${user.email}">
                            </div>
                            </div>
                            <div class="field">
                                <label>Role</label>
                                <div class="ui disabled input">
                                <input id="auth" type="text" value ="${user.auth}">
                            </div>
                            </div>
                        </div>  
                        
                          <div class="field">    
                            <label>Organisation</label>
                            <div class="ui disabled input">
                            <input id="orgName" type="text" value ="${user.orgName}">
                        </div>
                        </div>
                        
                        
                
                </form>
            </div>
            `
        }
    })

})