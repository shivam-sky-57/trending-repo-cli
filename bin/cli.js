#! /usr/bin/env node

const {Command} = require('commander');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const program = new Command();

program
    .option('--duration <time>', 'time range (day, week, month, year)', 'week')
    .option('--limit <number>', 'number of repositories', 10);

program.parse(process.argv);

const options = program.opts();

const validDurations = ['day','week','month', 'year'];

if (!validDurations.includes(options.duration)) {
    console.error(
        `Invalid duration: ${options.duration}. Must be one of  ${validDurations.join(', ')}`
    );
    process.exit(1);
}

options.limit = parseInt(options.limit,10);

if (isNaN(options.limit) || options.limit < 1 || options.limit > 100) {
  console.error('Invalid limit. Must be a number between 1 and 100.');
  process.exit(1);
}

function getSinceData(duration) {
    const now = new Date();
    switch(duration) {
        case 'day': now.setDate(now.getDate() - 1); break;
        case 'week': now.setDate(now.getDate()-7); break;
        case 'month': now.setMonth(now.getMonth()-1); break;
        case 'year': now.setFullYear(now.getFullYear() - 1); break;
    }
    return now.toISOString().split('T')[0];
}

const sinceDate = getSinceData(options.duration);

async function getTrendingRepos(sinceDate, limit) {
  const url = `https://api.github.com/search/repositories?q=created:>${sinceDate}&sort=stars&order=desc&per_page=${limit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

    const data = await res.json();
    return data.items;
  } catch (err) {
    console.error('Error fetching repositories:', err.message);
    process.exit(1);
  }
}

function displayRepos(repos) {
  repos.forEach((repo, index) => {
    console.log(`${index + 1}. ${repo.full_name}`);
    console.log(`   Description: ${repo.description || 'No description'}`);
    console.log(`   Stars: ${repo.stargazers_count}`);
    console.log(`   Language: ${repo.language || 'N/A'}`);
    console.log(`   URL: ${repo.html_url}`);
    console.log('');
  });
}

getTrendingRepos(sinceDate, options.limit).then(displayRepos);

