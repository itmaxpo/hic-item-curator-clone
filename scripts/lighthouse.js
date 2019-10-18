const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const chalk = require('chalk')
const { promisify } = require('util')
const fs = require('fs')
const writeFile = promisify(fs.writeFile)

/***
 * This script runs a lighthouse audit and exits with status 1 if the score is not successful.
 * Also, a report file is generated in REPORT_FILE_PATH.
 *
 * Note: It expects a production build running on SITE_URL.
 */

const SITE_URL = 'http://localhost:3000/'
const MINIMUM_SCORE = 0.6
const REPORT_FILE_PATH = 'lighthouse-report.json'

const opts = {
  chromeFlags: ['--headless', '--disable-device-emulation'],
  output: 'json',
  logLevel: 'info'
}

const config = {
  extends: 'lighthouse:default',
  settings: {
    // TODO: add this back when tui fixes tab issues: accessibility
    onlyCategories: ['performance', 'best-practices', 'accessibility'],
    passes: {
      // URLs of requests to block while loading the page. Basic wildcard support using *, string[]
      blockedUrlPatterns: []
    }
  }
}

/**
 * Launches chrome, opens SITE_URL, generates a lighthouse report.
 * Saves report in the file system AND returns it.
 */
const launchChromeAndRunLighthouse = async (url, opts, config) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags })

  opts.port = chrome.port

  const { report } = await lighthouse(url, opts, config)

  await chrome.kill()

  await writeFile(REPORT_FILE_PATH, report)

  return JSON.parse(report)
}

/**
 * Takes a report. Logs result. Exits with status 1 if the score is not successful.
 */
const checkScores = async report => {
  console.log(
    chalk.blue(`
------------------
LIGHTHOUSE SCORES:
------------------
`)
  )

  const categories = Object.values(report.categories)
  let success = true

  for (const category of categories) {
    const categorySuccess = category.score >= MINIMUM_SCORE

    // log category score
    console.log(
      `  ${chalk.bold(category.title)} score: ${chalk[categorySuccess ? 'green' : 'red'](
        category.score
      )}`
    )

    if (!categorySuccess) {
      success = false
    }
  }

  if (!success) {
    console.error(`
  Lighthouse score ${chalk.bold('not successful')} 🤯
  One or more categories didn't reach the minimum score of ${chalk.blue(MINIMUM_SCORE)}
`)
    process.exit(1)
  }

  console.log(`
  Lighthouse score ${chalk.bold('successful')}! 😂👌
  All categories surpass the minimum score of ${chalk.blue(MINIMUM_SCORE)}
`)
}

/**
 * Main function.
 * Exits with status 1 on any uncaught error.
 */
const run = async () => {
  try {
    const report = await launchChromeAndRunLighthouse(SITE_URL, opts, config)
    await checkScores(report)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

run()
