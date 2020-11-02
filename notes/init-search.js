const glob = require("glob");
const fs = require("fs");
const axios = require('axios');

const NAME_OF_INDEX = 'docusaurus';

const processing = async() => {
await glob(".docusaurus/docusaurus-plugin-content-docs/default/*.json", function(err, files) {
if(err) {
  console.error("cannot read the folder, something goes wrong with glob", err);
}

const readFilesSync = (file) => {
  const ret = []
    ret.push(JSON.parse(fs.readFileSync(file,'utf-8')))
  return ret
}

const updateIndex = async (docs) => {
  try {
    return await axios.post(`http://meilisearch:7700/indexes/${NAME_OF_INDEX}/documents`, docs);
  } catch (error) {
    console.error(error);
  }
}
files.forEach(function(file) {
  updateIndex(readFilesSync(file));
});
});
};

(async()=>{
  await processing();
})();

