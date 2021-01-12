var express = require('express'); // requre the express framework
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Mysql
  var mysqlHost = process.env.MYSQL_HOST || 'localhost';
   var mysqlUser = process.env.MYSQL_USER || 'root';
   var mysqlPass = process.env.MYSQL_PASS || '';
   var mysqlDB   = process.env.MYSQL_DB   || 'nodejs_crud';

const pool = mysql.createPool({
	connectionLimit : 10,
	host: mysqlHost,
	user: mysqlUser,
	password: mysqlPass,
	database: mysqlDB 
})

//get all users
app.get('/getUsers', function(req, res){

	pool.getConnection((err,connection) => {
		if(err) throw err
		console.log("connected as id ${connection.threadId}")

	    // query(sqlString,callback)
	    connection.query('SELECT * from user',(err,rows) =>{
	    	connection.release() //return the connection pool

	    	if(!err){
	    		res.send(rows)
	    	} else{
	    		console.log(err)
	    	}
	    })

	})
   
    });

// get by id
app.get('/getUsers/:id', function(req, res){

	pool.getConnection((err,connection) => {
		if(err) throw err
		console.log("connected as id ${connection.threadId}")

	    // query(sqlString,callback)
	    connection.query('SELECT * from user WHERE id = ?',[req.params.id],(err,rows) =>{
	    	connection.release() //returm the connection pool

	    	if(!err){
	    		res.send(rows)
	    	} else{
	    		console.log(err)
	    	}
	    })

	})
   
    });

// Delete a record
app.delete('/getUsers/:id', function(req, res){

	pool.getConnection((err,connection) => {
		if(err) throw err
		console.log("connected as id ${connection.threadId}")

	    // query(sqlString,callback)
	    connection.query('DELETE from user WHERE id = ?',[req.params.id],(err,rows) =>{
	    	connection.release() //returm the connection pool

	    	if(!err){
	    		res.send('user with the id: ${[req.params.id]} has been removed')
	    	} else{
	    		console.log(err)
	    	}
	    })

	})
   
    });

// Add a new record
app.post('/getUsers', function(req, res){

	pool.getConnection((err,connection) => {
		if(err) throw err
		console.log("connected as id ${connection.threadId}")

	    const params = req.body

	    // query(sqlString,callback)
	    connection.query('INSERT INTO user SET ?',params,(err,rows) =>{
	    	connection.release() //returm the connection pool

	    	if(!err){
	    		res.send('user with the id: has been added')
	    	} else{
	    		console.log(err)
	    	}
	    })
            console.log(req.body)
	})
   
    });


//  update a record

app.put('/getUsers', function(req, res){

	pool.getConnection((err,connection) => {
		if(err) throw err
		console.log("connected as id ${connection.threadId}")

	    
	    const {id,name,tag,description,email_id} = req.body

	    // query(sqlString,callback)
	    connection.query('UPDATE user SET name= ? WHERE id = ?',[name,id],(err,rows) =>{
	    	connection.release() //returm the connection pool

	    	if(!err){
	    		res.send('user with the id: has been added')
	    	} else{
	    		console.log(err)
	    	}
	    })
            console.log(req.body)
	})
   
    });
//listen on port 9000
app.listen(9000,function (req,res) {
	console.log('running--')
})