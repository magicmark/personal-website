#!/usr/bin/env node
const { printWithComments } = require('@graphql-tools/merge');
const { typeDefs } = require('../build/hub');

console.log(printWithComments(typeDefs));