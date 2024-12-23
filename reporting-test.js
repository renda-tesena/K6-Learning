import http from "k6/http";
import { sleep, check } from "k6";
//import { addJmeterReportHeaders, addJmeterReportRow } from "./utils/jmeter-reporting";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// import { writeFile } from 'k6/experimental/filesystem';


// Define the stages of the test
export let options = {
  stages: [
    { duration: "5s", target: 2, },
    { duration: "20s", target: 5, },
    { duration: "5s", target: 0, },
  ],
};


let results = [];

export default function () {
    const url = 'https://test-api.k6.io/public/crocodiles/';
    const res = http.get(url);

    // Collecting metrics for CSV export
    results.push({
        timeStamp: Date.now(),
        elapsed: res.timings.duration,
        label: 'GET /crocodiles',
        responseCode: res.status,
        responseMessage: res.status === 200 ? 'OK' : 'FAILED',
        threadName: `Thread-${__VU}`,
        dataType: 'text',
        success: res.status === 200,
        failureMessage: res.status !== 200 ? res.error : '',
        bytes: res.body.length,
        sentBytes: 0, // Adjust if request sends data
        grpThreads: options.vus,
        allThreads: options.vus,
        URL: url,
        Latency: res.timings.waiting,
        IdleTime: 0,
        Connect: res.timings.connecting,
    });

    // Validating response
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

console.log("Text pod default function")  //, iterace: " + __ITER + " VU: " + __VU)

/*
const csvHeader = `timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect\n`;
const csvBody = results.map(r => `${r.timeStamp},${r.elapsed},"${r.label}",${r.responseCode},"${r.responseMessage}","${r.threadName}","${r.dataType}",${r.success},"${r.failureMessage}",${r.bytes},${r.sentBytes},${r.grpThreads},${r.allThreads},"${r.URL}",${r.Latency},${r.IdleTime},${r.Connect}`).join('\n');
const csvContent = csvHeader + csvBody;
console.log(csvContent);
*/

/*
export function handleSummary(data) {
    const csvHeader = `timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect\n`;
    const csvBody = results.map(r => `${r.timeStamp},${r.elapsed},"${r.label}",${r.responseCode},"${r.responseMessage}","${r.threadName}","${r.dataType}",${r.success},"${r.failureMessage}",${r.bytes},${r.sentBytes},${r.grpThreads},${r.allThreads},"${r.URL}",${r.Latency},${r.IdleTime},${r.Connect}`).join('\n');

    const csvContent = csvHeader + csvBody;

    console.log(csvContent);

    // writeFile ('report-jmeter.csv', csvContent);

    return textSummary(data, { indent: ' ', enableColors: true });
}
*/

