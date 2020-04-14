#!/usr/bin/env node
const ora = require('ora');
const chalk = require('chalk');
const transl = require('google-translate-open-api').default;

/**
 * get params
 */
const method = process.argv[2];
const text = process.argv[3];

/**
 * switch method
 * @param {string}  method
 */
switch(method) {
  case '-h':
  case '--help':
    showHelp();
    break;
  case '-en':
    translate('en');
    break;
  case '-cn':
    translate('zh-CN');
    break;
  case '-v':
  case '--version':
    showVersion();
    break;
  default:
    showHelp();
    return;
}

/**
 * show help
 */
function showHelp() {
  console.log('a command line translate tool');
  console.log(chalk.blue('Usage:'), 'transl [options] text');
  console.log(chalk.blue('Options:'));
  console.log('\t', chalk.green('-h  --help\t\t'), 'Options help');
  console.log('\t', chalk.green('-v  --version\t\t'), 'get version');
  console.log('\t', chalk.green('-en\t\t\t'), 'translate into English');
  console.log('\t', chalk.green('-cn\t\t\t'), 'translate into Chinese');
  console.log(chalk.blue('Example:'));
  console.log('\t', chalk.green('transl -h \t\t'), 'get options help')
  console.log('\t', chalk.green('transl -en 你好\t'), 'translate `你好` into English');
  console.log('\t', chalk.green('transl -cn Hello\t'), 'translate `Hello` into Chinese');
}

/**
 * show version
 */
function showVersion() {
  console.log(require('../package.json').version);
}

/**
 * translate
 */
async function translate(toLang='en') {
  let loading = ora('🚀  In translation...').start();
  try {
    const result = await transl([text], {tld: 'cn', to: toLang});
    loading.stop();
    const [resText, resLang] = result.data;
    console.log('\n');
    console.log(chalk.green(resText));
  } catch (e) {
    loading.stop();
    console.log(chalk.bgRed('[ERROR]'), chalk.red('something error, check your options'));
  }
}
