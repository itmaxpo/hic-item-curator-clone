const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const chalk = require('chalk')

/***
 * This script runs a lighthouse audit and exits with status 1 if the score is not successful.
 * Also, a report file is generated in REPORT_FILE_PATH.
 *
 * Note: It expects a production build running on SITE_URLS.
 */

const SITE_URLS = [
  'http://localhost:3000/create?lighthouse=true',
  'http://localhost:3000/?areaId=&areaName=&countryId=0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50&countryName=Tanzania&type=accommodation&lighthouse=true',
  'http://localhost:3000/item/95760e7d-dcc9-4740-af16-0a7276311513?language=en-GB&lighthouse=true'
]

const MINIMUM_SCORES = {
  ['Performance']: 0.8,
  ['Accessibility']: 0.7,
  ['Best Practices']: 0.7
}

const opts = {
  chromeFlags: ['--headless', '--disable-device-emulation'],
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

  for (const category of categories) {
    const categorySuccess = category.score >= MINIMUM_SCORES[category.title]

    // log category score
    console.log(
      `  ${chalk.bold(category.title)} score: ${chalk[categorySuccess ? 'green' : 'red'](
        category.score
      )}
      `
    )

    if (!categorySuccess) {
      console.error(`
        Lighthouse score ${chalk.bold('not successful')} 🤯
        ${chalk.bold(category.title)} didn't reach the minimum score of ${chalk.blue(
        MINIMUM_SCORES[category.title]
      )}
      `)
      process.exit(1)
    }
  }
}

/**
 * Main function.
 * Exits with status 1 on any uncaught error.
 */
const run = async url => {
  try {
    const report = await launchChromeAndRunLighthouse(url, opts, config)
    await checkScores(report)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const runAllSiteUrls = async () => {
  for (const url of SITE_URLS) {
    console.log(`${chalk.bold(`Running Lighthouse on URL:`)} ${chalk.green(url)}`)
    await run(url)
  }
}

runAllSiteUrls()
