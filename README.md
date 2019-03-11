# Assignment 1 - ReactJS app.

Name: Steven Kouri

## Overview.
The online game Eve Online provides an API for accessing most of its data, called the Eve Swagger Interface. Using this API, I have built a React app to display contracts between the players (i.e. Buying/selling, auctions, and delivery of goods). The system deep links into the contracts to show more detail, as well as deep linking into the publicly available information about the players tied to the contract.
 
 + Uses Eve Swagger Interface (https://esi.evetech.net/ui/)
 + Displays Item Exchange contracts.
 + Displays Auction contracts.
 + Displays Courier contracts.
 + Search for system names as the starting/ending location of the contract.
 + Display items as part of the contracts.
 + Display player information for the contracts.
 + Sort by "Time Left" on contract or "Issuer" of contract.

## Installation requirements.

Run "npm install" to download all the dependences.
Run "npm start" to start up the system.
Run "npm run storybook" to view the different component stories.

## Data Model Design.

The data comes from the Eve Swagger Interface (ESI), and consists of many different objects.

 + Contract
 {
    "collateral": 0,
    "contract_id": 142416814,
    "date_expired": "2019-03-11T16:16:52Z",
    "date_issued": "2019-02-11T16:16:52Z",
    "days_to_complete": 0,
    "end_location_id": 60013867,
    "issuer_corporation_id": 98148549,
    "issuer_id": 1149958860,
    "price": 3400000000,
    "reward": 0,
    "start_location_id": 60013867,
    "title": "T2 Rigged Rorq w/ IC2 & PANIC",
    "type": "item_exchange",
    "volume": 14500000
  }
 + Character
 {
  "ancestry_id": 11,
  "birthday": "2008-10-05T03:59:00Z",
  "bloodline_id": 1,
  "corporation_id": 275336656,
  "description": "This space available for rent.",
  "gender": "male",
  "name": "Jogan Gage",
  "race_id": 1,
  "security_status": 2.7336695314842867
}
 + Region
 {
  "constellations": [
    20000017,
    ...
  ],
  "description": "\"The greater the State becomes, the greater humanity under it flourishes.\"",
  "name": "The Forge",
  "region_id": 10000002
}
 + Station
 {
  "max_dockable_ship_volume": 50000000,
  "name": "Podion VIII - Moon 15 - Nefantar Miner Association Mining Outpost",
  "office_rental_cost": 55304213,
  "owner": 1000154,
  "position": {
    "x": -172185231360,
    "y": -31213363200,
    "z": 1855767306240
  },
  "race_id": 2,
  "reprocessing_efficiency": 0.32,
  "reprocessing_stations_take": 0.05,
  "services": [
    "bounty-missions",
    "courier-missions",
    "reprocessing-plant",
    "refinery",
    "market",
    "repair-facilities",
    "fitting",
    "news",
    "insurance",
    "docking",
    "office-rental",
    "loyalty-point-store",
    "navy-offices"
  ],
  "station_id": 60013867,
  "system_id": 30000019,
  "type_id": 2499
}
 + System
 {
  "constellation_id": 20000003,
  "name": "Podion",
  "planets": [
    ...,
    {
      "asteroid_belts": [
        40001280,
        ...
      ],
      "moons": [
        40001273,
        ...
      ],
      "planet_id": 40001272
    },
    ...
  ],
  "position": {
    "x": -58709857801616320,
    "y": 26044509386392230,
    "z": -101528995159067870
  },
  "security_class": "B3",
  "security_status": 0.10970497131347656,
  "star_id": 40001265,
  "stargates": [
    50001197
  ],
  "stations": [
    60013867
  ],
  "system_id": 30000019
}
 + Corporation
 {
  "ceo_id": 1952558349,
  "creator_id": 1624694709,
  "date_founded": "2010-10-02T02:08:00Z",
  "description": "",
  "home_station_id": 60003760,
  "member_count": 1,
  "name": "Soul Proprietorship",
  "shares": 1000,
  "tax_rate": 0.1,
  "ticker": "SOULP",
  "url": "http://"
}
 + Item
 {
    "is_blueprint_copy": true,
    "is_included": true,
    "item_id": 1892509338,
    "material_efficiency": 9,
    "quantity": 1,
    "record_id": 2847874294,
    "runs": 3,
    "time_efficiency": 14,
    "type_id": 939
  }
 + Type
 {
  "capacity": 0,
  "description": "",
  "dogma_attributes": [
    {
      "attribute_id": 161,
      "value": 0.01
    },
    ...
  ],
  "graphic_id": 59,
  "group_id": 105,
  "market_group_id": 277,
  "mass": 0,
  "name": "Navitas Blueprint",
  "packaged_volume": 0.01,
  "portion_size": 1,
  "published": true,
  "radius": 1,
  "type_id": 939,
  "volume": 0.01
}
 + Route
 [
  30000019,
  30000022,
  30000017
]
 + Bid
 [
  {
    "amount": 151000000,
    "bid_id": 5510843,
    "date_bid": "2019-03-11T00:40:04Z"
  }
]
 + Ancestry
 [
  {
    "bloodline_id": 5,
    "description": "Holders, the major landholding class in Amarr society, are generally conservative traditionalists. A few, however, have elected to break ranks with their hidebound and power-hungry peers, instead supporting the modernization of their society's religion and substantial economic reform. Their champion is Catiz Tash-Murkon, the Udorian Royal Heir.",
    "icon_id": 1641,
    "id": 1,
    "name": "Liberal Holders",
    "short_description": "Progressive members of the upper class who have rejected their traditional ways."
  },
  ...
 ]
 + Bloodline
 [
  {
    "bloodline_id": 1,
    "charisma": 6,
    "corporation_id": 1000006,
    "description": "The Deteis are regarded as the face of leadership in Caldari society. Commonly possessed of sharp, ordered minds and articulate tongues, they are mostly found in positions of authority within military and political spheres. Driven by the cultural premise that the good of the whole must come before the needs of the individual, they have made the responsibility of upholding the integrity of the entire Caldari State their own.",
    "intelligence": 7,
    "memory": 7,
    "name": "Deteis",
    "perception": 5,
    "race_id": 1,
    "ship_type_id": 601,
    "willpower": 5
  },
  ...
 ]
 + Race
 [
  {
    "alliance_id": 500001,
    "description": "Founded on the tenets of patriotism and hard work that carried its ancestors through hardships on an inhospitable homeworld, the Caldari State is today a corporate dictatorship, led by rulers who are determined to see it return to the meritocratic ideals of old. Ruthless and efficient in the boardroom as well as on the battlefield, the Caldari are living emblems of strength, persistence, and dignity.",
    "name": "Caldari",
    "race_id": 1
  },
  ...
 ]
 + Portrait
 {
  "px128x128": "http://imageserver.eveonline.com/Character/1952558349_128.jpg",
  "px256x256": "http://imageserver.eveonline.com/Character/1952558349_256.jpg",
  "px512x512": "http://imageserver.eveonline.com/Character/1952558349_512.jpg",
  "px64x64": "http://imageserver.eveonline.com/Character/1952558349_64.jpg"
}

## App Component Design.

A screenshot showing the component stories from Storybook  

![][stories]

Most stories are just laying out the main data elements. I included a Search story as well to test out the search widget. 

## UI Design.

This app makes lots of network calls, and I wanted it to be somewhat snappy. So, I opted with pre-loading
most of the data beforehand. But now because it takes so long to pre-load the data, I added a modal which
shows the progress. This still needs lots of work though, because I am only loading one region currently,
and it is NOT the biggest one.
![][loading_screen]

The screen displaying auction contracts.
![][auction_screen]

The screen showing courier contracts. (Note column changes from other contract types.)
![][courier_screen]

The screen showing item exchange contracts.
![][exchange_screen]

The screen showing the list of items available via the contract.
![][items_screen]

The screen displaying publicly available character information. 
![][character_screen]

## Routing.

+ / - displays main screen showing different contract types and their listings.
+ /contract/:contract_id/items - item view of a particular contract (:contract_id)
+ /character/:character_id - view of a particular character's information (:character_id)

All of the above are publicly available. There are MANY API calls via ESI which would require a login
through Eve Online. It is possible to authenticate through their system using OAuth, but I chose not
to implement that at this time, as it was not the main goal of this app, and could be added later.

## Extra features

As mentioned above, because there are so many API calls being made, I decided to pre-load and
cache much data. As presented, the API calls are like reading rows from a database, and returning
those rows. While relational, it means you have to look up each row from each table containing the
information you need. I would like to store this data in a database, and then load only the data needed
for my display, using SQL queries or some othe method.

The search feature currently only searches for system names. Ideally it would search for items. To do
so would mean loading every item for every contract however. Again, this would work better if the items
were stored in a database and search server side.

## Independent learning.

I had to learn how to use react-bootstrap in order to lay out my screens. The caching of the data was
interesting as mentioned above. And obviously, I had to figure out the Eve Swagger Interface. I'm using
the "moment" library for some date manipulation. Also, I found some code snippets on StackOverflow and
other areas that I tried my best to reference in code comments.





[loading_screen]: ./loading_screen.png
[auction_screen]: ./auction_screen.png
[character_screen]: ./character_screen.png
[courier_screen]: ./courier_screen.png
[exchange_screen]: ./exchange_screen.png
[items_screen]: ./items_screen.png
[stories]: ./storybook.png