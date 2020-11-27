import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";
import { check, group, sleep } from 'k6';

import http from 'k6/http';


var range = function(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

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
var domain = 'http://35.246.140.37';
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
  /// 
  // 
  //  conference_id POST
  //  
  var url = domain+'/event/conferences/Campus-France-Salon-en-ligne-des-etudes-en-France-cinquieme-edition-event-20';
  res = http.get(url);
  res = http.post(url, data, { headers: headers });
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
  console.log(res.error_code);  
  // https://salondz-campusfrance.org
  var url = domain+'/event/conference/Campus-France-Salon-en-ligne-des-etudes-en-France-cinquieme-edition-event-20/04-ICD-Business-School-Paris-L-offre-de-formation-disponible-au-sein-de-l-ecole-de-commerce-ICD-Business-School--13';
  res = http.get(url);
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
  //console.log(res.body);
//   // Post message
    /*
  var url = domain+'/send-comment';
  headers = { 'Content-Type': 'application/json' };
  data = { conference_id: 13,
  comment: 'Test de charge' };
  //let res = http.post(url, JSON.stringify(data), { headers: headers });
  //console.log(JSON.parse(res.body).json.name);
  headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    ,'X-Requested-With':'XMLHttpRequest'
        };
  res = http.post(url, data, { headers: headers });
  myRate.add(res.error_code);
  myTrend.add(res.timings.sending + res.timings.receiving);
  console.log(res.error_code);*/
  
    })
}
