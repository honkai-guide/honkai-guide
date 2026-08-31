<template>
  <div>
        <ul class="changelog">
          <li>2026/08/29 - Happy early 10th Anniversary Honkai Impact 3rd.<br>
            - Added Senadina Astral Op<br>
            - Added Klein ELF<br>
            - Weather has a separate section<br>
            - Added Fire weather<br>
            - Added valkyrie ranks and synergies<br>
            - Added ELF/Astral Op stars/ranks<br>
            - Extra Modifiers has been recategorized<br>
            - Memorial Arena score search now supports SSS scores, and will generate links for both the base score and the +20% score<br>
            - Links are now displayed in a widget<br>
            - Timeframe search for CN abyss has been added; this is not supported by mobile platforms and is desktop only<br>
          </li>
          <li>2026/06/07 - Added Book of Fuxi ELF, Sirin ELF, Wings of Panacea Seele</li>
          <li>2026/05/18 - Added Bailu Youyun Astral Op</li>
          <li>2026/03/21 - Added Frost weather in modifiers</li>
          <li>2026/03/04 - Added Rice Cake and Dawnbearing Crescent</li>
          <li>2026/01/05 - Added Marut and Miss Espionage</li>
          <li>2025/10/24 - Added another alias for Extreme Conditions, added Dominance environment - Thanks Cyxo</li>
          <li>2025/10/22 - Added Hi! Love Elf and Meteoroid: Paros - Darius</li>
          <li>2025/09/17 - Added all S0+1 to modifiers, added another alias for Mysticism (bull) - Darius</li>
          <li>2025/08/21 - Added Litost EN name - Darius</li>
          <li>
            2025/07/17 - Added Coralie, Chenxue, Litost valk/op/boss (full EN names coming later),
            added Echoing and Extreme abyss weathers - Darius
          </li>
          <li>2025/05/29 - Added Sampo - Darius</li>
          <li>2025/05/08 - Added Planar Armament: Warped Spacetime Helia - Darius</li>
          <li>
            2025/03/22 - Added Blood Thorn Patch and Flux, added Lantern boss, added Peregrine Sword.
            Updated search terms prefixes (* and **) - Darius
          </li>
          <li>2025/02/03 - Add a bunch of translations for the 3rd guide website (2026/08/29 update:
            this has been removed, because the site has shut down) - ThatOneAmyFan</li>
          <li>
            2025/01/19 - Added SSS Sa boss, added Fiery Wishing Star (FWS), added Theresa Astral Op
            - Darius
          </li>
          <li>2024/12/25 - Updated name of new boss from New Kevin to Bygone Deliverance - Darius</li>
          <li>
            2024/12/07 - Added ignited modifier. Added DAFL for Senadina. Added Reign Solaris
            valkyrie and SSS/Abyss Kevin (will add Kevin's localized name later). Some acronyms
            return a lot of results, so all acronyms now have a * suffix, use this to quickly filter
            it down (e.g. RS* instead of RS) - Darius
          </li>
          <li>
            2024/11/15 - Added modifiers Stellar Crown and Starless. Added some boss nickanmes:
            bull, flower, and wolf. - Darius
          </li>
          <li>2024/10/26 - Added Vita boss and Sparkle valkyrie. - Darius</li>
          <li>
            2024/10/16 - Sorry for the delay, Sprout of Wishing has now been added. This completes
            the updates for v7.8. - Darius
          </li>
          <li>2024/09/05 - Added Lone Planetfarer/Vita. - Darius</li>
          <li>
            2024/08/12 - Removed some really old and no longer useful modifiers. Abyss weathers have
            been moved to the modifiers section. These will be useful for bosses with multiple
            weathers. More will be added later as needed. Added search term for "mobs", please use
            this if the Perilous stage is a mob stage. Added MHT-3C, the newest version of tank. -
            Darius
          </li>
          <li>2024/08/05 - Added Schicksal's Imperative Theresa and Valrahal boss - Darius</li>
          <li>
            2024/06/21 - To make finding mob boss stages easier, a few weathers have been added:
            Stellar (Astral Ring), Stardust, Symphony, and Bloodlust. These are all Senadina mob
            boss stages. Added Songque, Serapeum, and Meteoroid Fusion: Epernay. I wonder if they
            will ever fix the incorrect spelling in game: "Meteroid"? - Darius
          </li>
          <li>2024/05/05 - Added Mobius boss and Lantern. - Darius</li>
          <li>
            2024/03/21 - Added Beast of Sacrifice (Duonigue) and Raven bosses, added Thelema
            valkyrie. - Darius
          </li>
          <li>
            2024/03/01 - Added new search term for Flower boss, and added search terms for the
            Astral Ring weather SD mobs, Symphony weather SD mobs, and Stardust weather SD mobs.
            Added Helia and Coralie individual valks. 4.4 and after valkyries will now have
            battlesuit name, abbreviation, and character name, to make it easier for some players to
            find them. Example: Deepspace Anchor: First Light (FL, Senadina) 4.3 and below valkyries
            will also be updated to the same format, but in a future update. - Darius
          </li>
          <li>
            2024/02/05 - BIG UPDATE! Added Herrscher Trio, Senadina Trio, Senadina standalone, ELFs
            (Blade Durandal and newer only), and Collaborators. Helia and Coralie do not have
            standalone entries yet (not sure if they will). Also added Alien Guard's alternate name.
            V7.3 new bosses coming soon. Thanks Darius
          </li>
          <li>2024/01/15 - Added Fenghuang of Vicissitude, thanks Darius</li>
          <li>2023/11/26 - Added 7.1 boss EN name, Alien Guard - Supplement, thanks Darius</li>
          <li>
            2023/11/07 - Added abyss Flying Fish, v7.1 Cosmic Expression, v7.1 alien boss (EN name
            will be added later), updated SSS Heimdall CN search terms, thanks Darius
          </li>
          <li>2023/10/09 - Add Lunar Vow Crimson Love, thanks Darius</li>
          <li>2023/09/19 - Add Herrscher of Ice boss, thanks Darius</li>
          <li>2023/09/04 - Add Herrscher of Corruption Elysia, thanks Darius</li>
          <li>2023/08/26 - Add Miracle Magical Girl (Sirin), thanks Darius</li>
          <li>2023/08/05 - Update 6.8 boss name, thanks Darius</li>
          <li>
            2023/07/12 - Added beta 6.8 boss and Herrscher of Rebirth; english name for boss will be
            updated when GLB beta starts, thanks Darius
          </li>
          <li>2023/06/18 - Update 6.7 boss name, add Beta Test modifier, thanks Darius</li>
          <li>
            2023/06/18 - Remove future MA/Abyss lineups pages, as they're not updated anymore :(
          </li>
          <li>2023/05/22 - 6.6 and 6.7 valk and boss names added, thanks Darius</li>
          <li>2023/05/05 - Small valk name fixes, thanks Pootz</li>
          <li>
            2023/04/13 - Add VQ gear and search, add slime boss search, thanks Pootz, fragile, and
            Joshie
          </li>
          <li>2023/04/01 - Add Hoo and Hofi gear, thanks Pootz</li>
          <li>2023/03/10 - Add Kevin and Husk: Existentialism bosses, thanks fragile and Pootz</li>
          <li>2023/02/10 - Add HoO and HoFi, Echo PRI, HoTR gear, thanks Pootz</li>
          <li>2023/01/17 - Add Husk: Mysticism boss search term, thanks Gwent and Ryuu</li>
          <li>2023/01/10 - Bunch of new search terms and equipment, thanks Pootz and eyee</li>
          <li>2022/12/11 - Updated scoring for SSS bosses, thanks HauNguyenThe</li>
          <li>2022/11/25 - Add Opaque Shadow and Nocturnal Knight, thanks Cyxo</li>
          <li>2022/11/06 - Sus search term, gear, Willows stig, SoE key, thanks Pootz</li>
          <li>2022/10/03 - Add Vill-V, HoH equips, thanks Pootz</li>
          <li>
            2022/08/17 - Add Kosma boss, thanks Neal/Gwent, include Vill-V in valkyries, updated
            3rdguide bookmarklet
          </li>
          <li>2022/07/23 - Updated 3rdguide bookmarklet URL and search terms w/ new valks</li>
          <li>2022/07/21 - Add Seven Thunders PRI to calc, thanks Pootz</li>
          <li>2022/07/04 - Add Vill-V boss and Griseo valk 😭, thanks TencentDimepiece</li>
          <li>2022/06/29 - Add option to use Google to search bilibili, thanks TencentDimepiece</li>
          <li>
            2022/05/26 - Add Aponia weapons, Handel and Zeno stigs, Echo of Paradise, thanks Pootz
          </li>
          <li>2022/05/17 - Add Sushang and Husk search terms, thanks HauNguyenThe</li>
          <li>2022/04/30 - Add Aponia and Eden search terms, thanks HauNguyenThe</li>
          <li>2022/04/30 - Add Felis search term, thanks Pootz</li>
          <li>2022/04/12 - Add Felis gear, thanks Pootz</li>
          <li>2022/04/04 - Add Q-Manifold modifier, thanks Reinbex</li>
          <li>2022/03/24 - Add Elysia to bosses</li>
          <li>2022/03/13 - Add Otto to bosses and no Paganini modifier, thanks Pootz</li>
          <li>2022/03/13 - Add Spina Astera gear to calc, thanks Pootz</li>
          <li>2022/02/25 - Add PE gear to calc, thanks Pootz</li>
          <li>2022/02/25 - Add Spina Astera to search and 3rdguide bookmark, thanks Toast</li>
          <li>2022/02/01 - Update HoD search translations, thanks Toast</li>
          <li>2022/02/01 - Add Palatinus Equinox to search and 3rdguide bookmark, thanks Pootz</li>
          <li>2022/01/24 - Add no Turg and no Zhenyi modifiers, thanks Pootz</li>
          <li>2022/01/19 - Add Silverwing equips to gear calc, thanks Pootz</li>
          <li>2022/01/19 - Add Silverwing to search and 3rdguide bookmarklet</li>
          <li>2021/12/12 - Add toggle for SSS boss</li>
          <li>2021/12/10 - Update 3rdguide bookmark with more abyss translations</li>
          <li>2021/11/18 - Add Paganini stig to calc, thanks Pootz</li>
          <li>2021/11/18 - Add Carole to search and 3rdguide bookmark</li>
          <li>2021/10/24 - Add mobisus and raven gear to calc, thanks Pootz</li>
          <li>2021/10/20 - Update 3rdguide bookmark with abyss translations</li>
          <li>2021/10/19 - Add Herrscher of Dominance boss</li>
          <li>2021/10/19 - Add Mobisus, Raven to searcher, 3rdguide bookmarklet</li>
          <li>2021/09/23 - Add SSS scores to scores page and search sidebar</li>
          <li>2021/09/20 - Add Elysia stigs, bow, and Abyss Flower PRI to calc, thanks Pootz</li>
          <li>2021/09/04 - Add Elysia valk, thanks Aria</li>
          <li>2021/08/29 - Add Poe and Acheron to gear calc, thanks Pootz</li>
          <li>2021/08/21 - Add Elysian Realm modifier, thanks Bento and Eku</li>
          <li>2021/08/18 - Add HoFS weapon and stigs to gear calc, thanks Pootz</li>
          <li>2021/08/17 - Update fix 3rdguide script with new translations and UI fixes</li>
          <li>2021/08/16 - Add HoFS abbreviation, thanks Jun</li>
          <li>2021/08/07 - Fix HoS translation, thanks Jun</li>
          <li>2021/07/25 - Add HoFS and MHT-3B (new tank), updated fix 3rdguide script</li>
          <li>2021/06/09 - Add Andrius boss and Fischl valk, update fix 3rdguide script</li>
          <li>2021/05/13 - Add Kasumi boss and Starchasm Nyx valk, update fix 3rdguide script</li>
          <li>2021/04/24 - Add Haxxor Bunny valk, HoS boss, update fix 3rdguide script</li>
          <li>2021/02/16 - Add Blazing Hope valk, update fix 3rdguide script</li>
          <li>2021/02/15 - Add HoS, thanks Idol Party discord!</li>
          <li>2021/01/01 - Happy new year! Add Couatl boss, thanks Charlie</li>
          <li>2020/12/16 - Add DA (thanks Echidna), update 3rd guide script, nicknames for HoV</li>
          <li>2020/12/16 - Add Rimestar boss, adjust Seele suit names, thanks Echidona</li>
          <li>2020/11/07 - Add FTD to fix 3rd guide script</li>
          <li>2020/11/07 - Add alternate name for FTD</li>
          <li>2020/09/22 - Add Fervent Tempo Delta valk</li>
          <li>2020/09/16 - Add Nihilus Husk boss</li>
          <li>2020/09/15 - Add Nirvana to modifiers</li>
          <li>2020/09/12 - Add DS to 3rd guide bookmarklet</li>
          <li>2020/09/04 - Add DS valk</li>
          <li>2020/08/30 - Add exalted abyss modifier</li>
          <li>2020/08/30 - Update Fix 3rd guide bookmarklet with Huodou and FR, add FR to valks</li>
          <li>2020/08/24 - Add Huodou boss</li>
          <li>2020/08/19 - Add SS lead skill as modifier, thanks Toast</li>
          <li>2020/08/19 - Add SS LE as modifier</li>
          <li>2020/08/19 - Add no Shuijing search modifier, thanks Younggeddes</li>
          <li>2020/08/06 - Add Masters MA to options</li>
          <li>2020/08/04 - Add new nickname for DJ, thanks Toast</li>
          <li>2020/07/28 - Update Fix 3rd guide bookmarklet with SA and HoT</li>
          <li>2020/06/08 - Add BKE, made some URL generation improvements.</li>
          <li>2020/06/02 - Add Starlit Astrologos (Zhuge) to valks</li>
          <li>2020/05/25 - Update fix 3rd guide bookmarklet</li>
          <li>2020/05/01 - Add death web + gigant abyss boss</li>
          <li>2020/05/02 - Add soul link abyss boss</li>
          <li>2020/04/24 - Add real name of S Durandal</li>
          <li>2020/04/20 - Add projected boss schedule</li>
          <li>2020/04/06 - Another nickname for Hephaestus</li>
          <li>2020/04/04 - Added double wendy abyss boss</li>
          <li>2020/04/01 - Added emperor abyss boss</li>
          <li>2020/03/31 - Added "S Durandal"</li>
          <li>2020/03/14 - Update fix 3rd guide bookmarklet and add VG</li>
          <li>2020/03/07 - Delet 3.6 boss pool</li>
          <li>2020/03/04 - Upgraded Fix 3rd guide bookmarklet</li>
          <li>2020/02/01 - Add Azure Empyrea</li>
          <li>2020/01/07 - Increase granularity of scores by time</li>
          <li>2020/01/06 - Added HF</li>
          <li>2019/12/15 - Actually we following CN bosses</li>
          <li>2019/12/01 - Added 3.6 boss pool to sidebar</li>
          <li>2019/10/22 - Added quantum ball name</li>
          <li>2019/10/22 - Added quantum ball and both Seeles</li>
          <li>2019/10/17 - Change scores by time to every 5 seconds due to EX MA...</li>
          <li>2019/10/12 - Make TP also autocomplete to VE</li>
          <li>2019/10/10 - Added Fix 3rd guide bookmarklet!</li>
          <li>2019/10/05 - Added AKA to valk list</li>
          <li>2019/09/21 - Added scores by time sidebar</li>
          <li>2019/09/03 - Added Roza</li>
          <li>2019/09/02 - Added EX MA</li>
          <li>2019/09/02 - Added MR-06X Hephaestus</li>
          <li>2019/08/19 - Added MHT-3 Pax</li>
          <li>2019/08/11 - Added AKA boss</li>
          <li>2019/08/10 - Added Void Drifter valk, Q-Singularis modifier</li>
        </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
// Vuetify's reset zeroes list padding, so the bullets need it back. This lives here
// rather than in the page: the rule used to sit in Search.vue's (global, lazy-loaded)
// style block, which would not be loaded at all on a direct visit to /changelog.
.changelog {
  padding-left: 1.5rem;
}

// Entries are dense and multi-line; space them apart so they read as separate items.
.changelog li {
  margin-bottom: 0.75rem;
}
</style>
