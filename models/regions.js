import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RegionsModel {
    constructor() {
        this.regions = this.getData();
    }

    getData() {
        try {
            const filePath = path.resolve(__dirname, 'regions.json');
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading JSON data:", err);
            return [];
        }
    }

    getAllStates() {
        const statesArray = this.regions.map(region => region.state);
        const statesSet = new Set(statesArray);
        const states = [...statesSet];
        return states;
    }

    getAllRegions() {
        return this.regions;
    }

    getAllRegionsByAlphabeticalOrder() {
        return this.regions.map(region => ({
            ...region,
            locations: region.locations.sort((a, b) => a.location.localeCompare(b.location))
        }));
    }

    filterData(searchLocation) {
        const results = [];

        this.regions.forEach(region => {
            region.locations.forEach(location => {
                if (location.location.toLowerCase().includes(searchLocation.toLowerCase())) {
                    results.push({
                        region: region.region,
                        location: location.location,
                        imageLink: location.imageLink
                    });
                }
            });
        });
    
        return results;
    }
}

export default new RegionsModel;
