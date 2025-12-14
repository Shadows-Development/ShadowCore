import { readFileSync } from 'fs';
import { join } from 'path';

export function readPackageJson(): Record<string, any> {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const fileContent = readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(fileContent);
}