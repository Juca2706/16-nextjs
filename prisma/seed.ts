// import 'dotenv/config'
// import { PrismaClient } from '../app/generated/prisma'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { neon } from '@neondatabase/serverless'

// const sql = neon(process.env.DATABASE_URL!)
// const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
// const prisma = new PrismaClient({ adapter })

// async function main() {
//   console.log('🌱 Starting seed...')

//   // 1. Limpiar base de datos (Importante para evitar IDs duplicados)
//   await prisma.game.deleteMany()
//   await prisma.console.deleteMany()

//   // Resetear los ID's
//   await prisma.$executeRaw`ALTER SEQUENCE "Console_id_seq" RESTART WITH 1;`
//   await prisma.$executeRaw`ALTER SEQUENCE "Game_id_seq" RESTART WITH 1;`

//   console.log('🧹 Database cleaned')

//   // 2. Crear Consolas (Las 5 tuyas + 20 nuevas = 25 total)
//   await prisma.console.createMany({
//     data: [
//       // --- TUS ORIGINALES ---
//       { name: 'PlayStation 5', manufacturer: 'Sony Interactive Entertainment', releasedate: new Date('2020-11-12'), description: '4K gaming at 120Hz and ray tracing support.' },
//       { name: 'Xbox Series X', manufacturer: 'Microsoft', releasedate: new Date('2020-11-10'), description: 'High-performance console, 12 TFLOPS of power.' },
//       { name: 'Nintendo Switch OLED Model', manufacturer: 'Nintendo', releasedate: new Date('2021-10-08'), description: 'Hybrid console with a vibrant OLED screen.' },
//       { name: 'Nintendo Switch 2', manufacturer: 'Nintendo', releasedate: new Date('2025-06-05'), description: 'The successor with enhanced performance.' },
//       { name: 'Steam Deck OLED', manufacturer: 'Valve', releasedate: new Date('2023-11-16'), description: 'Powerful handheld gaming computer.' },
//       // --- NUEVAS CONSOLAS ---
//       { name: 'PlayStation 4', manufacturer: 'Sony', releasedate: new Date('2013-11-15'), description: 'The home of incredible exclusives.' },
//       { name: 'PlayStation 2', manufacturer: 'Sony', releasedate: new Date('2000-03-04'), description: 'The best-selling console of all time.' },
//       { name: 'PlayStation 1', manufacturer: 'Sony', releasedate: new Date('1994-12-03'), description: 'Where 3D gaming began for Sony.' },
//       { name: 'Xbox 360', manufacturer: 'Microsoft', releasedate: new Date('2005-11-22'), description: 'Defined the HD era of gaming.' },
//       { name: 'Xbox One', manufacturer: 'Microsoft', releasedate: new Date('2013-11-22'), description: 'All-in-one entertainment system.' },
//       { name: 'Super Nintendo', manufacturer: 'Nintendo', releasedate: new Date('1990-11-21'), description: 'The 16-bit masterpiece.' },
//       { name: 'Nintendo 64', manufacturer: 'Nintendo', releasedate: new Date('1996-06-23'), description: 'Revolutionary 3D and multiplayer.' },
//       { name: 'NES', manufacturer: 'Nintendo', releasedate: new Date('1983-07-15'), description: 'The icon that saved gaming.' },
//       { name: 'GameCube', manufacturer: 'Nintendo', releasedate: new Date('2001-09-14'), description: 'Small but incredibly powerful.' },
//       { name: 'Wii', manufacturer: 'Nintendo', releasedate: new Date('2006-11-19'), description: 'Motion controls for everyone.' },
//       { name: 'Sega Genesis', manufacturer: 'Sega', releasedate: new Date('1988-10-29'), description: 'Does what Nintendon\'t.' },
//       { name: 'Sega Dreamcast', manufacturer: 'Sega', releasedate: new Date('1998-11-27'), description: 'Sega\'s final, visionary console.' },
//       { name: 'Game Boy', manufacturer: 'Nintendo', releasedate: new Date('1989-04-21'), description: 'The king of handhelds.' },
//       { name: 'PSP', manufacturer: 'Sony', releasedate: new Date('2004-12-12'), description: 'Portable power in your hands.' },
//       { name: 'Nintendo DS', manufacturer: 'Nintendo', releasedate: new Date('2004-11-21'), description: 'Dual screen innovation.' },
//       { name: 'Atari 2600', manufacturer: 'Atari', releasedate: new Date('1977-09-11'), description: 'The pioneer of home gaming.' },
//       { name: 'Neo Geo', manufacturer: 'SNK', releasedate: new Date('1990-04-26'), description: 'Arcade quality at home.' },
//       { name: 'Sega Saturn', manufacturer: 'Sega', releasedate: new Date('1994-11-22'), description: '2D powerhouse and arcade ports.' },
//       { name: 'Game Boy Advance', manufacturer: 'Nintendo', releasedate: new Date('2001-03-21'), description: 'The SNES in your pocket.' },
//       { name: '3DS', manufacturer: 'Nintendo', releasedate: new Date('2011-02-26'), description: 'Gaming in three dimensions.' }
//     ],
//   })

//   // 3. Obtener IDs para relacionar Juegos
//   const allC = await prisma.console.findMany()
//   const findId = (name: string) => allC.find(c => c.name === name)?.id

//   // 4. Crear Juegos (Los 10 tuyos + 80 nuevos = 90 total)
//   const gamesData = [
//     // --- TUS 10 ORIGINALES ---
//     { title: 'God of War Ragnarök', developer: 'Santa Monica', releasedate: new Date('2022-11-09'), price: 69.99, genre: 'Action', description: 'Kratos and Atreus journey.', console_id: findId('PlayStation 5') },
//     { title: 'Halo Infinite', developer: '343 Industries', releasedate: new Date('2021-12-08'), price: 59.99, genre: 'FPS', description: 'Master Chief returns.', console_id: findId('Xbox Series X') },
//     { title: 'Zelda: Tears of the Kingdom', developer: 'Nintendo', releasedate: new Date('2023-05-12'), price: 69.99, genre: 'Adventure', description: 'Explore Hyrule sky.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Elden Ring', developer: 'FromSoftware', releasedate: new Date('2022-02-25'), price: 59.99, genre: 'RPG', description: 'Fantasy RPG adventure.', console_id: findId('PlayStation 5') },
//     { title: 'Forza Horizon 5', developer: 'Playground Games', releasedate: new Date('2021-11-09'), price: 59.99, genre: 'Racing', description: 'Mexico open world.', console_id: findId('Xbox Series X') },
//     { title: 'Pokémon Scarlet', developer: 'Game Freak', releasedate: new Date('2022-11-18'), price: 59.99, genre: 'RPG', description: 'Paldea region journey.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Spider-Man 2', developer: 'Insomniac', releasedate: new Date('2023-10-20'), price: 69.99, genre: 'Action', description: 'Peter and Miles vs Venom.', console_id: findId('PlayStation 5') },
//     { title: 'Starfield', developer: 'Bethesda', releasedate: new Date('2023-09-06'), price: 69.99, genre: 'RPG', description: 'Space exploration.', console_id: findId('Xbox Series X') },
//     { title: 'Mario Kart 9', developer: 'Nintendo', releasedate: new Date('2025-12-01'), price: 59.99, genre: 'Racing', description: 'The future of racing.', console_id: findId('Nintendo Switch 2') },
//     { title: 'Hogwarts Legacy', developer: 'Avalanche', releasedate: new Date('2023-02-10'), price: 59.99, genre: 'RPG', description: 'Wizarding world adventure.', console_id: findId('Steam Deck OLED') },

//     // --- NUEVOS JUEGOS (Bloque de ejemplo, repetido para llegar a 80) ---
//     { title: 'Bloodborne', developer: 'FromSoftware', releasedate: new Date('2015-03-24'), price: 19.99, genre: 'Action RPG', description: 'Hunt in Yharnam.', console_id: findId('PlayStation 4') },
//     { title: 'The Last of Us Part II', developer: 'Naughty Dog', releasedate: new Date('2020-06-19'), price: 39.99, genre: 'Action', description: 'Emotional journey.', console_id: findId('PlayStation 4') },
//     { title: 'GTA San Andreas', developer: 'Rockstar', releasedate: new Date('2004-10-26'), price: 14.99, genre: 'Action', description: 'CJ story.', console_id: findId('PlayStation 2') },
//     { title: 'Metal Gear Solid 3', developer: 'Konami', releasedate: new Date('2004-11-17'), price: 19.99, genre: 'Stealth', description: 'Snake Eater.', console_id: findId('PlayStation 2') },
//     { title: 'Super Mario World', developer: 'Nintendo', releasedate: new Date('1990-11-21'), price: 0, genre: 'Platformer', description: 'SNES Classic.', console_id: findId('Super Nintendo') },
//     { title: 'The Legend of Zelda: Ocarina', developer: 'Nintendo', releasedate: new Date('1998-11-21'), price: 0, genre: 'Adventure', description: 'N64 masterpiece.', console_id: findId('Nintendo 64') },
//     { title: 'GoldenEye 007', developer: 'Rare', releasedate: new Date('1997-08-25'), price: 0, genre: 'FPS', description: 'Bond on N64.', console_id: findId('Nintendo 64') },
//     { title: 'Sonic the Hedgehog 2', developer: 'Sega', releasedate: new Date('1992-11-21'), price: 0, genre: 'Platformer', description: 'Speed on Genesis.', console_id: findId('Sega Genesis') },
//     { title: 'Final Fantasy VII', developer: 'Square', releasedate: new Date('1997-01-31'), price: 9.99, genre: 'RPG', description: 'Cloud vs Sephiroth.', console_id: findId('PlayStation 1') },
//     { title: 'Resident Evil 2', developer: 'Capcom', releasedate: new Date('1998-01-21'), price: 9.99, genre: 'Horror', description: 'Raccoon City survival.', console_id: findId('PlayStation 1') },
//     { title: 'Super Mario Bros 3', developer: 'Nintendo', releasedate: new Date('1988-10-23'), price: 0, genre: 'Platformer', description: 'NES legend.', console_id: findId('NES') },
//     { title: 'Metroid Dread', developer: 'MercurySteam', releasedate: new Date('2021-10-08'), price: 59.99, genre: 'Action', description: 'Samus returns.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Red Dead Redemption 2', developer: 'Rockstar', releasedate: new Date('2018-10-26'), price: 59.99, genre: 'Action', description: 'The wild west ends.', console_id: findId('PlayStation 4') },
//     { title: 'Ghost of Tsushima', developer: 'Sucker Punch', releasedate: new Date('2020-07-17'), price: 59.99, genre: 'Action', description: 'Samurai island.', console_id: findId('PlayStation 4') },
//     { title: 'Horizon Forbidden West', developer: 'Guerrilla', releasedate: new Date('2022-02-18'), price: 69.99, genre: 'Action', description: 'Aloy in the west.', console_id: findId('PlayStation 5') },
//     { title: 'Baldur\'s Gate 3', developer: 'Larian', releasedate: new Date('2023-08-03'), price: 69.99, genre: 'RPG', description: 'D&D adventure.', console_id: findId('PlayStation 5') },
//     { title: 'Silent Hill 2', developer: 'Konami', releasedate: new Date('2001-09-24'), price: 19.99, genre: 'Horror', description: 'Mary...', console_id: findId('PlayStation 2') },
//     { title: 'Kingdom Hearts II', developer: 'Square Enix', releasedate: new Date('2005-12-22'), price: 19.99, genre: 'RPG', description: 'Sora and Disney.', console_id: findId('PlayStation 2') },
//     { title: 'Street Fighter II', developer: 'Capcom', releasedate: new Date('1992-06-10'), price: 0, genre: 'Fighting', description: 'SNES arcade.', console_id: findId('Super Nintendo') },
//     { title: 'Chrono Trigger', developer: 'Square', releasedate: new Date('1995-03-11'), price: 0, genre: 'RPG', description: 'Time travel.', console_id: findId('Super Nintendo') },
//     { title: 'Mario Kart 64', developer: 'Nintendo', releasedate: new Date('1996-12-14'), price: 0, genre: 'Racing', description: 'Multiplayer fun.', console_id: findId('Nintendo 64') },
//     { title: 'Banjo-Kazooie', developer: 'Rare', releasedate: new Date('1998-06-29'), price: 0, genre: 'Platformer', description: 'Bear and bird.', console_id: findId('Nintendo 64') },
//     { title: 'Castlevania: SOTN', developer: 'Konami', releasedate: new Date('1997-03-20'), price: 14.99, genre: 'Action', description: 'Alucard story.', console_id: findId('PlayStation 1') },
//     { title: 'Metal Gear Solid', developer: 'Konami', releasedate: new Date('1998-09-03'), price: 14.99, genre: 'Stealth', description: 'Solid Snake.', console_id: findId('PlayStation 1') },
//     { title: 'The Legend of Zelda (NES)', developer: 'Nintendo', releasedate: new Date('1986-02-21'), price: 0, genre: 'Adventure', description: 'The first Link.', console_id: findId('NES') },
//     { title: 'Punch-Out!!', developer: 'Nintendo', releasedate: new Date('1987-09-18'), price: 0, genre: 'Sports', description: 'Little Mac.', console_id: findId('NES') },
//     { title: 'Final Fantasy X', developer: 'Square', releasedate: new Date('2001-07-19'), price: 19.99, genre: 'RPG', description: 'Tidus and Yuna.', console_id: findId('PlayStation 2') },
//     { title: 'God of War II', developer: 'Santa Monica', releasedate: new Date('2007-03-13'), price: 14.99, genre: 'Action', description: 'Kratos vs Zeus.', console_id: findId('PlayStation 2') },
//     { title: 'Shadow of the Colossus', developer: 'Team Ico', releasedate: new Date('2005-10-18'), price: 19.99, genre: 'Adventure', description: 'Giant hunters.', console_id: findId('PlayStation 2') },
//     { title: 'Ratchet & Clank', developer: 'Insomniac', releasedate: new Date('2002-11-04'), price: 14.99, genre: 'Action', description: 'Space gadgets.', console_id: findId('PlayStation 2') },
//     { title: 'Uncharted 4', developer: 'Naughty Dog', releasedate: new Date('2016-05-10'), price: 19.99, genre: 'Action', description: 'Drake final.', console_id: findId('PlayStation 4') },
//     { title: 'Bloodborne 2 (Fan Made)', developer: 'FromSoftware', releasedate: new Date('2026-01-01'), price: 69.99, genre: 'Action', description: 'Imaginary sequel.', console_id: findId('PlayStation 5') },
//     { title: 'Mario Kart 8 Deluxe', developer: 'Nintendo', releasedate: new Date('2017-04-28'), price: 59.99, genre: 'Racing', description: 'Ultimate kart.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Splatoon 3', developer: 'Nintendo', releasedate: new Date('2022-09-09'), price: 59.99, genre: 'Shooter', description: 'Inklings everywhere.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Cyberpunk 2077', developer: 'CD Projekt', releasedate: new Date('2020-12-10'), price: 49.99, genre: 'RPG', description: 'Night City.', console_id: findId('PlayStation 5') },
//     { title: 'Tekken 8', developer: 'Bandai Namco', releasedate: new Date('2024-01-26'), price: 69.99, genre: 'Fighting', description: 'Iron Fist.', console_id: findId('PlayStation 5') },
//     { title: 'Street Fighter 6', developer: 'Capcom', releasedate: new Date('2023-06-02'), price: 59.99, genre: 'Fighting', description: 'New era.', console_id: findId('PlayStation 5') },
//     { title: 'Alan Wake 2', developer: 'Remedy', releasedate: new Date('2023-10-27'), price: 59.99, genre: 'Horror', description: 'The dark place.', console_id: findId('PlayStation 5') },
//     { title: 'Hi-Fi RUSH', developer: 'Tango', releasedate: new Date('2023-01-25'), price: 29.99, genre: 'Action', description: 'Beat-based combat.', console_id: findId('Xbox Series X') },
//     { title: 'Gears 5', developer: 'The Coalition', releasedate: new Date('2019-09-10'), price: 39.99, genre: 'TPS', description: 'Kait journey.', console_id: findId('Xbox Series X') },
//     { title: 'Forza Motorsport', developer: 'Turn 10', releasedate: new Date('2023-10-10'), price: 69.99, genre: 'Racing', description: 'Real racing.', console_id: findId('Xbox Series X') },
//     { title: 'Sea of Thieves', developer: 'Rare', releasedate: new Date('2018-03-20'), price: 39.99, genre: 'Adventure', description: 'Pirate life.', console_id: findId('Xbox Series X') },
//     { title: 'Sonic Frontiers', developer: 'Sega', releasedate: new Date('2022-11-08'), price: 59.99, genre: 'Action', description: 'Open zone speed.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Metroid Prime Remastered', developer: 'Nintendo', releasedate: new Date('2023-02-08'), price: 39.99, genre: 'Adventure', description: 'Samus in 3D.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Smash Bros Ultimate', developer: 'Nintendo', releasedate: new Date('2018-12-07'), price: 59.99, genre: 'Fighting', description: 'Everyone is here.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Mario Party Superstars', developer: 'Nintendo', releasedate: new Date('2021-10-29'), price: 59.99, genre: 'Party', description: 'Classic boards.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Monster Hunter Rise', developer: 'Capcom', releasedate: new Date('2021-03-26'), price: 39.99, genre: 'Action', description: 'Hunt with Palamutes.', console_id: findId('Nintendo Switch OLED Model') },
//     { title: 'Star Fox 64', developer: 'Nintendo', releasedate: new Date('1997-04-27'), price: 0, genre: 'Shooter', description: 'Barrel roll.', console_id: findId('Nintendo 64') },
//     { title: 'Perfect Dark', developer: 'Rare', releasedate: new Date('2000-05-22'), price: 0, genre: 'FPS', description: 'Joanna Dark.', console_id: findId('Nintendo 64') },
//     { title: 'Paper Mario', developer: 'Intelligent', releasedate: new Date('2000-08-11'), price: 0, genre: 'RPG', description: 'Paper adventure.', console_id: findId('Nintendo 64') },
//     { title: 'Majora\'s Mask', developer: 'Nintendo', releasedate: new Date('2000-04-27'), price: 0, genre: 'Adventure', description: '3 days left.', console_id: findId('Nintendo 64') },
//     { title: 'F-Zero X', developer: 'Nintendo', releasedate: new Date('1998-07-14'), price: 0, genre: 'Racing', description: 'Super speed.', console_id: findId('Nintendo 64') },
//     { title: 'Streets of Rage 2', developer: 'Sega', releasedate: new Date('1992-12-20'), price: 0, genre: 'Action', description: 'Beat em up king.', console_id: findId('Sega Genesis') },
//     { title: 'Phantasy Star IV', developer: 'Sega', releasedate: new Date('1993-12-17'), price: 0, genre: 'RPG', description: 'Genesis finale.', console_id: findId('Sega Genesis') },
//     { title: 'Earthworm Jim', developer: 'Shiny', releasedate: new Date('1994-08-02'), price: 0, genre: 'Action', description: 'Crazy worm.', console_id: findId('Sega Genesis') },
//     { title: 'Mortal Kombat II', developer: 'Midway', releasedate: new Date('1993-09-13'), price: 0, genre: 'Fighting', description: 'Fatalities.', console_id: findId('Sega Genesis') },
//     { title: 'Castlevania III', developer: 'Konami', releasedate: new Date('1989-12-22'), price: 0, genre: 'Action', description: 'Dracula curse.', console_id: findId('NES') },
//     { title: 'Ninja Gaiden', developer: 'Tecmo', releasedate: new Date('1988-12-09'), price: 0, genre: 'Action', description: 'Hardcore ninja.', console_id: findId('NES') },
//     { title: 'Mega Man 2', developer: 'Capcom', releasedate: new Date('1988-12-24'), price: 0, genre: 'Action', description: 'Blue bomber.', console_id: findId('NES') },
//     { title: 'Kirby Dream Land', developer: 'HAL', releasedate: new Date('1992-04-27'), price: 0, genre: 'Platformer', description: 'Kirby first.', console_id: findId('Game Boy') },
//     { title: 'Pokémon Red', developer: 'Game Freak', releasedate: new Date('1996-02-27'), price: 0, genre: 'RPG', description: 'Catch em all.', console_id: findId('Game Boy') },
//     { title: 'Zelda: Link Awakening', developer: 'Nintendo', releasedate: new Date('1993-06-06'), price: 0, genre: 'Adventure', description: 'Koholint island.', console_id: findId('Game Boy') },
//     { title: 'Metroid II', developer: 'Nintendo', releasedate: new Date('1991-11-01'), price: 0, genre: 'Action', description: 'Return of Samus.', console_id: findId('Game Boy') },
//     { title: 'Tetris', developer: 'Nintendo', releasedate: new Date('1989-06-14'), price: 0, genre: 'Puzzle', description: 'Classic blocks.', console_id: findId('Game Boy') },
//     { title: 'Pokémon Crystal', developer: 'Game Freak', releasedate: new Date('2000-12-14'), price: 0, genre: 'RPG', description: 'Johto journey.', console_id: findId('Game Boy') },
//     { title: 'Mario Land 2', developer: 'Nintendo', releasedate: new Date('1992-10-21'), price: 0, genre: 'Platformer', description: '6 golden coins.', console_id: findId('Game Boy') },
//     { title: 'Donkey Kong Land', developer: 'Rare', releasedate: new Date('1995-06-26'), price: 0, genre: 'Platformer', description: 'DK on handheld.', console_id: findId('Game Boy') },
//     { title: 'Wario Land', developer: 'Nintendo', releasedate: new Date('1994-01-21'), price: 0, genre: 'Platformer', description: 'Wario first adventure.', console_id: findId('Game Boy') },
//     { title: 'Dr Mario', developer: 'Nintendo', releasedate: new Date('1990-07-27'), price: 0, genre: 'Puzzle', description: 'Doctor puzzle.', console_id: findId('Game Boy') },
//     { title: 'Megaman V', developer: 'Capcom', releasedate: new Date('1994-07-22'), price: 0, genre: 'Action', description: 'Stardroids fight.', console_id: findId('Game Boy') },
//     { title: 'DuckTales GB', developer: 'Capcom', releasedate: new Date('1990-09-21'), price: 0, genre: 'Platformer', description: 'Scrooge on the go.', console_id: findId('Game Boy') },
//     { title: 'Pac-Man GB', developer: 'Namco', releasedate: new Date('1990-11-16'), price: 0, genre: 'Arcade', description: 'Classic eating.', console_id: findId('Game Boy') },
//     { title: 'Castlevania Adventure', developer: 'Konami', releasedate: new Date('1989-10-27'), price: 0, genre: 'Action', description: 'Belmont on GB.', console_id: findId('Game Boy') },
//     { title: 'Spyro Year of Dragon', developer: 'Insomniac', releasedate: new Date('2000-10-24'), price: 14.99, genre: 'Platformer', description: 'Spyro 3.', console_id: findId('PlayStation 1') },
//     { title: 'Crash Team Racing', developer: 'Naughty Dog', releasedate: new Date('1999-09-30'), price: 14.99, genre: 'Racing', description: 'Best PS1 kart.', console_id: findId('PlayStation 1') },
//     { title: 'Medievil', developer: 'Sony', releasedate: new Date('1998-10-01'), price: 14.99, genre: 'Action', description: 'Sir Dan returns.', console_id: findId('PlayStation 1') },
//     { title: 'Silent Hill', developer: 'Konami', releasedate: new Date('1999-01-31'), price: 19.99, genre: 'Horror', description: 'The first nightmare.', console_id: findId('PlayStation 1') },
//     { title: 'Dino Crisis', developer: 'Capcom', releasedate: new Date('1999-07-01'), price: 14.99, genre: 'Horror', description: 'Zombies but dinos.', console_id: findId('PlayStation 1') },
//     { title: 'Syphon Filter', developer: 'Sony', releasedate: new Date('1999-02-17'), price: 9.99, genre: 'Stealth', description: 'Gabe Logan.', console_id: findId('PlayStation 1') },
//     { title: 'Spider-Man PS1', developer: 'Neversoft', releasedate: new Date('2000-08-30'), price: 9.99, genre: 'Action', description: 'Spidey classic.', console_id: findId('PlayStation 1') }
//   ]

//   // 5. Insertar Juegos uno a uno con el bucle for
//   for (const game of gamesData) {
//     if (!game.console_id) continue
//     await prisma.game.create({ data: game as any })
//   }

  
//   console.log(`🕹️ ${gamesData.length} games seeded`)
//   console.log('✅ Seed completed successfully')
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })