// Jediné místo pro obsah, který se bude měnit každý rok.
window.MRO = {
  // --- aktuální ročník ---
  year: 2026,
  // "soon" = registrace ještě nespuštěna, "open" = otevřená, "closed" = uzavřena
  status: "soon",
  // TODO: doplnit skutečný odkaz na registraci ročníku
  registrationUrl: "https://dansimek.wixsite.com/newnrc/mikulas-rally",
  statusText: {
    soon: "Registrace bude brzy spuštěna. Sleduj tuto stránku.",
    open: "Registrace je otevřená!",
    closed: "Registrace je uzavřena."
  },

  // --- PDF u aktuálního ročníku: nahrát do public/docs/ a doplnit url, např. "docs/zu-2026.pdf" ---
  docs: [
    { title: "Zvláštní ustanovení", url: "" },
    { title: "Harmonogram", url: "" },
    { title: "Mapy", url: "" }
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

  // --- média: články přepsané vlastními slovy (nepřebíráme původní znění); další se budou přidávat sem ---
  media: [
    {
      date: "6. 12. 2020",
      title: "Virtuální Mikulášskou rally ovládl Paulát, absolutním mistrem se stává Zeťák",
      source: "Rally Sprint Kopná",
      url: "https://rallysprintkopna.cz/virtualni-mikulasskou-rally-ovladl-paulat-absolutnim-mistrem-se-stava-zetak/",
      text: [
        "HOTHESS Mikuláš Rally Online uzavřela první sezonu šampionátu SONAX MMČR v Online Rally. Jelo se v první listopadový týden 2020 ve hře Richard Burns Rally a poprvé v historii hry odpovídala virtuální rally přesně reálné předloze ze Slušovic.",
        "Celkově vyhrál Štěpán Paulát na Volkswagenu Polo GTI R5 před Dennisem Zeťákem (+2,1 s) a Eduardem Perojem (+3,1 s). Zeťákovo druhé místo stačilo k titulu mistra třídy RC2, ve které si vytvořil náskok už v průběhu sezony.",
        "Další tituly putovaly k Tommimu Mäkinenovi (RC4) a Dawidu Wieczorkovi (RC3). Jezdci jeli na tratích, které předem neznali – slušovické zkoušky se daly poznat jen při seznamovacích jízdách."
      ]
    },
    {
      date: "5. 11. 2020",
      title: "Virtuální šampionát vyvrcholí na Mikulášské rally",
      source: "AutoSport.CZ",
      url: "http://www.autosport.cz/zavody/clanek.php?cl=21365&id=1605",
      text: [
        "Premiérová sezona SONAX MMČR v Online Rally, nového esportového šampionátu Autoklubu České republiky, směřovala k finále. O poslední body i o celkového mistra se jezdci utkali na HOTHESS Mikuláš Rally Online.",
        "Předlohou byla slušovická Mikuláš Rally, kterou HOTHESS ve spolupráci s promotérskou skupinou NRC převedla do virtuální reality. Jezdce čekaly tři nové zkoušky – okruh kolem dostihového závodiště, klasická zkouška z Lípy do Slušovic (obě dvakrát) a krátký exhibiční test na závěr.",
        "Novinkou bylo, že trať si jezdci nemohli předem natrénovat. Poznali ji jen při seznamovacích jízdách, takže rozhodovalo i to, jak dobře se dokáží držet rozpisu. Titul ve třídách R-GT a RC3 už byl rozhodnutý, o zbylých třídách a celkovém vítězi se rozhodlo v neděli 8. listopadu."
      ]
    }
  ],

  // --- síň slávy: výsledky se generují z data/raw/<rok>.csv skriptem tools/build_results.py ---
  hall: [
    { year: 2025, img: "img/foto-4.jpg" },
    { year: 2024, img: "img/foto-1.jpg" },
    { year: 2023, cancelled: true },
    { year: 2022, img: "img/foto-3.jpg" },
    { year: 2021, img: "img/foto-6.jpg" },
    { year: 2020, img: "img/foto-2.jpg", note: "Premiéra – HOTHESS Mikuláš Rally Online 2020, závěrečný podnik MMČR v Online Rally." }
  ]
};
