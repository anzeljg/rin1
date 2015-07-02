var rad = Math.PI / 180.0;
var deg =  180.0 / Math.PI;
var enacaj = 0;
var operacija = 0;
var oklepaj = 0;
var vejica = 0;

function Pocisti(forma){
    operacija = 0;
    oklepaj = 0;
    vejica = 0;
    forma.ekran.value = "";
}
function Izracunaj(forma){
    if ( (operacija == 0) && (oklepaj == 0) ){
        var racun = forma.ekran.value;
        racun = racun.replace(/,/g,'.');
        racun = racun.replace(/\%/g,'*0.01');
        var rezultat = eval(racun);
        rezultat= rezultat.toString();
        rezultat = rezultat.replace(/\./g,',');
        forma.ekran.value = rezultat;
        enacaj = 0;
        vejica = 0;
    }
}
function Izpisi_na_ekran(forma,n){
    var st = forma.ekran.value;
    var dolzina = st.length;

    if (st.charAt(dolzina-1) == ")") return;

    if (n=="pi") {
        if ( (dolzina > 0) && (operacija == 0) ) return;
        n = Math.PI;
    }

    if (n=="e") {
        if ( (dolzina > 0) && (operacija == 0) ) return;
        n = Math.E;
    }

    if (enacaj==0) forma.ekran.value = "";

    forma.ekran.value = forma.ekran.value + n;
    enacaj = 1;
    operacija = 0;
}
function Postavi_oklepaj(forma,n){
    var st = forma.ekran.value;
    var dolzina = st.length;

    if ( (n == "(") ){
        if (st.charAt(dolzina-1) == ")")
            return;
        else if (st.charAt(dolzina-1) == "(")
            oklepaj++;
        else {
            if ( (dolzina > 0) && (operacija == 0) )
                return;
            else
                oklepaj++;
        }
    }
    else if ( (n == ")") && (oklepaj > 0) ){
        if (st.charAt(dolzina-1) == "(")
            return;
        else
            oklepaj--;
    } else
        return;

    forma.ekran.value = forma.ekran.value + n;
    enacaj = 1;
    vejica = 0;
}
function Brisi_nazaj(forma) {
    var st = forma.ekran.value;
    var dolzina = st.length;
    if (dolzina > 0) {
        if (st.charAt(dolzina-1) == ",")
            vejica = 0;
        if (st.charAt(dolzina-1) == "+")
            operacija = 0;
        if (st.charAt(dolzina-1) == "-")
            operacija = 0;
        if (st.charAt(dolzina-1) == "*")
            operacija = 0;
        if (st.charAt(dolzina-1) == "/")
            operacija = 0;
        if (st.charAt(dolzina-1) == ")")
            oklepaj++;
        if (st.charAt(dolzina-1) == "(")
            oklepaj--;
        forma.ekran.value=st.substring(0,dolzina-1);
        enacaj = 1;
    }
}
function Postavi_vejico(forma){
    if ( (operacija == 0) && (vejica == 0) ){
        operacija = 1;
        enacaj = 1;
        vejica = 1;
        forma.ekran.value =forma.ekran.value + ",";
    }
}
function Postavi_operacijo(forma,n){
    var st = forma.ekran.value;
    var dolzina = st.length;
    if (st.charAt(dolzina-1) == "(")
        return;

    if (operacija == 0){
        operacija = 1;
        enacaj = 1;
        vejica = 0;
        forma.ekran.value = forma.ekran.value + n;
    }
}
function Spremeni_predznak(forma){
    var st = forma.ekran.value;
    var dolzina = st.length;
    if (st.charAt(0) == "-")
        st = st.substring(1,dolzina);
    else
        st = "-" + st;
    forma.ekran.value = st;
    enacaj = 1;
}

function Izracunaj_funkcijo(forma,f){
    if ( (operacija == 0) && (oklepaj == 0) ) {
        var rezultat = 0.0;
        var racun = forma.ekran.value;
        if (racun.length == 0)
            x = 0;
        else {
            racun = racun.replace(/,/g,'.');
            racun = racun.replace(/\%/g,'*0.01');
            rezultat = eval(racun);
            x = rezultat;
        }
        switch(f) {
            case "sqrt":
                rezultat = Math.sqrt(x);
                break;
            case "pow2":
                rezultat = Math.pow(x,2);
                break;
            case "exp":
                rezultat = Math.exp(x);
                break;
            case "ln":
                rezultat = Math.log(x);
                break;
            case "sin":
                rezultat = Math.sin(x*rad);
                break;
            case "cos":
                rezultat = Math.cos(x*rad);
                break;
            case "tan":
                rezultat = Math.tan(x*rad);
                break;
            case "asin":
                rezultat = 1/rad*Math.asin(x);
                break;
            case "acos":
                rezultat = 1/rad*Math.acos(x);
                break;
            case "atan":
                rezultat = 1/rad*Math.atan(x);
                break;
            case "inv":
                rezultat = 1/x;
                break;
            case "abs":
                rezultat = Math.abs(x);
                break;
        }
        rezultat= rezultat.toString();
        rezultat = rezultat.replace(/\./g,',');
        forma.ekran.value = rezultat;
        vejica = 0;
    }
}
function Pokvari_tipke(forma, pokvarjene){
    for (var i=0; i < forma.length; i++){
        if (forma[i].getAttribute('type') == 'button'){
            forma[i].disabled = false;
        }
    }
    for(var x in pokvarjene){
        cifra = pokvarjene[x];
        for (i=0; i < forma.length; i++){
            if (forma[i].getAttribute('type') == 'button'&& (forma[i].value == cifra)){
                forma[i].disabled = true;
            }
        }
    }
}
function Pocisti_pokvarjene_ekran(forma, pokvarjene){
    vsebina=forma.ekran.value;
    for(var x in pokvarjene){
        cifra = pokvarjene[x];
        var reg = new RegExp(cifra,"g");
        vsebina=vsebina.replace(reg,'');
    }
    forma.ekran.value =vsebina;
}