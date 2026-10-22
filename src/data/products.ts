import { Product } from '../types';

export const CDN_BASE = 'https://north-2hugdavp.myshopify.com/cdn';

export const PRODUCTS: Product[] = [
  // TOPS
  {
    id: 'off-grid-heavyweight-zip-jacket',
    title: 'Зип-куртка “Off-Grid” 480 GSM',
    collection: 'Полевая система · Выпуск 001',
    price: 128.0,
    originalPrice: 145.0,
    description: 'Тяжелая зип-куртка плотностью 480 GSM из футера French Terry со спущенной линией плеч, кастомной матовой металлической фурнитурой и топографической вышивкой на спине.',
    details: [
      '480 GSM 100% плотный хлопковый футер с петельчатой изнанкой',
      'Двойная винтажная стирка с деликатной патиной',
      'Двусторонняя металлическая тракторная молния промышленного класса',
      'Топографическая контурная вышивка вдоль спины',
      'Плотный пояс и манжеты в рубчик с выверенным расслабленным силуэтом'
    ],
    materials: '100% гребенной тяжелый хлопок. Сделано в Португалии. Деликатная холодная стирка.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/model-base_50b6c21e-cd79-4985-89a7-e05d8be650f9.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base_50b6c21e-cd79-4985-89a7-e05d8be650f9.png`,
      `${CDN_BASE}/shop/files/oversizedheavyweightzip-upjacket-5.png`,
      `${CDN_BASE}/shop/files/oversizedheavyweightzip-upjacket-2.png`
    ],
    colors: [
      { name: 'Выстиранный оливковый', value: 'washed-olive', swatchHex: '#5e6353', imageIndex: 0 },
      { name: 'Темно-синий', value: 'dark-navy', swatchHex: '#1e2430', imageIndex: 1 },
      { name: 'Графитовый серый', value: 'charcoal-grey', swatchHex: '#383838', imageIndex: 2 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v1-1', size: 'S', color: 'Выстиранный оливковый', available: true, price: 128 },
      { id: 'v1-2', size: 'M', color: 'Выстиранный оливковый', available: true, price: 128 },
      { id: 'v1-3', size: 'L', color: 'Выстиранный оливковый', available: true, price: 128 },
      { id: 'v1-4', size: 'XL', color: 'Выстиранный оливковый', available: true, price: 128 }
    ]
  },
  {
    id: 'no-direction-tee',
    title: 'Футболка No Direction',
    collection: 'Графическая серия · FW 2025',
    price: 48.0,
    description: 'Фирменная оверсайз-футболка плотностью 280 GSM из утяжеленного хлопка с выстиранным минеральным окрашиванием и детализированным принтом компаса с географическими координатами NØRTH.',
    details: [
      '280 GSM премиальное одинарное хлопковое джерси',
      'Винтажная минеральная стирка с легким состариванием',
      'Трафаретная печать розы ветров с эффектом кракелюра на спине',
      'Миниатюрный тональный логотип бренда на груди',
      'Усиленная плотная горловина, сохраняющая идеальную геометрию'
    ],
    materials: '100% органический хлопок. Предварительная термоусадка. Машинная стирка при низкой температуре.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/NoDirectionTee-3.png`,
    images: [
      `${CDN_BASE}/shop/files/NoDirectionTee-3.png`,
      `${CDN_BASE}/shop/files/NoDirectionTee-4.png`,
      `${CDN_BASE}/shop/files/NoDirectionTee-1.png`,
      `${CDN_BASE}/shop/files/No_Direction_Tee_from_Biborne_Design_System.png`
    ],
    colors: [
      { name: 'Выстиранный черный', value: 'faded-black', swatchHex: '#222222', imageIndex: 0 },
      { name: 'Мел / Светлый', value: 'chalk', swatchHex: '#ece9e4', imageIndex: 1 },
      { name: 'Темно-синий', value: 'dark-navy', swatchHex: '#1b2230', imageIndex: 2 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true },
      { name: '2XL', available: true }
    ],
    variants: [
      { id: 'v2-1', size: 'M', color: 'Выстиранный черный', available: true, price: 48 },
      { id: 'v2-2', size: 'L', color: 'Выстиранный черный', available: true, price: 48 },
      { id: 'v2-3', size: 'XL', color: 'Выстиранный черный', available: true, price: 48 },
      { id: 'v2-4', size: '2XL', color: 'Выстиранный черный', available: true, price: 48 }
    ]
  },
  {
    id: 'out-of-frame-long-sleeve',
    title: 'Лонгслив Out of Frame',
    collection: 'Графическая серия · FW 2025',
    price: 58.0,
    description: 'Плотный скейт-лонгслив со сложным геометрическим эзотерическим артом вдоль рукавов и центрированным векторным компасом на груди.',
    details: [
      '300 GSM плотный гребенной хлопок',
      'Вытравная печать сложных орнаментов по всей длине рукавов',
      'Винтажная обработка пигментными красителями',
      'Широкие плотные эластичные манжеты для свободной посадки со складками'
    ],
    materials: '100% тяжелый гребенной хлопок повышенной прочности.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/sweet.png`,
    images: [
      `${CDN_BASE}/shop/files/sweet.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve.png`,
      `${CDN_BASE}/shop/files/OutofFrameLongSleeve.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve_1.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve_2_60d236f4-1f99-4342-b314-8efef5effc00.png`
    ],
    colors: [
      { name: 'Выстиранный черный', value: 'faded-black', swatchHex: '#222222', imageIndex: 0 },
      { name: 'Мел / Светлый', value: 'chalk', swatchHex: '#ece9e4', imageIndex: 3 },
      { name: 'Выстиранный оливковый', value: 'washed-olive', swatchHex: '#5e6353', imageIndex: 4 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v3-1', size: 'S', color: 'Выстиранный черный', available: true, price: 58 },
      { id: 'v3-2', size: 'M', color: 'Выстиранный черный', available: true, price: 58 },
      { id: 'v3-3', size: 'L', color: 'Выстиранный черный', available: true, price: 58 },
      { id: 'v3-4', size: 'XL', color: 'Выстиранный черный', available: true, price: 58 }
    ]
  },
  {
    id: 'north-origin-copy',
    title: 'Худи Vector Origin',
    collection: 'Базовая коллекция · CORE',
    price: 129.0,
    description: 'Многослойное худи из тяжелого хлопкового полотна с двойными рукавами с открытым срезом, объемным карманом-кенгуру и деликатной обработкой краев.',
    details: [
      '500 GSM кастомный хлопковый флис с мягчайшим внутренним начесом',
      'Эффект двойных многослойных рукавов',
      'Анатомический глубокий капюшон с перекрестным воротом',
      'Вручную состаренные швы и края карманов'
    ],
    materials: '100% тяжелый хлопковый флис. Пигментное вываривание.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/model-base-6.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base-6.png`,
      `${CDN_BASE}/shop/files/image1201.png`,
      `${CDN_BASE}/shop/files/image1202.png`
    ],
    colors: [
      { name: 'Серый графит', value: 'gray', swatchHex: '#5c5c5c', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v4-1', size: 'M', color: 'Серый графит', available: true, price: 129 }
    ]
  },

  // BOTTOMS
  {
    id: 'static-wash-denim',
    title: 'Джинсы Static Wash Denim',
    collection: 'Графическая серия · FW 2025',
    price: 89.0,
    description: 'Широкие мешковатые джинсы плотностью 14 унций в японском стиле со статичным узором кислотной стирки, металлическими люверсами и тональным символьным принтом на штанине.',
    details: [
      '14 унций неэластичный плотный селвидж-деним',
      'Широкий прямой крой с эффектом свободного наложения на обувь',
      'Кастомная фурнитура с гравировкой из матового металла',
      'Деликатные рельефные потертости на коленях'
    ],
    materials: '100% плотный хлопковый деним.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/pant.png`,
    images: [
      `${CDN_BASE}/shop/files/pant.png`
    ],
    colors: [
      { name: 'Выстиранный серый', value: 'washed-grey', swatchHex: '#3d3d3d', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v5-1', size: 'M', color: 'Выстиранный серый', available: true, price: 89 }
    ]
  },
  {
    id: 'north-off-route-denim',
    title: 'Джинсы North Off-Route Denim',
    collection: 'Горизонтальная коллекция',
    price: 125.0,
    description: 'Тяжелый свободный деним с мягким градиентным затемнением к глубоким черным манжетам и шелкографией навигационных координат: 51.5074° N, 0.1278° W.',
    details: [
      '14.5 унций премиальный хлопковый деним',
      'Плавный градиентный переход окрашивания Dip-dye',
      'Навигационная графика OFF-ROUTE вдоль ноги',
      'Глубокие передние и задние карманы карго-типа'
    ],
    materials: '100% жесткий хлопковый деним.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/North_Off-Route_Denim.png`,
    images: [
      `${CDN_BASE}/shop/files/North_Off-Route_Denim.png`,
      `${CDN_BASE}/shop/files/NORTH_OFF-ROUTE_DENIM_2.png`,
      `${CDN_BASE}/shop/files/NORTH_OFF-ROUTE_DENIM_3.png`
    ],
    colors: [
      { name: 'Градиентный графит', value: 'gradient-charcoal', swatchHex: '#2b2c30', imageIndex: 0 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v6-1', size: 'M', color: 'Градиентный графит', available: true, price: 125 }
    ]
  },
  {
    id: 'north-topographic-sweatpant',
    title: 'Брюки North Topographic Sweatpant',
    collection: 'Графическая серия · FW 2025',
    price: 90.0,
    description: 'Расслабленные широкие флисовые брюки со сплошным детализированным белым принтом топографических изолиний, необработанным краем манжет и плотным шнурком.',
    details: [
      '460 GSM тяжелый плотный флис',
      'Сплошной контрастный принт топографической карты высот',
      'Глубокие врезные боковые карманы с контрастной отделкой',
      'Прочный плетеный шнурок пояса с матовыми металлическими эглетами'
    ],
    materials: '100% хлопковый флис высшего качества.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/model-base_3eda3415-afc2-47ca-8b20-7c4134d44e71.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base_3eda3415-afc2-47ca-8b20-7c4134d44e71.png`
    ],
    colors: [
      { name: 'Черный / Топография', value: 'black-contour', swatchHex: '#181818', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v7-1', size: 'M', color: 'Черный / Топография', available: true, price: 90 }
    ]
  },
  {
    id: 'terrain-wash',
    title: 'Брюки-карго Terrain Wash',
    collection: 'Полевая система · Выпуск 001',
    price: 85.0,
    description: 'Плотные свободные брюки-карго из окрашенного в готовом виде твила, созданные для города и пересеченной местности.',
    details: [
      '380 GSM плотный твил с энзимной стиркой',
      'Регулируемые утяжки с фиксаторами по низу штанин',
      'Артикулированные анатомические вытачки на коленях',
      'Потайной карман на молнии на правом бедре'
    ],
    materials: '100% тяжелый саржевый хлопок.',
    category: 'bottoms',
    images: [
      `${CDN_BASE}/shop/files/TerrainWash.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash6.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash3.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash1.png`
    ],
    colors: [
      { name: 'Пыльный серый', value: 'dust-grey', swatchHex: '#9c9b97', imageIndex: 0 },
      { name: 'Выстиранный черный', value: 'faded-black', swatchHex: '#252525', imageIndex: 3 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: false },
      { name: 'XL', available: false }
    ],
    variants: [
      { id: 'v8-1', size: 'M', color: 'Пыльный серый', available: true, price: 85 }
    ]
  },

  // EXTRA RECOMMENDED ITEMS (for cart recommendations & lookbook)
  {
    id: 'vibration-oversized-tee',
    title: 'Свитшот Standard Crew Sweat',
    collection: 'Базовая коллекция · CORE',
    price: 68.0,
    description: 'Плотный свитшот минималистичного коробчатого кроя со спущенной линией плеч и тональной отделкой горловины.',
    details: ['420 GSM французский хлопковый футер French Terry', 'Коробчатый силуэт без деформации после стирки', 'Тональная отстрочка плоскими швами'],
    materials: '100% гребенной хлопок.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/model-base_920d2c29-8e3a-4077-9b69-74243920c302.png`
    ],
    colors: [
      { name: 'Графит', value: 'charcoal', swatchHex: '#333333', imageIndex: 0 }
    ],
    sizes: [{ name: 'M', available: true }, { name: 'L', available: true }],
    variants: [{ id: 'v9-1', size: 'M', color: 'Графит', available: true, price: 68 }]
  },
  {
    id: 'vibration-oversized-tee-1',
    title: 'Футболка Vibration Oversized',
    collection: 'Графическая серия · FW 2025',
    price: 39.0,
    description: 'Светлая футболка свободного кроя с оптической графикой волнового искажения.',
    details: ['260 GSM одинарное хлопковое джерси', 'Водная шелкография с мягким тактильным финишем', 'Двойная отстрочка подола и рукавов'],
    materials: '100% органический хлопок.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/vibration0.png`
    ],
    colors: [
      { name: 'Мел / Светлый', value: 'chalk', swatchHex: '#f0ece1', imageIndex: 0 }
    ],
    sizes: [{ name: 'M', available: true }, { name: 'L', available: true }, { name: 'XL', available: true }],
    variants: [{ id: 'v10-1', size: 'M', color: 'Мел / Светлый', available: true, price: 39 }]
  },
  {
    id: 'no-single-tee',
    title: 'Футболка No Single Tee',
    collection: 'Базовая серия',
    price: 55.0,
    description: 'Тяжелая минималистичная футболка со спущенной линией плеч и микро-символом на груди.',
    details: ['280 GSM премиальный органический хлопок', 'Свободный расслабленный силуэт', 'Холодная стирка в готовом виде'],
    materials: '100% хлопок.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/model-base-5.png`
    ],
    colors: [
      { name: 'Выстиранный черный', value: 'washed-black', swatchHex: '#252525', imageIndex: 0 }
    ],
    sizes: [{ name: 'S', available: true }, { name: 'M', available: true }, { name: 'L', available: true }],
    variants: [{ id: 'v11-1', size: 'M', color: 'Выстиранный черный', available: true, price: 55 }]
  }
];

export const INSTAGRAM_POSTS = [
  { id: '1', img: `${CDN_BASE}/shop/files/image_1235.png`, alt: 'Где-то на севере — Горный перевал' },
  { id: '2', img: `${CDN_BASE}/shop/files/image_1233.png`, alt: 'Фирменная бирка NØRTH 3 por MOROCCO' },
  { id: '3', img: `${CDN_BASE}/shop/files/image_1234.png`, alt: '35мм пленочный контактный лист, Марокко 2025' },
  { id: '4', img: `${CDN_BASE}/shop/files/image_1218.png`, alt: '01:17 Ночной переход на север' },
  { id: '5', img: `${CDN_BASE}/shop/files/image_1232.png`, alt: 'Футболка с компасом — Вид на высокогорье' },
  { id: '6', img: `${CDN_BASE}/shop/files/image_1219.png`, alt: 'Футболка NØRTH Washed Tee, детали кроя' },
  { id: '7', img: `${CDN_BASE}/shop/files/image_1217.png`, alt: 'Ночная сессия в лукбуке' },
  { id: '8', img: `${CDN_BASE}/shop/files/image_1237.png`, alt: 'Студийный лукбук — Многослойное худи и деним' },
  { id: '9', img: `${CDN_BASE}/shop/files/image_1231.png`, alt: 'Одно небо. Разные места. 31°37\'N 8°01\'W' },
  { id: '10', img: `${CDN_BASE}/shop/files/image_1236.png`, alt: 'Архивный контур топографии 001' }
];

export const ASSETS = {
  heroVideo: `${CDN_BASE}/shop/t/5/assets/hero-bg.webm`,
  modelBaseTops: '/images/model-base.png',
  modelBaseBottoms: `${CDN_BASE}/shop/files/model-base_1.png`,
  modelTorso: '/images/model-base.png',
  jacketLeft: `${CDN_BASE}/shop/t/5/assets/left.png`,
  jacketRight: `${CDN_BASE}/shop/t/5/assets/right.png`,
  jacketInside: '/images/model-base.png'
};
