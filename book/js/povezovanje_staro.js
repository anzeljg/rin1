var testiranje;
var razred0;
var razred1;
var prviizbran0;
var prviizbran1; 
var par = new Array();

function findPos(obj){
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

function preveri0(){
	var a = $(".izbran0.levi0").attr("id"); 
	a=a.substr(0,a.length-2);
	var c=$(".izbran0.levi0").parent().parent().attr("class");
	var b = $(".izbran0.desni0").attr("id"); 
	b=b.substr(0,b.length-2);
	var d="#stevec"+c.substr(4,c.length-5);
	d=$(d);
	if(a==b)
		testiranje=true;
	else{
		testiranje=false;
		var st=parseInt(d.html());
		st++;
		d.html(st);
	}
}

function preveri1(){        
	var a = $(".izbran1.levi1").attr("id");
	a=a.substr(0,a.length-2);
	var c=$(".izbran1.levi1").parent().parent().attr("class");
	var b = $(".izbran1.desni1").attr("id"); 
	b=b.substr(0,b.length-2);
	if(a==b&&par[c]!=false)
		par[c]=true;
	else
		par[c]=false;
}

function prestavi0(){
	var id = $(".izbran0.levi0").attr("id"); 
	var idl=id+"1"
	var idr=$(".izbran0.desni0").attr("id");
	var t1 = document.getElementById(idl);
	var t2 = document.getElementById(idr); 
	var p1 = findPos(t1); 
	var p2 = findPos(t2); 
	$(".izbran0.desni0").transition({y: p1[1]-p2[1] , x: p1[0]-p2[0]}); 
	$(".izbran0").addClass("premaknjen"); 
	$(".izbran0").css({"border-color": ""});
}

function prestavi1(){ 
	preveri1(); 
	var id = $(".izbran1.levi1").attr("id"); 
	var idl=id+"1"
	var idr=$(".izbran1.desni1").attr("id");
	var t1 = document.getElementById(idl);
	var t2 = document.getElementById(idr); 
	var p1 = findPos(t1); 
	var p2 = findPos(t2); 
	$(".izbran1.desni1").transition({y: p1[1]-p2[1] , x: p1[0]-p2[0]}); 
	$(".izbran1").addClass("premaknjen"); 
	$(".izbran1").css({"border-color": ""});
	$(".izbran1").removeClass("izbran1"); 
} 

function premesaj(id){
	var otroci=$(".desni"+id);
	var starsi=$(".desni"+id).parent();
	otroci.detach();
	var i=0;
	starsi.each(function(){
		$(this).append(otroci[i]);
		i++;
	});
}

$(document).ready(function(){
	
	$(".povezovanje").each(function(){
		var index=$(this).children().children().attr("class");
		if(index!=null){
			var povID = index.lastIndexOf("|");
			index=index.substr(4,povID-4);
			index="premesaj"+index;
			var otroci=$("."+index);
			var starsi=$("."+index).parent();
			otroci=_.shuffle(otroci);
			var i=0;
			starsi.each(function(){
				$(this).html(otroci[i]);
				i++;
			});
		}
	});
	
	$(".premik0").click(function(){
		if ($(this).hasClass("premaknjen")==false){ 
			if($(".izbran0").length==0){
				prviizbran0=$(this); 
				razred0=prviizbran0.parent().parent().attr("class"); 
				$(this).css({"border-color": "yellow"}); 
				$(this).addClass("izbran0"); 
			}
			else if($(this).parent().parent().attr("class")==razred0){
				if ($(".izbran0").length==1&&($(this).hasClass("levi0")==prviizbran0.hasClass("desni0"))){
					$(this).addClass("izbran0"); 
					$(this).css({"border-color": "yellow"}); 
					prestavi0(); 
					preveri0();
					if(testiranje){
						prviizbran0.css({"border-color": "green"}); 
						$(this).css({"border-color": "green"}); 
					}else{
						if(prviizbran0.hasClass("desni0"))
							prviizbran0.transition({y: 0 , x: 0 });
						else
							$(this).transition({y: 0 , x: 0 });
						prviizbran0.removeClass("premaknjen");
						$(this).removeClass("premaknjen");
						prviizbran0.css({"border-color": "red"}); 
						$(this).css({"border-color": "red"});
					} 
					$(".izbran0").each(function(){
						$(this).removeClass("izbran0");
					});
				}
				if ($(".izbran0").length==1&&$(this).hasClass("izbran0")) {
					$(this).removeClass("izbran0");
					$(this).css({"border-color": "white"}); 
				}
			}
		}
	});
	
	$(".premik1").click(function(){
		if ($(this).hasClass("premaknjen")==false){ 
			if($(".izbran1").length==0) { 
				prviizbran1=$(this); 
				razred1=prviizbran1.parent().parent().attr("class"); 
				$(this).css({"border-color": "yellow"}); 
				$(this).addClass("izbran1"); 
			} 
			else if($(this).parent().parent().attr("class")==razred1){ 
				if ($(".izbran1").length==1&&($(this).hasClass("levi1")==prviizbran1.hasClass("desni1"))){ 
					$(this).addClass("izbran1"); 
					$(this).css({"border-color": "yellow"}); 
					prestavi1(); 
				}
				if ($(".izbran1").length==1&&$(this).hasClass("izbran1")) {
					$(this).removeClass("izbran1");
					$(this).css({"border-color": "white"}); 
				}
			}
		}
	}); 
	
	$(".preveriBlok").click(function(){
		var idp = $(this).attr("id"); 
		var povID = idp.lastIndexOf("|");
		var index=idp.substr(4,povID-4);
		var pov_disSt = document.getElementById('nepr_'+index).style.display;
		
		var premesaj = ".premesaj"+index;
		var dolzina1=$(premesaj).length;
		var dolzina2=$(".premaknjen"+premesaj).length;
		if(dolzina1!=dolzina2) return;
		
		if(pov_disSt=="none") {
			$('#nepr_'+index).html("&#352;tevilo poskusov: 1.");
			$('#nepr_'+index).removeClass("btn-orange");
			$('#nepr_'+index).addClass("rezultat");
			$('#nepr_'+index).css('display','inline-block');
		}
		else {
			var tekst = $('#nepr_'+index).html();
			var stevilo = tekst.substr(tekst.lastIndexOf(" "));
			stevilo=parseInt(stevilo)+1;
			$('#nepr_'+index).html("&#352;tevilo poskusov: "+stevilo);
				
		}
		
		if(!(par[idp])){ 
			$(".desni1").each(function(){
				if($(this).parent().parent().hasClass(idp)){ 
					$(this).transition({y: 0 , x: 0 });
					$(this).removeClass("premaknjen");
				}
			}); 
			$(".levi1").each(function(){
				if($(this).parent().parent().hasClass(idp)){ 
					$(this).removeClass("premaknjen");
				}
			}); 
			par[idp]=null;
		}
		else{ 
			$(".levi1").each(function(){
				if($(this).parent().parent().hasClass(idp)){ 
					$(this).parent().parent().css({"border": "solid 2px green"});
				}
			});
		}
	});
});