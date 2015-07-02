/********************************************************
*	E-um common mathematical functions library                                             	*
*  E-um knjiznica pogostih matematicnih funkcij                                              *
*	                                                                                                                              *
*	authors/avtorji:                                                                                                  	*
*  Igor Pesek, igor.pesek (at) gmail.com                                                             *
* 	E-um editors team,  uredniki projekta E-um																										*
* 																																																																*
* This library is licensed under Creative Commons																					* 
* Attribution-Noncommercial-Share Alike 2.5 Slovenia License										*	
* 																																																																*
* Knjiznica je zascitena pod licenco Creative Commons																	*
* priznanje avtorstva-Nekomercialno-Deljenje pod enakimi pogoji 2.5 				*
* Podrobnosti licence najdete na naslovu:																												*
* http://creativecommons.org/licenses/by-nc-sa/2.5/si/																	*
* 																																																																* 
* Last updated/zadnjic popravljeno: februar 2008																						*
* *******************************************************/

/*Function EumGCD returns the greatest common divisor of a and b
 * The order of the arguments is not important.
 * 
 * Implementing Euclidian algorithm for GCD 
 * 
 * Author : Igor Pesek
 * Februar 2008
 */
function EumGCD(a , b){
 var t;
 while (b != 0)
 { 
    t = b;
    b = a % b;
    a = t;
 }
 return a;
}

/* Function EumComma2Dot swithches comma to the dot in the number
 * Needed in Slovenia
 * 
 * Author : Igor Pesek
 * March 2008
*/
function EumComma2Dot(number){
	return (number.toString()).replace(/,/, '.');
}

/* Function EumDot2Comma swithches dot to the comma in the number 
 * Needed in Slovenia 
 * 
 * Author : Igor Pesek, BK
 * March 2008, July 2012
*/
function EumDot2Comma(number){

// var Num2 = number.toString().replace(/\./, ',');	
//    var Num2Float = parseFloat(Num2);
//
//    //alert('Num2 = '+Num2+'; Num2Float = '+Num2Float);
//
//    if (isNaN(Num2Float))
//	return(number);
//    else
//    	return (Num2);

    try {
        var Num3 = number.toString().split(',').join('.'); // vejice v piko
        var Num3Float = eval(Num3);
    } catch (err) {
        return(number);
    }
    Num3 = Num3.split('.').join(','); // pike nazaj v vejico
    
    var Num2 = number.toString().split('.').join(',');	
    var Num2Float = parseFloat(Num2);

    //alert('number = '+number+'; Num2 = '+Num2+'; Num2Float = '+Num2Float+'; Num3 = '+Num3+'; Num3Float='+Num3Float);

    if (!isNaN(Num3Float) && Num3Float != undefined)
        return(Num3);
    if (isNaN(Num2Float))
        return(number);
    return (Num2);
}

/*function returns random number in the given range (min, max) with 'decimal' decimal 
 * places
 * decimals:
 * 0 -- integer
 * 1 -- with one decimal place
 * ..
 * 
 * Author : Igor Pesek
 * March 2008
*/
function EumRandom(min, max, decimal){
	max = max*1;
	min = min*1;
	// random integer 
	if (decimal == 0 || decimal === undefined){
		number =  Math.floor((max-min+1)*Math.random() + min);		
	}
	// random real number
	else {    
	    do  { 		    
		     number = Math.random()*(max - min+1)  + min ;	       
	    } while (number < min || number >max)
		number = Math.floor(number * Math.pow(10,decimal)) / Math.pow(10,decimal);
	}
	
	return number;
}

/* Function rounds the number to the specified number of decimals
 * If decimal = 0, then it rounds to nearest integer value
 * 
 * Author : Igor Pesek
 * March 2008
 */
function EumRound(number,decimal){
	if (EumIsNaN(number) == false && number.toString() != ' '){
		if (decimal == 0){
			return Math.round(number);
		} 
		else {
			return Math.round(number * Math.pow(10,decimal)) / Math.pow(10,decimal);
		}
	}
	else {
		return number;
	}
}

/* Function returns string which has sign (+-) before number.
 * 
 * Author : Igor Pesek
 * March 2008
 */
function EumShowSign(number, sign)
{
	if (sign == 1){
		if (number > 0)	{
			return "+" + number.toString();
		}
		else {
			return number.toString();	
		}
	}
	
	return number.toString();
}

/* Function compares 
 * 
 * Author : Igor Pesek
 * March 2008
 */
function EumCompareArrays(predvideneResitve, vnosResitve, procent)
{
	// polje, ki belezi pravilnost resitev
	pravilnostVnosov = new Array(vnosResitve.length);
	for (var i =0; i < pravilnostVnosov.length; i++){
		pravilnostVnosov[i] = 0;
	}
	
	resitvePreverjene = new Array(predvideneResitve.length);
	for (var i =0; i < resitvePreverjene.length; i++){
		resitvePreverjene[i] = 0;
	}
	
	// po vseh elementih vnesenih resitev
	for (var i=0; i< vnosResitve.length; i++){
		// pogledamo, ce je kaksna enaka v predvidenih resitvah
		for (var j =0; j < predvideneResitve.length; j++){
			if (resitvePreverjene[j] == 0 && EumCompareResult(vnosResitve[i],predvideneResitve[j],procent)){
				pravilnostVnosov[i] = 1;
				resitvePreverjene[j] = 1;
				break;
			}
		}
	}
	
	return pravilnostVnosov;
}

function prepareCorrectnessArray( expectedResults, userResults, actualResults){
   correctnes = new Array(actualResults.length);
   // najprej vse pravilne poiscemo in jih izlocimo
   for (elt = 0; elt < actualResults.length; elt++){
      if (actualResults[elt] == 1){
         correctnes[elt] = userResults[elt];
         // poiscem in ga izlocim
         for (i = 0; i < expectedResults.length; i++){
            if (expectedResults[i] == correctnes[elt]){
               expectedResults[i] = 'igor_p';
               break;
            }
         }
      }
   }
   
   // sedaj pa po vrsti vstavljamo ostale
   for (elt = 0; elt < actualResults.length; elt++){
      if (actualResults[elt] == 0){
         for (i = 0; i < expectedResults.length; i++){
            if (expectedResults[i] != 'igor_p'){
               correctnes[elt] = expectedResults[i];
               expectedResults[i] = 'igor_p';
               break;
            }
         }
      }     
   }
   
   return correctnes;
}

/* Function returns the result of the comparison between input and expected.
 * It can compare numbers and also strings
 * 
 * Author : Igor Pesek
 * March 2008
 */
function EumCompareResult(input,expected, procent){
	if (procent == null){
		if (EumIsNaN(expected) && EumIsNaN(input)){
			if (input.toString().toUpperCase() == expected.toString().toUpperCase()){
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if (input === expected ){
				return true;
			}
			else {
				return false;
			}
		}
	}
	else {
		var lowerBound = expected * (1-(procent/100));
		var upperBound = expected * (1+(procent/100));
		if (EumIsNaN(expected) && EumIsNaN(input)){
			if (input.toString().toUpperCase() == expected.toString().toUpperCase()){
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if ((input >= lowerBound) && (input <= upperBound)){
				return true;
			}
			else {
				return false;
			}
		}		
	}
}


function EumPrint(spremenljivka, vrednost, besedilo , drugace){
	if (spremenljivka === vrednost){
		return besedilo;
	}
	else {
		return drugace;
	}
}

// funkcija je samo zacasno, zaradi testiranja
function EumIzpis(spremenljivka, vrednost, besedilo , drugace){
	if (spremenljivka === vrednost){
		return besedilo;
	}
	else {
		return drugace;
	}
}


function EumCoef(spremenljivka, izpis, predznak){
	if (predznak == 1){
			return EumPrint(spremenljivka,-1,"$-" + izpis.toString() + "$",EumPrint(spremenljivka,1,"$+" + izpis.toString() + "$",EumPrint(spremenljivka,0,'','$' + EumShowSign(spremenljivka,1) + izpis.toString() + '$')));
	}
	else {
		return EumPrint(spremenljivka,-1,"$-" + izpis.toString() + "$",EumPrint(spremenljivka,1,"$" + izpis.toString() + "$",EumPrint(spremenljivka,0,'','$' + spremenljivka.toString() + izpis.toString() + '$')));
	}
}

/* Function computes and returns n!
 * 
 * Author: Igor Pesek
 * March 2008
 */
function EumFactorial (n){
	if (n == 0) {
		return 1;
	}
	else 
	return n * EumFactorial(n-1);
}


/** method returns r-th permutation of the N elements
 *  result is array
 * book: combinatorial algorithms, p. 56
 * 
 * Author : Igor Pesek
 * April 2008
 */
function EumPermutation( N, r){
var d;
var permute = new Array(N+1);
permute[N] = 1;
  for (var j = 1; j != N; j++) {
     d = ((r % EumFactorial(j+1)) / EumFactorial(j));
     r = r - d * EumFactorial(j);
     permute[N-j] = d + 1;
     for (var i = N - j + 1; i <= N; i++){
       if (permute[i] > d){
           permute[i] = permute[i] + 1;
       }
     }
  }
  return permute;
}


function EumCombinations(n,r){
  var t = Math.floor(EumFactorial(n) / (EumFactorial(r)*EumFactorial(n-r)));
  return t;
}


function EumkElementov(k,n){
var permute = new Array(k+1);
var i = 1;
var x;
var test;
	while (i <= k) {
		x = EumRandom(1,n,0);
		test = true;
		for (var j = 1; j < i; j++){
			if (permute[j] == x){
				test = false;		
			}
		}
		if (test==true) {
			permute[i]=x;
			i++;
		}
	}
	return permute;
}

function EumIsNaN(number){
	if ((number.toString()).indexOf(',') != -1){
		if (isNaN(EumComma2Dot(number))){
		   return true;
		}
		else {
			return false;
		}
		
	}
	else if (isNaN(number)){
		return true;
	}
	else {
		return false;
	}
	
}
  
//naloga izpise okrajsan ulomek
function EumUlomek (n1,n2){
  i = EumGCD(n1,n2);
  a = n1/i;
  b = n2/i;
  if (b != 1)
      return '$\\frac\{' + a + '\}\{' + b + '\}$';
  else
      return a;     
}

//Funkcija vrne okrajsan imenovalec v ulomku n1/n2
function EumImenovalec (n1,n2){
  return n2/EumGCD(n1,n2);
}

//Funkcija vrne stevec v ulomku n1/n2
function EumStevec (n1,n2){
  return n1/EumGCD(n1,n2);
}

//Funkcija preveri ce je stevilo prastevilo
//vrne 0, ce je prastevilo in 1, ce ni prastevilo
function EumJePrastevilo(a){
    
    for (i=2; i<=(a/2); i++) {
        if(a%i==0) {
            return 1;
        }
    }
    return 0;
} 


/** Method prepares array for output as polynomial
 * 
 * Author : Katja Prnaver
 * 
 * April 2008
 */
function EumPolyIzpis(znak,n) {
    out = "$";
    
    //prestejemo koliko je stopnja
    for (i=n.length; i >=0 ; i--) {
        if (n[i] != 0) {
            tmp = i;
            break;
        }
    }
        
    for (i=0; i< tmp; i++) {
        if ((i == tmp-1) && (n[i] != 0)) {
            out += (n[i] > 0)?"+":"";
             out += n[i];    
        } else {
             if (n[i] != 0) {
                out += ((n[i] > 0) && (i != 0))?"+":"";
                 out += ((n[i] != 1) && (n[i] != -1))?n[i]:((n[i] < 0)?"-":"");
                 out += znak.toString();
                 if (i < tmp-2)  {
                     out += "^";
                     out += tmp-i-1;
                 }
            } 
        }
    }
    out += "$";
    
    return out;
}          

/** Aux function for trimming whitespace 
 * 
 *  Author Nick Nettleton
 *  Taken from www
 */
function stringTrim (niz){
	return niz.replace(/^\s+|\s+$/g, '') ;
	
}

/** Method parses input as fraction (a b/c) and returns its value
 * 
 * Author: Igor Pesek
 * April 2008
 */
function EumParseFractionValue(input){
	niz = stringTrim(input);
	var imenovalec, stevec, celi;
	if (niz.indexOf('/') == -1){ 
		// imamo samo stevilo
		return EumComma2Dot(niz);
	}
	else
	{
		var razbitje = new Array();
		razbitje = niz.split('/');
		imenovalec = parseInt(stringTrim(razbitje[1]));
		var niz1 = stringTrim(razbitje[0]);
		if (niz1.indexOf(' ') != -1){
			// obstaja celi del
			razbitje = niz1.split(' ');
			celi = parseInt(stringTrim(razbitje[0]));
			stevec = parseInt(stringTrim(razbitje[1]));	
			if (celi < 0) {
			    return (-1)*((Math.abs(celi)*imenovalec + stevec) / imenovalec);
			} else {
			    return (celi*imenovalec + stevec) / imenovalec;
			}
		}
		else {
			// obstaja samo stevec
			stevec = parseInt(niz1);
			return (stevec / imenovalec);	
		}	
	}

}

function EumParseFractionString(input){
	niz = stringTrim(input);
	var ulomek = new Array(3); // celi del, stevec, imenovalec
	if (niz.indexOf('/') == -1){ 
		// imamo samo stevilo
		ulomek[0] = niz; 
		ulomek[1] = '';
		ulomek[2] = '';
		return ulomek;
	}
	else
	{
		var razbitje = new Array();
		razbitje = niz.split('/');
		ulomek[2]= parseInt(stringTrim(razbitje[1]));
		var niz1 = stringTrim(razbitje[0]);
		if (niz1.indexOf(' ') != -1){
			// obstaja celi del
			razbitje = niz1.split(' ');
			ulomek[0] = parseInt(stringTrim(razbitje[0]));
			ulomek[1] = parseInt(stringTrim(razbitje[1]));
			if (ulomek[1] < 0) {
				ulomek[0] = (-1)*(ulomek[0]);
				ulomek[1] = Math.abs*(ulomek[1]);
			}	
			if (ulomek[2] < 0) {
				ulomek[0] = (-1)*(ulomek[0]);
				ulomek[2] = Math.abs*(ulomek[2]);
			}	
			return ulomek;
		}
		else {
			// obstaja samo stevec
			ulomek[0] = '';
			ulomek[1]  = parseInt(niz1);
			if (ulomek[2] < 0) {
				ulomek[1] = (-1)*(ulomek[1]);
				ulomek[2] = Math.abs*(ulomek[2]);
			}	
			return ulomek;			
		}	
	}
}

function EumStrictCompareResult(polje1, polje2){
	
	for (var elt = 0; elt < polje1.length; elt++){
		if (polje1[elt].toString() != polje2[elt].toString()){
			return false;
		}
		
	}
	return true;  
}

function EumIzpisUlomka(polje){
	if (polje[0] == null || polje[0] == '' ) {
		if (polje[2] < 0) {
			polje[1] = polje[1]*(-1);
			polje[2] = Math.abs(polje[2]);
		}
		return polje[1].toString() + "/"+ polje[2].toString();
	} 
	else if (polje[1] == null || polje[1] =='') {
		return polje[0].toString();
	}
	else {
		if (polje[2] < 0) {
			polje[0] = polje[0]*(-1);
			polje[2] = Math.abs(polje[2]);
		}
		if (polje[1] < 0) {
			polje[0] = polje[0]*(-1);
			polje[1] = Math.abs(polje[1]);
		}
		return polje[0].toString() + " " + polje[1].toString() + "/"+ polje[2].toString();
	}
	
}




// Uporabljeno za prikaz tooltipa
// prikaz tooltipa

var disappeardelay=100  //tooltip disappear delay (in miliseconds)
var verticaloffset=0 //vertical offset of tooltip from anchor link, if any
var enablearrowhead=0 //0 or 1, to disable or enable the arrow image
var arrowheadimg=["", ""] //path to down and up arrow images
var arrowheadheight=0 //height of arrow image (amount to reveal)

/////No further editting needed

var ie=document.all
var ns6=document.getElementById&&!document.all
verticaloffset=(enablearrowhead)? verticaloffset+arrowheadheight : verticaloffset

function getposOffset(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}

function showhide(obj, e){
dropmenuobj.style.left=dropmenuobj.style.top="-500px"
if (e.type=="mouseover")
obj.visibility="visible"
}

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
if (whichedge=="rightedge"){
edgeoffsetx=0
var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
edgeoffsetx=dropmenuobj.contentmeasure-obj.offsetWidth
return edgeoffsetx
}
else{
edgeoffsety=0
var topedge=ie && !window.opera? iecompattest().scrollTop : window.pageYOffset
var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure) //move up?
edgeoffsety=dropmenuobj.contentmeasure+obj.offsetHeight+(verticaloffset*2)
return edgeoffsety
}
}

function displayballoontip(obj, e){ //main ballooon tooltip function
if (window.event) event.cancelBubble=true
else if (e.stopPropagation) e.stopPropagation()
if (typeof dropmenuobj!="undefined") //hide previous tooltip?
dropmenuobj.style.visibility="hidden"
clearhidemenu()
//obj.onmouseout=delayhidemenu
dropmenuobj=document.getElementById(obj.getAttribute("rel"))
showhide(dropmenuobj.style, e)
dropmenuobj.x=getposOffset(obj, "left")
dropmenuobj.y=getposOffset(obj, "top")+verticaloffset
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
if (enablearrowhead)
displaytiparrow()
}

function displaytiparrow(){ //function to display optional arrow image associated with tooltip
tiparrow=document.getElementById("arrowhead")
tiparrow.src=(edgeoffsety!=0)? arrowheadimg[0] : arrowheadimg[1]
var ieshadowwidth=(dropmenuobj.filters && dropmenuobj.filters[0])? dropmenuobj.filters[0].Strength-1 : 0
//modify "left" value depending on whether there's no room on right edge of browser to display it, respectively
tiparrow.style.left=(edgeoffsetx!=0)? parseInt(dropmenuobj.style.left)+dropmenuobj.offsetWidth-tiparrow.offsetWidth-10+"px" : parseInt(dropmenuobj.style.left)+5+"px"
//modify "top" value depending on whether there's no room on right edge of browser to display it, respectively
tiparrow.style.top=(edgeoffsety!=0)? parseInt(dropmenuobj.style.top)+dropmenuobj.offsetHeight-tiparrow.offsetHeight-ieshadowwidth+arrowheadheight+"px" : parseInt(dropmenuobj.style.top)-arrowheadheight+"px"
tiparrow.style.visibility="visible"
}

function delayhidemenu(){
delayhide=setTimeout("dropmenuobj.style.visibility='hidden'; dropmenuobj.style.left=0; if (enablearrowhead) tiparrow.style.visibility='hidden'",disappeardelay)
}

function clearhidemenu(){
if (typeof delayhide!="undefined")
clearTimeout(delayhide)
}

function reltoelement(linkobj){ //tests if a link has "rel" defined and it's the ID of an element on page
var relvalue=linkobj.getAttribute("rel")
return (relvalue!=null && relvalue!="" && document.getElementById(relvalue)!=null && document.getElementById(relvalue).className=="balloonstyle")? true : false
}

function initalizetooltip(){
var all_links=document.getElementsByTagName("a")
if (enablearrowhead){
tiparrow=document.createElement("img")
tiparrow.setAttribute("src", arrowheadimg[0])
tiparrow.setAttribute("id", "arrowhead")
document.body.appendChild(tiparrow)
}
for (var i=0; i<all_links.length; i++){
if (reltoelement(all_links[i])){ //if link has "rel" defined and it's the ID of an element on page
all_links[i].onmouseover=function(e){
var evtobj=window.event? window.event : e
displayballoontip(this, evtobj)
}
all_links[i].onmouseout=delayhidemenu
}
}
}

if (window.addEventListener)
window.addEventListener("load", initalizetooltip, false)
else if (window.attachEvent)
window.attachEvent("onload", initalizetooltip)
else if (document.getElementById)
window.onload=initalizetooltip


function EumCifra(iNumber, iIndex) {

    var S = ''+iNumber;
    if (S.length >= iIndex)
        return(S.charAt(S.length-iIndex));
    return('');
}

function EumShuffle(array) {
    var tmp, current, top = array.length;

    var array2 = array.slice(0);
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array2[current];
        array2[current] = array2[top];
        array2[top] = tmp;
    }

    return array2;
}

function EumCifre(iNumber) {
    
    var S = ''+iNumber;
    return(S.split(''));
}

function EumStevilo(iNumber) {

    var S = ''+iNumber;
    
    var S2 = '';
    for (i=S.length-1;i>=0;i--) {
        if (S2.length > 0 && (S.length-i-1)%3==0)
            S2 = '\\,' + S2;
        S2 = S.charAt(i) + S2;
    }
    return(S2);
}
