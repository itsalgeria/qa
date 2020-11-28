import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";
import { check, group, sleep } from 'k6';

import http from 'k6/http';


var print_error = function(res) {

    if ( res.code_erro != 0 )
    {
     console.log( res.code_erro);
     #console.log(res.body); 
    }
    else
    {
    console.log(0) ;
    }
}

export let options = {
    max_vus: 1000,
    vus: 1000,
    stages: [
      { duration: "2m", target: 1000 },
    ]
  }

var myRate = new Rate("error_rate");
var myTrend = new Trend("my_trend");
var domain = 'https://virtual.hdispo.com';
export default function () {
    group('Login test', function(){
            var url = domain+'/event/Salon-virtuel-La-ruee-vers-lOuest-Benin-Burkina-Faso-Cote-dIvoire-Guinee-Togo-event-20/event-login';
            let headers = { 'Content-Type': 'application/json' };
            let data = { email: 'loubna.lahmici@senseconseil.com',
            mdp: 'monpwd' };
            let res = http.post(url, JSON.stringify(data), { headers: headers });
            //console.log(JSON.parse(res.body).json.name);
            headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            res = http.post(url, data, { headers: headers });
            myRate.add(res.error_code);
            myTrend.add(res.timings.sending + res.timings.receiving);
           print_error(res);

           // console.log(res.body);
            }
    )

    group('Navigate to conference ',function(){
        var url = domain+'/event/Campus-France-Salon-en-ligne-des-etudes-en-France-cinquieme-edition-event-20/event-login';
        let headers = { 'Content-Type': 'application/json' };
        let data = { email: 'loubna.lahmici@senseconseil.com',
        mdp: 'monpwd' };
        let res = http.post(url, JSON.stringify(data), { headers: headers });
        //console.log(JSON.parse(res.body).json.name);
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        res = http.post(url, data, { headers: headers });
        myRate.add(res.error_code);
        myTrend.add(res.timings.sending + res.timings.receiving);
          print_error(res);

  /// 
  // 
  //  conference_id POST
  //  
  var url = domain+'/event/conferences/Campus-France-Maroc-Salon-virtuel-des-masters-1ere-edition-2020-event-20';
  res = http.get(url);
  res = http.post(url, data, { headers: headers });
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
  console.log(res.error_code);  
  // https://salondz-campusfrance.org
  var url = domain+'/event/conference/Campus-France-Maroc-Salon-virtuel-des-masters-1ere-edition-2020-event-20/01-Presentation-Salon-Virtuel-des-Masters-2020-11';
  res = http.get(url);
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
  //console.log(res.body);
//   // Post message
  print_error(res);
   
  var url = domain+'/send-comment';
  headers = { 'Content-Type': 'application/json' };
  data = { conference_id: 11,
  comment: 'Test de charge' };
  //let res = http.post(url, JSON.stringify(data), { headers: headers });
  //console.log(JSON.parse(res.body).json.name);
  headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    ,'X-Requested-With':'XMLHttpRequest'
        };
  res = http.post(url, data, { headers: headers });
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
   print_error(res);

  
    })
}
