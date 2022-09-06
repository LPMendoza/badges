const program = require('commander');
const path = require('path');
const fs = require('fs');
const { generateBadges } = require('node-jest-badges');

program
  .command('createBadges <project>')
  .description('...Creating Badges')
  .action(async (command) => {
    const baseBadgesPathOrigin = path.join(__dirname, './badges');
    const baseBadgesPathByProject = path.join(__dirname, `./badgesByProject/${command}`);

    generateBadges().then(() =>{
      
      if (!fs.existsSync(baseBadgesPathByProject)) {
        fs.mkdirSync(baseBadgesPathByProject);
      }
      if (!fs.existsSync(baseBadgesPathByProject)) {
        fs.mkdirSync(baseBadgesPathByProject);
      }
    
      const filesExisted = fs.readdirSync(baseBadgesPathByProject);
      if (filesExisted.length) {
        filesExisted.forEach((file) => fs.unlinkSync(`${baseBadgesPathByProject}/${file}`));
      }

      fs.rename((baseBadgesPathOrigin), baseBadgesPathByProject, (error) => {
        if (error) throw new Error(error);

        console.log('Badges Created!');
        console.log('Source');
        fs.readdirSync(baseBadgesPathByProject).forEach((file) => {
          console.log(`${command}/${file}`);
        });

      });
    })
    .catch((error) => {
      console.error(error);
    });
  });

program.parse(process.argv);

