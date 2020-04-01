const axios = require("axios");
const puppeteer = require("puppeteer");
const notifier = require('node-notifier');
const siteUrl = 'https://s43-pl.ikariam.gameforge.com/?view=city&cityId=3663';
const PHPSESSID = 'umajdblpi89a1bsgho34k54c23';

// await new Promise((resolve, reject) => {
//     let wait = setTimeout(() => {
//         resolve('Promise A win!');
//     }, 5000)
// })
// console.log("after")

const cookies = [{
    name: 'ikariam',
    value: '2569_81e7fc54172fe94ecf10ac572203ae23',
    domain: 's43-pl.ikariam.gameforge.com'
}]

const scrape = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    // page.on('response', async (data) => {
    //     console.log(await data.text() );
    // })
    await page.goto(siteUrl);

    await click(page, '#js_CityPosition17Link')

    await click(page, '.capture')


    await page.waitForSelector('.capture', {
        timeout: 5000
    });
    console.log("selector appeared")

    await page.screenshot({path: 'example2.png'});
    const result = await page.evaluate(evaluate)

    console.log(result)
    browser.close();
    notifier.notify({
        title: 'My awesome title',
        message: 'Hello from node, Mr. User!',
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    });

};

async function click(page, name, sideffect) {
    await page.waitForSelector(name, {
        timeout: 5000
    });
    console.log("selector appeared")
    await page.click(name)
}

const evaluate = async () => {

    const res = document.querySelectorAll(`.capture`);
    var out = [];
    for (var i = 0; i < res.length; i++) {
        out[i] = res[i]
    }
    return out;
};




scrape().catch(e => console.log(e));