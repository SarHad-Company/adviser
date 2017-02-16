
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
var EMAIL_ACCOUNT_PASSWORD = 'saryaalsayed2'
var YOUR_NAME = 'Adviser';
 
var smtpTransport = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: EMAIL_ACCOUNT_USER,
      pass: EMAIL_ACCOUNT_PASSWORD
    }
});

var sendMail = function(content, next) {
		var mailOptions = {
        from:YOUR_NAME + ' <' + EMAIL_ACCOUNT_USER + '>',
        to: 'e.saryaa@gmail.com',
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
        var html ='<table style="border-style:solid; border-width:2px; background-color:#BBE4F3 "><thead><tr><th><img src="http://advisertours.com/sites/default/files/adviser%20Tours.png"  style="display:block"></th></tr><tr><th><h2>Booking Confirmed</h2></th></tr></thead><tbody><tr><td>Booking No.</td><td>' + enquiry._id + '</td></tr><tr><td>Tour No.</td><td> ' + enquiry.package + '</td></tr><tr><td>Tour Name : </td><td> ' + package.packageName + '</td></tr><tr><td>Tour Duration : </td><td> ' + package.days + ' days</td></tr><tr><td>Booking Date : </td><td> ' + enquiry.enquiryDate + '</td></tr><tr><td>Checkin Date : </td><td> ' + enquiry.checkin + '</td></tr><tr><td>Hotel Option : </td><td> ' + enquiry.hotelType + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Rooms</b></td></tr><tr><td>Single Room : </td><td> ' + enquiry.room.single + '</td></tr><tr><td>Double Room : </td><td> ' + enquiry.room.double + '</td></tr><tr><td>Triple Room : </td><td> ' + enquiry.room.triple + '</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Guest Info<b></td></tr><tr><td>Name : </td><td> ' + enquiry.passengers[0].firstName + enquiry.passengers[0].lastName +'</td></tr><tr><td>Passport Number : </td><td>' + enquiry.passengers[0].passport + '</tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td><b>Total Cost</b></td></tr><tr><td> ' + enquiry.totalCost + '</td></tr></tbody></table><table style="border-style:solid; border-width:2px"><thead><th>Adviser Travel & Tourism</th></thead><tbody><tr></tr></tbody><tr><td>Adviser Tours.P.O.BOX 941759 Amman,11194 Jordan</td></tr><tr><td>+962 6 5538325</td></tr><tr><td>+962 6 5523411</td></tr><tr> <td>info@advisertours.com</td></tr></table>'
    sendMail(html, function(err, response){
      if(err){
        console.log(err);
        return res.send('ERROR');
      }
      res.json(response);
    });
    
}


};

