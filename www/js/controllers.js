angular.module('starter.controllers', [])
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
.filter('slice', function() {
  return function(arr, start) {
    return arr.slice(start);
  };
})
.controller('DashCtrl', function($scope, $ionicSideMenuDelegate, $state,$ionicPlatform, basket, $timeout,$LoginService,$filter,RArrived,RNoshow, $ionicPopup,RCancel,Refresh,UserService) {          //define in factory and replace  '$stateParams >> "Reserves"'
  $scope.navTitle = 'Reservation';
  $ionicSideMenuDelegate.canDragContent(false);  

  $scope.$on('DashCtrl', function( event ) {
      var answer = confirm("Are you sure you want to leave this page?/แน่ใจว่าจะออกจากหน้านี้?")
      if (!answer) {
          event.preventDefault();
      }
  });  
  (function update() {
    $timeout(update, 1000);
      $scope.test=basket.items();
      $scope.Reserve= $scope.test.Datajson;
      // console.log("Hay");
  }());


  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }          
  var d = new Date();
  var curr_date = ("0" + (d.getDate())).slice(-2);
  var curr_month = ("0" + (d.getMonth() + 1)).slice(-2);
  var curr_year = d.getFullYear();
  
  var tmrDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var tmr_date =  ("0" + (tmrDate.getDate())).slice(-2);
  var tmr_month = ("0" + (tmrDate.getMonth() + 1)).slice(-2);
  var tmr_year = tmrDate.getFullYear();

  var ytdDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  var ytd_date = ("0" + (ytdDate.getDate())).slice(-2);
  var ytd_month = ("0" + (ytdDate.getMonth() + 1)).slice(-2);
  var ytd_year = ytdDate.getFullYear();

  $scope.chkdate=curr_year +"-"+ curr_month  +"-"+ curr_date;
  $scope.tmrdate=tmr_year +"-"+ tmr_month  +"-"+ tmr_date;
  $scope.ytddate=ytd_year +"-"+ ytd_month  +"-"+ ytd_date;    
  $scope.checkpendding= function(data){  
    if(data.active==true&&data.no_show==false&&data.arrived==false){      
      return true;
    }
    else{
      return false;
    }
  }    
  // $scope.chkUndef=function(data){
  //   if(data.special_request=='undefined'){
  //     data.special_request==" ";
  //   }
  //   if (data.table=='indefined'){
  //     data.table==" ";
  //     }
  //   if (data.email=='email'){
  //     data.email==" ";
  //   }
  // }
  $scope.datetrans = function(Item){
    var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];
    var dayName= ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];  
    var date = new Date(Item);
    var day = date.getDate();
    var days = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var res = dayName[days]+', '+day + ' ' + monthNames[monthIndex] + ' ' + year;   
    return res;
  }
  $scope.Reserve= UserService.allObj.Datajson;

  $scope.Cuttime=function(data){
    // console.log("ss"+$scope.Reserve);  which one?
    if(data.length>10){
      var Sub= data.substring(0, 10);
      return Sub;
    }
    else{
      return data;
    }

  }


  $scope.Showdate=function(data){
    if(data==$scope.chkdate){
      var dd=$scope.datetrans(data);
      var result= "Today "+dd;
      return result;
    }
    else if(data==$scope.tmrdate){
      var dd=$scope.datetrans(data);
      var result= "Tomorrow "+dd;
      return result;
    }
    else{
      return $scope.datetrans(data);
    }    
  }
  $scope.quantity=30;                                                                       // Quantity
  $scope.Addquan=function(){
    $scope.quantity += 20; 
    console.log($scope.quantity); 
  }
 

  var mx;                          // assign by tdindex
  $scope.max=function(){          // Check   for hide when no reservation in today tmr
    if(mx=='nothing'){
      return false;
    }
    else{
      return true;
    }
  };

  var tdindex=function(){                                         // return index of todat tmr if not return mx to nothing
    for(var i=0;i<$scope.Reserve.length;i++){
      if($scope.Reserve[i].date==$scope.chkdate){
        // console.log(i+"***"+$scope.Reserve[i].date+"***"+$scope.tmrdate);
        return i;
      }
      else if($scope.Reserve[i].date==$scope.tmrdate){
        return i;        
      }
      else if(i==$scope.Reserve.length-1){
        mx='nothing';

        return i+1;
      }
    }
  }  

  $scope.date = function(arr) {
    return $filter('date')
      ($filter('map')(arr, 'date'));
  }
  
  $scope.create = function() {
    $state.go('menu.newres');
  };
  
  $scope.Arrived=function(item){///------------------------------------------------------------------------ Arrived
    console.log("I'm arrived.");
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm',
     template: 'Are you sure to Arrived this reservation?/ยืนยันการทำรายการ'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');//--------------------------------make update here  create service part to send  [$scope.Res= this item] for update to 'Arrived'
       result=RArrived.set(item);
       console.log(result);
        item.active=true;
        item.arrived=true;
        item.no_show=false;        

     } else {
       console.log('You are not sure');
     }
   });
  };
  $scope.Noshow=function(item){ ///------------------------------------------------------------------------ Noshow
    console.log("I'm Home.");
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm',
     template: 'Are you sure to Noshow this reservation?/ยืนยันการทำรายการ'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');//--------------------------------make update here  create service part to send  [$scope.Res= this item] for update to 'Noshow'

       result=RNoshow.set(item);
       console.log(result);
      item.active=true;
      item.arrived=false;
      item.no_show=true;
     } else {
       console.log('You are not sure');
     }
   });
  };
  $scope.Cancel=function(item){ ///------------------------------------------------------------------------ Cancel
    console.log("I'm Home.");
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm',
     template: 'Are you sure to Cancel this reservation?/ยืนยันการทำรายการ'
   });
   confirmPopup.then(function(res) {
     if(res) {
        console.log('You are sure');//--------------------------------make update here  create service part to send  [$scope.Res= this item] for update to 'Noshow'

       result=RCancel.set(item);
        item.active=false;
        item.arrived=false;
        item.no_show=false;

     } else {
       console.log('You are not sure');
     }
   });
  };

  $scope.counter=tdindex();               //------counter == index today
  console.log($scope.counter);
  
  // $scope.Refresh=function(){
  //   Refresh.re();
  //   $scope.test=basket.items();  
  //   $scope.Reserve= $scope.test.Datajson; 
  // }
  $scope.PullForOlder= function() {

    Refresh.re();
    mx='x';
    $scope.test=basket.items();
    $scope.Reserve= $scope.test.Datajson;
    console.log('Refreshing!');    
    $timeout( function() {
      if($scope.counter-10 >= 0){      
        $scope.counter-= 10;    
        $scope.quantity+=10;        
      }
      else{
        $scope.quantity+=$scope.counter;
        $scope.counter-=$scope.counter;
      }      
         console.log("counter= "+$scope.counter);         
        $scope.$broadcast('scroll.refreshComplete');
    }, 1000);                                                              // how to time out set when it complete ,make some condition 
      
  };
  $scope.refreshFn=function(){
    Refresh.re();
    $scope.test=basket.items();
    $scope.Reserve= $scope.test.Datajson;
    console.log('Refreshing!');     
  }
  $scope.set_color = function(data) {
    if (data.active==true&&data.no_show==false&&data.arrived==true){    //Arrived
      data.status="A";
      return {'background-color': "#61BD6D"}
    }
    if (data.active==true&&data.no_show==true&&data.arrived==false){   //Noshow
      data.status="N";
      return {'background-color':"#E25041"}
    }
    if (data.active==false&&data.arrived==false&&data.no_show==false){  //Cancel
      data.status="C";
      return {'background-color':"#2C82C9"}
    }
    if(data.active==true&&data.no_show==false&&data.arrived==false){    //Pending
      data.status="P";
      return {'background-color':"#D1D5D8"}
      // do something to mark !this! status as  "Pendding"
    }
    // else{    
    //   console.log("Active="+data.active+" Noshow="+data.no_show+" Arrived="+data.arrived);
    // }
  };
})

.controller('ResDetailCtrl', function($state,$filter,$scope, $stateParams, basket, $ionicPopup,RArrived,RNoshow,RCancel,Refresh,RPendding,RUpdate) {
  $scope.Res = basket.getitem($stateParams.data);     //----get item from data.id 
  var getHour=function(ss){       // input as String date "2015-12-15"
    var hh=ss.split(":");
    return hh[0];                 // return hour
  }
    $scope.chkUnd=function(d){
      if(d.special_request=='undefined'){
        $scope.Res.special_request=" ";
      }
      if(d.table=='undefined'){
        $scope.Res.table=" ";
      }
      if(d.email=='undefined'){
        $scope.Res.email=" ";
      }
    }
    $scope.set_color = function(data) {
    if (data.active==true&&data.no_show==false&&data.arrived==true){    //Arrived
  
      return {'background-color': "#61BD6D"}
    }
    if (data.active==true&&data.no_show==true&&data.arrived==false){   //Noshow

      return {'background-color':"#E25041"}
    }
    if (data.active==false&&data.arrived==false&&data.no_show==false){  //Cancel
  
      return {'background-color':"#2C82C9"}
    }
    if(data.active==true&&data.no_show==false&&data.arrived==false){    //Pending

      return {'background-color':"#D1D5D8"}
      // do something to mark !this! status as  "Pendding"
    }
  };

  var getMinute=function(ss){
    var hh=ss.split(":");
    return hh[1];
  }
  if($scope.Res!=null){
    var oldtime=new Date($scope.Res.date);      //made variable  to  convert string date to Date format obj   
    oldtime.setHours(getHour($scope.Res.start_time),getMinute($scope.Res.start_time));

  $scope.Condat=function(){         //1.Res.date Convert to displayable        
      $scope.Res.Fulldate=oldtime;         //Replica for get new date let Res.date keep old value    And its format like 2016-02-02 18:00 if2. Show this on ng-model of Date and Time input   as Date format
      // $scope.Res.date=$scope.Res.Fulldate;    //Time Added to date   its Date format not string object

  }

  $scope.$watch('Res.date', function(unformattedDate){
    $scope.Res.date = $filter('date')(unformattedDate, 'yyyy-MM-dd HH:mm');
  });
  }


  $scope.MakeStatus=function(Res){
    if($scope.Res!=null){
      if (Res.active==true&&Res.no_show==false&&Res.arrived==false){
         $scope.Model="Pending";
      }
      if (Res.active==false&&Res.no_show==false&&Res.arrived==false){
        $scope.Model="Cancel";
      }
      if (Res.active==true&&Res.no_show==true&&Res.arrived==false){
        $scope.Model="Noshow";
      }
      if (Res.active==true&&Res.no_show==false&&Res.arrived==true){
        $scope.Model="Arrived"
      }
    }
  }

  $scope.ChangeStatus=function(Model){
    if(Model=="Pending"){
      
         RPendding.set($scope.Res);      
          $scope.Res.active=true;
          $scope.Res.arrived=false;
          $scope.Res.no_show=false;

    }
    if(Model=="Cancel"){
     
          $scope.Res.active=false;
          $scope.Res.arrived=false;
          $scope.Res.no_show=false;
         RCancel.set($scope.Res);

    }
    if(Model=="Noshow"){
      var confirmPopup = $ionicPopup.confirm({
       title: 'Confirm',
       template: 'Are you sure this reservation is a no show?/ยืนยันการทำรายการ'
      });
      confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');//--------------------------------make update here  create service part to send  [$scope.Res= this item] for update to 'Noshow'
          
         RNoshow.set($scope.Res);
          $scope.Res.active=true;
          $scope.Res.arrived=false;
          $scope.Res.no_show=true;

       } else {
         console.log('You are not sure');
       }
     });
    }
    if(Model=="Arrived"){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm',
        template: 'Are you sure this customer has arrived?/ยืนยันการทำรายการ'
      });
      confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');//--------------------------------make update here  create service part to send  [$scope.Res= this item] for update to 'Arrived'
         RArrived.set($scope.Res);
          $scope.Res.active=true;
          $scope.Res.arrived=true;
          $scope.Res.no_show=false;       

       } else {
         console.log('You are not sure');
       }
      });
    }
    else{
      console.log(Model);
    }
  }

  $scope.Disable=true;
  $scope.date;
  $scope.edit=function(){
    if($scope.Disable==false){
      $scope.Res = basket.getitem($stateParams.data);
      console.log($scope.Res);
      $scope.CancelE();
    }
    else{
      $scope.date = oldtime; 
      console.log("Old::"+oldtime);      
      $scope.size = $scope.Res.party_size;
      $scope.spreq = $scope.Res.special_request;
      $scope.table = $scope.Res.table;
      $scope.startT = $scope.Res.start_time;
      $scope.Disable=false ;
    }

  }
  $scope.added=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Confirm',
     template: 'Reservation has been updated./อัพเดทแล้ว'
   });
  };
  $scope.errored=function(data){
    var confirmPopup = $ionicPopup.alert({
     title: 'error',
     template: data
   });
  };
  $scope.EditE=function(item){
    item.date=$scope.Res.Fulldate;          //res.date  name changed here to item.date and get a Res.Fulldate
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm',
     template: 'Update this reservation?/อัพเดทการจองนี้?'
   });
   confirmPopup.then(function(res) {
     if(res) {       

       RUpdate.set(item)
       .success(function(data){      
          console.log("success "); // JSON.stringify(data) 
          $scope.added();
          Refresh.re();
          $scope.data={};  
          $state.go('menu.tab');
      })
      .error(function(data) {
        console.log("error "+data);
        $scope.errored(data);
      });
       $state.go('menu.tab');

     } else {
       console.log('You are not sure');
     }
   })
 } 
  $scope.CancelE=function(){
    $scope.Disable=true;       
    $scope.Res.Fulldate= $scope.date;     
    $scope.Res.start_time= $scope.startT
    $scope.Res.party_size=$scope.size;
    $scope.Res.special_request=$scope.spreq;
    $scope.Res.table=$scope.table;
  }
  $scope.Channelconvert=function(item){
    switch (item){
      case 0:
        return 'hungry_hub';
      case 1:
        return 'hungry_hub';
      case 2:
        return 'hungry_hub';
      case 3:
        return 'hungry_hub';
      case 4:
        return 'hungry_hub';      
      case 5:
        return 'owner';
      case 6:
        return 'manual';
      case 7:
        return 'manual';
      case 8:
        return 'hungry_hub';
      case 9:
        return 'facebook';
      case 10:
        return 'website';
      case 11:
        return 'hungry_hub_website';
      case 12:
        return 'bkk_menu';
      case 13:
        return 'bangkokcom';
      case 14:
        return 'between';
      case 15:
        return 'hotel';
      case 17:
        return 'new_launch';
    }    
  }
})

.controller('blckCtrl', function($scope,Block,$ionicPopup,$state,$ionicLoading,Refresh,$filter) {//---------------------------This is block ctrl
  $scope.data={};
  $scope.title="Block Reservation";
  var dumbD=new Date();
  var year = dumbD.getFullYear();
  var month = dumbD.getMonth();
  var day = dumbD.getDate();
  var hours = dumbD.getHours();
  var minutes = dumbD.getMinutes();
  if(minutes%15!=0){
    var dumb=minutes%15;    
    minutes-=dumb;
  }
  $scope.data.StartDate=new Date(year, month, day, hours, minutes);
  $scope.data.EndDate=new Date(new Date(year, month, day, hours, minutes).getTime() + 24 * 60 * 60 * 1000);

  if($scope.data!=null){
  $scope.$watch('data.startt', function(unformattedDate){
    $scope.data.formattedstartt = $filter('date')(unformattedDate, 'dd/MM/yyyy HH:mm');
  });
  $scope.$watch('data.stop', function(unformattedDate){
    $scope.data.formattedstop = $filter('date')(unformattedDate, 'dd/MM/yyyy HH:mm');
  });
}
 
  $scope.blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Confirm',
     template: 'Inventory has been change./บล็อคเรียบร้อย'
    });
  };
  $scope.errored=function(data){
    var confirmPopup = $ionicPopup.alert({
     title: 'error',
     template: data
   });
  };

   $scope.Block=function(){
    Block.blockRe($scope.data.StartDate,$scope.data.EndDate,$scope.data.quan)
    .success(function(data){      
      $ionicLoading.hide();
      console.log("success "+JSON.stringify(data)); // JSON.stringify(data)
      $scope.blockPop();
      Refresh.re();  
    })
    .error(function(data) {
      $ionicLoading.hide();
      console.log("error "+data);
      $scope.errored(data);
    });
   }
   $scope.cancel=function(){
    // $scope.data=null;
    $scope.data.StartDate=new Date(year, month, day, hours, minutes);
    $scope.data.EndDate=new Date(new Date(year, month, day, hours, minutes).getTime() + 24 * 60 * 60 * 1000);
    $state.go('menu.tab');
   }
})  

.controller('Addres',function($scope, $state, $ionicLoading, AddresService ,basket,$ionicPopup,Refresh,$filter){
  $scope.Psize= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
  $scope.data={};
  $scope.$watch('data.date', function(unformattedDate){
    $scope.data.formattedDate = $filter('date')(unformattedDate, 'dd/MM/yyyy HH:mm');
  });

  var ID=basket.giveId();

  $scope.added=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Confirm',
     template: 'Reservation has been added./เพิ่มการจองแล้ว'
   });
  };
  $scope.errored=function(data){
    var confirmPopup = $ionicPopup.alert({
     title: 'error',
     template: data
   });
  };

  $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
    var index = Math.floor(Math.random() * $dates.length);
    $dates[index].selectable = false;
  }

  $scope.Add=function(){
    if($scope.data.date&&$scope.data.size&&$scope.data.name&&$scope.data.num!=null){
        $ionicLoading.show({
          content: 'Please wait./โปรดรอสักครู่',
          template: '<ion-spinner icon="android"></ion-spinner><br>Please wait. It may take some time/ กรุญารอสักครู่',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    AddresService.addRe($scope.data.date,$scope.data.size,$scope.data.name,$scope.data.num,$scope.data.table,$scope.data.email,ID,$scope.data.note)    
    .success(function(data){      
      $ionicLoading.hide();
      console.log("success "); // JSON.stringify(data) 
      $scope.added();
      Refresh.re();
      $scope.data={};  
      $state.go('menu.tab');

    })
    .error(function(data) {
      $ionicLoading.hide();
      console.log("error "+data);
      $scope.errored(data);
    });
    }
    else{
       $scope.errored('Please fill date , party size , name and phone number/กรุณาใส่ วันเวลา จำนวน ชื่อ และโทรศัพท์');
    }
  };
  $scope.cancel=function(){
    $state.go('menu.tab');
  }

})
.controller('menuCtrl', function($scope,$ionicSideMenuDelegate,Auth,$state,$ionicPopup,$translate,$localstorage) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
  $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
  }
  $scope.logout= function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm',
        template: 'Are you sure to logout?/ยืนยันการลงชื่ออก'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');       
          Auth.logout();
          $localstorage.clear();
          $state.go("login");
        } 
        else {
          console.log('You are not sure');
        }
      });
    }
  $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
  }];
})

.controller('LoginCtrl', function($localstorage,$scope, $LoginService ,$ionicPopup, $state,$timeout, $ionicLoading, basket,$Getresid,Auth,ConnectivityMonitor,$filter) {
    $scope.data = {};
      $scope.login = function() {

      if(!angular.isDefined($scope.data.username)||!angular.isDefined($scope.data.password)||$scope.data.username.trim() == ""|| $scope.data.password.trim() == ""){
        $scope.added();
        return;
      }
      else{
        $localstorage.set('user',$scope.data.username);
        $localstorage.set('password',$scope.data.password);
      }
      Auth.setUser({
        username:$scope.data.username
      });
        $ionicLoading.show({
          content: 'Please wait. It may take some time',
          template: '<ion-spinner icon="android"></ion-spinner><br>Please wait. It may take some time/กรุณารอสักครู่',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $Getresid.getId($scope.data.username, $scope.data.password)
             .success(function(val){                
              basket.getId(val.id);                                                                                  
              basket.getDur(val.res_duration);
             })            
        $LoginService.loginUser($scope.data.username, $scope.data.password)
          .success(function(data) {
            if((typeof(data))=='object'){            
              $ionicLoading.hide();
               data = angular.fromJson(data);                          
               data2 = $filter('orderBy')(data, ['date','start_time'], false);
               basket.addItem({Datajson: data2}); 

              $state.go('menu.tab');
            }
            else if(data=="No reservations yet\n"){
              $ionicLoading.hide();                        
              $state.go('menu.tab'); 
              var alertPopup = $ionicPopup.alert({
                  title: 'No reservation',
                  template: 'No reservation'

              });
            }
            else if(data=="Incorect login/pass\n"){

              $ionicLoading.hide();
              console.log(data);
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check your credentials!/ตรวจสอบข้อมูลให้ถูกต้อง'

              });
            }
          })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check network connection!/ตรวจสอบการเชื่อมต่อ'

              });
          });    //data=wrong credential
    }          
      if($localstorage.get('user')!=null&&$localstorage.get('password')!=null){
        $scope.data.username=$localstorage.get('user');
        $scope.data.password=$localstorage.get('password');
        $scope.login();
        //  $ionicLoading.show({
        //   content: 'Please wait. It may take some time',
        //   template: '<ion-spinner icon="android"></ion-spinner><br>Please wait. It may take some time',
        //   animation: 'fade-in',
        //   showBackdrop: true,
        //   maxWidth: 200,
        //   showDelay: 0
        // });
        // Getresid.getId($localstorage.get('user'), $localstorage.get('password'))
        //      .success(function(val){                
        //       basket.getId(val.id);                                                                                  
        //       basket.getDur(val.res_duration);
        //      })            
        // LoginService.loginUser($localstorage.get('user'),$localstorage.get('password'))
        //   .success(function(data) {
        //     if((typeof(data))=='object'){            
        //       $ionicLoading.hide();
        //        data = angular.fromJson(data);                          
        //        data2 = $filter('orderBy')(data, ['date','start_time'], false);
        //        basket.addItem({Datajson: data2}); 

        //       $state.go('menu.tab');
        //     }
        //     else if(data=="No reservations yet\n"){
        //       $ionicLoading.hide();                        
        //       $state.go('menu.tab'); 
        //       var alertPopup = $ionicPopup.alert({
        //           title: 'No reservation',
        //           template: 'No reservation'

        //       });
        //     }
        //     else if(data=="Incorect login/pass\n"){

        //       $ionicLoading.hide();
        //       console.log(data);
        //       var alertPopup = $ionicPopup.alert({
        //           title: 'Login failed!',
        //           template: 'Please check your credentials!'

        //       });
        //     }
        //   })
        //   .error(function(data) {
        //     $ionicLoading.hide();
        //     console.log(data);
        //       var alertPopup = $ionicPopup.alert({
        //           title: 'Login failed!',
        //           template: 'Please check network connection!'

        //       });
        //   });    //data=wrong credential
      } 
    
      
  

    $scope.checkConnection=function(){
      if(ConnectivityMonitor.isOnline()==true){
        console.log("true");
      }
      else if(ConnectivityMonitor.isOffline()==true){
        console.log("trueOff");
      }
    }


    $scope.image   ='img/logo3-01.png'; 
    $scope.added=function(){
      var confirmPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'Please check username and password /ตรวจสอบข้อมูลให้ถูกต้อง'
      });
    };
    $scope.Checkval=function(){
      var confirmPopup = $ionicPopup.alert({
      title: 'Error',
      template: $localstorage.get('user')+"<br>"+$localstorage.get('password')
      });
      $state.go('menu.tab');
    };

    $scope.login = function() {

      if(!angular.isDefined($scope.data.username)||!angular.isDefined($scope.data.password)||$scope.data.username.trim() == ""|| $scope.data.password.trim() == ""){
        $scope.added();
        return;
      }
      else{
        $localstorage.set('user',$scope.data.username);
        $localstorage.set('password',$scope.data.password);
      }
      Auth.setUser({
        username:$scope.data.username
      });
        $ionicLoading.show({
          content: 'Please wait. It may take some time/กรุญารอสักครู่ ',
          template: '<ion-spinner icon="android"></ion-spinner><br>Please wait. It may take some time/กรุญารอสักครู่',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $Getresid.getId($scope.data.username, $scope.data.password)
             .success(function(val){                
              basket.getId(val.id);                                                                                  
              basket.getDur(val.res_duration);
             })            
        $LoginService.loginUser($scope.data.username, $scope.data.password)
          .success(function(data) {
            if((typeof(data))=='object'){            
              $ionicLoading.hide();
               data = angular.fromJson(data);                          
               data2 = $filter('orderBy')(data, ['date','start_time'], false);
               basket.addItem({Datajson: data2}); 

              $state.go('menu.tab');
            }
            else if(data=="No reservations yet\n"){
              $ionicLoading.hide();                        
              $state.go('menu.tab'); 
              var alertPopup = $ionicPopup.alert({
                  title: 'No reservation',
                  template: 'No reservation'

              });
            }
            else if(data=="Incorect login/pass\n"){

              $ionicLoading.hide();
              console.log(data);
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check your credentials!/ตรวจสอบข้อมูลให้ถูกต้อง'

              });
            }
          })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check network connection!/ตรวจสอบการเชื่อมต่อ'

              });
          });    //data=wrong credential
    }   
})
