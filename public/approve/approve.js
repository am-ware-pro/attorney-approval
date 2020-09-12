document.addEventListener('DOMContentLoaded', function() {

const invoicesURL=`http://localhost:3000/invoices`
    const invoicesForm=document.querySelector('#update-form')


   invoicesForm.addEventListener('submit', (e) => {

    
    const authorityType = document.getElementById("authority").selectedIndex
    console.log( document.getElementsByTagName("option")[authorityType].value)

/*
        console.log(e.target)

        fetch(`${invoicesURL}/1`, {
            method:'PATCH',
            body:JSON.stringify({
                status:'approved',
                statusColor:'green'

            }),
            headers: {
              'Content-Type': 'application/json'
            }
    })*/
})
})