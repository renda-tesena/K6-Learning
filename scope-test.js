import http from "k6/http";
import { sleep, check } from "k6";
//import { addJmeterReportHeaders, addJmeterReportRow } from "./utils/jmeter-reporting";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Define the stages of the test
export let options = {
    duration: "5s", 
    iterations: 2,
};

export default function () {
    // const url = 'https://test-api.k6.io/';
    // const res = http.get(url);
    let per_vu_text = "User " + __VU + ", iteration " + __ITER;

    console.log(per_vu_text);
   
}

export function handleSummary(data) {
    return {
        'summary.json': JSON.stringify(data), //the default data object
      };
}
