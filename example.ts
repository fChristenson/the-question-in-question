const save = (o: object) => o;

function processData(data: object) {
  try {
    // Simulate processing data
  } catch (error) {
    console.error(
      "Error processing data in processData function:",
      error,
      "Data:",
      data,
    );
  }
}

function saveData(data: object) {
  let savedData;
  try {
    savedData = save(data);
    savedData = processData(savedData);
    return savedData;
  } catch (error) {
    console.error(
      "Error saving data in saveData function:",
      error,
      "Data:",
      data,
      "Saved Data:",
      savedData,
    );
  }
}
