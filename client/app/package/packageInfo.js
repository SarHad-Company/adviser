angular.module('adviser.packageInfo', [])
.controller('packageInfoController', function($scope, $routeParams, Package){

		$scope.myInterval = 3000;
		$scope.total = 0;
		$scope.sgl = 0;
		$scope.dbl = 0;
		$scope.trbl = 0;
		$scope.enquiry = {};
		$scope.enquiry.room = {};
		$scope.enquiry.departureInfo = {};
		$scope.enquiry.arrivalInfo = {};
		var owner = {};
		var passengerInfo = {};
		var allPassengers = [];

	var getPackageInfo= function(){
		Package.getPackage($routeParams.id)
		.then(function(package){
			$scope.data= package;
			console.log($scope.data);
			$scope.photos= package.photos;
			$("#des").html(package.description);
			$("#iter").html(package.itinerary);
			$("#include").html(package.include);
			$("#exclude").html(package.exclude);
			$scope.childPercent = $scope.data.childPrice;
			$scope.highSeason1Min = $scope.data.highSeason1.min;
			$scope.highSeason1Max = $scope.data.highSeason1.max;
			$scope.highSeason2Min = $scope.data.highSeason2.min;
			$scope.highSeason2Max = $scope.data.highSeason2.max;
			$scope.highSeason3Min = $scope.data.highSeason3.min;
			$scope.highSeason3Max = $scope.data.highSeason3.max;
			$scope.highSeason4Min = $scope.data.highSeason4.min;
			$scope.highSeason4Max = $scope.data.highSeason4.max;
		}).catch(function(error){
			alert("an error occured");
		});
	};
	getPackageInfo();
	

	// checkin calendar
	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		if ($scope.data.places !== 7){
		 return day === $scope.data.places;	
		}
		else{
			return day === 0 || day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day ===6
		}
	}
		
	$scope.calcCost = function (){
		var b = true;
		var bo = true;
		$scope.childNumber = 0;
		$scope.highSeasonSublOk = 0;
		var discount = ($scope.trbl*$scope.childPercent)/100;
	  // var mtest = moment($scope.checkin).format('YYYY-MM-DD');
	  var year = new Date($scope.checkin).getFullYear();
    console.log(year);
		$scope.highSeason1Minn = year + '-' + $scope.highSeason1Min;
		$scope.highSeason1Maxx = year + '-' + $scope.highSeason1Max;
		$scope.highSeason2Minn = year + '-' + $scope.highSeason2Min;
		$scope.highSeason2Maxx = year + '-' + $scope.highSeason2Max;
		$scope.highSeason3Minn = year + '-' + $scope.highSeason3Min;
		$scope.highSeason3Maxx = year + '-' + $scope.highSeason3Max;
		$scope.highSeason4Minn = year + '-' + $scope.highSeason4Min;
		$scope.highSeason4Maxx = year + '-' + $scope.highSeason4Max;
		if (moment($scope.checkin).isBetween($scope.highSeason1Minn,$scope.highSeason1Maxx,null,'[]') || moment($scope.checkin).isBetween($scope.highSeason2Minn,$scope.highSeason2Maxx,null,'[]') || moment($scope.checkin).isBetween($scope.highSeason3Minn,$scope.highSeason3Maxx,null,'[]') || moment($scope.checkin).isBetween($scope.highSeason4Minn,$scope.highSeason4Maxx,null,'[]')){
			$scope.highSeasonSublOk = $scope.highSeasonSubl;
		}

		$('.sgPass').each(function(i, obj){
			if (($(this).val())==""){
				b = false;
			}
			if (($(this).val())<4){
				bo = false;
			}

		});

		$('.dbPass').each(function (i, obj){
			if (($(this).val())== ""){
			b = false;
			}
			if (($(this).val())<4){
				bo = false;
			}
		}); 

		$('.trPass').each(function(i, obj) {
			if (($(this).val())==""){
				b = false;
			}
			if (($(this).val())<4){
				bo = false;
			}
				});

				// calc numbers of childs in triple rooms 'i consider 2 adults 1 child for discount'
				$('.trTable tbody').each(function (i, obj){
					var n = 0;
					for (var i=0; i<$(this).children().length;i++){
						if (($(this).children()[i].childNodes[1].childNodes[1].value)>=4 && ($(this).children()[i].childNodes[1].childNodes[1].value)<=10){
					n = 1;
				}
					}
						 $scope.childNumber = $scope.childNumber + n;  
				})
				console.log($scope.childNumber)
				if (b === false) { 
					alert("All Passengers Age Required");
				}
				else if (bo === false){
					alert("Infant Free Of Charge");
				}
				else {
					$scope.pax = Number($("#num_sg").val()) + Number($("#num_db").val())*2 + Number($("#num_tr").val())*3
					$scope.total = (($("#num_sg").val())*($scope.sgl))+(($("#num_db").val())*($scope.dbl)*2)+((($("#num_tr").val())*($scope.trbl)*3)-($scope.childNumber*discount)) + ($scope.highSeasonSublOk*$scope.pax);

					var t="<div  style='border-width:1px; border-color:#000; border-style:solid; margin-bottom:10px' class='passDiv'><div class='row' style='padding-top:8px;margin-left:2px'><div class='col-sm-4 form-group'><label>First Name</label><input type='text' placeholder='Enter First Name Here..' class='form-control firstName'></div><div class='col-sm-4 form-group'><label>Last Name</label><input type='text' placeholder='Enter Last Name Here..' class='form-control lastName'></div><div class='col-sm-4 form-group'><label>Passport Number</label><input type='text' placeholder='Enter Passport Number' class='form-control passport'></div></div><div class='row' style='margin-left:2px'><div class='col-sm-4 form-group'><label>Birth Date</label><input type='date' placeholder='Enter Birth Date'class='birthDate' /></div><div class='col-sm-4 form-group'><label>Gender </label><select><option value='male'>male</option><option value='female'>female</option></select></div></div>"
					$("#passenger").html(" ");
						for(var i=1; i<$scope.pax; i++) {
							$("#passenger").append(t);
						}
				}

	}

	$scope.changedValue = function (hotel){
		if (hotel === "tourist"){
			$scope.sgl=$scope.data.sglthree;
			$scope.dbl= $scope.data.dblthree;
			$scope.trbl= $scope.data.trblthree;
			$scope.highSeasonSubl = $scope.data.highSublThree;
		}
		else if (hotel === "bronze"){
			 $scope.sgl=$scope.data.sglfour;
			 $scope.dbl= $scope.data.dblfour;
			 $scope.trbl= $scope.data.trblfour;
			 $scope.highSeasonSubl = $scope.data.highSublFour;
		}
		else if (hotel === "silver"){
			$scope.sgl=$scope.data.sglfourb;
			$scope.dbl= $scope.data.dblfourb;
			$scope.trbl= $scope.data.trblfourb;
			$scope.highSeasonSubl = $scope.data.highSublFourB;
		}
		else if (hotel === "gold"){
			$scope.sgl=$scope.data.sglfive;
			$scope.dbl= $scope.data.dblfive;
			$scope.trbl= $scope.data.trblfive;
			$scope.highSeasonSubl = $scope.data.highSublFive;
		}
		$scope.hotel = hotel;
	}

	$scope.sglNumber = function (sgl_num){
		if ($scope.sgl == null){
			alert("This Option Is Not Exist");
		} else{
			t='<div class="row" id="single" style="margin-bottom:10px; margin-top: 3px"><div class="col-sm-12"><table class="tabel tabel-responsive"><thead><tr><th></th><th>Single <img src="../../images/camas.png"></th></tr><tr></tr></thead><tr><td> Passenger Age: </td><td> <input type="text" class="sgPass"/> </td></tr></tbody></table></div></div>'
			$("#singlePass").html(" ");
			var length = Number(sgl_num);
			for (var i = 1; i <= length ; i++){
				$("#singlePass").append(t);
			}
			
		}
	}

	$scope.dblNumber = function (dbl_num){
		if ($scope.dbl == null){
			alert("This Option Is Not Exist");
		} else{
			t='<div class="row" id="double" style="margin-bottom:10px; margin-top: 3px"><div class="col-sm-12"><table class="tabel tabel-responsive"><thead><tr><th></th><th>Double <img src="../../images/camas.png"><img src="../../images/camas.png"></th></tr><tr></tr></thead><tbody><tr><td> Passenger Age: </td><td> <input type="text" class="dbPass" /> </td></tr><tr><td> Passenger Age: </td><td> <input type="text" class="dbPass" /> </td></tr></tbody></table></div></div>'
			$("#doublePass").html(" ");
			var length = Number(dbl_num);
			for (var i = 1; i <= length ; i++){
				$("#doublePass").append(t);
			}
			
		}
	}

	$scope.trblNumber = function (trbl_num){
		if ($scope.trbl == null){
			alert("This Option Is Not Exist");
		} else{
			t=' <div class="row" id="triple"> <div class="col-sm-12"><table class="tabel tabel-responsive trTable"><thead><tr><th></th><th>Triple <img src="../../images/camas.png"><img src="../../images/camas.png"><img src="../../images/camas.png"></th></tr><tr></tr></thead><tbody><tr><td> Passenger Age: </td><td> <input type="text" class="trPass" /> </td></tr><tr><td> Passenger Age: </td><td> <input type="text" class="trPass"/> </td></tr><tr><td> Passenger Age: </td><td> <input type="text" class="trPass" /> </td></tr></tbody></table></div></div>'
			$("#triplePass").html(" ");
			var length = Number(trbl_num);
			for (var i = 1; i <= length ; i++){
				$("#triplePass").append(t);
			}
		}
	}

	
	// information of enquiry
	$scope.addEnquiry = function (){
		// console.log($scope.checkin)
	//     var x = moment.utc($scope.checkin).format();
	//    console.log(x);
	var mtest = moment($scope.checkin).format('MM/DD/YYYY');
	console.log(mtest);
	var x=  moment.utc(mtest).format()
	//  console.log(x)
		$scope.enquiry.checkin = x;
		$scope.enquiry.checkout = $scope.checkout;
				$scope.enquiry.city = $scope.city;
				$scope.enquiry.country = $scope.country;
				$scope.enquiry.mobile = $scope.mobile;
				$scope.enquiry.email = $scope.email;
				$scope.enquiry.hotelType = $scope.hotel;
				$scope.enquiry.room.single = Number($("#num_sg").val());
				$scope.enquiry.room.double = Number($("#num_db").val());
				$scope.enquiry.room.triple = Number($("#num_tr").val());
				$scope.enquiry.totalCost = $scope.total;
				$scope.enquiry.packageId = $scope.data._id;
				$scope.enquiry.arrivalInfo.flight = $("#flight").val();
				$scope.enquiry.arrivalInfo.port= $scope.port;
				$scope.enquiry.arrivalInfo.carrier = $scope.carrier;
				$scope.enquiry.arrivalInfo.flightNumber = $scope.flightNo;
				$scope.enquiry.arrivalInfo.arrivalTime = $scope.arrTime;
				$scope.enquiry.departureInfo.flight = $("#flight1").val();
				$scope.enquiry.departureInfo.port= $scope.port1;
				$scope.enquiry.departureInfo.carrier = $scope.carrier1;
				$scope.enquiry.departureInfo.flightNumber = $scope.flightNo1;
				$scope.enquiry.departureInfo.departureTime = $scope.arrTime1;
		owner.firstName = $scope.ownerFirst;
		owner.lastName = $scope.ownerLast;
		owner.passport = $scope.ownerPassport;
		owner.birthDate = $scope.ownerBirthDate;
		owner.gender = $("#ownerGender").val();
		allPassengers.push(owner);
		$('.passDiv').each(function(i,obj){
			passengerInfo.firstName=$(this).children()[0].childNodes[0].childNodes[1].value;
			passengerInfo.lastName=$(this).children()[0].childNodes[1].childNodes[1].value;
			passengerInfo.passport=$(this).children()[0].childNodes[2].childNodes[1].value;
			passengerInfo.birthDate = $(this).children()[1].childNodes[0].childNodes[1].value;
			passengerInfo.gender = $(this).children()[1].childNodes[1].childNodes[1].value;
			allPassengers.push(passengerInfo);
		});
		$scope.enquiry.passengers = allPassengers;
				console.log($scope.enquiry);
		
	}



	$scope.book = function(){
		Package.addEnquiry($scope.enquiry)
		.then(function (enquiry){
			console.log(enquiry);
			alert("book done");
			console.log(moment.utc(enquiry.data.checkin).format('MM/DD/YYYY'))

		})
		.catch(function (error){
			alert ("an error occured");
		})

	}


});