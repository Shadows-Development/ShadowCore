export function splitSpecialId(specialId: string) {
  const [feature, action, id] = specialId.split(":");

  return { feature, action, id };
}

export async function importFile(filePath: string) {
  try {
    // Handle .js files using require
    if (filePath.endsWith(".js")) {
      return require(filePath);
    }

    // Handle .ts files using dynamic import
    const imported = await import(filePath);
    
    // If default export is found, return it
    if (imported?.default) {
      return imported.default;
    }

    // If no default export is found, log an error
    console.error(`❌ No default export found in ${filePath}`);
    return null;
  } catch (err) {
    // Log the error with the file path for better debugging
    console.error(`❌ Error importing file: ${filePath}`, err);
    
    // Include additional information about the error
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    
    return null;
  }
}
