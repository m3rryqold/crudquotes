const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db
var dburl = 'mongodb://grey:suigeneris77@ds235775.mlab.com:35775/quotez'

MongoClient.connect(dburl, (err, database) => 
	{
		if (err) return console.log(err)
		db = database
		app.listen(3000, () => {
    		console.log('listening on port 3000')
		})
	})

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    //res.send('hola senorita')
    //var cursor = db.collection('quotes').find().toArray(function(err, results) {
	//	console.log(results)
	db.collection('quotes').find().toArray((err,result) => {
		if (err) return console.log(err)
		//renders ejs
		res.render('index.ejs', {quotes: result})
	})
	// res.sendFile(__dirname + '/index.html')
    })
   
app.post('/quotes', (req,res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
	//console.log(req.body)
})

app.put('/quotes', (req, res) => {
	//Handle put request
	// db.collection('quotes').findOneAndUpdate(
	// 	query,
	// 	update,
	// 	options,
	// 	callback
	// )
	db.collection('quotes').findOneAndUpdate({name: 'Quota'},{
		$set: {
			name: req.body.name,
			quote: req.body.quote
		}
	}, {
		sort: {_id: -1},
		upsert: true
	}, (err, result) => {
		if (err) return res.send(err)
		res.send(result)
	})

	// fetch({/* request */})
	// .then(res => {
	// 	if (res.ok) return res.json()
	// })
	// .then(data => {
	// 	console.log(data)
	// 	window.location.reload(true)
	// })
})

app.delete('/quotes', (req, res) => {
	//Handle delete event here
	db.collection('quotes').findOneAndDelete(
		{name: req.body.name},
		(err, result) => {
			if (err) return res.send(500, err)
			res.send({message: 'A grey quote has been removed'})
		})
})