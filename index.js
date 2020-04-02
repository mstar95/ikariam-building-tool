const axios = require("axios");
const puppeteer = require("puppeteer");
const notifier = require('node-notifier');
const siteUrl = 'https://s43-pl.ikariam.gameforge.com/?view=city&cityId=3663';
const PHPSESSID = 'umajdblpi89a1bsgho34k54c23';


const cookies = [{
    name: 'ikariam',
    value: '2569_81e7fc54172fe94ecf10ac572203ae23',
    domain: 's43-pl.ikariam.gameforge.com'
}]


const scrape = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Scrape started")
    try {
        onInterrupt(browser)
        console.log("Hook installed")
        await page.setCookie(...cookies);

        await page.goto(siteUrl);
        console.log("Login succeed")

        await click(page, '#js_CityPosition17Link')

        while(true) {

            await click(page, '.capture')
            await page.waitForSelector('.capture', {
                timeout: 5000
            });
            console.log("selector appeared");
            await sleep();
        }
    } catch (e) {
        notify()
        await page.screenshot({path: 'example2.png'});
        await browser.close();
        throw e;
    }
};

function onInterrupt(browser) {
    process.on('SIGINT', function() {
        console.log("Caught interrupt signal");
        browser.close();
        process.exit();
    });
}

function notify() {
    notifier.notify({
        title: 'Some error',
        message: 'Some error!',
        sound: 'Ping', // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    });
}

const sleep = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise A win!');
    }, 3 * 60 * 1000)
})

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