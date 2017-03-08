
var multer = require('multer');
var nodemailer = require('nodemailer');


var storage = multer.diskStorage({ 
		destination: function (req, file, cb) {
				cb(null, '/opt/live/client/uploads/');
		},
		filename: function (req, file, cb) {
				var datetimestamp = Date.now();
				cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
		}
});
var upload = multer({ 
		storage: storage
		}).single('file');

// configuration for Email 
var EMAIL_ACCOUNT_USER = 'e.saryaa@outlook.com';
var EMAIL_ACCOUNT_PASSWORD = 'saryaalsayed2';
var YOUR_NAME = 'Adviser';
var EMAIL_CONFIRM = 'e.saryaa@outlook.com';
 
var smtpTransport = nodemailer.createTransport({
		service: 'outlook',
		auth: {
			user: EMAIL_ACCOUNT_USER,
			pass: EMAIL_ACCOUNT_PASSWORD
		}
});

var sendMail = function(content, to, next) {
		var mailOptions = {
				from:YOUR_NAME + ' <' + EMAIL_ACCOUNT_USER + '>',
				to: to,
				subject: 'Message from Adviser',
				text: 'hello sooooooooooos',
				html: content
		}
		smtpTransport.sendMail(mailOptions, next);

	//   smtpTransport.sendMail(mailOptions, function (err, info){
 //    	if (err){
 //    		console.log(err);
 //    	}
 //    		else {
 //    			res.json(info);
 //    		}
 //    	});
	}


module.exports = {
	
	uploadImg: function(req, res) {
		upload(req,res,function(err){
			if(err){
				res.json({error_code:1,err_desc:err});
				return;
			}
			res.send({error_code:0,err_desc:null, file:req.file});
		});
	},

	voucherEmail: function(req, res){
		console.log(req.body)
		var enquiry = req.body.enquiry;
		var package = req.body.package;
		var passengersHtml = "";
		var agent = "";
		var singleCost = enquiry.room.single * enquiry.cost.sgl;
		var doubleCost = enquiry.room.double * enquiry.cost.dbl * 2 ;
		var tripleCost = enquiry.room.triple * enquiry.cost.trbl * 3 ;
		var highSeason = enquiry.cost.highSeasonCost * enquiry.pax;
		var contact = '<tr><td></td><td></td></tr><tr><td><b>Contact Details </b></td></tr><tr><td>Country : </td><td>' + enquiry.country + '</td></tr><tr><td>City : </td><td>' + enquiry.city + '</td></tr><tr><td>Email : </td><td>' + enquiry.email + '</td></tr><tr><td>Mobile : </td><td>' + enquiry.mobile + '</td></tr>';
		var cost = '<tr><td>Single Room Cost</td><td> ' + enquiry.room.single + 'X ' + enquiry.cost.sgl + '=' + singleCost + '</td></tr><tr><td>Double Room Cost</td><td> ' +  enquiry.room.double + 'X'+ enquiry.cost.dbl +'X2 =' + doubleCost + '</td>  </tr><tr><td>Triple Room Cost</td><td>' + enquiry.room.triple + 'X' + enquiry.cost.trbl + 'X3=' + tripleCost + '</td></tr><tr><td>Children Discount For Triple Room</td><td> ' + enquiry.cost.childDiscount + '</td></tr><tr><td>High Season Subl</td><td> ' + enquiry.cost.highSeasonCost + 'X' + enquiry.pax + '='+ highSeason+'</td></tr>';
		for (var i=0; i<enquiry.pax; i++){
		 passengersHtml = passengersHtml + '<tr style="border-style:solid; border-width:1px"><td>'+ enquiry.passengers[i].firstName + '</td>' + '<td>' + enquiry.passengers[i].lastName + '</td>' + '<td>' + enquiry.passengers[i].passport + '</td>' + '<td>' + enquiry.passengers[i].birthDate + '</td>' + '<td>' + enquiry.passengers[i].gender + '</td></tr>';

		}
		if (enquiry.agentId !== 0){
			agent = '<tr><td>Agency ID : </td><td>'+ enquiry.agentId + '</td></tr><tr><td>Agency: </td><td>'+ enquiry.agency + '</td></tr>';
		}

		var html ='<table style="border-style:solid; border-width:2px; background-color:#BBE4F3 "><thead><tr><th><img src="http://advisertours.com/images/logo.png"  style="display:block; width:120px; height:100"></th></tr><tr><th><h2>Booking Voucher</h2></th></tr></thead><tbody><tr><td>Booking No.</td><td>' + enquiry._id + '</td></tr>'+ agent + '<tr><td>Tour No.</td><td> ' + enquiry.package + '</td></tr><tr><td>Tour Name : </td><td> ' + package.packageName + '</td></tr><tr><td>Tour Duration : </td><td> ' + package.days + ' days</td></tr><tr><td>Booking Date : </td><td> ' + enquiry.enquiryDate + '</td></tr><tr><td>Checkin Date : </td><td> ' + enquiry.checkin + '</td></tr><tr><td>Checkout Date : </td><td>'+ enquiry.checkout+ '</td></tr><tr><td>Hotel Option : </td><td> ' + enquiry.hotelType + '</td></tr><tr><td>Pax Numbers : </td><td>'+ enquiry.pax + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Rooms</b></td></tr><tr><td>Single Room : </td><td> ' + enquiry.room.single + '</td></tr><tr><td>Double Room : </td><td> ' + enquiry.room.double + '</td></tr><tr><td>Triple Room : </td><td> ' + enquiry.room.triple + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Cost</b></td></tr> '+ cost + '<tr><td>Total Cost </td><td> ' + enquiry.totalCost + '</td></tr>' + contact+ '</tbody></table><table style="border-style:solid; border-width:2px"><thead><tr><th>Passengers Info</th></tr><tr><th>First Name</th><th>Last Name</th><th>Passport Number</th><th>Birth Date</th><th>Gender</th></tr></thead><tbody> ' + passengersHtml + '</tbody></tabel><table style="border-style:solid; border-width:2px"><thead><th>Adviser Travel & Tourism</th></thead><tbody><tr></tr></tbody><tr><td>Adviser Tours.P.O.BOX 941759 Amman,11194 Jordan</td></tr><tr><td>+962 6 5538325</td></tr><tr><td>+962 6 5523411</td></tr><tr> <td>info@advisertours.com</td></tr></table>'
		sendMail(html, enquiry.email, function(err, response){
			if(err){
				console.log(err);
				return res.send('ERROR');
			}
			res.json(response);
		});
		
},

confirmEmail: function(req, res){
		console.log(req.body)
		var enquiry = req.body.enquiry;
		var package = req.body.package;
		var passengersHtml = "";
		var agent = "";
		var singleCost = enquiry.room.single * enquiry.cost.sgl;
		var doubleCost = enquiry.room.double * enquiry.cost.dbl * 2 ;
		var tripleCost = enquiry.room.triple * enquiry.cost.trbl * 3 ;
		var highSeason = enquiry.cost.highSeasonCost * enquiry.pax;
		var contact = '<tr><td></td><td></td></tr><tr><td><b>Contact Details </b></td></tr><tr><td>Country : </td><td>' + enquiry.country + '</td></tr><tr><td>City : </td><td>' + enquiry.city + '</td></tr><tr><td>Email : </td><td>' + enquiry.email + '</td></tr><tr><td>Mobile : </td><td>' + enquiry.mobile + '</td></tr>';
		var cost = '<tr><td>Single Room Cost</td><td> ' + enquiry.room.single + 'X ' + enquiry.cost.sgl + '=' + singleCost + '</td></tr><tr><td>Double Room Cost</td><td> ' +  enquiry.room.double + 'X'+ enquiry.cost.dbl +'X2 =' + doubleCost + '</td>  </tr><tr><td>Triple Room Cost</td><td>' + enquiry.room.triple + 'X' + enquiry.cost.trbl + 'X3=' + tripleCost + '</td></tr><tr><td>Children Discount For Triple Room</td><td> ' + enquiry.cost.childDiscount + '</td></tr><tr><td>High Season Subl</td><td> ' + enquiry.cost.highSeasonCost + 'X' + enquiry.pax + '='+ highSeason+'</td></tr>';
		for (var i=0; i<enquiry.pax; i++){
		 passengersHtml = passengersHtml + '<tr style="border-style:solid; border-width:1px"><td>'+ enquiry.passengers[i].firstName + '</td>' + '<td>' + enquiry.passengers[i].lastName + '</td>' + '<td>' + enquiry.passengers[i].passport + '</td>' + '<td>' + enquiry.passengers[i].birthDate + '</td>' + '<td>' + enquiry.passengers[i].gender + '</td></tr>';

		}
		if (enquiry.agentId !== 0){
			agent = '<tr><td>Agency ID : </td><td>'+ enquiry.agentId + '</td></tr><tr><td>Agency: </td><td>'+ enquiry.agency + '</td></tr>';
		}

		var html ='<table style="border-style:solid; border-width:2px; background-color:#BBE4F3 "><thead><tr><th><img src="http://advisertours.com/images/logo.png"  style="display:block; width:120px; height:100"></th></tr><tr><th><h2>Booking Confirmation</h2></th></tr></thead><tbody><tr><td>Booking No.</td><td>' + enquiry._id + '</td></tr>'+ agent + '<tr><td>Tour No.</td><td> ' + enquiry.package + '</td></tr><tr><td>Tour Name : </td><td> ' + package.packageName + '</td></tr><tr><td>Tour Duration : </td><td> ' + package.days + ' days</td></tr><tr><td>Booking Date : </td><td> ' + enquiry.enquiryDate + '</td></tr><tr><td>Checkin Date : </td><td> ' + enquiry.checkin + '</td></tr><tr><td>Checkout Date : </td><td>'+ enquiry.checkout+ '</td></tr><tr><td>Hotel Option : </td><td> ' + enquiry.hotelType + '</td></tr><tr><td>Pax Numbers : </td><td>'+ enquiry.pax + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Rooms</b></td></tr><tr><td>Single Room : </td><td> ' + enquiry.room.single + '</td></tr><tr><td>Double Room : </td><td> ' + enquiry.room.double + '</td></tr><tr><td>Triple Room : </td><td> ' + enquiry.room.triple + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Cost</b></td></tr> '+ cost + '<tr><td>Total Cost </td><td> ' + enquiry.totalCost + '</td></tr>' + contact+ '</tbody></table><table style="border-style:solid; border-width:2px"><thead><tr><th>Passengers Info</th></tr><tr><th>First Name</th><th>Last Name</th><th>Passport Number</th><th>Birth Date</th><th>Gender</th></tr></thead><tbody> ' + passengersHtml + '</tbody></tabel><table style="border-style:solid; border-width:2px"><thead><th>Adviser Travel & Tourism</th></thead><tbody><tr></tr></tbody><tr><td>Adviser Tours.P.O.BOX 941759 Amman,11194 Jordan</td></tr><tr><td>+962 6 5538325</td></tr><tr><td>+962 6 5523411</td></tr><tr> <td>info@advisertours.com</td></tr></table>'
		sendMail(html, EMAIL_CONFIRM, function(err, response){
			if(err){
				console.log(err);
				return res.send('ERROR');
			}
			res.json(response);
		});
		
}

};

