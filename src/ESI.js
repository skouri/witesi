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

    static async getCharacter(characterId) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getCorporation(corporationId) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getContracts(regionId, page) {
        try {
            const response = await fetch(`https://esi.evetech.net/latest/contracts/public/${regionId}/?datasource=tranquility&page=${page}`);
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