import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class LocationsModel {
    constructor() {
        this.locations = this.getData();
    }

    getData() {
        try {
            const filePath = path.resolve(__dirname, 'locations.json');
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading JSON data:", err);
            return [];
        }
    }

    getAllLocations() {
        return this.locations;
    }
}

export default new LocationsModel;