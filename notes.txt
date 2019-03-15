# witesi
Holds code for my Waterford Institute of Technology app which uses the Eve Swagger Interface.

The Eve Swagger Interface is defined here:
https://esi.evetech.net/ui/

* Stories are using extracted data as contracts may disappear from Eve Online.
* It takes a long time to load data. For now, I don't load every individual item in a contract.
* Sorting can only be performed on "Time Left" and "Issuer" field as of now.

TODO
* Allow for region change (although choosing wrong region makes things super slow).
* Speed up things. ;)
* Handle HTML in the values returned from ESI.
* Handle paging (Forge region has 25 pages of contracts).
** Problem 1: API call returns all types. I filter them into three groups.
** Problem 2: Nothing to say how many total pages there are. So, keep retrieving until get an empty set.
* Handle citadel's as locations.
* Caching is limited to browser's cache size. Implement my own? Don't cache?
* How to search for item name in list of contracts if we don't load all the items initially?
* Sort on more fields.
* Add sorting arrows for ascending / descending.
* Remember contract type when navigating back from a route.