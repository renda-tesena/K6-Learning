// HOW TO RUN: k6 run --out influxdb=http://testlab2.tesena.com:32769/jmeter influx-test.js


import http from "k6/http";
import { check } from "k6";

// Define the stages of the test
export let options = {
    vus: 20, 
    iterations: 500,

};

export default function () {
    let res;
    res = http.get("https://test.k6.io");
    check(res, {'status is 200': (r) => r.status === 200,});
    
    res = http.get("https://test.k6.io/contacts.php");
    check(res, {'status is 200': (r) => r.status === 200,});

    res = http.get("https://test.k6.io/flip_coin.php");     
    check(res, {'status is 200': (r) => r.status === 200,});
}