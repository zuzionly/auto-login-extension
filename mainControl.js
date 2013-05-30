$(document).ready(function(){
            	
	//refresh table
	removeTableTRs();
	reCreateTable();

	//save to localstorage
	
    $("#save").click(function(){
    	if($("form")[0].checkValidity()){
			var site=new Object;
			$("#siteTable tr").each(function(trindex,tritem){
				if(trindex>0){
								
					site.name = $(tritem).find("input:eq(0)").val();
					site.url = 	$(tritem).find("input:eq(1)").val();
					site.uid =  $(tritem).find("input:eq(2)").val();
					site.pwd = 	$(tritem).find("input:eq(3)").val();
					//save
					localStorage.setItem('siteList'+trindex, JSON.stringify(site));
				}	
				});
						
            $("#status").html("Options Saved.");
            setTimeout(function() {
                $("#status").html("")
            }, 750);
        }
    });
    
    //insert row
    $("#insert").click(function(){
    	if($("form")[0].checkValidity()){
			var tempIndex = $("tr:last td:first").text()*1+1;
			if(tempIndex<2){
				$("<tr><td>"+1+"</td>"+
					"<td><input value='' required /></td>"+
					"<td><input type='url' size='100' value='' required /></td>"+
					"<td><input value='' required /></td>"+
					"<td><input type='password' value='' required /></td>"+
					//toggle hide button link
					"<td><a id='th"+tempIndex+"' href='#' target='_self'>show</a></td>"+
					//remove button link
					"<td><a id='rm"+tempIndex+"' href='#' target='_self'>remove</a></td>"+
					"</tr>").appendTo("#siteTable");

                
			}else{
				$("tr:last").clone().appendTo("#siteTable");
				$("tr:last td:first").text(tempIndex);
							//set button id            				
				$("tr:last td").eq(-2).find("a").attr("id","th"+tempIndex);
				$("tr:last td:last a").attr("id","rm"+tempIndex);
			}

            //bind toggle & save when the new line created
            $("#th"+tempIndex).on("click", function(event)
            {
                toggleHide(this);
            });

            $("#rm"+tempIndex).on("click", function(event)
            {
                removeTr(this);
            });
			
			//save
			var site=new Object;
			$("#siteTable tr").each(function(trindex,tritem){
				if(trindex>0){
								
					site.name = $(tritem).find("input:eq(0)").val();
					site.url = 	$(tritem).find("input:eq(1)").val();
					site.uid =  $(tritem).find("input:eq(2)").val();
					site.pwd = 	$(tritem).find("input:eq(3)").val();
					
					//save
					localStorage.setItem('siteList'+trindex, JSON.stringify(site));
				}	
						
			});
		}
    });
});
            
//remove all rows
function removeTableTRs(){
	$("#siteTable tr").each(function(trindex,tritem){
		if(trindex>0){
			$(tritem).remove();
		}
	});
};

//build table
function reCreateTable(){
	var count = localStorage.length;
	//alert(count);
	for(i=1;i<=count;i++){
		$("<tr><td>"+i+"</td>"+
		"<td><input value='"+JSON.parse(localStorage['siteList'+i]).name+"' required /></td>"+
		"<td><input type='url' size='80' value='"+JSON.parse(localStorage['siteList'+i]).url+"'required /></td>"+
		"<td><input value='"+JSON.parse(localStorage['siteList'+i]).uid+"' required /></td>"+
		"<td><input type='password' value='"+JSON.parse(localStorage['siteList'+i]).pwd+"' required /></td>"+
		//toggle hide button link
		"<td><a id='th"+i+"'href='#' target='_self'>show</a></td>"+
		//remove button link
					"<td><a id='rm"+i+"'href='#' target='_self'>remove</a></td>"+
		"</tr>").appendTo("#siteTable");

        //bind toggle & save
        $("#th"+i).on("click", function(event)
        {
            toggleHide(this);
        });

        $("#rm"+i).on("click", function(event)
        {
            removeTr(this);
        });
	} 
};

//toggle hide button
function toggleHide(who){

		var obj = $("#"+who.id).parent().parent().find("input:last");
    var temPwd = $(obj).val();
    if("password"==$(obj).attr("type"))
    {
        var content = "<input type='text' value='"+temPwd+"'/>";
        $(obj).replaceWith(content);
        $("#"+who.id).html("hide");
    }else{
        var content = "<input type='password' value='"+temPwd+"'/>";
        $(obj).replaceWith(content);
        $("#"+who.id).html("show");
    }
};

//remove row
function removeTr(who){
	//get current index
	var index = $("#"+who.id).parent().parent().parent().find("tr").index($("#"+who.id).parent().parent());
	
	//rebuild id and refersh table
	rebuildId(index);
	removeTableTRs();
	reCreateTable();
};

//rebuild id
function rebuildId(index){
	var count = localStorage.length;
	var i=index;
	//swap localStorage
	while(i<count){
		if(i<count){
    		var temIndex=i;
    		var temp;
    		i++;
    		localStorage['siteList'+temIndex]=localStorage['siteList'+i];
		}
	}
	//delete the last localstorage
	localStorage.removeItem('siteList'+i);
}

