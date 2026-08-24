function saveData(data: object) {
  try {
    let savedData = save(data);
    savedData = processData(savedData);
    return savedData;
  } catch (error) {
    console.error("Error saving data:", error, "Data:", data);
  }
}
