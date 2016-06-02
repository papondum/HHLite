// function custom_sort(a, b) {
//     return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
// }

angular.module('starter.services', [])

.factory('basket', function() {
  items={"Datajson":[{"restaurant_id":null}]};
  var user;
  var pw;
  var myBasketService = {};
  var id;
  var dur;
    
  myBasketService.kepuser = function(item) {
    user=item;
  };
  myBasketService.caluser = function() {
    return user;
  };
  myBasketService.keppw = function(item) {
    pw=item;
  };
  myBasketService.calpw = function() {
    return pw;
  };
  myBasketService.addItem = function(item) {      
    items=item;
  };
  myBasketService.removeItem = function(item) {
    var index = items.indexOf(item);
    items.splice(index, 1);
  };
  myBasketService.getitem= function(chatId) {
      for (var i = 0; i < items.Datajson.length; i++) {
        if (items.Datajson[i].id === parseInt(chatId)) {
          return items.Datajson[i];
        }
      }
      return null;
    }
  myBasketService.items = function() {    
    return items;
  };
  myBasketService.getId = function(item) {        
    id=item;
  }; 
  myBasketService.giveId = function() {        
    return id;
  };
  myBasketService.getDur = function(item) {        
    dur=item;
  };
  myBasketService.giveDur = function() {        
    return dur;
  };  
  return myBasketService;
})

.factory('UserService', function(basket) {
  return {
      allObj : basket.items()
  };
})

.service('RArrived',function($http,$q,basket,Refresh,$state,$ionicPopup){
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    set:function(item){      
      var id=item.id;
      var res_id=item.restaurant_id;
      var active='true';
      var arrived='true';
      var no_show='false';
      var deferred = $q.defer();
      var promise = deferred.promise;  
      $http({
        method:'POST',
        url:"http://fb.hungryhub.com:85/papon/ProUpdateRes.php",
        data:'username='+user+'&password='+pw+'&id='+id+'&restaurant_id='+res_id+'&arrived='+arrived+'&no_show='+no_show+'&active='+active,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {             
          console.log("if_condition_Response>"+JSON.stringify(response));                                       
          deferred.resolve(response);
          Refresh.re();
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');        
        }
      })
      .error(function(response) {
        console.log("error="+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject("NetworkError");        
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('RNoshow',function($http,$q,basket,Refresh,UserService,$state,$ionicPopup){
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    set:function(item){
      var id=item.id;
      var res_id=item.restaurant_id;
      var active='true';
      var arrived='false';
      var no_show='true';
      var deferred = $q.defer();
      var promise = deferred.promise;  
      $http({
        method:'POST',
        url:"http://fb.hungryhub.com:85/papon/ProUpdateRes.php",
        data:'username='+user+'&password='+pw+'&id='+id+'&restaurant_id='+res_id+'&arrived='+arrived+'&no_show='+no_show+'&active='+active,//id  res_id   arrived   no_show,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {             
          console.log("if_condition_>"+JSON.stringify(response));                                       
          deferred.resolve(response);
          Refresh.re();
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('RCancel',function($http,$q,basket,Refresh,$state,$ionicPopup){
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    set:function(item){
      console.log(item);
      var id=item.id;
      var res_id=item.restaurant_id;
      var active='false';
      var arrived='false';
      var no_show='false';
      var deferred = $q.defer();
      var promise = deferred.promise;  
      $http({
        method:'POST',
        url:"http://fb.hungryhub.com:85/papon/ProUpdateRes.php",
        data:'username='+user+'&password='+pw+'&id='+id+'&restaurant_id='+res_id+'&arrived='+arrived+'&no_show='+no_show+'&active='+active,//id  res_id   arrived   no_show,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {             
          console.log("if_condition_>"+JSON.stringify(response));                                       
          deferred.resolve(response);
          Refresh.re();
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('Refresh',function($http,basket,$LoginService,$state,$filter){//------------------------- basket.addItem({Datajson: data}); Re log in
  var user=basket.caluser();
  var pw=basket.calpw();
  return{
    re:function(){
        $LoginService.loginUser(user, pw)
        .success(function(data) {
          if((typeof(data))=='object'){            
             ata = angular.fromJson(data);                          
             data2 = $filter('orderBy')(data, ['date','start_time'], false);
             basket.addItem({Datajson: data2}); 
             console.log("Updated");             
             // $state.go('menu.tab', {}, {reload: true});
          }          
        })
        .error(function(data) {          
          console.log(data);            
        });
    }
  }
})
.service('RPendding',function($http,$q,basket,Refresh,$state,$ionicPopup){
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    set:function(item){
      console.log(item);
      var id=item.id;
      var res_id=item.restaurant_id;      
      var active='true';
      var arrived='false';
      var no_show='false';
      var deferred = $q.defer();
      var promise = deferred.promise;  
      $http({
        method:'POST',
        url:"http://fb.hungryhub.com:85/papon/ProUpdateRes.php",
        data:'username='+user+'&password='+pw+'&id='+id+'&restaurant_id='+res_id+'&arrived='+arrived+'&no_show='+no_show+'&active='+active,//id  res_id   arrived   no_show,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {             
          console.log("if_condition_>"+JSON.stringify(response));                                       
          deferred.resolve(response);
          Refresh.re();
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('RUpdate',function($http,$q,basket,Refresh,$state,$ionicPopup){
  var user = basket.caluser();
  var pw   = basket.calpw();
  var dur  = basket.giveDur();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    set:function(item){             //take item Res to go php
            
      var id=item.id;
      var res_id=item.restaurant_id;

      var date= item.date;      
      var dateC= new Date(date);
      console.log(user+":"+pw);


      var endtime=dateC.setMinutes(dateC.getMinutes() + dur);
      endtime=new Date(endtime);      
      var size= item.party_size;
      var spRequest=item.special_request;
      var table= item.table;

      var deferred = $q.defer();
      var promise = deferred.promise;  
      $http({
        method:'POST',
        url:"http://fb.hungryhub.com:85/papon/ProUpdateAttr.php",
        data:'username='+user+'&password='+pw+'&id='+id+'&restaurant_id='+res_id+'&date='+date+'&endtime='+endtime+'&size='+size+'&spReq='+spRequest+'&table='+table,//id  res_id   arrived   no_show,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {
        if (response!=false) {
          if(response.base){
            console.log("if_condition_>"+JSON.stringify(response));                                       
            deferred.reject('Cannot update old reservations/ไม่สามารถอัพเดทรายการเก่า');
          }         
          else if(response.ack==null){
            console.log("else if_condition_>"+JSON.stringify(response));   
            var mes=response.date;
            response=mes;                                    
            deferred.reject("Date "+response);
          }
          else if(response.base=="Inventory is not available"){
            console.log("else if_condition_>"+JSON.stringify(response));                                       
            response="Inventory is not available/จำนวนที่นั่งไม่สามารถใช้ได้";
             deferred.reject(response);
          }
          else{
            console.log("if_condition_>"+JSON.stringify(response));                                       
            deferred.resolve(response);}
          }   
         
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('Block',function($http,basket,$state,$q,$ionicLoading,$ionicPopup){//------------------------- basket.addItem({Datajson: data}); Re log in
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
   blockRe:function(start, end, quan){            
      var deferred = $q.defer();
      var promise = deferred.promise;             
      // var datatest = 'username='+user+'&password='+pw+'&size='+sizen+'&date='+date+'&resID='+resid+'&name='+name +'&phone='+num+'&note='+note+'&table='+table+'&email='+email;
      //  console.log(datatest);
      $http({
        method: 'POST',
        url: "http://fb.hungryhub.com:85/papon/ProBlock.php",
        data: 'username='+user+'&password='+pw+'&start='+start+'&end='+end,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {             
          if(response.messages=="Inventories not found"){
            response="Inventories not found/ไม่พบข้อมูลที่นั่ง";
            deferred.reject(response);
          }
          else{
          console.log("if_condition_>"+JSON.stringify(response));                                       
          deferred.resolve(response);
          }
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.service('AddresService', function($q,$http,basket,$state,$ionicPopup) {  
  var user=basket.caluser();
  var pw=basket.calpw();
  var blockPop=function(){
    var confirmPopup = $ionicPopup.alert({
     title: 'Error',
     template: 'Please check your connection./ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    });
  };
  return{
    addRe:function(date, size, name, num, table, email,resid, note){      
      var sizen = size.toString();
      var deferred = $q.defer();
      var promise = deferred.promise;             
      // var datatest = 'username='+user+'&password='+pw+'&size='+sizen+'&date='+date+'&resID='+resid+'&name='+name +'&phone='+num+'&note='+note+'&table='+table+'&email='+email;
      //  console.log(datatest);
      $http({
        method: 'POST',
        url: "http://fb.hungryhub.com:85/papon/ProAddrev.php",
        data: 'username='+user+'&password='+pw+'&date='+date+'&size='+sizen+'&resID='+resid+'&name='+name +'&phone='+num+'&note='+note+'&table='+table+'&email='+email,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {
          if(response.base){
            console.log("else if_condition_>"+JSON.stringify(response));                                       
             deferred.reject('Incorrect time inventory./เวลาผิดพลาด');
          }             
          else if(response.ack==null){
            console.log("else if_condition_>"+JSON.stringify(response));   
            var mes=response.date;
            response=mes;                                    
            deferred.reject("Incorrect date"+response);
          }
          else if(response.base=="Inventory is not available"){
            console.log("else if_condition_>"+JSON.stringify(response));                                       
            response="Inventory is not available/จำนวนที่นั่งไม่สามารถใช้ได้";
             deferred.reject(response);
          }
          else{
            console.log("if_condition_>"+JSON.stringify(response));                                       
            deferred.resolve(response);}
          }        
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        if(response==null){
          blockPop();
          $state.go('login');
          window.close();
          ionic.Platform.exitApp();
        }
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('$Getresid',function(basket,$http,$q){  
  return{
    getId:function(user,pw){
      var deferred = $q.defer();
      var promise = deferred.promise;             
      $http({
        method: 'POST',
        url: "http://fb.hungryhub.com:85/papon/ProResid.php",
        data: 'username='+user+'&password='+pw,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: false
      })
      .success(function(response) {              
        if (response!=false) {        
          deferred.resolve(response);          
        } 
        else {
          console.log("else"+response);                  
          deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
      })
      .error(function(response) {
        console.log("error"+response);
        deferred.reject(response);
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {              
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})
.factory('Auth', function ($cookieStore) {
   var _user = $cookieStore.get('starter.user');
   var setUser = function (user) {
      _user = user;
      $cookieStore.put('starter.user', _user);
   }
 
   return {
      setUser: setUser,
      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      logout: function () {
         $cookieStore.remove('starter.user');
         _user = null;
      }
   }
})
.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
  }
})
.service('$LoginService', function($q,$http, basket) {
  return {
    loginUser: function(name, pw) {
        basket.kepuser(name);            
        basket.keppw(pw);
        var deferred = $q.defer();
        var promise = deferred.promise;             
        $http({
          method: 'POST',
          url: "http://fb.hungryhub.com:85/papon/ProAuthen.php",
          data: 'username='+name+'&password='+pw  ,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          cache: false
        })
        .success(function(response) {              
          if (response!=false) {             
            // console.log("if"+response); 
            // basket.getId();
            deferred.resolve(response);
        } else {
            // console.log("else"+response);
            deferred.reject('Wrong credentials./ข้อมูลผิดพลาด');
        }
        })  //end success 
        .error(function(response) {
          console.log("error"+response);
          deferred.reject(response);
        });
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {              
          promise.then(null, fn);
          return promise;
        }
        return promise;
    }
  }
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    clear:function(){
      $window.localStorage.clear();
    }
  }
}]);
