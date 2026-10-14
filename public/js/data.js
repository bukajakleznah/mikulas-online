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
