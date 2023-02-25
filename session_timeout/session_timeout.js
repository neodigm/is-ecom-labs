var sesTimeOut = {
  countDown_start : 381000,
  countDown : 0,
  logOutParm : true,
  "init" : function(){
    sesTimeOut.logOutParm = $("body").attr("data-session-timeout") || false;
    if( sesTimeOut.logOutParm ){ // Page Supported
      sesTimeOut.countDown = sesTimeOut.countDown_start;
      sesTimeOut.IntTimer = setInterval(sesTimeOut.sessionTimeOutInt, 1000);
      var ajaxOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function() {
          this.addEventListener("load", function() {
          if( this.responseURL.toUpperCase().indexOf("TEALEAFTARGET.JSP") === -1 ){
            sesTimeOut.reset();
          }
        });
        ajaxOpen.apply(this, arguments);
      };
    }
  },
  "sessionTimeOutInt" : function(){
    sesTimeOut.countDown = ( sesTimeOut.countDown - 1000 );
    var minutes = Math.floor((sesTimeOut.countDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((sesTimeOut.countDown % (1000 * 60)) / 1000);
    if( sesTimeOut.countDown <= 0 ) { // When the count down is over, redirect to my-account.
      clearInterval(sesTimeOut.IntTimer);
      $.get("/common/expire_session.jsp", function(data, status){
        window.location.href = "/my_account/index.jsp" + sesTimeOut.logOutParm;
      });
    }
    if( sesTimeOut.countDown < 120000 ){
      if( !$("#session-dialog").is(":visible") ){
        $("#session-dialog").foundation("reveal", "open");
      }
      if( minutes > 0 ){
        document.getElementById("sessionMins").innerHTML = minutes + " min " + seconds + " sec ";
      }else{
        document.getElementById("sessionMins").innerHTML = seconds + " sec ";
      }
    }
  },
  "reset" : function(){
    sesTimeOut.countDown = sesTimeOut.countDown_start;
    $("#session-dialog").foundation("reveal", "close");
  }
};
sesTimeOut.init();






























        //  BELOW IS NAVEENS ORIGINAL CODE


       // Set the date we're counting down to 30 minutes 10 seconds to be safe
       var countDown = 181000;
       // Update the count down every 1 second
       var sessionTimeOutInt = setInterval(function() {
           countDown = countDown-1000;
           var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
           var seconds = Math.floor((countDown % (1000 * 60)) / 1000);
           
           if(countDown < 120000){
              if($('#session-dialog').is(':visible')){
                     if(minutes > 0){
                            document.getElementById("sessionMins").innerHTML = minutes + "min " + seconds + "sec ";
                     }else{
                            document.getElementById("sessionMins").innerHTML = seconds + "sec ";
                     }
              }else{
                     $('#session-dialog').foundation('reveal', 'open');
                     document.getElementById("sessionMins").innerHTML = minutes + "min " + seconds + "sec ";
              }
           }
           // When the count down is over, redirect to my-account. 
           if (countDown <= 0) {
               clearInterval(sessionTimeOutInt);
               $.get("/common/expire_session.jsp", function(data, status){
                   window.location.href = "/my_account/index.jsp?checkout=true&sw=1";
               });
           }
       }, 1000);
