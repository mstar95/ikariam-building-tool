const puppeteer = require("puppeteer");
const notifier = require('node-notifier');
const credentials = require("./credentials");


const url = 'https://lobby.ikariam.gameforge.com/pl_PL/';

const scrape = async () => {
    const  browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Scrape started")
    try {
        onInterrupt(browser)
        await page.goto(url);
        await login(page)
        await waitForSelector(page, '#joinGame')
        await click(page, '.button-primary')
        await click(page, '.btn-primary')
       // const xd = await page.evaluate(evaluate);
        await click(page, '#js_CityPosition17Link')
        while (true) {
            await click(page, '.capture')
            await page.waitForSelector('.capture', {
                timeout: 5000
            });
            console.log("selector appeared");
            await page.waitFor(3 * 60 * 1000);
        }
    } catch (e) {
        notify()
        await page.screenshot({path: 'example2.png'});
        await browser.close();
        throw e;
    }
};

function onInterrupt(browser) {
    process.on('SIGINT', function () {
        console.log("Caught interrupt signal");
        browser.close();
        process.exit();
    });
    console.log("Hook installed")
}

async function login(page) {
    await click(page, '.openX_int_closeButton a')
    await click(page, '.tabsList li')
    await waitForSelector(page, 'input[type=checkbox]')
    await page.type('input[type=email]', credentials.login)
    await page.type('input[type=password]', credentials.password)
    await click(page, 'button[type=submit]')
    console.log('Login succeed')
}

function notify() {
    notifier.notify({
        title: 'Some error',
        message: 'Some error!',
        sound: 'Ping', // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    });
}

async function click(page, selector) {
    await waitForSelector(page, selector)
    console.log(selector + " appeared")
    await page.click(selector)
}

async function waitForSelector(page, selector) {
    await page.waitForSelector(selector, {
        timeout: 5000
    });
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