$(document).ready(function(){
    //build link
    buildLink();
    
    $("div").click(function(){
        var id = $(this).attr("id");
        var uid = JSON.parse(localStorage['siteList'+id]).uid;
        var pwd = $.md5(JSON.parse(localStorage['siteList'+id]).pwd);

        chrome.tabs.create(
        {
            'url': $(this).attr("value")+uid+"&password="+pwd,
            'selected': true
        });
    });
});

function buildLink(){
    var count = localStorage.length;
    //alert(count);
    for(i=1;i<=count;i++){
        if(JSON.parse(localStorage['siteList'+i]).name != ""){
            $("<div id='"+i+"' "+
            "value='"+JSON.parse(localStorage['siteList'+i]).url+"?reqID=11282006&nav=Homenav&userid='>"+
            JSON.parse(localStorage['siteList'+i]).name+
            "</div>").appendTo("#links");
        }
    } 
};