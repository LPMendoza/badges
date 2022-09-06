const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const { generateBadges } = require('node-jest-badges');

const PORT = process.env.PORT || 3000;
const app = express();
const baseBadgesPathByProject = path.join(__dirname, './badgesByProject');

var storage = multer.diskStorage(
  {
      destination: './coverage/',
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          cb( null, file.originalname);
      }
  }
);
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(baseBadgesPathByProject));

app.post('/coverageBadge/:project', upload.single('report'), (req, res) => {
  const projectName = req.params.project;
  generateBadges().then(() =>{
    const baseBadgesPathOrigin = path.join(__dirname, './badges');
    
    if(!fs.existsSync(`${baseBadgesPathByProject}/`)) {
      fs.mkdirSync(`${baseBadgesPathByProject}/`);
    }
    if(!fs.existsSync(`${baseBadgesPathByProject}/${projectName}/`)) {
      fs.mkdirSync(`${baseBadgesPathByProject}/${projectName}/`);
    }

    fs.rename((`${baseBadgesPathOrigin}/coverage-branches.svg`),`${baseBadgesPathByProject}/${projectName}/coverage-branches.svg`, (error) => {
    });
    fs.rename((`${baseBadgesPathOrigin}/coverage-functions.svg`),`${baseBadgesPathByProject}/${projectName}/coverage-functions.svg`, (error) => {
    });
    fs.rename((`${baseBadgesPathOrigin}/coverage-jest coverage.svg`),`${baseBadgesPathByProject}/${projectName}/coverage-jest coverage.svg`, (error) => {
    });
    fs.rename((`${baseBadgesPathOrigin}/coverage-lines.svg`),`${baseBadgesPathByProject}/${projectName}/coverage-lines.svg`, (error) => {
    });
    fs.rename((`${baseBadgesPathOrigin}/coverage-statements.svg`),`${baseBadgesPathByProject}/${projectName}/coverage-statements.svg`, (error) => {
    });
    res.status(200);
    res.json({
      status: 200
    })
  })
  .catch((error) => {
    res.status(500);
    res.json({
      message: error,
      status: 500
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});