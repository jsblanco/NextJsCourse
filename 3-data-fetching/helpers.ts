import fs from 'fs/promises';
import path from 'path';

export interface Product {
    id: string;
    title: string;
    description: string;
}


export async function getData(): Promise<{ products: Product[] }> {
    return await JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'dummy-backend.json'), 'utf-8'))
}
