const mockSuppliers = [
  {
    name: 'AAT Kings',
    supplier_id: 'AAT Kings',
    source_key: 'spider',
    salesforce_id: [],
    active: true,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: false,
    monthly_capacity: null,
    enabled_market_destination: [],
    milestone_percentage: []
  },
  {
    name: 'Absolute Tours',
    supplier_id: 'Absolute Tours',
    source_key: 'spider',
    salesforce_id: [],
    active: false,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: false,
    monthly_capacity: null,
    enabled_market_destination: [],
    milestone_percentage: []
  },
  {
    name: 'All Alaska Tours',
    supplier_id: 'All Alaska Tours',
    source_key: 'spider',
    salesforce_id: [],
    active: true,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: false,
    monthly_capacity: null,
    enabled_market_destination: [],
    milestone_percentage: []
  },
  {
    name: 'AmericanTours International',
    supplier_id: 'AmericanTours International',
    source_key: 'spider',
    salesforce_id: [],
    active: true,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: false,
    monthly_capacity: null,
    enabled_market_destination: [],
    milestone_percentage: []
  },
  {
    name: 'Andes Nativa',
    supplier_id: 'Andes Nativa',
    source_key: 'spider',
    salesforce_id: [],
    active: true,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: false,
    monthly_capacity: null,
    enabled_market_destination: [],
    milestone_percentage: []
  },
  {
    name: 'AOT',
    supplier_id: 'aot',
    source_key: null,
    salesforce_id: ['0011r00002HSB1DAAX', '0011r00002HSB1EAAX'],
    active: true,
    direct_booking_enabled: false,
    direct_cancel_enabled: false,
    availability_enabled: true,
    monthly_capacity: 1500.0,
    enabled_market_destination: [
      {
        market: 'UK',
        destination: 'FJ'
      },
      {
        market: 'NL',
        destination: 'FJ'
      },
      {
        market: 'FR',
        destination: 'FJ'
      },
      {
        market: 'CH',
        destination: 'FJ'
      },
      {
        market: 'AT',
        destination: 'FJ'
      },
      {
        market: 'DE',
        destination: 'FJ'
      },
      {
        market: 'UK',
        destination: 'CK'
      },
      {
        market: 'NL',
        destination: 'CK'
      },
      {
        market: 'FR',
        destination: 'CK'
      },
      {
        market: 'CH',
        destination: 'CK'
      },
      {
        market: 'AT',
        destination: 'CK'
      },
      {
        market: 'DE',
        destination: 'CK'
      },
      {
        market: 'UK',
        destination: 'AU'
      },
      {
        market: 'FR',
        destination: 'AU'
      },
      {
        market: 'NL',
        destination: 'AU'
      },
      {
        market: 'US',
        destination: 'AU'
      },
      {
        market: 'CH',
        destination: 'AU'
      },
      {
        market: 'AT',
        destination: 'AU'
      },
      {
        market: 'DE',
        destination: 'AU'
      },
      {
        market: 'UK',
        destination: 'NZ'
      },
      {
        market: 'NL',
        destination: 'NZ'
      },
      {
        market: 'FR',
        destination: 'NZ'
      },
      {
        market: 'US',
        destination: 'NZ'
      },
      {
        market: 'CH',
        destination: 'NZ'
      },
      {
        market: 'AT',
        destination: 'NZ'
      },
      {
        market: 'DE',
        destination: 'NZ'
      }
    ],
    milestone_percentage: [
      {
        threshold: 4000001.0,
        percentage: 1.6
      },
      {
        threshold: 3000001.0,
        percentage: 1.4
      },
      {
        threshold: 2000001.0,
        percentage: 1.2
      },
      {
        threshold: 500001.0,
        percentage: 1.0
      },
      {
        threshold: 1.0,
        percentage: 0.75
      }
    ]
  }
]

const mockItems = {
  meta: {
    count: 40,
    total_count: 56
  },
  data: [
    {
      item_type: 'accommodation',
      id: '95760e7d-dcc9-4740-af16-0a7276311513',
      parent_uuid: '2374caee-1a6c-44c7-939d-c84f066a0170',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '98677',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eNgorongoro Wild camp is located on the sides of Ngorongoro Crater, at Ngorongoro Conservation Area. Coming from Arusha, it is about 140 km. The camp is composed of 20 comfortable tents with the capacity to accommodate 2 guests each, and a large dining tent.\u003c/p\u003e',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          },
          {
            content:
              '\u003cp\u003eDas Ngorongoro Wild Camp liegt in einem Naturschutzgebiet und bietet eine hervorragende Aussicht auf den nahegelegenen Salzwassersee Eyasi und ist in bequemer Entfernung des spektakulären Ngorongoro Kraters. Das Camp bietet stilechte Zelte, die auf Stelzen gebaut sind, mit privaten Terrassen und weitreichendem Ausblick. Alle Zelte haben ein eigenes, gefliestes Badezimmer Toilette und Dusche. Es ist durchaus üblich, dass Giraffen und Zebras durch das Lager wandern. Das Restaurant bietet internationale Küche mit einer regionalen Raffinesse, romantische Abendessen im Busch stehen ebenfalls zur Verfügung. Weiter gibt es ein hervorragendes Spa, welches Sie nach einem langen Tag auf Safari verwöhnt. \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eNgorongoro Wild camp is located on the sides of Ngorongoro Crater, at Ngorongoro Conservation Area. Coming from Arusha, it is about 140 km. The camp is composed of 20 comfortable tents with the capacity to accommodate 2 guests each, and a large dining tent.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: ' Ngorongoro Wild Camp',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          },
          {
            content: ' Ngorongoro Wild Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: ' Ngorongoro Wild Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.263717,
              lon: 35.325559999999996
            },
            source: 'item_curator',
            source_key: 'item_curator'
          },
          {
            content: {
              lat: -3.263717,
              lon: 35.325559999999996
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/5dcdf2c4-c4aa-436e-a73d-2342fd0be410'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'da5e90eb-f954-48ac-aa78-40cb556ac714',
      parent_uuid: '865edcfe-36ea-45bc-a713-8b1bac5bff4f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '49719',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eEin wirklich besonderer Ort, an dem Sie einen einmaligen Einblick in das authentische Afrika erhalten. Mitten in der Wildnis der Maasai Steppe befinden sich die Africa Amini Maasai Lodge, mit grandiosem Blick auf den Kilimanjaro. Hier lernen Sie die Traditionen und Rituale der Maasai kennen. Ein Essbereich, eine Bar und ein Laden bilden den Hauptbereich und draußen locken viele bequeme Sitzgelegenheiten. Ein kurzer Spaziergang entfernt befindet sich ein einladender Pool, ein kleines Spa und sogar eine Sauna. Die gemütlichen einmaligen Unterkünfte sind als traditionelle Maasai Häuser gestaltet, aber mit modernen Annehmlichkeiten wie Toiletten und fließend heißem Wasser. \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eOffering 14 traditional Masai inspired bungalows, the Africa Amini Maasai Lodge offers a unique African experience in Ngare Nanyuki, Tanzania. The bungalows are solar-powered and offer European standards, with toilet and shower with hot water. Guests can enjoy the magnificent sunrise behind the Kilimanjaro from the terrace whilst international and traditional Swahili dishes are refined with home-grown herbs and served in the restaurant. Free activities such as javelin throwing, dances, nature walks or campfire conversations allow interaction with the Maasai. For added relaxation, guests can make use of the relaxation area, massage room, swimming pool and sauna.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Africa Amini Maasai Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Africa Amini Maasai Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.100169,
              lon: 36.92269
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'b3b63efc-7db4-49ef-8282-c2c104236796',
      parent_uuid: '865edcfe-36ea-45bc-a713-8b1bac5bff4f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '96785',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              "\u003cp\u003eCet établissement se situe au pied du Mont Neru, dans le petit village de Ngongongare et offre une vue imprenable sur les montagnes. Il s'agit d'un point de départ idal pour partir à l'assaut du Mont Neru, du Kilimanjaro ou encore pour faire un safari. Le lodge se compose de tentes spacieuses et confortables disposant d'une salle de bains privative et d'une terrasse.  Ce lodge abrite également un bar, un restaurant proposant une cuisine élaborée à partir de produits locaux et une superbe piscine à débordement entourée d'un jardin tropical très agréable.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eIn een prachtige tropische tuin vindt u de infinity pool, een heerlijke plaats om te relaxen. De ruime bungalows zijn zeer geschikt voor families met kinderen, net als de ongedwongen sfeer in de African View Lodge. Uw bungalow heeft een dak van bananenbladeren in Meru-stijl en een eigen badkamer. Er is een prima restaurant, een bar met terras, een massageruimte en een wasserijservice. Wie wil klimmen kan naar de top van de Mount Meru op 4.566 meter hoogte.Vlakbij ligt  Arusha National Park waar u behalve de giraffen en buffels ook de Tululusia watervallen aantreft.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eNur einen Steinwurf vom Arusha Nationalpark entfernt liegt die African View Lodge. Diese bietet eine überschaubare Anzahl an Zimmern mit Terrasse und einer fantastischen Aussicht auf den Berg Meru. Die Anlage wurde aus lokalen Materialien erbaut. Jeder Raum wurde mit einem für Tansania typischem Thema designt, sodass eine Tour in der Lodge schon eine Minitour des Landes darstellt. Im tropischen Garten steht das „Baumhaus“ – ein permanentes, erhöht errichtetes Zelt zwischen den Bäumen des Gartens. Zur Anlage gehören außerdem ein Infinity-Pool, ein Restaurant mit Bar und Biergarten, freies WLAN, ein Massageservice, ein Fernsehzimmer und eine Aussichtsplattform auf den Meru.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eThe African View Lodge was built using only locally-sourced materials, a design philosophy which pays tribute to the Arusha National Park, located only 30 minutes away by car. Guests are ravished by marvellous views of Mount Meru and Kilimanjaro as they walk through the ground’s bio-diverse gardens and come across an infinity swimming pool. The African View Lodge’s cosy bungalows feature Mount Meru style banana leaf tops, and each room is named after a Tanzanian topographical landmark - a perfect introduction to the country’s vast geographical variety.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'African View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'African View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'African View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'African View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content: 'African View Lodge',
            source: 'wetu',
            source_key: null,
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3255833,
              lon: 36.873444444444445
            },
            source: 'wetu',
            source_key: 'gecko'
          },
          {
            content: {
              lat: -3.3255833,
              lon: 36.873444444444445
            },
            source: 'wetu',
            source_key: null
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/4c2a5fc4-ee40-404a-9f82-edba9b51aa45',
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'aac7fdb9-dc7b-4cde-82d2-da6b0ee0d26e',
      parent_uuid: 'b1cfa3d6-c995-4296-a27c-f8544f158f38',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '66786',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Nungwi - North cost',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eIn den Amaan Bungalows erleben Sie die Trauminsel Sansibar in entspannter und gepflegter Umgebung: Ihnen stehen alle Annehmlichkeiten eines komfortablen Resorts zur Auswahl. Einige der Unterkünfte besitzen direkten Meerblick. Die geschmackvoll eingerichteten Zimmer sind klimatisiert, mit einem TV und Balkon ausgestattet. Genussvolle Momente erleben Sie im Restaurant und an der Bar, zu der eine gemütliche Lounge gehört. Freies WLAN gibt es in allen öffentlichen Bereichen. Ob im Swimming-Pool, auf der Sonnenterrasse oder bei Massagen – Ihr Wohlbefinden steht immer an erster Stelle. Der Nungwi Beach liegt direkt vor Ihrer Haustür, das Zentrum von Nungwi erreichen Sie in wenigen Gehminuten. \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eAmaan Bungalows is located in Nungwi, a beachfront on the north western tip of the island. The hotel features a wide range of facilities and leisure options. Amaan Bungalows offers accommodation for families, couples and honeymooners. The hotel’s 86 guest rooms, include 16 sea view rooms, 32 pool view rooms, 19 deluxe rooms and 19 garden rooms, set amid a landscaped tropical oasis of coconut palms, shady trees and sweet scented flowers. The hotel’s traditional architecture utilizes local materials from the island.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Amaan Bungalows',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Amaan Bungalows',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -5.729490598100782,
              lon: 39.291835720237714
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '36df1521-7bc4-43a8-bb54-456854f15357',
      parent_uuid: '3b044c8a-ef75-4736-8a48-ff3b0e3aeaf2',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '203224',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Pingwe, Zanzibar Central/South, Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [],
        name: [
          {
            content: 'Aqua Zanzibar Beach Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -5.913376649249583,
              lon: 39.35580516441803
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/b1cfa3d6-c995-4296-a27c-f8544f158f38',
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '8ec69d78-1057-46ad-9317-7c2124a123ce',
      parent_uuid: '865edcfe-36ea-45bc-a713-8b1bac5bff4f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '28602',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              "\u003cp\u003eSitué sur une ancienne plantation de café, au cœur d'une végétation tropicale, l'Arumeru River Lodge est un établissement 4 étoiles qui propose des chambres et suites spacieuses. Chacune d'entre elles dispose d'une terrasse et d'un salon extérieur ainsi que d'une salle de bains et d'un lit à baldaquin. L'hôtel comprend également une superbe piscine propice à la détente, un bar, un restaurant servant des spécialités locales et internationales et un confortable salon. De plus,  vous y résiderez à seulement sept kilomètres du parc national d'Arusha.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eMaak een bushwandeling door de magnifieke hoteltuin waarin uw luxe lodge ligt. Er zijn zelfs dikdiks en apen te zien. In deze paradijselijke omgeving met uitzicht op de Kilimanjaro en Mount Meru heerst de sfeer van weelde en rijkdom en dat is in de prachtige gedecoreerde, traditionele interieurs terug te zien. U w kamer beschikt over een comfortabele zithoek, een open haard, een luxe badkamer en heerlijke bedden. Het aanlokkelijke zwembad ligt tussen bijzondere bomen verscholen. ‘s Avonds laat u zich bedienen in het restaurant, de bar of de lobby en waant u zich in een koloniaal landhuis uit vervlogen tijden.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eIn der Arumeru River Lodge haben Sie die Wahl zwischen drei Raumtypen: Gartenzimmer, Junior-Suiten und die Meru-Hütte. Die Zimmer befinden sich in einer tropischen Gartenanlage, die berühmt ist für ihre Artenvielfalt. Von Ihrer privaten Terrasse beobachten Sie die frei herumlaufenden Antilopen. Alle Junior-Suiten verfügen über eine zweite Veranda und Möbeln im Sansibar-Stil. Die Meru-Hütte ist eine gute Option für Familien mit Kindern. Sie befindet sich an einer recht privaten Stelle im tropischen Park. Alle Räume sind ausgestattet mit einer ebenerdigen Dusche, freiem WLAN, Moskitonetzen und einem Ventilator. In der Familienhütte gibt es zusätzlich einen Safe und einen Kamin.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eThe epic Kilimanjaro landscape serves as the background for the Armeru River Lodge, constructed on the site of a former coffee plant on the Armeru River. Traversing five hectares of arid soil, the Armeru River Lodge features rooms that re fully-equipped with four-poster canopy beds, breezy terraces, and environmentally friendly amenities.  Large palm trees, radiant gardens, and wooden villas give way to a solar-powered swimming pool in a lush, tropical space - the perfect way to cool off after exploring the nearby Arusha National Park.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Arumeru River Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'Arumeru River Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Arumeru River Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Arumeru River Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3808919515890534,
              lon: 36.8398779630661
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '0c8f8f01-d845-4bc2-a1ac-8585fa4971eb',
      parent_uuid: '45a81813-6fe4-4e7a-a5c7-0ec556851498',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '129475',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Arusha, Tanzania\r\n',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eArusha Serena Hotel, Resort \u0026amp; Spa is unlike any other hotel in Tanzania with authentic, bespoke experiences that stir the traveller’s soul while showcasing the breathtaking tranquillity of the surroundings. Set among the woodland slopes of Mount Meru at the edge of Lake Duluti, there’s no better destination for soaking in the beauty and magnificence of the Tanzanian “Northern Safari Circuit.”\u003c/p\u003e\u003cp\u003eThe ambience of this Arusha hotel is warmly reminiscent of their origins as a colonial era coffee farm, beginning with the welcoming stone-built reception area and extending to cottage-style rooms neatly arranged among landscaped lawns and the colourful banks of Bougainvillea. Traces of thei hotels heritage present themselves in elegant, country-manor interiors featuring unique artefacts, leaded windows and French doors opening to extensive lake view gardens. Social areas within the Arusha hotel include a library, a lounge and a restaurant offering an enchanting wood fireplace and lake and garden views.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Arusha Serena Hotel Resort \u0026amp; Spa',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3806804,
              lon: 36.7923978
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'f8f414aa-4686-405e-99f1-6e33d5a19db5',
      parent_uuid: 'afc60e5c-2949-4210-affb-3030686875cb',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20459',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDas Asmini Palace liegt ruhig unweit des Hafens in Stone Town, dem ältesten Stadtviertel von Sansibar-Stadt. Die klimatisierten Zimmer in dem architektonisch reizvollen Gebäude sind über die einem Patio ähnelnden Hotelhalle erreichbar. Die Räume sind behaglich mit sehr viel Liebe zum Detail eingerichtet und verfügen über eigene Duschbäder. Alle Betten sind mit Moskitonetzen ausgerüstet. Es gibt eine Dachterrasse mit einem eindrucksvollen Ausblick auf den Meer und den Hafen. Nicht weit vom Asmini Palace Hotel liegt das Geburtshaus des legendären Rockstars Freddy Mercury mit dem nach ihm benannten Restaurant.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              "\u003cp\u003eZANZIBAR'S FIRST ALL NEW BOUTIQUE HOTEL THE ASMINI  HAS SPRUNG FROM AN \u003c/p\u003e\u003cp\u003eANCIENT RUIN AND UNIQUELY BLENDS ARABIC, INDIAN AND SWAHILI HISTORICAL \u003c/p\u003e\u003cp\u003eDESIGNS WITH ZANZIBAR'S ONLY HOTEL ELEVATOR AND WIRELESS INTERNET.ENJOY ALL THE AMENITIES EXPECTED IN A FOUR STAR HOTEL, INCLUDING A QUICK RIDE ON THE LIFT TO OUR BREATH TAKING SEA VIEW TERRACE. COME \u003c/p\u003e\u003cp\u003eAND WATCH THE DHOWS UNDER FULL SAIL, SLICE MAJESTICALLY THROUGH THE HARBOUR AT SUNSET.ENJOY THE HOSPITALITY OF OUR DELIGHTFUL AND COURTEOUS STAFF ALWAYS READY TO HELP YOU AND EXPERIENCE OUR \u003c/p\u003e\u003cp\u003eCHEF'S MAGICAL HANDS AS HE CRAFTS A MEMORABLE  AND UNIQUE  ZANZIBAR DINING TREAT.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Asmini Palace',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Asmini Palace',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.16017154711906,
              lon: 39.191563725471504
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/86968d9b-5a0c-46ed-97db-45d044e19bdf',
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '19cea452-cd26-4c89-886d-939097ad04ed',
      parent_uuid: '27ff6d3a-62d1-483c-8189-5db033b9582c',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20087',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: '14 Ocean Road\r\nBagamoyo, \r\nTanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eEine frische Ozeanbrise erwartet Sie im paradiesischen Bagamoyo Beach Resort in Tansania. Schneeweißer Strand, Kokospalmen und rauschende Wellen machen Ihren Aufenthalt in einem der Strandbungalows oder Suiten einfach einmalig. Jede Unterkunft verfügt über ein privates Badezimmer, Klimaanlage und TV. Zum Baden können Sie das Meer auch gegen den luxuriösen Swimming-Pool eintauschen. Entspannen Sie auf der Sonnenterrasse oder bei einem Drink an der Bar. Kulinarisch beglückt Sie das Makuti Restaurant mit einer überwiegend französisch geprägten Küche. Gerne unterstützt Sie das freundliche Personal bei der Planung von Aktivitäten: Unternehmen Sie eine Bootsfahrt nach Sansibar oder erobern Sie beim Windsurfen den Ozean. \u003cbr\u003e \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              "\u003cp\u003eSympathique, French-managed hotel with accommodations for up to 45 people. \u003c/p\u003e\u003cp\u003eThe hotel's Makuti Restaurant serves French, International and seafood dishes on the beachfront.\u003c/p\u003e\u003cp\u003eSpecialities of the house include: the Fisherman's dish, French Seafood Fondue, Fondue Bourguignone and Spanish Paella.  Adjacent to the Restaurant is the Bar, fully-stocked with local as well as international beverages and serving a great variety of cocktails.\u003c/p\u003e\u003cp\u003e The Hotel's Sport and Excursion Centre offers a wide range of activities, including boat trips to the local coral reef and to the island of Zanzibar. Besides marine sports, such as wind-surfing and snorkeling, the center offers mini-golf, archery, table tennis, darts, badminton, volleyball, football and petanque. A swimming pool is nearing completion\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Bagamoyo Beach Resort',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Bagamoyo Beach Resort',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.42984562444899,
              lon: 38.903260618697296
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/28a978ac-1dbe-4a74-9a4a-39962634b4f1',
              'kiwi://Elephant/Item/36fbd98f-0656-4013-891c-cd012be11632',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '0cf3f04c-7bcf-4e0d-b3d3-898812d56656',
      parent_uuid: 'ffd327c5-85db-4ccb-9db7-08ade3b09a51',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20137',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              "\u003cp\u003e \u003c/p\u003e\u003cp\u003eCet hôtel familial jouit d'une situation privilégiée, en bordure de la plage de sable blanc de Jambiani et à quelques kilomètres seulement de la forêt de Muyuni. Il met à la disposition de sa clientèle de belles chambres climatisées, équipées de lits sculptés traditionnels de Zanzibar, d'un bureau et d'une salle de bains. Certaines offrent également une terrasse ouvrant sur l'océan. L'hôtel dispose de plus d'une piscine, d'un bar, d'un restaurant servant de la cuisine swahili et internationale, d'une petite bibliothéque et d'une boutique de souvenirs. Vous pourrez également y louer du matériel de plongée.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eDirect aan de Indische Oceaan ligt een charmant hotel met een fantastisch service-niveau. Strijk neer onder een parasol en laat u verwennen met heerlijke cocktails van de strandbar. Desgewenst kunt u ook romantisch dineren aan het strand. Neem een artistieke henna tattoo of een kruidige massage met kokosolie. Uw kamer is ingericht met authentieke Zanzibari meubels en heeft uitzicht op de oceaan of op de tuinen. Er is gratis WiFi, een moderne badkamer en een ventilator. Op verzoek is er ook een kinderbedje. In de souvenirshop of in het levendige stranddorp Jambiani kunt u inkopen doen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eDas gemütliche Blue Oyster Hotel ist ein Familienbetrieb und liegt am weißen Sandstrand von Sansibar. Das Hotel liegt in dem kleinen traditionellen Fischerdorf Jambiani. Zu den Annehmlichkeiten des Hotels gehören ein Restaurant mit Terrasse, ein Massageservice, eine Bibliothek, eine Strandbar, ein Souvenirladen mit lokalen Produkten sowie WLAN. Sie haben die Wahl zwischen Zimmern mit Blick auf das Meer und solchen mit Blick in den Garten. In den Zimmern mit Seeblick genießen Sie den Sonnenaufgang über dem Indischen Ozean von Ihrem eigenen Balkon. Alle Zimmer haben ein Bad mit Dusche und traditionelle Möbel aus lokalen Materialien.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eZanzibar has a fair share of breath-taking hotels, but the Blue Oyster Hotel is a distinguished choice for visitors preferring an intimate, cosy experience next the coast’s beaming white sands. A family run hotel located on the eastern side of the island, the Blue Oyster Hotel features sun loungers under breezy palm trees, beige eco-friendly wood decor, and a homey seafood restaurant which offers the best of the local catches of the day. The hotel is a perfect fit for guests seeking an environmentally conscious experience to recharge their batteries.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Blue Oyster Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'Blue Oyster Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Blue Oyster Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Blue Oyster Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.31675889516145,
              lon: 39.5471661182411
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '521dac06-580d-4007-bfe6-97f6922e0c2b',
      parent_uuid: 'ffd327c5-85db-4ccb-9db7-08ade3b09a51',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '15450',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDas Breezes Beach Club and Spa liegt an einem Bilderbuchstrand und bietet eine elegante Atmosphäre. Freuen Sie sich über einen Außenpool, Wassersportmöglichkeiten und spannende Ausflugsziele. Die klimatisierten Zimmer und Suiten bieten einen privaten Balkon und ein modernes Bad. Entspannen Sie im hauseigenen Spa, welches eine Auswahl an Massagen und Schönheitsbehandlungen im Swahili-Stil mit Kerzen und würzigen Düften bietet. Zu den weiteren Einrichtungen gehören ein Tennisplatz, ein Fitnesscenter und eine Gemeinschaftslounge. Lassen Sie sich in drei hochklassigen Restaurants, mit unterschiedlichen Gerichten, verwöhnen. Das belebte Dorf erreichen Sie nach zehn Fahrtminuten, viele weitere Attraktionen wie Stone Town in etwa einer Stunde.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eFor centuries the island of Zanzibar has evoked a mystical and magical dream.  With the distinct advantage of being located on the South East coast which is the one of the most quiet and untouched parts of the Island, Breezes is the ultimate retreat for those looking to get away from it all.  This beautiful resort is situated along a pristine, untouched beach stretching as far as the eye can see. With great attention to detail, unique charm, personalized service and warm hospitality.   \u003c/p\u003e\u003cp\u003eBreezes Beach Club \u0026amp; Spa is set in beautiful tropical landscaped gardens on a pristine and peaceful beach on the East Coast of the island, about one hour from Stone Town. Breezes is famous for its attention to detail, intimate and private dining, its world-renowned beautiful Zanzibar décor with stunning carvings, glistening brass and rich fabrics creating an elegant and unique atmosphere. In 2005, Breezes Beach Club won the title of "Best Resort in Tanzania" at the World Travel Awards.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Breezes Beach Club and Spa',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Breezes Beach Club and Spa',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.1940031614379185,
              lon: 39.53473895788193
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/175c2356-a478-44f9-a754-024e04e64a48'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '81db0c58-a4db-43b3-b87b-43d65127c57c',
      parent_uuid: 'c5420307-d23a-4d13-b143-d7af795047fc',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20410',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content:
              'Kiponda area housenumber 831\r\nStone Town, Zanzibar\r\n\r\nMail address:\r\nZanzibar Palace Hotel\r\nP.O.Box 3392\r\nZanzibar\r\nTanzania \r\n\r\n',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eZentral in der Stone Town von Sansibar und nur 300 Meter vom Strand entfernt begrüßt Sie das Dhow Palace Hotel in einem historischen Gebäude. Ein Pool, ein Restaurant sowie eine Dachterrasse mit Panoramablick, ein Spielzimmer und eine Bibliothek versprechen unbeschwerte Ferientage. Freuen Sie sich auf Ihr geräumiges Zimmer, welches im typischen Stil von Sansibar eingerichtet ist und Ihnen ein Bad, Klimaanlage und Sat-TV bietet. Kostenfreies WLAN steht Ihnen in allen Bereichen des Dhow Palace zur Verfügung.  Unternehmen Sie einen Spaziergang zum 300 Meter entfernten Haus der Wunder. Der Fährhafen liegt in einem Kilometer Entfernung und ist ebenfalls fußläufig erreichbar.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eThe Dhow, being the heart beat of the East African culture, has been carrying people, goods and treasures to and from Zanzibar for hundreds of years.\u003cbr\u003eToday, the Dhow Palace serves as a meeting point for people and cultures from all over the world amidst a decor and artefacts from a time gone by.\u003c/p\u003e\u003cp\u003eDhow Palace was originally the home of a rich merchant, Sheikh bin Mujbia. Bin Mujbia and his descendants kept the building for more than three centuries before it was sold. \u003cbr\u003eThe Dhow Palace building, being right in the heart of the stone town, has bore witness to many events taking place in Zanzibar, before the Dhow building itself became the centre of attention back in 1993 when it was transformed from a family mansion to this elegant hotel. In 2005 it again sought the attention when the new wing was added.\u003cbr\u003eThe Dhow Palace can easily be described as a living museum dedicated to furniture, art and oriental ornaments which have found their way to the shores of Zanzibar over the past centuries.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Dhow Palace Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Dhow Palace Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.16417694754582,
              lon: 39.187749624252305
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/86968d9b-5a0c-46ed-97db-45d044e19bdf',
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '5e4be777-9471-4835-b4e1-7a323a0f85ba',
      parent_uuid: '8e2cc246-0d9a-4dfc-8346-26c70553587f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '121819',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Sopa Plaza, 99 Serengeti Road,\r\nP. O. Box 12814, Arusha, Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eInternationally renowned for the greatest wildlife spectacle on the planet, The Serengeti National Park located in north-west Tanzania is the ultimate ‘wildlife show’ on earth. Across the globe authors and filmmakers have come to document the Annual Migration of hundreds of thousands of animals, but there is still only one way to understand and experience the true magnificence of this natural phenomena and that is to be part of it. Elewana Serengeti Migration Camp is the embodiment of the ‘camp’ experience. Located next to the famous Grumeti River which is home to resident hippos that bark and wallow their days away, Elewana Serengeti Migration Camp has become synonymous with low-impact high-action game viewing in a landscape that is untouched since the dawn of time. Hidden among the rocky outcrops the camp is located at the starting point of the Migration. Comprising of 20 luxurious elevated tents, each with spacious and richly furnished bedrooms, blends seamlessly into the environment. Each of the tents is surrounded by its own 360-degree verandah deck, which in turn creates your very own private sanctuary to enjoy the constant game sightings and the ever-present sounds of the bush.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Elewana Serengeti Migration Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -1.9264688248714603,
              lon: 35.01902112380367
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c6e935c7-2b54-406f-9b61-7df0f52cfe00',
              'kiwi://Elephant/Item/a77261d2-787b-4631-88f0-af4138cdbb55',
              'kiwi://Elephant/Item/3d8a293f-220b-435e-95ef-f635d3f7a26c',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '951b293d-d4e2-4767-a8a2-12f155e93caf',
      parent_uuid: 'd44e651b-0ff8-4b1f-b36f-4a184eb2f58d',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '29693',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDas Serengeti Pioneer Camp liegt umgeben von einer verträumten Landschaft und inmitten der faszinierenden Tierwelt. Genießen Sie die atemberaubenden Ausblicke auf den Magadi-See und die endlosen Serengeti. Das ganze Camp von den 1930er Jahre inspiriert und bietet ein abenteuerliches Ambiente. Die Zeltunterkünfte verfügen über ein Bad mit Duschen und sind so konzipiert, dass sie das Beste aus längst vergangener Zeiten widerspiegeln ohne auf modernen Komfort verzichten zu müssen. Das Esszelt beherbergt Sie sowohl zum Frühstück als auch zum Abendessen, während das Mittagessen entweder im Camp oder im Busch eingenommen wird.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eLocated in the Southern Serengeti (within the Moru Kopjes area), Elewana Serengeti Pioneer Camp is ideally situated to offer superlative access to the annual migration and the ‘Big 5’ with sweeping views overlooking Moru Kopjes, Lake Magadi and the endless plains.\u003c/p\u003e\u003cp\u003eElewana Serengeti Pioneer Camp has its own individual style and feel, paying homage to the mobile camps of the 1930’s, a time when an African safari was truly a journey into the unknown, Elewana Serengeti Pioneer Camp’s  ‘zero footprint’ and close proximity to nature combines to make an unmistakably distinctive and truly individual offering.\u003c/p\u003e\u003cp\u003eComprising of twelve tented accommodations, all of which have ensuite facilities including a flushing toilet, vanity basin, and showers, the tent interiors are designed to evoke the very best of an era long-gone but certainly not forgotten.\u003c/p\u003e\u003cp\u003eA dining tent hosts the Camp’s guests for both breakfast and dinner, whilst luncheons are taken either in the camp or in the bush during what will no doubt be yet another enthralling day in the Serengeti.\u003c/p\u003e\u003cp\u003eElewana Serengeti Pioneer Camp captures the original essence of the mobile African safari, engendering nostalgic wonderment whilst unlocking the adventurous spirit within all of us.The drama and beauty of the Serengeti National Park is indeed awe inspiring.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Elewana Serengeti Pioneer Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Elewana Serengeti Pioneer Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -2.6680129544557847,
              lon: 34.73442167043686
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c2069c57-878c-4ec0-a8a1-f911b461ca8c',
              'kiwi://Elephant/Item/3d8a293f-220b-435e-95ef-f635d3f7a26c',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/a3859eb2-04e7-4e01-8ca3-42cbe5746081'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'c630bb2b-0e03-4cd3-9f8f-f071cd30cf50',
      parent_uuid: 'b6437c3a-e138-4a83-aa3b-4853dc79b314',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '14975',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Tarangire',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eDirekt auf dem Weg der jährlichen Elefantenmigration gelegen, ermöglicht das Tarangire Treetops einen perfekten und ungestörten Blick auf die Natur und Tierbeobachtungen direkt aus Ihrer Suite. Alle Suiten erzeugen durch natürliche Materialien und authentische afrikanische Ausstattungen perfektes Ambiente. Durch die Aussicht in den hohen Bäumen erlaubt Ihnen das Tarangire Treetops einen unvergesslichen Aufenthalt. Vom Restaurant, der Rezeption und dem Schwimmingpool haben Sie immer einen perfekten Blick auf das nahegelegene Wasserloch, das jährlich Tiere jeglicher Art anzieht.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eOn the path of an annual elephant migration, Tarangire Treetops sits alone in a 312km2 private wildlife area bordering Tarangire National Park, amid a landscape of rolling and baobab-studded hills. Our elevated "treehouse" suites are perched high up with views over the adjacent baobab and marula trees, giving Tarangire Treetops an adventurous and exotic feel. Twenty suites, each 65 sq metres with a private balcony, are lavishly furnished. Natural materials are blended with contemporary Africana décor, to provide guests with a unique and most memorable safari experience. Encasing an impressive baobab tree, the spacious and tranquil dining room, reception and lounge overlook the swimming pool and a waterhole that sees a steady flow of wild animal visitors. With the natural beauty of the hills and dry river beds begging to be explored, guests can enjoy guided walking safaris, day or night time game drives and the enchantment of bush dining.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Elewana Tarangire Treetops',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Elewana Tarangire Treetops',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.7754566387237145,
              lon: 36.15385740995407
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'd6ce8ab5-8318-424e-852f-909f35f12f80',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20466',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content:
              'Elewana Africa\r\nSopa Plaza\r\n3rd Floor, 99 Serengeti Road\r\nP. O. Box 12814 Arusha Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eMitten im Rift Valley, umgeben von der eindrücklichen Steppe mit den grünen Hügeln, liegt das Elewana The Manor at Ngorongoro. Das viktorianische Hotel befindet sich in einem Naturschutzgebiet und neben einer Arabica-Kaffeeplantage. Jede der Unterkünfte wurde sorgfältig positioniert, um den Blick auf die angrenzenden grünen Hügel zu maximieren und gleichzeitig die Intimität und Privatsphäre zu erhalten. Die Suiten und Häuschen verfügen über WLAN, komfortable Badezimmer und bieten viel Platz. Weiter stehen Ihnen ein erstklassiges Spa, ein Swimmingpool, Billard Zimmer und ein Kino zur Verfügung. Das Hotel bietet eine breite Palette an Safaris, Strandausflügen und Abenteuer für die ganze Familie.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003ePoised adjacent to the famous Ngorongoro Conservation Area, Elewana The Manor at Ngorongoro is a grand mansion that exudes old-world charm in north-west Tanzania. The manor is comprised of 18 cottage suites, each with its own private entrance and adjoining private sun terrace. In-room amenities include an en-suite bathroom with a rain shower, Wi-Fi and tea and coffee making facilities. Guests can enjoy an array of activities such as lunch on the Ngorongoro Crater Floor, a game drive in the Ngorongoro Crater and Lake Manyara National Park, and horse riding around the 1500-acre coffee estate.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Elewana The Manor at Ngorongoro',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Elewana The Manor at Ngorongoro',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3018370412987,
              lon: 35.6404209136963
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'f5f01a4d-cb53-47ae-b3fb-20c3e85f5f1e',
      parent_uuid: '6ce9b7a5-780e-492b-b214-f268e4f87e2c',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '34830',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003e\u003cbr\u003eDie Emayani Beach Lodge liegt direkt an einem abgelegenen Strand mit türkisblauem Wasser und bietet ein einzigartiges Urlaubsziel abseits jeglicher Hektik. Hier können Sie eine Massage zwischen Kokospalmen erleben, einer Fülle von abenteuerlichen Meeresaktivitäten nachgehen und am Swimmingpool sonnen. Die Unterkünfte sind strohgedeckte Strandhütten mit luftigen Schlafzimmern und geräumigen Badezimmern mit solarbeheizten Duschen. Zur Ausstattung gehören private Außenveranden mit gemütlichen Stühlen und Lounge-Betten sowie elektrische Ventilatoren. Der Open-Air-Speisesaal mit Meerblick bietet afrikanische und europäisch inspirierte Küche mit gesunden Menüs. Sie können auch ein romantisches Abendessen unter den Sternen mit Meeresrauschen bei Kerzenlicht genießen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eEmayani Beach Lodge is situated on Ushongo beach, 70km south of Tanga and 15km south of Pangani. \u003c/p\u003e\u003cp\u003eThe lodge boosts 12 coastal (swahili) double/triple bandas with solar heated running water, a swimmingpool, bar and restaurant. Each banda has its own entrance to the beach. The lodge has a private airstrip.\u003c/p\u003e\u003cp\u003eOn site we have a dive-centre operated by Kasa-Divers. They offer diving, snorkeling, wind-surfing and kayaking.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Emayani Beach Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Emayani Beach Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -5.521804125224464,
              lon: 38.97794602938634
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/7afa25de-3cbe-4c4f-9b70-314c9de5a86c',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '1ce04065-a24d-41b2-b503-92632dd96176',
      parent_uuid: '95c498ff-9f24-4aec-aad4-f72e3e8f801d',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20470',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDie Four Seasons Safari Lodge gibt Ihnen den hohen Standard der bekannten Hotelkette \u003cem\u003eFour Seasons\u003c/em\u003e und das inmitten der Serengeti. Die insgesamt 77 Zimmer, Suiten und Villen erlauben Ihnen den ständigen und direkten Kontakt mit dem Leben und der Umwelt der berühmten Savanne. Afrikanische Ausstattung paart sich mit modernen Standards wie WLAN und einer Klimaanlage. Entspannen Sie auf dem großen Sonnendeck und haben Sie dabei ständig die Möglichkeit, die Tierwelt der Serengeti zu beobachten. Vielleicht entdecken sie einen vorbeiziehenden Löwen oder Elefanten, während Sie am luxuriösen Pool der Four Seasons Safari Lodge entspannen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eDeep within Africa’s finest game reserve, our Safari Lodge welcomes you to a sanctuary of Four Seasons comfort. Get up close and intimate with lions, leopards and elephants – yet always feel safe and pampered. Secluded and spacious, our 77 guest rooms, suites and villas keep you in constant touch with the Serengeti. Contemporary African décor features four-poster beds with mosquito netting, as well as local textiles and artwork – all enhanced by modern comforts such as air conditioning and high-speed Internet access. Step outside to your elevated, open-air sundeck with a direct view of the plains and enjoy a private audience with any lions or elephants that might be passing by.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Four Seasons Safari Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Four Seasons Safari Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -2.23377838808625,
              lon: 34.9189496040344
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c6e935c7-2b54-406f-9b61-7df0f52cfe00',
              'kiwi://Elephant/Item/a77261d2-787b-4631-88f0-af4138cdbb55',
              'kiwi://Elephant/Item/3d8a293f-220b-435e-95ef-f635d3f7a26c',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/a3859eb2-04e7-4e01-8ca3-42cbe5746081'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '2edbda71-44ad-43c3-9765-84a595aedde7',
      parent_uuid: 'ffd327c5-85db-4ccb-9db7-08ade3b09a51',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '152008',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Jambiani, \r\nZanzibar',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eFun Beach heißt Sie in einem tropischen Paradies inmitten eines üppigen Gartens, neben weißen Sandstränden mit türkisfarbenen Lagunen und farbenfrohen Korallenriffen willkommen. Freuen Sie sich auf eine Vielzahl von Wassersportarten, darunter Stand-Up-Paddleboarding, Kitesurfen sowie Tauchen und Schnorcheln. Die geräumigen Bungalows besitzen regulierbare Klimaanlagen, eigene Terrassen mit Sitzgelegenheiten, Zimmerservice, Sofaecken und Bäder mit Duschen. Jedem Hotelgast wird außerdem die Nutzung eines kostenlosen Fahrrades angeboten. Zu den weiteren Einrichtungen zählen ein Restaurant mit Meerblick, zwei große Außenpools mit Sonnenliegen, eine Spielhalle mit Billard und Tischtennis sowie eine gemütliche Lounge.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eSituated in Zanzibar, Fun Beach Hotel provides the ideal location for a fun-filled holiday. The hotel offers spacious bungalow accommodation with private verandahs, gardens and sea views, equipped with free Wi-Fi,  air conditioning, and fans. On-site dining includes local cuisine in the restaurant which is open for breakfast, lunch, and dinner, and snacks and small plates in the bar. Other facilities at the hotel include 2 outdoor pools and a gaming area.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Fun Beach Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Fun Beach Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.29724615504338,
              lon: 39.5407713012276
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/3e1e0a2b-18be-469e-b3b2-9418591e08ee'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '36603ee2-713b-4d07-91ce-68e558a76a18',
      parent_uuid: '154b2b99-fdde-4489-8f11-16b90c18ae0e',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20066',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [],
        name: [
          {
            content: 'Giraffe Ocean View Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.69516683024188,
              lon: 39.2256548247135
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/36fbd98f-0656-4013-891c-cd012be11632',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '82975c6a-4d7f-412b-ab7f-9839b59eb3ce',
      parent_uuid: '45a81813-6fe4-4e7a-a5c7-0ec556851498',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '188424',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Simeon Road PO Box 1184 \r\nArusha',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eLocated in the centre of Arusha, the Gran Melia Arusha is an oasis of beautifully landscaped coffee and tea plantations with views of Mount Meru. \u003c/p\u003e\u003cp\u003eThe hotel comprises of an array of city and mountain facing rooms all of which are modernly designed and fully equipped with modern amenities. The hotel is home to various restaurants which include the Saba Saba all-day- dining restaurant, Yellow Chilli, Roof Top and the Ava Cafe. \u003c/p\u003e\u003cp\u003eGran Melia Arusha suggests an array of fascinating activities which includes the cultural heritage centre and the natural history museum.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Gran Melia Arusha',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3712796167514094,
              lon: 36.70560629695888
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '2db0941b-1e93-4799-ab8c-7023fd6c2563',
      parent_uuid: '865edcfe-36ea-45bc-a713-8b1bac5bff4f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '20464',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Momella Rd\r\nArusha National Park\r\nMomella village ',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eDie Hatari Lodge liegt an der nördlichen Grenze zum Arusha Nationalpark im Herzen Tansanias. Die ehemaligen Privathäuser des Schauspielers Hardy Krüger und dessen Farmmanager Jim Mallory befinden sich im Zentrum dieser brandneuen, gemütlichen Lodge. Den Namen übernahm die Lodge vom legendären Film „Hatari!“, der ganz in der Nähe gedreht wurde. Von hier haben Sie einen fantastischen Blick auf den Kilimanjaro und seinen Nachbarn, den schlafenden Vulkan Meru. Diese Luxus-Lodge verfügt über eine geringe Anzahl an Übernachtungsmöglichkeiten - so können Sie besser Ruhe tanken. Die Zimmer sind in einem komfortablen, modernen Retrostil eingerichtet mit einem offenen Kamin und einem großen Bad.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              "\u003cp\u003eAt the foot of the snow-topped Mount Meru, Arusha National Park is home to untamed landscapes strewn with wildlife. \u003cbr\u003eBordering the northern edge of the national park, Hatari Lodge can be found nestled in an acacia forest,  flanked by two jutting peaks: Mount Kilimanjaro and Mount Meru, a 14,980ft dormant volcano.\u003cbr\u003eAfter a day’s exploring, retreat to Hatari to find a historic lodge with a Hollywood pedigree. Named after the 1960's blockbuster Hatari!, which starred John Wayne, and was filmed in the area, this former African farm has been lovingly restored and transformed into an intimate bush lodge.\u003c/p\u003e\u003cp\u003eDedicated to the trio of large animals roaming Arusha National Park — elephant, buffalo and giraffe — the three villas boast decor in a traditional Swahili coastal style. Families and larger groups should book one of the three new spacious villas looking out over a dramatic vista of Mount Meru and Kilimanjaro.\u003c/p\u003e\u003cp\u003eThe nine deluxe standard rooms are decorated with a fun, stylish mix of bright cushions and throws made from local textiles, brightly patterned Kenyan carpets and handprinted-style wallpaper peppered with vibrant wall art created by local artists. In the winter months, an open fire crackles seductively in each room.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Hatari Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Hatari Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.2261072232357577,
              lon: 36.85732841491699
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/4c2a5fc4-ee40-404a-9f82-edba9b51aa45',
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'c7683ca8-79a7-41e1-8d29-a8025aaa4c62',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '68037',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDas Highview Hotel liegt in Karatu, einer farbenfrohen Stadt, die auch das Tor zum Ngorongoro-Hochland darstellt. Die Hotelzimmer liegen ruhig auf einem kleinen Hügel, in einem separaten Gebäude abseits der Rezeption, Lounge und des Restaurants. Zur Zimmerausstattung zählen ein Schreibtisch, kostenloses WLAN und private Badezimmer. Je nach Zimmerkategorie gibt es auch einen eigenen Balkon. Entspannen Sie im idyllischen Garten, dem Swimmingpool und in der Lounge mit gemütlichem Kamin. Weiter können Sie durch den Souvenirladen stöbern und im offenen Speisesaal lokale und kontinentale Küche genießen. Erfahrene Führer begleiten Sie auf Spaziergänge zu Wasserfällen, Kaffeeplantagen, Waldreservaten und Tierbeobachtungen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eHighview Hotel’s guest rooms are located on top of a small hill, in a separate building from that which houses the reception, lounge and restaurant. The distance between the two buildings is short and it is an easy promenade through the beautiful gardens. The accommodations feature fantastic views over the underlying local agricultural land and the densely forested hills of the Ngorongoro Conservation Area beyond. All rooms are tastefully furnished and decorated, with king size twin beds and en suite bathrooms.\u003c/p\u003e\u003cp\u003eBreakfast, lunch and dinner are served at the onsite restaurant or outside in the gardens. The kitchen offers a selection of local and continental dishes which are served a la carte or in buffet style. The restaurant also prepares takeaway lunch boxes for safaris or excursions during the day, and arranges hot bush lunches. In the hotel’s spacious lounge, guests can enjoy a drink at the bar, play a selection of board games, browse the internet or relax in front of the open fire. The hotel presents regular cultural shows, including local music, dance and acrobatics.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Highview Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Highview Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.338556479833528,
              lon: 35.65819583068844
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '4003a356-8767-4150-94ea-5597edbaaa0e',
      parent_uuid: '0d81a7f5-e162-433f-a92a-d0afd6388b48',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '35709',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eLassen Sie sich im Hotel Slipway in Dar es Salaam so richtig verwöhnen. Ihre Unterkunft verfügt über einen eigenen Strandabschnitt und Zugang zu einem Außenpool. WLAN nutzen Sie in allen Bereichen. Das Spa bietet Ihnen eine Sauna, diverse Wellnessanwendungen sowie Fitnesskurse, auf Wunsch mit Personal Trainer. Ihr Zimmer ist klimatisiert und verfügt über einen separaten Sitzbereich mit Flachbild-Sat-TV sowie einen Balkon mit Meer- oder Stadtblick. Nutzen Sie die Grillmöglichkeiten im Garten oder besuchen Sie das Restaurant und die Snackbar des Hauses. Zahlreiche Freizeitmöglichkeiten wie Angeln, Schnorcheln, Wandern und Radfahren sind in unmittelbarer Nähe möglich. Ein Golfplatz liegt drei Kilometer entfernt.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eHotel Slipway is ideally located just 7km from the Dar es Salaam city centre on the posh Msasani peninsula, right on the Indian Ocean overlooking Msasani Bay. It offers best value for money accommodation in this upmarket neighbourhood.\u003c/p\u003e\u003cp\u003eThe hotel is integrated into the Slipway complex, which provides a wide range of amenities including various dining options and everything a traveler needs. Within its vicinity are a selection of popular shopping, dining and nightlife destinations.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Hotel Slipway',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Hotel Slipway',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.752607538758969,
              lon: 39.27277323428516
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/bfc19e94-3e32-4f22-8370-54b22a8bcfc9',
              'kiwi://Elephant/Item/154b2b99-fdde-4489-8f11-16b90c18ae0e',
              'kiwi://Elephant/Item/36fbd98f-0656-4013-891c-cd012be11632',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '52493d21-c077-42df-9ae3-8182eb7c8bc1',
      parent_uuid: '95c498ff-9f24-4aec-aad4-f72e3e8f801d',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '163709',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Ikoma\r\nTanzania\r\n',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eIm Ikoma Wild Camp wohnen Sie in mitten in der faszinierenden Landschaft der ostafrikanischen Savanne. Das Besucherzentrum des Serengeti Nationalparks ist nur sieben Kilometer entfernt. Auch die Game Reserves Grumeti und Ikorongo liegen in der Nähe. Das Camp bietet Wohnmöglichkeiten in festen Cottages oder großen Zelten, die komfortabel eingerichtet sind und über zweckmäßig eingerichtete Duschbäder verfügen. Die bequemen Betten sind mit großen Moskitonetzen geschützt. Alle Unterkünfte haben einen terrassenähnlichen Außenbereich mit Sitzgelegenheiten. Es gibt einen Swimmingpool und ein Restaurant. Das Ikoma Wild Camp bietet zudem ein großes Aktivitäten- und Ausflugsprogramm.\u003cbr\u003e \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eBased between Grumeti Nature Reserve and the Ikorongo Game reserve, northwest of the Serengeti, Ikoma Wildcamps offers a view of the surrounding Savannah that is occupied by wildlife. The camp is comprised of spacious tents, and huts that are well furnished and include a bathroom. Amenities include Wi-Fi, a swimming pool, a restaurant and a bar. The accommodation also provides sundowner cocktails, a bush breakfast, and a barbecue lunch and dinner. Activities include a tour of a coffee farm, cultural tours, game drives, and nature walks.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Ikoma Wild Camps',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Ikoma Wild Camps',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -2.144957580329683,
              lon: 34.62990131964341
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c6e935c7-2b54-406f-9b61-7df0f52cfe00',
              'kiwi://Elephant/Item/a77261d2-787b-4631-88f0-af4138cdbb55',
              'kiwi://Elephant/Item/3d8a293f-220b-435e-95ef-f635d3f7a26c',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '1a0ebada-bbed-4721-a2fb-005794201f17',
      parent_uuid: 'cda0c8c3-0563-4a02-a32a-3a0659cf3ed5',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '67157',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'P O Box 133, Lushoto,\r\nLushoto, Tanzania.',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eHoch erhoben mit einem weiten Panoramablick auf die Maasai Steppe, umgeben von idyllischen Baumgärten, liegt die Irente View Cliff Lodge und bietet Komfort sowie einen persönlichen Service. Die geringe Anzahl an Zimmern garantiert Ihnen viel Privatsphäre und ein familiäres Umfeld. Die gemütlichen Standardzimmer verfügen über ein privates Badezimmer und die Suiten zusätzlich über eigene Balkone mit Sitzgelegenheiten und Ausblick. Ein Restaurant und eine Bar stehen für Mahlzeiten zur Verfügung, während die Gärten ideal zum Ausspannen sind. Das Hotel organisiert Wanderausflüge oder Besuche im tropischen Regenwald. Weiter ist die belebte Stadt Lushoto nur 15 Autominuten entfernt.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eIrente  View Cliff Lodge is situated right at the famous  “Irente view point” of which many tourist and  different people from  different countries come to view the panoramic view of Maasai Steppe. The Lodge is approximately 15 minutes drive, or 1 hour walking distance from Lushoto town, which is only 6 kilometres. \u003c/p\u003e\u003cp\u003eAccommodation consists of 2 Suites, each with mini-bar and superior private balcony facing the rock scenery. The other 23 rooms include superior and standard  rooms with single and double beds. Designed with comfort and tranquility in mind, all rooms offer a private balcony with panoramic views in every direction. Each room is tastefully decorated with modern bathrooms and fitted with satellite TVs.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Irente View Cliff Lodge ',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Irente View Cliff Lodge ',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -4.801960826592037,
              lon: 38.25795109087676
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/7afa25de-3cbe-4c4f-9b70-314c9de5a86c',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'de8d8996-33bc-4430-8292-7270024f9627',
      parent_uuid: '95c498ff-9f24-4aec-aad4-f72e3e8f801d',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '35719',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Seronera - Central Serengeti\r\nTanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              "\u003cp\u003eLe Kati Kati Tented Camp est un camp saisonnier qui s'installe sur les plaines du Serengeti entre les mois de décembre et de mars, constituant un lieu idéal pour observer la grande migration des gnous et des zèbres. Il se compose de spacieuses tentes équipées d'un lit king size ou de lits jumeaux, d'une salle de bains privative et d'une terrasse offrant une belle vue sur les alentours. Notez enfin que, pour que l'impact du camp sur l'environnement soit minimal, il est alimenté grâce à l'énergie solaire. \u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eWie echt dicht bij de wilde dieren in de befaamde Serengeti wil zijn, vindt in dit mobiele tentenkamp de ideale accommodatie. U verblijft in een tweepersoonstent met goede bedden, een eigen wastafel, wc en een ‘bucket shower’, net als de eerste ontdekkingsreizigers. ’s Avonds dineert u in de gemeenschappelijke tent of ontmoet u andere gasten bij het kampvuur. ’s Nachts blijft u in uw ruime tent omdat de buffels en hyena’s dan meester zijn van de omgeving. Behalve een safari in een 4WD kunt u een ballonvaart maken, een Massai-dorp bezoeken of de archeologische vondsten in de Olduvai kloof bekijken.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eDas einzigartige Serengeti Kati Kati Camp liegt inmitten der berühmten Serengeti und besteht aus zehn authentischen Zelten, die jeweils mit einem En-Suite-Badezimmer ausgestattet sind. In den Zelten gibt es außerdem entweder zwei gemütliche Einzelbetten oder ein großes, komfortables Kingsize-Bett. Selbstverständlich haben Sie auch Licht in Ihrem Zelt, dieses wird solarbetrieben. Zu dem Camp gehört außerdem ein großes Aufenthalts- sowie ein Wirtszelt, in dem Sie auch Ihre Mahlzeiten zu sich nehmen können. Jeden Abend gibt es ein gemütliches Lagerfeuer, das für eine schöne Stimmung und das richtige Safari-Feeling sorgt.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eGuided nature tours, game drives in the local Tarangire National Park, and unspoiled land - these are only three of the features that will define your all-inclusive experience at the Lake Burunge Tented Camp. With private verandas, all 30 rooms have an exclusive view of Lake Burungi, which hosts a variety of local wildlife from seas of flamingos to herds of zebras. High-thatched ceilings, draped curtains, and an eco-friendly design will help you feel right at home when basking in Tanzania’s extensive wildlife.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Kati Kati Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'Kati Kati Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Kati Kati Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Kati Kati Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -2.4810776985492016,
              lon: 34.75797558466597
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c6e935c7-2b54-406f-9b61-7df0f52cfe00',
              'kiwi://Elephant/Item/a77261d2-787b-4631-88f0-af4138cdbb55',
              'kiwi://Elephant/Item/3d8a293f-220b-435e-95ef-f635d3f7a26c',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'dca4db5c-63d9-41a0-b23c-64fe761e36a6',
      parent_uuid: 'd3f27b9b-36fd-42c9-8ce1-4cda28bddef4',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '22408',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eKudu Lodge \u0026amp; Camp are set in 11 acres of farmland approximately 2Kms from the main road through Karatu and leading to the famous National Parks of Northern Tanzania, among them The Serengeti, Lake Manyara, and The Ngorongoro Crater. The Lodge and Campsite are strategically situated for visiting these wonderlands, and for experiencing the safari adventure of a lifetime. Rich in big game, a multitude of birds species and other beautiful wildlife, these Parks are an absolute must.\u003c/p\u003e',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          },
          {
            content:
              '\u003cp\u003eKudu Lodge \u0026amp; Camp are set in 11 acres of farmland approximately 2Kms from the main road through Karatu and leading to the famous National Parks of Northern Tanzania, among them The Serengeti, Lake Manyara, and The Ngorongoro Crater. The Lodge and Campsite are strategically situated for visiting these wonderlands, and for experiencing the safari adventure of a lifetime. Rich in big game, a multitude of birds species and other beautiful wildlife, these Parks are an absolute must.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content:
              '\u003cp\u003eDie Kudu Lodge – benannt nach der Kudu-Antilope – ist die perfekte Unterkunft, um den Tarangire Nationalpark und das Ngorongoro Schutzgebiet zu erkunden. Die aus Bungalows und Suiten bestehende Lodge ist auch selbst ein echtes Highlight: Sie wohnen in liebevoll und authentisch gestalteten Unterkünften, von denen die meisten in einem traditionellen Rondavel-Stil errichtet wurden. Alle Bungalows sind klimatisiert und verfügen über kostenfreies WLAN. Genießen Sie die gepflegte Gartenlandschaft: Entspannen Sie am Pool, baden Sie in der Sonne und lassen Sie sich die wohltuenden Anwendungen im Spa gefallen. Das Restaurant verwöhnt Sie mit einer Crossover-Küche aus international-europäischen und afrikanischen Speisen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          }
        ],
        name: [
          {
            content: 'Kibo Hut',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content: 'Kudu Lodge',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          },
          {
            content: 'Kudu Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.0816112356163385,
              lon: 37.389044970284075
            },
            source: 'item_curator',
            source_key: 'item_curator'
          },
          {
            content: {
              lat: -3.0816112356163385,
              lon: 37.389044970284075
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/71c5df2f-b137-4481-b8c3-017c4fee6b22',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '8097e727-6b1c-4956-b78a-b57e1a980b7e',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '59995',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Karatu, Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              "\u003cp\u003eSitué sur les hauteurs de la vallée du grand Rift et sur le lac Manyara, cet établissement offre à ses clients de vastes tentes à la décoration d'inspiration africaine et disposant d'une salle de bains privative et d'une terrasse en bois avec toit en palmes de cocotier. Il comprend également un bar très agréable, duquel on peut observer la vallée du Rift dans des conditions idéales, et une salle à manger. Enfin, des treks et des randonnées avec un guide Masaï sont organisées et permettent de découvrir la faune et la flore locale.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eLaat u overweldigen door het adembenemend uitzicht over Lake Manyara vanuit uw comfortabel ingerichte tent met eigen balkon. Geniet van het panoramische uitzicht op de vallei vanaf het terras bij het restaurant, want de natuur presenteert zich hier op haar best. U kunt uw avonden bij het vuur doorbrengen, heerlijk eten in het restaurant of een drankje nemen in de bar. Overdag lokt het zonnedek, kunt u met een Massai-gids een botanische wandeling maken of er op de mountainbike op uit trekken. U beschikt over elektriciteit in uw tent , en over een badkamer met warm en koud stromend water.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eDie Kirurumu Manyara Lodge liegt hoch oben am Rande des Great Rift Valleys. Von hier aus haben Sie einen fantastischen Blick auf den See Manyara, auf den Grund des Risses und auf den Berg Losimingori. Auf der anderen Seite der Lodge erheben sich die grünen Ngorongoro Highlands, die dort das Tor zum Ngorongoro-Krater bilden. Die Lodge liegt 40 Minuten vom Tarangire Nationalpark und nur 20 Minuten vom Lake Manyara Nationalpark entfernt. Im Camp haben die Wahl zwischen Zeltunterkunft, Suite und Familienhütte. Alle Unterkünfte haben ein voll ausgestattetes Badezimmer. Zum Hotel gehört eine Bar mit Sonnendeck und Panoramaaussicht sowie ein Restaurant.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003e27 palatial rooms sit atop the edge of the Great Rift Valley, one of the great wonders of the natural world. Jaw-dropping views of Lake Manyara - coupled with meandering paths - make you feel totally immersed in the Tanzanian wilderness. Like its epic setting, rooms at the Kirurumu Manyara Lodge are large but not overbearing, with stone showers and a wooden decor that match the expansive tropics surrounding the lodge.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Kirurumu Manyara Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'Kirurumu Manyara Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Kirurumu Manyara Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Kirurumu Manyara Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3606279890284445,
              lon: 35.83315610185241
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'a9510922-694b-4c9f-8aac-0424696588f7',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '28051',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Karatu Arusha,Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eDie Kudu Lodge – benannt nach der Kudu-Antilope – ist die perfekte Unterkunft, um den Tarangire Nationalpark und das Ngorongoro Schutzgebiet zu erkunden. Die aus Bungalows und Suiten bestehende Lodge ist auch selbst ein echtes Highlight: Sie wohnen in liebevoll und authentisch gestalteten Unterkünften, von denen die meisten in einem traditionellen Rondavel-Stil errichtet wurden. Alle Bungalows sind klimatisiert und verfügen über kostenfreies WLAN. Genießen Sie die gepflegte Gartenlandschaft: Entspannen Sie am Pool, baden Sie in der Sonne und lassen Sie sich die wohltuenden Anwendungen im Spa gefallen. Das Restaurant verwöhnt Sie mit einer Crossover-Küche aus international-europäischen und afrikanischen Speisen.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eKudu Lodge \u0026amp; Camp are set in 11 acres of farmland approximately 2Kms from the main road through Karatu and leading to the famous National Parks of Northern Tanzania, among them The Serengeti, Lake Manyara, and The Ngorongoro Crater. The Lodge and Campsite are strategically situated for visiting these wonderlands, and for experiencing the safari adventure of a lifetime. Rich in big game, a multitude of birds species and other beautiful wildlife, these Parks are an absolute must.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Kudu Lodge Karatu',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content: 'Kudu Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3454353109126145,
              lon: 35.667248368263245
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50',
              'kiwi://Elephant/Item/95028c3b-34df-431a-937a-2bb91ba3927d',
              'kiwi://Elephant/Item/5dcdf2c4-c4aa-436e-a73d-2342fd0be410'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '7c9f397b-ba8c-4cf2-a5fd-31ca15d7910e',
      parent_uuid: '1df0b6cc-c336-44da-b26b-ba3ed418ab77',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '25657',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Burunge \r\nTarangire - Tanzania',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eBeleef Afrika in een stijlvolle tent met en suite-badkamer. Elke tent staat op een houten platform en heeft een balkon of terras met geweldig uitzicht op Lake Burunge. Vanuit de infinity pool en vanuit het restaurant heeft u een spectaculair uitzicht op Tarangire National Park. Uw lodge beschikt 24 uur per dag over zonne-energie, er zijn muskietennetten en een ventilator. U kunt roomservice gebruiken of een picknick op een prachtige plek laten verzorgen. Geniet met uw familie van een avontuur in het kleinschalige, vriendelijke Lake Burunge Tented Camp.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eAbenteuerurlaub machen Sie im Lake Burunge Tented Camp. Hier am Ufer des Sees Burunge beobachten Sie von der Terrasse des Hotelrestaurants aus, wie die Tiere aus der Umgebung kommen, um am See zu trinken. Das Camp liegt an einem natürlichen Korridor zwischen Manyara und Tarangire, durch den während der großen Tierwanderung im Mai zweieinhalb Millionen Gnus, Antilopen und Zebras ziehen. Zum Eingang des Sangaiwe-Parks sind es von hier nur zehn Minuten. Jeder Raum verfügt über eine private Terrasse, von der aus Sie den wunderschönen afrikanischen Sonnenuntergang beobachten. Zum Hotel gehört ein Swimmingpool. Auf dem gesamten Gelände gibt es WLAN.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eGuided nature tours, game drives in the local Tarangire National Park, and unspoiled land - these are only three of the features that will define your all-inclusive experience at the Lake Burunge Tented Camp. With private verandas, all 30 rooms have an exclusive view of Lake Burungi, which hosts a variety of local wildlife from seas of flamingos to herds of zebras. High-thatched ceilings, draped curtains, and an eco-friendly design will help you feel right at home when basking in Tanzania’s extensive wildlife.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Lake Burunge Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Lake Burunge Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Lake Burunge Tented Camp',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content: 'Lake Burunge Tented Camp',
            source: 'wetu',
            source_key: null,
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.887379156751416,
              lon: 35.85590879755102
            },
            source: 'wetu',
            source_key: 'gecko'
          },
          {
            content: {
              lat: -3.887379156751416,
              lon: 35.85590879755102
            },
            source: 'wetu',
            source_key: null
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/9edfb82a-fd7d-413e-aa2a-9f5feb8eb75e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'd3dba212-72fc-481d-992f-af768d3e3f3a',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '13701',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eStanding high on the bluff of a dramatic ochre and terracotta streaked cliff above the flamingo-frosted expanse of Lake Manyara’s gleaming alkaline waters, the Lodge commands panoramic views across the volcano-studded floor of the Great Rift Valley.  Designed to reflect the brilliance of Lake Manyara’s unique birdlife, the Lodge draws on an inspirational architectural motif that melds swooping avian curves with the gentle concentric patterns of traditional Maasai ‘Bomas’ (encampments) whilst the vibrantly coloured frescoes lining the walls are designed to depict the colourful intricacy of bird migratory patterns.  The ambiance of the Lodge is a fusion of lakeside tranquility, towering volcanic splendour and adventure-packed sporting activity.\u003c/p\u003e\u003cp\u003eAs to wildlife, the park offers abundant sightings of; monkey, jackal, mongoose, hyena, hyrax, zebra, hippo, warthog, buffalo, Masai giraffe, duiker, waterbuck and impala. Significant numbers of elephant are also resident in the Park whilst sightings of black rhino and leopard are not uncommon. Manyara is also especially noted for its wealth of bird life, being visited by many thousands of sugar-pink Lesser Flamingos, significant numbers of Greater Flamingos and a host of other woodland, plains and water birds\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Lake Manyara Serena Safari Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.37225,
              lon: 35.82677
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '277680f8-2906-43eb-bbdf-59186b07b5ff',
      parent_uuid: 'd3f27b9b-36fd-42c9-8ce1-4cda28bddef4',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '27161',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eOnly a stone’s throw away from Arusha National Park at an altitude of almost 1400m, the cosy bungalows at Meru View Lodge serve not only as an ideal starting point for mountain tours taking place on Mt. Meru (4566 m) or for it’s neighbouring “big brother” the majestic, snow-capped Kilimanjaro, but also for safaris departing to the world-famous Ngorongoro Crater, the Serengeti and the Tarangire and Lake Manyara National Parks.\u003c/p\u003e\u003cp\u003eFor an even longer stay the Lodge offers ideal day trips and short excursion possibilities.The Arusha National Park, right on the doorstep, provides an abundant variety of wild animals and is a hiker‘s paradise. Trips to nearby villages, farms and markets give an excellent insight into the life of the Wameru tribe and visits to a coffee farm or walking safaris with the Maasai living below on the steppe are a few of the many options available to guests staying at the Lodge.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content:
              '\u003cp\u003eDie Meru View Lodge ist eine idyllische Oase inmitten eines 10 Hektar großen Komplexes, weit weg von der Hektik des Alltags. Freuen Sie sich über eine ideale Lage im Herzen von Attraktionen wie dem nahe gelegenen Nationalpark Arusha, dem Berg Meru und dem majestätischen Kilimanjaro. Die geräumigen Zimmer sind in individuellen Hütten untergebracht und bieten kostenloses WLAN und private Badezimmer. Einige verfügen über eine Terrasse. Das gemütliche hauseigene Restaurant bietet drei Mahlzeiten täglich und zwischendurch kleine Snacks. Zu den weiteren Annehmlichkeiten zählt ein großer Außenpool. Gerne organisiert das Hotel spannende Tagesausflüge, sei dies eine Safaris oder eine geführte Wanderung.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eThis campsite is set in a forest along the Marangu Route. Mandara Huts can accommodate up to 60 campers at a time. The campsite relies on solar lighting and features a dining hall and ablution facilities.\u003c/p\u003e',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Meru View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          },
          {
            content: 'Meru View Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Mandara Huts',
            source: 'item_curator',
            source_key: 'item_curator',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.319553,
              lon: 36.879344
            },
            source: 'wetu',
            source_key: 'gecko'
          },
          {
            content: {
              lat: -3.181620546287733,
              lon: 37.51358824968335
            },
            source: 'item_curator',
            source_key: 'item_curator'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/71c5df2f-b137-4481-b8c3-017c4fee6b22',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'dd55d0dc-b48d-4f2e-b77f-a0c563bc27d7',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '161048',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eMarera Valley Lodge is located between Karatu Town and Rohia Village and to the main road to Ngorongoro and Serengeti. There are 18 lodges with private decks that provide guests with beautiful views of the surrounding areas. The lodge provides free Wi-Fi access to all guests. There is also an outdoor swimming pool, in the lounge area, bar or dining room. As the lodge is situated near the main road to Ngorongoro and Serengeti, visitors can easily explore the area.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Marera Valley Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3230972,
              lon: 35.710862399999996
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '497e8044-685c-4974-a3f5-7501934960cb',
      parent_uuid: 'd092a858-0046-4fb5-9fa9-b8817a72cc0c',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '41054',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'P.O.Box 4053, 397*400, Gizenga Street, Shanghani, Stone Town, Zanzibar',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              '\u003cp\u003eStone Town ist Teil des UNESCO-Weltkulturerbes. Die schöne Stadt ist gespickt mit wunderschönen, historischen Sehenswürdigkeiten. Inmitten dieser historischen Wunderwelt liegt das Maru Maru Hotel. Rund um das Hotel finden Sie bunte Märkte und kleine Geschäfte mit allerlei Kuriositäten. In dem Hotel gibt es 44 Zimmer, von Zweibettzimmern über Doppelzimmer bis hin zu Familienzimmer, die allesamt klimatisiert und mit einem Safe, einem Fernseher und kostenfreiem WLAN ausgestattet sind. Außerdem gibt es in den Zimmern gefiltertes Wasser, eine Tee- und Kaffeestation sowie eine Minibar. Zu dem Hotel gehört außerdem ein vorzügliches Restaurant, in dem für Ihr leibliches Wohl gesorgt wird sowie eine fantastische Dachterrasse, auf der Sie bei großartigem Ausblick einen Sundowner genießen können.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eSet in the heart of the UNESCO world heritage site of StoneTown, Maru Maru is just a few steps from the city’s historical wonders, colourful markets and labyrinth of shops. Once a town house famous for its marble floors and tiles, it has now been lovingly restored to offer 44 bright rooms blending classic Zanzibar style with iconic design and modern luxuries. Its roof terrace offers one of the best views in the city with a 360° panorama and is the perfect place to enjoy a cocktail as the sun melts into the Indian Ocean. The relaxed ambiance at Maru Maru continues long into the night as people come to enjoy the authentic north and south Indian fusion cuisine, view art in Maru Maru’s gallery and enjoy the captivating sound of Tahareb music as it floats into the night.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Maru Maru Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Maru Maru Hotel',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.161696909567445,
              lon: 39.18964326381679
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/86968d9b-5a0c-46ed-97db-45d044e19bdf',
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '3e851caa-3d8c-4e32-b249-acde5ea4512b',
      parent_uuid: '5e71377e-23f6-4ac8-b85a-c3bdb2392e57',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '37864',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eLocated just three hours from Dar es Salaam  Mbuyuni Farm Retreat offers a relaxing country experience.\u003c/p\u003e\u003cp\u003eThe three bungalows, each for a family of up to four, are located in a quiet and peaceful setting and are surrounded by beautiful gardens. Two bungalows have kitchens for guests who prefer to cater for themselves. \u003c/p\u003e\u003cp\u003eYou are welcome to stroll around the farm and watch the activities or explore the farm’s forested areas which include many bird species. Birdwatchers have identified over 150 species so far! Bird List Kimango Farms.\u003c/p\u003e\u003cp\u003eThe magnificent  Uluguru Mountains fill the horizon and are great for hiking.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Mbuyuni Farm Retreat',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.746463737083671,
              lon: 37.75466465380457
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/8ef4cfa4-9529-4614-864d-0e42af648c0e',
              'kiwi://Elephant/Item/36fbd98f-0656-4013-891c-cd012be11632',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '0ec9c3f8-c9a1-417b-886b-1204d2c71a45',
      parent_uuid: 'ffd327c5-85db-4ccb-9db7-08ade3b09a51',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '25855',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eFreuen Sie sich auf das Michamvi Sunset Bay Resort in unmittelbarer Strandlage. Der Außenpool sowie der Spa-Bereich mit Massage- und Kosmetikanwendungen versprechen unbeschwerte Urlaubstage. Entspannen Sie auf der Sonnenterrasse oder lesen Sie ein gutes Buch in der Bibliothek. WLAN in allen Bereichen und Parkplätze nutzen Sie kostenfrei. Ihr Zimmer verfügt über ein Bad mit Dusche oder Badewanne, Klimaanlage sowie einen eigenen Balkon mit Meerblick und einen separaten Sitzbereich. Zu den gastronomischen Einrichtungen zählen ein Restaurant, eine Bar sowie eine Snackbar. Auf besondere Ernährungsbedürfnisse wird Rücksicht genommen. Zahlreiche Freizeitmöglichkeiten, wie Kanusport oder Schnorcheln, stehen Ihnen in unmittelbarer Nähe zur Verfügung.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eMichamvi Sunset Bay is located on the South East Coast of Zanzibar on the west side of the majestic Chwaka Bay. Positioned on one of Zanzibars most beautiful sandy white beaches.Michamvi has all the attributes for a stunning tropical beach holiday. The 20 room resort is crescent shaped and each room has a genuine ocean view with no room more than 70 metres from the beach or 20 metres from the swimming pool.\u003c/p\u003e\u003cp\u003eMichamvi Sunset Bay has recently been upgraded and has 20 luxurious junior suites all boasting air-conditioners, ceiling fans, mosquito nets, wall safe, tea and coffee making facilities, hair dryer, desk, sofa with comfortable chairs, coffee table and seperate dressing area.The rooms have newly installed luxury wasg rooms, 16 equipped with walk in double showers and double basins and 4 with baths, single showers and single basin. Each room has either its own private garden or balcony for guests to enjoy.\u003c/p\u003e\u003cp\u003eThe bar is positioned right on the beach and has comfortable lounge chairs and stools perfect for watching the sun go down. The bar serves a variety of delicious cocktails. Guests can choose to sit in the restaurant to enjoy freshly prepared meals or can sit in the new Al Fresco lunch eating area watching the waves lap up onto the beach.\u003c/p\u003e\u003cp\u003eActivities include: Canoeing, Windsurfing, Snorkelling, Beginners snorkelling lesson, Reef walking, Free internet access, TV in the bar, Swimming pool, Bottled water ( Self service fridge ) and Afternoon tea/coffee.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Michamvi Sunset Bay',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Michamvi Sunset Bay',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -6.139834740621194,
              lon: 39.491107463836705
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/09a6e145-50ae-4c30-b701-3a3eefc9fc10',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: 'f991daf1-5dbe-4c12-83d3-c442d2ad2da5',
      parent_uuid: '6e5eb296-853d-42a8-ba90-8a0f295ca470',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '124458',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eDas More Than A Drop Hospitality bietet ein besonderes Konzept und verbindet Bed \u0026amp; Breakfast mit einer lokalen Hotelschule. Neben dem sozialen Aspekt haben Sie hier die Chance die Kultur der Einheimischen kennen zu lernen. Weiter ist es der perfekte Ausgangsort für Aktivitäten rund um den atemberaubenden Kilimandscharo. Übernachten Sie in einem der gemütlichen Zimmer, welche alle über Moskitonetze verfügen. Das vegetarische À-la-carte-Restaurant serviert köstliche europäische und regionale Gerichte. Das Frühstück aus frischen Produkten ist in Ihrem Buchungsangebot inbegriffen. Die Umgebung hat viel zu bieten und viele Orte können Sie bei einem Tagesausflug besichtigen. Gerne organisiert das Hotel Ihre Touren.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eThe B\u0026amp;B offers five beautiful rooms and the delicious breakfast with fresh products is included. Depending on the room-size the rate per night is between US$23 and US$23 per person. Surrounded by a beautiful garden, the B\u0026amp;B offers 5 different rooms and a Crash-Couch to fit your requirements.  The rooms are bright, nicely decorated with comfortable mattresses, soft linen and mosquito nets – and very clean.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'More Than A Drop Hospitality',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'More Than A Drop Hospitality',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3319747316756025,
              lon: 37.34528660774231
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/71c5df2f-b137-4481-b8c3-017c4fee6b22',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '5061fdea-1b67-413e-aed8-6515b3ec538e',
      parent_uuid: '865edcfe-36ea-45bc-a713-8b1bac5bff4f',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '84930',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [],
        description: [
          {
            content:
              '\u003cp\u003eIhr Zuhause am Arusha National Park in Tansania: Südlich des Parks liegt die Ndoro Lodge nur wenige Kilometer von Arusha entfernt. Zur Lodge gehören mehrere gemütliche und im traditionell afrikanischen Stil gehaltene Cottages und Bungalows sowie ein Zeltplatz. Die Zimmer sind einfach aber wohnlich gehalten. Kostenfreies WLAN steht Ihnen in den gemeinschaftlichen Gebäuden zur Verfügung. Die Unterkünfte sind von einem wild-romantischen Garten umgeben, in dem Sie hautnah die einheimische Flora erleben. Entspannen können Sie in einer Lounge oder in der Bar, wo Ihnen Erfrischungsgetränke gereicht werden. Restaurants und Shopping-Möglichkeiten finden Sie in Arusha, das Sie nach einer kurzer Autofahrt erreichen. \u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eNdoro Lodge is only 400 metres from Moshi-Arusha highway. The lodge is a popular start for Kilimanjaro Mountain Climbing expeditions, Mount Meru climbing and Arusha National Park walking safaris. It is also a popular start for Ngorongoro, Manyara, Serengeti and to all Tanzania National Parks including all Game Reserves. Ndoro lodge has enough facilities for all classes of international tourists. Ndoro lodge and Taxidermy is only 15 kilometers from Arusha town and 25 Kilometers from Kilimanjaro International Airport (KIA). The suites at Ndoro Lodge are crafted in local style and roofed with makuti (palm fronds), they also feature a sophisticated blend of intimacy and romance, offering privacy and exclusivity in cool, leafy surrounds. All rooms are spacious and tastefully furnished. Each suite features a generous twin or single bed above the floor and large windows to invite the lush outside environment. The classically elegant bedrooms are fitted with contemporary furnishing in neutral colors and texture.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Ndoro Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Ndoro Lodge',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3746625920909334,
              lon: 36.82747277790986
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    },
    {
      item_type: 'accommodation',
      id: '866defcb-e49b-4cda-a001-c4e0c92138a1',
      parent_uuid: '0965ce26-94b6-43ca-9792-d2e5e260953a',
      fields: {
        primary_item_uuid: null,
        external_id: [
          {
            content: '15348',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        supplier_tag: [],
        address: [
          {
            content: 'Karatu - Tanzania\r\n',
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        description: [
          {
            content:
              "\u003cp\u003eCet établissement se situe dans une ancienne ferme coloniale, sur les hautes terres de Taratu, et est entouré de plantations de café. Il se compose de petits bâtiments, comprenant une ou deux chambres, et est entouré de superbes jardins. Les chambres sont équipées de grands lits à baldaquin, d'une spacieuse salle de bains, d'un coin bureau, d'un petit salon avec cheminée et d'une terrasse. Quant aux parties communes, elles comprennent un confortable salon, un restaurant doté d'une agréable terrasse et une belle piscine nichée au cœur de la végétation.\u003c/p\u003e",
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content:
              '\u003cp\u003eRond een traditionele koffieboerderij met een lounge, een restaurant, een souvenirwinkeltje en een ruim terras liggen comfortabele huisjes voor maximaal vier personen. U beschikt over een veranda, een royale zithoek met open haard, en een luxe en suite-badkamer. Na een vermoeiende dag kunt u relaxen in het zwembad of een massage nemen. Wandel door de tuinen met spectaculair uitzicht op de Oldeani vulkaan, of geniet van een maaltijd met verse ingrediënten uit de moestuin. Soms is er een Afrikaanse dinnershow met dans. Een excursie naar de Hadzabe-stam of Datoga-stam bij het Eyasi meer maken uw unieke ervaring compleet.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content:
              '\u003cp\u003eNur wenige Kilometer vom Eingang zum Ngorongoro-Nationalpark entfernt entführt Sie das Ngorongoro Farmhouse in das Ambiente der Kolonialzeit. Umgeben von Gärten und Kaffeeplantagen genießen Sie einen ruhigen Aufenthalt inmitten der Natur. Neben einem Hauptgebäude mit Restaurant, Aufenthaltsraum und Aussichtsterrasse besteht die Anlage aus geräumigen Bungalows, in denen bis zu fünf Personen Platz finden können. Die Annehmlichkeiten umfassen ein Doppelbett oder zwei Einzelbetten mit Moskitonetz sowie ein Badezimmer mit Dusche und eine Veranda, die Ihnen einen atemberaubenden Blick in die weite Landschaft verspricht. Zur Erfrischung steht ein Swimmingpool mit Liegestühlen für Sie bereit.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content:
              '\u003cp\u003eWith dazzling views of the Oldeani Volcano, the Ngorongoro Farm House is built next to a 500-acre coffee plantation, a design which evokes a rustic, colonial feel that has enamoured guests time and again. The fragrant smell of coffee radiates across the ground’s winding paths and high-thatched verandas, both of which match the nostalgic feel of the ground’s 52 chalet-type rooms, which come with full amenities. The Farm House is a perfect fit for any visitor on a safari on the north circuit of Tanzania.\u003c/p\u003e',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        name: [
          {
            content: 'Ngorongoro Farm House',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'fr-FR'
          },
          {
            content: 'Ngorongoro Farm House',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'nl-NL'
          },
          {
            content: 'Ngorongoro Farm House',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'de-DE'
          },
          {
            content: 'Ngorongoro Farm House',
            source: 'wetu',
            source_key: 'gecko',
            locale: 'en-GB'
          }
        ],
        geolocation: [
          {
            content: {
              lat: -3.3391465032545775,
              lon: 35.5950840786312
            },
            source: 'wetu',
            source_key: 'gecko'
          }
        ],
        dmc_id: [],
        ancestors: [
          {
            content: [
              'kiwi://Elephant/Item/c1eb4554-2e27-4b9b-952a-69eebf73ec5e',
              'kiwi://Elephant/Item/7b624ba2-5e0f-47d2-854c-3e561cc9d7d5',
              'kiwi://Elephant/Item/0a48dec9-d60e-41d8-b2c7-4cb2b04dbb50'
            ],
            source: 'osm',
            source_key: null
          }
        ]
      }
    }
  ]
}

const mockAttachments = {
  data: [
    {
      uuid: '045569bb-bb86-4ffb-b951-666907e6112e',
      filename: 'ng6.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/AoPKVi1_55JnylDryLSPog/ng6.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/AoPKVi1_55JnylDryLSPog/ng6.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 0,
        width: 695,
        height: 457,
        visible: true
      },
      created_at: '2019-10-21T09:01:15Z',
      updated_at: '2019-11-06T13:09:54Z'
    },
    {
      uuid: '8acff8b9-23b3-4e59-b3ca-8d0e299b4a2f',
      filename: 'ng1.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/gAvx6nYimSCO9JZ_xcDz-w/ng1.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/gAvx6nYimSCO9JZ_xcDz-w/ng1.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 1,
        width: 696,
        height: 463,
        visible: true
      },
      created_at: '2019-10-21T09:01:16Z',
      updated_at: '2019-11-06T13:09:54Z'
    },
    {
      uuid: 'ff59dc67-d486-4f34-8fee-c3dba509ceae',
      filename: 'ng3.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/FqZV0DDWiG4bucYzBOHlPw/ng3.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/FqZV0DDWiG4bucYzBOHlPw/ng3.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 2,
        width: 816,
        height: 465,
        visible: true
      },
      created_at: '2019-10-21T09:01:16Z',
      updated_at: '2019-11-06T13:09:54Z'
    },
    {
      uuid: '0eeeab92-68f8-42d5-a062-460d547a21e8',
      filename: 'ng4.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/nt6QfxJEX-EYxvkh1ma7Jw/ng4.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/nt6QfxJEX-EYxvkh1ma7Jw/ng4.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 3,
        width: 690,
        height: 451,
        visible: true
      },
      created_at: '2019-10-21T09:01:16Z',
      updated_at: '2019-11-06T13:09:54Z'
    },
    {
      uuid: 'f50da339-2214-4fe4-a55c-3c8f2fa3807a',
      filename: 'ng5.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/sadog4555yc3HDdU7D9RSg/ng5.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/sadog4555yc3HDdU7D9RSg/ng5.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 4,
        width: 694,
        height: 456,
        visible: true
      },
      created_at: '2019-10-21T09:01:16Z',
      updated_at: '2019-11-06T13:09:54Z'
    },
    {
      uuid: 'bc838913-e416-4904-ade1-9b5fe6883d27',
      filename: 'ng2.png',
      url:
        'https://elephant-images-staging.s3.eu-west-1.amazonaws.com/items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/q8exrh4EdpPJYsmeI9DbkA/ng2.png',
      mime_type: 'image/png',
      s3_key: 'items/95760e7d-dcc9-4740-af16-0a7276311513/image/png/q8exrh4EdpPJYsmeI9DbkA/ng2.png',
      locale: null,
      source: 'wetu',
      source_key: 'gecko',
      tags: {
        order: 5,
        width: 697,
        height: 464,
        visible: true
      },
      created_at: '2019-10-21T09:01:16Z',
      updated_at: '2019-11-06T13:09:54Z'
    }
  ],
  meta: {
    count: 6,
    total_count: 6
  }
}

const mockItemFields = {
  data: {
    uuid: 'b1cfa3d6-c995-4296-a27c-f8544f158f38',
    parent_uuid: null,
    item_type: 'admin_area',
    fields: [
      {
        field_name: 'admin_level',
        content_type: 'integer',
        content: 4,
        locale: null,
        source: 'osm',
        source_key: null,
        dimensions: {}
      },
      {
        field_name: 'name',
        content_type: 'string',
        content: 'Zanzibar North',
        locale: 'en-GB',
        source: 'osm',
        source_key: null,
        dimensions: {}
      }
    ],
    primary_item_uuid: null
  }
}

const mockPolygon = {
  data: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [151.725594, -32.915788],
          [151.7260164, -32.9143632],
          [151.7193489, -32.9103187],
          [151.6978011, -32.9074784],
          [151.6979888, -32.9110527],
          [151.6917862, -32.9072466],
          [151.6867503, -32.9163718],
          [151.690222, -32.9166776],
          [151.69074, -32.9140163],
          [151.7027778, -32.9196959],
          [151.7033465, -32.9170601],
          [151.705501, -32.9163675],
          [151.7082731, -32.917843],
          [151.7205743, -32.9175284],
          [151.7228841, -32.9186919],
          [151.7220463, -32.9171526],
          [151.725594, -32.915788]
        ]
      ]
    ]
  }
}

export { mockSuppliers, mockItems, mockAttachments, mockItemFields, mockPolygon }
