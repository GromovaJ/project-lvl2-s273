#!/usr/bin/env node
var program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'main')
  .action((firstConfig, secondConfig) => {
    console.log(program.format );
    console.log(firstConfig);
    console.log(secondConfig);
  })
.parse(process.argv);
