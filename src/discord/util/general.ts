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
    
    // If default export is found, return it (class in this case)
    if (imported?.default) {
      return imported.default;  // Return the class constructor itself, not an instance
    }

    // If no default export is found, log an error
    console.error(`❌ No default export found in ${filePath}`);
    return null;
  } catch (err) {
    console.error(`❌ Error importing file: ${filePath}`, err);
    return null;
  }
}

export function isBotOwner(userId: string, ownerId: string | string[]): boolean {
  const owners = Array.isArray(ownerId) ? ownerId : [ownerId]
  return owners.includes(userId);
}