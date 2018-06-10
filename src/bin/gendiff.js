#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'default')
  .action((firstConfig, secondConfig, options) => {
    console.log(genDiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
