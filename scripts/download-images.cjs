const fs = require('fs');
const path = require('path');
const https = require('https');

// Directories to populate
const publicMenuDir = path.resolve(__dirname, '../public/assets/menu');
const srcMenuDir = path.resolve(__dirname, '../src/assets/menu');
const rootMenuDir = path.resolve(__dirname, '../assets/menu');

[publicMenuDir, srcMenuDir, rootMenuDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Existing local coffee images in ../assets
const existingAssets = {
  'm105': 'espresso.png',
  'm106': 'Cappuccino.png',
  'm107': 'latte.png',
  'm108': 'Café crème.png'
};

// Copy existing 4 coffee images if available
Object.entries(existingAssets).forEach(([id, filename]) => {
  const srcFile = path.resolve(__dirname, '../assets', filename);
  if (fs.existsSync(srcFile)) {
    [publicMenuDir, srcMenuDir, rootMenuDir].forEach(targetDir => {
      fs.copyFileSync(srcFile, path.join(targetDir, `${id}.png`));
    });
    console.log(`Copied existing local asset for ${id} (${filename})`);
  }
});

// Photo mapping for all other products
// Each photo is curated to accurately match the specific item
const photoMap = {
  // Crêpes sucrées
  'm1': 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80', // Chocolat
  'm2': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80', // Nutella
  'm3': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm4': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', // Oreo
  'm5': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', // Pistache
  'm6': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&auto=format&fit=crop&q=80', // Snickers
  'm7': 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=80', // Kinder
  'm8': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80', // Nutella, kiwi, banane
  'm9': 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=80', // Nutella mix

  // Pancakes
  'm10': 'https://images.unsplash.com/photo-1528207776546-38b975e533db?w=600&auto=format&fit=crop&q=80', // Chocolat
  'm11': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80', // Nutella
  'm12': 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm13': 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80', // Oreo
  'm14': 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&auto=format&fit=crop&q=80', // Pistache
  'm15': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80', // Snickers
  'm16': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80', // Kinder
  'm17': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80', // Nutella, Banane
  'm18': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80', // Nutella mix

  // Crêpes healthy (Protéinées)
  'm19': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80', // Crème choco'Nuts
  'm20': 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop&q=80', // Beurre de Cacahuète
  'm21': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80', // Crème Noisette
  'm22': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', // Crème de Pistache

  // Gaufres
  'm23': 'https://images.unsplash.com/photo-1562376552-0d160a2f1427?w=600&auto=format&fit=crop&q=80', // Chocolat
  'm24': 'https://images.unsplash.com/photo-1459789034005-ba29c5783491?w=600&auto=format&fit=crop&q=80', // Nutella
  'm25': 'https://images.unsplash.com/photo-1598214879202-d2fc1bcc6fe9?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm26': 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop&q=80', // Oreo
  'm27': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', // Pistache
  'm28': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80', // Snickers
  'm29': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80', // Kinder
  'm30': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80', // Nutella, Banane
  'm31': 'https://images.unsplash.com/photo-1562376552-0d160a2f1427?w=600&auto=format&fit=crop&q=80', // Nutella mix

  // Suppléments
  'm32': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&auto=format&fit=crop&q=80', // Fruits
  'm33': 'https://images.unsplash.com/photo-1509912760197-09d94943f550?w=600&auto=format&fit=crop&q=80', // Fruits secs

  // Mojito
  'm34': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', // Virgin Mojito
  'm35': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80', // Bleu
  'm36': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', // Fraise
  'm37': 'https://images.unsplash.com/photo-1546173159-315724a3169b?w=600&auto=format&fit=crop&q=80', // Ananas
  'm38': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', // Fruits de la passion
  'm39': 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80', // Fruits rouges
  'm40': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&auto=format&fit=crop&q=80', // Mangue

  // Smoothie
  'm41': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80', // Banane
  'm42': 'https://images.unsplash.com/photo-1553530979-f52ea2a12fe2?w=600&auto=format&fit=crop&q=80', // Fraise
  'm43': 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80', // Ananas
  'm44': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&auto=format&fit=crop&q=80', // Kiwi
  'm45': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&auto=format&fit=crop&q=80', // Mangue
  'm46': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&auto=format&fit=crop&q=80', // Fruits de la passions
  'm47': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80', // Fruits rouges

  // Jus frais
  'm48': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80', // Citronnade
  'm49': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80', // Citronnade aux amandes
  'm50': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80', // Fraise
  'm51': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80', // Jus de orange
  'm52': 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80', // Banane & Dattes
  'm53': 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80', // Kiwi
  'm54': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80', // Banane & Kiwi
  'm55': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', // THE BOSS

  // Viennoiserie
  'm56': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', // Croissant Nature
  'm57': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', // Pain au chocolat
  'm58': 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop&q=80', // Amandes
  'm59': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80', // Cake
  'm60': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80', // Cookies

  // Cheese Cake
  'm61': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80', // Spéculos
  'm62': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80', // Oreo
  'm63': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80', // Nutella
  'm64': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm65': 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=600&auto=format&fit=crop&q=80', // Snickers
  'm66': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', // Pistache

  // Glace
  'm67': 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80', // 1 Boule
  'm68': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80', // 2 Boules
  'm69': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=80', // 3 Boules

  // Café Glacé
  'm70': 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80', // Américain glacé
  'm71': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80', // Latte glacé
  'm72': 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80', // Latte glacé aromatisée

  // Frappuccino
  'm73': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', // Classique
  'm74': 'https://images.unsplash.com/photo-1579888944883-9b4860bcaeb3?w=600&auto=format&fit=crop&q=80', // Caramel, Noisette, Vanille
  'm75': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', // Kinder
  'm76': 'https://images.unsplash.com/photo-1579888944883-9b4860bcaeb3?w=600&auto=format&fit=crop&q=80', // Oreo
  'm77': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm78': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80', // Snickers

  // Chocolat Chaud ou Glacé
  'm79': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80', // Classique
  'm80': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80', // Caramel
  'm81': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80', // Noisette
  'm82': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', // Vanille
  'm83': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80', // Kinder
  'm84': 'https://images.unsplash.com/photo-1579888944883-9b4860bcaeb3?w=600&auto=format&fit=crop&q=80', // Oreo
  'm85': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', // Ferrero

  // Milk-shake
  'm86': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', // Classique
  'm87': 'https://images.unsplash.com/photo-1579888944883-9b4860bcaeb3?w=600&auto=format&fit=crop&q=80', // Caramel, Noisette, Vanille
  'm88': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80', // Kinder
  'm89': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', // Oreo
  'm90': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', // Ferrero
  'm91': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80', // Snickers
  'm92': 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80', // Chocolat blanc

  // Crêpes salées
  'm93': 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80', // Thon, fromage
  'm94': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80', // Jambon, fromage
  'm95': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80', // Tunisienne (thon, fromage, oeuf)
  'm96': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80', // The Boss (thon, fromage, oeuf, jambon, champignons)

  // Paninis
  'm97': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80', // Thon, fromage
  'm98': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80', // Jambon, fromage
  'm99': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80', // Jambon, saucisse, fromage
  'm100': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80', // The Boss (thon, jambon, fromage)

  // Omelettes
  'm101': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80', // Fromage
  'm102': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80', // Thon, fromage
  'm103': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80', // Jambon, fromage
  'm104': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80', // The Boss (fromage, thon, jambon, champignons)

  // Cafés Chauds (m105 to m108 already copied from local assets)
  'm109': 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80', // Macchiato

  // Thés & Infusions
  'm110': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80', // Thé à la menthe
  'm111': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', // Thé noir / vert

  // Eaux & Sodas
  'm112': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80', // Eau minérale
  'm113': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', // Eau gazeuse
  'm114': 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&auto=format&fit=crop&q=80', // Coca-Cola / Sprite

  // Formules Petit Déjeuner
  'm115': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80', // Petit Déjeuner Express
  'm116': 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&auto=format&fit=crop&q=80', // Petit Déjeuner The Boss
  'm117': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&auto=format&fit=crop&q=80'  // Petit Déjeuner Healthy
};

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error('Timeout'));
    });
  });
}

async function run() {
  const entries = Object.entries(photoMap);
  console.log(`Starting download of ${entries.length} images...`);
  
  const concurrency = 6;
  let successCount = 0;
  for (let i = 0; i < entries.length; i += concurrency) {
    const chunk = entries.slice(i, i + concurrency);
    await Promise.all(chunk.map(async ([id, url]) => {
      const targetPublic = path.join(publicMenuDir, `${id}.jpg`);
      const targetSrc = path.join(srcMenuDir, `${id}.jpg`);
      const targetRoot = path.join(rootMenuDir, `${id}.jpg`);

      try {
        await downloadUrl(url, targetPublic);
        fs.copyFileSync(targetPublic, targetSrc);
        fs.copyFileSync(targetPublic, targetRoot);
        successCount++;
        console.log(`[OK] (${successCount}/${entries.length}) ${id}.jpg`);
      } catch (err) {
        console.error(`[FAIL] ${id}:`, err.message);
      }
    }));
  }
  console.log(`All downloads finished. Total success: ${successCount}/${entries.length}`);
}

run();
