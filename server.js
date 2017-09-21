const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://utsav:utsav@ds141464.mlab.com:41464/sfsalaryslipdb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/user', (req, res) => {
   
    var empid=req.query.id;
    var monthreq=req.query.month;
    var yearreq=req.query.year;
   
    var monthmap= {
        
        "01":"january",
        "02":"february",
        "03":"march",
        "04":"april",
        "05":"may",
        "06":"june",
        "07":"july",
        "08":"august",
        "09":"september",
        "10":"october",
        "11":"november",
        "12":"december"
        
        
    };
    console.log("monthmap"+ monthmap[monthreq]);
    console.log("params"+monthreq);
  db.collection('payslip').find({$and: [{"EMP_CODE":empid}, {"Month":monthmap[monthreq]} ]} ).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {utsav: result})
  })
})

//app.post('/quotes', (req, res) => {
//  db.collection('utsav').save(req.body, (err, result) => {
//    if (err) return console.log(err)
//    console.log('saved to database')
//    res.redirect('/')
//  })
//})
//
//app.put('/quotes', (req, res) => {
//  db.collection('quotes')
//  .findOneAndUpdate({name: 'Yoda'}, {
//    $set: {
//      name: req.body.name,
//      quote: req.body.quote
//    }
//  }, {
//    sort: {_id: -1},
//    upsert: true
//  }, (err, result) => {
//    if (err) return res.send(err)
//    res.send(result)
//  })
//})
//
//app.delete('/quotes', (req, res) => {
//  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
//    if (err) return res.send(500, err)
//    res.send('A darth vadar quote got deleted')
//  })
//})
