var update = document.getElementById('update')

update.addEventListener('click', function(){
    let change = document.getElementById('change').value
    let name = document.getElementById('name').value
    let quote = document.getElementById('quote').value
   fetch('quotes', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           //'name': 'Grey',
           //'quote': 'The wallz will open when yu find itz weakness.'
           'name': name,
           'quote': quote,
           'change': change
       })
   }) 
})

var del = document.getElementById('delete')

del.addEventListener('click', function(){
    let remove = document.getElementById('remove').value
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //'name': 'Grey'
            'name': remove
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