document.addEventListener('DOMContentLoaded',function(){
    const invoicesContainer = document.querySelector('#userlist-container')

    const authority = sessionStorage.getItem("auth");
    const firstName = sessionStorage.getItem("firstName")
    if (authority=='Admin'){
    
        invoicesContainer.innerHTML += `<div class="toc" style="height: 100%">
            
        <div class="ui large vertical menu" style=" position: relative; height: 100%">
            <div class="item">
                <div style="padding-bottom: 24px">
                  <h3>${firstName}</h3>
                  <p>${authority}</p>
                  
                </div>
              </div>
            <a id='create-invoice' class="item">
              New Invoice
            </a>
            <a id='view-invoice' class="item">
              Invoices
            </a>
            <a id='view-unapproved-invoice' class="item">
              Unapproved Invoices
            </a>
            <a id='view-approved-invoice' class="item">
              Approved Invoices
            </a>
            <a id='view-rejected-invoice' class="item">
              Rejected Invoices
            </a>
            <a id='view-users' class="item">
              Users Management
            </a>
            <a id='create-user' class="item">
              Create User
            </a>
            <a id='view-profile' class="item">
              Profile
            </a>
              
              <input id='logout' class="ui default button" value="Logout" style=" position: absolute; bottom: 24px;left: 23px; ">


           
          </div>
              
            
      </div>
  `
    
    }
    else if (authority=='IntUser')
{
    invoicesContainer.innerHTML += `<div class="toc" style="height: 100%">
            
    <div class="ui large vertical menu" style=" position: relative; height: 100%">
        <div class="item">
            <div style="padding-bottom: 24px">
              <h3>${firstName}</h3>
              <p>${authority}</p>
              
            </div>
          </div>
       
        <a id='view-invoice' class="item">
          Invoices
        </a>
        <a id='view-unapproved-invoice' class="item">
              Unapproved Invoices
            </a>
            <a id='view-approved-invoice' class="item">
              Approved Invoices
            </a>
            <a id='view-rejected-invoice' class="item">
              Rejected Invoices
            </a>
         
          <a id='view-profile' class="item">
            Profile
          </a>
          
          <input id='logout' class="ui default button" value="Logout" style=" position: absolute; bottom: 24px;left: 23px; ">

        

       
      </div>
          
        
  </div>
`
}
else if (authority=='Vendor'){
    
    invoicesContainer.innerHTML += `<div class="toc" style="height: 100%">
        
    <div class="ui large vertical menu" style=" position: relative; height: 100%">
        <div class="item">
            <div style="padding-bottom: 24px">
              <h3>${firstName}</h3>
              <p>${authority}</p>
              
            </div>
          </div>
        <a 'create-invoice' class="item">
          New Invoice
        </a>
        <a id='view-invoice' class="item">
          Invoices
        </a>
        <a id='view-unapproved-invoice' class="item">
              Unapproved Invoices
            </a>
            <a id='view-approved-invoice' class="item">
              Approved Invoices
            </a>
            <a id='view-rejected-invoice' class="item">
              Rejected Invoices
            </a>  
          <a id='view-profile' class="item">
            Profile
          </a>
          
          <input id='logout' class="ui default button" value="Logout" style=" position: absolute; bottom: 24px;left: 23px; ">
           
        

       
      </div>
          
        
  </div>
`

}
else
{
    alert("Login to Access the Page");
    window.location = '/login'
}

invoicesContainer.addEventListener('click', (e) => {
  
  if(e.target.id === 'create-invoice') {
    window.location = '/create'
  } else if(e.target.id === 'view-invoice') {
    window.location = '/invoice-list'
  } else if(e.target.id === 'view-users') {
    window.location = '/user-list'
  } else if(e.target.id === 'view-profile') {
    sessionStorage.setItem("clickedProfileId", sessionStorage.getItem("userId"));
    window.location = '/profile'
  } else if(e.target.id === 'view-unapproved-invoice') {
    window.location = '/unapproved-invoice'
  } else if(e.target.id === 'view-approved-invoice') {
    window.location = '/approved-invoice'
  } else if(e.target.id === 'view-rejected-invoice') {
    window.location = '/rejected-invoice'
  } else if(e.target.id === 'logout') {
    window.location = '/login'
  } else if(e.target.id === 'create-user') {
    window.location = '/create-user'
  }

})

})