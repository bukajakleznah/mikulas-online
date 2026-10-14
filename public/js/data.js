// Jediné místo pro obsah, který se bude měnit každý rok.
window.MRO = {
  // --- aktuální ročník ---
  year: 2026,
  // "soon" = registrace ještě nespuštěna, "open" = otevřená, "closed" = uzavřena
  status: "open",
  registrationUrl: "https://rbr.onlineracing.cz/tour/cc96f38bbb105972d36e9e4a9c3c3466",
  statusText: {
    soon: "Registrace bude brzy spuštěna. Sleduj tuto stránku.",
    open: "6. ročník · 21.–27. 11. 2026",
    closed: "Registrace je uzavřena."
  },

  // --- PDF u aktuálního ročníku: nahrát do public/docs/ a doplnit url, např. "docs/zu-2026.pdf" ---
  docs: [
    { title: "Zvláštní ustanovení", url: "" },
    { title: "Harmonogram", url: "" },
    { title: "Povinné textury", url: "" }
  ],

  // --- historie / timeline z roku 2020 ---
  timeline: [
    ["19. 4. 2020", "Začátek projektu. Domluvená tvorba RZ Dostihovka s Myrou43 a úprava RZ Zádveřice do podoby Mikuláše s Mirou Kurkem."],
    ["22. 4.", "Stavba areálu firmy Fagus na startu rychlostní zkoušky."],
    ["27. 4.", "Trasa dostihové dráhy je nahrubo hotová. Výstup ze Zaxxona se nedal moc použít, a tak je to hodně o ruční práci."],
    ["5. 5.", "Terén je v podstatě hotový, začíná se s budovami. Fyzika je provizorní."],
    ["7.–8. 5.", "První test RZ Fagus, návštěva dostihovky a focení objektů."],
    ["11. 5.", "Dokončen areál Fagus, RZ Fagus téměř hotová. Práce přerušeny kvůli RZ Komárov."],
    ["26. 5.", "První objekty na Dostihovce: terén 90 %, objekty 30 %, textury 50 %, integrace 30 %."],
    ["25. 8.", "Obnovení prací. Fagus dokončen i se zimními texturami, Dostihovka ale padá při dojetí do cíle."],
    ["4.–11. 10.", "Obrubníky, retardéry, pneumatiky a další objekty. Progres kolem 80 %, stále se řeší padání."],
    ["16. 10.", "Padání vyřešeno. Projekt se musel ve Wallaby založit celý znovu, ale námaha se vyplatila."],
    ["23.–25. 10.", "Finální beta verze, anti-zkracovací pastičky, betatest V2."],
    ["27.–29. 10.", "Dostihovka poprvé na mokru, časoměřiči měří, TV kamery a první sníh. Dokončena Dostihovka i final stage."],
    ["30. 10.", "Projekt dokončen a všechny tři erzety nahrány na plugin."],
    ["3.–8. 11. 2020", "Premiéra: HOTHESS Mikuláš Rally Online 2020."]
  ],

  // --- média: tiskové zprávy a články v původním znění (autor Jakub Hofbauer); další se budou přidávat sem ---
  media: [
    {
      "date": "6. 12. 2020",
      "title": "Virtuální Mikulášskou rally ovládl Paulát, absolutním mistrem se stává Zeťák",
      "author": "Jakub Hofbauer",
      "source": "Rally Sprint Kopná",
      "url": "https://rallysprintkopna.cz/virtualni-mikulasskou-rally-ovladl-paulat-absolutnim-mistrem-se-stava-zetak/",
      "text": [
        "Premiérová sezona SONAX Mezinárodního mistrovství České republiky v online rally je u konce. O finální dramata včetně toho, kdo se stane historicky prvním oficiálním mistrem ve virtuálních rally, se začátkem listopadu postarala HOTHESS Mikuláš Rally Online. A ta byla výjimečným závodem hned z několika pohledů. Hlavní partner soutěže se totiž ve spolupráci s promotérskou skupinou NRC postaral o to, že se do virtuálního prostředí podařilo přenést celou loňskou podobu slušovické rally. V šestnáctileté historii hry Richard Burns Rally se tak snad vůbec poprvé stalo, že virtuální závod kompletně odpovídal své reálné předloze. Organizátoři zároveň využili unikátní šanci přiblížit online rally skutečnému závodu a na neveřejné tratě jezdce pustili jen na seznamovací jízdy. Napodruhé už se piloti na nové zkoušky vydali rovnou v ostrých závodních vozech a na rozdíl od předešlých soutěží, kde mohli zkoušky trénovat bez omezení, se nyní museli spolehnout na své schopnosti odhadnout správné tempo v neznámém prostředí.",
        "V kategorii nejmenších dvoukolek všem vypálil rybník David Hrbáček, který si mezi er-jedničky jednorázově odskočil z nejvyšší třídy RC2. I přes absenci pohonu zadní nápravy domácí jezdec neztratil nic ze své rychlosti a ostatním soupeřům ujel o bezmála čtyřicet sekund. V průběžné klasifikaci seriálu však zároveň probíhal boj o celkové vítězství ve třídě. K němu měl díky čtyřem výhrám z první poloviny sezony nejlépe nakročeno Polák Mateusz Przyszlakowski, kterého ale stále mohl ohrozit jeho krajan Artur Hazuka. A ten se také ve Slušovicích snažil – dojel druhý za Hrbáčkem, zatímco Przyszlakowski skončil až sedmý. Nicméně i tato pozice dosavadnímu lídrovi stačila na udržení prvního místa, Hazuka je tedy celkově druhý, třetí místo v konečném pořadí dalším bodovaným výsledkem potvrdil František David. Bronz ve třídě RC5 v samostatné klasifikaci slušovické rally pak obsadil Milan Řezníček, podobně jako Hrbáček coby jednorázový host v kategorii vozů R1.",
        "Rovněž mezi rychlejšími er-dvojkami na nejvyšším stupni zavlála česká vlajka, třídu RC4 totiž ovládl Jakub Hoffmann s Fordem Fiesta R2T. Se stejným vozem jen o vteřinu a půl zaostal druhý Fin Tommi Mäkinen, třetí místo pak ukořistil další Čech Michal Dohnal. Mikulášská rally se v samotném závěru sezony postarala o změnu v celkové klasifikaci třídy – po celý rok totiž první místo držel Argentinec Enzo Sagrera, který ale ve Slušovicích smolně havaroval. Nabídnutou šanci plně využil Mäkinen, který se nakonec díky pětibodovému náskoku stal vítězem celé kategorie. Za tímto mezinárodním tandemem se pak na třetím místě celkově umístil Michal Streit, který se zároveň stal vítězem oficiálního značkového poháru Peugeot Online Rally Cup. V něm se na stříbrné příčce díky povedené druhé polovině sezony umístil Slovák Kristian Jacko, kterému na Streita chybělo třináct bodů, třetí pak v konečné klasifikaci mezi Peugeoty skončil již zmíněný Dohnal. Značkový pohár se stal jedním z taháků letošní virtuální sezony, do bojů s vozy Peugeot 208 R2 se v průběhu roku zapojilo celkem 106 jezdců, přičemž na bodový výsledek jich během sedmi uskutečněných závodů dosáhlo celkem 43. V er-dvojkách se také rozhodovalo o finálním pořadí dámského poháru – již dříve potvrzená vítězka Iveta Lekešová si dojela pro další zlato a v celém mistrovství tak drží unikátní rekord – sedm vítězství ze sedmi startů. Po Mikulášské rally se ovšem změnilo konečné pořadí na dalších místech, doposud druhou Evu Ptáčkovou totiž přeskočila Vendula Schwarzová.",
        "O celkovém vítězi třídy RC3 se rozhodlo již na předchozí rally v Klatovech, Polák Adam Weglowski ovšem nevynechal ani závěrečné Slušovice a svou formu potvrdil dalším druhým místem. Nicméně na konečný stříbrný post v celkové klasifikaci si brousil zuby Španěl Antonio Ortega, který také prohnal svůj renault valašskou soutěží v nejrychlejším čase. Jenže Weglowského krajan Dawid Wieczorek se třetím místem v cíli ubránil a v konečné klasifikaci tak zůstal před Ortegou. Byla to nesmírně vyrovnaná bitva, tři nejrychlejší piloty na er-trojkách v cíli dělilo pouze 1,3 sekundy, Weglowski skončil druhý kvůli ztrátě nicotných tří setin sekundy.",
        "Rovněž mezi gétéčky bylo už před startem Mikulášské rally o vítězi jasno a Jan Morávek proto pojal slušovickou soutěž hlavně jako show pro diváky. Ovšem i v této třídě se nakonec měnilo pořadí na dalších pódiových příčkách – Španěl Juan Marzoa bohužel havaroval a celkově skončil třetí, druhým místem ve Slušovicích ho totiž přeskočil Morávkův týmový kolega Vojtěch Uhlíř. Ten na mikulášských stupních vítězů doplnil vítězného Daniela Hradila a třetího Stanislava Petrů na dalších speciálech Porsche.",
        "A jak dopadla hlavní kategorie RC2 a s ní i rozluštění tajenky o celkovém mistru letošní sezony? Vůbec nejrychlejší součet časů si připsal Martin Bujáček s Hyundaiem, kterého ovšem obdržená penalizace následně srazila dolů pořadím. Premiérové vítězství českých barev v letošním mistrovství nicméně pojistil Štěpán Paulát na Volkswagenu, který celkově poskočil na konečné čtvrté místo před Zdeňka Jílka. Druhý i přes několik drobných chyb skončil Dennis Zeťák s citroënem, který do soutěže vstupoval jako průběžný lídr celého seriálu s desetibodovým náskokem na druhého Adriana Klimase. Z dramatického finále však nakonec mnoho nezbylo, Polák totiž z osobních důvodů do rally neodstartoval a Slovenskému pilotovi tak body za druhé místo bohatě stačily k potvrzení mistrovského primátu. Třetí ve Slušovicích dojel Španěl Eduardo Perojo s dalším Hyundaiem, který na úplně poslední zkoušce přeskočil Portugalce Oscara Esteveze. Ten skončil celkově třetí a spolu se Zeťákem a Klimasem je jediný, kdo v absolutní klasifikaci dokázal překonat stobodovou hranici. Náplastí na Klimasovu absenci jsou pro polské barvy alespoň konečné výsledky přidruženého Production Cupu. Po již potvrzených dvou nejvyšších příčkách pro Jana Gorczycu a Mateusze Szkutu totiž na konečné podium díky slušovickému výsledku přiskočil ještě Benek Korzienowski, který o pár sekund a bodů porazil domácího Marka Pavelu. Poláci tak ve finále obsadili kompletní podium, Pavela skončil čtvrtý.",
        "Úvodní sezona SONAX Mezinárodního mistrovství České republiky v Online Rally je tedy minulostí. Nabídla dramatické souboje a přilákala nebývalé vysoký počet pilotů, vždyť Autoklub ČR od zahájení nového seriálu vydal přes šest stovek jezdeckých licencí pro e-sport! Myšlenka oficiální virtuální série tedy padla na úrodnou půdu a následující týdny ukážou, v jaké formě se série přenese do sezony 2021."
      ],
      "tableTitle": "HOTHESS Mikuláš Rally Online 2020",
      "table": [
        [
          "1.",
          "Štěpán Paulát (CZE)",
          "Volkswagen Polo GTI R5",
          "16:44.4"
        ],
        [
          "2.",
          "Dennis Zeťák (SVK)",
          "Citroën C3 R5",
          "+2.0"
        ],
        [
          "3.",
          "Eduardo Perojo (CZE)",
          "Hyundai i20 R5",
          "+3.1"
        ],
        [
          "4.",
          "Oscar Estevez (PRT)",
          "Ford Fiesta R5",
          "+5.1"
        ],
        [
          "5.",
          "Zdeněk Jílek (CZE)",
          "Škoda Fabia Rally2 evo",
          "+5.7"
        ],
        [
          "6.",
          "Lukáš Valenta (CZE)",
          "Škoda Fabia Rally2 evo",
          "+10.1"
        ],
        [
          "7.",
          "Hubert Laskowski (POL)",
          "Citroën C3 R5",
          "+17.3"
        ],
        [
          "8.",
          "René Ritter (DEU)",
          "Hyundai i20 R5",
          "+21.0"
        ],
        [
          "9.",
          "Jan Krygler (CZE)",
          "Škoda Fabia Rally2 evo",
          "+24.5"
        ],
        [
          "10.",
          "Petr Kužela (CZE)",
          "Škoda Fabia Rally2 evo",
          "+28.4"
        ]
      ]
    },
    {
      "date": "5. 11. 2020",
      "title": "Virtuální šampionát vyvrcholí na Mikulášské rally",
      "author": "Jakub Hofbauer",
      "source": "AutoSport.CZ",
      "url": "http://www.autosport.cz/zavody/clanek.php?cl=21365&id=1605",
      "text": [
        "Premiérová sezona SONAX MMČR v Online Rally míří do svého finále. O poslední body, které rozhodnou o vítězích jednotlivých tříd a zejména o letošním celkovém mistru nového esport šampionátu Autoklubu České republiky, si to jezdci rozdají na HOTHESS Mikuláš Rally Online.",
        "A bude to finále nevídané. Předobrazem virtuálního podniku se stala slušovická Mikuláš rally, která každoročně uzavírá motoristickou sezonu v Česku. Hlavní partner jejího loňského ročníku, společnost HOTHESS s.r.o., si vzala pod křídla i její online variantu a během několika měsíců ve spolupráci s promotérskou skupinou NRC kompletně převedla do virtuální reality loňskou variantu mikulášského závodu.",
        "Na jezdce tak čeká hned trojice nových rychlostních zkoušek – divácky populární okruh okolo slušovického dostihové závodiště, klasická rychlostní zkouška vedoucí z Lípy do Slušovic – oba testy se při rally pojedou dvakrát – a na závěr krátký exhibiční test využívající opět část slušovického okruhu. Zajímavostí jistě bude, že na rozdíl od předešlých závodů, před kterými mohli jezdci známé tratě dopředu trénovat, budou nové rychlostní zkoušky účastníkům zpřístupněny pouze při seznamovacích jízdách. Podobně jako při skutečných závodech tedy i při finále letošního SONAX MMČR v Online Rally rozhodne nejen rychlost, ale také schopnost naslouchat rozpisu a najít nejvhodnější tempo na neznámých tratích.",
        "A půjde o hodně. Po předposledním závodě na Šumavě své letošní prvenství potvrdili Jan Morávek ve třídě R-GT a Adam Weglowski v kategorii RC3. Kdo ovládne zbývající tři třídy a zejména, komu připadne post absolutního mistra letošní sezony, to se rozhodne právě na HOTHESS Mikuláš Rally Online – a to konkrétně v neděli 8. listopadu, kdy slušovická soutěž vyvrcholí. Pro aktuální informace a výsledky sledujte web šampionátu SONAX MMČR v Online Rally www.onlinerally.cz a přidružené sociální sítě facebook a instagram Online Rally CZ!"
      ]
    }
  ],

  // --- síň slávy: výsledky se generují z data/raw/<rok>.csv skriptem tools/build_results.py ---
  hall: [
    { year: 2025, img: "img/foto-4.jpg" },
    { year: 2024, img: "img/hall-2024.jpg" },
    { year: 2022, img: "img/foto-3.jpg" },
    { year: 2021, img: "img/foto-6.jpg" },
    { year: 2020, img: "img/hall-2020.jpg", note: "Premiéra – HOTHESS Mikuláš Rally Online 2020, závěrečný podnik MMČR v Online Rally." }
  ]
};
