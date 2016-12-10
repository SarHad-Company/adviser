var Q = require('q');
var request = require('request');
var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

var multer = require('multer');
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './client/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({ 
    storage: storage
    }).single('file');


module.exports = {
  getUrlTitle: function (url) {
    return Q.Promise(function (resolve, reject) {
      request(url, function (err, res, html) {
        if (err) {
          reject(err);
        } else {
          var tag = /<title>(.*)<\/title>/;
          var match = html.match(tag);
          var title = match ? match[1] : url;
          resolve(title);
        }
      });
    });
  },

  isValidUrl: function (url) {
    return url.match(rValidUrl);
  },
  
  uploadImg: function(req, res) {
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.send({error_code:0,err_desc:null, file:req.file});
        });
    }

};

