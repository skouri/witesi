class ESI {
    static async getRegion(regionId) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getRegionList() {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/universe/regions/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    /* Station
        {
        "max_dockable_ship_volume": 50000000,
        "name": "Sendaya V - CONCORD Bureau",
        "office_rental_cost": 2029825,
        "owner": 1000125,
        "position": {
            "x": -235663564800,
            "y": 14395269120,
            "z": -83101655040
        },
        "race_id": 4,
        "reprocessing_efficiency": 0.5,
        "reprocessing_stations_take": 0.05,
        "services": [
            "bounty-missions",
            "courier-missions",
            "interbus",
            "reprocessing-plant",
            "market",
            "stock-exchange",
            "cloning",
            "repair-facilities",
            "fitting",
            "news",
            "insurance",
            "docking",
            "office-rental",
            "loyalty-point-store",
            "navy-offices",
            "security-offices"
        ],
        "station_id": 60012301,
        "system_id": 30000015,
        "type_id": 1932
        }
    */
    static async getStation(stationId) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/universe/stations/${stationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getSystem(systemId) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

}

export default ESI;