var Datastore = require('nedb');  

function REST (router,db){
	var self = this;
	self.handleRoutes(router,db);
}
REST.prototype.handleRoutes = function(router,db){
	//save to database file
	router.post("/send",function(req,res){
		let date = new Date();
		let t = date.getTime();
		var data = {
			name: req.body.name,
			content: req.body.content,
			_id: t
		}
		db.insert(data,function(err,doc){
			if(!err){
				console.log("ERROR",err,doc._id);
			}
		})
		res.json({"message":"sent"});
	})
	//load data from database file
	router.post("/get",function(req,res){
		db.find({},function(err,doc){
			// console.log(err,doc);
			res.json(doc);
		})
	})
}
module.exports = REST;