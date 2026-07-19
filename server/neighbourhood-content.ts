// Long-form neighbourhood page copy, generated + fact-checked, then applied to
// the runtime DB on boot by applyNeighbourhoodContent() (upgrade-only guard).
// Regenerate with the neighbourhood-content workflow; edit here or via the CMS.
export interface NbContent {
  slug: string;
  story: string[];
  realEstateCopy: string[];
  lifeCopy: string[];
  outsideCopy: string[];
  amenitiesCopy: string[];
  shopDineCopy: string[];
  schools: { name: string; level: string; area: string; url?: string }[];
}

export const neighbourhoodContent: NbContent[] = [
  {
    "slug": "upper-mount-royal",
    "story": [
      "Upper Mount Royal is Calgary's most established prestige address, a century-old mansion district set on elevated ground in the city-centre, immediately southwest of downtown. It sits above the escarpment that divides it from Lower Mount Royal, bounded by Royal Avenue SW to the north, Premier Way SW to the south, Mount Royal Crescent and Hillcrest Avenue to the east, and 14th Street SW to the west. Curved, tree-lined streets were laid out deliberately to discourage through traffic and set the community apart from Calgary's grid.",
      "Developed largely in the 1910s through the 1930s by the city's early business and civic leaders, the neighbourhood was first known as American Hill before taking the Mount Royal name. Many of its homes carry formal heritage designation, and mature elms and generous setbacks give the streets a settled, garden-suburb feel. Today Upper Mount Royal holds some of the highest residential values in Calgary, an almost entirely single-detached enclave a short walk from 17th Avenue SW, 4th Street SW, and the downtown core."
    ],
    "realEstateCopy": [
      "Housing stock in Upper Mount Royal ranges from restored heritage mansions and grand pre-war estates built by Calgary's railroad and business families to contemporary custom homes on some of the largest inner-city lots in the city. Properties are almost exclusively single-detached, many on wide, deep parcels shaped by the community's early curved-street plan. Against a neighbourhood average sale price near $2,902,890, offerings span multi-million-dollar renovations through to landmark estates well above that mark, with genuine scarcity: only a handful of homes trade in a typical year. Spencer Rivers represents both buyers and sellers in Upper Mount Royal and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Upper Mount Royal suits established families, executives, and downsizers who want privacy, mature surroundings, and a walkable inner-city location without leaving the character of an older neighbourhood. Days here run at an unhurried pace: quiet streets for morning walks, established schools within reach, and downtown offices, 17th Avenue restaurants, and the Elbow River pathways all only minutes away. It is a community for buyers who value permanence and pedigree over new-build convenience."
    ],
    "outsideCopy": [
      "Green space is woven through the community, from tree-canopied boulevards to the fields and playgrounds at Earl Grey School and Mount Royal School. Residents are within walking distance of the Elbow River pathways through Mission, River Park in nearby Altadore, and the off-leash areas along the river. Mount Royal Station Park, managed by the community association, adds tennis courts, a soccer field, a playground, and a winter skating rink."
    ],
    "amenitiesCopy": [
      "The Mount Royal Community Association runs its hall and Mount Royal Station Park at Prospect Avenue and 10th Street SW, with tennis and basketball courts, a soccer field, and seasonal skating. Commuting is straightforward: Elbow Drive, Crowchild Trail, and 14th Street SW feed quickly into downtown and the wider city, while 17th Avenue SW carries Calgary Transit bus routes and the neighbourhood's walk-to-work proximity to the core reduces reliance on driving altogether."
    ],
    "shopDineCopy": [
      "Shopping and dining sit at the neighbourhood's doorstep. Mount Royal Village anchors the 17th Avenue SW retail and entertainment district, the Red Mile, with hundreds of boutiques, cafes, and restaurants a short walk north. Trendy 4th Street SW in adjacent Mission adds another concentration of dining and specialty shops, and the downtown core, Calgary's core grocers, and Uptown 17th's independent storefronts are all within easy reach on foot."
    ],
    "schools": [
      {
        "name": "Mount Royal School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/mountroyal"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/earlgrey"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada"
      },
      {
        "name": "Calgary French & International School",
        "level": "Independent",
        "area": "Independent",
        "url": "https://www.cfis.com/"
      },
      {
        "name": "Rundle College",
        "level": "Independent",
        "area": "Independent",
        "url": "https://www.rundle.ab.ca/"
      }
    ]
  },
  {
    "slug": "aspen-woods",
    "story": [
      "Aspen Woods is the newest of Calgary's west-side prestige communities and one of the most consistently expensive addresses in the city. It sits in the west quadrant, bounded by 17 Avenue SW to the north, Old Banff Coach Road to the south, Sarcee Trail to the east, and 85 Street SW to the west, sharing edges with Springbank Hill, West Springs, Christie Park and Strathcona Park.",
      "Built out largely between the early 2000s and the late 2010s, Aspen Woods reads as a planned luxury community rather than an inner-city enclave: gently curving streets, treed boulevards, and a quiet, residential calm. The defining feature is the topography. West-facing lots along the Aspen Summit ridge open to Rocky Mountain views on a clear day, while east-facing lots look back toward the downtown skyline.",
      "That combination of mountain views, newer estate housing, and a catchment loaded with top-ranked schools keeps Aspen Woods near the top of Calgary's luxury market, with average sale prices well above the city as a whole."
    ],
    "realEstateCopy": [
      "Housing in Aspen Woods is roughly 80 percent single detached homes, with the balance made up of upscale townhouses and a handful of luxury condominium buildings. The detached stock is newer estate product from the 2002 to 2018 build-out, running to executive two-storeys and walkouts on the Aspen Summit ridge, with transitional, Craftsman and contemporary architecture on generous, landscaped lots. Prices span from the high $600,000s for attached homes into the $2 million-plus range for ridge estates, with detached sales averaging around the community's $1,324,661 mark. Spencer Rivers represents both buyers and sellers across Aspen Woods and can surface off-market opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "Aspen Woods suits families and professionals who want a newer estate home, mountain views, and access to some of Calgary's strongest schools without leaving the west side. Days here run quiet and low-traffic, built around school runs, the trail network, and quick trips to Aspen Landing. The community draws established families, executives commuting downtown, and buyers relocating from acreages who want turnkey luxury with city services close at hand."
    ],
    "outsideCopy": [
      "Green space threads through the community, with roughly a third of the area preserved as parks and pathways. Griffith Woods Park sits just south along the Elbow River for forested trails and off-leash areas, while Edworthy Park and Baker Park on the Bow River are a short drive north. The Westside Recreation Centre anchors indoor recreation with pools, an indoor track, skating and a climbing wall."
    ],
    "amenitiesCopy": [
      "The Aspen Woods and Springbank Hill community associations run local programming, and the Westside Recreation Centre serves the wider west side with aquatics, fitness and rinks. Commuting is straightforward: Bow Trail and 17 Avenue SW feed east toward downtown, Sarcee Trail and Stoney Trail connect the ring road, and the 69 Street SW CTrain station on the Blue Line puts LRT rapid transit minutes away."
    ],
    "shopDineCopy": [
      "Aspen Landing Shopping Centre, at 85 Street and 17 Avenue SW, is the community hub, with more than 60 shops, services and restaurants anchored by Safeway and Shoppers Drug Mart alongside cafes, boutiques and Crave Cupcakes. Everyday dining and coffee sit within walking distance for many homes, and the Calgary Farmers' Market West and the newer retail at Trinity Hills add more shopping and food options a short drive north."
    ],
    "schools": [
      {
        "name": "Webber Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.webberacademy.ca"
      },
      {
        "name": "Rundle College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.rundle.ab.ca"
      },
      {
        "name": "Calgary Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.calgaryacademy.com"
      },
      {
        "name": "Dr. Roberta Bondar School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://drrobertabondar.cbe.ab.ca"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/ernestmanning"
      }
    ]
  },
  {
    "slug": "elbow-park",
    "story": [
      "Elbow Park is one of Calgary's original inner-city estate communities, wrapped by a bend of the Elbow River in the city-centre southwest. Its streets run between Mission Bridge and 25 Avenue SW to the north, 50 Avenue SW to the south, Macleod Trail and the Elbow River to the east, and 4th Street SW to the west, putting Stanley Park, Mission's 4th Street, and downtown all within a few minutes' reach.",
      "Annexed in 1907 and built out through the 1910s and 1920s, Elbow Park was one of Calgary's first purpose-planned residential suburbs, drawn by doctors, lawyers, and business owners who raised large two-storey homes along Sifton Boulevard and the river. That Arts and Crafts and Tudor Revival character still defines the streetscape under a canopy of mature elms.",
      "Today Elbow Park sits at the top of Calgary's luxury market. Alongside neighbouring Roxboro, Britannia, and Elboya, it draws buyers who want heritage architecture, oversized inner-city lots, and river access without leaving the city centre."
    ],
    "realEstateCopy": [
      "Elbow Park real estate spans restored pre-war character homes, mid-century bungalows on deep lots, and architect-designed new builds, many on wider frontages than newer inner-city communities allow. Prices reflect that scarcity: the community averages around $2,397,468, with riverfront and Sifton Boulevard estates reaching well beyond it and entry points on smaller lots sitting below. Homes trade infrequently and rarely stay long once listed. Spencer Rivers represents both buyers and sellers throughout Elbow Park and the surrounding river communities, and can often surface off-market opportunities before they reach public listings."
    ],
    "lifeCopy": [
      "Elbow Park suits established families and professionals who want a quiet, tree-lined address within walking distance of the river, the schools, and Mission. Days here are built around the pathways and parks, morning coffee on 4th Street, and a short commute downtown. It is a settled, low-turnover community where neighbours know each other and children walk to school, yet the pace of the inner city is only a bridge away."
    ],
    "outsideCopy": [
      "The Elbow River defines outdoor life here. The paved Elbow River Pathway runs from Stanley Park through River Park to Sandy Beach, linking swimming, tennis courts, and toboggan hills at Stanley Park with off-leash areas and cottonwood-shaded picnic sites downstream. Residents cycle, run, and paddle from their doorsteps, with Sandy Beach's riverbank and the wider city pathway network all reachable on foot."
    ],
    "amenitiesCopy": [
      "The Elbow Park Community Association anchors neighbourhood life with a hall, tennis, and seasonal programs, while Stanley Park's outdoor pool and playing fields serve families year-round. Commuting is straightforward: 4th Street SW and Elbow Drive feed directly into downtown, Macleod Trail runs along the eastern edge, and the Erlton/Stampede and 39 Avenue CTrain stations on the Red Line sit just across the river for a quick ride into the core."
    ],
    "shopDineCopy": [
      "Mission's 4th Street corridor is Elbow Park's everyday high street, home to more than 300 shops and restaurants a short walk or drive away. Locals frequent Shokunin, OEB Breakfast Co., Yann Haute Patisserie, and Joyce on 4th, along with specialty grocers and cafes on 4th Street and nearby 17th Avenue. Britannia Plaza adds upscale boutiques and dining, and downtown's full range of amenities is minutes north."
    ],
    "schools": [
      {
        "name": "Elbow Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://elbowpark.cbe.ab.ca/"
      },
      {
        "name": "William Reid School",
        "level": "Elementary (French Immersion)",
        "area": "CBE public",
        "url": "https://williamreid.cbe.ab.ca/"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b118/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "britannia",
    "story": [
      "Britannia is one of Calgary's smallest and most exclusive city-centre estate communities, a roughly 0.6-square-kilometre pocket in the southwest framed by Elbow Drive, the Elbow River, 50 Avenue SW, and Glenmore Trail SW. It sits among the Elbow River corridor's most established addresses, sharing edges with Elboya, Elbow Park, Mayfair, and Bel-Aire.",
      "Developer F.C. Lowes laid out Britannia in the mid-1950s as a premium enclave, and that intent still shows: wide, gently curved streets, generous 50-foot-plus lots, mature tree canopy, and royal-themed street names such as Coronation Drive. Fewer than a thousand residents live here, which keeps turnover low and demand high.",
      "With homes routinely trading above $2 million and an average sale price near $3,050,000, Britannia ranks among Calgary's priciest neighbourhoods and its tightest infill markets — a place where lots, not just houses, are the scarce asset."
    ],
    "realEstateCopy": [
      "Britannia's housing stock spans mid-century bungalows on original estate lots, extensively renovated character homes, and new luxury infills built to the community's ridge and river outlooks. Lots are wide and deep by inner-city standards, and their scarcity is the reason values hold: with an average sale price near $3,050,000, entry-level teardowns and updated homes still clear well above $2 million, while custom builds and Elbow River-facing properties reach considerably higher.",
      "Spencer Rivers represents both buyers and sellers throughout Britannia and the surrounding Elbow River corridor, and in a market this small he can often surface off-market opportunities before they ever reach MLS."
    ],
    "lifeCopy": [
      "Britannia suits established families and professionals who want quiet, low-density streets within minutes of downtown. Days here revolve around river-pathway walks, morning coffee at Britannia Plaza, and easy access to the private clubs and schools of the inner southwest. The community draws long-tenured owners — the median resident age sits in the early fifties — giving the streets a settled, neighbourly feel rather than a transient one."
    ],
    "outsideCopy": [
      "The Elbow River defines Britannia's western edge, and the paved Elbow River Pathway links the community directly to Sandy Beach and River Park — a favourite for wading, picnics, and cycling. The shared River Park / Sandy Beach off-leash area and the nearby Elboya off-leash zone give dogs room to roam, while mature boulevards and quiet cul-de-sacs make the whole neighbourhood walkable."
    ],
    "amenitiesCopy": [
      "The Elboya-Britannia-Windsor Park Community Association anchors local recreation and events for the area. Commuting is quick: Elbow Drive and 4 Street SW run straight into the Beltline and downtown core in minutes, Glenmore Trail SW connects east-west across the city, and Chinook and the CTrain Red Line are a short drive south, making Britannia one of the best-connected estate communities in Calgary."
    ],
    "shopDineCopy": [
      "Britannia Plaza, at Elbow Drive and 49 Avenue SW, is the community's own boutique retail hub — Sunterra Market for groceries and prepared food, Starbucks, Village Ice Cream, Britannia Wine Merchants, and Native Tongues Taqueria for tacos and mezcal on the patio. Larger shopping at Chinook Centre and the restaurants of Mission and 4 Street SW are only a few minutes away."
    ],
    "schools": [
      {
        "name": "Elbow Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/elbowpark/"
      },
      {
        "name": "Elboya School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/elboya/"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://earlgrey.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "Calgary French & International School",
        "level": "Independent",
        "area": "Independent",
        "url": "https://www.cfis.com/"
      }
    ]
  },
  {
    "slug": "bel-aire",
    "story": [
      "Bel-Aire is Calgary's smallest luxury enclave, a city-centre pocket of roughly 160 homes set on the eastern shore of the Glenmore Reservoir. The community is framed by Glenmore Trail SW to the north, the reservoir to the south and west, 14 Street SW to the east, and Bel-Aire Place SW along its western edge, with the Elbow River and the private Calgary Golf & Country Club close at hand.",
      "Annexed to Calgary in 1954 and built out through the 1960s on former farmland, Bel-Aire was planned from the start as an estate district, and it has stayed that way. There are no condominiums, no rental stock, and very little turnover, which is part of why it consistently ranks among the wealthiest addresses in southwest Calgary.",
      "For buyers, Bel-Aire sits at the top of the city-centre market. With an average sale price near $5,225,000, it competes with neighbouring Mayfair, Britannia, and Elbow Park as one of the most exclusive places to own a detached home inside the city."
    ],
    "realEstateCopy": [
      "Bel-Aire is single-family detached only, on large, mature lots that are rare this close to the core. The housing stock ranges from original 1960s estate bungalows to substantial custom rebuilds and modern architectural homes, many reworked to capture reservoir and golf-course sightlines. Values run broadly from about $1 million for a lot-value teardown to well past $10 million for a new-build estate, with the community average around $5,225,000. Because so few homes change hands in any given year, timing and access matter. Spencer Rivers represents both buyers and sellers in Bel-Aire and can often surface off-market opportunities before they reach public MLS listings."
    ],
    "lifeCopy": [
      "Bel-Aire suits established buyers who want space, privacy, and a short commute without leaving the city centre. Daily life here is quiet and residential: winding streets, generous setbacks, and neighbours who tend to stay for decades. It is a fit for families, downsizers wanting a single-storey estate, and executives who value being ten to fifteen minutes from downtown yet steps from open water and pathway. The scale is intimate enough that most residents know the community by name."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines outdoor life in Bel-Aire, with the surrounding pathway network linking to North Glenmore Park, the Elbow River, and the Weaselhead Flats natural area for walking, cycling, and paddling. The Calgary Canoe Club and Glenmore Sailing Club sit on the water nearby, and the private Calgary Golf & Country Club borders the community. Few inner-city neighbourhoods put this much reservoir shoreline and green space at the door."
    ],
    "amenitiesCopy": [
      "Bel-Aire is served by the Mayfair Bel-Aire Community Association, which anchors the small district's local events and shared interests. Commuting is straightforward: Elbow Drive and 14 Street SW feed north to the core, while Glenmore Trail runs east to Macleod Trail and Deerfoot Trail for cross-city access. Downtown is a ten-to-fifteen-minute drive, and the Chinook LRT station on the Red Line is a short hop east for transit into the centre."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit just east of the community. Chinook Centre, one of Calgary's largest malls, is minutes away via Glenmore Trail, with anchor retail, cinemas, and a full range of restaurants. Closer to home, Britannia Plaza on Elbow Drive offers upscale shops, Sunterra Market, and local favourites such as Village Ice Cream and Monogram Coffee, while the Elbow Drive and Marda Loop corridors add further cafes, bistros, and boutiques."
    ],
    "schools": [
      {
        "name": "Elboya School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/elboya/"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://earlgrey.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "Calgary Girls' Charter School",
        "level": "Elementary",
        "area": "Charter",
        "url": "https://www.calgarygirlsschool.com/"
      },
      {
        "name": "Calgary French & International School",
        "level": "Independent",
        "area": "Independent",
        "url": "https://www.cfis.com/"
      }
    ]
  },
  {
    "slug": "springbank-hill",
    "story": [
      "Springbank Hill is a large estate community on Calgary's western edge, in the city's west quadrant, where the prairie starts folding into foothills. It sits above the Bow River valley, bounded by Old Banff Coach Road to the north, Highway 8 and Glenmore Trail to the south, 69 Street SW and Sarcee Trail to the east, and the city limit at 101 Street SW to the west. Aspen Woods, Signal Hill, Discovery Ridge, and West Springs sit next door.",
      "Developed largely from the late 1990s onward on former ranch land, Springbank Hill kept the acreage feel that defines its character: wide lots, rolling grades, mature tree stands, and long sightlines toward the Rocky Mountains. The 69 Street CTrain station, western terminus of the West LRT, anchors the community's eastern edge.",
      "Within Calgary's luxury market, Springbank Hill is one of the west side's established addresses, trading alongside Aspen Woods and West Springs. The average sale price on file is $944,898, with estate and walkout-lot homes reaching well beyond it."
    ],
    "realEstateCopy": [
      "Housing stock runs from executive single-family homes and walkout bungalows to custom estate builds, most dating from the late 1990s through the 2010s, with newer infill in pockets like Springbank Hill Estates and Aspen Spring. Architecture leans traditional and mountain-modern, on lots that trade tight suburban spacing for elbow room, ravine backing, and mountain views. Against a $944,898 average, attached and townhome product sits below the mark while custom estates on premium lots clear seven figures comfortably. Spencer Rivers represents both buyers and sellers across Springbank Hill and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Springbank Hill suits families and professionals who want space, quiet, and quick access to both downtown and the mountains. Days here mean top-ranked schools within a short drive, pathway walks before work, weekend trips west on Highway 1, and a slower pace than the inner city without giving up urban convenience. It is a settled, owner-occupied community where households tend to stay for the long term."
    ],
    "outsideCopy": [
      "Griffith Woods Park and its Elbow River trails sit minutes south, with forest pathways, wildlife, and off-leash areas. Inside the community, a network of interconnected pathways links reserves, ponds, and green spaces, and the neighbouring Westside Recreation Centre adds an aquatic park, arena, climbing wall, and fitness studios. Bragg Creek and Kananaskis lie a short drive west for hiking, skiing, and mountain recreation."
    ],
    "amenitiesCopy": [
      "The Springbank Hill Community Association runs outdoor rinks, youth soccer, community gardens, and seasonal events through the year. Commuting is straightforward: the 69 Street CTrain station puts downtown roughly 13 minutes away on the West LRT, while Bow Trail, Glenmore Trail, and Stoney Trail carry drivers and connect quickly to Highway 1 and the ring road."
    ],
    "shopDineCopy": [
      "Aspen Landing Shopping Centre is five minutes east, a walkable plaza with Safeway, cafés, boutiques, banking, and restaurants including Original Joe's. Westhills Towne Centre adds big-box retail, grocery, and dining a few minutes further, and Signal Hill Centre plus Chinook Centre cover larger shopping runs. Everyday needs stay quick and close on the west side."
    ],
    "schools": [
      {
        "name": "Webber Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.webberacademy.ca/"
      },
      {
        "name": "Rundle College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.rundle.ab.ca/"
      },
      {
        "name": "Calgary Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.calgaryacademy.com/"
      },
      {
        "name": "Ambrose University",
        "level": "University",
        "area": "Independent",
        "url": "https://ambrose.edu/"
      },
      {
        "name": "Griffith Woods School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/griffithwoods/"
      },
      {
        "name": "Olympic Heights School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/olympicheights/"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/ernestmanning/"
      }
    ]
  },
  {
    "slug": "beltline",
    "story": [
      "The Beltline is Calgary's most walkable urban core, a high-density inner-city community sitting directly south of downtown between 9 Avenue SW and 17 Avenue SW, and running from 14 Street SW east to Macleod Trail and 1 Street SE. It draws its name from the early-1900s \"Belt Line\" streetcar route that looped through the south side, and today it amalgamates the historic districts of Connaught and Victoria Park, first settled in 1905 and 1914.",
      "Formalized under the Beltline Area Redevelopment Plan, the community is one of the city's most densely populated and most urban, home to roughly 25,000 residents living almost entirely in apartments, condominiums, and offices. Central Memorial Park, Calgary's oldest park, anchors its centre, and the 17 Avenue SW retail and entertainment strip forms its southern edge.",
      "In Calgary's market the Beltline is the definitive downtown-adjacent address, offering ownership in the core at prices well below detached inner-city communities while placing residents steps from the office towers, the Sheldon M. Chumir campus, and the 17th Avenue scene."
    ],
    "realEstateCopy": [
      "Beltline zoning permits only multi-family housing, so the inventory is almost entirely condominiums and apartments, from heritage low-rise walk-ups and boutique brownstones to glass high-rise towers and modern lofts, with a limited stock of streetside townhomes tucked along the residential blocks. Buildings span the early-20th-century Connaught and Victoria Park eras through to today's concrete high-rises, giving buyers a genuine range of architecture and scale.",
      "Against the community's $504,129 average sale price, entry-level and studio units sit comfortably below that mark while larger two-bedroom, sub-penthouse, and view-corridor suites in premier towers reach well above it. Spencer Rivers represents both buyers and sellers throughout the Beltline and can surface off-market and pre-list opportunities in the neighbourhood's most sought-after buildings."
    ],
    "lifeCopy": [
      "The Beltline suits professionals, downtown commuters, and anyone who wants a car-optional life within walking distance of work, dinner, and nightlife. Days here run on foot: coffee on 4 Street SW, lunch at First Street Market, an after-work patio on 17 Avenue, and a short walk home to a secured tower or heritage walk-up. It is Calgary's most urban lifestyle, dense, social, and built around convenience rather than commute."
    ],
    "outsideCopy": [
      "Central Memorial Park, Calgary's oldest, sits at the heart of the community with its formal gardens, fountains, and the 1912 Memorial Park Library, a national historic site. Barb Scott Park and Connaught Park add contemporary green space and public art, including the Chinook Arc and the Bird of Spring sculpture, while nearby Haultain Park and the Bow River pathway system extend the options for walking, cycling, and riverside recreation minutes away."
    ],
    "amenitiesCopy": [
      "The Beltline Neighbourhoods Association programs community events and advocates for the area's parks and public realm. Transit is a core strength: the 7 Avenue SW CTrain free-fare zone sits at the northern edge, and Macleod Trail, 4 Street SW, 11 Street SW, and 14 Street SW feed straight into downtown and out to Crowchild Trail and Deerfoot Trail. The Sheldon M. Chumir Health Centre provides 24-hour urgent care within the community."
    ],
    "shopDineCopy": [
      "17 Avenue SW is the retail and dining spine, with more than 370 restaurants, bars, and cafés across the district alongside independent fashion and design shops. 4 Street SW adds a second concentration of restaurants and services, First Street Market offers a food hall of vendors, and outdoor retailers including MEC and The Bike Shop cluster nearby. National-brand shopping at CF Chinook Centre and CORE downtown is a short drive or CTrain ride away."
    ],
    "schools": [
      {
        "name": "Connaught School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/connaught"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada"
      }
    ]
  },
  {
    "slug": "eau-claire",
    "story": [
      "Eau Claire is Calgary's riverside downtown neighbourhood, sitting where the Bow River meets the city's core. It runs from the Bow River on the north to 5 Avenue SW on the south, and from Centre Street on the east to 10 Street SW on the west, wrapping around Prince's Island Park and pointing straight at the skyline.",
      "The name traces to the 1880s, when the Eau Claire and Bow River Lumber Company floated timber down the Bow to a sawmill on these banks, borrowing the name from Eau Claire, Wisconsin. The industrial waterfront has since become one of Calgary's most walkable addresses, a mixed-use quarter of riverside condominiums, plazas, and pathways minutes from the office towers of the Financial District.",
      "In the city-centre market, Eau Claire trades as a premium address. Its average sale price of $980,816 reflects large-format riverfront residences and a location that pairs urban convenience with direct access to the water, Kensington across the river, and Chinatown next door."
    ],
    "realEstateCopy": [
      "Housing in Eau Claire is almost entirely mid-rise and high-rise condominium living, built from the early 1980s onward. The landmark is Eau Claire Estates, a 1983 development designed by architects Skidmore, Owings & Merrill, where floor-plans run from roughly 1,400 to over 5,000 square feet with floor-to-ceiling glass and Bow River and skyline views. Newer towers west toward 10 Street SW sit within walking distance of Kensington. Prices span from entry city-centre condos to multi-million-dollar penthouses, with the $980,816 average pulled upward by these large riverfront suites.",
      "Spencer Rivers represents both buyers and sellers throughout Eau Claire and can surface off-market opportunities in its most sought-after riverfront buildings."
    ],
    "lifeCopy": [
      "Eau Claire suits professionals, downsizers, and downtown executives who want to leave the car parked. Daily life runs on foot: a morning walk on the Bow River Pathway, a short commute into the Financial District, and evenings on Eau Claire Plaza or across the Peace Bridge. It is lock-and-leave living for people who value a river view, cultural festivals on their doorstep, and the quiet of Prince's Island a block away."
    ],
    "outsideCopy": [
      "Prince's Island Park, a 50-acre island in the Bow River, anchors the neighbourhood with pathways, gardens, an amphitheatre, and the River Café. The Bow River Pathway runs along the water for kilometres in both directions, and Santiago Calatrava's Peace Bridge carries pedestrians and cyclists across to the north bank. Eau Claire Plaza, reopened in 2025, hosts community events and cultural gatherings at the water's edge."
    ],
    "amenitiesCopy": [
      "The Eau Claire Area Improvement Association represents residents on planning and public-realm issues. Commuting is largely on foot into the core, with quick access south via Centre Street and along 4 and 5 Avenue SW, and west toward Kensington over the river. The Green Line LRT's underground Eau Claire station is under construction on the former market site, set to link the neighbourhood with Chinatown, the East Village, and points south."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit within a short walk. The River Café on Prince's Island is a Calgary institution, while the Kensington district across the Bow River adds boutiques, cafés, and restaurants, and neighbouring Chinatown brings groceries and dim sum. Downtown's Stephen Avenue and The Core shopping centre are a few blocks south, putting full-service retail, banking, and dining within easy reach of every Eau Claire address."
    ],
    "schools": [
      {
        "name": "Connaught School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/connaught"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada"
      }
    ]
  },
  {
    "slug": "lower-mount-royal",
    "story": [
      "Lower Mount Royal is an inner-city community immediately southwest of downtown Calgary, bounded by 12 Avenue SW to the north, Royal Avenue SW to the south, 4 Street SW to the east, and 14 Street SW to the west. 17 Avenue SW - Calgary's Uptown 17 retail and entertainment strip, long nicknamed the Red Mile - runs through the community, putting hundreds of shops, restaurants and bars within a short walk of home.",
      "Annexed to the city in 1907 and platted as part of the C.P.R.'s original Mount Royal subdivision, the district filled in during Calgary's 1910-1912 building boom on fifty-foot lots, many later split into twenty-five-foot parcels of wood-frame housing much like the neighbouring Beltline. Decades of inner-city redevelopment have since layered low-rise condominiums and townhomes over that early streetscape.",
      "Today Lower Mount Royal ranks among Calgary's most walkable city-centre addresses, bordering Upper Mount Royal, Sunalta and the Beltline, and it carries an average sale price on file of $420,438."
    ],
    "realEstateCopy": [
      "Housing in Lower Mount Royal is led by low-rise apartment condominiums and infill townhomes, interleaved with surviving Edwardian and Colonial Revival character houses on the district's original fifty-foot and twenty-five-foot lots. Entry apartments trade well below the community's $420,438 average sale price, while renovated two-bedroom units, larger townhomes and detached character homes carry the upper end. Compact lots, a mature tree canopy and a genuine walk-to-17th location define value here.",
      "Spencer Rivers represents both buyers and sellers throughout Lower Mount Royal and can surface off-market opportunities that never reach the public listing sites."
    ],
    "lifeCopy": [
      "Lower Mount Royal suits urban professionals, downsizers and investors who want a car-optional life steps from the office core. Days run on foot: morning coffee on 17 Avenue, a walk to work across the Beltline, dinner and drinks within blocks of home. The pace is dense and social yet grounded by a century-old residential streetscape, making it one of the few Calgary addresses where a resident can live well without a daily commute."
    ],
    "outsideCopy": [
      "Green space sits close at hand. Tomkins Park anchors the 17 Avenue strip with shaded benches and seasonal gatherings, while the historic gardens at Lougheed House lie just east in the Beltline. The Bow River pathway system and Prince's Island Park are a short ride north, and Sunalta's leafy streets extend the neighbourhood's walking loops to the west."
    ],
    "amenitiesCopy": [
      "The Mount Royal Community Association programs events and green space for the district. Transit is straightforward: the Sunalta CTrain station on the West LRT (Blue Line) sits at the community's northwest edge, and frequent Calgary Transit bus routes run along 14 Street SW and 17 Avenue SW. Drivers reach Crowchild Trail, 14 Street and the downtown core within minutes, keeping commutes short in every direction."
    ],
    "shopDineCopy": [
      "Everyday life centres on Uptown 17 - the 17 Avenue SW retail and entertainment district, with more than 400 shops, boutiques, cafes, bars and restaurants spanning cuisines from Vietnamese and Thai to Italian and Spanish tapas. The 4 Street SW dining district in adjacent Mission and the cafes along 10 Street SW add further options, and Calgary's downtown restaurants and the Core shopping centre are an easy walk northeast."
    ],
    "schools": [
      {
        "name": "Sunalta School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://sunalta.cbe.ab.ca/"
      },
      {
        "name": "Mount Royal School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://mountroyal.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b816/"
      }
    ]
  },
  {
    "slug": "inglewood",
    "story": [
      "Inglewood is Calgary's oldest neighbourhood, founded in 1875 across the Elbow River from Fort Calgary and predating the city itself. It sits in the city centre, wrapped by the Bow River to the north and east, the Inglewood Wildlands and rail corridor to the south, and the Elbow River and 6 Street SE to the west, with the Inglewood Bird Sanctuary anchoring its eastern edge. Ninth Avenue SE runs through its heart as one of Calgary's original main streets.",
      "Once the settlement's trade and rail hub, Inglewood declined through the mid-twentieth century, then rebounded into the arts, culture, and design district it is today. A heritage-protected main street, century homes, and a walkable independent commercial strip give it a texture no newer community can replicate.",
      "The result is one of Calgary's most sought-after inner-city addresses. Homes here trade at a premium to the city as a whole, with an average sale price on file of $886,221, reflecting both restored character houses and high-end infill construction minutes from downtown."
    ],
    "realEstateCopy": [
      "Inglewood's housing stock is a genuine mix: gabled brick-and-clapboard character homes from the early 1900s, sensitive heritage conversions, and contemporary infills and low-rise condos threaded onto mature, tree-lined lots. Detached benchmark values sit in the low $700,000s, while renovated character properties and architect-designed infills carry the average sale price to $886,221 and push well beyond it for larger lots and river-adjacent parcels. Buyers pay for location, walkability, and the scarcity of land in a fully built-out community.",
      "Spencer Rivers represents both buyers and sellers in Inglewood and, through his network, can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Inglewood suits buyers who want an urban, walkable life without a downtown high-rise: professionals, creatives, downsizers, and families drawn to character over square footage. Daily life runs on foot and by bike along 9th Avenue SE, morning coffee at Rosso or Cafe Gravity, dinners at Deane House or The Nash, weekends browsing galleries, record shops, and the community garden. It is a neighbourhood where people know their shopkeepers and stay for decades."
    ],
    "outsideCopy": [
      "Green space defines the community. The Inglewood Bird Sanctuary offers roughly two kilometres of trails and more than 270 recorded bird species, while the adjacent Inglewood Wildlands and Pearce Estate Park add reclaimed grasslands, ponds, and interpretive paths. The paved Bow River Pathway runs along the northern edge, linking cyclists and runners into Calgary's regional network and across to Fort Calgary and the East Village."
    ],
    "amenitiesCopy": [
      "The Inglewood Community Association, founded in 1956, runs programs, events, and a community garden, and maintains a hall and rink for residents. Commuting is straightforward: downtown is minutes across the Elbow River via 9th Avenue SE, with Blackfoot Trail, Deerfoot Trail, and Memorial Drive putting the rest of the city within easy reach. The under-construction Green Line LRT will further improve inner-city transit access."
    ],
    "shopDineCopy": [
      "Ninth Avenue SE is Inglewood's commercial spine and one of Calgary's best independent shopping streets. Retail runs from Smithbilt Hats and Silk Road Spice Merchant to The Next Page bookstore and specialty design shops. Dining is a genuine draw: Rouge and Deane House in heritage buildings, The Nash, Spolumbo's in a 1906 firehouse, plus the time-capsule Blackfoot Truckstop Diner and a growing roster of cafes and vegan spots."
    ],
    "schools": [
      {
        "name": "Colonel Walker School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://colonelwalker.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Bishop Grandin High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "bridgeland-riverside",
    "story": [
      "Bridgeland-Riverside sits on the north bank of the Bow River, directly across from downtown Calgary, with Memorial Drive NE forming its northern edge, the river to the south, 12 Street NE to the east, and Centre Street North to the west. It is one of the city's oldest inner-city communities, first settled by Russian-German immigrants in the 1880s as Germantown, then shaped by waves of Italian and Ukrainian families whose bakeries, delis, and restaurants gave the 1 Avenue NE strip its lasting Little Italy identity.",
      "The community climbs from the flats along the river up to the north bluff, where homes on Tom Campbell's Hill look out over the skyline. Two decades of thoughtful redevelopment have layered modern infills and condominiums over the original heritage housing without erasing the walkable, tree-lined character.",
      "In Calgary's city-centre market, Bridgeland is a sought-after address for buyers who want river-and-skyline proximity, steady demand, and genuine neighbourhood history rather than a generic suburb."
    ],
    "realEstateCopy": [
      "Housing in Bridgeland-Riverside spans early-1900s character homes, Craftsman and Victorian-era cottages, contemporary detached infills, townhomes, and a deep supply of condominiums built around the Bridgeland/Memorial LRT station. Lots on the older streets tend to be compact inner-city parcels, many redeveloped into narrow-lot infills or low-rise multifamily. Prices run a wide band: entry-level condos sit well below the roughly $950,000 community average, while new-build infills and skyline-view detached homes on the north bluff push comfortably past it. Spencer Rivers represents both buyers and sellers throughout Bridgeland-Riverside and can surface off-market opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "Bridgeland suits professionals, downsizers, and families who want to live minutes from the core without giving up a real sense of place. Days here run on foot and by bike: coffee on 1 Avenue NE, a walk up Tom Campbell's Hill, dinner at a neighbourhood table, and a short hop over the river to work or a Flames game. It is dense, social, and unmistakably urban, yet quiet and green once you are off the main strip."
    ],
    "outsideCopy": [
      "Tom Campbell's Hill Natural Park anchors the community's east side with panoramic skyline and river views, while Murdoch Park offers a central green for everyday use. Steps south, the Bow River pathway connects to St. Patrick's Island and St. George's Island, and the Calgary Zoo sits just across the channel. Cyclists and runners reach downtown, Inglewood, and Prince's Island in minutes along the river."
    ],
    "amenitiesCopy": [
      "The Bridgeland-Riverside Community Association runs programming, events, and green space for residents. Transit is a defining advantage: the Bridgeland/Memorial CTrain station on the Blue Line (Route 202) sits in the median of Memorial Drive NE, putting downtown one stop away, with bus routes and quick access to Centre Street, Edmonton Trail, and Deerfoot Trail for drivers heading across the city."
    ],
    "shopDineCopy": [
      "The 1 Avenue NE main street is the heart of Bridgeland's dining scene, from OEB Breakfast and Italian tables like Villa Firenze to independent cafes, bakeries, and wine bars. Everyday grocery, boutique shopping, and services line the strip, and downtown's full retail core plus Inglewood's shops sit minutes away by car, bike, or CTrain."
    ],
    "schools": [
      {
        "name": "Riverside School (formerly Langevin School)",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/riverside"
      },
      {
        "name": "St. Patrick School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/stpatrick"
      },
      {
        "name": "Crescent Heights High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/crescentheights"
      }
    ]
  },
  {
    "slug": "mission",
    "story": [
      "Mission is a city-centre Calgary community on the west bank of the Elbow River, bordered by the river to the west, Macleod Trail to the east, 17 Avenue SW and the Mission Bridge to the north, and Macdonald Avenue SW near 26 Avenue to the south. It grew out of Rouleauville, the French-Catholic village founded around Father Lacombe's mission in the 1880s and annexed by Calgary in 1907. That heritage still shows in the brick row houses, Craftsman and Edwardian homes, and church spires that sit beside newer glass condominiums.",
      "The community centres on 4 Street SW, one of Calgary's most walkable restaurant-and-shopping strips, and on the Elbow River pathways that connect it to downtown a few minutes north. Mission trades on location: an inner-city address within walking distance of the core, the Beltline, and 17 Avenue's Red Mile. For buyers who want a genuinely urban Calgary lifestyle without leaving the river valley, few communities compete on character or convenience."
    ],
    "realEstateCopy": [
      "Mission's housing stock leans heavily condo and apartment, from heritage brick walk-ups to new-build towers along 4 Street SW and the river, layered over a core of century-old single-family homes on compact inner-city lots. That mix pulls the community average sale price to roughly $567,863, though pricing spreads widely: entry-level and investor condos sit well below that line, while riverfront units, penthouses, and renovated character homes reach far above it. The result is one of the more accessible ways into a walkable city-centre address. Spencer Rivers represents both buyers and sellers throughout Mission and Cliff Bungalow, and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Mission suits professionals, downsizers, and urban-minded buyers who want to live without a daily commute or a car dependence. Days here run on foot: coffee on 4 Street, a river-pathway run before work, dinner and drinks a block from home, and the downtown core a short walk or cycle north. It is a dense, social, genuinely walkable community where the street life is part of the appeal, not an afterthought."
    ],
    "outsideCopy": [
      "The Elbow River wraps Mission's edge, and its paved pathways link into Calgary's wider river network for walking, running, and cycling toward downtown and the Bow. Lindsay Park and the surrounding green space give room to picnic and unwind, while the riverbank itself is the community's backyard. The MNP Community & Sport Centre, one of the country's premier aquatic and fitness facilities, sits just across the river."
    ],
    "amenitiesCopy": [
      "The Cliff Bungalow-Mission Community Association anchors local life and runs the 4 Street Lilac Festival each June, one of Calgary's largest street festivals. The MNP Community & Sport Centre offers Olympic pools, diving, and fitness facilities minutes away. Commuting is effortless: Macleod Trail and 17 Avenue SW frame the community, downtown is a short walk or cycle north across the Mission Bridge, and the Erlton/Stampede CTrain station is close by for LRT access."
    ],
    "shopDineCopy": [
      "The 4 Street SW corridor is Mission's commercial heart, dense with independent restaurants, cafes, wine bars, and specialty shops. Standouts include Shokunin, chef Darren MacLean's acclaimed Japanese izakaya, plus Anejo for Mexican and tequila and Fleur de Sel for classic French brasserie fare. Everyday grocery, bakery, and boutique retail line the street, and the bars and eateries of 17 Avenue's Red Mile sit just to the north."
    ],
    "schools": [
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://earlgrey.cbe.ab.ca/"
      },
      {
        "name": "Elbow Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://elbowpark.cbe.ab.ca/"
      },
      {
        "name": "St. Monica School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "Saint Mary's High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "sunnyside",
    "story": [
      "Sunnyside sits on the north bank of the Bow River, directly across the water from downtown Calgary and forming the residential half of the Kensington district. The community runs from 5 Avenue NW down to the Bow River, bounded by Centre Street to the east and 10 Street NW to the west, with the McHugh Bluff escarpment rising just above its northern edge. Two pedestrian crossings, the Peace Bridge and the walkway beside the LRT, put the core within a short stroll or a single CTrain stop.",
      "One of Calgary's oldest neighbourhoods, Sunnyside was settled by homesteaders in the 1880s and absorbed into the city in 1904, first housing Canadian Pacific Railway and Eau Claire sawmill workers. That heritage still shows in its tree-lined streets, worker cottages, and the brick-and-concrete apartment mansions built along Memorial Drive in the 1920s.",
      "Today Sunnyside is one of Calgary's most walkable inner-city communities and a proven redevelopment corridor, drawing urban professionals and downtown executives. With an average sale price near $714,932, it blends heritage value with new density in a way few Calgary quadrants can match."
    ],
    "realEstateCopy": [
      "Sunnyside's housing stock spans more than a century: early 20th-century character cottages and two-storey infills on narrow city lots, 1920s brick apartment mansions along Memorial Drive, mid-century walk-ups, and contemporary low- and mid-rise condominiums clustered near the Sunnyside CTrain platform. Entry-level condos trade from the mid-$100,000s, attached and detached homes generally run from the high $400,000s past $800,000, and new luxury infills reach well into seven figures, placing the community's $714,932 average squarely between its condo and single-family tiers. Spencer Rivers represents both buyers and sellers throughout Sunnyside and Kensington, and can surface off-market opportunities that never reach public MLS listings."
    ],
    "lifeCopy": [
      "Sunnyside suits people who want a genuine urban lifestyle without a commute: downtown professionals, empty nesters trading the suburbs for walkability, and buyers who value character over square footage. Daily life runs on foot, the corner cafe, a five-minute train ride to the office, dinner in Kensington, and evenings on the river pathway. It is a close-knit, established community where neighbours know each other and the car often stays parked."
    ],
    "outsideCopy": [
      "The Bow River pathway runs the length of Sunnyside's southern edge, linking to Prince's Island Park and downtown via the Peace Bridge. McHugh Bluff Park crowns the ridge to the north with sweeping skyline views, while Sunnyside Bank Park and the Bow to Bluff corridor, Bow Landing, Harvest, and Play parks, thread green space, community gardens, and a skatepark through the heart of the neighbourhood."
    ],
    "amenitiesCopy": [
      "The Hillhurst-Sunnyside Community Association anchors community life with programs, an outdoor rink, and the long-running Sunnyside farmers' market. The Sunnyside CTrain station puts residents one stop from downtown, and Memorial Drive, Centre Street, and 10 Street NW give quick vehicle access across the city. Cycling and walking commutes over the Peace Bridge make a car optional for many households here."
    ],
    "shopDineCopy": [
      "Kensington's shops and restaurants sit at Sunnyside's doorstep, concentrated along 10 Street NW and Kensington Road. Residents walk to Pages Books, independent boutiques, coffee houses, and more than two dozen restaurants and pubs, from Red's Diner to Julio Barrios at Memorial Drive and 10 Street. A Safeway beside the CTrain station handles daily groceries, while the district's patios and cafes make Kensington one of Calgary's liveliest inner-city high streets."
    ],
    "schools": [
      {
        "name": "Hillhurst School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://hillhurst.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://queenelizabeth.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth High School",
        "level": "Junior High / High School",
        "area": "CBE public",
        "url": "https://queenelizabethhs.cbe.ab.ca/"
      },
      {
        "name": "Madeleine d'Houet School",
        "level": "Junior High",
        "area": "Calgary Catholic (French immersion)",
        "url": "https://madeleinedhouet.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "hillhurst",
    "story": [
      "Hillhurst is one of Calgary's oldest inner-city communities, established in 1914 on the north bank of the Bow River directly across from downtown. The neighbourhood runs from 5 Avenue NW down to the Bow River, and from 10 Street NW west to 14 Street NW, wrapping around the north side of the Kensington shopping and entertainment district it shares with neighbouring Sunnyside.",
      "Its streets carry Anglo-Saxon names chosen by the community's early English settlers, and the lilac-planted medians along 6 Avenue and Bowness Road survive from Calgary's City Beautiful era. Sandstone landmarks, mature elms, and Riley Park anchor a walkable grid that has aged into one of the city-centre's most desirable addresses.",
      "In Calgary's luxury market, Hillhurst holds a rare position: genuine heritage character, river-and-downtown proximity, and a Kensington main street at the doorstep. Demand from professionals, downsizers, and design-minded buyers keeps well-located character homes and infills competitive year-round."
    ],
    "realEstateCopy": [
      "Hillhurst's housing stock spans a full century, from 1910s sandstone and wartime bungalows to a steady wave of modern infills, semi-detached properties, and boutique condominiums along Kensington Road and 10 Street NW. Lots are generous by inner-city standards, many on tree-lined streets a short walk from the river. Condominium apartments trade broadly from the $200,000s into the $600,000s, while single-family character homes and new custom infills carry the higher end, with an average sale price on file of $1,286,398 reflecting the community's larger detached and luxury-infill product. Spencer Rivers represents both buyers and sellers throughout Hillhurst and can surface off-market opportunities that never reach public listing portals."
    ],
    "lifeCopy": [
      "Hillhurst suits buyers who want to live without a commute: professionals working downtown, empty-nesters trading a suburban lot for walkability, and families drawn to established schools and Riley Park. Daily life runs on foot and by bike, with the Kensington shops, Sunnyside Safeway, riverfront pathways, and the Peace Bridge crossing all within a few blocks. It is one of the few Calgary communities where a car is genuinely optional."
    ],
    "outsideCopy": [
      "Riley Park sits at the community's heart, with its wading pool, cricket pitch, rock garden, and mature shade trees. The Bow River Pathway runs along the southern edge, linking into Calgary's 7.2-kilometre riverfront loop for cyclists, runners, and walkers. The Peace Bridge and Memorial Drive pathways connect directly to Prince's Island Park and the downtown core across the water."
    ],
    "amenitiesCopy": [
      "The Hillhurst Sunnyside Community Association runs a busy hall, sports programming, and a long-standing weekly farmers' market. Transit is a defining advantage: Sunnyside Station puts the C-Train Blue Line steps away, Lions Park Station on the Red Line sits just west, and Memorial Drive, 14 Street NW, and Crowchild Trail give quick vehicle access to SAIT, the University of Calgary, and downtown."
    ],
    "shopDineCopy": [
      "Kensington is Hillhurst's high street, one of Calgary's top destinations for independent shopping and dining, with more than 25 restaurants, cafes, and pubs within a few walkable blocks. Sidewalk Citizen Bakery, The Roasterie, Pages on Kensington bookstore, and the historic Plaza Theatre are neighbourhood fixtures, alongside the Sunnyside Safeway and specialty grocers for everyday needs."
    ],
    "schools": [
      {
        "name": "Hillhurst School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://hillhurst.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://queenelizabeth.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://queenelizabethhigh.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "west-hillhurst",
    "story": [
      "West Hillhurst is an established inner-city community in Calgary's city-centre, sitting on the north bank of the Bow River just west of Kensington and the neighbouring community of Hillhurst. Its boundaries run from 5 Avenue NW on the north down to the Bow River on the south, with 14 Street NW to the east and Crowchild Trail forming the western edge.",
      "The community's roots reach back to homesteads of the 1880s, with subdivision beginning in 1906 on land granted to the Canadian Pacific Railway. Much of West Hillhurst filled in after 1945, when compact post-war Victory Homes went up for returning soldiers. That layering of eras gives the streets their character today: original bungalows and character houses sitting alongside a steady wave of modern luxury infills.",
      "The result is one of Calgary's most sought-after inner-city addresses, prized for river access, walkability to Kensington and downtown, and proximity to the Foothills hospital corridor. Demand stays strong for both heritage homes and new builds."
    ],
    "realEstateCopy": [
      "Housing in West Hillhurst spans post-war Victory bungalows and 1950s character homes through to a large and growing stock of luxury infills, including architect-designed single-family homes and modern semi-detached duplexes. Lots tend to be flat, tree-lined, and walkable to the river, and many teardowns and renovations reflect the community's ongoing redevelopment. Prices range widely with the era and scale of the home, and the average sale price of $1,192,072 reflects a market where updated character homes and new infills command a premium over original stock. Spencer Rivers represents both buyers and sellers in West Hillhurst and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "West Hillhurst suits professionals, downsizers, and families who want an inner-city lifestyle without giving up green space and quiet streets. Daily life leans on proximity: a short walk or cycle to Kensington's shops and cafes, quick access to the Bow River pathway for a morning run, and downtown offices within easy reach. The strong community association and active recreation scene make it a genuinely neighbourly pocket of the city."
    ],
    "outsideCopy": [
      "The Bow River pathway runs the full southern edge of West Hillhurst, linking cyclists and walkers to Prince's Island Park and downtown. West Hillhurst Park offers tennis courts, ball diamonds, and a community playground, while nearby Riley Park adds an outdoor pool, wading pool, cricket pitch, and picnic grounds. Broadview Park along the river hosts local soccer through the warmer months."
    ],
    "amenitiesCopy": [
      "The West Hillhurst Community Association anchors the neighbourhood with a fitness centre, skating and hockey arena, plus tennis, squash, and pickleball courts. Commuting is straightforward: Crowchild Trail on the west edge and Memorial Drive along the river connect quickly to downtown and the northwest, while 14 Street NW runs north to the Trans-Canada. The Foothills Medical Centre and Alberta Children's Hospital sit just to the west."
    ],
    "shopDineCopy": [
      "Kensington, immediately east, is the community's main shopping and dining draw, with more than 250 businesses clustered around Kensington Road and 10 Street NW. Residents walk to spots like Pulcinella for Napoletana pizza, the family-run Kensington Pub, Pages bookstore, and the Kensington Wine Market. Everyday grocery, coffee, and services line 19 Street NW and Kensington Road, and downtown restaurants sit minutes away across the river."
    ],
    "schools": [
      {
        "name": "Hillhurst School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://hillhurst.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth School",
        "level": "Elementary/Junior High",
        "area": "CBE public",
        "url": "https://queenelizabeth.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b806/"
      },
      {
        "name": "Madeleine d'Houet School",
        "level": "Junior High",
        "area": "Calgary Catholic (French bilingual)",
        "url": ""
      }
    ]
  },
  {
    "slug": "altadore",
    "story": [
      "Altadore is one of Calgary's most sought-after inner-city communities, sitting in the southwest just minutes from downtown. Its streets run between 33 Avenue SW to the north and 50 Avenue SW to the south, with Elbow Drive and River Park to the east and Crowchild Trail forming the western edge. The Marda Loop shopping district along 33 Avenue SW anchors the northern boundary, while River Park and Sandy Beach spill down to the Elbow River on the other side.",
      "Established in the mid-1940s to house returning World War II veterans, Altadore grew up as a modest bungalow district before becoming one of the city's defining infill neighbourhoods. Over the past two decades, older 1950s cottages have given way to architect-designed semi-detached and single-family homes, and the community now blends mature trees and wide lots with contemporary luxury construction.",
      "In Calgary's market, Altadore occupies the upper tier of city-centre real estate, prized for its walkability, river access, and proximity to Marda Loop, Garrison Woods, and the downtown core."
    ],
    "realEstateCopy": [
      "Housing in Altadore spans original post-war bungalows, character renovations, and a large and growing stock of modern infill. Newer builds are typically two-storey semi-detached and single-family homes on traditional 25- and 50-foot lots, many with legal suites, developed basements, and rooftop or third-storey city views. The neighbourhood's average sale price sits around $1,615,043, reflecting both the premium land value near River Park and the calibre of new construction, though entry points on attached infill and pricing on full estate homes sit above and below that figure.",
      "Spencer Rivers represents both buyers and sellers throughout Altadore and, through an active network of local builders and homeowners, can surface off-market opportunities before they reach public listings."
    ],
    "lifeCopy": [
      "Altadore suits buyers who want an established, walkable city-centre lifestyle without leaving green space behind — young professionals, growing families, and downsizers trading a larger suburban lot for location. Daily life runs on foot and by bike: a morning coffee in Marda Loop, an off-leash loop through River Park with the dog, a quick commute to the downtown core, and dinner a few blocks from home. The mature tree canopy and quiet interior streets keep the neighbourhood residential despite its proximity to everything."
    ],
    "outsideCopy": [
      "River Park and Sandy Beach define Altadore's eastern edge, giving residents direct access to one of Calgary's most loved outdoor corridors. River Park is a 21-hectare escarpment green space with an expansive off-leash dog park and skyline views over the Elbow River, while Sandy Beach below offers picnic sites, fire pits, and river access for wading and paddling. The Elbow River pathway connects the community into Calgary's broader pathway network for cycling and running."
    ],
    "amenitiesCopy": [
      "The Altadore community is served by the Marda Loop Communities Association, which runs local programming and events, and the Marda Loop Business Improvement Area along 33 Avenue SW keeps everyday services close to home. Commuting is straightforward: Crowchild Trail and 14 Street SW carry traffic to and from downtown in minutes, and the community sits within an easy reach of Calgary Transit bus routes feeding the downtown core and connecting LRT stations."
    ],
    "shopDineCopy": [
      "Marda Loop, along 33 Avenue SW, is Altadore's commercial heart, with more than 130 shops, restaurants, and services. Residents have Blush Lane Organic Market, Shoppers Drug Mart, and Phil & Sebastian Coffee for daily needs, alongside dining that ranges from the long-standing Belmont Diner to Annabelle's Kitchen for Italian. Nearby Garrison Woods and 4th Street SW add further boutiques, cafés, and everyday retail within a short drive or bike ride."
    ],
    "schools": [
      {
        "name": "Altadore School",
        "level": "Elementary (K-6)",
        "area": "CBE public",
        "url": "https://altadore.cbe.ab.ca/"
      },
      {
        "name": "Dr. Oakley School",
        "level": "Grades 3-9 (specialized)",
        "area": "CBE public",
        "url": "https://droakley.cbe.ab.ca/"
      },
      {
        "name": "Lycée International de Calgary",
        "level": "Preschool-Grade 12",
        "area": "Independent (French)",
        "url": "https://www.lycee.ca/"
      },
      {
        "name": "Master's Academy",
        "level": "K-12",
        "area": "Independent",
        "url": ""
      },
      {
        "name": "Rundle Academy",
        "level": "Grades 4-12",
        "area": "Independent",
        "url": "https://www.rundle.ab.ca/"
      }
    ]
  },
  {
    "slug": "garrison-woods",
    "story": [
      "Garrison Woods is a master-planned inner-city community in southwest Calgary, built on the former CFB Calgary Currie Barracks in the city-centre. It sits between Richmond Road SW to the north, 33 Avenue SW to the south, Garrison Crossing to the east, and Crowchild Trail to the west, a short walk from the Marda Loop shopping district and the neighbouring communities of Altadore and South Calgary.",
      "When the military base closed in the late 1990s, Canada Lands Company redeveloped the site on new-urbanist principles, completing roughly 1,500 homes by 2004. Original street names honour the First World War battle honours of Lord Strathcona's Horse and the Princess Patricia's Canadian Light Infantry, and the Garrison Woods Legacy Walk threads 14 battle-honour monuments through the community's tree-lined streets and greens.",
      "Today Garrison Woods ranks among Calgary's most sought-after inner-city communities, valued for its walkability, mature landscaping, and quick access to downtown."
    ],
    "realEstateCopy": [
      "Housing stock spans refurbished former military homes, purpose-built single-family houses, townhouses, villas, and low-rise condominiums, most in a Craftsman and heritage-inspired style with front porches, rear lanes, and detached garages on compact, walkable lots. Prices range widely: condominiums from the low $300,000s, townhouses commonly in the $700,000s to $900,000s, and detached homes frequently near or above $1 million, against a Garrison Woods average sale price of $713,111.",
      "Spencer Rivers represents both buyers and sellers in Garrison Woods and can surface off-market opportunities that never reach the public listings."
    ],
    "lifeCopy": [
      "Garrison Woods suits families, downsizing professionals, and anyone who wants an inner-city address they can live car-light. Days revolve around walkable errands, coffee and dinner in Marda Loop, and easy access to schools, parks, and downtown. Sidewalks, pocket parks, and community gardens knit neighbours together, and the pedestrian-first layout keeps the pace calm while keeping the whole city close."
    ],
    "outsideCopy": [
      "Green space is built into the plan, from pocket parks and community gardens to the interpretive Legacy Walk. Nearby River Park and Sandy Beach offer off-leash areas and riverside trails along the Elbow River, and the regional pathway network links cyclists and runners to downtown and the Glenmore Reservoir beyond."
    ],
    "amenitiesCopy": [
      "The Marda Loop Communities Association runs programs, events, and outdoor rinks for Garrison Woods and its neighbouring communities. Crowchild Trail on the western edge and Richmond Road to the north put downtown roughly ten minutes away and Glenmore Trail within easy reach, while frequent bus service along the Marda Loop corridor connects the community across the city."
    ],
    "shopDineCopy": [
      "Marda Loop, one of Calgary's busiest street-level shopping districts, sits at the community's doorstep along 33 and 34 Avenues SW, with well over 150 boutiques, restaurants, cafes, fitness studios, and everyday services. Everything from grocery runs and morning coffee to patios and neighbourhood dining is within a short walk, no car required."
    ],
    "schools": [
      {
        "name": "Altadore School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://altadore.cbe.ab.ca/"
      },
      {
        "name": "Master's Academy and College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.masters.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "currie-barracks",
    "story": [
      "Currie Barracks is a master-planned new-urbanism community in Calgary's city centre, built on the grounds of the former Canadian Forces Base Calgary and named for General Sir Arthur Currie. It sits bounded by 33 Avenue SW to the north, Flanders Avenue and Lakeview Drive to the south, Crowchild Trail to the east, and Sarcee Trail to the west, roughly ten minutes from downtown.",
      "Developed by Canada Lands Company as the final phase of a transformation that produced Garrison Woods (1996) and Garrison Green (2006), Currie converts an 80-hectare military base into a dense, walkable urban village. The plan drew on new-urbanism design principles and earned a Congress for the New Urbanism Charter Award, and heritage touchpoints like the Officers' Mess and Garrison Square anchor the streetscape.",
      "As one of Canada's largest inner-city redevelopments, Currie holds a distinct position in Calgary's market: a still-building community where new construction, walkability, and proximity to Mount Royal University and Marda Loop command a premium over conventional suburbs."
    ],
    "realEstateCopy": [
      "Housing in Currie Barracks is new-build and architecturally curated, ranging from brownstone-style townhomes and row houses to detached infill homes and low-rise condominiums, most completed from the mid-2010s onward under a coordinated design code. Lots are compact and front-facing, with rear laneways, detached garages, and streetscapes engineered for walkability rather than sprawl. Prices span a wide band, with the community's average sale price near $901,932, reflecting a mix of entry-level condos and larger single-family and executive homes. Spencer Rivers represents both buyers and sellers in Currie Barracks and can surface off-market and pre-construction opportunities as new phases release."
    ],
    "lifeCopy": [
      "Currie Barracks suits professionals, downsizers, and families who want an urban, low-maintenance lifestyle within reach of downtown. Daily life is walk-first: residents move between coffee shops, parks, and Mount Royal University on foot, with grocery runs and errands close at hand. The community's density and design foster a present, social street life, appealing to buyers who value proximity and connection over large lots and long commutes."
    ],
    "outsideCopy": [
      "Green space is built into Currie's plan. Alexandria Park anchors the community with woodland exercise loops, a dog park, and a splash-and-skating feature, while Valour Park, Garrison Square, and the historic Officers' Garden offer smaller gathering spots. Regional pathways connect residents toward the Glenmore Reservoir, North Glenmore Park, and the wider Calgary bikeway network for cycling and running."
    ],
    "amenitiesCopy": [
      "The Currie Barracks, Lincoln Park and Rutland Park community association programs local recreation and events. Commuting is straightforward: Crowchild Trail and Sarcee Trail bound the community and feed Glenmore Trail and downtown, while Calgary Transit bus routes serve the area and connect to the CTrain network. Mount Royal University sits directly south, adding campus recreation and library access within walking distance."
    ],
    "shopDineCopy": [
      "Marda Loop, one of Calgary's most active inner-city shopping districts, sits just east across Crowchild Trail with independent cafes, pubs, and specialty retailers. Within Currie itself, The Inn on Officers' Garden and its Dining Room serve locally sourced cuisine, and Veranda at The Stables pairs food with Vaycay Brew Co and Burwood Distillery. Westhills Towne Centre to the southwest covers big-box shopping and everyday essentials."
    ],
    "schools": [
      {
        "name": "Altadore School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/altadore/"
      },
      {
        "name": "Clear Water Academy",
        "level": "K-12",
        "area": "Independent Catholic",
        "url": "https://www.clearwateracademy.com/"
      },
      {
        "name": "Alberta Classical Academy",
        "level": "K-9",
        "area": "Charter",
        "url": ""
      },
      {
        "name": "Master's Academy and College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.masters.ab.ca/"
      },
      {
        "name": "Bishop Carroll High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/bishopcarroll/"
      }
    ]
  },
  {
    "slug": "scarboro",
    "story": [
      "Scarboro is a small inner-city Calgary community set on the escarpment above downtown, bounded by Bow Trail SW to the north, 17 Avenue SW to the south, 14 Street SW to the east, and Crowchild Trail to the west. Laid out beginning in 1910 as one of the city's first planned garden suburbs, its curving, tree-lined streets and irregular lots were shaped with input from the Olmsted Brothers, the firm behind New York's Central Park. By 1921 the district had taken the Scarboro name, setting it apart from neighbouring Sunalta.",
      "More than a century on, the character holds. Early property restrictions known as the Anderson Caveat kept commercial development out, and the community remains almost entirely residential, quiet, and walkable. The Scarboro Community Association, founded in 1934, still anchors local life. Homes here trade on heritage, escarpment views, and downtown proximity rather than square footage alone, which places Scarboro firmly among Calgary's established city-centre luxury enclaves alongside communities like Sunalta, Bankview, and Mount Royal."
    ],
    "realEstateCopy": [
      "Scarboro's housing stock is defined by well-preserved character homes built through the early 1900s, with Colonial Revival, Tudor, and Craftsman styles the most common, set on generous, mature lots along winding streets. Newer custom infills appear too, but the heritage streetscape stays intact. Prices generally run from roughly $1.2 million to $3.5 million and up depending on lot, view, and finish, with recent activity centred around the community's $1,446,250 average sale price. Spencer Rivers represents both buyers and sellers in Scarboro and, through his network of city-centre owners, can often surface off-market opportunities before they reach the public listings."
    ],
    "lifeCopy": [
      "Scarboro suits buyers who want a calm, established address without leaving the core, professionals, downsizers, and families drawn to heritage homes and a genuine sense of neighbourhood. Days here are unhurried: walks under mature trees, a downtown commute measured in minutes, and easy access to 17 Avenue's shops and restaurants. With no through-commercial traffic inside the community and an active association, it reads as a quiet residential pocket that still sits at the centre of the city."
    ],
    "outsideCopy": [
      "Green space is woven through the community, with five parks including Triangle Park, which has kept its original layout since the neighbourhood was first laid out. At the eastern base, Royal Sunalta Park offers playgrounds, open lawns, and the tennis courts of the Calgary Tennis Club. The Bow River pathway network and Edworthy Park sit a short ride west, opening kilometres of paved trails for cycling, running, and riverside walks."
    ],
    "amenitiesCopy": [
      "The Scarboro Community Association, active since 1934, runs local programming and one of Calgary's longest-standing community preschools at Sunalta School. Commuting is straightforward: the Sunalta CTrain station sits just south of the community for a direct ride into downtown and out to the University of Calgary, while Crowchild Trail, Bow Trail SW, and 14 Street SW link quickly to Memorial Drive, the Trans-Canada Highway, and Glenmore Trail."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit right at the doorstep along 17 Avenue SW, Calgary's Red Mile, with its concentration of restaurants, cafes, coffee shops, and boutiques a short walk south. Downtown's core amenities are minutes east, and neighbouring Sunalta and Bankview add further local options. The result is a quiet residential setting with the full range of inner-city services close at hand rather than a drive away."
    ],
    "schools": [
      {
        "name": "Sunalta School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://sunalta.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b816/"
      }
    ]
  },
  {
    "slug": "rideau-park",
    "story": [
      "Rideau Park is one of Calgary's smallest and most private inner-city communities, wrapped by a bend of the Elbow River in the city-centre and bordered by 26 Avenue SW to the north, Erlton Place SW to the south, Macleod Trail to the east, and the river itself to the west. Water on three sides gives it the feel of a green peninsula minutes from the shops and restaurants of Mission's 4th Street.",
      "Established in 1911, the community takes its name from the French word for curtain, a nod to the mature tree canopy that screens its winding streets. Land developer Dr. Neville Lindsay began a river-ridge estate here in the early 1900s, and remnants of that ambition still mark the area's heritage character alongside Edwardian, Tudor Revival, and Colonial Revival homes.",
      "Tightly held and rarely traded, Rideau Park sits firmly in Calgary's upper luxury tier. Alongside neighbouring Roxboro, Elbow Park, and Mount Royal, it draws buyers who want river frontage, walkability, and downtown access in a single address."
    ],
    "realEstateCopy": [
      "Housing in Rideau Park runs from restored century-old character homes on established, tree-lined lots to custom infills and contemporary rebuilds sited to capture Elbow River views. Lots tend to be generous by inner-city standards, and river-facing positions are among the most coveted in the city-centre. With an average sale price near $1,684,467, values sit well above the Calgary mean and reflect the community's scarcity, location, and heritage streetscape. Turnover is low, so much of the best inventory moves quietly. Spencer Rivers represents both buyers and sellers in Rideau Park and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Rideau Park suits buyers who want a quiet, walkable enclave without giving up proximity to the core. Professionals, downsizers, and established families are drawn to the short walk into Mission, the river pathways at the doorstep, and streets calm enough that neighbours actually know one another. Daily life leans toward morning runs along the Elbow, coffee on 4th Street, and an easy commute into downtown Calgary."
    ],
    "outsideCopy": [
      "The Elbow River wraps three sides of the community, feeding directly into the city's pathway network for walking, running, and cycling. Elbow Island Park sits just across the water between Rideau Park and Mission, and the pathways connect south toward Stanley Park and the Roxboro natural areas. Pedestrian bridges over the Elbow keep the whole riverside system a few steps from home."
    ],
    "amenitiesCopy": [
      "The Rideau Roxboro Community Association anchors local events and green-space stewardship for the area. Commuting is straightforward: Macleod Trail runs the eastern edge for a quick route downtown or south, 4th Street SW and Elbow Drive feed the core, and the Red Line CTrain at Erlton/Stampede station puts light rail within easy reach for a car-free trip into the city centre."
    ],
    "shopDineCopy": [
      "Mission's 4th Street SW district sits a few minutes north, with more than 300 shops and restaurants. Nearby favourites include Mercato and Peasant Cheese for Italian dining and artisanal provisions, Shokunin for izakaya-style Japanese, and Vin Room for wine and small plates. The 4th Street BIA corridor covers cafes, spas, and specialty grocers, while downtown Calgary's full retail core is a short drive or CTrain ride away."
    ],
    "schools": [
      {
        "name": "Rideau Park School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/rideaupark/Pages/default.aspx"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/Pages/default.aspx"
      }
    ]
  },
  {
    "slug": "roxboro",
    "story": [
      "Roxboro is a 60-home riverside enclave at the southern edge of Mount Royal, tucked into a bend of the Elbow River in Calgary's city centre. Laid out in 1923 with graceful curved streets rather than a grid, it sits bounded by 26 Avenue SW to the north, the Mission Bridge and Elbow River to the south, Macleod Trail to the east, and Mount Royal to the west. Roxboro Park and the river pathway wrap its edges, giving residents water on their doorstep minutes from downtown.",
      "One of Calgary's earliest prestige communities, Roxboro was built for the city's upper class and has held that standing for a century. Mature elms canopy the streets, lots are generous, and the housing runs from restored 1920s character homes to substantial custom rebuilds. Paired with neighbouring Rideau, it forms one of the smallest and most tightly held pockets in the inner city.",
      "With an average sale price near $2.5 million and only a few dozen homes, Roxboro trades rarely and holds value. It ranks among Calgary's wealthiest neighbourhoods and sits alongside Mount Royal, Elbow Park, and Rideau at the top of the city-centre luxury market."
    ],
    "realEstateCopy": [
      "Roxboro's housing stock spans stately early-20th-century homes with original hardwood, crown moulding, and grand staircases, alongside larger contemporary custom builds on the community's deepest lots. Wide, curving streets and mature landscaping give the enclave a settled, estate feel that newer inner-city districts can't replicate. Prices typically range from the high $1 millions to well past $4 million, with the roughly $2,499,900 average reflecting the mix of heritage character homes and full custom rebuilds. Riverfront and river-view lots command the strongest premiums.",
      "With only about 60 homes, inventory is thin and turnover is quiet. Spencer Rivers represents both buyers and sellers in Roxboro and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Roxboro suits established buyers who want privacy, river frontage, and a walkable downtown-fringe address without leaving the inner city. Daily life leans quiet and residential: morning walks along the Elbow River pathway, a short drive or cycle to the office towers, and evenings out on 4th Street SW. It appeals to professionals, downsizing families, and long-tenured owners who value the community's scale, mature streetscape, and enduring prestige over new construction."
    ],
    "outsideCopy": [
      "The Elbow River wraps the community's edge, feeding directly into Calgary's regional pathway network for walking, running, and cycling. Roxboro Park and the adjacent Rideau green space sit within the enclave, and Stanley Park's playgrounds, tennis courts, wading pool, and off-leash areas lie just across the river. Lindsay Park and the MNP Community & Sport Centre are a short distance downstream for year-round recreation."
    ],
    "amenitiesCopy": [
      "The Rideau-Roxboro Community Association operates neighbourhood tennis courts and an outdoor skating rink and organizes local events. Commuting is quick: Macleod Trail and 4th Street SW feed straight into the downtown core, Mission Road and the Mission Bridge connect south and east, and the Erlton/Stampede and Victoria Park CTrain stations on the Red Line put light rail within easy reach for a car-free ride into the centre."
    ],
    "shopDineCopy": [
      "The Mission district and 4th Street SW sit directly across the Elbow River, giving Roxboro one of Calgary's best walkable dining strips. Nearby favourites include Mercato for Italian, Peasant Cheese, La Boulangerie, and Joyce on 4th. The Roxboro River Shoppes at 4 Street and Mission Road cover everyday errands, and Britannia Plaza's boutiques and Sunterra Market are a few minutes south."
    ],
    "schools": [
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://earlgrey.cbe.ab.ca/"
      },
      {
        "name": "Rideau Park School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://rideaupark.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "pump-hill",
    "story": [
      "Pump Hill is Calgary's south-central luxury cluster, a quiet estate enclave in the city's south quadrant that ranks among its most affluent addresses. The community sits against the Glenmore Reservoir to the north, with 90 Avenue SW to the south, 14 Street SW to the east, and Elbow Drive anchoring the west side. Curving, tree-lined streets and generous lots set the tone, and the reservoir and its pathways give the northern edge a rare waterfront-park backdrop.",
      "Development began in 1967 as part of neighbouring Palliser, and Pump Hill was recognized as its own community in 1991. That timeline shows in the housing: a mix of established 1970s and 1980s estate builds alongside newer custom homes and infill on some of the largest private lots in southwest Calgary.",
      "With an average sale price of $1,641,780 and top-tier properties reaching well past $8 million, Pump Hill holds a firm place at the upper end of Calgary's market, favoured by executives and established families who want space, privacy, and proximity to the Elbow Drive corridor and downtown."
    ],
    "realEstateCopy": [
      "Housing in Pump Hill is dominated by detached estate homes on oversized lots, many measuring well beyond the city norm and screened by mature landscaping. Architecture spans original 1970s and 1980s custom builds, extensively renovated mid-century estates, and newer luxury homes replacing older stock. Prices range broadly, from attached and smaller detached properties near $740,000 to marquee estates above $8 million, with the community average of $1,641,780 reflecting the depth of the detached market. The most sought-after homes cluster toward the Glenmore Reservoir, trading on privacy and green-space frontage.",
      "Spencer Rivers represents both buyers and sellers throughout Pump Hill and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Pump Hill suits established professionals, executives, and families who want an estate lot and quiet streets without leaving the city core behind. Daily life leans low-key and residential: short drives to reservoir pathways and parks, quick access to private and public schools, and an easy run to Chinook Centre or downtown. It is a settled, unhurried community where neighbours stay for decades and privacy is part of the appeal."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines Pump Hill's outdoor life. The regional pathway network links directly to South Glenmore Park and North Glenmore Park, with more than 20 kilometres of trails, the Weaselhead Flats natural area, sailing and rowing on the water, tennis courts, and cycling and walking routes along the shoreline. Heritage Park Historical Village sits nearby on the reservoir's west side."
    ],
    "amenitiesCopy": [
      "Pump Hill is served by the Palliser Bayview Pumphill Community Association, which runs local events and programming. Commuting is straightforward: Elbow Drive and 14 Street SW carry traffic north toward the core, while Glenmore Trail and 90 Avenue SW connect east-west across the south. Chinook and Heritage CTrain stations on the Red Line sit a short drive east for downtown access without the car."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining centre on Glenmore Landing at 90 Avenue and 14 Street SW, anchored by Safeway and home to Starbucks, Good Earth Coffeehouse, boutiques, and services right at the community's northeast edge. Chinook Centre and Southcentre Mall, two of Calgary's largest retail and restaurant destinations, are both a short drive away, adding department stores, cinemas, and a wide range of dining."
    ],
    "schools": [
      {
        "name": "Nellie McClung School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://nelliemcclung.cbe.ab.ca/"
      },
      {
        "name": "John Ware School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://johnware.cbe.ab.ca/"
      },
      {
        "name": "Henry Wise Wood High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://henrywisewood.cbe.ab.ca/"
      },
      {
        "name": "Calgary French & International School",
        "level": "Independent",
        "area": "Independent",
        "url": "https://www.cfis.com/"
      },
      {
        "name": "Cedarbrae School",
        "level": "Elementary",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "St. Benedict School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "patterson",
    "story": [
      "Patterson sits on Calgary's western escarpment, a west-side community defined by the ridge it's built on. The land drops roughly 300 feet toward the Bow River valley, and homes along the rim look north across the river and east to the downtown skyline. Sarcee Trail forms the eastern edge, Bow Trail SW the north, Old Banff Coach Road the south, and 85 Street SW the west, with Paskapoo Slopes and Patterson Woods wrapping the community's green flank.",
      "Established in 1983 on land that was once acreage held by the Patterson family, the community grew into a settled, tree-lined enclave. It earned a footnote in the city's history when Patterson Heights served as the media village for the 1988 Winter Olympics; those units were later converted to condominiums and became some of the neighbourhood's first homes. Today Patterson reads as one of west Calgary's quieter established addresses, sitting above the busier commercial corridors of Signal Hill and West Springs.",
      "In Calgary's market, Patterson holds a position most west-side communities can't match: mature landscaping, genuine topography, and skyline views within a fifteen-minute drive of downtown."
    ],
    "realEstateCopy": [
      "Patterson's housing stock spans the spectrum, which is part of its appeal. Original 1980s and 1990s single-family homes on generous, contoured lots share the ridge with townhomes, well-run condominium complexes, and a newer tier of high-end custom builds in Prominence Point, where architects have leaned into the escarpment to capture river-valley and mountain views. The average sale price sits near $764,791, but the range is wide, entry-level condos open the community to first buyers, while ridge-perched estate homes command well into seven figures. Lot character varies with the terrain: walkout basements, tiered yards, and view exposures are common along the rim.",
      "Spencer Rivers represents both buyers and sellers in Patterson and regularly surfaces off-market opportunities on the ridge before they reach the MLS."
    ],
    "lifeCopy": [
      "Patterson suits buyers who want a quiet, established address without trading away proximity to the core. It draws professionals, downsizers, and families who value mature streets and topography over new-build sameness. Daily life leans low-key: morning walks along the escarpment paths, a short commute down Bow Trail, and weekends spent close to the river valley. The mix of condos, townhomes, and estate homes means residents can move within the community as their needs change without leaving the neighbourhood or its views behind."
    ],
    "outsideCopy": [
      "The escarpment is Patterson's backyard. Patterson Woods and the Paskapoo Slopes form a wooded corridor that connects, via a pedestrian underpass beneath Sarcee Trail, to Edworthy Park and the Bow River pathway. The Douglas Fir Trail runs the wooded ridge below, threading past a rare stand of old-growth Douglas firs several centuries old. Within the community, quiet crescents, playgrounds, and ridge-top lookouts give residents everyday access to some of west Calgary's best river-valley terrain."
    ],
    "amenitiesCopy": [
      "The Patterson Heights Community Association runs local programming and events for residents. Commuting is a genuine strength: Bow Trail SW carries drivers downtown in roughly fifteen minutes, while Sarcee Trail links north to Market Mall, Crowfoot, and the Trans-Canada, and south toward Signal Hill and 17 Avenue SW. The 69 Street SW LRT station, terminus of the West Line (Blue Line), sits just beyond the community's southwest edge, putting car-free downtown access within easy reach."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes away on every side. Aspen Landing Shopping Centre and West Springs Village to the southwest offer grocers, cafes, and sit-down restaurants, while Signal Hill Centre and Westhills to the south cover big-box retail, groceries, and services. Across the river via Sarcee Trail, Market Mall adds full-scale shopping and dining. For quick trips, the commercial nodes along Bow Trail put coffee, pharmacies, and essentials close at hand."
    ],
    "schools": [
      {
        "name": "Patterson School",
        "level": "Elementary",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Bowness High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/bowness"
      },
      {
        "name": "Calgary Christian School",
        "level": "K-12",
        "area": "Independent (Palliser)",
        "url": "https://www.calgarychristianschool.com/"
      }
    ]
  },
  {
    "slug": "eagle-ridge",
    "story": [
      "Eagle Ridge is south Calgary's smallest luxury enclave, an affluent pocket of roughly 400 residents set on a peninsula that pushes into the Glenmore Reservoir. The community runs along 14 Street SW, with the reservoir wrapping its north, west, and south edges, so water and parkland form most of its borders rather than other neighbourhoods. Heritage Park Historical Village sits directly to the west on the bank, and Rockyview General Hospital anchors the north side.",
      "Developed in the 1960s, Eagle Ridge was laid out as an estate community from the start, and it has stayed that way: fewer than 100 detached homes, no through-traffic, and almost no turnover in a given year. Kelvin Grove, Bel-Aire, and Mayfair sit nearby to the east and south, but the reservoir keeps Eagle Ridge quietly separate.",
      "It remains one of Calgary's most expensive and least available neighbourhoods. Listings are rare, seven-figure prices are the floor, and when a property does trade it draws attention across the city's luxury market."
    ],
    "realEstateCopy": [
      "Eagle Ridge's housing stock is a mix of original 1960s and 1970s executive homes, thoughtfully modernized mid-century residences, and new custom builds on some of the largest private lots in the inner southwest. Reservoir- and Heritage Park-facing sites command the strongest premiums, with mature trees, wide frontages, and long-held ownership defining the streetscape. The average sale price on file is $6,900,000, and values range from well under two million for entry properties to eight figures for waterfront estates, reflecting how much lot, view, and rebuild potential drive price here.",
      "Because so few homes change hands, timing and relationships matter. Spencer Rivers represents both buyers and sellers in Eagle Ridge and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Eagle Ridge suits buyers who want privacy, space, and water at their doorstep without leaving the city. It draws established families, executives, and downsizers trading square footage for setting. Days are quiet — no cut-through traffic, neighbours who stay for decades, and reservoir views from many homes. Downtown Calgary and the Rockyview hospital campus are both minutes away, so the seclusion never comes at the cost of convenience."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines outdoor life here. A roughly 16-kilometre pathway loops the water for walking, running, and cycling, and the adjacent Glenmore Sailing Club, Calgary Rowing Club, and Weaselhead Flats natural area put sailing, paddling, and birdwatching within reach. Heritage Park Historical Village sits on the western shore, and North Glenmore Park adds open green space just across the water."
    ],
    "amenitiesCopy": [
      "The Eagle Ridge Community Association organizes local events and represents residents on planning matters. Commuting is straightforward: 14 Street SW and Elbow Drive feed north toward downtown, while Glenmore Trail runs east-west across the city's south and connects to Crowchild and Deerfoot Trail. Rockyview General Hospital is immediately north, and Chinook Centre with its Red Line CTrain station sits a short drive east."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining centre on Glenmore Landing, about five minutes away, with grocery, pharmacy, and restaurants along the reservoir's east side. Chinook Centre, one of Calgary's largest malls, offers full retail and dining a few minutes farther east, and the boutiques and eateries of Britannia Plaza on Elbow Drive add an upscale local option to the north. Downtown's restaurant scene is a quick commute."
    ],
    "schools": [
      {
        "name": "Calgary French & International School",
        "level": "K-12 (IB, French immersion)",
        "area": "Independent",
        "url": "https://www.cfis.com/"
      },
      {
        "name": "École Chinook Park School",
        "level": "Elementary (K-6)",
        "area": "CBE public",
        "url": "https://chinookpark.cbe.ab.ca/"
      },
      {
        "name": "Cedarbrae School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://cedarbrae.cbe.ab.ca/"
      },
      {
        "name": "Henry Wise Wood High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b836/"
      }
    ]
  },
  {
    "slug": "mayfair",
    "story": [
      "Mayfair is a small, low-profile enclave in Calgary's city-centre southwest, holding the high ground between Elbow Drive on the east and the Glenmore Reservoir on the west. Bel-Aire sits directly to the north and Glenmore Trail marks the southern edge, with the 14 Street SW flyover and Heritage Park just beyond. Downtown is roughly six kilometres north, about a 15-minute drive up Elbow Drive.",
      "The community was established in 1957, one of the postwar estate districts laid out for Calgary's affluent families on generous, mature lots. In the way Pump Hill anchors the reservoir's southwest side, Mayfair holds the northeast shoulder — quieter, smaller, and every bit as private, with low-traffic streets, deep setbacks, and a mature tree canopy running down toward the shoreline.",
      "Mayfair real estate is almost entirely single-family detached, and turnover is low; homes here are held for decades, so listings stay scarce. That scarcity, combined with the reservoir setting and a genuine city-centre address, keeps Mayfair among the strongest-value pockets in southwest Calgary."
    ],
    "realEstateCopy": [
      "Mayfair's housing stock runs from well-kept mid-century bungalows and side-splits on their original large lots to fully rebuilt custom homes and estate-scale two-storeys. Lots are wide and deep by city-centre standards, many sloping toward the reservoir and its tree line. With an average sale price near $1,450,000, entry to the community generally starts in the low seven figures, while renovated and newly built estate homes reach well beyond that. Because Mayfair rarely comes to market, timing matters — Spencer Rivers represents both buyers and sellers here and can surface off-market opportunities before they reach public search."
    ],
    "lifeCopy": [
      "Mayfair suits families and established professionals who want a quiet, low-density address without leaving the city core. Days here run unhurried — a walk down to the reservoir pathway, a short commute to downtown offices, tennis and skating available within the community itself. The streets carry little through-traffic, neighbours tend to stay for the long term, and the overall pace leans residential and private rather than busy or transient."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir sits at Mayfair's doorstep, with the North Glenmore Park pathways, the reservoir's sailing and rowing waters, and the Elbow River pathway system all within reach. Mayfair Park provides green space inside the community, while Heritage Park, the Calgary Golf and Country Club, and Earl Grey Golf Course are all minutes away. Runners and cyclists connect directly into Calgary's regional pathway network from the shoreline."
    ],
    "amenitiesCopy": [
      "The Mayfair Bel-Aire Community Association serves the neighbourhood with playgrounds, private tennis courts, an outdoor skating rink, and fitness equipment. Commuting is straightforward: Elbow Drive runs north to downtown in about 15 minutes, while Glenmore Trail and the 14 Street SW flyover give quick east-west access across the city and out to Crowchild and Deerfoot Trails. The Chinook CTrain station on the Red Line is a short drive east."
    ],
    "shopDineCopy": [
      "Britannia Plaza, just north up Elbow Drive, is the neighbourhood's everyday hub — Sunterra Market for groceries, alongside cafés and restaurants including Brown's Socialhouse and the long-running Suzette Bistro. CF Chinook Centre, one of Calgary's largest malls with more than 250 shops and restaurants, is minutes to the east, and the boutiques and dining of Marda Loop and 4th Street SW are a short drive north."
    ],
    "schools": [
      {
        "name": "Chinook Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://chinookpark.cbe.ab.ca/"
      },
      {
        "name": "Woodman School",
        "level": "Junior High",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      },
      {
        "name": "Elboya School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://elboya.cbe.ab.ca/"
      },
      {
        "name": "Earl Grey School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://earlgrey.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "discovery-ridge",
    "story": [
      "Discovery Ridge is a southwest Calgary community set along the banks of the Elbow River on the city's western edge. It is bordered by Griffith Woods to the south, Highway 8 and Discovery Ridge Way SW to the north, Sarcee Trail to the east, and Discovery Ridge Boulevard to the west. Its defining feature is Griffith Woods Park, a 93-hectare natural environment park of mature white spruce forest and wetlands, once the Griffith family homestead and donated to the City of Calgary in 2000.",
      "Established in the 1990s and largely built out through the 2000s, Discovery Ridge grew as a low-density forested enclave rather than a dense suburb. It is one of the few Calgary neighbourhoods where estate lots back directly onto protected parkland, and it sits among the city's sought-after west communities alongside Springbank Hill, West Springs, and Aspen Woods.",
      "With detached homes trading well above the citywide average and a limited, tightly held inventory, Discovery Ridge holds a firm position in Calgary's luxury west-side market."
    ],
    "realEstateCopy": [
      "Discovery Ridge real estate spans estate single-family homes, executive townhomes, villas, and apartment condominiums. Most detached homes are custom and semi-custom builds from the late 1990s through the 2000s, favouring two-storey and walkout designs on treed, ravine, and river-facing lots. Against a community average sale price near $926,642, estate homes backing onto Griffith Woods command premiums well into seven figures, while villas and condominiums open a lower entry point into the neighbourhood.",
      "Spencer Rivers represents both buyers and sellers in Discovery Ridge and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Discovery Ridge suits families, established professionals, and downsizers who want acreage-style quiet and daily contact with nature without leaving the city. Residents trade denser streetscapes for forested lots, river trails, and a strong sense of community, while keeping a short drive to downtown, west-side schools, and Calgary's major commuter routes. It is a settled, owner-occupied enclave where homes turn over infrequently and neighbours tend to stay."
    ],
    "outsideCopy": [
      "Griffith Woods Park anchors outdoor life here, with paved and natural pathways winding through white spruce forest and wetlands along the Elbow River. Residents walk, run, and cycle a connected trail network, spot deer and songbirds year-round, and reach the wider Elbow River pathway system directly from the community. Three golf courses and the Rocky Mountain foothills sit within a short drive west."
    ],
    "amenitiesCopy": [
      "The Discovery Ridge Community Association supports local events and green space, while the nearby Westside Recreation Centre offers pools, rinks, and fitness facilities. Commuters reach the rest of Calgary quickly via Stoney Trail, Glenmore Trail, Sarcee Trail, 69 Street SW, and Bow Trail, with downtown roughly 15 to 18 minutes away. Calgary Transit routes connect the community to the west-side network."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes north and east. West 85th in West Springs gathers more than forty local restaurants, cafes, pubs, and services, while Aspen Landing offers upscale boutiques and grocery. Signal Hill Centre and West Hills add big-box retail, grocers, and national chains, and Aspen Woods and West Springs provide additional restaurants and professional services within a short drive."
    ],
    "schools": [
      {
        "name": "Griffith Woods School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://griffithwoods.cbe.ab.ca/"
      },
      {
        "name": "Olympic Heights School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://olympicheights.cbe.ab.ca/"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://ernestmanning.cbe.ab.ca/"
      },
      {
        "name": "Webber Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.webberacademy.ca/"
      }
    ]
  },
  {
    "slug": "west-springs",
    "story": [
      "West Springs is a family-dense residential community on Calgary's west side, framed by Bow Trail SW to the north, 17 Avenue SW to the south, 69 Street SW to the east, and 85 Street SW to the west. Annexed to the city in 1995 and established in 2001, it grew from Springbank farmland into one of the west quadrant's most sought-after addresses, sitting a short walk from Aspen Woods and directly adjacent to Cougar Ridge, Wentworth, and Springbank Hill.",
      "The community pairs a young, master-planned street layout with mature landscaping, wide boulevards, and a walkable commercial core along 85 Street SW. Its western edge opens onto the estate acreages of Springbank, giving West Springs a semi-rural horizon rare this close to downtown. With an average sale price of $726,544, it holds a firm position in Calgary's upper-middle and luxury market, drawing families who want new-build quality, top-tier schools, and quick access to the mountains without leaving the city."
    ],
    "realEstateCopy": [
      "Housing in West Springs runs from the early 2000s forward, and the stock is overwhelmingly single-family detached, with a measured share of townhomes and executive attached homes. Architecture skews to two-storey traditional and transitional builds on generous, fully serviced lots, many with walkout basements backing onto green space. Entry townhomes and starter homes trade below the $726,544 community average, while custom estates along the western edge and near West Springs School push well past it into the $1M-plus tier.",
      "Spencer Rivers represents both buyers and sellers throughout West Springs and can surface off-market opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "West Springs suits families and professionals who want a newer home, strong schools, and an easy exit to Kananaskis and Banff. Days here revolve around the school run, the pathway network, and the cafes and patios along 85 Street SW. It is quiet and residential at its core yet minutes from Canada Olympic Park, making it a natural fit for active households who ski, bike, and value being packed and on the highway within the hour."
    ],
    "outsideCopy": [
      "West Springs Park anchors the community with playgrounds, sports fields, and open picnic space, linked by interconnected walking and cycling pathways and toddler-friendly play areas throughout the neighbourhood. Canada Olympic Park sits just to the north for skiing, snowboarding, mountain biking, and zip-lining, while the Springbank countryside and the Rocky Mountain foothills open up immediately west along the Trans-Canada Highway."
    ],
    "amenitiesCopy": [
      "The West Springs and Cougar Ridge Community Association programs local events, sport, and green space for residents. Commuting is straightforward: Bow Trail SW and 17 Avenue SW feed east toward downtown in roughly 15 minutes, while 69 Street SW connects north to the Trans-Canada Highway and Stoney Trail's ring road for fast cross-city and mountain-bound travel. Canada Olympic Park and the west-side recreation corridor are minutes away."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit inside the community at West Springs Landing and the West 85th district on 85 Street SW, anchored by Calgary Co-op, No Frills, Shoppers Drug Mart, Starbucks, and Tim Hortons, with more than 45 tenants across the two centres. Restaurants include Vin Room West, Mercato West, Una Pizza + Wine, and Blanco Cantina, and nearby Aspen Landing adds further boutique retail, services, and dining a short drive south."
    ],
    "schools": [
      {
        "name": "West Springs School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westsprings/"
      },
      {
        "name": "West Ridge School",
        "level": "Grade 5-9",
        "area": "CBE public",
        "url": "https://westridge.cbe.ab.ca/"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://ernestmanning.cbe.ab.ca/"
      },
      {
        "name": "Webber Academy",
        "level": "K-12 Independent",
        "area": "Independent",
        "url": "https://www.webberacademy.ca/"
      }
    ]
  },
  {
    "slug": "bayview",
    "story": [
      "Bayview is one of Calgary's smallest and most affluent communities, occupying a wooded peninsula that reaches into the southern shore of the Glenmore Reservoir in the city's southwest. It sits directly north of Heritage Park Historical Village and neighbours Palliser, Pump Hill and Oakridge, with access running in from Palliser Drive SW off Elbow Drive and 14 Street SW.",
      "Established in 1967 and built almost entirely by Alcan Design Homes, Bayview welcomed its first residents in early 1968. The community was laid out with front-attached garages, no rear laneways and only a handful of through roads, giving its tree-lined streets a private, deliberate feel. American Colonial is the signature architecture, joined by Spanish, Tudor and mid-century Modern designs.",
      "With so few lots and long-tenured owners, Bayview trades quietly and ranks among the most exclusive addresses in south Calgary."
    ],
    "realEstateCopy": [
      "Bayview is an estate community at heart — original mid-century bungalows and two-storey homes set on oversized, mature lots, many of them walkouts backing directly onto the Glenmore Reservoir. Luxury apartment residences and attached villas hold the community's roughly $641,813 average sale price within reach, while renovated and reservoir-backing estates regularly trade between $1.5M and $3M and beyond. Turnover is thin and the best sites rarely reach open marketing. Spencer Rivers represents both buyers and sellers in Bayview and can surface off-market opportunities before they are ever listed."
    ],
    "lifeCopy": [
      "Bayview suits established families, professionals and downsizers who want space, privacy and green surroundings without giving up proximity to the city core. Days here are quiet and walkable — reservoir pathways at the doorstep, a short drive to downtown up Elbow Drive, and Heritage Park a few minutes south. It is a settled, low-traffic community where neighbours tend to stay for decades."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines Bayview's northern edge, with North Glenmore Park, the Glenmore Sailing Club and kilometres of paved pathway for cycling, running and rowing close at hand. The Weaselhead Flats natural area and the Elbow River sit just west, and Heritage Park Historical Village anchors the shoreline immediately south — giving residents open water and mature parkland in every direction."
    ],
    "amenitiesCopy": [
      "Bayview is served by the Palliser Bayview Pumphill Community Association, which runs local programs, sports and seasonal events. Commuting is straightforward via Elbow Drive, 14 Street SW, Glenmore Trail and Anderson Road, while the Heritage CTrain station on the Red Line puts downtown roughly fifteen minutes away without a car."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes away at Glenmore Landing, the retail plaza at 14 Street and 90 Avenue SW overlooking the reservoir, with grocery, cafes and restaurants. Oakridge Co-op covers essentials to the south, and CF Chinook Centre — Calgary's largest mall — is a short drive east for full-scale shopping, dining and cinemas."
    ],
    "schools": [
      {
        "name": "Nellie McClung School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://nelliemcclung.cbe.ab.ca/"
      },
      {
        "name": "John Ware School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://johnware.cbe.ab.ca/"
      },
      {
        "name": "Henry Wise Wood High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://henrywisewood.cbe.ab.ca/"
      },
      {
        "name": "St. Benedict School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "auburn-bay",
    "story": [
      "Auburn Bay is a lake community in Calgary's southeast, built by Brookfield Residential from the mid-2000s around a 43-acre freshwater lake with a private beach and beach club. The community sits between Stoney Trail SE to the north and 52 Street SE to the south, with Deerfoot Trail along its eastern edge and Auburn Bay Boulevard tracing the west, placing it minutes from the South Health Campus and the Seton Urban District.",
      "Spanning roughly 900 acres, Auburn Bay grew into one of the city's larger master-planned lake neighbourhoods, with year-round lake access managed by the Auburn Bay Residents Association. Residents skate and play hockey on the lake in winter and swim, paddle, and fish through summer.",
      "In Calgary's southeast market, Auburn Bay reads as a family-oriented, amenity-rich community where the private lake, the adjacent hospital, and Seton's retail and recreation anchor steady, broad-based demand from first-time buyers through move-up families."
    ],
    "realEstateCopy": [
      "Auburn Bay's housing stock spans apartment condos and townhomes, attached and laned homes, and detached two-storeys and bungalows, most built from the mid-2000s onward in a warm, traditional style with front porches and prairie-craftsman detailing. Lots range from tight laned parcels to wider estate frontages, and lakefront properties with direct water access sit at the top of the market. Against an average sale price of $559,230, condos and entry townhomes trade well below that mark while detached family homes and lake-access estates run above it. Spencer Rivers represents both buyers and sellers throughout Auburn Bay and can surface off-market and lakefront opportunities before they reach public listings."
    ],
    "lifeCopy": [
      "Auburn Bay suits families and professionals who want lake access, walkable schools, and a hospital and shopping district minutes from the front door. Daily life centres on Auburn House and the beach, community events run by the Residents Association, and quick errands into Seton. The mix of condos, townhomes, and detached homes draws first-time buyers, growing families, and downsizers alike, giving the community a genuine cross-section rather than a single demographic."
    ],
    "outsideCopy": [
      "The 43-acre freshwater lake anchors outdoor life, with a private beach, splash and paddle access in summer, and skating and hockey through winter. Auburn Bay's network of pathways, green spaces, and tot lots connects the community on foot, and Fish Creek Provincial Park and the Bow River pathways sit a short drive away for longer rides, runs, and walks."
    ],
    "amenitiesCopy": [
      "The Auburn Bay Residents Association operates Auburn House, the lake, and community programming, with membership automatic for every homeowner. The South Health Campus hospital and the Seton Urban District border the community, and the Brookfield Residential YMCA at Seton adds pools, rinks, and fitness space. Commuters reach the rest of the city fast via Deerfoot Trail and Stoney Trail, with Calgary's future Green Line LRT planned to extend service toward Seton."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit right next door. Auburn Station on Auburn Meadows Boulevard SE brings grocery, services, and casual restaurants within the community, while the adjacent Seton Urban District adds a large Superstore, the VIP Cineplex cinema, cafes, pubs, and national retailers. Between Auburn Station and Seton, residents cover daily needs, dinners out, and a night at the movies without leaving Calgary's southeast."
    ],
    "schools": [
      {
        "name": "Auburn Bay School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://auburnbay.cbe.ab.ca/"
      },
      {
        "name": "Prince of Peace School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://princeofpeace.cssd.ab.ca/"
      },
      {
        "name": "Joane Cardinal-Schubert High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://jcshs.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "mahogany",
    "story": [
      "Mahogany is Calgary's largest freshwater lake community, a master-planned neighbourhood in the city's southeast built around a 63-acre lake with 21 acres of sandy beach. It sits south of 52 Street SE, north of 196 Avenue SE, west of the Bow River, and east of Stoney Trail, putting the Seton urban district and the Bow River valley within easy reach.",
      "Developed by Hopewell Residential beginning in the mid-2000s, Mahogany matured into one of Calgary's most recognized lake communities, anchored by its private beach clubs and the resort-style Westman Village on the water's edge. The community pairs a wetlands preserve of more than 70 acres with a walkable urban village core, giving it a character distinct from the standard southeast suburb.",
      "With an average sale price around $735,090, Mahogany spans a wide market: entry condos, family townhomes and detached houses, and lakefront estates that trade well above $2 million. It remains one of the most active and sought-after resale markets in southeast Calgary."
    ],
    "realEstateCopy": [
      "Housing in Mahogany is overwhelmingly new, most of it built from 2007 onward, and the stock is deliberately varied. Buyers find apartment condos and stacked townhomes under $500,000, semi-detached and detached family homes through the $500,000 to $900,000 range, and executive and lakefront estates that clear $2 million. Architecture leans transitional and contemporary Craftsman, with front-attached and rear-lane garages, and lake-access and lakefront lots commanding the strongest premiums. Against the community's roughly $735,090 average, the range is broad enough to suit first buyers and move-up families alike.",
      "Spencer Rivers represents both buyers and sellers throughout Mahogany and can surface off-market opportunities, including lake-access and waterfront homes that rarely reach public listings."
    ],
    "lifeCopy": [
      "Mahogany suits families and active professionals who want lake living inside the city. Private beach access at the Mahogany Beach Club anchors daily life, from summer swimming and paddleboarding to winter skating and the outdoor hockey rink. The walkable village core means groceries, coffee, and dinner are minutes from most front doors, and the community's year-round programming keeps residents connected across seasons rather than only through the summer months."
    ],
    "outsideCopy": [
      "Mahogany's outdoor life centres on the lake, two private beaches, and the 21,000-square-foot Mahogany Beach Club, with a fishing dock, splash park, tennis courts, and non-motorized marina. More than 265 acres of parks and over 70 acres of protected wetlands lace the community with pathways that connect to the wider Calgary Greenway. The Bow River valley and Fish Creek Provincial Park sit close by."
    ],
    "amenitiesCopy": [
      "The Mahogany Homeowners Association operates the beach clubs and year-round recreation programming that define the community. Commuters reach downtown in roughly 30 to 40 minutes via Stoney Trail and Deerfoot Trail, with 52 Street SE and Rangeview Drive feeding the neighbourhood; Calgary Transit bus routes connect toward the CTrain, and the future Green Line LRT is planned to serve the adjacent Seton district."
    ],
    "shopDineCopy": [
      "Day-to-day shopping sits in the Mahogany Village Market, with Sobeys, Shoppers Drug Mart, and restaurants including Kinjo Sushi & Grill, State & Main, Nando's, and The Canadian Brewhouse. Minutes south, the Seton urban district adds a Walmart Supercentre, Home Depot, Cineplex Seton, and the Brookfield Residential YMCA at Seton, one of the largest YMCAs in the world, giving Mahogany residents big-box and boutique options close to home."
    ],
    "schools": [
      {
        "name": "Mahogany School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/mahogany/"
      },
      {
        "name": "Divine Mercy School",
        "level": "Elementary (K-6)",
        "area": "Calgary Catholic",
        "url": "https://divinemercy.cssd.ab.ca/"
      },
      {
        "name": "Joane Cardinal-Schubert High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://joanecardinalschubert.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "mount-pleasant",
    "story": [
      "Mount Pleasant is an established inner-city community in Calgary's northwest, laid out along Centre Street North and Edmonton Trail. Its boundaries run from Confederation Park and roughly 32 Avenue NW at the north down to 16 Avenue NW (the Trans-Canada Highway) at the south, with 10 Street NW forming the western edge and the corridor near 2-4 Street NW to the east. Development began around 1912, making it one of the city's older neighbourhoods, and its tree-lined streets and mature lots still read as pre-war Calgary.",
      "The community matured alongside two landmarks: North Hill Centre, which opened in 1958, and Confederation Park, created in 1967 on the former North Hill Coulee and now the neighbourhood's northern anchor. That combination of a walkable Centre Street main street, a major urban park, and a five-minute reach to SAIT and downtown keeps Mount Pleasant among the most sought-after addresses in Calgary's core.",
      "In Calgary's real-estate market, Mount Pleasant sits firmly in inner-city territory, where scarcity of land and proximity to downtown support values well above the city average. The current average sale price of roughly $737,642 reflects a mix of original character homes and high-end infill on premium lots."
    ],
    "realEstateCopy": [
      "Housing in Mount Pleasant spans the community's full evolution: 1910s and post-war bungalows, character two-storeys, and character split-levels sit beside architect-designed infills, semi-detached duplexes, and low-rise condominiums. Roughly a quarter of the stock is multi-family, but the neighbourhood's identity rests on its detached homes and generous, mature 50-foot lots along quiet residential streets. Against the community's average sale price near $737,642, buyers see everything from entry-level condos and starter bungalows to new-build luxury homes reaching well past the seven-figure mark. Spencer Rivers represents both buyers and sellers throughout Mount Pleasant and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Mount Pleasant suits young professionals, downsizers, and families who want an urban, walkable lifestyle without leaving the inner city. Days here mean a short bike or transit ride to work downtown or classes at SAIT, coffee and errands along Centre Street, and evenings on a quiet, mature street. It is an unpretentious, community-minded pocket where neighbours know each other, kids walk to school, and the pace stays comfortably local."
    ],
    "outsideCopy": [
      "Confederation Park defines the community's northern edge, a 160-acre green space with walking and cycling pathways, baseball diamonds, tennis courts, the Confederation Park golf course, and its well-known winter Christmas lights display. Closer to home, Canmore Park adds playgrounds, sports fields, and a spray park, while the Nose Creek and Bow River pathway networks connect riders and runners across the northwest."
    ],
    "amenitiesCopy": [
      "The Mount Pleasant Community Association clusters the community hall, the Mount Pleasant Sportsplex arena, and the outdoor swimming pool around a central playground, offering hockey, skating, and summer swim programs. Commuting is straightforward: Centre Street, Edmonton Trail, and 4 Street NW feed directly downtown, 16 Avenue NW (the Trans-Canada) runs east-west, and dozens of Calgary Transit stops sit within a short walk across the community."
    ],
    "shopDineCopy": [
      "Everyday shopping centres on North Hill Centre at 16 Avenue and Centre Street, with grocery, pharmacy, and big-box retail minutes away. Centre Street North itself is one of Calgary's strongest dining strips, known for its Vietnamese pho houses, Asian restaurants, and neighbourhood pubs, while nearby Kensington adds independent boutiques, cafes, and cocktail bars a few minutes to the south."
    ],
    "schools": [
      {
        "name": "King George School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://kinggeorge.cbe.ab.ca/"
      },
      {
        "name": "Balmoral School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://balmoral.cbe.ab.ca/"
      },
      {
        "name": "William Aberhart High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://williamaberhart.cbe.ab.ca/"
      },
      {
        "name": "St. Joseph School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-joseph"
      }
    ]
  },
  {
    "slug": "hounsfield-heights-briar-hill",
    "story": [
      "Hounsfield Heights / Briar Hill is a hillside inner-city community in northwest Calgary, built along a natural escarpment that opens onto downtown skyline and Rocky Mountain views. Its boundaries run from 16 Avenue N and the Trans-Canada Highway on the north to 14 Street NW on the east, with Crowchild Trail and the 19–22 Street NW corridor framing the west and the lanes near 7 and 8 Avenue N closing the south edge.",
      "Subdivided in 1906 and established as a community in 1953, the area carries the name of early settler Thomas Riley and grew into one of Calgary's prestige view districts. It sits directly across the North Hill ridge from SAIT and Alberta University of the Arts, the pairing captured in the tagline 'hillside NW inner-city paired across the SAIT/ACAD ridge.'",
      "With an average sale price near $1,100,000, Hounsfield Heights / Briar Hill trades as a tightly held move-up market, prized for elevation, mature streets, and a walk-to-downtown location that adjacent communities like West Hillhurst, Rosedale, and Capitol Hill share but rarely match for outlook."
    ],
    "realEstateCopy": [
      "The housing stock centres on solid single-family and semi-detached homes from the 1950s through 1970s, many on generous, tree-lined lots that step down the escarpment. Original mid-century bungalows and split-levels sit alongside custom infills and full rebuilds, where owners have traded up to capitalize on the downtown and mountain sightlines. Pricing spans from entry semi-detached and holding properties into the $1,100,000 average and well beyond for renovated or view-facing homes, with premium escarpment lots commanding the top of the range.",
      "Spencer Rivers represents both buyers and sellers across Hounsfield Heights / Briar Hill and can surface off-market opportunities on the community's most sought-after view streets."
    ],
    "lifeCopy": [
      "The community suits professionals, downtown commuters, and established families who want inner-city proximity without a high-rise footprint. Days here balance quiet residential streets with a five-minute reach to the core, the university, and the hospitals along the North Hill. Residents walk to the ridge for skyline views, run the pathways before work, and value a settled, low-turnover street culture where neighbours stay for decades rather than years."
    ],
    "outsideCopy": [
      "Confederation Park and its golf course sit just north, offering wide green space, creek-side paths, and picnic areas, while Riley Park and the Bow River Pathway are a short ride south for walking, running, and cycling. The escarpment itself is the community's signature outdoor asset, with ridge-top vantage points framing the downtown skyline and the Rockies beyond."
    ],
    "amenitiesCopy": [
      "The Hounsfield Heights-Briar Hill Community Association anchors local recreation and events. Lions Park CTrain station sits within the community on the Red Line, putting downtown, the University of Calgary, and the University District within an easy ride, while Crowchild Trail, 16 Avenue N, and 14 Street NW give quick vehicle access across the city. SAIT and Alberta University of the Arts are directly adjacent on the North Hill."
    ],
    "shopDineCopy": [
      "North Hill Centre, Calgary's original shopping mall, sits within the community with more than one hundred shops, services, and restaurants at the doorstep. Kensington's independent boutiques, cafes, and upscale dining are minutes south across the tracks, and the shops and eateries along 16 Avenue and 19 Street NW round out everyday grocery, pharmacy, and casual dining within a short walk or drive."
    ],
    "schools": [
      {
        "name": "Briar Hill School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://briarhill.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth High School",
        "level": "Junior High & High School",
        "area": "CBE public",
        "url": "https://queenelizabethhs.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "bankview",
    "story": [
      "Bankview occupies a hillside perch in Calgary's city centre, bounded by 17th Avenue SW to the north, 26th Avenue SW to the south, 14th Street SW to the east, and 19th Street SW to the west. The elevation is the whole point: streets on the eastern slope look straight across to the downtown skyline, minutes from the Beltline yet quieter and greener than the corridor below. Its neighbours read like a shortlist of the city's best inner-city addresses, Sunalta, Upper Mount Royal, South Calgary, and Marda Loop.",
      "The community traces back to William Nimmons, whose 1884 sandstone residence still stands in the northeast corner, and it was established as a neighbourhood in 1908. That long history shows in the streetscape. Century-old Craftsman homes sit beside 1960s walk-up apartments and sharp new infills, all under a canopy of mature boulevard trees.",
      "In Calgary's market, Bankview is one of the more attainable ways into a walkable, view-rich inner-city location, which keeps demand steady from first-time buyers, downsizers, and investors alike."
    ],
    "realEstateCopy": [
      "Bankview's housing stock is unusually varied for such a compact community. Buyers move between Craftsman-era detached homes and character bungalows, mid-century low-rise condos and walk-ups, modern duplexes, and three-storey infills with rooftop patios framing downtown views. The lots are classic inner-city, many on the sloped grid that gives the neighbourhood its outlook. The average sale price of roughly $503,588 reflects that condo-and-infill mix, sitting well below detached prices in neighbouring Upper Mount Royal while keeping residents inside the same walkable core. Spencer Rivers represents both buyers and sellers throughout Bankview and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Bankview suits people who want the energy of the inner city without living on top of it. The community skews young, single, and professional, drawn by the short walk or bike to downtown offices and 17th Avenue's restaurants and bars. Days here run on foot, morning coffee on 17th, an evening on a west-facing patio, weekends spent between the parks and Marda Loop. It rewards anyone who values location, character, and a genuine sense of neighbourhood over square footage."
    ],
    "outsideCopy": [
      "Green space threads through the community, anchored by Buckmaster Park with its tennis courts and off-leash area, plus Bankview Community Park's playgrounds and open fields. Mature fifty-foot trees arch over the boulevards, and the hillside grade opens up long skyline views. A short trip southwest reaches the Elbow River pathways at River Park and Sandy Beach, prime off-leash and riverside territory for runners, cyclists, and dog owners."
    ],
    "amenitiesCopy": [
      "The Bankview Community Association runs a hall, tennis courts, and neighbourhood parks, and hosts events that hold the community together. Commuting is straightforward: 14th Street SW and 17th Avenue SW frame the neighbourhood, Crowchild Trail and Bow Trail are minutes west for the wider city, and the Sunalta CTrain station on the West LRT line sits just off the northern edge for a quick ride into the core or out to the west end."
    ],
    "shopDineCopy": [
      "Two of Calgary's best retail strips sit within walking distance. 17th Avenue SW, the city's celebrated Red Mile, lines up independent boutiques, coffee shops, pubs, and a dense run of restaurants along the northern boundary. A short walk south leads to Marda Loop, one of Calgary's busiest outdoor shopping districts, packed with cafes, specialty grocers, fitness studios, and local eateries. Everyday errands rarely require a car."
    ],
    "schools": [
      {
        "name": "Sunalta School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/sunalta/"
      },
      {
        "name": "Mount Royal School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/mountroyal/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "Sacred Heart School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/sacred-heart"
      },
      {
        "name": "St. Mary's High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-marys-high"
      }
    ]
  },
  {
    "slug": "rosedale",
    "story": [
      "Rosedale is one of Calgary's premier northwest inner-city communities, set on the escarpment directly above downtown between 4th Street NW and 10th Street NW. The community runs south from 16 Avenue NW and the Trans-Canada Highway to Crescent Road NW, where the land drops away at McHugh Bluff to open panoramic views of the Bow River valley and the city skyline. Established in 1929, it sits alongside Crescent Heights to the east and Sunnyside and Kensington to the south.",
      "The neighbourhood reads as one of the city's quietest and most established addresses: mature elms, curving streets, and a compact footprint of roughly 590 homes and about 1,500 residents. Median household income here is among the highest in Calgary, and the community pairs a genuinely walkable inner-city location with the calm of a settled residential enclave.",
      "In Calgary's luxury market, Rosedale trades on scarcity. Its hilltop position, McHugh Bluff views, and short walk to the core keep demand well ahead of the small pool of homes that change hands each year, placing it firmly among the northwest's most sought-after communities."
    ],
    "realEstateCopy": [
      "Rosedale's housing stock spans nearly a century, from restored character homes of the 1930s through mid-century bungalows to a steady wave of custom infill on the community's generous, mature lots. Recent years have seen older homes reworked or replaced by architect-designed residences with large floor plans and high-end finishes, many angled to capture the downtown and river-valley views off Crescent Road. Prices reflect that mix and the community's short supply: entry points sit well below the roughly $2.57 million average sale price on file, while view lots and new custom builds reach into the multi-millions. Spencer Rivers represents both buyers and sellers in Rosedale and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Rosedale suits buyers who want an established, low-traffic community without giving up the walk to downtown, Kensington, and the river pathways. Days here run from a morning along McHugh Bluff to a short commute over the Bow into the core, with SAIT, AUArts, and the Jubilee Auditorium minutes away. It is a settled, family-friendly enclave that appeals equally to professionals, downsizers, and households drawn by strong local schools and a genuinely quiet street grid."
    ],
    "outsideCopy": [
      "McHugh Bluff Park runs the length of Rosedale's southern edge along Crescent Road, its escarpment lawns and pathways framing the downtown skyline and connecting into the Bow River pathway system below. Riley Park and its wading pool sit a short walk west in Hillhurst, and the community's own green spaces and tennis courts round out an active, outdoor-oriented setting steps from the river valley."
    ],
    "amenitiesCopy": [
      "The Rosedale Community Association anchors local life with a hall, rink, and tennis courts, and seasonal programs. Getting around is easy: Centre Street N and 10 Street NW feed directly downtown, 16 Avenue NW links to the Trans-Canada and Deerfoot Trail, and the SAIT/AUArts/Jubilee CTrain station on the Red Line puts the core and the University of Calgary within a quick ride."
    ],
    "shopDineCopy": [
      "Kensington sits just south of Rosedale, giving residents walkable access to one of Calgary's best-known shopping and dining districts, with independent cafes, restaurants, and boutiques along Kensington Road and 10 Street NW. North Hill Centre to the north covers everyday shopping and groceries, while the restaurants and amenities of downtown and Bridgeland are a short drive or CTrain ride away."
    ],
    "schools": [
      {
        "name": "Rosedale School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://rosedale.cbe.ab.ca/"
      },
      {
        "name": "Crescent Heights High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://crescentheights.cbe.ab.ca/"
      },
      {
        "name": "St. Joseph School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-joseph"
      },
      {
        "name": "St. Francis High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-francis"
      }
    ]
  },
  {
    "slug": "parkhill",
    "story": [
      "Parkhill is an inner-city community set on the east bank of the Elbow River, directly south of Mission and a five-minute drive from downtown Calgary. Its boundaries run from Mission Road on the north to Macleod Trail on the east, Crescent Boulevard on the south, and the Elbow River and Stanley Park on the west. Elbow Park, Erlton, Rideau Park, and Elboya sit alongside it, placing Parkhill among Calgary's most established city-centre addresses.",
      "Established around 1910, Parkhill is one of Calgary's older neighbourhoods, and its elevated streets have long been prized for river-valley and downtown views. The housing mix reflects that history: Craftsman and character two-storeys sit beside postwar bungalows and contemporary infill, on quiet, tree-lined streets that step up from the river.",
      "Compact and tightly held, Parkhill trades on scarcity. Detached homes here averaged just over $1 million in 2025, with ridge lots facing the Elbow River commanding well beyond that, keeping the community firmly in the upper tier of Calgary's inner-city market."
    ],
    "realEstateCopy": [
      "Parkhill's housing stock spans renovated postwar bungalows, restored character two-storeys, and architect-designed infill homes, many on the elevated lots that face the Elbow River valley, Stanley Park, or the downtown skyline. Lot character varies from modest inner-city frontages to premium ridge parcels, and the community's overall average sale price of roughly $990,608 reflects a blend of condos, townhomes, and detached houses, with single-family homes and view lots pricing well above that figure. Spencer Rivers represents both buyers and sellers in Parkhill and can surface off-market opportunities in a community where inventory is limited and rarely stays available long."
    ],
    "lifeCopy": [
      "Parkhill suits buyers who want a quiet, walkable inner-city base without giving up quick access to downtown. Professionals, downsizers, and established families are drawn to its low-traffic streets, mature trees, and river-valley setting. Daily life leans toward morning runs on the Elbow River pathways, coffee and dinner on 4th Street SW, and the short commute that makes the office, the core, and the Beltline feel close at hand."
    ],
    "outsideCopy": [
      "Stanley Park anchors outdoor life in Parkhill, with tennis courts, an outdoor pool, a lawn bowling club, ball diamonds, and a playground set in the Elbow River valley. The adjacent Elbow River pathways carry walkers, runners, and cyclists along the water and connect into Calgary's wider regional pathway network, giving residents kilometres of riverside recreation a few steps from their doors."
    ],
    "amenitiesCopy": [
      "The Parkhill Stanley Park Community Association runs local events and programming, while Stanley Park handles much of the day-to-day recreation. Commuting is straightforward: Macleod Trail and Mission Road frame the community for quick trips downtown or south, and the Erlton/Stampede and 39 Avenue CTrain stations sit minutes away, putting the core within a short ride by transit or car."
    ],
    "shopDineCopy": [
      "Parkhill's everyday shopping and dining centre on the 4th Street SW and Mission districts just to the north, a walkable strip of cafes, wine bars, restaurants, boutiques, and gourmet markets. Britannia Plaza and Elbow Drive shops add specialty grocery, dining, and services nearby, while Macleod Trail and Chinook Centre put big-box retail and department stores within a short drive."
    ],
    "schools": [
      {
        "name": "Elboya School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/elboya/"
      },
      {
        "name": "Rideau Park School",
        "level": "K-9",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/rideaupark/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "St. Monica School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://stmonica.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "st-andrews-heights",
    "story": [
      "St. Andrews Heights is a small inner-city community in Calgary's northwest, laid out in 1953 on the escarpment above West Hillhurst and named for the famous golf links at St. Andrews, Scotland. It sits between the Trans-Canada Highway (16 Avenue NW) to the north, Crowchild Trail to the east, Toronto Crescent to the south, and 29 Street to the west, with the Bow River valley falling away just below.",
      "The location is the community's defining asset. Foothills Medical Centre and the Alberta Children's Hospital anchor the northwest corner, the University of Calgary sits a short walk west, and McMahon Stadium and Foothills Athletic Park border the northeast. With roughly 1,600 residents across about 645 homes, it remains one of the northwest's more tightly held enclaves.",
      "Elevated lots deliver downtown skyline views to the east and open prairie sunsets to the west, a combination that keeps St. Andrews Heights firmly in Calgary's luxury inner-city market alongside neighbours like Parkdale, Briar Hill, and Hounsfield Heights."
    ],
    "realEstateCopy": [
      "The original housing stock is 1950s and 1960s bungalows and split-levels on wide, mature lots, many of which have been replaced or reimagined as custom infills and architect-designed luxury homes that take advantage of the escarpment and its river-valley and skyline views. Condominiums and townhomes near the hospital add an entry point for professionals and downsizers. Sale prices run from roughly $900,000 into the multi-millions, with the current average near $1,200,000. Spencer Rivers represents both buyers and sellers in St. Andrews Heights and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "St. Andrews Heights suits physicians, University of Calgary faculty, and families who want an inner-city address without downtown noise. Many residents walk or cycle to Foothills Medical Centre and the campus, and downtown is minutes away by Crowchild Trail. Quiet, curving streets, established trees, and a strong community association make it a settled, walkable place where children play outside and neighbours know one another."
    ],
    "outsideCopy": [
      "St. Andrews Park sits at the community's centre with playgrounds, sports fields, and one of the city's best tobogganing hills. The escarpment edge opens onto the Bow River Pathway, which connects west to Edworthy Park and Bowmont Park and east toward downtown and Prince's Island. Confederation Park and the running track and fields at Foothills Athletic Park are also close at hand."
    ],
    "amenitiesCopy": [
      "The St. Andrews Heights Community Association runs the local hall, rink, and neighbourhood events. Crowchild Trail and the Trans-Canada Highway (16 Avenue NW) put the rest of the city within easy reach, and the University and Banff Trail CTrain stations on the Red Line offer a quick transit ride downtown or to the airport corridor. Foothills Medical Centre and the University of Calgary are effectively at the doorstep."
    ],
    "shopDineCopy": [
      "Everyday shopping is minutes away at North Hill Centre and along 16 Avenue NW, while Market Mall, one of Calgary's largest, is a short drive up Shaganappi Trail with Winners, Safeway, cinemas, and restaurants including The Keg and Milestones. Neighbourhood favourites like The Lazy Loaf & Kettle sit close by, and the cafes, pubs, and boutiques of Kensington are a quick trip across the river."
    ],
    "schools": [
      {
        "name": "Branton School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://branton.cbe.ab.ca/"
      },
      {
        "name": "Queen Elizabeth High School",
        "level": "Junior High / High School",
        "area": "CBE public",
        "url": "https://queenelizabeth.cbe.ab.ca/"
      },
      {
        "name": "École Banff Trail School",
        "level": "Elementary (French Immersion)",
        "area": "CBE public",
        "url": "https://banfftrail.cbe.ab.ca/"
      },
      {
        "name": "Briar Hill School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://briarhill.cbe.ab.ca/"
      },
      {
        "name": "William Aberhart High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://williamaberhart.cbe.ab.ca/"
      },
      {
        "name": "Rundle College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.rundle.ab.ca/"
      }
    ]
  },
  {
    "slug": "richmond",
    "story": [
      "Richmond is an established city-centre community in southwest Calgary, sitting directly against the Marda Loop shopping district and paired with neighbouring Knob Hill. It is bounded roughly by 17 Avenue SW to the north, 33 Avenue SW to the south, Crowchild Trail to the west, and 19 Street SW to the east, placing residents minutes from downtown by way of Crowchild Trail and 14 Street SW.",
      "Annexed by the city in two phases in 1907 and 1910, Richmond was largely built out through the 1950s after its original grid was replotted under the Neighbourhood Unit concept, giving parts of the area the curved streets and irregular blocks that follow Richmond Road today. That older bones-and-mature-trees character now sits alongside a steady wave of contemporary infill.",
      "The result is one of Calgary's more desirable inner-city addresses, where walkability to Marda Loop and a short downtown commute keep demand firm. The average sale price on file for Richmond is $925,881, reflecting a market anchored by both character homes and new detached builds."
    ],
    "realEstateCopy": [
      "Richmond's housing stock spans post-war 1950s bungalows and character homes with brick facades and front porches through to the modern infill that increasingly defines the streetscape: contemporary detached homes and semi-detached duplexes on generous inner-city lots. Pricing runs a wide arc around the community's $925,881 average, from attached infill product to custom single-family builds that clear well past it. Spencer Rivers represents both buyers and sellers throughout Richmond and the wider Marda Loop area, and can surface off-market opportunities that never reach public MLS listings."
    ],
    "lifeCopy": [
      "Richmond suits buyers who want an established inner-city footing without giving up space or trees: young professionals drawn to the short downtown commute, families using the local schools, and downsizers trading a larger suburban lot for walkable proximity to Marda Loop. Daily life leans on foot and bike as much as the car, with coffee, groceries, and dining all within a few blocks along 33 Avenue SW."
    ],
    "outsideCopy": [
      "Green space sits close at hand. Richmond Green Park offers open fields and city views just west across Crowchild Trail, while the Elbow River pathway system, Sandy Beach Park, and River Park lie a short ride south through Altadore for off-leash walking, riverside trails, and summer swimming. Calgary's connected pathway network makes cycling downtown or to the reservoir straightforward."
    ],
    "amenitiesCopy": [
      "The Richmond Knob Hill Community Association runs programming, sports, and events for residents, and the area feeds directly into the Marda Loop commercial hub. Commuting is quick: Crowchild Trail and 14 Street SW connect to downtown in roughly ten minutes, 17 Avenue SW runs east toward the core, and frequent transit along 33 Avenue and 14 Street links the community to the wider city and LRT network."
    ],
    "shopDineCopy": [
      "Marda Loop, centred on 33 Avenue SW, gives Richmond one of the city's strongest street-level retail and dining districts, with roughly 190 shops, boutiques, and restaurants. Options range from Blush Lane's organic market and the long-running Belmont Diner to Annabelle's Kitchen for Italian and Big Fish/Open Range for seafood, alongside independent coffee shops, bakeries, fitness studios, and everyday services all within walking distance."
    ],
    "schools": [
      {
        "name": "Richmond School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://richmond.cbe.ab.ca/"
      },
      {
        "name": "A.E. Cross School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://aecross.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      },
      {
        "name": "Holy Name School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Mary's High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "parkdale",
    "story": [
      "Parkdale is a mature northwest inner-city community on the north bank of the Bow River, bounded by the river to the south, 28 Street NW to the east, Shaganappi Trail NW to the west, and 16 Avenue NW to the north. It sits directly between West Hillhurst and Point McKay, a few minutes from downtown Calgary along Memorial Drive and within walking distance of the Foothills Medical Centre, the Alberta Children's Hospital, and the University of Calgary.",
      "The community was annexed to Calgary in 1910 as the \"Parkdale Addition,\" planned as a streetcar-era enclave for the city's professional class. The First World War stalled construction, and most of Parkdale filled in after 1948 with modest bungalows. Since the 2000s those postwar cottages have steadily given way to architect-designed infills, giving the streets a mix of heritage brick, mid-century character, and contemporary builds.",
      "Today Parkdale is one of Calgary's most sought-after riverfront addresses, prized for its Bow River frontage, mature tree canopy, and rare combination of quiet residential streets with genuine walkability to hospitals, campus, and the core."
    ],
    "realEstateCopy": [
      "Housing in Parkdale runs from original 1950s bungalows and a handful of 1911-1913 Craftsman and brick heritage homes to a growing stock of Prairie School and contemporary infills, semi-detached duplexes, and low-rise riverfront condominiums. Lots tend to be deep and tree-lined, and the most valuable sites back onto or overlook the Bow River pathway. With an average sale price of $966,411, Parkdale spans attainable inner-city entry points through custom riverfront properties well into the multi-million-dollar range.",
      "Spencer Rivers represents both buyers and sellers throughout Parkdale and the surrounding northwest inner-city communities, and can surface off-market riverfront and infill opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Parkdale suits professionals working at the Foothills Medical Centre, Alberta Children's Hospital, or the University of Calgary, along with downsizers and families who want river access and a short commute without leaving the inner city. Daily life centres on the Bow River pathway, morning runs and rides toward Edworthy Park, and an easy drive or bike to downtown, Kensington, and campus."
    ],
    "outsideCopy": [
      "The Bow River riverfront runs the full length of Parkdale and anchors its outdoor life, connecting into the regional Bow River Pathway for cycling, running, and riverside walks. Pedestrian bridges link the community to Edworthy Park and its off-leash areas across the water, while Parkdale Plaza, the Parkdale/West Hillhurst playground, and nearby Shouldice Park and Athletic Park round out the recreation close to home."
    ],
    "amenitiesCopy": [
      "The Parkdale Community Association runs a hall, community garden, and seasonal programming for residents. Commuting is straightforward: Memorial Drive and 16 Avenue NW (the Trans-Canada) frame the community, with Shaganappi Trail and Crowchild Trail providing quick routes to downtown, the University of Calgary, Market Mall, and Highway 1 toward the Rocky Mountains. The Foothills and Children's Hospital campuses are minutes away."
    ],
    "shopDineCopy": [
      "Angel's Cappuccino & Ice Cream Cafe sits just across the river in Edworthy Park, a longtime local landmark for coffee and treats along the pathway. Everyday shopping and dining are minutes away in West Hillhurst and the shops and restaurants of Kensington, while Market Mall to the northwest and the University District's grocers, cafes, and cinema add major-brand retail and dining within a short drive."
    ],
    "schools": [
      {
        "name": "Westmount Charter School",
        "level": "K-12 (Gifted Charter)",
        "area": "Independent charter, located in Parkdale",
        "url": "https://www.westmountcharter.com/"
      },
      {
        "name": "Queen Elizabeth School",
        "level": "Grades 7-12",
        "area": "CBE public, Hillhurst",
        "url": "https://school.cbe.ab.ca/school/queenelizabeth/"
      },
      {
        "name": "William Aberhart High School",
        "level": "High School",
        "area": "CBE public, Banff Trail",
        "url": "https://school.cbe.ab.ca/school/williamaberhart/"
      },
      {
        "name": "St. Pius X School",
        "level": "K-9",
        "area": "Calgary Catholic, Banff Trail",
        "url": "https://www.cssd.ab.ca/schools/st-pius-x"
      },
      {
        "name": "St. Francis High School",
        "level": "High School",
        "area": "Calgary Catholic, Rosemont",
        "url": "https://www.cssd.ab.ca/schools/st-francis"
      }
    ]
  },
  {
    "slug": "south-calgary",
    "story": [
      "South Calgary is an established inner-city community in Calgary's southwest quadrant, the quieter residential half of the Marda Loop district. It runs south from 26th Avenue SW toward 34th Avenue SW, bounded by 14th Street SW to the east and Crowchild Trail to the west, roughly ten minutes from downtown. The Marda Loop commercial strip along 33rd Avenue SW forms its northern edge, so residents live steps from the shops and restaurants without the through-traffic.",
      "The community is one of Calgary's older ones, with homes dating to the early 1900s and streets shaded by mature trees. The Marda Loop name itself traces to 1985 and the old Marda Theatre and streetcar turnaround on 33rd Avenue. Alongside neighbouring Altadore and Garrison Woods, South Calgary anchors a pocket of the city-centre market where character housing, infill redevelopment, and walkable amenities keep demand steady. The average sale price on file is $970,341."
    ],
    "realEstateCopy": [
      "Housing in South Calgary is an eclectic mix built across more than a century. Original early-1900s character homes carry large front porches, peaked roofs, and traditional layouts, and many sit on generous inner-city lots that have drawn steady infill redevelopment. Newer stock includes side-by-side infill duplexes, modern townhomes, and low-rise condos within walking distance of 33rd Avenue. With an average sale price of $970,341, the community spans entry-level condos and townhomes through to fully rebuilt detached infills at the upper end. Spencer Rivers represents both buyers and sellers across South Calgary and can surface off-market opportunities before they reach MLS."
    ],
    "lifeCopy": [
      "South Calgary suits buyers who want an inner-city address with a residential feel: young professionals, downsizers, and families who prefer walkability over acreage. Daily life runs on foot and bike, with the Marda Loop shops, cafes, fitness studios, and grocery a few blocks north, the Elbow River pathways to the east, and downtown a short commute away. Tree-lined streets, an artsy character, and a settled, low-key pace define the neighbourhood."
    ],
    "outsideCopy": [
      "Green space sits close at hand. South Calgary Park offers sports fields, tennis and beach-volleyball courts, an outdoor skating rink, a playground, and walking paths, with the seasonal South Calgary Outdoor Pool alongside. To the east, River Park and Sandy Beach follow the Elbow River, connecting to Calgary's pathway network for dog walking, riverside strolls, and skyline views."
    ],
    "amenitiesCopy": [
      "The Marda Loop Communities Association runs programs, events, and recreation for South Calgary and its neighbouring communities, and operates the South Calgary Outdoor Pool through the summer. Commuting is straightforward: 14th Street SW, Crowchild Trail, and Elbow Drive frame the community and feed directly downtown in about ten minutes, and frequent bus routes along 14th Street and 33rd Avenue serve the wider transit network."
    ],
    "shopDineCopy": [
      "The Marda Loop business district along 33rd Avenue SW is the community's front door, with more than 150 shops, boutiques, cafes, restaurants, and services. Residents find independent eateries, coffee shops, craft breweries, fitness studios, and grocery all within a short walk. The mix of national retailers and local specialty stores makes it one of Calgary's most active inner-city urban villages."
    ],
    "schools": [
      {
        "name": "Altadore School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://altadore.cbe.ab.ca/"
      },
      {
        "name": "Mount Royal School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b639/"
      },
      {
        "name": "Central Memorial High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://centralmemorial.cbe.ab.ca/"
      },
      {
        "name": "Dr. Oakley School",
        "level": "Grades 3-9 (specialized)",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "St. James School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "Bishop Carroll High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "elboya",
    "story": [
      "Elboya is a quiet inner-city community on the south bank of the Elbow River, part of Calgary's city-centre. Its name is a blend of \"Elbow\" and \"ya,\" a nod to the river that forms its northern edge. The community is bounded by the Elbow River and Stanley Park to the north, Macleod Trail to the east, 50 Avenue SW to the south, and Elbow Drive to the west, placing it directly across the river from Mission and next to Britannia and Windsor Park.",
      "The land was annexed by Calgary in 1910 and slated for upscale development by real-estate promoter Freddy Lowes before the City took it over in 1925. Most of Elboya was built out after the 1947 Leduc oil boom, when 50 Avenue still marked the city limits. That post-war origin gives the neighbourhood its mid-century bungalows, mature elms, and generous lots.",
      "Today Elboya sits among Calgary's established luxury enclaves, with an average sale price near $1,010,982 that reflects escarpment lots, river access, and a walk-to-downtown location that newer suburbs cannot replicate."
    ],
    "realEstateCopy": [
      "Elboya's housing stock spans original 1950s bungalows and ranch-style homes, extensively renovated mid-century properties, and a steady flow of architect-designed two-storey infills replacing older cottages. Roughly a third of the community is condominiums and low-rise apartments along Elbow Drive and 4 Street SW, which broadens the entry point below the detached average. Detached homes climb from the high $700,000s into the $2 million-plus range on the escarpment and river-view lots, placing the community average near $1,010,982. Lots are wide and tree-lined, many backing onto quiet interior streets. Spencer Rivers represents both buyers and sellers in Elboya and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Elboya suits buyers who want an established inner-city address without the density of the core: professionals, downsizers moving from larger southwest homes, and families drawn to the walkability and the schools. Daily life runs on foot and by bike, with the Elbow River pathway, Stanley Park, and 4 Street's cafes all within a short walk. It is a settled, low-turnover community where many owners stay for decades."
    ],
    "outsideCopy": [
      "Stanley Park anchors the community's outdoor life, with an outdoor pool, tennis courts, lawn bowling, baseball diamonds, and a public boat launch onto the Elbow River. The regional Elbow River pathway runs along the northern edge, connecting into Calgary's wider riverside network toward Sandy Beach and the downtown core. Winter brings skating and tobogganing; summer brings paddling and riverside cycling minutes from home."
    ],
    "amenitiesCopy": [
      "The Elboya Britannia Community Association runs local programming and events for the two neighbouring communities. Commuting is quick: Elbow Drive and Macleod Trail both reach downtown in about ten minutes, and the Red Line LRT is close at hand via Erlton/Stampede Station to the north and Chinook Station to the south. Chinook Centre and its transit hub sit five minutes down Macleod Trail."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit within easy reach. Britannia Plaza, just west, offers Sunterra Market, Monogram Coffee, and Village Ice Cream. The 4 Street SW and Mission district across the river adds a dense strip of restaurants, pubs, and boutiques. Chinook Centre, five minutes south on Macleod Trail, provides full-scale retail, and Britannia's shops keep essentials close to home."
    ],
    "schools": [
      {
        "name": "Elboya School",
        "level": "Grades 5-9",
        "area": "CBE public",
        "url": "https://elboya.cbe.ab.ca/"
      },
      {
        "name": "Windsor Park School",
        "level": "Elementary (K-4, designated)",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/windsorpark/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School (designated)",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "St. Mary's High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://stmarys.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "kelvin-grove",
    "story": [
      "Kelvin Grove is a quiet, established residential community in southwest Calgary, sitting just south of Glenmore Trail between the Chinook and Heritage areas. It is bordered by Glenmore Trail to the north, Elbow Drive to the east, and 14 Street SW as it runs down toward Heritage Park and the Glenmore Reservoir to the south and west. Rockyview General Hospital sits directly alongside the community's western edge.",
      "Developed largely through the late 1950s and 1960s, Kelvin Grove carries the wide, tree-lined streets and generous lots of Calgary's early post-war suburbs. It remains a small, low-turnover enclave of roughly 1,800 residents, valued for its mature landscaping, central-south location, and easy reach of the reservoir pathways.",
      "With an average sale price around $972,000, Kelvin Grove sits firmly in Calgary's upper-mid market — an inner-city-adjacent address that trades at a clear premium to the citywide benchmark while staying quieter than the neighbouring estate pockets of Bel-Aire and Eagle Ridge."
    ],
    "realEstateCopy": [
      "Housing in Kelvin Grove is anchored by 1960s bungalows and split-level homes on large, mature lots, many now renovated or replaced by custom infills and estate rebuilds that lift the street's ceiling well above the community average. A smaller supply of townhomes and low-rise condominiums rounds out the mix for buyers who want a lock-and-leave footprint in the same location. Prices span from entry-level attached homes into the $1M-plus range for rebuilt detached properties, with the $972,000 average reflecting a market weighted toward updated and reconstructed houses. Spencer Rivers represents both buyers and sellers in Kelvin Grove and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Kelvin Grove suits buyers who want an established, walkable pocket close to the core without inner-city density — professionals, downsizers, and families drawn to its schools and quiet streets. Daily life revolves around the reservoir pathways, short drives to Chinook Centre, and quick hospital and downtown access. It is a community where neighbours stay for decades, and turnover of the best homes tends to be slow."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir sits at Kelvin Grove's doorstep, with North Glenmore Park, the Weaselhead Flats natural area, and the regional pathway network all within easy reach for walking, cycling, kayaking, and rowing. Heritage Park Historical Village lies just to the south along the shoreline, and the community's own green space offers a playground and tennis and pickleball courts."
    ],
    "amenitiesCopy": [
      "The Kelvin Grove Community Association runs local programming and maintains neighbourhood green space and courts. Commuting is direct: Glenmore Trail, Elbow Drive, and 14 Street SW connect the community to Macleod Trail, Crowchild Trail, and downtown, while the Heritage and Chinook CTrain stations on the Red Line put transit a short drive north. Rockyview General Hospital is minutes away."
    ],
    "shopDineCopy": [
      "Chinook Centre, Calgary's largest shopping mall, sits just across Glenmore Trail with anchor retail, restaurants, and a cinema. Closer in, Britannia Plaza offers upscale boutiques, cafes, and the Sunterra Market grocer, while Marda Loop and the Macleod Trail corridor add further dining and everyday shopping a few minutes away."
    ],
    "schools": [
      {
        "name": "École Chinook Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/ChinookPark/"
      },
      {
        "name": "Woodman School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://woodman.cbe.ab.ca"
      },
      {
        "name": "Henry Wise Wood High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b836/"
      }
    ]
  },
  {
    "slug": "windsor-park",
    "story": [
      "Windsor Park is an established inner-city community in Calgary's city-centre, roughly five kilometres south of downtown along the Macleod Trail corridor. It is bounded by 50 Avenue SW to the north, Macleod Trail to the east, 58 Avenue SW to the south, and the Calgary Golf & Country Club and Elbow River to the west, sitting directly adjacent to Britannia, Elboya, Manchester, and Meadowlark Park.",
      "Development began in 1940, and the community was annexed to the City of Calgary in 1951. That history shows in the streetscape: mature trees, walkable blocks, and original post-war bungalows now giving way to custom infill. Windsor Park belongs to the Chinook communities, a tightly held pocket where proximity to the river, the golf course, and Chinook Centre keeps demand consistent.",
      "In Calgary's market, Windsor Park reads as an inner-city hold. Buyers gain a Britannia-adjacent, river-close address with strong school designations, without paying Britannia or Bel-Aire prices, while a steady supply of condos keeps an entry point open below the detached market."
    ],
    "realEstateCopy": [
      "Windsor Park's housing stock runs from classic prairie and craftsman bungalows of the 1940s and 50s to modern two-storey infills with open plans and high-end finishes. Lowrise condominiums and townhomes make up most of the community's doors, which anchors the blended average sale price near $631,437, while detached single-family homes trade well above that mark; 2025 single-family sales averaged roughly $1.06 million on about 38 days on market. Lots follow typical inner-city dimensions, many primed for redevelopment. Spencer Rivers represents both buyers and sellers in Windsor Park and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Windsor Park suits professionals, downsizers, and families who want an inner-city address with a quiet, residential feel. Condo owners get low-maintenance living minutes from downtown, while infill buyers gain room for growing households. Daily life leans walkable: coffee at Britannia Plaza, a river-path run before work, and a short drive or CTrain ride to the core, with Elboya and Windsor Park schools keeping young families rooted close to home."
    ],
    "outsideCopy": [
      "The Elbow River and its regional pathway trace Windsor Park's western edge, connecting cyclists and runners to Sandy Beach, River Park's off-leash areas, and Stanley Park's outdoor pool and riverside greens. The Calgary Golf & Country Club borders the community directly, and the Glenmore Reservoir's rowing and sailing waters sit a short ride south. Mature neighbourhood greenspaces round out the everyday outdoor options."
    ],
    "amenitiesCopy": [
      "The Windsor Park Community Association runs local programming and events for residents. Commuting is straightforward: Macleod Trail and Elbow Drive both run the length of the community, Glenmore Trail is minutes south, and the Red Line Chinook CTrain station puts downtown within a quick ride. Calgary Transit routes along Macleod Trail add frequent service for car-free days."
    ],
    "shopDineCopy": [
      "Shopping and dining sit right at the doorstep. CF Chinook Centre, Calgary's largest mall, anchors the eastern edge at 6455 Macleod Trail SW with more than 250 stores, a food hall, and the Scotiabank Theatre. To the northwest, Britannia Plaza offers a more boutique mix, including Sunterra Market, Village Ice Cream, and independent cafés and shops along Elbow Drive at 49 Avenue SW."
    ],
    "schools": [
      {
        "name": "Windsor Park School",
        "level": "Elementary (K-4)",
        "area": "CBE public",
        "url": "https://windsorpark.cbe.ab.ca/"
      },
      {
        "name": "Elboya School",
        "level": "Junior High (Grades 5-9)",
        "area": "CBE public",
        "url": "https://elboya.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School (10-12)",
        "area": "CBE public",
        "url": "https://westerncanada.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "edgemont",
    "story": [
      "Edgemont is an established family community in northwest Calgary, laid out across the elevated terrain that forms a northwest extension of Nose Hill. The community is bounded by John Laurie Boulevard to the south, Sarcee Trail to the west, Country Hills Boulevard to the north, and Shaganappi Trail to the east, with the eastern edge running straight into Nose Hill Park, one of Canada's largest urban parks. Development began in 1978 and rolled out over seven subareas, from the original Edgemont Estates through Edgedale, Edenwold, Edgepark, Edgevalley, Edgebrook and Edgeridge.",
      "Much of Edgemont sits high, cresting near 1,245 metres at its southeast escarpment, which is why so many homes along the John Laurie ridgeline capture downtown skyline and Rocky Mountain views. Bordering Dalhousie to the south and the Hamptons and Hidden Valley to the north, the community has held its position as one of the northwest's most sought-after addresses, with a diverse population, strong schools, and a market that consistently draws move-up families and long-term owners.",
      "The average sale price in Edgemont sits at roughly $865,993, placing it firmly in Calgary's upper-middle to luxury tier for a detached, ridge-view northwest community."
    ],
    "realEstateCopy": [
      "Edgemont's housing stock is predominantly detached single-family homes built from the late 1970s through the 2000s, reflecting the community's staged rollout across its seven subareas. Buyers find generous pie lots on quiet crescents, walkout bungalows and two-storeys backing onto ravines and green space, and larger custom and estate homes along the Edgeridge and Edgevalley ridgelines where the mountain and city views command a premium. Condominiums and townhomes make up a small share of the market, keeping Edgemont overwhelmingly owner-occupied. Against the community's average sale price near $865,993, entry-level bungalows and ravine estate properties sit on either side of that figure.",
      "Spencer Rivers represents both buyers and sellers throughout Edgemont and can surface off-market and pre-list opportunities on the community's tightly held ridge-view and ravine-backing streets."
    ],
    "lifeCopy": [
      "Edgemont suits families who want space, quiet, and top-rated schools without leaving the northwest. Days revolve around neighbourhood pathways, hockey and soccer through the community association, and a short walk or drive to Nose Hill Park for the dog or a morning run. It is a settled, multi-generational community where children walk to Edgemont School and Tom Baines, and where established landscaping and mature trees give the streets a lived-in, cared-for feel that newer suburbs cannot match."
    ],
    "outsideCopy": [
      "Nose Hill Park anchors Edgemont's outdoor life, with 11 square kilometres of native grassland, off-leash areas, and ridge trails directly off the community's eastern edge. Within Edgemont, a network of ravines, green corridors and paved pathways threads between the subareas, linking playgrounds, tobogganing hills, and the seasonal outdoor rink run by the community association. The elevated escarpment gives walkers and cyclists open sightlines to the mountains and downtown."
    ],
    "amenitiesCopy": [
      "The Edgemont Community Association runs soccer, softball, basketball, grassroots hockey, yoga, seniors' programs and before-and-after-school care, plus the seasonal ice rink. Commuters rely on the four major roads that frame the community, John Laurie Boulevard, Sarcee Trail, Shaganappi Trail and Country Hills Boulevard, feeding quickly toward Crowchild Trail and Stoney Trail. Dalhousie Station on the CTrain Red Line sits just south, connecting Edgemont to the University of Calgary, Foothills and downtown."
    ],
    "shopDineCopy": [
      "Everyday shopping sits minutes away at Beacon Hill Shopping Centre directly north across Country Hills Boulevard, anchored by Real Canadian Superstore, Costco, Home Depot and Canadian Tire alongside restaurants and services. Crowfoot Crossing in nearby Arbour Lake adds a large-format retail hub with a Cineplex theatre, grocery, banks and dining, while Market Mall to the south offers upscale shopping and everyday errands within a short drive."
    ],
    "schools": [
      {
        "name": "Edgemont School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://edgemont.cbe.ab.ca/"
      },
      {
        "name": "Tom Baines School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://tombaines.cbe.ab.ca/"
      },
      {
        "name": "Sir Winston Churchill High School",
        "level": "High School",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Mother Mary Greene School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Francis High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "meadowlark-park",
    "story": [
      "Meadowlark Park is a pocket inner-city community in southwest Calgary, bounded by Glenmore Trail to the south, Macleod Trail to the east, Elbow Drive to the west, and 58 Avenue to the north. Established in 1955 and named for the western meadowlark, it sits just south of the Elbow River, a short walk from Chinook Centre and minutes from the downtown core.",
      "Only a few hundred homes sit west of 5 Street on quiet, curving streets, giving Meadowlark Park a village feel rare this close to the city centre. The community shares edges with Mayfair, Bel-Aire, Windsor Park, and Kingsland, and its 1950s origins are still visible in the mature trees and generous lots that now anchor a wave of custom rebuilds.",
      "In Calgary's market, Meadowlark Park reads as a small, tightly held inner-city enclave where scarcity drives value. With so few properties and direct access to the Elbow River pathways, Elbow Drive, and Chinook, turnover is limited and well-built infill homes command a premium."
    ],
    "realEstateCopy": [
      "Housing in Meadowlark Park began as 1950s single-family bungalows on wide, flat lots, and much of the original stock has since been renovated or replaced with two-storey custom infills. Buyers here find a mix of updated post-war homes and architect-designed rebuilds with modern layouts, oversized garages, and mature landscaping. The average sale price sits around $1,395,780, reflecting a market driven more by lot value, location, and new construction than by dated inventory, with prices ranging from renovated originals to high-end new builds. Spencer Rivers represents both buyers and sellers in Meadowlark Park and can surface off-market opportunities in a community where few homes reach the open market."
    ],
    "lifeCopy": [
      "Meadowlark Park suits buyers who want inner-city access without the density, professionals and downsizing families drawn to walkable streets, quick commutes, and a genuine sense of community. Daily life leans on proximity: a few minutes to Chinook Centre for shopping, the Elbow River pathways for morning runs, and Elbow Drive for the short drive downtown. It is a quiet, established pocket where neighbours know one another and the pace stays calm."
    ],
    "outsideCopy": [
      "The Elbow River corridor sits just west across Elbow Drive, opening onto the regional pathway network that connects to Stanley Park, Sandy Beach, and River Park with their off-leash areas, riverbank trails, and picnic spots. Within the community, Meadowlark Park's own green space and rink offer everyday recreation, while Glenmore Athletic Park and the reservoir pathways are a short drive south for cycling, running, and sport."
    ],
    "amenitiesCopy": [
      "The Meadowlark Park Community Association maintains a community hall and outdoor rink and runs local programming and events. Commuting is a strength: Elbow Drive, Macleod Trail, and Glenmore Trail all border the community, and the Chinook CTrain station on the Red Line sits just east across Macleod Trail, putting downtown within a short ride. Access to Deerfoot and the ring road is straightforward from Glenmore Trail."
    ],
    "shopDineCopy": [
      "CF Chinook Centre, one of Calgary's largest shopping and dining destinations, sits immediately east of the community with anchor retailers, a cinema, and dozens of restaurants. A short drive north on Elbow Drive reaches Britannia Plaza, home to Monogram Coffee, Village Ice Cream, and Sunterra Market. Everyday groceries, cafes, and services along Macleod Trail and Elbow Drive keep errands close to home."
    ],
    "schools": [
      {
        "name": "Chinook Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://chinookpark.cbe.ab.ca/"
      },
      {
        "name": "Woodman School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://woodman.cbe.ab.ca/"
      },
      {
        "name": "St. Augustine School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": "https://staugustine.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "ramsay",
    "story": [
      "Ramsay is an inner-city community in Calgary's southeast, set on the high ground east of the Elbow River and Macleod Trail, directly above the Stampede grounds and the Scotiabank Saddledome and immediately south of Inglewood. It is one of Calgary's oldest neighbourhoods, and it still reads that way: Spiller Road, the community's spine, follows the route of an original First Nations trail, and Scotsman's Hill on its western edge once supplied the sandstone for many of Calgary's historic buildings.",
      "The Ramsay name dates to 1956, when the older enclaves of Burnsland, Brewery Flats, Grandview and Mills Estate consolidated under one identity, honouring early land agent William Thomson Ramsay. Workers' cottages built beside the CPR yards, the Calgary Brewery and the stockyards gave the area its Edwardian and Queen Anne Revival character, much of it intact today. That heritage fabric, walkable scale and downtown-adjacent location have made Ramsay one of the city centre's most sought-after addresses, with an average sale price on file of $1,371,368."
    ],
    "realEstateCopy": [
      "Ramsay's housing stock is a genuine mix of eras. Restored century homes in Edwardian, Queen Anne Revival and early-1900s foursquare styles sit next to bold contemporary infills, many on the original narrow lots that give the streets their tight, established feel. Character properties and renovated bungalows generally trade below the community's $1,371,368 average, while architect-designed new builds and homes commanding the Scotsman's Hill escarpment, with unobstructed downtown skyline views, push well past it. Spencer Rivers represents both buyers and sellers throughout Ramsay and, through his network of owners and agents, can surface off-market opportunities in this tightly held, low-turnover pocket before they reach public listings."
    ],
    "lifeCopy": [
      "Ramsay suits buyers who want an authentic, walkable urban neighbourhood over a manicured suburb: professionals, downsizers, creatives and design-minded families drawn to heritage streets minutes from the core. Days here run on foot and by bike, with the office a short walk across the river, coffee and dinner in neighbouring Inglewood, and a close-knit, well-organized community that turns out for the annual Stampede fireworks viewed from its own front-row hill."
    ],
    "outsideCopy": [
      "The west edge of Ramsay is defined by Scotsman's Hill, the escarpment lookout that delivers panoramic downtown and Stampede-grounds views and includes a roughly three-acre off-leash dog area. Ramsay Park adds a playground, picnic space and tennis courts, and the community connects to the Elbow River and Bow River pathway network for walking, running and cycling straight into downtown and out toward Pearce Estate Park."
    ],
    "amenitiesCopy": [
      "The active Ramsay Community Association anchors local life and events. Commuting is a genuine advantage: downtown is a short drive or cycle across the Elbow River, with Macleod Trail, Blackfoot Trail and Deerfoot Trail all at the community's doorstep. The planned Ramsay/Inglewood Green Line LRT station will link the neighbourhood directly to the wider transit network, adding to existing bus service including the Route 1 into the core."
    ],
    "shopDineCopy": [
      "Ramsay's everyday shopping and dining sit next door on Inglewood's 9th Avenue SE, one of Calgary's best independent main streets, lined with boutiques, antique dealers, art galleries, cafes and destination restaurants. The local brewery and coffee scene runs deep, from Cold Garden and High Line Brewing to Rosso Coffee Roasters, and the seasonal Inglewood Night Market brings artisan vendors, food trucks and live music within an easy walk of Ramsay's streets."
    ],
    "schools": [
      {
        "name": "Ramsay School",
        "level": "Elementary (K-6)",
        "area": "CBE public",
        "url": "https://ramsay.cbe.ab.ca/"
      },
      {
        "name": "Western Canada High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/westerncanada/"
      },
      {
        "name": "St. Monica School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://stmonica.cssd.ab.ca/"
      },
      {
        "name": "St. Mary's High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://stmarys.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "varsity-estates",
    "story": [
      "Varsity Estates is the most upscale enclave within the larger Varsity community in northwest Calgary, sitting on the plateau above the Bow River valley. The community was developed through the 1960s and early 1970s, with Varsity Estates itself launched at a 1971 home show, and it has held its standing as one of the quadrant's premier addresses ever since.",
      "The broader Varsity area is bounded by the Bow River to the west, 32 Avenue NW to the south, Crowchild Trail to the east, and Shaganappi Trail to the north, with Varsity Estates occupying the western edge along the escarpment. Homes back onto Bowmont Natural Environment Park and border the private Silver Springs Golf and Country Club. The University of Calgary, Foothills Medical Centre, Alberta Children's Hospital, and Market Mall all sit within minutes.",
      "With an average sale price near $1,100,000, Varsity Estates trades at a clear premium to surrounding Varsity Acres and Varsity Village, reflecting its ravine lots, mature setting, and inner-city access to the University District."
    ],
    "realEstateCopy": [
      "Varsity Estates is almost entirely single-detached homes on wide lots, most without rear lanes, on curving streets that follow the escarpment. The original housing stock dates to the early 1970s, and much of it has since been renovated or rebuilt, so buyers find a mix of well-kept mid-century bungalows and two-storeys alongside custom infills and luxury rebuilds. Lots backing Bowmont Park or the Silver Springs golf course command the strongest prices, pulling well above the roughly $1,100,000 community average. Spencer Rivers represents both buyers and sellers in Varsity Estates and can surface off-market opportunities along the ravine and golf-course edges that rarely reach public listings."
    ],
    "lifeCopy": [
      "Varsity Estates suits established families, University of Calgary faculty, medical professionals working at Foothills and the Children's Hospital, and downsizers who want an established northwest address without leaving the inner city. Daily life leans on quiet residential streets, mature trees, and quick access to campus, Market Mall, and the river pathways. It is a settled, low-turnover community where neighbours stay for decades and homes trade on reputation as much as listing photos."
    ],
    "outsideCopy": [
      "The community's western edge opens directly onto Bowmont Natural Environment Park, a large river-valley preserve with hiking and biking trails, coulees, and Bow River access. The private Silver Springs Golf and Country Club borders the neighbourhood to the north, and Varsity Park and the regional Bow River pathway system add everyday options for walking, cycling, and birdwatching along the escarpment."
    ],
    "amenitiesCopy": [
      "The Varsity Community Association runs local programs and events for residents across Varsity Estates, Acres, and Village. Commuting is straightforward: Crowchild Trail and Shaganappi Trail frame the community for quick trips downtown or to Stoney Trail, and the University and Dalhousie CTrain stations on the Red Line put the University of Calgary, downtown, and the northwest within a short ride. Market Mall and the Foothills medical campus are minutes away."
    ],
    "shopDineCopy": [
      "Market Mall sits on the community's southern edge with a full roster of national retailers, restaurants, and services after its major expansion. Northland Village mall and Dalhousie Station, just across Crowchild Trail, add grocery, dining, and boutique shopping, and the University District's newer shops and restaurants are a short drive south. Everyday errands, from groceries to dinner out, are handled without leaving the northwest."
    ],
    "schools": [
      {
        "name": "Marion Carson School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/marioncarson/"
      },
      {
        "name": "F.E. Osborne School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/feosborne/"
      },
      {
        "name": "Sir Winston Churchill High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/sirwinstonchurchill/"
      },
      {
        "name": "St. Vincent de Paul School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "hamptons",
    "story": [
      "The Hamptons is a master-planned golf-course community at the northwest edge of Calgary, laid out around the 18-hole Hamptons Golf Club. It sits bounded by Stoney Trail to the north, Shaganappi Trail to the east, Country Hills Boulevard to the south, and Sarcee Trail to the west, sharing this corner of the city with Edgemont, Hidden Valley, and Country Hills.",
      "Established in 1990 and built out by Tirion Properties, the community grew up around a Bill Newis-designed course that opened in 1993 as the private Country Club at the Hamptons. Executive homes line the fairways, ponds, and natural ravines, and more than three decades on the streets carry mature trees and a settled, established character.",
      "In Calgary's northwest luxury market, the Hamptons holds steady demand. Sixty-six single-family homes sold across the community in 2025, and properties here trade around the $890,045 average on file — established golf-course addresses that turn over less often than newer suburbs on the city's rim."
    ],
    "realEstateCopy": [
      "Housing in the Hamptons is predominantly detached single-family estate homes built through the 1990s and early 2000s — two-storeys and bungalows on roughly 0.15-acre lots, many with walkout basements backing onto the golf course, green space, or ponds. Architecture leans traditional executive: stucco, brick, and stone elevations, triple garages, and mature landscaping. Prices run from the high $700,000s for interior lots to well past $1.4 million for renovated walkouts on the fairway, with the community average near $890,045.",
      "Spencer Rivers represents both buyers and sellers throughout the Hamptons and can surface off-market opportunities on the most sought-after golf-course and cul-de-sac lots before they reach the public market."
    ],
    "lifeCopy": [
      "The Hamptons suits established families and professionals who want space, quiet streets, and a golf-course setting without leaving the city. Days run on school routines, walks along the pathway network, tennis and skating at the community rink, and a round at the Hamptons Golf Club. It is a low-turnover neighbourhood where households tend to stay for years and neighbours know one another by name."
    ],
    "outsideCopy": [
      "The community maintains roughly 30 acres of parkland, a paved bike-path system, soccer pitches, ball diamonds, tennis and practice courts, an Olympic-size outdoor hockey rink with heated sheltered bleachers, and a creative playground. Pathways connect directly to Nose Hill Park, one of Calgary's largest natural-environment parks, for off-leash areas, prairie grassland, and open city views minutes from home."
    ],
    "amenitiesCopy": [
      "The Hamptons Community Association doubles as the homeowners association, funding and running the rinks, courts, fields, and green spaces through an annual fee. Commuting is quick: Stoney Trail and Sarcee Trail ring the community for fast access across the city and out to Calgary International Airport, while Country Hills Boulevard and Shaganappi Trail feed downtown routes. The nearest C-Train is Crowfoot Station to the west."
    ],
    "shopDineCopy": [
      "Everyday shopping sits minutes away. The Beacon Hill shopping district anchors the area with Costco, Home Depot, and Canadian Tire, while Country Hills Town Centre adds grocery stores, restaurants, and services, and Sobeys Country Hills runs around the clock. A neighbourhood plaza on Hamptons Drive keeps everyday services — medical offices, a liquor store, car wash, and quick-service dining — close to home."
    ],
    "schools": [
      {
        "name": "The Hamptons School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://hamptons.cbe.ab.ca/"
      },
      {
        "name": "Captain John Palliser School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://captainjohnpalliser.cbe.ab.ca/"
      },
      {
        "name": "Tom Baines School",
        "level": "Junior High",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Sir Winston Churchill High School",
        "level": "High School",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "St. Dominic Fine Arts School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Jean Brebeuf School",
        "level": "Junior High",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Francis High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "evanston",
    "story": [
      "Evanston is a master-planned family community in northwest Calgary, set on the rolling terrain of the Symons Valley area north of Stoney Trail. Most of the neighbourhood was built out through the 2000s and 2010s, giving it a consistent, newer character. It sits bounded by 144 Avenue NW to the north, 14 Street NW to the east, Stoney Trail to the south, and Symons Valley Road with Sarcee and Shaganappi Trail to the west, sharing edges with Kincora, Sage Hill, Carrington, Nolan Hill, and Panorama Hills.",
      "The community was designed around walkability, with roughly 16 parks, seven playgrounds, and a pathway network tied into the West Nose Creek corridor. In Calgary's northwest market, Evanston reads as an accessible, amenity-rich choice for buyers who want new construction, quick ring-road access, and everyday shopping without paying inner-city prices. The average sale price on file sits near $600,011, placing it among the more attainable move-up communities in the quadrant."
    ],
    "realEstateCopy": [
      "Evanston's housing stock is almost entirely modern, reflecting its 2000s-and-2010s build-out: detached two-storey homes on a range of lot widths, laned and front-drive product, plus attached townhomes and low-rise condominiums that anchor the entry-level end. Architecture leans contemporary and transitional, with open-plan layouts, attached double garages, and finished basements common on the larger lots. Pricing spans from the low $300,000s for apartment-style condos to well past $800,000 for the largest estate-style detached homes, with the community average near $600,011. Spencer Rivers represents both buyers and sellers throughout Evanston and can surface off-market opportunities before they reach MLS."
    ],
    "lifeCopy": [
      "Evanston suits growing families, first-time move-up buyers, and commuters who want a newer home with room to grow. Daily life runs on short trips: schools, playgrounds, and grocery are minutes from most doors, and Stoney Trail puts the airport, the northwest employment nodes, and the mountains within easy reach. The mix of detached homes and condos keeps the community diverse, drawing young professionals and established families alike into an active, walkable neighbourhood."
    ],
    "outsideCopy": [
      "Evanston is built around green space, with roughly 16 parks, seven playgrounds, and about 6.3 kilometres of pathways woven through the community. Trails connect to the regional system along the West Nose Creek corridor, and landscaped storm ponds give walkers, runners, and dog owners a natural loop close to home. Open fields and sledding hills add year-round recreation, while nearby Sage Hill and Nolan Hill extend the pathway network further north."
    ],
    "amenitiesCopy": [
      "The Evanston Creekside Community Association programs local events, sports, and family activities from its facilities in the community. Commuting is straightforward: Stoney Trail (Highway 201) runs along the south edge for fast ring-road access, while Symons Valley Parkway, Shaganappi Trail, and 14 Street NW connect south toward downtown, served by Calgary Transit bus routes. The planned Symons Valley Centre nearby will add a new library, green commons, and main street to the area."
    ],
    "shopDineCopy": [
      "Everyday shopping sits inside the community at Evanston Towne Centre, anchored by FreshCo grocery and Shoppers Drug Mart, with Tim Hortons, Little Caesars, and Quesada for quick meals. Minutes west, Sage Hill Crossing adds Real Canadian Superstore, Walmart, Canadian Tire, Winners, Cineplex VIP Cinemas, and restaurants including Leopold's Tavern and Sunset Grill. Creekside Shopping Centre nearby brings Calgary Co-op, RONA, and Starbucks, giving Evanston residents big-box and grocery options within a short drive."
    ],
    "schools": [
      {
        "name": "Kenneth D. Taylor School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://kennethdtaylor.cbe.ab.ca/"
      },
      {
        "name": "Evanston Heights School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://cbe.ab.ca/schools/building-and-modernizing-schools/Pages/evanston-middle-school.aspx"
      },
      {
        "name": "Robert Thirsk High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://robertthirsk.cbe.ab.ca/"
      },
      {
        "name": "Our Lady of Grace School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://ourladyofgrace.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "elbow-valley",
    "story": [
      "Elbow Valley is a private, master-planned estate community in Rocky View County, straddling Highway 8 just west of Calgary's city limits and bordered by Springbank to the west and Discovery Ridge to the east. The community follows the Elbow River corridor and Lott Creek, with Hidden Hollow Villas and the original phases south of Highway 8 and the newer phases rising to the north. Downtown Calgary sits roughly 20 minutes east; the Rocky Mountain foothills begin just beyond the community's western edge.",
      "Built around resident-owned common lands, three private lakes, and close to 30 kilometres of pathways, Elbow Valley was planned as a nature-first alternative to the bare acreages of Springbank and Bearspaw. Homeowners pay a monthly fee to the Elbow Valley Residents Club, which maintains the lakes, beach, trails, and shared amenities.",
      "Within Calgary's west-side luxury market, Elbow Valley holds a distinct position: estate living and lake access on the doorstep of the mountains, minutes from Aspen and West Springs, yet outside the city on county land and taxes."
    ],
    "realEstateCopy": [
      "Housing in Elbow Valley runs from custom estate homes on half-acre to multi-acre lots through to lower-maintenance villas and smaller acreages, most built from the late 1990s onward in the walkout bungalow, mountain-craftsman, and traditional two-storey styles that suit the wooded, wetland setting. Lots back onto ponds, greenspace, and the pathway network, and privacy is the norm rather than the exception. The community's average sale price sits near $1,978,750, with lakefront and larger estate properties regularly trading well past $3 million. Spencer Rivers represents both buyers and sellers throughout Elbow Valley and can surface off-market estate and villa opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Elbow Valley suits families and established professionals who want acreage-style space and lake access without giving up a quick commute to Calgary's west side. Daily life leans outdoor and social: morning walks on the trail network, kayaking or paddle-boarding from the community boathouse, tennis and pickleball, skating in winter, and gatherings at the Residents Club. It is a quiet, low-traffic community where children bike to the beach and neighbours know one another."
    ],
    "outsideCopy": [
      "Residents have close to 30 kilometres of private pathways and three stocked lakes, including trout fishing at Fisherman's Lake, plus a beach, boathouse, tennis and pickleball courts, and winter skating. Lott Creek and the Elbow River corridor thread through protected wetlands and parkland. Elbow Springs Golf Club sits within the community, and the Glencoe Golf & Country Club and Kananaskis trails are a short drive west."
    ],
    "amenitiesCopy": [
      "The Elbow Valley Residents Club is the community's hub, maintaining the lakes, pathways, and common lands and hosting year-round events through a monthly resident fee. Highway 8 runs straight into the city, connecting to Sarcee Trail, Stoney Trail, and the Trans-Canada Highway, putting downtown about 20 minutes away and the mountains within an hour. The West LRT terminus at 69 Street Station is the nearest CTrain access for commuters."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes east in Calgary's west communities. Aspen Landing Shopping Centre offers Safeway, cafes, and restaurants; West Market Square carries Sunterra Market; and West Springs has a Calgary Co-op. Westhills and Signal Hill Shopping Centres add Real Canadian Superstore, Winners, and a Cineplex. Bragg Creek's shops and the mountain towns are a short drive west along Highway 8 and the Trans-Canada."
    ],
    "schools": [
      {
        "name": "École Elbow Valley Elementary School",
        "level": "Elementary (K-4)",
        "area": "Rocky View Schools",
        "url": "https://elbowvalley.rockyview.ab.ca/"
      },
      {
        "name": "Springbank Middle School",
        "level": "Middle (5-8)",
        "area": "Rocky View Schools",
        "url": "https://springbankmd.rockyview.ab.ca/"
      },
      {
        "name": "Springbank Community High School",
        "level": "High School (9-12)",
        "area": "Rocky View Schools",
        "url": "https://springbankhs.rockyview.ab.ca/"
      }
    ]
  },
  {
    "slug": "lakeview",
    "story": [
      "Lakeview is an established west-side Calgary community on the south shore of the Glenmore Reservoir, bordered by Glenmore Trail to the north, Crowchild Trail to the east, 37th Street SW to the west, and the Tsuut'ina Nation to the southwest. Founded in 1962 on land Calgary annexed in 1956, it took its name from the reservoir views its elevation affords, and many of its first houses were built by Engineered Homes Ltd.",
      "More than sixty years on, Lakeview keeps the quiet, tree-lined feel of a planned mid-century neighbourhood while a steady wave of renovations and infills has reshaped its housing stock. The enclave of Lakeview Village, south of 66th Avenue, holds the community's larger and higher-end homes.",
      "With direct reservoir frontage, mature lots, and quick downtown access, Lakeview sits among Calgary's sought-after inner southwest communities, drawing buyers who want established character near green space rather than a new outer suburb."
    ],
    "realEstateCopy": [
      "Lakeview's housing stock runs from original 1960s bungalows and split-levels on generous, mature lots to extensively renovated homes and contemporary custom infills. The community's wide streets and larger-than-average lots give builders room to work, and the Lakeview Village pocket south of 66th Avenue anchors the top of the local market. Against a community average sale price near $1,012,935, buyers find a genuine range: livable mid-century homes and land-value teardowns at the lower end, and executive new builds well above the average.",
      "Spencer Rivers represents both buyers and sellers throughout Lakeview and Lakeview Village, and can surface off-market opportunities that never reach public listing sites."
    ],
    "lifeCopy": [
      "Lakeview suits families, downsizers, and outdoor-minded professionals who want an established, walkable neighbourhood close to the water and the core. Days here revolve around the reservoir pathways, school runs to Jennie Elliott, and easy weekend access to North Glenmore Park. It is a settled, low-turnover community where neighbours stay for decades, and its inner-southwest position keeps commutes, groceries, and recreation all within a short drive."
    ],
    "outsideCopy": [
      "Lakeview's defining amenity is the Glenmore Reservoir itself. North Glenmore Park runs along its shore with picnic areas and paved multi-use pathways that link to the Weaselhead Flats natural area and the broader Elbow River pathway system. The Calgary Canoe Club and Calgary Rowing Club launch from the reservoir, and the surrounding parkland offers cycling, walking, birdwatching, and paddling minutes from home."
    ],
    "amenitiesCopy": [
      "The Lakeview Community Association runs local programs, sports, and events and maintains neighbourhood green space. Commuting is straightforward: Crowchild Trail and Glenmore Trail bound the community and connect quickly to Sarcee Trail, Stoney Trail, and downtown, while Mount Royal University sits just across Glenmore Trail. Nearby recreation includes the Glenmore rowing and canoe clubs and the pathways of North Glenmore Park."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes away. Glenmore Landing, just across the reservoir, offers groceries, cafes, restaurants, wine shops, and health services, while Westhills Shopping Centre to the west adds big-box retail, banks, fitness studios, and a Cineplex cinema. Marda Loop's independent restaurants and boutiques in neighbouring Altadore are a short drive northeast for evenings out."
    ],
    "schools": [
      {
        "name": "Jennie Elliott School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://jennieelliott.cbe.ab.ca/"
      },
      {
        "name": "Bishop Pinkham School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://bishoppinkham.cbe.ab.ca/"
      },
      {
        "name": "Central Memorial High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://centralmemorial.cbe.ab.ca/"
      },
      {
        "name": "St. James School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-james"
      },
      {
        "name": "Bishop Carroll High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/bishop-carroll"
      }
    ]
  },
  {
    "slug": "oakridge",
    "story": [
      "Oakridge is an established single-family community on the southwest edge of Calgary, sitting directly south of the Glenmore Reservoir and the Weaselhead Natural Area. The community runs north to 90 Avenue SW, east to 24 Street SW, and wraps south and west along Southland Drive and Oakmount Drive, with Heritage Park Historical Village a short drive up the reservoir shoreline.",
      "The land was annexed from Rocky View County in 1956 and built out through the 1970s, giving Oakridge the mature trees, wide lots, and quiet curvilinear streets that newer suburbs spend decades trying to grow. Neighbouring Palliser, Bayview, Cedarbrae, and Pump Hill round out this pocket of southwest Calgary prized for green space and reservoir access.",
      "In Calgary's market, Oakridge trades as a value-driven inner-southwest option: detached homes on generous lots, walking distance to the water, at prices below the tighter luxury enclaves next door."
    ],
    "realEstateCopy": [
      "Housing in Oakridge is overwhelmingly detached and single-family, a mix of 1970s bungalows, bi-levels, and two-storey homes on the deep, often pie-shaped lots typical of the era. Original owners and thoughtful renovators sit side by side, and the larger lots make the community a steady target for infill and full rebuilds. With an average sale price near $567,000, Oakridge lands well under Calgary's premier southwest addresses while offering the same reservoir proximity and mature-tree character, which keeps well-priced homes moving quickly. Spencer Rivers represents both buyers and sellers throughout Oakridge and can surface off-market opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Oakridge suits families and downsizers who want space, trees, and water access without leaving the city. Days here lean outdoors and unhurried: a morning walk along the reservoir, kids biking to Louis Riel School, weekend grocery runs to the Oakridge Co-op, and evenings on a quiet crescent. It is a settled, community-minded pocket of southwest Calgary where neighbours stay for decades and homes rarely feel anonymous."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines outdoor life here. South Glenmore Park and the Weaselhead Flats sit at Oakridge's doorstep, with paved pathways, canoe and kayak launches, cycling loops, and birdwatching along the water. North Glenmore Park, the sailing and rowing clubs, and Heritage Park's shoreline are all within easy reach, and the community rink and green spaces keep recreation close to home year-round."
    ],
    "amenitiesCopy": [
      "The Oakridge Community Association runs local programs, sports, and the neighbourhood rink from its hall off Oakmount Drive. Commuting is straightforward: 90 Avenue, Southland Drive, and 24 Street SW feed quickly onto 14 Street SW and Anderson Road, with Glenmore Trail carrying drivers east and west across the city. The Anderson CTrain station on the Red Line, a short drive southeast, connects Oakridge to downtown Calgary."
    ],
    "shopDineCopy": [
      "Everyday shopping centres on the Oakridge Co-op at Southland Drive and 24 Street SW, a full grocery store with a pharmacy, bakery, deli, and florist. Nearby Glenmore Landing, at 90 Avenue and 14 Street SW, adds restaurants, cafes, and services overlooking the reservoir, while Southland Drive and Anderson Road put big-box retail, dining, and the shops of neighbouring Willow Park and Southcentre within a few minutes' drive."
    ],
    "schools": [
      {
        "name": "Louis Riel School",
        "level": "Elementary & Junior High",
        "area": "CBE public",
        "url": "https://louisriel.cbe.ab.ca/"
      },
      {
        "name": "Nellie McClung School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://nelliemcclung.cbe.ab.ca/"
      },
      {
        "name": "John Ware School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://johnware.cbe.ab.ca/"
      },
      {
        "name": "St. Cyril School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/st-cyril"
      }
    ]
  },
  {
    "slug": "elbow-valley-west",
    "story": [
      "Elbow Valley West is a newer estate enclave in Rocky View County, set directly west of the original Elbow Valley community and just beyond Calgary's southwest edge along Highway 8. It sits within the broader Springbank area, bordered by the Elbow River corridor and the foothills that roll toward Bragg Creek and Kananaskis, with the Tsuut'ina Nation lands and Discovery Ridge to the east.",
      "The community grew out of Elbow Valley's success as a lake-and-pathway estate destination, extending the same low-density, acreage-scale planning into a more recent generation of custom homes. Residents keep a country-residential address while staying roughly 20 to 25 minutes from downtown Calgary via Highway 8 and Stoney Trail.",
      "In Calgary-area real estate, Elbow Valley West anchors the upper tier of west-side acreage living, trading the density of West Springs or Aspen for larger lots, longer views, and newer construction than the neighbouring original community."
    ],
    "realEstateCopy": [
      "Housing in Elbow Valley West is dominated by newer custom estate homes, walkout bungalows, and villa-style residences, most built on lots ranging from roughly one to two acres against ravine, river, or foothills backdrops. The architecture skews to modern mountain and transitional builds with triple garages, main-floor primary suites, and developed walkouts. With an average sale price around $3,242,500, the community reflects its larger, later-generation estates rather than the more modestly priced homes in the original Elbow Valley, and pricing spans from the low seven figures into custom acreage territory well above the average. Spencer Rivers represents both buyers and sellers in Elbow Valley West and can surface off-market opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "Elbow Valley West suits families and professionals who want acreage-scale privacy without giving up a quick commute to west Calgary. Days here run on space and quiet: cul-de-sac streets, room for children and dogs to roam, and easy weekend access to the mountains. It draws established owners trading up from inner-city Calgary, executives working downtown or in the west business corridors, and buyers who want a rural feel with city services minutes away along Highway 8."
    ],
    "outsideCopy": [
      "The setting is the draw, with the Elbow River, mature tree cover, and an extensive network of walking and cycling pathways threading the community. Nearby Griffith Woods Park protects river-valley forest along the Elbow, while West Bragg Creek and Kananaskis Country put world-class hiking, cross-country skiing, and fly-fishing within a short drive. The original Elbow Valley's lakes and Residents Club sit just to the east for those with access."
    ],
    "amenitiesCopy": [
      "A community association coordinates local events and maintains shared pathways and green space. The everyday advantage is access: Highway 8 links directly to Stoney Trail, Calgary's ring road, putting the west-side business parks, Westside Recreation Centre, and downtown within a 20-to-25-minute reach. Springbank's country recreation, including Springbank Park For All Seasons, and the amenities of West Springs and Aspen are all a short drive east toward the city."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes east in west Calgary. Aspen Landing Shopping Centre is the closest hub, with Blush Lane organic grocery, cafes, and restaurants including Vin Room West, while nearby West Springs and West 85th add more services and dining. Calgary Farmers' Market West is a short drive along Highway 8, and the village of Bragg Creek to the west offers boutiques, pubs, and weekend dining at the edge of the foothills."
    ],
    "schools": [
      {
        "name": "École Elbow Valley Elementary School",
        "level": "Elementary",
        "area": "Rocky View Schools (Springbank designated)",
        "url": "https://elbowvalley.rockyview.ab.ca/"
      },
      {
        "name": "Springbank Middle School",
        "level": "Middle School",
        "area": "Rocky View Schools (Springbank designated)",
        "url": "https://springbankmd.rockyview.ab.ca/"
      },
      {
        "name": "Springbank Community High School",
        "level": "High School",
        "area": "Rocky View Schools (Springbank designated)",
        "url": "https://springbankhs.rockyview.ab.ca/"
      },
      {
        "name": "Webber Academy",
        "level": "Pre-K to Grade 12",
        "area": "Independent (west Calgary)",
        "url": "https://www.webberacademy.ca/"
      },
      {
        "name": "Calgary French & International School",
        "level": "Pre-K to Grade 12",
        "area": "Independent (west Calgary)",
        "url": "https://www.cfis.com/"
      }
    ]
  },
  {
    "slug": "signal-hill",
    "story": [
      "Signal Hill is a west-side hillside community that climbs the slopes above the West LRT line, roughly bounded by Sarcee Trail to the east, 69 Street SW to the west, and Bow Trail across the north. Built out mainly through the 1980s and 1990s, it gathers several distinct enclaves under one name, including Sienna Hills, Signal Ridge, Sierra Morena, and Signature Parke, on terraced streets that open to Rocky Mountain and city-skyline views.",
      "The community takes its identity from Battalion Park, where roughly 16,000 whitewashed stones on the southern slope spell out the numbers of the First World War battalions who trained on the hill. Today Signal Hill reads as one of southwest Calgary's most established family districts, with mature landscaping, quick access to the mountains, and a steady, liquid resale market that keeps homes moving in a matter of weeks rather than months."
    ],
    "realEstateCopy": [
      "Housing in Signal Hill spans the full range, from entry-level condominiums and townhomes to two-storey family homes and executive residences on view lots along the ridge. Most stock dates to the 1980s and 1990s, with generous lots, attached garages, and floor plans built for families. The blended average sale price sits around $628,322, though that figure spans a wide band, apartments and townhomes trading well below it while detached homes on the upper slopes routinely clear seven figures. Spencer Rivers represents both buyers and sellers throughout Signal Hill and can surface off-market opportunities that never reach public search."
    ],
    "lifeCopy": [
      "Signal Hill suits families and professionals who want established west-side space without giving up a fast commute. Days here run on the rhythm of school pickups, weekend runs to Westhills, and a downtown that is a short LRT ride away. Cul-de-sacs and hillside crescents keep traffic calm, mature trees shade the streets, and neighbours tend to stay for the long haul, which gives the community a settled, low-turnover feel."
    ],
    "outsideCopy": [
      "Battalion Park anchors the community's green space, its historic stone battalion numbers set into the southern hillside above a network of walking paths and lookout points with mountain and city views. Interior pathways, playgrounds, and green corridors thread the residential streets, and Edworthy Park, the Douglas Fir Trail, and the Bow River pathway sit a short drive north for longer rides, runs, and off-leash outings."
    ],
    "amenitiesCopy": [
      "The Signal Hill Community Association runs local programming and events for residents across the hill's enclaves. Commuters have among the best access on the west side: the 69 Street CTrain station on the West LRT line reaches downtown in about 25 minutes, while Sarcee Trail, Bow Trail, and Glenmore Trail feed quickly onto Stoney Trail and out to the mountains along the Trans-Canada Highway."
    ],
    "shopDineCopy": [
      "Signal Hill wraps around one of Calgary's largest retail hubs, where Signal Hill Centre and the adjacent Westhills Towne Centre combine dozens of shops and services, from a Real Canadian Superstore to national retailers, plus Westmarket Square and Signature Park Plaza. Dining nearby ranges from The Bro'Kin Yolk for breakfast to Kinjo Sushi & Grill and National on Westhills for evenings out, with everyday groceries, cafes, and services all within minutes."
    ],
    "schools": [
      {
        "name": "Battalion Park School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://battalionpark.cbe.ab.ca/"
      },
      {
        "name": "William Reid School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://williamreid.cbe.ab.ca/"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://ernestmanning.cbe.ab.ca/"
      },
      {
        "name": "St. Andrew School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": "https://standrew.cssd.ab.ca/"
      },
      {
        "name": "St. Gregory School",
        "level": "Junior High",
        "area": "Calgary Catholic",
        "url": "https://stgregory.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "north-glenmore-park",
    "story": [
      "North Glenmore Park is an established west-side Calgary community set directly above the Glenmore Reservoir. It is bordered by the reservoir and its pathways to the south, 50 Avenue SW to the north, Crowchild Trail SW to the west, and Glenmore Athletic Park to the east, sharing edges with Lakeview, Altadore, and Lincoln Park.",
      "Annexed by Calgary in 1958 and established in 1959, the area carries an older history as the site of a stone quarry that supplied several of Calgary's historic sandstone buildings. That heritage shows in a community of just over 2,300 residents that has held its low-density, tree-lined character while a wave of custom infill has moved in alongside the original mid-century homes.",
      "In Calgary's inner-southwest luxury market, North Glenmore Park sits alongside Lakeview and Altadore as a reservoir-adjacent address that trades on green space, quiet streets, and quick downtown access rather than sheer size."
    ],
    "realEstateCopy": [
      "Housing in North Glenmore Park runs from original 1960s bungalows and split-levels on generous, mature lots to architect-led infills, custom two-storeys, and the occasional luxury rebuild. Wider frontages and the reservoir backdrop make the community a natural fit for high-end redevelopment, and detached homes make up the large majority of the stock. Against an average sale price of $1,399,258, the range spans renovated mid-century homes through new-build custom properties well above that mark, depending on lot position and proximity to the water. Spencer Rivers represents both buyers and sellers in North Glenmore Park and can surface off-market opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "The community suits buyers who want inner-city convenience without inner-city density: professionals, downsizers, and families drawn to quiet streets, established trees, and the reservoir at the doorstep. Daily life leans outdoors and unhurried, with pathway walks, quick drives to Marda Loop, and a short commute downtown. It rewards people who value a settled, low-key west-side address over the churn of a newer suburb."
    ],
    "outsideCopy": [
      "The Glenmore Reservoir defines the community's south edge, with North Glenmore Park itself offering tennis courts, playgrounds, picnic sites, an ice trail, and cross-country skiing in winter. The paved reservoir pathway loops toward the Weaselhead Natural Area and Sandy Beach, while Heritage Park and the sailing and rowing clubs sit within easy reach along the water."
    ],
    "amenitiesCopy": [
      "The North Glenmore Park Community Association anchors local programming, and Glenmore Athletic Park adds ball diamonds, a track, and an aquatic and fitness centre next door. Commuting is straightforward: Crowchild Trail and Glenmore Trail frame the community, 14 Street SW runs north to the core, and downtown is roughly a 15-minute drive, with the reservoir pathway network doubling as a car-free route toward the city centre."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes away. Glenmore Landing covers groceries and services to the south, while Marda Loop's 33rd Avenue strip offers cafes, restaurants, and independent shops a short drive north. Chinook Centre and its Nordstrom-anchored retail lie just east across the reservoir, and nearby Lakeview and Altadore add neighbourhood bistros and coffee spots for a quieter night out."
    ],
    "schools": [
      {
        "name": "Central Memorial High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/centralmemorial/"
      },
      {
        "name": "St. James School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "Calgary Girls' Charter School",
        "level": "Grades 4-9",
        "area": "Independent",
        "url": ""
      }
    ]
  },
  {
    "slug": "wildwood",
    "story": [
      "Wildwood is a mature west-side Calgary community set on a plateau above the Bow River valley, bordered on the north by Edworthy Park and the river, on the east by Spruce Cliff at 38th Avenue SW, on the south by Bow Trail, and reaching west toward Sarcee Trail. The area carries the name of Thomas Edworthy, one of Calgary's earliest settlers, who ran sandstone quarries here in the 1880s that supplied stone for many of the city's landmark buildings.",
      "Platted and built out through the 1950s and 1960s, Wildwood is a quiet enclave of tree-lined streets, wide lots, and rear laneways, with skyline and Rocky Mountain views from its higher ground. It remains one of the inner west's most tightly held addresses.",
      "With an average sale price around $1,177,244, Wildwood sits well above the Calgary benchmark, reflecting its Edworthy Park frontage, large mid-century lots, and short commute to downtown."
    ],
    "realEstateCopy": [
      "Wildwood's housing stock began as modest post-war bungalows and split-levels on generous 50-to-60-foot lots, and much of that original character survives in either renovated or rebuilt form. Buyers today find a mix of updated mid-century homes, expanded two-storeys, and luxury infills, with entry-level bungalows in the mid-$700,000s and ridge-view and custom estate properties climbing past $1.5 million and beyond. Wide, treed lots give owners room to renovate or rebuild against a backdrop of park and river valley.",
      "The average sale price near $1,177,244 reflects that spread, weighted toward well-maintained and reworked homes on premium lots. Spencer Rivers represents both buyers and sellers in Wildwood and can surface off-market opportunities that never reach public MLS listings."
    ],
    "lifeCopy": [
      "Wildwood suits buyers who want a settled, low-traffic community with mature trees, established neighbours, and true walkability to green space rather than a new-build subdivision. It draws professionals, downsizers, and families who value a quick downtown commute alongside direct access to the Bow River pathways. Daily life leans toward morning walks in Edworthy Park, quiet crescents, and a strong, long-tenured community feel."
    ],
    "outsideCopy": [
      "Edworthy Park sits at Wildwood's doorstep, wrapping the community's north edge with the Douglas Fir Trail, riverside pathways, off-leash areas, and picnic grounds along the Bow River. The regional pathway network connects west to Bowness Park and east into the city core, while outdoor rinks, tennis courts, and ball diamonds round out year-round recreation close to home."
    ],
    "amenitiesCopy": [
      "The Wildwood Community Association at 4411 Spruce Drive SW runs a hall, outdoor rinks, tennis courts, and ball diamonds, with the Wildflower Arts Centre nearby in Spruce Cliff. Commuters reach downtown in minutes via Bow Trail, with Sarcee Trail linking west and north. The Blue Line LRT is close at the 45 Street SW and Westbrook stations in adjacent Spruce Cliff."
    ],
    "shopDineCopy": [
      "Everyday shopping sits minutes away at Westbrook Mall, West Hills Towne Centre, and Signal Hill Centre, covering groceries, big-box retail, and services. Uptown 17th Avenue SW adds an eclectic run of specialty shops, cafes, and restaurants, while neighbourhood dining includes spots such as Spiros and the Donegal Irish Pub, all within a short drive of Wildwood."
    ],
    "schools": [
      {
        "name": "Wildwood School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://wildwood.cbe.ab.ca/"
      },
      {
        "name": "Vincent Massey School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://vincentmassey.cbe.ab.ca/"
      },
      {
        "name": "Ernest Manning High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://ernestmanning.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "woodbine",
    "story": [
      "Woodbine occupies the southwest edge of Calgary, bordered by Anderson Road to the north, 24 Street SW to the east, Tsuut'ina Trail to the west, and the wooded ravines of Fish Creek Provincial Park to the south. The community was established in 1979 and built out largely through the late 1980s, giving its streets the mature trees, wide lots, and settled feel that buyers rarely find in newer suburbs.",
      "That park boundary defines the neighbourhood. Homes along the southern ridge back directly onto Fish Creek's coulees and pathways, while quiet crescents and cul-de-sacs curve inward toward Woodbine School and Woodbine Square. Neighbouring Woodlands, Braeside, and Cedarbrae round out this established pocket of the deep southwest.",
      "In Calgary's market, Woodbine reads as dependable family real estate: an average sale price near $700,100, strong year-over-year demand for detached homes, and the kind of location premium that comes from a provincial park at your back door."
    ],
    "realEstateCopy": [
      "Woodbine's housing stock is dominated by single-family detached homes from the 1980s build era, ranging from raised bungalows to four-level splits and two-storeys, with a scattering of townhomes and villas near the community's core. Lots run generous, and the most sought-after addresses are the ridge properties backing onto Fish Creek Park, often on pie-shaped and walk-out sites. Entry bungalows and townhomes trade below the roughly $700,100 average, while renovated two-storeys and park-backing homes command the top of the range.",
      "Spencer Rivers represents both buyers and sellers throughout Woodbine and can surface off-market opportunities, including ridge and walk-out homes that rarely reach public listings."
    ],
    "lifeCopy": [
      "Woodbine suits families and long-term owners who want space, trees, and quick access to nature without leaving the city. Days here run on school runs to Woodbine School, weekend trails into Fish Creek, and errands at Woodbine Square. The community draws move-up buyers, downsizers staying in the southwest, and anyone who values a settled, walkable neighbourhood over a brand-new one still finding its footing."
    ],
    "outsideCopy": [
      "Fish Creek Provincial Park forms Woodbine's southern edge, with the Bebo Grove access point putting forested trails, the creek valley, and connections toward the Bow River pathway system within walking distance. Closer to home, Woodbine Park and Woodborough Park add playgrounds, green space, and ballfields, while the community's rinks and courts keep recreation a few minutes from any front door."
    ],
    "amenitiesCopy": [
      "The Woodcreek Community Association anchors local life, running programs and maintaining tennis and pickleball courts, skating rinks, and soccer and baseball fields. Commuters have real options: the MAX Yellow bus rapid transit line runs through the community with Woodview and Woodpark stations, Anderson Road connects east to the Anderson LRT station on the Red Line, and Tsuut'ina Trail ties into Stoney Trail's southwest ring road for fast cross-city travel."
    ],
    "shopDineCopy": [
      "Woodbine Square, at 2525 Woodview Drive SW, is the community's retail hub, anchored by Safeway, Shoppers Drug Mart, Scotiabank, and Starbucks alongside everyday services. For a bite, residents head to Gator's Sports Pub and Crispy Crust Pizzeria in the neighbourhood, with Glenmore Landing and Southcentre Mall a short drive north for wider shopping and dining."
    ],
    "schools": [
      {
        "name": "Woodbine School",
        "level": "Elementary (K-6)",
        "area": "CBE public",
        "url": "https://woodbine.cbe.ab.ca/"
      },
      {
        "name": "John Ware School",
        "level": "Junior High (7-9)",
        "area": "CBE public",
        "url": "https://johnware.cbe.ab.ca/"
      },
      {
        "name": "Dr. E.P. Scarlett High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://drepscarlett.cbe.ab.ca/"
      },
      {
        "name": "St. Jude School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "canyon-meadows",
    "story": [
      "Canyon Meadows is an established south Calgary community set on the rolling plateau above the Fish Creek Park bluffs, which is how it earned its name. It is bounded by Anderson Road to the north, Macleod Trail to the east, Fish Creek Provincial Park and Canyon Meadows Drive to the south, and 14 Street SW to the west, sharing edges with Southwood, Lake Bonavista, and Woodlands.",
      "Developed beginning in 1965, the neighbourhood matured into a leafy, family-oriented enclave of curving streets, mature trees, and generous lots, anchored by direct access to one of North America's largest urban parks. Its Canyon Meadows C-Train station and quick Macleod Trail connection give it a rare combination of quiet residential character and genuine commuter convenience.",
      "In Calgary's market, Canyon Meadows sits in the practical, well-located middle: an average sale price of $588,383 buys established construction, real yard space, and park-side living without the premium of an inner-city address."
    ],
    "realEstateCopy": [
      "Housing in Canyon Meadows runs from 1970s bungalows and side-split two-storeys to updated family homes and tasteful infill on select lots, most sitting on wide, mature-landscaped parcels that are hard to replicate in newer suburbs. The community also holds townhouses and apartment stock, widening the range of entry points. Against the $588,383 community average, detached homes with renovations or park backing routinely trade higher, while attached and original-condition properties open the door for buyers below that mark. Spencer Rivers represents both buyers and sellers throughout Canyon Meadows and can surface off-market opportunities that never reach public listing portals."
    ],
    "lifeCopy": [
      "Canyon Meadows suits families, downsizers, and outdoor-minded professionals who want space, established streets, and a park at their doorstep without giving up transit and shopping. Daily life leans on walkable schools, the community association's rinks and programs, and weekend routines built around Fish Creek pathways, the golf course, and quick trips up Macleod Trail. It is a settle-in, stay-for-decades kind of neighbourhood rather than a transient one."
    ],
    "outsideCopy": [
      "Fish Creek Provincial Park defines the community's south edge, delivering more than 80 kilometres of paved and natural pathways, forested creek valleys, wildlife, and a link to Sikome Lake for summer swimming. Residents also have the 18-hole Canyon Meadows Golf and Country Club nearby, plus neighbourhood green spaces and off-leash areas that make cycling, running, and dog-walking part of the everyday routine."
    ],
    "amenitiesCopy": [
      "The Canyon Meadows Community Association runs an active hub with two skating rinks, sports fields, and year-round programs. Commuting is a genuine strength: the Canyon Meadows C-Train station puts downtown within a direct LRT ride, while Macleod Trail, Anderson Road, and nearby Stoney Trail connect drivers quickly across the south and to the ring road. Everyday errands and recreation stay close to home."
    ],
    "shopDineCopy": [
      "Everyday shopping is covered by Canyon Meadows Shopping Centre and the surrounding Macleod Trail retail strip, home to the well-loved Canyon Meadows Cinemas and its $5 daily movies. A short drive north, Southcentre Mall adds major-brand shopping and sit-down dining, including Earls Southcentre and Milestones, while local pubs, cafes, and quick-service spots along Macleod Trail round out the neighbourhood's day-to-day options."
    ],
    "schools": [
      {
        "name": "Canyon Meadows School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://canyonmeadows.cbe.ab.ca/"
      },
      {
        "name": "Robert Warren School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://robertwarren.cbe.ab.ca/"
      },
      {
        "name": "Dr. E.P. Scarlett High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://drepscarlett.cbe.ab.ca/"
      },
      {
        "name": "St. Boniface School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "Saint Bonaventure School",
        "level": "Junior High",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "willow-park",
    "story": [
      "Willow Park is an established family community in southeast Calgary, built around the private Willow Park Golf & Country Club — the city's first private golf and country club, opened in 1965. Keith Homes developed the course and the surrounding streets together, and the neighbourhood grew up around the fairways through the mid-to-late 1960s.",
      "The community sits south of Southland Drive, west of Acadia Drive, north of Anderson Road, and east of Macleod Trail, putting Southcentre Mall, Willow Park Village, and the Anderson LRT station within a few minutes' reach. Mature elm and spruce canopy, wide curving streets, and generous lots give it a settled, unhurried feel that newer suburbs can't replicate.",
      "In Calgary's south-side market, Willow Park holds a premium position: golf-course frontage, larger-than-standard parcels, and a mix of original bungalows and rebuilt custom homes keep values well above the surrounding communities of Maple Ridge, Southwood, and Acadia."
    ],
    "realEstateCopy": [
      "Willow Park's housing stock runs from well-kept 1960s bungalows and split-levels on oversized, mature lots to extensively renovated and rebuilt custom homes, many backing directly onto the golf course. Lots are noticeably wider and deeper than Calgary's post-2000 norm, which is a large part of the community's appeal to move-up buyers. Prices span a broad range — entry-level detached homes trade in the high $600s to $800s, while golf-frontage estates and new builds carry the average sale price to roughly $1,065,371. Spencer Rivers represents both buyers and sellers in Willow Park and can surface off-market golf-course and estate opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Willow Park suits established families, downsizers staying in a familiar quadrant, and golfers who want to live at the club. Days here revolve around quiet crescents, walkable access to Willow Park Village and Southcentre, and a short commute up Macleod Trail or the Anderson LRT. It's a neighbourhood where people put down roots for decades rather than a few years — the pride of ownership shows on nearly every street."
    ],
    "outsideCopy": [
      "Beyond the private Willow Park Golf & Country Club, residents have Maple Ridge Golf Course nearby and easy access to the Bow River pathway system and Fish Creek Provincial Park to the south. Local green spaces, tree-lined boulevards, and off-leash areas along the south-side pathways make walking, cycling, and running part of everyday life here."
    ],
    "amenitiesCopy": [
      "The Willow Park Community Association runs local programming and events, and the Trico Centre for Family Wellness — with two NHL-sized rinks, an aquatics centre, gymnasium, and fitness studios — sits just south in Bonaventure. Commuting is straightforward: Macleod Trail and Anderson Road frame the community, Deerfoot Trail is minutes east, and the Anderson LRT station connects directly downtown."
    ],
    "shopDineCopy": [
      "Willow Park Village, off Macleod Trail, gathers more than fifty boutiques and locally owned restaurants, including Willow Park Wine & Spirits, Springbank Cheese, and Caesar's Steak House. Southcentre Mall — anchored by Crate & Barrel, Restoration Hardware, and Sporting Life, with Earls and Analog Coffee for dining — sits at Macleod Trail and Anderson Road, giving residents full-scale shopping and dining within walking distance."
    ],
    "schools": [
      {
        "name": "Willow Park School",
        "level": "Grades 5-9",
        "area": "CBE public",
        "url": "https://willowpark.cbe.ab.ca/"
      },
      {
        "name": "Maple Ridge School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://mapleridge.cbe.ab.ca/"
      },
      {
        "name": "Lord Beaverbrook High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://lordbeaverbrook.cbe.ab.ca/"
      }
    ]
  },
  {
    "slug": "lake-bonavista",
    "story": [
      "Lake Bonavista is Calgary's original lake community, the first neighbourhood in Canada built around a private man-made lake. Keith Construction broke ground in 1967, and the 52-acre lake was filled in 1968, with excavated earth shaping the 65-foot hill and waterfall that still anchor the community's east side. It sits in southeast Calgary, bounded by Anderson Road to the north, Macleod Trail to the west, Canyon Meadows Drive and Fish Creek Provincial Park to the south, with Bonavista Downs and the rising ridge to the east.",
      "Home to roughly 4,100 residences and more than 10,000 residents, Lake Bonavista set the template that later shaped Calgary lake communities like Lake Chaparral and Auburn Bay. Private lake access, mature tree canopy, and a settled, family-oriented character keep it among the most sought-after established addresses in the deep southeast, alongside neighbouring Willow Park, Acadia, and Lake Bonavista Estates.",
      "Decades of demand and limited turnover have pushed values well above the city median, with an average sale price on file of $1,172,940 reflecting the premium buyers place on lake rights and large original lots."
    ],
    "realEstateCopy": [
      "The housing stock is anchored by 1970s and 1980s bungalows and split-levels on generous, well-treed lots, many held by long-time owners and increasingly reworked through extensive renovations or full custom rebuilds. Lake Bonavista Estates and the streets closest to the water carry the top of the market, where lakefront and lake-access properties and modern infills can climb well past the $1,172,940 community average, while updated original bungalows offer a more accessible entry point into the neighbourhood. Spencer Rivers represents both buyers and sellers throughout Lake Bonavista and Lake Bonavista Estates, and can surface off-market and quietly listed lake-access opportunities that rarely reach the public MLS."
    ],
    "lifeCopy": [
      "Lake Bonavista suits families and established buyers who want private lake living without leaving the city. Residents hold year-round lake privileges, and daily life runs on the rhythm of the seasons: swimming, sailing, and fishing in summer, then skating, hockey, and tobogganing once the lake freezes. Deep lots, quiet crescents, and a strong community association make it an easy place to raise children and stay for decades, with downtown a straightforward commute up Macleod Trail."
    ],
    "outsideCopy": [
      "The 52-acre private lake is the centrepiece, with sandy beaches, a waterfall, and lakeside green space reserved for residents. Fish Creek Provincial Park runs along the community's southern edge, adding one of North America's largest urban parks with kilometres of pathways, the Bow River, and wildlife minutes from home. Interconnected pathways, mature parkland, and the wooded ridge to the east give walkers, cyclists, and dogs room to roam year-round."
    ],
    "amenitiesCopy": [
      "The Lake Bonavista Community Association operates a community centre with two ice rinks, a gymnasium, and multipurpose rooms, separate from the homeowners association that maintains the lake. Commuting is straightforward via Macleod Trail, Anderson Road, and Canyon Meadows Drive, and the Canyon Meadows CTrain station on the Red Line puts downtown within a direct ride. Calgary Transit bus routes connect the community's north, middle, and south to the wider network."
    ],
    "shopDineCopy": [
      "Everyday shopping sits inside the community at Lake Bonavista Promenade, home to a Safeway grocery, cafes, restaurants, and professional services. The nearby Avenida Centre adds specialty shops, an art gallery, and upmarket dining, while Southcentre Mall and the big-box retail along Macleod Trail cover major shopping just minutes north. Willow Park Village and the surrounding southeast corridor round out the options for restaurants, boutiques, and services."
    ],
    "schools": [
      {
        "name": "Lake Bonavista School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://lakebonavista.cbe.ab.ca/"
      },
      {
        "name": "Andrew Sibbald School",
        "level": "Elementary",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Nickle School",
        "level": "Junior High",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Dr. E. P. Scarlett High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://drepscarlett.cbe.ab.ca/"
      },
      {
        "name": "St. Boniface School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Bonaventure School",
        "level": "Junior High",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "Bishop Grandin High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "chaparral",
    "story": [
      "Chaparral occupies the far southeast corner of Calgary, framed by Macleod Trail to the west, 194 Avenue SE to the south, Highway 22X (Stoney Trail) to the north, and the Bow River valley to the east. Established in 1995 and named for the Mediterranean chaparral biome, the community splits into two distinct pockets: Lake Chaparral, built around a private 32-acre man-made lake, and Chaparral Valley, the newer enclave that steps down toward the Bow River and the eastern edge of Fish Creek Provincial Park.",
      "The lake is the anchor. Residents hold private access for swimming, fishing, skating, and paddling, with a 21-acre park and beach house at the centre of daily life. That combination of a members-only lake, Fish Creek access, and Bow River frontage gives Chaparral a recreation-first identity that few Calgary suburbs match.",
      "In the southeast market, Chaparral reads as an established family community with mature landscaping, priced below the inner-city lake communities of Lake Bonavista and Mahogany while offering comparable lake privileges. Its far-south position trades commute time for space, water, and greenery."
    ],
    "realEstateCopy": [
      "Housing in Chaparral runs primarily to detached single-family homes built from the late 1990s through the 2010s, with Chaparral Valley adding a wave of newer construction closer to the Bow River. Lot character ranges from standard family lots to walkout sites backing the valley, Fish Creek, or the lake itself, where estate homes command the community's top prices. Townhomes and a smaller pool of condominiums round out the entry points. Against an average sale price of $678,179, buyers find everything from attainable attached product to lakefront estates well above that mark. Spencer Rivers represents both buyers and sellers in Chaparral and can surface off-market lake-access and walkout opportunities before they reach MLS."
    ],
    "lifeCopy": [
      "Chaparral suits families and outdoor-minded buyers who want water and green space at the door rather than a short commute. Days here revolve around the private lake, skating in winter and paddling in summer, quick access to Fish Creek pathways, and a settled, established feel across mature streets. It rewards households that value recreation, schools, and space over proximity to the core, with the deep-south amenities of Shawnessy and Walden minutes away."
    ],
    "outsideCopy": [
      "Fish Creek Provincial Park's eastern reaches border the community, with Bow River pathways, Sikome Lake, and the Bow Valley Ranch all within reach. Lake Chaparral's private 32-acre lake and 21-acre park anchor year-round recreation, from fishing and swimming to skating. Blue Devil Golf Course sits just north across 22X, and the connected regional pathway system links Chaparral to Cranston and Walden."
    ],
    "amenitiesCopy": [
      "The Lake Chaparral Residents Association operates the lake, beach house, and park, while the Chaparral Community Association runs programming for the wider neighbourhood. Commuters reach the rest of the city via Macleod Trail and Highway 22X (Stoney Trail), with the Somerset-Bridlewood C-Train station, the south terminus of the Red Line, a short drive west near Shawnessy for a car-free route downtown."
    ],
    "shopDineCopy": [
      "Everyday shopping centres on Shawnessy Shopping Centre to the west, home to Canadian Tire, Winners, Walmart, Best Buy, Shoppers Drug Mart, and grocery anchors, plus a range of casual restaurants and cafes. The Gates of Walden, just south of the community, adds pubs, cafes, a grocery store, and services within a few minutes' drive, and Macleod Trail's retail corridor extends the options north toward Midnapore and Sundance."
    ],
    "schools": [
      {
        "name": "Chaparral School",
        "level": "Elementary (K-6)",
        "area": "CBE public",
        "url": "https://chaparral.cbe.ab.ca/"
      },
      {
        "name": "MidSun School",
        "level": "Junior High (5-9)",
        "area": "CBE public",
        "url": "https://schools.cbe.ab.ca/b691/"
      },
      {
        "name": "Dr. E.P. Scarlett High School",
        "level": "High School (10-12)",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "St. Sebastian School",
        "level": "Elementary/Junior High (K-9)",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "All Saints High School",
        "level": "High School (10-12)",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "watermark",
    "story": [
      "Watermark at Bearspaw is a 287-acre master-planned estate community on Calgary's northwest edge, set in the Bearspaw area of Rocky View County. It sits along 12 Mile Coulee Road, immediately west of Tuscany and the Tuscany C-Train station, north of the Lynx Ridge Golf Course, and just south of Crowchild Trail NW. Highway 1A and Stoney Trail are minutes away, putting downtown Calgary and the Calgary International Airport each roughly 20 minutes out.",
      "Developed by Macdonald Development Corporation, Watermark earned the Canadian Home Builders' Association title of Best Community in Canada in 2012 and 2013. The plan centres on water: 16 ponds, cascading water features, and a landscaped central plaza with a fountain and clubhouse give the community its name and its rhythm. At build-out it holds about 580 residences, roughly 479 estate single-family homes and 101 luxury semi-detached villas.",
      "Watermark occupies the upper tier of Calgary-area acreage living, offering the space and privacy of Bearspaw with the pathways and shared amenities of a designed community. It draws buyers who want an estate address close to the city rather than a remote rural parcel, and it trades alongside neighbouring Bearspaw acreages and Tuscany's higher end."
    ],
    "realEstateCopy": [
      "Housing at Watermark runs from luxury semi-detached villas to large custom estate homes on quarter-acre to full-acre lots. Most were built from roughly 2010 onward by builders including Crystal Creek Homes and other Bearspaw custom firms, in transitional, craftsman, and contemporary styles with triple garages, walkout basements, and pond or coulee backdrops. Sales generally range from around $1,000,000 for villas to $3,500,000-plus for the largest estates, with the community average near $2,251,000. Spencer Rivers represents both buyers and sellers throughout Watermark and Bearspaw, and can surface off-market estate and villa opportunities that never reach public listing sites."
    ],
    "lifeCopy": [
      "Watermark suits families and professionals who want acreage-scale space without leaving reach of the city. Days lean outdoors and low-key: walking the pond pathways, meeting neighbours at the central plaza and clubhouse, and letting kids move between three playgrounds and open parkland. It is a quiet, close-knit estate community where residents get country calm, city services minutes away, and the mountains a short drive west along Highway 1A."
    ],
    "outsideCopy": [
      "The community holds 46 acres of parkland, 16 ponds, and more than five kilometres of paved pathways linking playgrounds, a basketball court, and gathering areas with an outdoor kitchen, pavilion, and fire pit. Watermark also connects directly to Glenbow Ranch Provincial Park and its roughly 30 kilometres of trails above the Bow River, with the Lynx Ridge Golf Course bordering the community to the south."
    ],
    "amenitiesCopy": [
      "The Watermark at Bearspaw community association maintains the ponds, plaza, clubhouse, and pathway network. Commuting is straightforward: 12 Mile Coulee Road feeds Crowchild Trail NW and Stoney Trail (Highway 201) for quick runs downtown, to the airport, or west toward Cochrane on Highway 1A. The Tuscany C-Train station on Calgary Transit's Red Line sits just across the boundary, giving residents rail access into the core."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining sit minutes east in Tuscany and the surrounding northwest. Tuscany Market, Crowfoot Crossing, and the Royal Oak and Beacon Hill shopping centres cover groceries, pharmacies, restaurants, and services, with Costco and major retail at Beacon Hill. Cochrane's shops and eateries lie a short drive west on Highway 1A, and downtown Calgary's dining is about 20 minutes in along Crowchild Trail."
    ],
    "schools": [
      {
        "name": "Bearspaw School",
        "level": "K-8",
        "area": "Rocky View Schools",
        "url": "https://bearspaw.rockyview.ab.ca/"
      },
      {
        "name": "Cochrane High School",
        "level": "High School",
        "area": "Rocky View Schools",
        "url": "https://cochrane.rockyview.ab.ca/"
      }
    ]
  },
  {
    "slug": "cranston",
    "story": [
      "Cranston is a master-planned community in southeast Calgary, laid out along the Bow River escarpment that gives the neighbourhood its long valley views and its identity. The community sits bounded by Stoney Trail to the north, Deerfoot Trail and Auburn Bay to the east, and Fish Creek Provincial Park and the Bow River wrapping its western and southern edges. Development began in 1999 on former farmland, and Cranston has since grown into one of the city's most established family districts, capped by the newer riverfront enclave of Cranston's Riverstone down in the valley.",
      "The escarpment is the organizing feature here: upper Cranston holds the bulk of the single-family streets, while Riverstone steps down toward the river with direct pathway access to Fish Creek Park. The neighbouring Seton urban district and South Health Campus put a full town centre minutes from every Cranston address. With an average sale price around $630,244, Cranston reads as a solid, amenity-rich family market rather than an entry-level one, drawing buyers who want river-valley nature without giving up big-box convenience or a quick Deerfoot run downtown."
    ],
    "realEstateCopy": [
      "Housing in Cranston spans the full master-planned range: laned starter homes and townhomes, move-up two-storeys, estate homes along the escarpment ridge, and walkout lots in Riverstone backing the river valley and Fish Creek Park. Most of the stock dates from the 2000s onward, so buyers get modern floor plans, attached garages, and newer mechanicals, with the priciest ridge and walkout properties pulling well above the roughly $630,244 community average and condos and townhomes sitting below it. Escarpment-backing and river-view lots command the strongest premiums.",
      "Spencer Rivers represents both buyers and sellers throughout Cranston and Riverstone, and can surface off-market opportunities on the ridge and walkout streets that rarely reach public listings."
    ],
    "lifeCopy": [
      "Cranston suits families and active professionals who want suburban space paired with real river-valley access. Days here run on the Cranston Residents Association at Century Hall, a 22,000-square-foot private facility with a gymnasium, splash park, outdoor rink, tennis and basketball courts, and a gated 2.8-hectare park. Kids walk to Cranston School, weekends run into Fish Creek Park, and the South Health Campus and Seton amenities handle everything from medical appointments to a Friday-night movie without leaving the quadrant."
    ],
    "outsideCopy": [
      "The Bow River escarpment and Fish Creek Provincial Park define outdoor life in Cranston, with community pathways dropping from the ridge into the valley for walking, cycling, and riverside running. Riverstone's green spaces and interior pathway network connect directly into Fish Creek, one of North America's largest urban parks. Century Hall adds a splash park, outdoor hockey rink, tennis and basketball courts, and a private playground park for residents."
    ],
    "amenitiesCopy": [
      "The Cranston Residents Association runs Century Hall, the community's private recreation hub, alongside registered sports, arts, and seasonal day camps. Commuting leans on Deerfoot Trail (Highway 2) for the downtown run and Stoney Trail (Highway 201) for the ring-road connection across the city, with a typical 30-to-40-minute drive to the core. The Brookfield Residential YMCA at Seton sits minutes away, and a future Green Line LRT terminus is planned for neighbouring Seton."
    ],
    "shopDineCopy": [
      "Everyday shopping runs on Cranston Market, anchored by Sobeys, with Good Earth Coffeehouse and the Berwick Public House nearby. The Seton urban district, less than ten minutes away, adds Calgary's largest big-box cluster: Real Canadian Superstore, Walmart, Save-On-Foods, Home Depot, Canadian Tire, Winners, and Marshalls, plus a Cineplex cinema with VIP dining and a broad slate of restaurants and pubs around the town centre."
    ],
    "schools": [
      {
        "name": "Cranston School",
        "level": "Elementary (K-4)",
        "area": "CBE public",
        "url": "https://cranston.cbe.ab.ca/"
      },
      {
        "name": "Dr. George Stanley School",
        "level": "Middle (Grades 5-9)",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Joane Cardinal-Schubert High School",
        "level": "High School (Grades 9-12)",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Christ the King School",
        "level": "K-9",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Isabella School",
        "level": "Elementary (K-6)",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "alpine-park",
    "story": [
      "Alpine Park is the newest master-planned community in Calgary's southwest, a 642-acre (260-hectare) development led by Dream Unlimited and Qualico along the west side of Stoney Trail, the southwest leg of the Ring Road. It sits just south of Fish Creek Provincial Park and west of Tsuut'ina Trail, with its Village Centre anchored at the 154 Avenue SW and Stoney Trail interchange.",
      "Ground broke in 2020 on a New Urbanist plan built around walkability: roughly 5,000 homes at build-out, six major parks, and a mixed-use village centre most residents can reach on an eight-minute walk. Builders including Homes by Dream, Cardel, Calbridge, Genesis, and Lighthouse Custom Homes have shaped a distinctly modern streetscape. As one of Calgary's fastest-growing new-west communities, Alpine Park pairs newer construction with long-term upside, close to both downtown and the Rocky Mountains."
    ],
    "realEstateCopy": [
      "Housing in Alpine Park runs from laned homes and townhomes through move-up single-family houses to custom estate properties, nearly all of it built from 2021 onward in a contemporary architectural language of clean lines, low-pitched rooflines, and mixed-material fronts. Entry pricing starts in the low $600,000s, while executive and estate homes reach $1.2 million and above, placing the community's $755,964 average squarely in move-up territory for a new build. Spencer Rivers represents both buyers and sellers in Alpine Park and can surface off-market and pre-construction opportunities before they reach public listings."
    ],
    "lifeCopy": [
      "Alpine Park suits families and professionals who want a brand-new home with room to grow but still value quick access to the city and the mountains. Wide sidewalks, front porches, and the walkable Village Centre encourage everyday life on foot, while the mix of laned, single-family, and estate homes draws first-time buyers, growing families, and downsizers onto the same connected streets."
    ],
    "outsideCopy": [
      "Fish Creek Provincial Park, one of North America's largest urban parks, sits directly north, with trails, wildlife, and the Bow Valley beyond. Within the community, a planned network of six major parks, ponds, and pathways threads through the neighbourhood, and the Rocky Mountains and Kananaskis are a short drive west for weekend hiking and skiing."
    ],
    "amenitiesCopy": [
      "The Alpine Park Village Centre brings shops, cafes, and services within walking distance at the 154 Avenue SW and Stoney Trail interchange. For commuters, Stoney Trail (the southwest Ring Road) links quickly to Macleod Trail, Highway 22X, and downtown Calgary, and the community sits within reach of the city's growing southwest transit network."
    ],
    "shopDineCopy": [
      "Everyday shopping is minutes away at the Shops of Buffalo Run, home to Costco and major retailers on the Tsuut'ina Nation, with the larger TAZA development and Shawnessy Shopping Centre a short drive southeast. The first Alpine Village retailers are underway on site, and Macleod Trail's restaurants and big-box stores round out the options nearby."
    ],
    "schools": [
      {
        "name": "Evergreen School",
        "level": "Elementary",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Marshall Springs School",
        "level": "Junior High",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "Centennial High School",
        "level": "High School",
        "area": "CBE public",
        "url": ""
      },
      {
        "name": "St. Jude School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": "https://stjude.cssd.ab.ca/"
      }
    ]
  },
  {
    "slug": "harmony",
    "story": [
      "Harmony is a master-planned lake community in Springbank, Rocky View County, roughly eight minutes west of Calgary along the Trans-Canada Highway (Highway 1). Spread across about 1,700 acres north and west of the Springbank Airport, it sits east of Highway 22 and north of Elbow Valley, with Lower Springbank Road and the Trans-Canada linking it to west Calgary in 20 to 25 minutes and downtown in roughly 35.",
      "Developed by Bordeaux Developments and Qualico Communities, Harmony is built around a freshwater lake system and the Phil Mickelson-designed Mickelson National Golf Club. It delivers acreage-style space and mountain-edge views while keeping the services of West Springs, Aspen Landing, and Cochrane close at hand.",
      "Within Calgary-area luxury, Harmony reads as a newer, amenity-rich alternative to established estate enclaves like Bearspaw and Elbow Valley. It draws buyers who want lake access, golf, and a maturing village core on land that still carries a genuine Springbank country feel."
    ],
    "realEstateCopy": [
      "Harmony's housing stock is predominantly newer construction from Alberta's estate and semi-custom builders, spanning move-up single-family homes, luxury lakefront and golf-course residences, and a growing selection of villas and townhomes. Architecture leans contemporary prairie and mountain-modern, on generous lots with walk-out and lake-oriented siting throughout. Most detached listings run between roughly $1 million and $1.5 million, with premium waterfront and Mickelson National frontage pushing past $2 million and attached product available below the community's average of $956,742.",
      "Spencer Rivers represents both buyers and sellers in Harmony and can surface off-market lakefront and golf-course opportunities before they reach MLS."
    ],
    "lifeCopy": [
      "Harmony suits active families, professionals, and downsizers who want lake and golf living without giving up Springbank space. Days center on the water and the pathway network: paddleboarding and swimming from South Beach in summer, skating and tobogganing at Adventure Park in winter, and quick weekend drives to Kananaskis and the Rockies. It is a car-oriented community where neighbours gather around the lake, the golf club, and year-round events."
    ],
    "outsideCopy": [
      "The centerpiece is Harmony's freshwater lake, with South Beach for swimming, kayaking, paddleboarding, and fishing. Adventure Park adds a skate park, pump track, beach volleyball, a skating ribbon, toboggan hill, ninja course, climbing wall, and off-leash dog park. More than 25 kilometres of pathways thread the community, and the Rocky Mountains, Kananaskis Country, and Bragg Creek sit within a short drive west."
    ],
    "amenitiesCopy": [
      "Harmony's amenities anchor on the Mickelson National Golf Club and the HOA-managed lake, with a future Village Centre planned for boutique shops, cafes, medical and professional services, and the Nordic-inspired Everwild Spa. Commuting runs on the Trans-Canada Highway (Highway 1), Lower Springbank Road, and Highway 8 into west Calgary; the Springbank Airport is minutes away, and Stoney Trail connects the community to the wider ring-road network."
    ],
    "shopDineCopy": [
      "Everyday shopping sits minutes east in West Springs at West 85th and Aspen Landing Shopping Centre, with Safeway, Co-op, cafes, and family restaurants. Calgary Farmers' Market West and the shops of Cochrane are both a short drive away, while Bragg Creek's restaurants and boutiques lie just to the southwest. Harmony's own Village Centre is set to bring lakeside dining and retail within the community itself."
    ],
    "schools": [
      {
        "name": "Elbow Valley Elementary School",
        "level": "Elementary (K-4)",
        "area": "Rocky View Schools",
        "url": ""
      },
      {
        "name": "Springbank Middle School",
        "level": "Junior High (5-8)",
        "area": "Rocky View Schools",
        "url": "https://springbankmd.rockyview.ab.ca/"
      },
      {
        "name": "Springbank Community High School",
        "level": "High School (9-12)",
        "area": "Rocky View Schools",
        "url": ""
      },
      {
        "name": "Banded Peak School",
        "level": "K-8",
        "area": "Rocky View Schools",
        "url": ""
      }
    ]
  },
  {
    "slug": "pine-creek",
    "story": [
      "Pine Creek is one of Calgary's newest communities, a master-planned neighbourhood on the city's southwest foothills edge developed by Anthem United. It sits west of Macleod Trail and south of 210 Avenue SW, with Stoney Trail (Calgary's ring road) and Highway 22X framing the southern approach and linking residents to Shawnessy, Silverado, and Yorkville next door.",
      "Built across roughly 120 acres of rolling terrain, protected wetlands, and creek corridor, Pine Creek was planned around greenspace rather than retrofitted with it, and will hold more than 900 homes at build-out. It is a genuinely new community: construction has moved into its final phases, so buyers are choosing among recent builds and a handful of remaining new-construction opportunities.",
      "In Calgary's market, Pine Creek reads as move-up family territory on the southern edge of the city, where newer product, foothills views, and quick ring-road access trade at prices below the inner-city established communities."
    ],
    "realEstateCopy": [
      "Pine Creek's housing stock is contemporary and consistent, reflecting its 2020s build era: front-drive detached homes, paired (semi-detached) homes, laned houses, and low-maintenance townhomes, most with open main floors, attached or rear garages, and clean modern exteriors. Lots range from compact laned parcels to wider front-drive sites backing onto pathways and pond frontage. Recent sales span roughly the low $400,000s for townhomes and paired product up past $800,000 for larger detached homes, with the community average around $670,130 — a strong value point for near-new construction this close to the ring road. Spencer Rivers represents both buyers and sellers in Pine Creek and can surface off-market and pre-list opportunities as final-phase inventory turns over."
    ],
    "lifeCopy": [
      "Pine Creek suits families and move-up buyers who want a newer home with modern layouts and low upkeep, without giving up quick access to the rest of the city. Days here are built around the pathways, ponds, and parks: kids biking to the playground, dog walks along the wetland edge, and weekend drives to the mountains via Highway 22X. It is a quiet, still-growing community where most homes and neighbours arrived recently, giving it an easy, established-from-day-one feel."
    ],
    "outsideCopy": [
      "Outdoor life centres on the Pine Creek corridor itself — a network of walking and cycling pathways threading past three parks, a large community pond, and protected wetland reserve. Fish Creek Provincial Park, one of North America's largest urban parks, sits minutes north for trails, forest, and the Bow River, while Highway 22X opens a fast route west to Bragg Creek, Kananaskis, and the Rocky Mountain foothills for weekend escapes."
    ],
    "amenitiesCopy": [
      "Commuting is one of Pine Creek's strongest cards: Stoney Trail (the ring road) and Macleod Trail are minutes away, with Highway 22X connecting east-west across the south end. The Somerset–Bridlewood CTrain station, the south terminus of the Red Line, gives a direct rail link downtown, and Shawnessy's transit hub adds bus service. Recreation and everyday services are anchored by nearby Shawnessy and Silverado, with a future school site and amenity space planned within the community."
    ],
    "shopDineCopy": [
      "Shopping and dining sit just north and east of the community. Shawnessy Towne Centre delivers big-box retail, grocery, a movie theatre, restaurants, and services along Macleod Trail, while Silverado Marketplace and the newer Creekstone shopping district add grocery, cafes, fitness, and everyday errands within a short drive. Buffalo Run and Township on the west side round out the options for pharmacies, dining, and weekend essentials close to home."
    ],
    "schools": [
      {
        "name": "Bridlewood School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/bridlewood/Pages/default.aspx"
      },
      {
        "name": "Samuel W. Shaw School",
        "level": "Junior High",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/samuelwshaw/Pages/default.aspx"
      },
      {
        "name": "Centennial High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://school.cbe.ab.ca/school/centennial/Pages/default.aspx"
      }
    ]
  },
  {
    "slug": "spring-creek",
    "story": [
      "Spring Creek is a 70-acre master-planned mountain village in the heart of downtown Canmore, bounded by two spring-fed waterways, Spring Creek and Policeman's Creek, that merge at its south end before flowing into the Bow River. The community sits just off Main Street, linked to the town's core by the Policeman's Creek Boardwalk, putting Canmore's shops, galleries, and restaurants within a short walk.",
      "Built by Spring Creek Mountain Village, the community was redeveloped from a former mobile-home park into a walkable village of condominiums, villa-style townhomes, and boutique hotels. It holds the distinction of being Canada's first BUILT GREEN Platinum-certified community, with interconnected boardwalks, footbridges, and creekside paths woven through it.",
      "Within Canmore's luxury market, Spring Creek is the premier address for buyers who want lock-and-leave mountain living steps from downtown. Its mix of full-time residents, second-home owners, and tourist-zoned units gives it a distinct position among Bow Valley communities such as Three Sisters Mountain Village and Silvertip."
    ],
    "realEstateCopy": [
      "Spring Creek real estate is led by apartment-style condominiums and larger townhomes across a series of contemporary timber-and-stone lodges, including The Residences at Tamarack, Black Swift Lodge, and the Malcolm Hotel residences. Units range from one-bedroom creekside suites to expansive penthouses framing the Three Sisters and Mount Rundle, and select buildings carry 40-plus or flexible tourist zoning that allows owners to rent when not in personal use. Pricing spans a wide band, with the average sale on file near $1,450,000 and penthouse and larger-format homes reaching well beyond it. Spencer Rivers represents both buyers and sellers in Spring Creek and can surface off-market opportunities in buildings that rarely list publicly."
    ],
    "lifeCopy": [
      "Spring Creek suits buyers who want a walkable, low-maintenance mountain home base: professionals working remotely, active retirees, and second-home owners who value being able to lock the door and leave. Daily life runs on foot, with coffee at The Pulse General Store in the Malcolm Hotel, groceries at Spring Creek Market by Rusticana, and creek-side strolls to Main Street. It is a genuine village where residents know their neighbours and the mountains sit at the end of every sightline."
    ],
    "outsideCopy": [
      "The community is laced with boardwalks and footbridges along Spring Creek and Policeman's Creek, connecting to the 2.2-kilometre Creeks walking loop and the Policeman's Creek Boardwalk into downtown. From there, residents reach Canmore's wider trail network, the Bow River pathway, and quick access to Kananaskis Country, the Nordic Centre, and the trailheads of the Three Sisters and Ha Ling Peak."
    ],
    "amenitiesCopy": [
      "Spring Creek's village core delivers its own amenities, from wellness studios and galleries along Spring Creek Drive to the Malcolm Hotel's dining and event space. The Town of Canmore's Elevation Place recreation centre, with its aquatics, climbing gym, and library, is a short drive away. The Trans-Canada Highway sits minutes north, putting Banff about 25 minutes west and downtown Calgary and the airport roughly an hour east."
    ],
    "shopDineCopy": [
      "Dining and shopping are effectively on the doorstep. Within the village, residents have Spring Creek Market by Rusticana for groceries, The Stirling Grill & Lounge overlooking Policeman's Creek, and the neighbourhood Mineshaft Tavern. A two-minute walk crosses into downtown Canmore's Main Street, home to Bridgette Bar, independent cafes, outdoor outfitters, and the boutiques and galleries that anchor the town's core."
    ],
    "schools": [
      {
        "name": "Elizabeth Rummel School",
        "level": "Elementary",
        "area": "Canadian Rockies Public Schools",
        "url": "https://ers.crps.ca/"
      },
      {
        "name": "Lawrence Grassi Middle School",
        "level": "Middle School",
        "area": "Canadian Rockies Public Schools",
        "url": "https://lgms.crps.ca/"
      },
      {
        "name": "Canmore Collegiate High School",
        "level": "High School",
        "area": "Canadian Rockies Public Schools",
        "url": "https://cchs.crps.ca/"
      },
      {
        "name": "Our Lady of the Snows Catholic Academy",
        "level": "K-12",
        "area": "Christ the Redeemer Catholic Schools",
        "url": "https://ourladyofthesnows.redeemer.ab.ca/"
      }
    ]
  },
  {
    "slug": "heritage-pointe",
    "story": [
      "Heritage Pointe is an acreage-style estate community in Foothills County, immediately south of Calgary's city limits and set between Highway 2 (Deerfoot Trail) and Highway 2A (Macleod Trail), just north of Dunbow Road near De Winton. The community grew up around the Heritage Pointe Golf Club, a semi-private course ranked among Canada's best, and today spans distinct enclaves including The Lake at Heritage Pointe, The Ranche, and the newer Artesia at Heritage Pointe.",
      "The character here is country living without the isolation: a private 28-acre residents' lake, mature pathways, and large architecturally controlled lots, all within a short drive of Legacy, Shawnessy, and south Calgary. Neighbours include De Winton to the east and Okotoks a short run south down Highway 2A.",
      "In Calgary-area luxury real estate, Heritage Pointe occupies a specific niche, estate acreage-style living inside a gated, master-planned setting rather than raw rural land, which keeps values and demand steady among buyers who want space, golf, and a genuine community close to the city."
    ],
    "realEstateCopy": [
      "Homes in Heritage Pointe are predominantly custom-built estates, walkout bungalows, two-storey family homes, and, in Artesia, low-maintenance luxury villas, most dating from the community's growth through the 2000s and 2010s. Lots typically run from a quarter acre to more than an acre, many backing onto the lake, golf course, ravines, or open space, with architectural controls that keep the streetscapes consistent and no two homes identical. Prices range widely against the roughly $1,750,000 community average, from villa and entry estate product below that mark to large custom lakefront and golf-course homes well above it. Spencer Rivers represents both buyers and sellers throughout Heritage Pointe and can surface off-market estate opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Heritage Pointe suits families and professionals who want acreage-style space, a private lake, and championship golf without giving up a quick commute to Calgary. Daily life leans toward the outdoors and the community, mornings on the pathways, afternoons at the lake, evenings at the clubhouse, with the quiet of Foothills County and the shops, schools, and hospitals of south Calgary only minutes north. It is a settled, established community rather than a construction zone, which appeals to buyers looking for permanence."
    ],
    "outsideCopy": [
      "The community centres on a private 28-acre lake reserved for residents, with walking paths, picnic areas, and green space threaded between the neighbourhoods. The Heritage Pointe Golf Club offers 27 holes across three distinct nine-hole layouts plus a practice range. Beyond the community, Foothills County's open countryside, the Bow River corridor, and nearby Okotoks provide room for cycling, running, and weekend recreation just minutes from the door."
    ],
    "amenitiesCopy": [
      "A homeowners' association manages the residents' lake, pathways, and green spaces, giving Heritage Pointe a genuine community core. Commuting is straightforward: Deerfoot Trail (Highway 2) and Macleod Trail (Highway 2A) both run to downtown Calgary in roughly 25 to 30 minutes, with the South Health Campus about 20 minutes north. Transit is limited and car-oriented, though the Somerset-Bridlewood LRT station on the Red Line and its park-and-ride sit about 10 to 15 minutes north."
    ],
    "shopDineCopy": [
      "The Heritage Pointe Golf Club clubhouse offers on-site dining and event space at the heart of the community. For everyday shopping, the retail at Legacy, Shawnessy, and Township in south Calgary sits minutes north up Macleod Trail, with grocery, restaurants, and services, while Okotoks to the south adds a full range of shops, cafes, and amenities. The result is rural quiet with big-box and boutique retail both close at hand."
    ],
    "schools": [
      {
        "name": "Heritage Heights School",
        "level": "K-9",
        "area": "Foothills School Division",
        "url": "https://heritageheights.fsd38.ab.ca/"
      },
      {
        "name": "Foothills Composite High School",
        "level": "High School",
        "area": "Foothills School Division",
        "url": "https://foothillscomposite.fsd38.ab.ca/"
      },
      {
        "name": "St. Mary's School",
        "level": "Elementary",
        "area": "Christ the Redeemer Catholic (Okotoks)",
        "url": "https://stmarys.redeemer.ab.ca/"
      }
    ]
  },
  {
    "slug": "bayside",
    "story": [
      "Bayside is Airdrie's waterfront community, built around an engineered canal network on the city's south side. It sits west of the Queen Elizabeth II Highway and is framed by 8 Street SW on the west, with Yankee Valley Boulevard SW carrying most traffic in and out along the north edge. Bayside Boulevard SW runs as the internal spine, threading past the canals, pedestrian bridges, and pathway loops that give the community its resort-like character.",
      "Developed largely through the 2000s and 2010s, Bayside is the only true canal-front neighbourhood in Airdrie, and many homes back directly onto the water. Residents kayak and paddleboard in summer and skate or play shinny on the frozen canals in winter. It neighbours Reunion, Baysprings, Baywater, and Bayview, forming a cluster of newer communities on Airdrie's growing southwest side.",
      "Roughly 15 to 20 minutes north of Calgary via Highway 2, Bayside draws buyers who want detached family space and water frontage at a price point well below comparable lake communities inside the city, keeping it a steady performer in the wider Calgary-area market."
    ],
    "realEstateCopy": [
      "Housing in Bayside runs from starter townhomes and duplexes to large executive detached homes on premium canal-front lots. Most stock is newer, built from the mid-2000s onward, with the two-storey layouts, attached double garages, and open-concept plans typical of the era, plus a good share of walkout basements taking advantage of the water grades. Against Airdrie's broader market, the community's roughly $660,000 average sale price reflects that mix, with waterfront and larger executive homes trading well above it and attached product below.",
      "Spencer Rivers represents both buyers and sellers in Bayside and can surface off-market canal-front opportunities that never reach the public listings."
    ],
    "lifeCopy": [
      "Bayside suits families and move-up buyers who want newer space, water views, and an active, outdoor-leaning routine without giving up quick highway access to Calgary. Daily life centres on the canals and pathways: kids biking to friends' houses over the bridges, dog walks along the water, paddleboards in summer, and skates in winter. It is a quiet, well-kept, community-minded pocket where the waterway is the shared backyard."
    ],
    "outsideCopy": [
      "The canal system is the community's signature, with winding waterways, footbridges, and connected pathways that link into Airdrie's wider trail network. Generous greenspace, playgrounds, picnic areas, and sports fields sit throughout the neighbourhood, and Nose Creek Park, Airdrie's largest park with its regional pathways and open space, is a short drive north for festivals, ball diamonds, and creekside walking."
    ],
    "amenitiesCopy": [
      "Bayside is served by an active residents' association and connects easily to the rest of Airdrie. Yankee Valley Boulevard SW and 8 Street SW are the main arteries, feeding directly onto the Queen Elizabeth II Highway (Highway 2) for the commute south to Calgary or north through town. Airdrie Transit routes and regional ICE express service to Calgary run nearby, and the Genesis Place recreation centre with its pools, arenas, and fitness space is minutes away."
    ],
    "shopDineCopy": [
      "Everyday shopping sits minutes away at Sierra Springs Shopping Centre and Kingsview Market, both anchored by major grocery, pharmacy, and big-box retail. Dining nearby includes State & Main at Kingsview Market, MR MIKES SteakhouseCasual off Yankee Valley Boulevard, plus Montana's BBQ & Bar and Boston Pizza. Downtown Airdrie's independent cafes and restaurants add more character a short drive north, and Calgary's full retail is 20 minutes down Highway 2."
    ],
    "schools": [
      {
        "name": "Nose Creek Elementary School",
        "level": "Elementary",
        "area": "Rocky View Schools (public)",
        "url": "https://nosecreek.rockyview.ab.ca/"
      },
      {
        "name": "C.W. Perry School",
        "level": "Junior High",
        "area": "Rocky View Schools (public)",
        "url": ""
      },
      {
        "name": "George McDougall High School",
        "level": "High School",
        "area": "Rocky View Schools (public)",
        "url": "https://georgemcdougall.rockyview.ab.ca/"
      },
      {
        "name": "St. Veronica School",
        "level": "K-7",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Martin de Porres High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "chestermere",
    "story": [
      "Chestermere sits directly east of Calgary along the TransCanada Highway (Highway 1), built around Chestermere Lake, a roughly 4.8-kilometre reservoir fed from the Bow River through the Western Irrigation District canal. The true lakefront runs along East Chestermere Drive and West Chestermere Drive, with The Cove on the northeast shore and Westmere anchoring the northwest end near John Peake Memorial Park.",
      "What began early last century as an irrigation reservoir grew into a recreational lake town and, in 2015, an incorporated city. The waterfront addresses are its defining stock: homes backing directly onto the water, with private docks used for boating, fishing, and swimming from the yard. Newer estate communities such as Kinniburgh and Rainbow Falls ring the lake with larger lots and pond-and-creek landscaping.",
      "For Calgary-area buyers, Chestermere is the practical answer to wanting genuine waterfront within a 20-to-30-minute drive of downtown. Lakefront property here trades in a distinct tier well above the wider Chestermere market, making it one of the region's most sought lakeside addresses."
    ],
    "realEstateCopy": [
      "Chestermere's lakefront housing is a genuine mix rather than a single product. Original four-season cottages and modest homes sit alongside custom-built estate properties, many with walkout basements, triple garages, and unobstructed water views across East and West Chestermere Drive and The Cove. Direct-waterfront lots with private dock rights command a premium tier that runs well past one million dollars and reaches into the multi-millions, which places the $2,100,000 average firmly in true lakefront estate territory rather than the wider Chestermere market. Spencer Rivers represents both buyers and sellers on Chestermere Lake and can quietly surface off-market waterfront opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "Chestermere Lake suits families and professionals who want space, a private dock, and open water at the back door without giving up an easy Calgary commute. Days here run on the lake: morning paddles, evening boat rides, winter skating and ice fishing once the reservoir freezes. It reads as a tight-knit lake town with year-round recreation, close neighbours, and the kind of shoreline lifestyle that is rare this near a major city."
    ],
    "outsideCopy": [
      "The lake itself is the main amenity, ringed by public green space. Anniversary Park and Sunset Park offer sandy beach areas, picnic sites with barbecue pits, and volleyball on the shore, while John Peake Memorial Park in Westmere adds a boat launch, playground, and waterfront paths. Pathways and wetlands thread through Westmere and Rainbow Falls, and the reservoir supports boating, fishing, paddleboarding, and winter skating."
    ],
    "amenitiesCopy": [
      "The Chestermere Recreation Centre anchors community programs and events run through the City of Chestermere. Commuting is straightforward: the TransCanada Highway (Highway 1) links directly to Calgary via Stoney Trail and Deerfoot Trail, putting downtown roughly 20 to 30 minutes away. As a separate city east of Calgary, Chestermere is served by road rather than the CTrain LRT, so most residents drive or use regional transit connections into the city."
    ],
    "shopDineCopy": [
      "Everyday shopping and dining cluster at Chestermere Station, the city's commercial hub with grocery, restaurants, cafés, and services, complemented by the newer commercial district around Kinniburgh. For big-box retail, dining, and Costco, Calgary's east-side amenities along the TransCanada Highway and 17th Avenue SE are a short drive west, giving lakefront residents small-town convenience with full-city selection minutes away."
    ],
    "schools": [
      {
        "name": "Chestermere High School",
        "level": "High School",
        "area": "Rocky View Schools",
        "url": "https://chestermere.rockyview.ab.ca/"
      },
      {
        "name": "Prairie Waters Elementary School",
        "level": "Elementary",
        "area": "Rocky View Schools",
        "url": ""
      },
      {
        "name": "Rainbow Creek Elementary School",
        "level": "Elementary",
        "area": "Rocky View Schools",
        "url": ""
      },
      {
        "name": "East Lake School",
        "level": "Elementary (K-6)",
        "area": "Rocky View Schools",
        "url": ""
      },
      {
        "name": "Our Lady of Wisdom School",
        "level": "Elementary (K-6)",
        "area": "Calgary Catholic (CCSD)",
        "url": "https://ourladyofwisdom.cssd.ab.ca/"
      },
      {
        "name": "St. Gabriel the Archangel School",
        "level": "Junior/Senior High (7-12)",
        "area": "Calgary Catholic (CCSD)",
        "url": ""
      }
    ]
  },
  {
    "slug": "coopers-crossing",
    "story": [
      "Coopers Crossing is a master-planned family community in southwest Airdrie, the fast-growing city directly north of Calgary along the Queen Elizabeth II Highway (Highway 2). It forms the heart of the Cooper's Town Area Structure Plan, sitting west of the QEII and framed by Yankee Valley Boulevard to the south, 8 Street SW to the east, and 40 Avenue to the north.",
      "As one of Airdrie's signature addresses, Coopers Crossing has been voted the city's Best Community for more than a decade. The neighbourhood is built around front-porch streetscapes, more than 44 acres of parks, landscaped ponds, and a six-kilometre pathway network that links homes to schools, the Cooper's Town Promenade, and Chinook Winds Regional Park.",
      "Within the Calgary region, Coopers Crossing reads as an established move-up address rather than raw new construction. Homes trade across a wide band, with an average sale price near $760,000 that places it among Airdrie's more prestigious family enclaves while staying well below comparable estate pockets inside Calgary itself."
    ],
    "realEstateCopy": [
      "Housing in Coopers Crossing spans a full ladder, from stylish townhomes to front-attached and laned single-family homes to custom estate properties on larger, landscaped lots. The building era runs mostly from the mid-2000s to today, giving the community modern floor plans, oversized garages, and current mechanicals rather than dated stock. Active listings range from the mid-$300,000s for attached product to roughly $1.7 million for executive estates, with the bulk of detached homes clustered around the $760,000 average. Spencer Rivers represents both buyers and sellers throughout Coopers Crossing and can surface off-market and pre-list opportunities that never reach public MLS."
    ],
    "lifeCopy": [
      "Coopers Crossing suits families and move-up buyers who want space, schools, and community without leaving the Calgary region. Days here run to school drop-offs within walking distance, afternoons on the pathway system, and evenings at Cooper's Town Plaza, where an open-air stage and gas firepit host events through the year. Neighbours know the seasonal programming, the ponds, and the parks; it functions like a small town with big-city amenities minutes down the highway."
    ],
    "outsideCopy": [
      "More than 44 acres of parks, landscaped ponds, and a six-kilometre pathway system thread through Coopers Crossing. Directly south, across Yankee Valley Boulevard, Chinook Winds Regional Park adds over 55 acres with a skate park, spray park, toboggan hill, beach volleyball courts, and baseball diamonds. The trail network connects every corner of the community, linking parks, schools, and shopping on foot or by bike."
    ],
    "amenitiesCopy": [
      "The Cooper's Town Promenade and Cooper's Town Plaza anchor day-to-day life, hosting community events beneath the Reynolds Clock Tower. Commuting is straightforward: the Queen Elizabeth II Highway (Highway 2) runs minutes east, putting Calgary International Airport 15 to 20 minutes away and downtown Calgary roughly half an hour south, with Airdrie Transit ICE commuter buses serving the corridor. Yankee Valley Boulevard and 8 Street SW handle local traffic."
    ],
    "shopDineCopy": [
      "The Cooper's Town Promenade sits in the community's southwest corner with everyday shopping and dining, including Shoppers Drug Mart, Highlander Wine & Spirits, Dairy Queen, Balzac Craft Beer Co, Moody's Mediterranean, and Seven Saints Fashion Boutique. Bigger-box retail borders the neighbourhood, among it Walmart Supercentre, Home Depot, Winners, and London Drugs, so groceries, home goods, and services all sit within a short drive."
    ],
    "schools": [
      {
        "name": "Cooper's Crossing School",
        "level": "Elementary",
        "area": "Rocky View",
        "url": "https://cooperscrossing.rockyview.ab.ca/"
      },
      {
        "name": "Northcott Prairie School",
        "level": "K-9",
        "area": "Rocky View",
        "url": ""
      },
      {
        "name": "W.H. Croxford High School",
        "level": "High School",
        "area": "Rocky View",
        "url": ""
      },
      {
        "name": "St. Veronica School",
        "level": "Elementary",
        "area": "Calgary Catholic",
        "url": ""
      },
      {
        "name": "St. Martin de Porres High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": ""
      }
    ]
  },
  {
    "slug": "bearspaw",
    "story": [
      "Bearspaw is an acreage estate community in Rocky View County, spread across rolling foothills roughly fifteen minutes northwest of downtown Calgary along Highway 1A. Its recognized boundaries run from Township Road 264 in the north to the Bow River in the south, and from the Calgary city limit at 12 Mile Coulee in the east to Range Road 33 in the west. Because Bearspaw sits in Rocky View County rather than the City of Calgary, it keeps rural zoning, private services, and an open, unhurried feel while remaining minutes from the city edge.",
      "The area grew from working farms and ranches into a collection of distinct acreage enclaves, each with its own character. Church Ranches is a mature, heavily treed subdivision known for its private lakes and two-acre-plus lots; Silverhorn and Watermark at Bearspaw are newer estate developments built around conservation design, ponds, and paved pathways; and pockets like Bearspaw Village round out the mix. Many properties look west to unobstructed Rocky Mountain views.",
      "Bearspaw is one of the Calgary region's most established luxury acreage markets, valued for privacy, land, and proximity to the city without a city address."
    ],
    "realEstateCopy": [
      "Housing in Bearspaw is dominated by custom-built estate homes on generous parcels. Traditional acreages run from two to twenty-plus acres, while newer conservation-style subdivisions such as Silverhorn and Watermark offer smaller quarter-acre to one-acre lots with community amenities. Architecture spans everything from ranch-style bungalows and updated 1980s and 1990s estates to recently completed modern and mountain-contemporary builds with bespoke finishes. Prices range widely, from entry acreages near one million dollars to nine-million-dollar estates, with the average sale price around $2,450,000 reflecting the market's custom-home core.",
      "Spencer Rivers represents both buyers and sellers throughout Bearspaw and its subdivisions, and can often surface off-market acreage and estate opportunities that never reach public listings."
    ],
    "lifeCopy": [
      "Bearspaw suits buyers who want space, privacy, and land without leaving the orbit of the city. It draws families, established professionals, equestrians, and downsizers trading a manicured lot for a few acres of their own. Daily life leans toward the outdoors and self-sufficiency: room for shops, gardens, horses, and hobbies, quiet gravel roads, and neighbours spread comfortably apart, all within a short drive of Calgary's northwest amenities and schools."
    ],
    "outsideCopy": [
      "The community's marquee outdoor asset is Glenbow Ranch Provincial Park, which follows the Bow River between Bearspaw and Cochrane and offers more than 28 kilometres of mostly paved pathways for hiking, cycling, and wildlife viewing. Closer to home, Church Ranches residents share private lakes for paddling and skating, and the surrounding foothills and river valley give the area a genuinely rural landscape of coulees, trees, and open sky."
    ],
    "amenitiesCopy": [
      "The Bearspaw-Glendale Community Association anchors local life through the Bearspaw Lifestyle Centre on Bearspaw Road, with a gymnasium, banquet hall, and year-round programs for all ages. Commuting is straightforward: Highway 1A and Crowchild Trail feed into the city, Stoney Trail's northwest ring road links to the wider region, and the Crowfoot CTrain station, the northwest terminus of Calgary's Blue Line, sits minutes away for downtown transit access."
    ],
    "shopDineCopy": [
      "Everyday shopping is minutes south at Royal Oak Centre, with grocers, London Drugs, and services, while Crowfoot Crossing offers one of northwest Calgary's largest retail districts, including major stores, Cineplex cinemas, and The Keg Steakhouse. For dining closer to home, Flores & Pine is Bearspaw's own destination restaurant, and the town of Cochrane to the west adds further shops, cafes, and amenities a short drive away."
    ],
    "schools": [
      {
        "name": "Bearspaw School",
        "level": "Elementary",
        "area": "Rocky View Schools (public)",
        "url": "https://bearspaw.rockyview.ab.ca/"
      },
      {
        "name": "Bearspaw Christian School",
        "level": "K-12",
        "area": "Independent",
        "url": "https://bearspawschool.com/"
      },
      {
        "name": "Webber Academy",
        "level": "JK-12",
        "area": "Independent",
        "url": "https://www.webberacademy.ca/"
      },
      {
        "name": "Rundle College",
        "level": "K-12",
        "area": "Independent",
        "url": "https://rundle.ab.ca/"
      },
      {
        "name": "Calgary Academy",
        "level": "K-12",
        "area": "Independent",
        "url": "https://www.calgaryacademy.com/"
      }
    ]
  },
  {
    "slug": "mckenzie-lake",
    "story": [
      "McKenzie Lake is one of southeast Calgary's original lake communities, built around a private 43-acre freshwater lake with a sand beach and roughly 18 acres of parkland reserved for residents. The community sits above the Bow River to the west, with Deerfoot Trail on the east, Stoney Trail and Fish Creek Provincial Park along the southern edge, and McKenzie Lake Boulevard and 130th Avenue SE framing the north.",
      "Development began in the 1980s, with the first homes completed in 1984 and later phases through the late 1990s. That timeline gave McKenzie Lake something newer suburbs lack: mature trees, established streetscapes, and settled, family-oriented streets. It borders Douglasdale to the north, McKenzie Towne to the east, and Cranston across Fish Creek to the south.",
      "With more than 15,000 residents, McKenzie Lake is one of Calgary's larger established communities and a consistently strong southeast market, where lake access and Bow River proximity keep demand steady across price points."
    ],
    "realEstateCopy": [
      "Housing in McKenzie Lake is led by single-family detached homes on generous, mature lots, ranging from 1980s and 1990s two-storeys and bungalows to larger executive and walkout properties along the lake and the Bow River ridge. Lakefront and estate homes anchor the upper end, while interior streets offer more attainable move-up options, which is why the community spans a wide band around its $784,141 average sale price. Spencer Rivers represents both buyers and sellers throughout McKenzie Lake and can surface off-market opportunities, including lakefront and ridge properties that rarely reach public listings."
    ],
    "lifeCopy": [
      "McKenzie Lake suits families and established professionals who want lake living without leaving the city. Days here revolve around the private lake and beach in summer, groomed skating and a toboggan hill in winter, and quick weekend access to Fish Creek Provincial Park. Tennis, basketball, and beach volleyball courts, plus community events run by the residents association, make it an active, connected place to raise a family or settle in for the long term."
    ],
    "outsideCopy": [
      "The private McKenzie Lake anchors year-round recreation, from swimming and fishing off the sand beach to winter skating maintained by the residents association. Fish Creek Provincial Park sits along the community's southern edge, and paved Bow River pathways loop from the McKenzie Lake trailhead across the Fish Creek and Stoney Trail bridges, giving residents direct access to some of Calgary's best walking, running, and cycling routes."
    ],
    "amenitiesCopy": [
      "The McKenzie Lake Residents Association operates the private lake, beach, and park facilities, while the McKenzie Lake Community Association runs local programs and events. Commuting is straightforward: Deerfoot Trail and Stoney Trail (Highway 201) sit at the community's edges, putting downtown roughly 25 to 30 minutes away off-peak. Calgary Transit routes connect the area to Anderson and Somerset-Bridlewood LRT stations for riders heading into the CTrain network."
    ],
    "shopDineCopy": [
      "Everyday shopping centres on South Trail Crossing and the 130th Avenue SE retail district just north of the community, with Walmart, major grocery stores, and a wide mix of restaurants and services. McKenzie Towne's High Street adds a walkable streetscape of cafes, pubs, and independent shops anchored by a Sobeys, and 130th Avenue's big-box corridor covers larger retail runs without a long drive."
    ],
    "schools": [
      {
        "name": "McKenzie Lake School",
        "level": "Elementary",
        "area": "CBE public",
        "url": "https://mckenzielake.cbe.ab.ca/"
      },
      {
        "name": "Mountain Park School",
        "level": "Grades 5-9",
        "area": "CBE public",
        "url": "https://mountainpark.cbe.ab.ca/"
      },
      {
        "name": "Lord Beaverbrook High School",
        "level": "High School",
        "area": "CBE public",
        "url": "https://lordbeaverbrook.cbe.ab.ca/"
      },
      {
        "name": "Bishop O'Byrne High School",
        "level": "High School",
        "area": "Calgary Catholic",
        "url": "https://www.cssd.ab.ca/schools/bishopobyrne"
      }
    ]
  }
];
