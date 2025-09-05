
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "./db.json"); 

async function addData(req, res) {
  try {
    const data = req.body; 

   
    let fileContent = await fs.readFile(filePath, "utf-8");
    fileContent = fileContent ? JSON.parse(fileContent) : [];

  
    const newId = fileContent.length > 0 
      ? fileContent[fileContent.length - 1].id + 1 
      : 1;

    const newEntry = { id: newId, ...data };

  
    fileContent.push(newEntry);

    
    await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2), "utf-8");

    res.status(201).json({
      message: "Data added successfully",
      data: newEntry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add data" });
  }
}
async function deleteData(req, res) {
  const id = parseInt(req.params.id, 10); // make sure ID is a number
  try {
    // 1. Read the file content
    let fileContent = await fs.readFile(filePath, "utf-8");
    fileContent = fileContent ? JSON.parse(fileContent) : [];

    // 2. Find if the ID exists
    const index = fileContent.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Data not found" });
    }

    // 3. Remove the item
    fileContent.splice(index, 1);

    // 4. Save updated data
    await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2), "utf-8");

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete data" });
  }
}

module.exports =  {addData,deleteData} ;
