var update = document.getElementById('update')

update.addEventListener('click', function(){
   fetch('quotes', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           'name': 'Grey',
           'quote': 'The wallz will open when yu find itz weakness.'
       })
   }) 
})

var del = document.getElementById('delete')

del.addEventListener('click', function(){
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Grey'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})