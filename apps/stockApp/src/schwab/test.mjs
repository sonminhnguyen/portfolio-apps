import Schwab from "./schwab.mjs";
import dotenv from 'dotenv'

const schwab = new Schwab({
    username: process.env.SCH_USER,
    password: process.env.SCH_PASS,
    headless: false,
    dataDir: 'data'
})

await schwab.getPosition()