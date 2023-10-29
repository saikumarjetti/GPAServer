const express = require("express");
const router = express.Router();
const dataLoader = require("../../dataLoader");

const imageList = dataLoader.getAllImagesList();
const imgFolderList = dataLoader.imgFolderList;
router.get("/category", async (req, res) => {
  // console.log("categort");
  res.json({
    category: Object.keys(dataLoader.imgListToCat),
    length: imgFolderList.length,
  });
});

// Loop through the imgListToCat object to create routes dynamically 😜
for (const category in dataLoader.imgListToCat) {
  const key = dataLoader.imgListToCat[category];
  let data = imageList[key];
  router.get(`/images/${category}`, async (req, res) => {
    let data = imageList[key].map((val) => {
      return val;
    });
    // console.log(data);
    res.json({
      [category]: data,
      length: data.length,
    });
  });
}
router.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const folderName = imageName.slice(0, 3);
  // console.log(`image name ${imageName}`);
  // console.log(`folder name ${folderName}`);
  res.sendFile(process.cwd() + `/public/${folderName}/${imageName}`);
});

module.exports = router;
