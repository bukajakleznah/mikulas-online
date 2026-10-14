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

  // --- harmonogram aktuálního ročníku (TODO: doplnit termíny z ZU) ---
  schedule: [
    { when: "Bude upřesněno", what: "Zveřejnění zvláštního ustanovení" },
    { when: "Bude upřesněno", what: "Zahájení registrace" },
    { when: "Bude upřesněno", what: "Uzávěrka registrace a zveřejnění startovní listiny" },
    { when: "Bude upřesněno", what: "Zveřejnění mapy ke stažení" },
    { when: "Bude upřesněno", what: "Start závodu – RZ 1 až RZ 4" },
    { when: "Bude upřesněno", what: "Exhibiční RZ 5 a vyhlášení výsledků" }
  ],

  // --- dokumenty (TODO: nahrát PDF do public/docs a doplnit url) ---
  docs: [
    { title: "Zvláštní ustanovení " + 2026, url: "" },
    { title: "Pravidla a kodex jezdce", url: "" }
  ],

  // --- historie / timeline z roku 2020 ---
  timeline: [
    ["19. 4. 2020", "Start projektu. Dostihovka vzniká ve spolupráci s Myrou43, RZ Zádveřice se upravuje na podobu Mikuláše s Mirou Kurkem."],
    ["22. 4.", "Stavba areálu firmy Fagus u startu RZ."],
    ["27. 4.", "Trasa dostihové dráhy je nahrubo hotová."],
    ["5. 5.", "Terén je v podstatě hotový, fyzika zatím provizorní."],
    ["7. 5.", "První test RZ Fagus."],
    ["11. 5.", "Dokončen areál Fagus, RZ Fagus je téměř hotová."],
    ["26. 5.", "První objekty na Dostihovce: terén 90 %, objekty 30 %, textury 50 %."],
    ["25. 8.", "Práce se obnovují. RZ Dostihovka padá při dojetí do cíle."],
    ["11. 10.", "Progres kolem 80 %. Zbývají budovy, lesík, blátivost trati a stíny."],
    ["16. 10.", "Problém s pádáním vyřešen, projekt byl založen znovu ve Wallaby."],
    ["Prosinec 2020", "Premiéra: HOTHESS Mikuláš Rally Online 2020."]
  ],

  // --- síň slávy (TODO: doplnit vítěze a odkazy na výsledky) ---
  hall: [
    { year: 2020, title: "HOTHESS Mikuláš Rally Online 2020", note: "Premiérový ročník – první virtuální rallye na světě ve 100% podobě oproti předloze.", winner: "", results: "", img: "img/foto-2.jpg" },
    { year: 2021, title: "Mikuláš Rally Online 2021", note: "", winner: "", results: "", img: "img/foto-5.jpg" },
    { year: 2022, title: "Mikuláš Rally Online 2022", note: "", winner: "", results: "", img: "img/foto-3.jpg" },
    { year: 2023, title: "Mikuláš Rally Online 2023", note: "", winner: "", results: "", img: "img/foto-6.jpg" },
    { year: 2024, title: "Mikuláš Rally Online 2024", note: "", winner: "", results: "", img: "img/foto-1.jpg" },
    { year: 2025, title: "Mikuláš Rally Online 2025", note: "", winner: "", results: "", img: "img/foto-4.jpg" }
  ]
};
