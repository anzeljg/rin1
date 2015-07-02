/********************************************************
*	Knjiznica z dodanimi JS funkcijami za delovanje v Exe - dodatek k common                                             	*
* 
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

/*********************************************
*funkcija pokaze ali skrije div element,
*podan kot parameter.
*********************************************/

function showHideDiv(id, button) {
       var e = document.getElementById(id);
       if(e.style.display == 'block') {
          e.style.display = 'none';
          button.value = 'Poka\u017ei';
       } else {
          e.style.display = 'block';
          button.value = 'Skrij';
       }
  }

/**********************************************************
*
* Metoda izracuna visino iframa, da le-ta v celoti prikaze vsebino
*
********************************************************/
function eumCalcHeight(name)
{
  //find the height of the internal page
  var the_height=
    document.getElementById(name).contentWindow.
      document.body.scrollHeight+60;

  //change the height of the iframe
  document.getElementById(name).height=
      the_height;
}

/**********************************************************
*
* Metoda ponovno nalozi iframe (refresh)
*
********************************************************/
function eumReloadIframe (id) {
var f = document.getElementById(id);
f.src = f.src;
}


/**********************************************************
*
* Metoda preveri ce nek objekt ze nalozen. Nujno potrebno
* pri nalaganju appletov
*
********************************************************/
function EumIsLoaded(obj) {
  if(!obj) return false;
  try {
    if (!obj.isActive)
      return false;
    }
  catch(e){return false;}
  
  return true;
}

/**********************************************************
*
* Metoda preveri ce je nek objekt ze aktiven in v tem primeru
* poklice neko funckijo. V nasprotnem primeru pocaka 0.5 sekunde
* in poskusi ponovno.
*
********************************************************/
function EumWaituntilok(aplet, func) {
 if (EumIsLoaded(aplet)) {
       func;
       }
 else {
     settimeout(EumWaituntilok(aplet, func),500)
     }
}

/**********************************************************
 *
 * Metoda prestavi trenutno stanje pogleda v brskalniku za
 * doloèeno stevilo pikslov navzdol
 *
 *
 *********************************************************/
function EumScrollDown(){    
   var posY = window.pageYOffset;
   window.scroll(0,posY+1200);
}

/**********************************************************
 *
 * Metoda prestavi trenutno stanje pogleda v brskalniku za
 * doloèeno stevilo pikslov navzdol
 *
 *
 *********************************************************/
function EumPrikazBesedila(obj,besedilo){
       
    objekt = document.getElementById(obj);
    if (besedilo.length == 0){
       objekt.style.display = 'none';
       
    } else {
       objekt.style.display = 'block';
       objekt.innerHTML = besedilo;
    }
}

/**********************************************************
 *
 * Metoda spremeni sliko nekemu objektu na sliko img_src
 *
 *
 *********************************************************/
function EumRoll_over(img_name, img_src)
   {
       objekt = document.getElementById(img_name);
       objekt.src = img_src;
   }

