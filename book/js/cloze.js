	var cloze_i=-1;
	var cloze_vsebina;
	var cloze_maxWidth=0;
	var cloze_polje= new Array();
	var cloze_parent=$(".clozeBlock u").parent();
	var cloze_IM= new Array();
	var cloze_listing = new Array();
	
function cloze_levenshteinDistance(s,t) { //Levenshtein distance
	var d = new Array();
	for (var i=0;i<s.length+1;i++){
		d[i]=new Array();
	}
	for (var i=0; i<s.length+1;i++)
		for (var j=0;j<t.length+1;j++)
			d[i][j]=0;
	for (var i=1;i<s.length+1;i++)
		d[i][0]=i;
	for (var j=1;j<t.length+1;j++)
		d[0][j]=j;
	for(var j=1;j<t.length+1;j++){
		for(var i=1;i<s.length+1;i++) {
			if(s[i-1]==t[j-1])
				d[i][j]=d[i-1][j-1];
			else 
				d[i][j]=Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+1);
		}
	}
	return d[s.length][t.length];
}
	
function cloze_maxVelikost(cloze_niz, cloze_maxWidth, cloze_value){
	var cloze_znak=";";
	if(cloze_value!="0") cloze_znak=",";
	var cloze_vel=cloze_niz.indexOf(cloze_znak);
	
	if(cloze_vel!=-1){
		cloze_vel = cloze_maxVelikost(cloze_niz.substr(cloze_vel+1,cloze_niz.length-cloze_vel-1), cloze_vel, cloze_value);
	}
	else{
		cloze_vel = cloze_niz.length;
	}
	
	if(cloze_vel>cloze_maxWidth)
		return cloze_vel;
	else
		return cloze_maxWidth;
}


function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
}

function changeInputWidth(clozeId, stZnakov) {
	$("#cloze"+clozeId+" input").each(function(){
		if($(this).attr('type')=='text'){
			$(this).css({"width" : (stZnakov+2)+"ch"});
		}
	});	
}

function getAttributeValue(name, defaultValue){
	var temp = document.getElementById(name);
	if (typeof(temp) != 'undefined' && temp != null)
	{
		 return document.getElementById(name).getAttribute("value");
	}
	return defaultValue;
}

function clozeSubmit(ident){
	var cloze_st=0, cloze_pst=0;
	$("#submit"+ident).css('display','none');
	$("#restart"+ident).css('display','inline-block');
	$("#clozeScore"+ident).css('display','inline-block');
	$("#showAnswersButton"+ident).css('display','inline-block');
	var cloze_temp_polje=jQuery.extend(true, {}, cloze_polje);
	$('#cloze'+ident+' .clozeVnos').each(function(){
		cloze_st++;
		var cloze_vrednost=$(this).val();
		if(cloze_vrednost.length!=0){
			var cloze_temp_id = $(this).attr('id');
			if(cloze_temp_id.indexOf('-')!=-1) {
				cloze_temp_id=cloze_temp_id.substr(0,cloze_temp_id.indexOf('-'));
			}
			
			var cloze_poljeNizov=cloze_temp_polje[cloze_temp_id];
			var cloze_dropdown=document.getElementById("clozeFlag"+ident+".dropdown");
			var cloze_checkCaps=document.getElementById("clozeFlag"+ident+".checkCaps");
			if(cloze_checkCaps.getAttribute('value')=="false" && cloze_dropdown.getAttribute('value')!="True"){
				cloze_vrednost=cloze_vrednost.toLowerCase();
				for(var i=0;i<cloze_poljeNizov.length;i++){
					cloze_poljeNizov[i]=cloze_poljeNizov[i].toLowerCase();
				}
				
			}

			
			var cloze_strictMarking=document.getElementById("clozeFlag"+ident+".strictMarking");
			if(cloze_strictMarking.getAttribute('value')=="false" && (!isNumber(cloze_vrednost)) && cloze_dropdown.getAttribute('value')!="True") {
				for(var i=0;i<cloze_poljeNizov.length;i++) {
					if(cloze_poljeNizov[i].length>2 &&cloze_levenshteinDistance(cloze_vrednost, cloze_poljeNizov[i])<=2){
						cloze_vrednost=cloze_poljeNizov[i];
						break;
					}
				}
			}

			if(cloze_poljeNizov.indexOf(cloze_vrednost)!=-1){
				$(this).css({"background-color" : "#33FF00"}); //green
				cloze_pst++;
				cloze_temp_polje[cloze_temp_id].splice(cloze_poljeNizov.indexOf(cloze_vrednost),1);
			}
			else
				$(this).css({"background-color" : "#FE2E2E"}); //red
		}
		else
				$(this).css({"background-color" : "#FE2E2E"}); //red
	});
	var resultText = "Tvoj rezultat je ";
	if (getAttributeValue("elo-language","sl")== "en"){
		resultText = "Your score is "; 
	}
	document.getElementById("clozeScore"+ident).innerHTML= resultText+cloze_pst+"/"+cloze_st+".";
}

function showClozeScore(ident){
	var cloze_st=0, cloze_pst=0;
	$('#cloze'+ident+' .clozeVnos').each(function(){
		cloze_st++;
		var cloze_temp_test=$(this).css('backgroundColor');
		cloze_temp_test=cloze_temp_test.substr(4,2);
		if(cloze_temp_test.indexOf('51')!=-1)
			cloze_pst++;
	});
	var resultText = "Tvoj rezultat je ";
	if (getAttributeValue("elo-language","sl")== "en") {
		resultText = "Your score is "; 
	}
	document.getElementById("clozeScore"+ident).innerHTML= resultText+cloze_pst+"/"+cloze_st+".";
}

function clozeRestart(ident) {
	$("#submit"+ident).css('display','inline-block');
	$("#restart"+ident).css('display','none');
	$("#clozeScore"+ident).css('display','none');
	$("#showAnswersButton"+ident).css('display','none');
	$('#cloze'+ident+' .clozeVnos').each(function(){
		$(this).css({"background-color" : "#FFFFFF"}); //white
		$(this).prop('value', '');
	});
}

function fillClozeInputs(ident) {
	var cloze_isListing=document.getElementById("clozeFlag"+ident+".listing");
	if($(cloze_isListing).attr('value')=='0') {
		$('#cloze'+ident+' .clozeVnos').each(function(){
			$(this).css({"background-color" : "#33FF00"}); //green
			$(this).prop('value', cloze_polje[$(this).attr('id')][0]);
		});
	}
	else {
		var cloze_tempSt1=$(cloze_isListing).prop('value');
		var cloze_tempSt2=0;
		$('#cloze'+ident+' .clozeVnos').each(function(){
			$(this).css({"background-color" : "#33FF00"}); //green
			var cloze_temp_id=$(this).attr('id')
			cloze_temp_id=cloze_temp_id.substr(0,cloze_temp_id.indexOf('-'));
			$(this).prop('value', cloze_polje[cloze_temp_id][cloze_tempSt2]);
			cloze_tempSt2++;
		});
	}
}


function cloze_IM_preveri(id,ident){
	var cloze_el = document.getElementById(id);
	var cloze_vrednost=$(cloze_el).val();
	var cloze_temp_id=$(cloze_el).attr('id');
	var cloze_isListing=false;
	if(cloze_vrednost.length!=0){
		if(cloze_temp_id.indexOf('-')!=-1) {
				cloze_temp_id=cloze_temp_id.substr(0,cloze_temp_id.indexOf('-'));
				cloze_isListing=true;
			}
		var cloze_poljeNizov=cloze_polje[cloze_temp_id];
		
		
		var cloze_checkCaps=document.getElementById("clozeFlag"+ident+".checkCaps");
		var cloze_dropdown=document.getElementById("clozeFlag"+ident+".dropdown");
		if(cloze_checkCaps.getAttribute('value')=="false" && cloze_dropdown.getAttribute('value')!="True"){
			cloze_vrednost=cloze_vrednost.toLowerCase();
			for(var i=0;i<cloze_poljeNizov.length;i++){
				cloze_poljeNizov[i]=cloze_poljeNizov[i].toLowerCase();
			}
		}
		
		var cloze_strictMarking=document.getElementById("clozeFlag"+ident+".strictMarking");
		if((cloze_strictMarking.getAttribute('value')=="false")   && (!isNumber(cloze_vrednost)) && cloze_dropdown.getAttribute('value')!="True") {
			for(var i=0;i<cloze_poljeNizov.length;i++) {
				if(cloze_poljeNizov[i].length>2 && cloze_levenshteinDistance(cloze_vrednost, cloze_poljeNizov[i])<=1){
					cloze_vrednost=cloze_poljeNizov[i];
					break;
				}
			}
		}
			
		if(cloze_isListing){
			var cloze_numInput=0;
			var cloze_numTest=0;
			for(var i=0;i<cloze_poljeNizov.length;i++){
				var cloze_tempElt=document.getElementById(cloze_temp_id+"-"+i);
				if(cloze_poljeNizov[i]==cloze_vrednost)
					cloze_numTest++;
				if(!(cloze_tempElt===undefined)){
					if(cloze_strictMarking.getAttribute('value')=="false" && (!isNumber(cloze_vrednost))){
						if(cloze_levenshteinDistance(cloze_vrednost, $(cloze_tempElt).prop("value"))<=1)
							cloze_numInput++;
					}
					else{
						if(cloze_vrednost==$(cloze_tempElt).prop("value"))
							cloze_numInput++;
					}
				}
			}
			if(cloze_numInput==cloze_numTest){
				$(cloze_el).css({"background-color" : "#33FF00"}); //green
			}
			else
				$(cloze_el).css({"background-color" : "#FE2E2E"}); //red
		}
		
		else{	
			if(cloze_poljeNizov.indexOf(cloze_vrednost)!=-1){
				$(cloze_el).css({"background-color" : "#33FF00"}); //green
			}
			else
				$(cloze_el).css({"background-color" : "#FE2E2E"}); //red
		}
	}
	else
		$(cloze_el).css({"background-color" : "#FE2E2E"}); //red
}


$(document).ready(function(){
	$(".clozeBlock input[type=hidden]").each(function(){
		var cloze_niz=$(this).attr('id');
		cloze_niz=cloze_niz.substr(cloze_niz.length-14,cloze_niz.length);
		if(cloze_niz=="instantMarking"){
			var cloze_niz=$(this).attr('id');
			cloze_niz=cloze_niz.substr(9,cloze_niz.indexOf('.')-9);
			cloze_IM[cloze_niz]=$(this).prop('value');
		}
	});
	
	var current_id = "";
	var current_length = 0;
	$(".clozeBlock u").each(function() {
		cloze_i++;
		cloze_vsebina=$(this).html();
		if(cloze_vsebina=="&lt;") cloze_vsebina="<";
		if(cloze_vsebina=="&gt;") cloze_vsebina=">";		cloze_temp_id=$(this).parent().attr('id');

		var cloze_temp_id=$(this).parent();
		while(cloze_vsebina.indexOf("_")!=-1){
			cloze_vsebina=cloze_vsebina.replace("_"," ");
		}
		while(cloze_temp_id.hasClass("clozeBlock")!=true){
			cloze_temp_id=cloze_temp_id.parent();
		}
		cloze_temp_id=cloze_temp_id.attr('id');
		cloze_temp_id=cloze_temp_id.substr(5);
		var cloze_value=getAttributeValue("clozeFlag"+cloze_temp_id+".listing","0");
		var cloze_value_DD=getAttributeValue("clozeFlag"+cloze_temp_id+".dropdown","False");
		var cloze_equallength=getAttributeValue("clozeFlag"+cloze_temp_id+".equallength","False");
		
		//prislo je do spremembe clozeja, zato bomo v prejsnjem popravili
		if (current_id != cloze_temp_id){
			current_id = cloze_temp_id;
			current_length = 0;
		}		
		// dropdown
		if(cloze_value_DD=="True" && cloze_vsebina.indexOf('{')==0){
			cloze_vsebina=cloze_vsebina.substr(1,cloze_vsebina.length-2);
			cloze_temp_polje=cloze_vsebina.split(';');
			cloze_polje['clozeVnos'+cloze_i]=new Array(cloze_temp_polje[0]);
			if(cloze_IM[cloze_temp_id]=="true"){
				cloze_inputSt='<select id="clozeVnos'+cloze_i+'" class="clozeVnos" onblur="cloze_IM_preveri(\'clozeVnos'+cloze_i+'\', \''+cloze_temp_id+'\')">';
				cloze_inputSt+="<option></option>";
				cloze_temp_polje=_.shuffle(cloze_temp_polje);
				for(var i=0;i<cloze_temp_polje.length;i++){
					cloze_inputSt+="<option>"+cloze_temp_polje[i]+"</option>";
				}
				cloze_inputSt+="</select>";
				$(this).replaceWith(cloze_inputSt);						
			}
			
			else {
				cloze_inputSt="<select id='clozeVnos"+cloze_i+"' class='clozeVnos'><option></option>";
				cloze_temp_polje=_.shuffle(cloze_temp_polje);
				for(var i=0;i<cloze_temp_polje.length;i++){
					cloze_inputSt+="<option>"+cloze_temp_polje[i]+"</option>";
				}
				cloze_inputSt+="</select>";
				$(this).replaceWith(cloze_inputSt);						
			}
		}
		else{
		// ni nastevanje
			if(cloze_value=="0") {
				cloze_listing[cloze_i]=0;
				if(cloze_vsebina.indexOf('{')==0){
					cloze_vsebina=cloze_vsebina.substr(1,cloze_vsebina.length-2);
					cloze_polje['clozeVnos'+cloze_i]=cloze_vsebina.split(";");
				}
				else 
					cloze_polje['clozeVnos'+cloze_i]=new Array(cloze_vsebina);
				var st_znakov=cloze_maxVelikost(cloze_vsebina, 0, cloze_value);
				var temp_width = st_znakov * 0.5;
				if (current_length < st_znakov) current_length = st_znakov;
					
				if(cloze_IM[cloze_temp_id]=="true")
					$(this).replaceWith('<input type="text" value="" id="clozeVnos'+cloze_i+'" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos" onblur="cloze_IM_preveri(\'clozeVnos'+cloze_i+'\', \''+cloze_temp_id+'\')"/>');
				else
					$(this).replaceWith('<input type="text" value="" id="clozeVnos'+cloze_i+'" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos"/>');
				
				
			}
			// nastevanje
			else {
				var st_znakov=cloze_maxVelikost(cloze_vsebina, 0, cloze_value);
				var temp_width = st_znakov * 0.5;
				cloze_polje['clozeVnos'+cloze_i]=cloze_vsebina.split(",");
				cloze_value=parseInt(cloze_value);
				cloze_listing[cloze_i]=cloze_value;
				
				if(cloze_IM[cloze_temp_id]=="false") {
					var cloze_inputSt = '<input type="text" value="" id="clozeVnos'+cloze_i+'-0" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos"/>';
					for(var i=1; i<cloze_value;i++){
						cloze_inputSt = cloze_inputSt + ', ' + '<input type="text" value="" id="clozeVnos'+cloze_i+'-'+i+'" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos"/>';
					}
					$(this).replaceWith(cloze_inputSt);
				}
				else {
					var cloze_inputSt = '<input type="text" value="" id="clozeVnos'+cloze_i+'-0" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos" onblur="cloze_IM_preveri(\'clozeVnos'+cloze_i+'-0\', \''+cloze_temp_id+'\')"/>';
					for(var i=1; i<cloze_value;i++){
						cloze_inputSt = cloze_inputSt + ', ' + '<input type="text" value="" id="clozeVnos'+cloze_i+'-'+i+'" autocomplete="off" style="width:'+temp_width+'em;width:'+(st_znakov+2)+'ch; margin-right:-1px;" class="clozeVnos" onblur="cloze_IM_preveri(\'clozeVnos'+cloze_i+'-'+i+'\', \''+cloze_temp_id+'\')"/>';
					}
					$(this).replaceWith(cloze_inputSt);
				}
				
			}
		}
		cloze_parent=$("#cloze"+cloze_temp_id);
		$(cloze_parent).find("input").each(function(){
			if (cloze_equallength=="True")
				if($(this).attr('type')=='text'){
					$(this).css({"width" : (current_length+2)+"ch"});
				}
		});	
	
	});

});



/*<input type="text" class="clozeVnos" style="width: 6.6em; margin-right: -1px;" autocomplete="off" id="clozeVnos1" value="">*/