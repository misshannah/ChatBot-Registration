var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://hannah:hannah@2016@localhost:2060/symvasi_db';
/*var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/symvasi_db';*/
var client = new pg.Client(connectionString);
client.connect();


module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString =  process.env.DATABASE_URL || "postgres://hannah:hannah@2016@localhost:2060/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from symvasi_users");

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
  
  loginUsers: function(req, res) {    
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString =  process.env.DATABASE_URL || "postgres://hannah:hannah@2016@localhost:2060/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();

	var query = client.query("select * from symvasi_users where mobileno = '+req.query.mobile' AND password = '+req.query.pass'");
        query.on("row", function (row, result) {
            result.addRow(row);
        });


        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },

    addRecord : function(req, res){
        var pg = require('pg');  
        
        var conString = process.env.DATABASE_URL ||  "postgres://hannah:hannah@2016@localhost:2060/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();

 
        var query = client.query("insert into symvasi_users (fullname,mobileno,emailaddress,password,deviceid,IMEnumber) "+
        	"values ('"+req.query.fname+"','"+req.query.mobile+"','"+req.query.email+"','"+req.query.pass+"','"+req.query.deviceid+"','"+req.query.IMEnumber+"')");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
	
    addFBRecord : function(req, res){
        var pg = require('pg');  
        
        var conString = process.env.DATABASE_URL ||  "postgres://hannah:hannah@2016@localhost:2060/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();

 
        var query = client.query("insert into facebook_users (facebook_id,facebook_name,facebook_email,deviceid,IMEnumber) "+
        	"values ('"+req.query.fbid+"','"+req.query.fbname+"','"+req.query.fbemail+"','"+req.query.deviceid+"','"+req.query.IMEnumber+"')");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },

     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://hannah:hannah@2016@localhost:2060/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from symvasi_users Where user_id ="+req.query.user_id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
  
    
    dropTable : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/symvasi_db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Drop TABLE symvasi_users");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });

    }

    
};
