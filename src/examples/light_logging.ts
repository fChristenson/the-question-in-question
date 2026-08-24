function saveData(data: object) {
  try {
    const savedData = save(data);
    return savedData;
  } catch (error) {
    console.error("Error saving data:", error, "Data:", data);
  }
}
