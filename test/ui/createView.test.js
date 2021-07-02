import {render, waitFor} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event'; 
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum';
const { Core } = require('@adobe/aio-sdk');
import { CreateView } from '../../web-src/src/components/CreateView';
/*
 * <license header>
 */

jest.mock('@adobe/aio-sdk', () => ({
    Core: {
        Logger: jest.fn()
    }
}));


const mockStockResponse = {
    "files": [{
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 206987333,
      "creator_name": "NazArt",
      "height": 4000,
      "id": 263252174,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "OU3bNFerMxJMRVsCnHbwBJpAlMcucMoq",
      "thumbnail_height": 286,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/02/63/25/21/500_F_263252174_OU3bNFerMxJMRVsCnHbwBJpAlMcucMoq.jpg\" alt=\"Dos and donts like thumbs up or down. Like or dislike. Vector illustration line icon\" title=\"Vector: Dos and donts like thumbs up or down. Like or dislike. Vector illustration line icon\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/02/63/25/21/500_F_263252174_OU3bNFerMxJMRVsCnHbwBJpAlMcucMoq.jpg",
      "thumbnail_width": 500,
      "title": "Dos and donts like thumbs up or down. Like or dislike. Vector illustration line icon",
      "vector_type": "zip",
      "width": 7000
    }, {
      "category": {
        "id": 476,
        "name": "Other"
      },
      "content_type": "application/illustrator",
      "creator_id": 205671727,
      "creator_name": "happyvector071",
      "height": 4800,
      "id": 210563669,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "xktDVDkCpA9NyUDJG8pN5v9Q8fn3g8mT",
      "thumbnail_height": 250,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/10/56/36/500_F_210563669_xktDVDkCpA9NyUDJG8pN5v9Q8fn3g8mT.jpg\" alt=\"Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element\" title=\"Vector: Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/10/56/36/500_F_210563669_xktDVDkCpA9NyUDJG8pN5v9Q8fn3g8mT.jpg",
      "thumbnail_width": 500,
      "title": "Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element",
      "vector_type": "zip",
      "width": 9600
    }, {
      "category": {
        "id": 996,
        "name": "Networks and the Internet"
      },
      "content_type": "image/jpeg",
      "creator_id": 200417761,
      "creator_name": "Bits and Splits",
      "height": 4912,
      "id": 205340673,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "9Dbw7hPu46Lc4DmNKZC0MgCbxnlXqbNq",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/05/34/06/500_F_205340673_9Dbw7hPu46Lc4DmNKZC0MgCbxnlXqbNq.jpg\" alt=\"DOS concept with faceless hooded male person\" title=\"Photo: DOS concept with faceless hooded male person\" zoom_ratio=\"2.144761059\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/05/34/06/500_F_205340673_9Dbw7hPu46Lc4DmNKZC0MgCbxnlXqbNq.jpg",
      "thumbnail_width": 500,
      "title": "DOS concept with faceless hooded male person",
      "vector_type": null,
      "width": 7360
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "image/jpeg",
      "creator_id": 203812936,
      "creator_name": "Fokussiert",
      "height": 1820,
      "id": 287953809,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "ucxqIxPuOY36uLkTngN3zLlUO9ug2d7m",
      "thumbnail_height": 331,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/87/95/38/500_F_287953809_ucxqIxPuOY36uLkTngN3zLlUO9ug2d7m.jpg\" alt=\"Hand flips a dice and changes the expression &quot;don'ts&quot; to &quot;does&quot;\" title=\"Photo: Hand flips a dice and changes the expression &quot;don'ts&quot; to &quot;does&quot;\" zoom_ratio=\"1.3114877049\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/87/95/38/500_F_287953809_ucxqIxPuOY36uLkTngN3zLlUO9ug2d7m.jpg",
      "thumbnail_width": 500,
      "title": "Hand flips a dice and changes the expression \"don'ts\" to \"does\"",
      "vector_type": null,
      "width": 2752
    }, {
      "category": {
        "id": 832,
        "name": "Culture and Religion"
      },
      "content_type": "application/illustrator",
      "creator_id": 210014443,
      "creator_name": "Abdur",
      "height": 4500,
      "id": 437156637,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "mCI2niJfvGU0J30kheclbwza3zWbiq8L",
      "thumbnail_height": 500,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/04/37/15/66/500_F_437156637_mCI2niJfvGU0J30kheclbwza3zWbiq8L.jpg\" alt=\"Dia dos Namorados greeting card template with typography text happy Dia dos Namorados and red heart.\" title=\"Vector: Dia dos Namorados greeting card template with typography text happy Dia dos Namorados and red heart.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/04/37/15/66/500_F_437156637_mCI2niJfvGU0J30kheclbwza3zWbiq8L.jpg",
      "thumbnail_width": 500,
      "title": "Dia dos Namorados greeting card template with typography text happy Dia dos Namorados and red heart.",
      "vector_type": "zip",
      "width": 4500
    }, {
      "category": {
        "id": 167,
        "name": "Business"
      },
      "content_type": "image/jpeg",
      "creator_id": 17439,
      "creator_name": "Karen Roach",
      "height": 3372,
      "id": 259176372,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "1Ip5Bo7MSfqP1C9wjTwo5tYrjBqO3Scv",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/02/59/17/63/500_F_259176372_1Ip5Bo7MSfqP1C9wjTwo5tYrjBqO3Scv.jpg\" alt=\"Do's and Don'ts on two sticky notes  on weathered whitewash textured wood\" title=\"Photo: Do's and Don'ts on two sticky notes  on weathered whitewash textured wood\" zoom_ratio=\"1.7779904387\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/02/59/17/63/500_F_259176372_1Ip5Bo7MSfqP1C9wjTwo5tYrjBqO3Scv.jpg",
      "thumbnail_width": 500,
      "title": "Do's and Don'ts on two sticky notes  on weathered whitewash textured wood",
      "vector_type": null,
      "width": 5058
    }, {
      "category": {
        "id": 461,
        "name": "3D images"
      },
      "content_type": "image/jpeg",
      "creator_id": 100283,
      "creator_name": "Julien Tromeur",
      "height": 2751,
      "id": 3721849,
      "media_type_id": 2,
      "premium_level_id": 0,
      "stock_id": "hViQ2zuitYGYINri8hwvkIjz0fior5RO",
      "thumbnail_height": 459,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/00/03/72/18/500_F_3721849_hViQ2zuitYGYINri8hwvkIjz0fior5RO.jpg\" alt=\"Mal de dos\" title=\"Illustration: Mal de dos\" zoom_ratio=\"1.3693063938\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/00/03/72/18/500_F_3721849_hViQ2zuitYGYINri8hwvkIjz0fior5RO.jpg",
      "thumbnail_width": 500,
      "title": "Mal de dos",
      "vector_type": null,
      "width": 3000
    }, {
      "category": {
        "id": 695,
        "name": "People"
      },
      "content_type": "image/jpeg",
      "creator_id": 206604647,
      "creator_name": "Benjamin Taguemount",
      "height": 8688,
      "id": 325481588,
      "media_type_id": 1,
      "premium_level_id": 4,
      "stock_id": "Zcz2hVfULUyepGpS2LjEqEXyBq2qnsSC",
      "thumbnail_height": 500,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/03/25/48/15/500_F_325481588_Zcz2hVfULUyepGpS2LjEqEXyBq2qnsSC.jpg\" alt=\"femme collant rouge\" title=\"Photo: femme collant rouge\" zoom_ratio=\"2.328781006\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/03/25/48/15/500_F_325481588_Zcz2hVfULUyepGpS2LjEqEXyBq2qnsSC.jpg",
      "thumbnail_width": 334,
      "title": "femme collant rouge",
      "vector_type": null,
      "width": 5792
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 203945408,
      "creator_name": "infadel",
      "height": 5000,
      "id": 248672224,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "ykS5uXbtpAMNhJUGOh8USbODLBSJ2prr",
      "thumbnail_height": 500,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/48/67/22/500_F_248672224_ykS5uXbtpAMNhJUGOh8USbODLBSJ2prr.jpg\" alt=\"dos and donts like thumbs up or down\" title=\"Vector: dos and donts like thumbs up or down\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/48/67/22/500_F_248672224_ykS5uXbtpAMNhJUGOh8USbODLBSJ2prr.jpg",
      "thumbnail_width": 500,
      "title": "dos and donts like thumbs up or down",
      "vector_type": "zip",
      "width": 5000
    }, {
      "category": {
        "id": 832,
        "name": "Culture and Religion"
      },
      "content_type": "application/illustrator",
      "creator_id": 207142921,
      "creator_name": "Pablo Ramon",
      "height": 3956,
      "id": 436677177,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "DbPgivllSUi5pruyHeH0sgRFuIqPpDTt",
      "thumbnail_height": 188,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/04/36/67/71/500_F_436677177_DbPgivllSUi5pruyHeH0sgRFuIqPpDTt.jpg\" alt=\"Dia dos Namorados, Day Sale 50% OFF. Banner with hearts, red background. Shop Valentine's template.\" title=\"Vector: Dia dos Namorados, Day Sale 50% OFF. Banner with hearts, red background. Shop Valentine's template.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/04/36/67/71/500_F_436677177_DbPgivllSUi5pruyHeH0sgRFuIqPpDTt.jpg",
      "thumbnail_width": 500,
      "title": "Dia dos Namorados, Day Sale 50% OFF. Banner with hearts, red background. Shop Valentine's template.",
      "vector_type": "zip",
      "width": 10550
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 209616252,
      "creator_name": "Bruna Saraiva",
      "height": 8709,
      "id": 437620783,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "91xyR7PGC5bNvCGgespkyt5ewI636Nm5",
      "thumbnail_height": 500,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/04/37/62/07/500_F_437620783_91xyR7PGC5bNvCGgespkyt5ewI636Nm5.jpg\" alt=\"Feliz Dia dos Namorados! Happy Valentines Day. Brazilian Portuguese Hand Lettering Calligraphy. Vector.\" title=\"Vector: Feliz Dia dos Namorados! Happy Valentines Day. Brazilian Portuguese Hand Lettering Calligraphy. Vector.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/04/37/62/07/500_F_437620783_91xyR7PGC5bNvCGgespkyt5ewI636Nm5.jpg",
      "thumbnail_width": 500,
      "title": "Feliz Dia dos Namorados! Happy Valentines Day. Brazilian Portuguese Hand Lettering Calligraphy. Vector.",
      "vector_type": "zip",
      "width": 8710
    }, {
      "category": {
        "id": 695,
        "name": "People"
      },
      "content_type": "image/jpeg",
      "creator_id": 210465545,
      "creator_name": "Eduardo",
      "height": 2734,
      "id": 440199652,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "rqNapTEUZLupmf6hyNZMZoTImtCuPBE7",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/04/40/19/96/500_F_440199652_rqNapTEUZLupmf6hyNZMZoTImtCuPBE7.jpg\" alt=\"dos manos de mujer entrelazadas\" title=\"Photo: dos manos de mujer entrelazadas\" zoom_ratio=\"1.6011714462\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/04/40/19/96/500_F_440199652_rqNapTEUZLupmf6hyNZMZoTImtCuPBE7.jpg",
      "thumbnail_width": 500,
      "title": "dos manos de mujer entrelazadas",
      "vector_type": null,
      "width": 4102
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 205324907,
      "creator_name": "4zevar",
      "height": 3125,
      "id": 304783255,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "razQ4tHHiGZt265ooVZ0atqwcH0ii7pP",
      "thumbnail_height": 250,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/04/78/32/500_F_304783255_razQ4tHHiGZt265ooVZ0atqwcH0ii7pP.jpg\" alt=\"Do and don't, positive and negative like\" title=\"Vector: Do and don't, positive and negative like\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/04/78/32/500_F_304783255_razQ4tHHiGZt265ooVZ0atqwcH0ii7pP.jpg",
      "thumbnail_width": 500,
      "title": "Do and don't, positive and negative like",
      "vector_type": "zip",
      "width": 6250
    }, {
      "category": {
        "id": 981,
        "name": "Technology"
      },
      "content_type": "application/illustrator",
      "creator_id": 204988227,
      "creator_name": "kolonko",
      "height": 3133,
      "id": 382168541,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "jq6ORPvD88bsfHH6fglvtQOkXVebDBxm",
      "thumbnail_height": 306,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/03/82/16/85/500_F_382168541_jq6ORPvD88bsfHH6fglvtQOkXVebDBxm.jpg\" alt=\"BSOD screen old 98 error crash software. Bluescreen death system pc bug, bsod screen\" title=\"Vector: BSOD screen old 98 error crash software. Bluescreen death system pc bug, bsod screen\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/03/82/16/85/500_F_382168541_jq6ORPvD88bsfHH6fglvtQOkXVebDBxm.jpg",
      "thumbnail_width": 500,
      "title": "BSOD screen old 98 error crash software. Bluescreen death system pc bug, bsod screen",
      "vector_type": "zip",
      "width": 5107
    }, {
      "category": {
        "id": 695,
        "name": "People"
      },
      "content_type": "image/jpeg",
      "creator_id": 209460945,
      "creator_name": "HUGO GRAJALES",
      "height": 5240,
      "id": 442259677,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "bC6oUPSd5xC2ZQKH182omuqwhHZyXJ5E",
      "thumbnail_height": 320,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/04/42/25/96/500_F_442259677_bC6oUPSd5xC2ZQKH182omuqwhHZyXJ5E.jpg\" alt=\"concepto de dos amigas latinas felices en plaza de la ciudad \" title=\"Photo: concepto de dos amigas latinas felices en plaza de la ciudad \" zoom_ratio=\"2.2638462845\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/04/42/25/96/500_F_442259677_bC6oUPSd5xC2ZQKH182omuqwhHZyXJ5E.jpg",
      "thumbnail_width": 500,
      "title": "concepto de dos amigas latinas felices en plaza de la ciudad ",
      "vector_type": null,
      "width": 8200
    }, {
      "category": {
        "id": 643,
        "name": "Lifestyle"
      },
      "content_type": "application/illustrator",
      "creator_id": 205693598,
      "creator_name": "Gabrieuskal",
      "height": 3500,
      "id": 436474411,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "VLDRFHDL6q092Qots9xrQ3JH0pnMqQjB",
      "thumbnail_height": 350,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/04/36/47/44/500_F_436474411_VLDRFHDL6q092Qots9xrQ3JH0pnMqQjB.jpg\" alt=\"Icono de reloj puntual negro.\" title=\"Vector: Icono de reloj puntual negro.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/04/36/47/44/500_F_436474411_VLDRFHDL6q092Qots9xrQ3JH0pnMqQjB.jpg",
      "thumbnail_width": 500,
      "title": "Icono de reloj puntual negro.",
      "vector_type": "zip",
      "width": 5000
    }, {
      "category": {
        "id": 453,
        "name": "Shapes"
      },
      "content_type": "application/illustrator",
      "creator_id": 205406049,
      "creator_name": "bearsky23",
      "height": 5673,
      "id": 202961036,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "p2lCooVlNfYMKSli5smHHTN85erh2TBh",
      "thumbnail_height": 305,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/02/96/10/500_F_202961036_p2lCooVlNfYMKSli5smHHTN85erh2TBh.jpg\" alt=\"Do and Don't or Like and Unlike Icons w Positive and Negative Symbols\" title=\"Vector: Do and Don't or Like and Unlike Icons w Positive and Negative Symbols\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/02/96/10/500_F_202961036_p2lCooVlNfYMKSli5smHHTN85erh2TBh.jpg",
      "thumbnail_width": 500,
      "title": "Do and Don't or Like and Unlike Icons w Positive and Negative Symbols",
      "vector_type": "zip",
      "width": 9297
    }, {
      "category": {
        "id": 633,
        "name": "Beaches"
      },
      "content_type": "image/jpeg",
      "creator_id": 201093748,
      "creator_name": "cristovao31",
      "height": 3744,
      "id": 97457193,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "SYSOr8C6ajEwndiLmfHnlN2zii7roKf7",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/00/97/45/71/500_F_97457193_SYSOr8C6ajEwndiLmfHnlN2zii7roKf7.jpg\" alt=\"Beautiful beach of ( Praia dos Pescadores ), Albufeira, Portugal\" title=\"Photo: Beautiful beach of ( Praia dos Pescadores ), Albufeira, Portugal\" zoom_ratio=\"1.8734993995\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/00/97/45/71/500_F_97457193_SYSOr8C6ajEwndiLmfHnlN2zii7roKf7.jpg",
      "thumbnail_width": 500,
      "title": "Beautiful beach of ( Praia dos Pescadores ), Albufeira, Portugal",
      "vector_type": null,
      "width": 5616
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 205856174,
      "creator_name": "kora_ra_123",
      "height": 3001,
      "id": 372866653,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "lvTUePJxnjlzJ9kbYFrPcsY7qgCqYiTA",
      "thumbnail_height": 250,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/72/86/66/500_F_372866653_lvTUePJxnjlzJ9kbYFrPcsY7qgCqYiTA.jpg\" alt=\"Do and Dont check tick mark and red cross vector isolated icons\" title=\"Vector: Do and Dont check tick mark and red cross vector isolated icons\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/72/86/66/500_F_372866653_lvTUePJxnjlzJ9kbYFrPcsY7qgCqYiTA.jpg",
      "thumbnail_width": 500,
      "title": "Do and Dont check tick mark and red cross vector isolated icons",
      "vector_type": "zip",
      "width": 6001
    }, {
      "category": {
        "id": 873,
        "name": "Pain and Symptoms"
      },
      "content_type": "image/jpeg",
      "creator_id": 201553782,
      "creator_name": "JPC-PROD",
      "height": 3328,
      "id": 36348952,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "JnmTRu8eUIie4MpR9SG32JbSZ5v4TKwd",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/00/36/34/89/500_F_36348952_JnmTRu8eUIie4MpR9SG32JbSZ5v4TKwd.jpg\" alt=\"Rhumatologie - Mal de dos\" title=\"Photo: Rhumatologie - Mal de dos\" zoom_ratio=\"1.7663521733\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/00/36/34/89/500_F_36348952_JnmTRu8eUIie4MpR9SG32JbSZ5v4TKwd.jpg",
      "thumbnail_width": 500,
      "title": "Rhumatologie - Mal de dos",
      "vector_type": null,
      "width": 4992
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 207256928,
      "creator_name": "Anna",
      "height": 3600,
      "id": 355028258,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "ObvKvFXacqiCyWXmOwzmip4ey3bKiWww",
      "thumbnail_height": 300,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/55/02/82/500_F_355028258_ObvKvFXacqiCyWXmOwzmip4ey3bKiWww.jpg\" alt=\"Do and Don't simple icons, freehand brush strokes. Vector elements. Green check mark and red cross, used to indicate rules of conduct or response versions.\" title=\"Vector: Do and Don't simple icons, freehand brush strokes. Vector elements. Green check mark and red cross, used to indicate rules of conduct or response versions.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/55/02/82/500_F_355028258_ObvKvFXacqiCyWXmOwzmip4ey3bKiWww.jpg",
      "thumbnail_width": 500,
      "title": "Do and Don't simple icons, freehand brush strokes. Vector elements. Green check mark and red cross, used to indicate rules of conduct or response versions.",
      "vector_type": "zip",
      "width": 6000
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 206987333,
      "creator_name": "NazArt",
      "height": 4500,
      "id": 263251899,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "HOPOWbInsXnTFjipDI209OZDprcyLnkT",
      "thumbnail_height": 300,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/63/25/18/500_F_263251899_HOPOWbInsXnTFjipDI209OZDprcyLnkT.jpg\" alt=\"Don't and don'ts signs. Flat cartoon style. Modern line vector illustration\" title=\"Vector: Don't and don'ts signs. Flat cartoon style. Modern line vector illustration\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/63/25/18/500_F_263251899_HOPOWbInsXnTFjipDI209OZDprcyLnkT.jpg",
      "thumbnail_width": 500,
      "title": "Don't and don'ts signs. Flat cartoon style. Modern line vector illustration",
      "vector_type": "zip",
      "width": 7500
    }, {
      "category": {
        "id": 476,
        "name": "Other"
      },
      "content_type": "application/illustrator",
      "creator_id": 205671727,
      "creator_name": "happyvector071",
      "height": 4800,
      "id": 210564848,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "RukurmhUvPM0ORjIypjkBqyoziFaTtml",
      "thumbnail_height": 250,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/02/10/56/48/500_F_210564848_RukurmhUvPM0ORjIypjkBqyoziFaTtml.jpg\" alt=\"Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element\" title=\"Vector: Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/02/10/56/48/500_F_210564848_RukurmhUvPM0ORjIypjkBqyoziFaTtml.jpg",
      "thumbnail_width": 500,
      "title": "Creative vector illustration of green tick, red cross isolated on transparent background. Art design with text do and dont. Right or wrong. True or false. Abstract concept graphic element",
      "vector_type": "zip",
      "width": 9600
    }, {
      "category": {
        "id": 454,
        "name": "Backgrounds"
      },
      "content_type": "image/jpeg",
      "creator_id": 204072249,
      "creator_name": "adzicnatasa",
      "height": 2782,
      "id": 140776631,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "d5rBrA0rcAtmYfhF6IwV8ZcNCSW6slkL",
      "thumbnail_height": 331,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/01/40/77/66/500_F_140776631_d5rBrA0rcAtmYfhF6IwV8ZcNCSW6slkL.jpg\" alt=\"DO versus DON`T written on the white arrows, dilemmas concept.\" title=\"Photo: DO versus DON`T written on the white arrows, dilemmas concept.\" zoom_ratio=\"1.6201851746\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/01/40/77/66/500_F_140776631_d5rBrA0rcAtmYfhF6IwV8ZcNCSW6slkL.jpg",
      "thumbnail_width": 500,
      "title": "DO versus DON`T written on the white arrows, dilemmas concept.",
      "vector_type": null,
      "width": 4200
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 206414618,
      "creator_name": "DG-Studio",
      "height": 4723,
      "id": 327280139,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "P7Ydl79XJgaoolghOWNuodfKQff9k6nz",
      "thumbnail_height": 358,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/03/27/28/01/500_F_327280139_P7Ydl79XJgaoolghOWNuodfKQff9k6nz.jpg\" alt=\"Do's and Don'ts like thumbs up or down. flat simple thumb up symbol minimal round logotype element set graphic design isolated on white. Vector stock illustration.\" title=\"Vector: Do's and Don'ts like thumbs up or down. flat simple thumb up symbol minimal round logotype element set graphic design isolated on white. Vector stock illustration.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/03/27/28/01/500_F_327280139_P7Ydl79XJgaoolghOWNuodfKQff9k6nz.jpg",
      "thumbnail_width": 500,
      "title": "Do's and Don'ts like thumbs up or down. flat simple thumb up symbol minimal round logotype element set graphic design isolated on white. Vector stock illustration.",
      "vector_type": "zip",
      "width": 6612
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 201258084,
      "creator_name": "teracreonte",
      "height": 4167,
      "id": 358949601,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "Jt0WUCPWZxGC8mHAgo5FhAbdMfLFYlqh",
      "thumbnail_height": 250,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/58/94/96/500_F_358949601_Jt0WUCPWZxGC8mHAgo5FhAbdMfLFYlqh.jpg\" alt=\"Concepto compartir datos. Icono plano lineal flechas en cuadrados en dos sentidos en fondo gris y fondo blanco\" title=\"Vector: Concepto compartir datos. Icono plano lineal flechas en cuadrados en dos sentidos en fondo gris y fondo blanco\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/58/94/96/500_F_358949601_Jt0WUCPWZxGC8mHAgo5FhAbdMfLFYlqh.jpg",
      "thumbnail_width": 500,
      "title": "Concepto compartir datos. Icono plano lineal flechas en cuadrados en dos sentidos en fondo gris y fondo blanco",
      "vector_type": "zip",
      "width": 8333
    }, {
      "category": {
        "id": 169,
        "name": "Business Vision"
      },
      "content_type": "application/illustrator",
      "creator_id": 202619457,
      "creator_name": "Scriblr",
      "height": 4826,
      "id": 109814418,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "8L0R0g2Vh9pF1QWVXbF2TvtLpUiTG82F",
      "thumbnail_height": 499,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/01/09/81/44/500_F_109814418_8L0R0g2Vh9pF1QWVXbF2TvtLpUiTG82F.jpg\" alt=\"PDCA Plan Do Check Act.\" title=\"Vector: PDCA Plan Do Check Act.\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/01/09/81/44/500_F_109814418_8L0R0g2Vh9pF1QWVXbF2TvtLpUiTG82F.jpg",
      "thumbnail_width": 500,
      "title": "PDCA Plan Do Check Act.",
      "vector_type": "zip",
      "width": 4844
    }, {
      "category": {
        "id": 461,
        "name": "3D images"
      },
      "content_type": "image/jpeg",
      "creator_id": 100283,
      "creator_name": "Julien Tromeur",
      "height": 2400,
      "id": 3721826,
      "media_type_id": 2,
      "premium_level_id": 0,
      "stock_id": "1iobwZr4mw5m6lGLvQuFGgtrxOxmQbmI",
      "thumbnail_height": 400,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/00/03/72/18/500_F_3721826_1iobwZr4mw5m6lGLvQuFGgtrxOxmQbmI.jpg\" alt=\"Mal de dos\" title=\"Illustration: Mal de dos\" zoom_ratio=\"1.3693063938\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/00/03/72/18/500_F_3721826_1iobwZr4mw5m6lGLvQuFGgtrxOxmQbmI.jpg",
      "thumbnail_width": 500,
      "title": "Mal de dos",
      "vector_type": null,
      "width": 3000
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 206107572,
      "creator_name": "dlyastokiv",
      "height": 3333,
      "id": 354151532,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "UakQgjxWEfdvGqFOQCUDW7QJuEHCjfI3",
      "thumbnail_height": 266,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/03/54/15/15/500_F_354151532_UakQgjxWEfdvGqFOQCUDW7QJuEHCjfI3.jpg\" alt=\"Dos and donts like thumbs up or down. Like or dislike index finger sign. Thumb up and thumb down sign - stock vector\" title=\"Vector: Dos and donts like thumbs up or down. Like or dislike index finger sign. Thumb up and thumb down sign - stock vector\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/03/54/15/15/500_F_354151532_UakQgjxWEfdvGqFOQCUDW7QJuEHCjfI3.jpg",
      "thumbnail_width": 500,
      "title": "Dos and donts like thumbs up or down. Like or dislike index finger sign. Thumb up and thumb down sign - stock vector",
      "vector_type": "zip",
      "width": 6250
    }, {
      "category": {
        "id": 596,
        "name": "Landscapes"
      },
      "content_type": "image/jpeg",
      "creator_id": 208178416,
      "creator_name": "Cássio de Holanda",
      "height": 4000,
      "id": 230899781,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "wrQtAbKDZaq7R6ZpP5mjM5szq8XxOlIA",
      "thumbnail_height": 334,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/02/30/89/97/500_F_230899781_wrQtAbKDZaq7R6ZpP5mjM5szq8XxOlIA.jpg\" alt=\"Maytrea Garden Mountains in Chapada dos Veadeiros - Goiás, Brazil\" title=\"Photo: Maytrea Garden Mountains in Chapada dos Veadeiros - Goiás, Brazil\" zoom_ratio=\"1.9364916731\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/02/30/89/97/500_F_230899781_wrQtAbKDZaq7R6ZpP5mjM5szq8XxOlIA.jpg",
      "thumbnail_width": 500,
      "title": "Maytrea Garden Mountains in Chapada dos Veadeiros - Goiás, Brazil",
      "vector_type": null,
      "width": 6000
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "application/illustrator",
      "creator_id": 206377351,
      "creator_name": "smile3377",
      "height": 4167,
      "id": 376868677,
      "media_type_id": 3,
      "premium_level_id": 0,
      "stock_id": "Ln2EEMiCbwyr9mbmXHg0zspBRHUaGkoS",
      "thumbnail_height": 193,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/76/86/86/500_F_376868677_Ln2EEMiCbwyr9mbmXHg0zspBRHUaGkoS.jpg\" alt=\"Do and Don't. Thumb up and thumb down. Tick and cross. Good and bad symbols. Like and dislike icons. Vector illustration\" title=\"Vector: Do and Don't. Thumb up and thumb down. Tick and cross. Good and bad symbols. Like and dislike icons. Vector illustration\" zoom_ratio=\"0\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/76/86/86/500_F_376868677_Ln2EEMiCbwyr9mbmXHg0zspBRHUaGkoS.jpg",
      "thumbnail_width": 500,
      "title": "Do and Don't. Thumb up and thumb down. Tick and cross. Good and bad symbols. Like and dislike icons. Vector illustration",
      "vector_type": "zip",
      "width": 10834
    }, {
      "category": {
        "id": 498,
        "name": "Hobbies and Leisure"
      },
      "content_type": "image/jpeg",
      "creator_id": 210465545,
      "creator_name": "Eduardo",
      "height": 2162,
      "id": 439934775,
      "media_type_id": 1,
      "premium_level_id": 0,
      "stock_id": "gTqFvsL4ElyqvaYIeoAmaD5thWqQzkZV",
      "thumbnail_height": 316,
      "thumbnail_html_tag": "<img src=\"https://as2.ftcdn.net/jpg/04/39/93/47/500_F_439934775_gTqFvsL4ElyqvaYIeoAmaD5thWqQzkZV.jpg\" alt=\"paisaje al atardecer de dos amigos caminando por la playa\" title=\"Photo: paisaje al atardecer de dos amigos caminando por la playa\" zoom_ratio=\"1.4622328816\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as2.ftcdn.net/jpg/04/39/93/47/500_F_439934775_gTqFvsL4ElyqvaYIeoAmaD5thWqQzkZV.jpg",
      "thumbnail_width": 500,
      "title": "paisaje al atardecer de dos amigos caminando por la playa",
      "vector_type": null,
      "width": 3421
    }, {
      "category": {
        "id": 444,
        "name": "Graphic Resources"
      },
      "content_type": "image/jpeg",
      "creator_id": 209347382,
      "creator_name": "Manuel",
      "height": 2000,
      "id": 320366841,
      "media_type_id": 2,
      "premium_level_id": 0,
      "stock_id": "zrCQ5bAQ0nztCh9sPbYVlPOGYZmPJw08",
      "thumbnail_height": 400,
      "thumbnail_html_tag": "<img src=\"https://as1.ftcdn.net/jpg/03/20/36/68/500_F_320366841_zrCQ5bAQ0nztCh9sPbYVlPOGYZmPJw08.jpg\" alt=\"roue de deming qualité \" title=\"Illustration: roue de deming qualité \" zoom_ratio=\"1.25\" zoom_depth_max=\"2\" />",
      "thumbnail_url": "https://as1.ftcdn.net/jpg/03/20/36/68/500_F_320366841_zrCQ5bAQ0nztCh9sPbYVlPOGYZmPJw08.jpg",
      "thumbnail_width": 500,
      "title": "roue de deming qualité ",
      "vector_type": null,
      "width": 2500
    }],
    "nb_results": 49274
  };

const mockLoggerInstance = { info: jest.fn(), debug: jest.fn(), error: jest.fn() };
Core.Logger.mockReturnValue(mockLoggerInstance);

jest.mock('node-fetch');
const fetch = require('node-fetch');
beforeEach(() => {
    Core.Logger.mockClear();
    mockLoggerInstance.info.mockReset();
    mockLoggerInstance.debug.mockReset();
    mockLoggerInstance.error.mockReset();
  });

test('loads and displays greeting', async () => {
    const mockFetchResponse = {
        ok: true,
        json: () => Promise.resolve(mockStockResponse)
    };
    fetch.mockResolvedValue(mockFetchResponse);

    render(<CreateView />); 
    let searchTextField = screen.getByTestId('searchTextField'); 
    userEvent.click(searchTextField); 
    userEvent.type(document.activeElement, 'dogs');

    await waitFor(() => screen.getByTestId('sugestedAssets'));

    expect(screen.getByTestId('sugestedAssets')).toHaveTextContent('Dogs Peeking Eyes and Paws Over')
})

