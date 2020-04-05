var sys = 1 
// 1 - russian speed in kmph, altitude in km 
// 2 - western speed in kt, altitude in ft

function ac_selector(){
    if (document.getElementById('Ruski').checked)
    {
        document.getElementById("cas").placeholder = "KMPH";
        document.getElementById("altitude").placeholder = "KM";
        document.getElementById("isa_delta").placeholder = "C";
        sys =1;
        console.log("Ruski is selected");
    }
    if (document.getElementById('West').checked)
    {
        document.getElementById("cas").placeholder = "kt";
        document.getElementById("altitude").placeholder = "ft";
        document.getElementById("isa_delta").placeholder = "C";
        sys =2;
        console.log("West is selected");
    }
}

function tas_calculator(){
    var alt = document.getElementById("altitude").value;
    var t_delta = document.getElementById("isa_delta").value;
    var cas = document.getElementById("cas").value;
   
    if (sys ==1)   
    {   
        temp_alt = fn_temp_alt(alt,t_delta);        console.log(temp_alt);
        pres_alt = fn_pres_alt(alt);                console.log(pres_alt);
        den_alt = fn_den_alt(pres_alt,temp_alt);    //console.log(den_alt);
        sigma_alt = den_alt/1.2250;                   //console.log(sigma_alt)
        rho_alt = pres_alt / 1013.25;
        theta_alt = temp_alt/288.15;
        sos_alt = fn_sos_temp(temp_alt);
        var s = cas/Math.sqrt(sigma_alt);

        document.getElementById("alt_other_unit").innerHTML = "&emsp;" + Math.round(alt*3280.84) +" (in ft)";
        document.getElementById("cas_other_unit").innerHTML = "&emsp;" + Math.round(cas* 0.539957*10)/10 +" (in kt)";
        document.getElementById("tas_other_unit").innerHTML = "&emsp;" + Math.round(s* 0.539957*10)/10 +" (in kt)";
        document.getElementById("status_1").innerHTML = "T:" + Math.sign(temp_alt-273.15) * Math.round(Math.abs(temp_alt-273.15))+"&deg;C,"+"&emsp;P:"+Math.round(pres_alt)+"Pa,"+"&emsp;Den:"+Math.round(den_alt*1000)/1000+"kg/m&sup3;,"+ "&emsp;a:"+Math.round(sos_alt);
        document.getElementById("status_2").innerHTML = "&#963:" + Math.round(sigma_alt*1000)/1000 + ",&emsp; &rho;: "+ Math.round(rho_alt*1000)/1000 + ",&emsp; &theta;: "+ Math.round(theta_alt*1000)/1000
    }
    else 
    { 
        temp_alt = fn_temp_alt(fn_ft_km(alt),t_delta);          //console.log(temp_alt);
        pres_alt = fn_pres_alt(fn_ft_km(alt));                  //console.log(pres_alt);
        den_alt = fn_den_alt(pres_alt,temp_alt);                //console.log(den_alt);
        sigma_alt = den_alt/1.2250;                               //console.log(sigma_alt)
        rho_alt = pres_alt / 101325;
        theta_alt = temp_alt/288.15;
        sos_alt = fn_sos_temp(temp_alt);
        var s = cas/Math.sqrt(sigma_alt);

        document.getElementById("alt_other_unit").innerHTML = "&emsp;" + Math.round(alt*0.000305*1000)/1000 +" (in km)";
        document.getElementById("cas_other_unit").innerHTML = "&emsp;" + Math.round(cas*1.852*10)/10 +" (in kmph)";
        document.getElementById("tas_other_unit").innerHTML = "&emsp;" + Math.round(s*1.852) +" (in kmph)";
        document.getElementById("status_1").innerHTML = "T:" + Math.sign(temp_alt-273.15) * Math.round(Math.abs(temp_alt-273.15))+"&deg;C,"+"&emsp;P:"+Math.round(pres_alt)+"Pa,"+"&emsp;Den:"+Math.round(den_alt*1000)/1000+"kg/m&sup3;,"+ "&emsp;a:"+Math.round(sos_alt);
        document.getElementById("status_2").innerHTML = "&#963:" + Math.round(sigma_alt*1000)/1000 + ",&emsp; &rho;: "+ Math.round(rho_alt*1000)/1000 + ",&emsp; &theta;: "+ Math.round(theta_alt*1000)/1000
    }

    if(!isNaN(s)) { document.getElementById("tas").value = s.toFixed(2);   }

}

function field_checker(){
    var alt = document.getElementById("altitude").value;
    var t_delta = document.getElementById("isa_delta").value;

    if(isNaN(alt)) { document.getElementById("status_1").innerHTML = "Isn't altitude a number ?"; }
    else { document.getElementById("status_1").innerHTML = "";} 
    
    if(isNaN(t_delta)) { document.getElementById("status_1").innerHTML = "Isn't Delta ISA a number ?"; }
    else { document.getElementById("status_1").innerHTML = "";}
}

function fn_temp_alt(ht,temp_del) 
    { 
        if(ht <= 11)
             { return 273.15+ +15 + -ht*6.5 + +temp_del; }
        else if( ht > 11 & ht < 20)
            { return 216.65 +temp_del; }
        else  
            { return 216.65 + (ht -20); }
    }

function fn_pres_alt(ht)
{
    if (ht <= 11)
        {
            var c1 = 9.80665 * 28.9644 / (8.31432 *6.5);
            //console.log(c1);
            var v1 = 6.5 * ht /288.15;
            //console.log(v1);
            var p = 1013.25 * Math.pow((1- v1),c1);
            //console.log(p);
            return p;
        }
    else if ( ht>11 & ht < 20)
        {
            return 226.3 * Math.exp(-157.696* 10**-6 * (ht*1000-11000))
        }
}

function fn_den_alt(pres, temp) 
    { 
        //return pres * 28.9644 / (8.31432 * temp * 1000); 
        return 1.225* pres/1013.25 * 288.15/temp;
    }


function fn_ft_km(ft) { return ft*0.0003048 }
function fn_kt_kmph(kt) { return kt*1.852 }
function fn_km_ft(km) { return km*3280.84}
function fn_kmph_kt(kmph) {return kmph*0.539957}
function fn_sos_temp(temp_alt){ return Math.sqrt(1.4*8314.3/28.97*temp_alt)}