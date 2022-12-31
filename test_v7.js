
var f1_sys = 1; 
var f2_sys = 1;
var f3_sys = 1;
var f4_sys = 1;
var f7_sys = 1;

    // 1 - russian speed in kmph, altitude in km 
    // 2 - western speed in kt, altitude in ft

function f1_ac_selector(){

    if (document.getElementById('f1_Ruski').checked)
    {
        document.getElementById("f1_cas").placeholder = "KMPH";
        document.getElementById("f1_altitude").placeholder = "KM";
        document.getElementById("f1_isa_delta").placeholder = "C";
        f1_sys =1;
        console.log("F1: Ruski is selected");
    }
    if (document.getElementById('f1_West').checked)
    {
        document.getElementById("f1_cas").placeholder = "kt";
        document.getElementById("f1_altitude").placeholder = "ft";
        document.getElementById("f1_isa_delta").placeholder = "C";
        f1_sys =2;
        console.log("F1: West is selected");
    }
}

function f1_calc1(){
    var f1_alt = document.getElementById("f1_altitude").value;
    var f1_t_delta = document.getElementById("f1_isa_delta").value;
    var f1_cas = document.getElementById("f1_cas").value;
    
    if(isNaN(f1_alt) ||isNaN(f1_cas) || isNaN(f1_t_delta) ){
        alert(" Not a number ");
    }
    if( ((f1_alt >= 25) && (f1_sys ==1))  ){
        alert("Check Altitude!")
        f1_alt = 25
    }
    if(  ((f1_alt >= 82021) && (f1_sys ==2))   ){
        alert("Check Altitude!")
        f1_alt = 82020
    }
    if(f1_cas < 0){
        alert("Speed can't be Negative")
    }

    // 1 - russian speed in kmph, altitude in km 
    // 2 - western speed in kt, altitude in ft
    
    if (f1_sys ==1)   
    {   
        console.log("CAS:"+f1_cas+"kmph");

        f1_temp_alt = fn_temp_from_alt(f1_alt,f1_t_delta);   /* in K */               console.log("Temp:"+f1_temp_alt)+" K";
        f1_pres_alt = fn_pres_from_alt(f1_alt);             /* in N/m2 */                console.log("Press:"+f1_pres_alt+" N/m2");
        f1_den_alt = fn_den_alt(f1_pres_alt,f1_temp_alt);  /*  in kg/m3*/                console.log("Density:"+f1_den_alt+" kg/m3");

        f1_theta_alt = f1_temp_alt/288.15;                                  console.log("Theta:"+f1_theta_alt);
        f1_sigma_alt = f1_den_alt/1.2250;                                   console.log("Sigma:"+f1_sigma_alt);
        f1_delta_alt = f1_pres_alt / 101325;                                console.log("Delta:"+f1_delta_alt);

        f1_eas_alt = fn_ve_from_vc(f1_cas,f1_pres_alt).toFixed(2);                  console.log("EAS:"+f1_eas_alt+" kmph");
        f1_tas_alt = (f1_eas_alt/Math.sqrt(f1_sigma_alt)).toFixed(2);               console.log("TAS:"+f1_tas_alt+" kmph");
        f1_sos_alt = fn_sos_temp(f1_temp_alt);                                      console.log("SOS:"+f1_sos_alt);

        f1_mach_alt = (f1_tas_alt/fn_metpersec_to_kmph(f1_sos_alt)).toFixed(4);     console.log("Mach:"+f1_mach_alt);
        f1_dp_alt = fn_dp_from_tas(f1_den_alt,f1_tas_alt).toFixed(1);               console.log("DP:"+f1_dp_alt+"kg/m3");
        f1_ti = fn_ti_from_m_temp(f1_temp_alt,f1_mach_alt).toFixed(1);              console.log("Ti:"+f1_ti+"C");

        document.getElementById("f1_alt_other_unit").innerHTML = "&emsp;" + "("+fn_km_to_ft(f1_alt).toFixed(0) +"ft)";
        document.getElementById("f1_cas_other_unit").innerHTML = "&emsp;" + "("+fn_kmph_to_kt(f1_cas).toFixed(1) +"kt)";
        
        document.getElementById("f1_eas_other_unit").innerHTML = "&emsp;" + "("+fn_kmph_to_kt(f1_eas_alt).toFixed(1) +"kt)";
        document.getElementById("f1_tas_other_unit").innerHTML = "&emsp;" + "("+fn_kmph_to_kt(f1_tas_alt).toFixed(1) +"kt)";
        
        document.getElementById("f1_dp_other_unit").innerHTML = "&emsp;" + "("+(f1_dp_alt*0.02089).toFixed(1) +"psf)";

        document.getElementById("f1_status_1").innerHTML = "T:" + Math.sign(f1_temp_alt-273.15) * (Math.abs(f1_temp_alt-273.15)).toFixed(1)+" &deg;C,"+"&emsp;P:"+(f1_pres_alt).toFixed(0)+"N/m&sup2,"+"&emsp;Den:"+(f1_den_alt).toFixed(3)+"kg/m&sup3;";
        document.getElementById("f1_status_2").innerHTML = "&#963:" + (f1_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f1_delta_alt).toFixed(3)+ ",&emsp; &theta;: "+ (f1_theta_alt).toFixed(3)+ ",&emsp;a:"+(f1_sos_alt).toFixed(0)+"m/s"; 
    }
    else 
    { 
        console.log("CAS:"+f1_cas+"kt");

        f1_temp_alt = fn_temp_from_alt(fn_ft_to_km(f1_alt),f1_t_delta);             console.log("Temp:"+f1_temp_alt+"K");
        f1_pres_alt = fn_pres_from_alt(fn_ft_to_km(f1_alt));                        console.log("Press:"+f1_pres_alt+"N/m2");
        f1_den_alt = fn_den_alt(f1_pres_alt,f1_temp_alt);                           console.log("Den:"+f1_den_alt+"kg/m3");

        f1_theta_alt = f1_temp_alt/288.15;                                          console.log("Theta:"+f1_theta_alt);
        f1_sigma_alt = f1_den_alt/1.2250;                                           console.log("Sigma:"+f1_sigma_alt);
        f1_delta_alt = f1_pres_alt / 101325;                                        console.log("Rho:"+f1_delta_alt);
        
        f1_eas_alt = fn_ve_from_vc(fn_kt_to_kmph(f1_cas),f1_pres_alt);              console.log("EAS:"+f1_eas_alt+" kmph");
        f1_tas_alt = f1_eas_alt/Math.sqrt(f1_sigma_alt);                            console.log("TAS:"+f1_tas_alt+" kmph");
        f1_sos_alt = fn_sos_temp(f1_temp_alt);                                      console.log("SOS:"+f1_sos_alt);

        f1_mach_alt = (f1_tas_alt/fn_metpersec_to_kmph(f1_sos_alt)).toFixed(4);             console.log("Mach:"+f1_mach_alt);
        f1_dp_alt = (fn_dp_from_tas(f1_den_alt,f1_tas_alt)*0.02089).toFixed(1);             console.log("DP:"+f1_dp_alt+"psf");
        f1_ti = fn_ti_from_m_temp(f1_temp_alt,f1_mach_alt).toFixed(1);                      console.log("Ti:"+f1_ti+"C");

        document.getElementById("f1_alt_other_unit").innerHTML = "&emsp;" + "("+fn_ft_to_km(f1_alt).toFixed(2) +"km)";
        document.getElementById("f1_cas_other_unit").innerHTML = "&emsp;" + "("+fn_kt_to_kmph(f1_cas).toFixed(1) +"kmph)";
        
        document.getElementById("f1_eas_other_unit").innerHTML = "&emsp;" + "("+f1_eas_alt.toFixed(1) +"kmph)";
        document.getElementById("f1_tas_other_unit").innerHTML = "&emsp;" + "("+f1_tas_alt.toFixed(1) +"kmph)";
        document.getElementById("f1_dp_other_unit").innerHTML = "&emsp;" + "("+(f1_dp_alt*47.88).toFixed(1) +"N/m&sup2)";

        document.getElementById("f1_status_1").innerHTML = "T:" + Math.sign(f1_temp_alt-273.15) * (Math.abs(f1_temp_alt-273.15)).toFixed(1)+"&deg;C,"+"&emsp;P:"+(f1_pres_alt).toFixed(0)+" N/m&sup2,"+"&emsp;Den:"+(f1_den_alt).toFixed(3)+" kg/m&sup3";
        document.getElementById("f1_status_2").innerHTML = "&#963:" + (f1_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f1_delta_alt).toFixed(1)+ ",&emsp; &theta;: "+ (f1_theta_alt).toFixed(3)+ ",&emsp;a:"+(f1_sos_alt).toFixed(1)+"m/s"; 

        f1_eas_alt = fn_kmph_to_kt(f1_eas_alt).toFixed(1)
        f1_tas_alt = fn_kmph_to_kt(f1_tas_alt).toFixed(1)

    }

    if(!isNaN(f1_tas_alt)) 
    { 
        document.getElementById("f1_eas").value =   f1_eas_alt;
        document.getElementById("f1_tas").value =   f1_tas_alt;
        document.getElementById("f1_mach").value =  f1_mach_alt;
        document.getElementById("f1_dp").value =  f1_dp_alt;
        document.getElementById("f1_ti").value = f1_ti;

    }

}

function f2_ac_selector(){
    console.log("iam in ac selector");
    if (document.getElementById('f2_Ruski').checked)
    {
        
        document.getElementById("f2_altitude").placeholder = "KM";
        f2_sys =1;
        console.log("F2: Ruski is selected");
    }
    if (document.getElementById('f2_West').checked)
    {
 
        document.getElementById("f2_altitude").placeholder = "ft";
        f2_sys =2;
        console.log("F2: West is selected");
    }
}

function f2_calc2()
{
    var f2_m_alt = document.getElementById("f2_mach").value; 
    console.log("Mach: "+f2_m_alt);
    var f2_alt = document.getElementById("f2_altitude").value; 
    console.log("Alt: "+f2_alt);
    var f2_t_delta = document.getElementById("f2_isa_delta").value;
    console.log("Temp Delta: "+f2_t_delta);

    if(isNaN(f2_alt) || isNaN(f2_m_alt  ) ){
        alert(" Not a number ");
    }
    if( ((f2_alt >= 25) && (f2_sys ==1))  ){
        alert("Check Altitude!")
        f2_alt = 25
    }
    if(  ((f2_alt >= 82021) && (f2_sys ==2))   ){
        alert("Check Altitude!")
        f2_alt = 82020
    }
    if(f2_m_alt < 0){
        alert("Mach Can't be Negative")
    }

    if (f2_sys ==2)   { f2_alt = fn_ft_to_km(f2_alt); }

    console.log("Alt:"+f2_alt+"in km");
    f2_temp_alt = fn_temp_from_alt(f2_alt,f2_t_delta);          console.log("Temp: "+f2_temp_alt);
    f2_pres_alt = fn_pres_from_alt(f2_alt);                     console.log("Pres: "+f2_pres_alt);
    f2_den_alt = fn_den_alt(f2_pres_alt,f2_temp_alt);               console.log("Den: "+f2_den_alt);
    
    f2_theta_alt = f2_temp_alt/288.15;                      console.log("Theta:"+f2_theta_alt);
    f2_sigma_alt = f2_den_alt/1.2250;                       console.log("Sigma:"+f2_sigma_alt);
    f2_delta_alt = f2_pres_alt / 101325;                    console.log("Delta:"+f2_delta_alt);
    f2_sos_alt = fn_sos_temp(f2_temp_alt); 

    f2_vt = fn_vt_from_m(f2_m_alt,f2_theta_alt);            console.log("Vt:"+f2_vt+"kt");
    f2_ve = fn_ve_from_m(f2_m_alt,f2_delta_alt);            console.log("Ve:"+f2_ve+"kt");
    f2_vc = fn_vc_from_m(f2_m_alt,f2_delta_alt);            console.log("Vc:"+f2_vc+"kt");
    f2_dp = fn_dp_from_tas(f2_den_alt,fn_kt_to_kmph(f2_vt));         console.log("DP:"+f2_dp+"N/m2")
    f2_ti = fn_ti_from_m_temp(f2_temp_alt,f2_m_alt);                 console.log("Ti:"+f2_ti+"C");

    if(!isNaN(f2_vc)){
        if (f2_sys ==1)   {
            document.getElementById("f2_cas").value = fn_kt_to_kmph(f2_vc).toFixed(1);
            document.getElementById("f2_tas").value = fn_kt_to_kmph(f2_vt).toFixed(1);
            document.getElementById("f2_eas").value = fn_kt_to_kmph(f2_ve).toFixed(1);
            document.getElementById("f2_dp").value = f2_dp.toFixed(1);
            document.getElementById("f2_ti").value = f2_ti.toFixed(1);

            document.getElementById("f2_alt_other_unit").innerHTML = "&emsp;" +"("+ fn_km_to_ft(f2_alt).toFixed(0) +"ft)";
            
            document.getElementById("f2_tas_other_unit").innerHTML = "&emsp;" + "("+f2_vt.toFixed(1) +"kt)";
            document.getElementById("f2_eas_other_unit").innerHTML = "&emsp;" + "("+f2_ve.toFixed(1) +"kt)";
            document.getElementById("f2_cas_other_unit").innerHTML = "&emsp;" + "("+f2_vc.toFixed(1) +"kt)";
            
            document.getElementById("f2_dp_other_unit").innerHTML = "&emsp;" + "("+(f2_dp*0.02089).toFixed(1) +"psf)";
            
            document.getElementById("f2_status_1").innerHTML = "T:" + Math.sign(f2_temp_alt-273.15) * (Math.abs(f2_temp_alt-273.15)).toFixed(1)+"&deg;C,"+"&emsp;P:"+(f2_pres_alt).toFixed(0)+"N/m&sup2,"+"&emsp;Den:"+(f2_den_alt).toFixed(3)+"kg/m&sup3;";
            document.getElementById("f2_status_2").innerHTML = "&#963:" + (f2_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f2_delta_alt).toFixed(1)+ ",&emsp; &theta;: "+ (f2_theta_alt).toFixed(3)+ ",&emsp;a:"+(f2_sos_alt).toFixed(1)+"m/s"; 

        }
        else{
            document.getElementById("f2_cas").value = f2_vc.toFixed(1);
            document.getElementById("f2_tas").value = f2_vt.toFixed(1);
            document.getElementById("f2_eas").value = f2_ve.toFixed(1);
            
            document.getElementById("f2_dp").value = (f2_dp*0.02089).toFixed(1);
            document.getElementById("f2_ti").value = f2_ti.toFixed(1);

            document.getElementById("f2_alt_other_unit").innerHTML = "&emsp;" +"("+ f2_alt.toFixed(3) +"km)";
            
            document.getElementById("f2_tas_other_unit").innerHTML = "&emsp;" + "("+fn_kt_to_kmph(f2_vt).toFixed(1) +"kmph)";
            document.getElementById("f2_eas_other_unit").innerHTML = "&emsp;" + "("+fn_kt_to_kmph(f2_ve).toFixed(1) +"kmph)";
            document.getElementById("f2_cas_other_unit").innerHTML = "&emsp;" + "("+fn_kt_to_kmph(f2_vc).toFixed(1) +"kmph)";
        
            document.getElementById("f2_dp_other_unit").innerHTML = "&emsp;" + "("+(f2_dp).toFixed(1) +"N/m&sup2)";

            document.getElementById("f2_status_1").innerHTML = "T:" + Math.sign(f2_temp_alt-273.15) * (Math.abs(f2_temp_alt-273.15)).toFixed(1)+"&deg;C,"+"&emsp;P:"+(f2_pres_alt).toFixed(0)+"N/m&sup2,"+"&emsp;Den:"+(f2_den_alt).toFixed(3)+"kg/m&sup3;";
            document.getElementById("f2_status_2").innerHTML = "&#963:" + (f2_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f2_delta_alt).toFixed(1)+ ",&emsp; &theta;: "+ (f2_theta_alt).toFixed(3)+ ",&emsp;a:"+(f2_sos_alt).toFixed(1)+"m/s"; 

            
        }
    }   
}

function f3_ac_selector(){
    console.log("iam in ac selector");
    if (document.getElementById('f3_Ruski').checked)
    {        
        document.getElementById("f3_tas").placeholder = "kmph";
        document.getElementById("f3_altitude").placeholder = "KM";
        f3_sys =1;
        console.log("F3: Ruski is selected");
    }
    if (document.getElementById('f3_West').checked)
    {
        document.getElementById("f3_tas").placeholder = "kt";
        document.getElementById("f3_altitude").placeholder = "ft";
        f3_sys =2;
        console.log("F3: West is selected");
    }
}

function f3_calc3()
{

    var f3_tas_var = document.getElementById("f3_tas").value; 
    console.log("TAS: "+f3_tas_var);
    var f3_alt_var = document.getElementById("f3_altitude").value; 
    console.log("Alt: "+f3_alt_var);
    var f3_t_delta = document.getElementById("f3_isa_delta").value;
    console.log("Temp Delta: "+f3_t_delta);
    
    if(isNaN(f3_alt_var) || isNaN(f3_tas_var  ) ){ alert(" Not a number ");}
    if( ((f3_alt_var >= 25) && (f3_sys ==1))  ){
        alert("Check Altitude!")
        f3_alt_var = 25
    }
    if(  ((f3_alt_var >= 82021) && (f3_sys ==2))   ){
        alert("Check Altitude!")
        f3_alt_var = 82020
    }

    if(f3_tas_var < 0){ alert("Speed Can't be Negative") }

    
    if (f3_sys ==1){
         
        f3_temp_alt = fn_temp_from_alt(f3_alt_var,f3_t_delta);               console.log("Temp: "+f3_temp_alt);
        f3_pres_alt = fn_pres_from_alt(f3_alt_var);                          console.log("Pres: "+f3_pres_alt);
        f3_den_alt = fn_den_alt(f3_pres_alt,f3_temp_alt);                   console.log("Den: "+f3_den_alt);
            
        f3_theta_alt = f3_temp_alt/288.15;                              console.log("Theta:"+f3_theta_alt);
        f3_sigma_alt = f3_den_alt/1.2250;                               console.log("Sigma:"+f3_sigma_alt);
        f3_delta_alt = f3_pres_alt / 101325;                            console.log("Delta:"+f3_delta_alt);
        
        f3_sos_alt = fn_sos_temp(f3_temp_alt); 
        
        f3_m = fn_m_from_vt(f3_tas_var, f3_theta_alt);                  console.log("M:"+f3_m);
        f3_ve = fn_ve_from_vt(f3_tas_var, f3_sigma_alt);                console.log("EAS:"+f3_ve+"kt");
        f3_vc = fn_vc_from_vt(f3_tas_var,f3_delta_alt,f3_theta_alt);    console.log("CAS:"+f3_vc+"kt");
        f3_dp = fn_dp_from_tas(f3_den_alt,f3_tas_var);                  console.log("DP:"+f3_dp+"N/m2")
        f3_ti = fn_ti_from_m_temp(f3_temp_alt,f3_m);         console.log("Ti:"+f3_ti+"C");

    }
    if (f3_sys ==2){
         
        f3_alt_var = fn_ft_to_km(f3_alt_var);                              console.log("Alt: "+f3_alt_var+"km");
        
        f3_temp_alt = fn_temp_from_alt(f3_alt_var,f3_t_delta);               console.log("Temp: "+f3_temp_alt);
        f3_pres_alt = fn_pres_from_alt(f3_alt_var);                          console.log("Pres: "+f3_pres_alt);
        f3_den_alt = fn_den_alt(f3_pres_alt,f3_temp_alt);                   console.log("Den: "+f3_den_alt);
        
        f3_theta_alt = f3_temp_alt/288.15;                              console.log("Theta:"+f3_theta_alt);
        f3_sigma_alt = f3_den_alt/1.2250;                               console.log("Sigma:"+f3_sigma_alt);
        f3_delta_alt = f3_pres_alt / 101325;                            console.log("Delta:"+f3_delta_alt);
        
        f3_sos_alt = fn_sos_temp(f3_temp_alt); 

        f3_m = fn_m_from_vt(fn_kt_to_kmph(f3_tas_var), f3_theta_alt);                   console.log("M:"+f3_m);
        f3_ve = fn_kt_to_kmph(fn_ve_from_vt(f3_tas_var, f3_sigma_alt));                 console.log("EAS:"+f3_ve+"kt");
        f3_vc = fn_vc_from_vt(fn_kt_to_kmph(f3_tas_var),f3_delta_alt,f3_theta_alt);     console.log("CAS:"+f3_vc+"kt");
        
        f3_dp = fn_dp_from_tas(f3_den_alt,fn_kt_to_kmph(f3_tas_var));                   console.log("DP:"+f3_dp+"N/m2")
        f3_ti = fn_ti_from_m_temp(f3_temp_alt,f3_m);                                    console.log("Ti:"+f3_ti+"C");
    }

    if(!isNaN(f3_m)){
        if (f3_sys ==1){
             
            document.getElementById("f3_m").value = f3_m.toFixed(4);                     
            document.getElementById("f3_eas").value = fn_kt_to_kmph(f3_ve).toFixed(1);      
            document.getElementById("f3_cas").value = fn_kt_to_kmph(f3_vc).toFixed(1);      
            document.getElementById("f3_dp").value = f3_dp.toFixed(1);
            document.getElementById("f3_ti").value = f3_ti.toFixed(1);
            
            document.getElementById("f3_alt_other_unit").innerHTML = "&emsp;" +"("+  fn_km_to_ft(f3_alt_var).toFixed(0) +"&emsp;ft)";
            document.getElementById("f3_tas_other_unit").innerHTML = "&emsp;" + "("+ fn_kmph_to_kt(f3_tas_var).toFixed(1) +"&emsp;kt)";

            document.getElementById("f3_eas_other_unit").innerHTML = "&emsp;" + "("+ f3_ve.toFixed(1) +"&emsp;kt)";
            document.getElementById("f3_cas_other_unit").innerHTML = "&emsp;" + "("+ f3_vc.toFixed(1) +"&emsp;kt)";
            
            document.getElementById("f3_dp_other_unit").innerHTML = "&emsp;" + "("+(f3_dp*0.02089).toFixed(1) +"psf)";

            document.getElementById("f3_status_1").innerHTML = "T:" + Math.sign(f3_temp_alt-273.15) * (Math.abs(f3_temp_alt-273.15)).toFixed(1)+"&deg;C,"+"&emsp;P:"+(f3_pres_alt).toFixed(0)+"N/m&sup2,"+"&emsp;Den:"+(f3_den_alt).toFixed(3)+"kg/m&sup3;";
            document.getElementById("f3_status_2").innerHTML = "&#963:" + (f3_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f3_delta_alt).toFixed(1)+ ",&emsp; &theta;: "+ (f3_theta_alt).toFixed(3)+ ",&emsp;a:"+(f3_sos_alt).toFixed(1)+"m/s"; 

       
        }
        else{
            
            document.getElementById("f3_m").value = f3_m.toFixed(4);             
            document.getElementById("f3_eas").value = f3_ve.toFixed(1);          
            document.getElementById("f3_cas").value = f3_vc.toFixed(1);          
            
            document.getElementById("f3_dp").value = f3_dp.toFixed(1);
            document.getElementById("f3_ti").value = f3_ti.toFixed(1);
            
            document.getElementById("f3_alt_other_unit").innerHTML = "&emsp;" +"("+  f3_alt_var.toFixed(3) +"&emsp;km)";
            document.getElementById("f3_tas_other_unit").innerHTML = "&emsp;" + "("+ fn_kt_to_kmph(f3_tas_var).toFixed(1) +"&emsp;kmph)";

            document.getElementById("f3_eas_other_unit").innerHTML = "&emsp;" + "("+ fn_kt_to_kmph(f3_ve).toFixed(1) +"&emsp;kmph)";
            document.getElementById("f3_cas_other_unit").innerHTML = "&emsp;" + "("+ fn_kt_to_kmph(f3_vc).toFixed(1) +"&emsp;kmph)";
        
            document.getElementById("f3_dp_other_unit").innerHTML = "&emsp;" + "("+(f3_dp*0.02089).toFixed(1) +"psf)";
        
            document.getElementById("f3_status_1").innerHTML = "T:" + Math.sign(f3_temp_alt-273.15) * (Math.abs(f3_temp_alt-273.15)).toFixed(1)+"&deg;C,"+"&emsp;P:"+(f3_pres_alt).toFixed(0)+"N/m&sup2,"+"&emsp;Den:"+(f3_den_alt).toFixed(3)+"kg/m&sup3;";
            document.getElementById("f3_status_2").innerHTML = "&#963:" + (f3_sigma_alt).toFixed(3) + ",&emsp; &delta;: "+ (f3_delta_alt).toFixed(1)+ ",&emsp; &theta;: "+ (f3_theta_alt).toFixed(3)+ ",&emsp;a:"+(f3_sos_alt).toFixed(1)+"m/s"; 

        }
    }
}

function f4_ac_selector(){
    console.log("i am in F4 ac selector");
    if (document.getElementById('f4_Ruski').checked)
    {        
        document.getElementById("f4_cas").placeholder = "kmph";
        f4_sys =1;
        console.log("F4: Ruski is selected");
    }
    if (document.getElementById('f4_West').checked)
    {
        document.getElementById("f4_cas").placeholder = "kt";
        f4_sys =2;
        console.log("F4: West is selected");
    }
}

function f4_calc4()
{

    var f4_cas_var = document.getElementById("f4_cas").value; 
    console.log("CAS: "+f4_cas_var);
    var f4_m_var = document.getElementById("f4_m").value; 
    console.log("M: "+f4_m_var);
    
    if(isNaN(f4_cas_var) || isNaN(f4_m_var  ) ){ alert(" Not a number ");}
    if (f4_m_var < 0)  {alert("M Can't be Negative!")}
    if(f4_cas_var < 0){ alert("Speed Can't be Negative") }

    
    if (f4_sys ==1){
        
        f4_dp_var = dp_from_cas (f4_cas_var);                           console.log("Dyn Press: "+f4_dp_var)
        f4_stpr_var = stpress_from_m_dp (f4_dp_var,f4_m_var);           console.log("St Pres: "+f4_stpr_var)
        f4_alt = alt_from_stpress(f4_stpr_var);                         console.log("Alt: "+f4_alt)                          
        f4_t_delta = 0;

        // f4_temp_alt = fn_temp_from_alt(f4_alt,f4_t_delta);              console.log("Temp: "+f4_temp_alt);
        // f4_pres_alt = fn_pres_from_alt(f4_alt);                         console.log("Pres: "+f4_pres_alt);
        // f4_den_alt = fn_den_alt(f4_pres_alt,f4_temp_alt);               console.log("Den: "+f4_den_alt);
            
        // f4_theta_alt = f4_temp_alt/288.15;                              console.log("Theta:"+f4_theta_alt);
        // f4_sigma_alt = f4_den_alt/1.2250;                               console.log("Sigma:"+f4_sigma_alt);
        // f4_delta_alt = f4_pres_alt / 101325;                            console.log("Delta:"+f4_delta_alt);
        
        // f4_sos_alt = fn_sos_temp(f4_temp_alt); 

    }
    if (f4_sys ==2){
        f4_cas_var = fn_kt_to_kmph(f4_cas_var) 

        f4_dp_var = dp_from_cas (f4_cas_var);                           console.log("Dyn Press: "+f4_dp_var)
        f4_stpr_var = stpress_from_m_dp (f4_dp_var,f4_m_var);           console.log("St Pres: "+f4_stpr_var)
        f4_alt = alt_from_stpress(f4_stpr_var);                         console.log("Alt: "+f4_alt)                          
        f4_t_delta = 0;

        // f4_temp_alt = fn_temp_from_alt(f4_alt,f4_t_delta);              console.log("Temp: "+f4_temp_alt);
        // f4_pres_alt = fn_pres_from_alt(f4_alt);                         console.log("Pres: "+f4_pres_alt);
        // f4_den_alt = fn_den_alt(f4_pres_alt,f4_temp_alt);               console.log("Den: "+f4_den_alt);
            
        // f4_theta_alt = f4_temp_alt/288.15;                              console.log("Theta:"+f4_theta_alt);
        // f4_sigma_alt = f4_den_alt/1.2250;                               console.log("Sigma:"+f4_sigma_alt);
        // f4_delta_alt = f4_pres_alt / 101325;                            console.log("Delta:"+f4_delta_alt);
        
        // f4_sos_alt = fn_sos_temp(f4_temp_alt); 
    }

    if(!isNaN(f4_alt)){
        if (f4_sys ==1){
             
            document.getElementById("f4_alt").value = f4_alt.toFixed(1);                     
            document.getElementById("f4_alt_other_unit").innerHTML = "&emsp;" +"("+  fn_km_to_ft(f4_alt).toFixed(0) +"&emsp;ft)";
    
        }
        else{
            
            document.getElementById("f4_alt").value = f4_alt.toFixed(1);                     
            document.getElementById("f4_alt_other_unit").innerHTML = "&emsp;" +"("+  fn_km_to_ft(f4_alt).toFixed(0) +"&emsp;ft)";
    
        }
    }
    
  
}

function fn_ti_from_m_temp(ta,m){
    console.log("Entered fucntion to calcaulte Impact Temp from Amb Temp & Mach No")
    console.log("Ta is"+ta+"C")
    console.log("M is"+m)
    ti = ta*(1+0.2*m*m)
    return ti-273.15
}

function dp_from_cas (fn_vc){
    // input vc is in kmph
    // output dp is in N/m2
    console.log("entered function to calculate DP from CAS")
    console.log("Vc in kmph:"+fn_vc+ " kmph")
    fn_vc = fn_kmph_to_metpersec(fn_vc)
    console.log("Vc in m/s:"+fn_vc+" m/s")
    v0 = fn_vc/340.29;
    v1 = Math.pow(v0,2)*0.2+1;                  console.log("v1 - "+v1)            
    v2 = Math.pow(v1,3.5)-1;                    console.log("v2 - "+v2)
    v3 = v2*101325;                             console.log("v3 - "+v3)
    console.log("Dyn pressure calculated for Vc "+fn_vc.toFixed(1)+" m/s is "+v3.toFixed(1)+" N/m2")
    return v3
}

function stpress_from_m_dp (dp,m){
    // input Dyn Press is in N/m2 and M
    // output Pressure is in N/m2
    console.log("Entered fucntion to calculate Static Pressure calcualted from M "+m+" and DP "+dp.toFixed(1)+" N/m2")
    v1 = 1 + 0.2*m*m
    v2 = Math.pow(v1,3.5)-1
    v3 = dp/v2
    console.log("Static Pressure calculated from DP & M is :"+v3.toFixed(1)+" N/m2")
    return v3

}

function alt_from_stpress(fn_stpress){
    // input is Static pressure in N/m2
    // output is Altitude in m
    console.log("Entered function to calculate Altitude from St Pressure: "+fn_stpress.toFixed(1)+" N/m2")
    fn_delta = fn_stpress/101325
    console.log("Calculated Delta: "+fn_delta.toFixed(4))
    if (fn_delta >= 0.22336)
        {
            console.log("St Pressure corresponds to Troposphere");
            v1 = Math.pow(fn_delta,0.190263)
            v2 = 1 - v1
            v3 = 145442.15 * v2
            v3 = fn_ft_to_km(v3)
        }
    else if ( fn_delta < 0.22336)
        {
            console.log("St Pressure corresponds to above Troposphere");
            v1 = Math.log(fn_delta/0.22336)
            v2 = 36089.24 - (20805.7 * v1)
            v3 = fn_ft_to_km(v3)
        }
    console.log("Altitude corresponds to "+v3.toFixed(1)+" km")
    return v3
}

function linear_interpolator(f_x1,f_y1,f_x2,f_y2,f_x3){
    console.log("Entered function to interpolate")
    slope = (f_y2-f_y1)/(f_x2-f_x1)
    f_y3 = f_y1 + slope *(f_x3-f_x1)
    console.log("Interpolated value calcuated and returning")
    return f_y3
}


function fn_dp_from_tas(fn_den,fn_tas){
    // Input - density in kg/m3, tas in kmph
    // Output - DP in N/m2
    console.log("Entered function to calcualte DP from density: "+fn_den.toFixed(4)+" & TAS: "+fn_tas+"kmph")
    var v1 = fn_kmph_to_metpersec(fn_tas);
    var v2 = 0.5* fn_den* v1 * v1;
    console.log("Dynamic pressure calculated in fn is :"+ v2.toFixed(2)+"N/m2")
    return v2
}



function fn_m_from_cas(cas,delta){
    // input Vc is in kmph, delta - no units
    // output M is no units
    console.log("Entered function to calcualte M from CAS: "+cas+" kmph & delta T: "+delta)
    cas = fn_kmph_to_kt(cas);
    v1 = Math.pow((cas/661.4786),2)*0.2+1;
    v2 = Math.pow(v1,3.5)-1;
    v3 = v2/delta+1;
    v4 = Math.pow(v3,(1/3.5))-1;
    v5 = Math.sqrt(v4*5);
    console.log("M calculated from Vc is "+v5toFixed(4))
    return v5;
}

function fn_temp_from_alt(ht,temp_del) {
    // input ht is in km, temp_del is in celsius
    // output temperature is in K
    console.log("Entered function to calculate Temperature from Alt:"+ht+" km & Delta T: "+temp_del)
    var v1 = 273.15 + 15
    if(ht <= 11)
            { v1 =  273.15+ +15 + -ht*6.5 + +temp_del; }
    else if( ht > 11 & ht < 20)
        { v1 =  216.65 +temp_del; }
    else  
        { v1 =  216.65 + (ht -20); }
    console.log("Temperature at "+ht+"km is"+v1+"K");
    return v1;
}

function fn_pres_from_alt(ht){
    // input ht is in km
    // output pressure is in N/m2
    console.log("Entered function to calculate Alt from Ht: "+ht+ " km")
    if (ht <= 11)
        {
            var c1 = 9.80665 * 28.9644 / (8.31432 *6.5);
            //console.log(c1);
            var v1 = 6.5 * ht /288.15;
            //console.log(v1);
            var p = 101325 * Math.pow((1- v1),c1);
            //console.log(p);
            console.log("pressure at altitude "+ ht +" km is "+p.toFixed(2)+"N/m2")
            return p;
        }
    else if ( ht>11 & ht < 25)
        {
            //var mq = 226.3 * Math.exp(-157.696* 10**-6 * (ht*1000-11000));
            var mq = 22632.06 * Math.exp(-157.696* 10**-6 * (ht*1000-11000));
            console.log("pressure at altitude "+ ht +" km is "+mq.toFixed(2)+"N/m2")
            return mq;
        }
}

function fn_den_alt(pres, temp) { 
    // Input pressure - N/m2, Temp - K
    // Output Density - kg/m3
    console.log("Entered function to calculate Density from P: "+pres+" N/m2 & T: "+temp);
    v1 = 1.225* pres/101325 * 288.15/temp;
    console.log("Density calculated in function is: "+v1.toFixed(2)+"kg/m3");
    return v1
}

function fn_ve_from_vc(vc,p){
    // input p is in N/m2, Vc is in kmph
    // output ve (v6) is in kmph
    console.log("Entered function to calcualte Ve from Vc: "+vc+" kmph & P: "+p+" N/m2");
    vc = vc *0.539957;
    delta = p/101325;                           //console.log("Delta:"+delta);
    v1 = 0.2 * Math.pow((vc/661.4786),2);       //console.log("v1:"+v1);
    v2= Math.pow((1+v1),3.5)-1;                 //console.log("v2:"+v2);
    v3 = v2/delta+1;                            //console.log("v3:"+v3);
    v4 = Math.pow(v3,(1/3.5))-1;                //console.log("v4:"+v4);
    v5 = 1479.1 * Math.sqrt(delta*v4);          //console.log("Fn_EAS:"+v5);
    v6 = v5/0.539957;
    console.log("Ve calcalated from Vc is: "+v6.toFixed(0)+" kmph");
    return v6;       
}

function fn_vt_from_m(m,theta){
    //input M, theta - no units
    //output vt is in knots
    console.log("Entered function to calcualte vt from M: "+m+" Theta: "+theta)
    v1 = 661.4786 * m * Math.sqrt(theta);
    console.log("Vt calcualted from M in fn is "+ v1.toFixed(0)+" kts");
    return v1
}

function fn_ve_from_m(m, delta){
    //input M, delta - no units
    //output ve is in knots
    console.log("Entered function to calcualte ve from M: "+m+"& Delta: "+delta.toFixed(3));
    v1 = 661.4786*m*Math.sqrt(delta);
    console.log("Ve calculated from M is "+ v1.toFixed(0)+" kts");
    return v1
}

function fn_vc_from_m(m,delta){
    //input M, delta - no units
    //output vc is in knots
    console.log("Entered function to calcualte vc from M: "+m+"& Delta: "+delta.toFixed(4))
    v1= 0.2 * m * m + 1;                        //console.log("v1:"+v1);
    v2 = Math.pow(v1,3.5)-1;                    //console.log("v2:"+v2);
    v3 = v2* delta+1;                           //console.log("v3:"+v3);
    v4 = Math.pow(v3,(1/3.5))-1;                //console.log("v4:"+v4);
    v5 = 1479.1 * Math.sqrt(v4);                //console.log("VC:"+v5);
    console.log("Vc calcualted from M is: "+v5.toFixed(0)+" kts")
    return v5;
}

function fn_m_from_vt(vt,theta){
    //input vt - kmph, theta - no units
    // output - M - no units

    console.log("Entered function to calcualte M from Vt: "+vt+" kmph & theta: "+theta.toFixed(4))
    vt = fn_kmph_to_kt(vt);
    v1 = vt / (661.4786 * Math.sqrt(theta));
    console.log("M calcualted from Vt is: "+v1.toFixed(4))
    return v1;
}

function fn_ve_from_vt(vt,sigma){
    //input vt - kmph, sigma - no units
    // output Ve units - kt
    console.log("Entered function to calcualte Ve from Vt: "+vt+" kmph & Sigma: "+sigma.toFixed(4))
    vt = fn_kmph_to_kt(vt);
    v6 = vt*Math.sqrt(sigma);
    console.log("Ve calculated from Vt is "+v6.toFixed(0)+" kts")
    return v6;
}

function fn_vc_from_vt(tas,delta,theta){
    //  input tas is kmph
    //  output is kt
    console.log("Entered function to calcualte Vc from Vt: "+tas+" kmph & theta: "+theta.toFixed(4))
     
    tas = fn_kmph_to_kt(tas);
    v1 = Math.pow((tas/1479.1),2)/theta;
    v2 = Math.pow((1+v1),3.5)-1;
    v3 = delta * v2 +1;
    v4 = Math.pow(v3,(1/3.5))-1;
    v5 = 1479.1 * Math.sqrt(v4);   
    console.log("Vc calcualted from Vt is "+v5.toFixed(0)+ "kts")  
    return v5;            
}

function fn_ft_to_km(ft) { return ft*0.0003048 }
function fn_km_to_ft(km) { return km*3280.84}

function fn_km_to_nm(km) { 
    console.log("Entered function to convert km to nm");
    console.log("in KM:"+km);
    console.log("in nm:"+ km*0.539957);
    console.log("Returning back from function to convert km to nm");
    return km*0.539957;     
}

function fn_nm_to_km(nm) { 
    console.log("Entered function to convert nm to km");
    console.log("in nm:"+nm);
    console.log("in KM:"+ nm*1.852);
    console.log("Returning back from function to convert nm to km");
    return nm*1.852;     
}

function fn_kt_to_kmph(kt) { return kt*1.852 }
function fn_kmph_to_kt(kmph) {return kmph*0.539957}
function fn_kmph_to_metpersec(kmph){return kmph*0.277777}
function fn_metpersec_to_kmph(mps){ return mps* 3.6}

function fn_sos_temp(temp_alt){ 
    console.log("Entered function to calcualte Speed of Sound from Temperature: "+temp_alt)
    v1 =Math.sqrt(1.4*8314.3/28.97*temp_alt)
    console.log("SoS: "+v1.toFixed(0)+"m/s")
    return v1
}