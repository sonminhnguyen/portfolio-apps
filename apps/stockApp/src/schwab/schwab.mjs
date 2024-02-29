import { chromium } from 'playwright';
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import fetch from 'node-fetch'

dotenv.config()

class Schwab {
    static LOGIN_URL = 'https://client.schwab.com/Login/SignOn/CustomerCenterLogin.aspx'
    static POSITION_URL = 'https://client.schwab.com/api/PositionV2/PositionsDataV2?GroupBy=security&OptionsWithUnderlying=true&GroupOptionsByStrategy=false&IsPreferenceRepOverrideSet=false&EquityColumns=true&GroupOptionsByCallPut=false&DisplaySlimPositionsRow=true'
    static cookieJar = 'cookies.json'

    constructor({ username, password, headless = false, dataDir=__dirname }) {
        this.username = username
        this.password = password
        this.headless = headless
        this.dataDir = dataDir
    }

    getSavedCookie() {
        const file = path.join(this.dataDir, Schwab.cookieJar)
        if (fs.existsSync(file)) {
            return JSON.parse(fs.readFileSync(file))
        }

        return []
    }

    async authenticate() {
        const cookie = this.getSavedCookie()
        if (cookie.length > 0) {
            return this.cookie = cookie
        }

        const browser = await chromium.launch({
            headless: this.headless,
            executablePath: process.env.EDGE_PATH
        });

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(Schwab.LOGIN_URL);
        const frame = page.mainFrame().childFrames()
            .find(_ => _.url().indexOf('https://lms.schwab.com/Login') === 0 || _.url().indexOf('https://sws-gateway.schwab.com') === 0)

        let loginId, passwordId, submitBtn
        if (frame.url().indexOf('https://lms.schwab.com/Login') === 0) {
            loginId = '#LoginId'
            passwordId = '#Password'
            submitBtn = '#LoginSubmitBtn'
        } else if (frame.url().indexOf('https://sws-gateway.schwab.com') === 0) {
            loginId = '#loginIdInput'
            passwordId = '#passwordInput'
            submitBtn = '#btnLogin'
        }

        await frame.fill(loginId, this.username);
        await frame.fill(passwordId, this.password);
        await frame.click(submitBtn)
        await page.waitForNavigation()

        const cookies = await context.cookies()
        const cookieJson = JSON.stringify(cookies)
        const cookieValue = cookies.map(({name, value }) =>{
            return { name, value }
        })
        fs.writeFileSync(path.join(this.dataDir, Schwab.cookieJar), cookieJson)
        fs.writeFileSync(path.join(this.dataDir, 'cookieVal.json'), cookieValue)
        this.cookie = cookieJson
        await browser.close()
    }

    async getPosition() {
        const cookie = this.getSavedCookie()
        console.log(this.getSavedCookie());
        const response = await fetch(Schwab.POSITION_URL, {
            headers: {
                cookie: this.getSavedCookie()
            }
        })
        const json = await response.json()
    }
}

export default Schwab