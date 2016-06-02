var translations = {
    "en": {
        "a1": "Add Reservation",
        "a2": "Block",
        "a3": "Log out",
        "b1":"Pull down for older",
        "c1":"Status",
        "c2":"Date*",
        "c3":"Time*",
        "c4":"Size*",
        "c5":"Name*",
        "c6":"Phone*",
        "c7":"Sp.req",
        "c8":"Table",
        "c9":"Channel",
        "c10":"Email",
        "c11":"Attendance",
        "c12":"R.id",
        "c13":"Time stamp",
        "c14":"DONE",
        "c15":"CANCEL",
        "c16":"Active",
        "c17":"Cancel",
        "c18":"Noshow",
        "c19":"Pending",
        "c20":"Date/Time*",
        "c21":"ADD",
        "d1":"Block Reservation",
        "d2":"Start date",
        "d3":"End date",
        "d4":"CONFIRM",
        "d5":"SHOW MORE"

    },
    "th": {
        "a1": "เพิ่มการจองใหม่",
        "a2": "บล็อคการจอง",
        "a3": "ลงชื่อออก",
        "b1":"เลื่อน ผู้ดูรายการที่เก่ากว่า",
        "c1":"สถานะ",
        "c2":"วันที่*",
        "c3":"เวลา*",
        "c4":"จำนวน*",
        "c5":"ชื่อ*",
        "c6":"โทรศัพท์*",
        "c7":"คำขอพิเศษ",
        "c8":"โต๊ะ",
        "c9":"ช่องทาง",
        "c10":"อีเมล",
        "c11":"ความใส่ใจ",
        "c12":"รหัสการจอง",
        "c13":"เวลาที่ทำการจอง",
        "c14":"เสร็จ",
        "c15":"ยกเลิก",
        "c16":"มาแล้ว",
        "c17":"ยกเลิก",
        "c18":"ไม่มา",
        "c19":"รอดำเนินการ",
        "c20":"วันที่/เวลา*",
        "c21":"เพิ่ม",
        "d1":"บล็อคการจอง",
        "d2":"วันที่เริ่ม",
        "d3":"วันสิ้นสุด",
        "d4":"ยืนยัน",
        "d5":"ดูเพิ่ม"
    }
  }
angular.module('starter', ['ionic','angular.filter', 'starter.controllers', 'starter.services','ui.bootstrap.datetimepicker','underscore','ngCookies','ngCordova','pascalprecht.translate'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })
  .run(function($ionicPlatform, $ionicPopup) {
          $ionicPlatform.ready(function() {
              if(window.Connection) {            
                  if(navigator.connection.type == Connection.NONE) {
                      $ionicPopup.confirm({
                          title: "Internet Disconnected",
                          content: "The internet is disconnected on your device."
                      })
                      .then(function(result) {
                          if(!result) {
                              ionic.Platform.exitApp();
                          }
                      });
                  }
              }
          });
      })

    .run(function($ionicPlatform,$state){
      var backbutton=0;
      $ionicPlatform.registerBackButtonAction(function (event) {
        if($state.current.name=="menu.tab"){
          if(backbutton==0){
            backbutton++;
            window.plugins.toast.showShortCenter('Press again to exit');
            $timeout(function(){backbutton=0;},5000);
          }else{
            navigator.app.exitApp();
          }        
        }
        else {
          navigator.app.backHistory();
        }
      }, 100);
    })

    .run(function($ionicPlatform,$state,$localstorage,$Getresid,$LoginService,$ionicLoading,$ionicPopup,$filter,basket,$location,$rootScope){

      $ionicPlatform.ready(function() {
         
    

        if($localstorage.get('user')!=null&&$localstorage.get('password')!=null){
         $ionicLoading.show({
          content: 'Please wait. It may take some time',
          template: '<ion-spinner icon="android"></ion-spinner><br>Please wait. It may take some time',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $Getresid.getId($localstorage.get('user'), $localstorage.get('password'))
             .success(function(val){                
              basket.getId(val.id);                                                                                  
              basket.getDur(val.res_duration);
             })                        
        $LoginService.loginUser($localstorage.get('user'),$localstorage.get('password'))
          .success(function(data) {
            if((typeof(data))=='object'){            
              $ionicLoading.hide();
               data = angular.fromJson(data);                          
               data2 = $filter('orderBy')(data, ['date','start_time'], false);
               basket.addItem({Datajson: data2}); 


              $location.path('/menu/tab');         
              
            }
            else if(data=="No reservations yet\n"){
              $ionicLoading.hide();                        
              $state.go('menu.tab'); 
            }
            else if(data=="Incorect login/pass\n"){

              $ionicLoading.hide();
              console.log(data);             
              $state.go('login');
            }
          })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check network connection!'

              });
          });    //data=wrong credential          
      }     
          });
    })

  .config(function($stateProvider, $urlRouterProvider,$translateProvider) {

    for(lang in translations){
        $translateProvider.translations(lang, translations[lang]);
      }
      
      $translateProvider.preferredLanguage('en');

    $stateProvider

    // setup an abstract state for the tabs directive
    //   .state('menu', {
    //   url: '/menu',
    //   abstract: true,
    //   controller:'menuCtrl',
    //   templateUrl: 'templates/sidemenu.html'
    // })
    // Each tab has its own nav history stack:
     .state('menu',{
      url:"/menu",
      abstract:true,
      templateUrl:"templates/sidemenu.html",
      controller:'menuCtrl',
      onEnter:function($state,Auth){
        if(!Auth.isLoggedIn()){
          $state.go('login');
        }
      }
    })

  .state('menu.tab', {
    url: '/tab',
    views: {
      'dash': {
        templateUrl: 'templates/tab.html',
        controller: 'DashCtrl',
        params: ['id']
      }
    }
  })

   .state('menu.dash', {
    url: '/dash',
    views: {
      'dash1': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('menu.newres', {
    url: '/create',
    views: {
      'dash': {
        templateUrl: 'templates/Addre.html',
        controller: 'Addres'
      }
    }
  })
  
    .state('menu.resdetail', {
      url: '/tab/:data',
      views: {
        'dash': {
          templateUrl: 'templates/resdetail.html',
          controller: 'ResDetailCtrl'
        }
      }      
                  
    })  
  .state('menu.block', {
      url: '/block',
      views:{
        'dash':{
      templateUrl: 'templates/blockpage.html',
      controller: 'blckCtrl'
      }
    }
  })
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  // $urlRouterProvider.otherwise('/tab/dash');

});


