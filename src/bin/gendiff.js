#!/usr/bin/env node

const program = require('commander');
const { genDiff } = require('..');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'main')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
