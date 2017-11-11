var express = require('express');
var router = express.Router();



//DB Connection 
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'restful'
}); 
connection.connect();


/////////////////////////////////// img 
/*var multer = require('multer');
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/upload_image/");
     },
     filename: function(req, file, callback) {
     		file.uploadedFile = file.fieldname + "_" + 
     			Date.now() + "_" + file.originalname;
     		console.log('file.uploadedFile:'+file.uploadedFile);
         callback(null, file.uploadedFile);
     }
 });
 var upload = multer({
     storage: Storage
 }).single("image");
app.post('/user/picture',function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify({url:req.file.uploadedFile,
				description:req.body.description}));
		}
	});
});*/





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project' });
});


//로그인 
router.post('/user/login', function(req,res){
var id = req.body.id;
var name = req.body.name;
var age = req.body.age;

	connection.query(
	'select * from user',
	[ id, name, age ], 
	function(err, result) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	})
	
});

router.post('/user', function(req,res){
var id = req.body.id;
var name = req.body.name;
var age = req.body.age;

	connection.query(
	'insert into user(id,name,age) values(?,?,?)',
	[ id, name, age ], 
	function(err, result) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	})
	
});

router.get('/user', function(req,res){
var id = req.body.id;
var name = req.body.name;
var age = req.body.age;

	connection.query(
	'select * from user',
	[ id, name, age ], 
	function(err, result) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	})
});

router.put('/user', function(req,res){
var id = req.body.id;
var name = req.body.name;
var age = req.body.age;

	connection.query(
	'select * from user',
	[ id, name, age ], 
	function(err, result) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	})

});

router.delete('/user', function(req,res){
	var rowid = req.body.rowid;
	res.send(JSON.stringify({rowid:rowid}));
});

router.get('/user/list', function(req,res){
var id = req.body.id;
var name = req.body.name;
var age = req.body.age;

	connection.query(
	'select * from user',
	[ id, name, age ], 
	function(err, result) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	})


//	res.send(JSON.stringify([]));
});

//요청 페이지 
router.get('/req', function(req,res){
var dbname = req.query.dbname;
var table_schema = req.query.table_schema;
var table_name = req.query.table_name;
var column_name = req.query.column_name;
var upmu_code = req.query.upmu_code;

	res.send(JSON.stringify({
		dbname:dbname, table_schema:table_schema, table_name:table_name, column_name:column_name, upmu_code:upmu_code

	}));
});

router.put('/req/new', function(req,res){
var dbname = req.body.dbname;
var table_schema = req.body.table_schema;
var table_name = req.body.table_name;
var condition_freememo = req.body.condition_freememo;

	res.send(JSON.stringify({
		dbname:dbname, table_schema:table_schema, table_name:table_name, condition_freememo:condition_freememo
	}));
});

router.put('/req/mdfy', function(req,res){
var dbname = req.body.dbname;
var table_schema = req.body.table_schema;
var table_name = req.body.table_name;
var column_name_eng = req.body.column_name_eng;
var column_type = req.body.column_type;
var column_name_ko = req.body.column_name_ko;

	res.send(JSON.stringify({
		dbname:dbname, table_schema:table_schema, table_name:table_name, 
		column_name_eng:column_name_eng, column_type:column_type, column_name_ko:column_name_ko

	}));
});

router.delete('/req/new', function(req,res){
	var req_id = req.body.req_id;
	res.send(JSON.stringify({req_id:req_id}));
});

router.delete('/req/mdfy', function(req,res){
	var req_id = req.body.req_id;
	res.send(JSON.stringify({req_id:req_id}));
});


//요청처리 페이지
router.get('/res', function(req,res){
var req_id = req.query.req_id;

	res.send(JSON.stringify({
		req_id:req_id

	}));
});

router.get('/res/list', function(req,res){
	res.send(JSON.stringify([]));
});

router.put('/res/doing', function(req,res){
	var req_id = req.body.req_id;
	var comment = req.body.comment;
	res.send(JSON.stringify({
		rowid:rowid, comment:comment
	}));
});

router.put('/res/done', function(req,res){
	var req_id = req.body.req_id;
	var checkbox = req.body.checkbox;
	res.send(JSON.stringify({
		rowid:rowid, checkbox:checkbox
	}));
});


module.exports = router;
