import { publish } from 'gh-pages';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

console.log('Starting deployment...');

const options = {
  dotfiles: true,
  branch: 'gh-pages',
  repo: 'https://github.com/kngsnwn/wedding.git',
  message: 'Deploy to GitHub Pages',
  user: {
    name: 'kngsnwn',
    email: 'your.email@example.com' // Replace with your GitHub email
  },
  // Add this to handle long paths on Windows
  git: 'git',
  // Clean up the working tree before deploying
  cleanup: true
};

// Deploy the dist directory
publish('dist', options, (err) => {
  if (err) {
    console.error('Deployment error:', err);
    process.exit(1);
  }
  console.log('Successfully deployed to GitHub Pages!');
});
