class ESI {
    static contracts = [];

    static async getAllContractInfo(regionId, page, setEsiStatus) {
        let index = 0;
        setEsiStatus('Retrieving contract list.', index, 0);
        let contracts = await ESI.getContractsByRegion(regionId, page);

        let stationContracts = [];

        for (const contract of contracts) {
            index++;
            contract.info = {};

            // TODO: A citadel can be returned instead of a station, and it has an ID like 1022875242907
            // which is greater than an int32. Not sure how to handle these yet.
            if (contract.start_location_id < 2147483647 &&
                contract.end_location_id < 2147483647) {

            setEsiStatus(`Retrieving stations for contract ${contract.contract_id}`, index, contracts.length);
            contract.info.endStation = await ESI.getStation(contract.end_location_id);
            contract.info.endSystem = await ESI.getSystem(contract.info.endStation.system_id);
            contract.info.startStation = await ESI.getStation(contract.start_location_id);
            contract.info.startSystem = await ESI.getSystem(contract.info.startStation.system_id);

            contract.info.items = [];
            contract.info.firstItem = {};
            if (contract.type === 'item_exchange' || contract.type === 'auction') {
                setEsiStatus(`Retrieving items for contract ${contract.contract_id}`, index, contracts.length);
                contract.info.items = await ESI.getContractItemList(contract.contract_id, 1 /* TODO */);
                if (contract.info.items.length > 0) {
                    contract.info.firstItem = await ESI.getType(contract.info.items[0].type_id);
                }
            }
    
            contract.info.jumps = [];
            if (contract.type === 'courier') {
                setEsiStatus(`Calculating jumps for contract ${contract.contract_id}`, index, contracts.length);
                contract.info.jumps = await ESI.getRoute(contract.info.startSystem.system_id, contract.info.endSystem.system_id);
            }
    
            contract.info.bids = [];
            if (contract.type === 'auction') {
                setEsiStatus(`Counting bids for contract ${contract.contract_id}`, index, contracts.length);
                contract.info.bids = await ESI.getBids(contract.contract_id, 1); // TODO Total bids (all pages).
            }
    
            setEsiStatus(`Retrieving parties for contract ${contract.contract_id}`, index, contracts.length);
            contract.info.issuer = '';
            if (contracts.for_corporation) {
                contract.info.issuer = await ESI.getCorporation(contract.issuer_corporation_id);
            }
            else {
                contract.info.issuer = await ESI.getCharacter(contract.issuer_id);
            }
            stationContracts.push(contract);
            }
            else { 
            // TODO Is this a citadel?
            }
        };

        return stationContracts;
    }

    // This route expires daily at 11:05
    static async getRegion(regionId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getRegionList() {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/regions/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getStation(stationId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/stations/${stationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route expires daily at 11:05
    static async getSystem(systemId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 3600 seconds
    static async getCharacter(characterId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`, 3600);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 3600 seconds
    static async getCorporation(corporationId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 1800 seconds
    static async getContractsByRegion(regionId, page) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/contracts/public/${regionId}/?datasource=tranquility&page=${page}`, 1800);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

   // This route is cached for up to 3600 seconds
   static async getContractItemList(contractId, page) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/contracts/public/items/${contractId}/?datasource=tranquility&page=${page}`, 3600);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            if (response.status === 204) {
                console.log(contractId);
                return [];
            }
            else 
                return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }  
    
    // This route expires daily at 11:05
    static async getType(typeId) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility&language=en-us`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This route is cached for up to 86400 seconds
    static async getRoute(origin, destination) {
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/route/${origin}/${destination}/?datasource=tranquility&flag=shortest`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
    
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    //This route is cached for up to 300 seconds
    static async getBids(contractId,page) { // TODO Total the pages.
        try {
            const response = await cachedFetch(`https://esi.evetech.net/latest/contracts/public/bids/${contractId}/?datasource=tranquility&page=${page}`, 300);
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

// cachedFetch taken from https://www.sitepoint.com/cache-fetched-ajax-requests/
const cachedFetch = (url, options) => {
    let expiry = 5 * 60 // 5 min default
    if (typeof options === 'number') {
      expiry = options
      options = undefined
    } else if (typeof options === 'object') {
      // I hope you didn't set it to 0 seconds
      expiry = options.seconds || expiry
    }
    // Use the URL as the cache key to sessionStorage
    let cacheKey = url
    let cached = localStorage.getItem(cacheKey)
    let whenCached = localStorage.getItem(cacheKey + ':ts')
    if (cached !== null && whenCached !== null) {
      // it was in sessionStorage! Yay!
      // Even though 'whenCached' is a string, this operation
      // works because the minus sign converts the
      // string to an integer and it will work.
      let age = (Date.now() - whenCached) / 1000
      if (age < expiry) {
        let response = new Response(new Blob([cached]))
        return Promise.resolve(response)
      } else {
        // We need to clean up this old key
        localStorage.removeItem(cacheKey)
        localStorage.removeItem(cacheKey + ':ts')
      }
    }
  
    return fetch(url, options).then(response => {
      // let's only store in cache if the content-type is
      // JSON or something non-binary
      if (response.status === 200) {
        let ct = response.headers.get('Content-Type')
        if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
          // There is a .json() instead of .text() but
          // we're going to store it in sessionStorage as
          // string anyway.
          // If we don't clone the response, it will be
          // consumed by the time it's returned. This
          // way we're being un-intrusive.
          response.clone().text().then(content => {
            localStorage.setItem(cacheKey, content)
            localStorage.setItem(cacheKey+':ts', Date.now())
          })
        }
      }
      return response
    })
  }

export default ESI;