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

var ref = firebase.firestore().collection('invoices').doc(sessionStorage.getItem("clickedElement"));
var invoiceData;
document.addEventListener('DOMContentLoaded',function(){

    const invoicesContainer = document.querySelector('#request-container')
    const secondaryContainer = document.querySelector('#secondry-menu')

    const invoicesURL=`http://localhost:3000/invoices`

    ref.get().then((doc) => {
        if (doc.exists) {
            var invoices = doc.data()
            var documentId = doc.id
            invoiceData = doc.data()
            documentId = documentId.slice(0,4)
            if(invoices.status=='Unapproved')
            {
                secondaryContainer.innerHTML =`<form id ="secondry-menu"class="ui secondary menu" >
                <a id="back" class="ui default button" type="Back" value="Back"  style=" margin-right: 8px;  margin-left: 8px;width: 122px;">Back</a>
                <div id="right-menu" class="right menu" >
                    <button id="reject" data-id="reject" class="ui red button" id="reject" data-action="reject" style=" margin-right: 8px;  margin-left: 8px;width: 122px;" >Reject</button>
                    <button id="approve" data-id="Approve" class="ui green button" id="approve" data-action="approve" style=" margin-right: 8px;  margin-left: 8px;width: 122px;" >Approve</button>
                   
                    
                </div>
            </form>`
            
            }
            
            else if(invoices.status=='Rejected')
            {
                secondaryContainer.innerHTML = `<form id ="secondry-menu"class="ui secondary menu" >
                  <a id="back" class="ui default button" type="Back" value="Back"  style=" margin-right: 8px;  margin-left: 8px;width: 122px;">Back</a>
                  <div id="right-menu" class="right menu" >
                   <button id="approve" data-id="Approve" class="ui green button" id="approve" data-action="approve" style=" margin-right: 8px;  margin-left: 8px;width: 122px;" >Approve</button>
                     
                      
                  </div>
              </form>`
            }
            else if(invoices.status=='Approved')
            {
                secondaryContainer.innerHTML=`
                    
                    <form id ="secondry-menu"class="ui secondary menu" >
                    <a id="back" class="ui default button" type="Back" value="Back"  style=" margin-right: 8px;  margin-left: 8px;width: 122px;">Back</a>
                    <div id="right-menu" class="right menu" >
                        <button id="reject" data-id="reject" class="ui red button" id="reject" data-action="reject" style=" margin-right: 8px;  margin-left: 8px;width: 122px;" >Reject</button>
                    
                        
                    </div>
                </form>`
            }
                invoicesContainer.innerHTML += `
              <div id=${invoices.id}>
               
                <h3  style="color:${invoices.statusColor}">Invoice #INV-${documentId} - ${invoices.status}</h3>
            
                <div id='create-request' >
                  <form id="request-form" class="eight wide column">
                      <div class="ui form">
                          
                          <div class="two fields">
                              <div class=" field">
                                  <label>Billing To</label>
                                  <div class="ui disabled input">
                                  <input  id="name" type="text"  value ="${invoices.name}">
                                  </div>
                              </div>
                              <div class="field">    
                                  <label>Address</label>
                                  <div class="ui disabled input">
                                  <input id="address" type="text" value ="${invoices.address}">
                              </div>
                              </div>
                          </div>
            
                          <div class="two fields">
                              <div class="field">    
                                  <label>Invoice Date</label>
                                  <div class="ui disabled input">
                                  <input id="createDate" type="text" value ="${invoices.createDate}">
                              </div>
                              </div>
                              <div class="field">
                                  <label>Due on</label>
                                  <div class="ui disabled input">
                                  <input id="dueDate" type="text" value ="${ (new Date(invoices.dueDate).getMonth() + 1).toString() + "/" + new Date(invoices.dueDate).getDate().toString() + "/" + new Date(invoices.dueDate).getFullYear().toString()}">
                              </div>
                              </div>
                          </div>  
                          <div class="two fields">
                              <div class="field">    
                                  <label>Attorney Name</label>
                                  <div class="ui disabled input">
                                  <input id="attorneyName" type="text" value ="${invoices.attorneyName}">
                              </div>
                              </div>
                              <div class="field">    
                                  <label>Service</label>
                                  <div class="ui disabled input">
                                  <input id="service" type="text" value ="${invoices.service}">
                              </div>
                              </div>
                          </div>
                          <div class="field">
                              <label>Service Description</label>
                              <div class="ui disabled input">
                              <textarea id="description"rows="3">${invoices.description}</textarea>
                          </div>
                            </div>
                            <div class="field">    
                              <label>Attorney Fee</label>
                              <div class="ui disabled input">
                              <input id="fee" type="text" value ="${invoices.fee}">
                          </div>
                          </div>
                          
                          <div class="field">    
                              <label>Previous Due</label>
                              <div class="ui disabled input">
                              <input id="prevDue" type="text" value ="${invoices.prevDue}">
                          </div>
                          </div>
                          <div class="field">    
                              <label>Total Amount</label>
                              <div class="ui disabled input">
                              <input id="totalAmount" type="text" value ="${invoices.totalAmount}">
                          </div>
                      </div>
                          
                  
                  </form>
              </div>
              `
        } else {
          
        }
      });

secondaryContainer.addEventListener('click', (e) => {
    if(e.target.id === 'back') {
        window.location = '/invoice-list'
    } else if(e.target.id === 'reject') {
        e.preventDefault();
        if(invoiceData !== null && invoiceData !== undefined) {
            const address = invoiceData.address
            const attorneyName = invoiceData.attorneyName
            const createDate = invoiceData.createDate
            const description = invoiceData.description
            const dueDate =invoiceData.dueDate
            const fee = invoiceData.fee
            const id=invoiceData.id
            const name = invoiceData.name
            const prevDue = invoiceData.prevDue
            const service = invoiceData.service
            const status="Rejected"
            const statusColor="red"
            const stausColor="red"
            const totalAmount = invoiceData.totalAmount
            ref.set({
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
                alert('Invoice Rejected Successfully');
                window.location = '/invoice-list'
              })
              .catch((error) => {
                console.error("Error Occured On Rejecting: ", error);
              });
        }
    } else if(e.target.id === 'approve') {
        e.preventDefault();
        if(invoiceData !== null && invoiceData !== undefined) {
            const address = invoiceData.address
            const attorneyName = invoiceData.attorneyName
            const createDate = invoiceData.createDate
            const description = invoiceData.description
            const dueDate =invoiceData.dueDate
            const fee = invoiceData.fee
            const id=invoiceData.id
            const name = invoiceData.name
            const prevDue = invoiceData.prevDue
            const service = invoiceData.service
            const status="Approved"
            const statusColor="green"
            const stausColor="green"
            const totalAmount = invoiceData.totalAmount
            ref.set({
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
                alert('Invoice Approved Successfully');
                window.location = '/invoice-list'
              })
              .catch((error) => {
                console.error("Error Occured On Approving: ", error);
              });
    }
}
  })
  
})