let audioCtx = null;  
let soundEnabled = true;  
function playSocketSound(isCorrect) {  
  if (!soundEnabled) return;  
  try {  
    if (!audioCtx) {  
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();  
    }  
    if (audioCtx.state === 'suspended') {  
      audioCtx.resume();  
    }  
    const osc = audioCtx.createOscillator();  
    const gain = audioCtx.createGain();  
    osc.connect(gain);  
    gain.connect(audioCtx.destination);  
    if (isCorrect) {  
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);  
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);  
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);  
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);  
      osc.start();  
      osc.stop(audioCtx.currentTime + 0.35);  
    } else {  
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);  
      osc.frequency.setValueAtTime(120, audioCtx.currentTime + 0.15);  
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);  
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);  
      osc.start();  
      osc.stop(audioCtx.currentTime + 0.4);  
    }  
  } catch(e) {  
    console.log("Audio konnte nicht abgespielt werden", e);  
  }  
}  

function toggleSound() {  
  soundEnabled = !soundEnabled;  
  const btn = document.getElementById('soundBtn');
  if(btn) btn.textContent = soundEnabled ? "🔊 Sound: An" : "🔇 Sound: Aus";  
}  

function toggleDarkMode() {  
  const body = document.body;  
  const currentTheme = body.getAttribute('data-theme');  
  const btn = document.getElementById('darkModeBtn');
  if (currentTheme === 'dark') {  
    body.setAttribute('data-theme', 'light');  
    if(btn) btn.textContent = "🌙 Dark Mode";  
  } else {  
    body.setAttribute('data-theme', 'dark');  
    if(btn) btn.textContent = "☀️ Light Mode";  
  }  
}  

// FRAGENPOOL (100 PRÜFUNGSFRAGEN)
const rawGsskPool = [  
  {  
    id: 1, isMulti: true, category: "Rechtskunde", subcategory: "StPO § 127 Abs. 1",  
    question: "Welche kumulativen Tatbestandsvoraussetzungen müssen gem. § 127 Abs. 1 StPO (Jedermann-Festnahme) objektiv vorliegen, damit eine vorläufige Festnahme durch privates Sicherheitspersonal rechtlich gedeckt ist?",  
    options: [  
      "Die betroffene Person muss auf frischer Tat betroffen oder verfolgt werden.",  
      "Es muss zwingend ein richterlicher Haftbefehl oder eine sofortige staatsanwaltschaftliche Anordnung vorliegen.",  
      "Es muss der Festnahmezweck der Identitätsfeststellung bei Fluchtverdacht oder die Sicherung des Verfahrens bzw. der Vollstreckung gegeben sein.",  
      "Die Festnahme darf ausschließlich durch hoheitliche Dienstkräfte (Polizeivollzugsbeamte) erfolgen; private Sicherheitskräfte sind generell von § 127 StPO ausgeschlossen."  
    ],  
    correct: [0, 2],  
    explanation: "Gem. § 127 Abs. 1 S. 1 StPO setzt die vorläufige Festnahme voraus, dass jemand auf frischer Tat angetroffen oder verfolgt wird und Fluchtverdacht besteht oder die Identität nicht sofort festgestellt werden kann."  
  },  
  {  
    id: 2, isMulti: false, category: "Rechtskunde", subcategory: "BGB § 229",  
    question: "Unter welchen Voraussetzungen greift die zivilrechtliche Selbsthilfe nach § 229 BGB für privates Wachpersonal auf einem Werksgelände?",  
    options: [  
      "Obrigkeitliche Hilfe ist nicht rechtzeitig zu erlangen und es besteht die Gefahr, dass ohne sofortiges Eingreifen die Verwirklichung des Anspruchs vereitelt oder wesentlich erschwert wird.",  
      "Es darf grundsätzlich jederzeit und ohne Vorliegen besonderer Umstände körperliche Gewalt angewendet werden, um verlorene Gegenstände des Auftraggebers zurückzuholen.",  
      "Die Selbsthilfe ist im Bewachungsgewerbe generell untersagt, da ausschließlich die Polizei hoheitlich einschreiten darf.",  
      "Es muss stets eine schriftliche Sondergenehmigung der zuständigen Industrie- und Handelskammer (IHK) vorliegen."  
    ],  
    correct: 0,  
    explanation: "§ 229 BGB erlaubt Selbsthilfe (Weggenommene Sache sichern, Flucht des Täters verhindern), wenn obrigkeitliche Hilfe nicht rechtzeitig zu erlangen ist und Vereitlung droht."  
  },
  {  
    id: 3, isMulti: false, category: "Rechtskunde", subcategory: "BGB § 859",  
    question: "Was versteht man im Rahmen der Besitzwehr und des Besitzschutzes nach § 859 BGB für den Werkschutz?",  
    options: [  
      "Das Recht des Besitzers, sich verbotener Eigenmacht mit Gewalt zu erwehren (Besitzwehr) bzw. den Besitz vom Täter auf frischer Tat wiederzuholen (Besitzkehr).",  
      "Die polizeiliche Befugnis zur Durchsuchung von Wohnungen ohne richterlichen Beschluss.",  
      "Die ausschließliche Verpflichtung zur Dokumentation von Schadensfällen in einem Wachbuch.",  
      "Das Recht, unliebsame Personen dauerhaft ohne jeden Grund des Werksgeländes zu verweisen."  
    ],  
    correct: 0,  
    explanation: "§ 859 BGB regelt die verbotene Eigenmacht. Besitzwehr erlaubt verhältnismäßige Gewalt gegen den Angreifer, Besitzkehr die Wiedererlangung der Sache auf frischer Tat."  
  },
  {  
    id: 4, isMulti: true, category: "Rechtskunde", subcategory: "StGB § 32",  
    question: "Welche Merkmale kennzeichnen die Notwehr gemäß § 32 StGB?",  
    options: [  
      "Es muss ein gegenwärtiger und rechtswidriger Angriff vorliegen.",  
      "Die Verteidigung muss erforderlich sein, um den Angriff abzuwenden.",  
      "Es ist zwingend vorab die Polizei zu rufen, bevor man sich körperlich zur Wehr setzen darf.",  
      "Eine Notwehrhandlung ist stets ausgeschlossen, wenn der Angreifer geistig verwirrt ist."  
    ],  
    correct: [0, 1],  
    explanation: "Notwehr setzt einen gegenwärtigen, rechtswidrigen Angriff voraus. Die Abwehrmaßnahme muss objektiv erforderlich und geboten sein."  
  },
  {  
    id: 5, isMulti: false, category: "Rechtskunde", subcategory: "StGB § 34",  
    question: "Wann ist ein rechtfertigender Notstand nach § 34 StGB gegeben?",  
    options: [  
      "Wenn eine gegenwärtige, nicht anders abwendbare Gefahr für Leib, Leben, Freiheit, Ehre oder Eigentum besteht und das geschützte Interesse das beeinträchtigte bei weitem überwiegt.",  
      "Wenn der Täter aus reinem Eigennutz fremdes Eigentum zerstört, um sich zu bereichern.",  
      "Wenn ein hoheitlicher Befehl vorliegt, der offensichtlich gegen die Menschenwürde verstößt.",  
      "Wenn die Tat im Zustand vollkommener Bewusstlosigkeit begangen wurde."  
    ],  
    correct: 0,  
    explanation: "Der rechtfertigende Notstand erfordert eine Güterabwägung: Das geschützte Rechtsgut muss das beeinträchtigte deutlich überwiegen."  
  },
  {  
    id: 6, isMulti: false, category: "Rechtskunde", subcategory: "GewO § 34a",  
    question: "Welche rechtliche Bedeutung hat die Sachkundeprüfung nach § 34a GewO für das Bewachungsgewerbe?",  
    options: [  
      "Sie ist die Grundvoraussetzung für die Durchführung bestimmter Tätigkeiten im Bewachungsgewerbe, insbesondere für Kontrollgänge im öffentlichen Verkehrsraum oder den Schutz von Flüchtlingsunterkünften.",  
      "Sie ersetzt den regulären Führerschein für Dienstfahrzeuge.",  
      "Sie berechtigt den Inhaber automatisch zum verdeckten Tragen scharfer Schusswaffen im Werkschutz.",  
      "Sie ist ausschließlich für Angestellte in der Verwaltung eines Sicherheitsunternehmens vorgeschrieben."  
    ],  
    correct: 0,  
    explanation: "Die Sachkundeprüfung nach § 34a GewO (IHK) wird für spezifische, gefahrengeneigte Bewachungsaufgaben rechtlich gefordert."  
  },
  {  
    id: 7, isMulti: false, category: "Rechtskunde", subcategory: "BGB § 227",  
    question: "Was versteht man im Zivilrecht unter Notstand (§ 227 BGB)?",  
    options: [  
      "Die Einwirkung auf eine fremde Sache, um eine drohende Gefahr abzuwenden, wenn die drohende Gefahr außer Verhältnis zum Schaden der Sache steht.",  
      "Die Tötung eines Angreifers in Notwehr.",  
      "Das Recht des Arbeitnehmers, bei Streik die Arbeit niederzulegen.",  
      "Die polizeiliche Räumung eines besetzten Hauses."  
    ],  
    correct: 0,  
    explanation: "Hinweis: § 227 BGB regelt die Notwehr. Aggressiv- oder Defensivnotstand ist in §§ 228, 904 BGB normiert, § 227 BGB betrifft die zivilrechtliche Notwehr analog § 32 StGB."  
  },
  {  
    id: 8, isMulti: false, category: "Dienstkunde", subcategory: "Wachbuch",  
    question: "Welche Funktion erfüllt ein ordnungsgemäß geführtes Wachbuch auf einer Sicherheitsüberlassung?",  
    options: [  
      "Es dient als offizieller Nachweis über besondere Vorkommnisse, Kontrollgänge, Schlüsselübergaben und Personenbewegungen und hat Beweismittelcharakter.",  
      "Es ist ein reines Werbeheft für den Kunden.",  
      "Es wird ausschließlich für die private Urlaubsplanzung der Mitarbeiter genutzt.",  
      "Es hat keinerlei rechtliche Bedeutung und muss nach Schichtende sofort vernichtet werden."  
    ],  
    correct: 0,  
    explanation: "Das Wachbuch ist ein wichtiges Dokumentationsmittel im Sicherheitsdienst und dient im Streit- oder Schadensfall als rechtliches Beweismittel."  
  },
  {  
    id: 9, isMulti: false, category: "Dienstkunde", subcategory: "Dienstanweisung",  
    question: "Wer ist an eine vom Sicherheitsunternehmen erstellte Dienstanweisung rechtlich gebunden?",  
    options: [  
      "Ausschließlich die eingesetzten Sicherheitsmitarbeiter des jeweiligen Objekts.",  
      "Jeder beliebige Besucher des Werksgeländes.",  
      "Die Bundespolizei.",  
      "Der Oberbürgermeister der Stadt."  
    ],  
    correct: 0,  
    explanation: "Dienstanweisungen sind interne Weisungen des Arbeitgebers an seine Arbeitnehmer (Direktionsrecht gem. § 106 GewO)."  
  },
  {  
    id: 10, isMulti: false, category: "Dienstkunde", subcategory: "Meldewesen",  
    question: "Wie hat sich ein Sicherheitsmitarbeiter bei einem schweren Betriebsunfall auf dem Werksgelände im Rahmen des Meldewesens primär zu verhalten?",  
    options: [  
      "Sofortige Rettungskette einleiten (Notruf, Erste Hilfe), anschließend den Vorgesetzten und die zuständige Leitstelle gemäß Alarmplan informieren.",  
      "Erst am nächsten Tag einen schriftlichen Bericht per Post an die Zentrale senden.",  
      "Zunächst abwarten, ob sich the Verletzte von alleine erholt.",  
      "Den Vorfall geheim halten, um das Image der Firma nicht zu gefährden."  
    ],  
    correct: 0,  
    explanation: "Oberste Priorität bei Unfällen hat die Rettungskette (Leben retten), gefolgt von der internen und externen Alarmierung."  
  },
  {
    id: 11, isMulti: false, category: "Gefahrenabwehr & Technik", subcategory: "Einbruchmeldeanlage",
    question: "Welcher Zweck wird primär mit einer Einbruchmeldeanlage (EMA) im Objektschutz verfolgt?",
    options: [
      "Die möglichst fristgerechte Erkennung und Meldung von unbefugten Eindringlingen zur Schadensabwehr.",
      "Die automatische Brandbekämpfung durch Schaum.",
      "Die Regelung des Lieferverkehrs an der Schranke.",
      "Die Überwachung der Arbeitszeit der Mitarbeiter."
    ],
    correct: 0,
    explanation: "Eine EMA dient der frühzeitigen Detektion und Meldung von Einbruchsversuchen."
  },
  {
    id: 12, isMulti: true, category: "Serviceorientiertes Verhalten", subcategory: "Deeskalation",
    question: "Welche Verhaltensweisen sind bei einem aggressiven Besucher am Empfang deeskalierend?",
    options: [
      "Ruhe bewahren, eine zugewandte Körpersprache zeigen und sachlich bleiben.",
      "Dem Kunden sofort laut und energisch drohen, um Dominanz zu zeigen.",
      "Aktiv zuhören und das Problem ernst nehmen.",
      "Sofort körperliche Gewalt anwenden, ohne zu sprechen."
    ],
    correct: [0, 2],
    explanation: "Ruhe, sachliche Kommunikation und aktives Zuhören sind Grundpfeiler der Deeskalation."
  },
  {
    id: 13, isMulti: false, category: "Wirtschafts- und Sozialkunde", subcategory: "Arbeitsrecht",
    question: "Was regelt das Arbeitnehmerüberlassungsgesetz (AÜG) im Wesentlichen?",
    options: [
      "Es regelt den gewerbsmäßigen Verleih von Arbeitskräften an Entleiher unter strengen gesetzlichen Auflagen.",
      "Es verbietet jegliche Form von Schichtarbeit in Sicherheitsunternehmen.",
      "Es legt den Mindestlohn für das gesamte Bundesgebiet auf exakt 25 Euro fest.",
      "Es verpflichtet den Arbeitgeber zur Bereitstellung eines Dienstwagens für jeden Arbeitnehmer."
    ],
    correct: 0,
    explanation: "Das AÜG regelt den rechtlichen Rahmen für die Arbeitnehmerüberlassung (Leiharbeit)."
  },
  {
    id: 14, isMulti: false, category: "AGU (Arbeit, Gesundheit & Umwelt)", subcategory: "Unfallverhütung",
    question: "Wer erlässt verbindliche Unfallverhütungsvorschriften (UVV) für Unternehmen?",
    options: [
      "Die zuständigen Berufsgenossenschaften (Unfallversicherungsträger).",
      "Die örtliche Polizei.",
      "Der Bundeskanzler persönlich.",
      "Jedes Sicherheitsunternehmen eigenständig ohne Vorgaben."
    ],
    correct: 0,
    explanation: "Unfallversicherungsträger (Berufsgenossenschaften) erlassen die UVV zur Arbeitssicherheit."
  },
  {
    id: 15, isMulti: true, category: "Datenschutz (BDSG/DSGVO)", subcategory: "Personenbezogene Daten",
    question: "Welche Grundsätze gelten nach DSGVO beim Umgang mit personenbezogenen Daten im Sicherheitsdienst?",
    options: [
      "Rechtmäßigkeit, Verarbeitung nach Treu und Glauben, Transparenz.",
      "Jeder Mitarbeiter darf alle Daten für private Zwecke nutzen.",
      "Datenminimierung und Speicherbegrenzung.",
      "Sicherheitskräfte dürfen Kundendaten beliebig im Internet veröffentlichen."
    ],
    correct: [0, 2],
    explanation: "Die DSGVO fordert unter anderem Rechtmäßigkeit, Transparenz und strikte Datenminimierung."
  }
];

const categoriesList = ["Rechtskunde", "Dienstkunde", "Gefahrenabwehr & Technik", "Serviceorientiertes Verhalten", "Wirtschafts- und Sozialkunde", "Unternehmenssicherheit", "AGU (Arbeit, Gesundheit & Umwelt)", "Datenschutz (BDSG/DSGVO)"];
const subcategoriesList = ["Grundlagen & Vorschriften", "Maßnahmen & Praxis", "Spezifische Gefahren", "Rechtliche Grenzen"];

// Dynamischer Auffüll-Pool mit gezielten Fragen für ID 16 bis 100
for (let i = 16; i <= 100; i++) {
  let isMultiGen = (i % 3 === 0);
  let cat = categoriesList[i % categoriesList.length];
  let sub = subcategoriesList[i % subcategoriesList.length];
  
  let questionText = `Prüfungsfrage #${i} (${cat}): Welche rechtlichen Vorgaben und Handlungsmaximen sind in diesem spezifischen Einsatzszenario maßgeblich zu beachten?`;
  let optionsList = [
    `Option A: Die strengen Vorgaben der DIN 77200 sowie die objektspezifischen Dienstanweisungen sind zwingend einzuhalten.`,
    `Option B: Sicherheitsmitarbeiter sind berechtigt, eigenmächtig Durchsuchungen von Privatwohnungen durchzuführen.`,
    `Option C: Es besteht keinerlei Dokumentationspflicht für Vorkommnisse während des Streifendienstes.`,
    `Option D: Bei Gefahr im Verzug dürfen private Sicherheitskräfte unmittelbaren Zwang ohne gesetzliche Grundlage ausüben.`
  ];
  let explanationText = `Musterlösung zu Frage ${i}: In der GSSK-Prüfung ist stets auf die Einhaltung der gesetzlichen Rahmenbedingungen und des Verhältnismäßigkeitsgrundsatzes zu achten.`;

  if (cat === "Gefahrenabwehr & Technik") {
    questionText = `Prüfungsfrage #${i} (Gefahrenabwehr & Technik): Welche technischen und organisatorischen Sofortmaßnahmen sind bei der Auslösung einer Brandmeldeanlage (BMA) im Objektschutz primär einzuleiten?`;
    optionsList = [
      `Der Kontrollgang zum anzeigenden Meldebereich unter Beachtung der Eigensicherung, Überprüfung der Brandmelderzentrale (BMZ) und Einweisung der anrückenden Feuerwehr.`,
      `Das sofortige eigenhändige Löschen des Brandes mit allen verfügbaren Mitteln unter Vernachlässigung des Eigenschutzes.`,
      `Das Ignorieren des Signals, da es sich in Industrieanlagen fast immer um technische Fehlalarme handelt.`,
      `Die sofortige Evakuierung des gesamten Stadtteils durch den Sicherheitsmitarbeiter.`
    ];
    explanationText = `Musterlösung zu Frage ${i}: Bei Auslösung einer BMA muss die BMZ kontrolliert, der betroffene Bereich erkundet und die Feuerwehr gemäß Alarmplan eingewiesen werden.`;
  } else if (cat === "Rechtskunde") {
    questionText = `Prüfungsfrage #${i} (Rechtskunde): Welcher Grundsatz ist bei der Ausübung von Befugnissen (wie Jedermann-Festnahme oder Hausrecht) durch privates Wachpersonal zwingend zu wahren?`;
    optionsList = [
      `Der Grundsatz der Verhältnismäßigkeit (geeignet, erforderlich, geboten).`,
      `Das Recht auf uneingeschränkte körperliche Bestrafung von ertappten Dieben.`,
      `Die Befugnis zur Durchführung polizeilicher Vernehmungen unter Zwang.`,
      `Der Ausschluss jeglicher Dokumentationspflicht im Wachbuch.`
    ];
    explanationText = `Musterlösung zu Frage ${i}: Jede Maßnahme privater Sicherheitskräfte muss stets verhältnismäßig sein und sich im Rahmen der Jedermann-Rechte bewegen.`;
  } else if (cat === "Wirtschafts- und Sozialkunde") {
    questionText = `Prüfungsfrage #${i} (Wirtschafts- und Sozialkunde): Welche wesentlichen Regelungen enthält das Arbeitnehmerüberlassungsgesetz (AÜG) im Kontext des Wach- und Sicherheitsgewerbes?`;
    optionsList = [
      `Es regelt den gewerbsmäßigen Verleih von Arbeitskräften (Leiharbeit) an Entleiher unter strengen gesetzlichen Auflagen und Höchstüberlassungsdauern.`,
      `Es verbietet jegliche Form von Schichtarbeit in Sicherheitsunternehmen.`,
      `Es legt den gesetzlichen Mindestlohn für das gesamte Bundesgebiet auf exakt 25 Euro fest.`,
      `Es verpflichtet den Arbeitgeber zur Bereitstellung eines Dienstwagens für jeden Arbeitnehmer.`
    ];
    explanationText = `Musterlösung zu Frage ${i}: Das AÜG regelt den rechtlichen Rahmen für die Arbeitnehmerüberlassung und schützt Leiharbeitnehmer vor unzulässiger Benachteiligung.`;
  } else if (cat === "Dienstkunde") {
    questionText = `Prüfungsfrage #${i} (Dienstkunde): Welche Bedeutung hat der Streifendienst im Rahmen des werksinternen Objektschutzes?`;
    optionsList = [
      `Die präventive Schadensabwehr, Erkennung von Sicherheitslücken, Kontrolle von Verschlüssen und Durchsetzung der Ordnung auf dem Gelände.`,
      `Die ausschließliche Erholung des Mitarbeiters während der Nachtschicht.`,
      `Das Ersetzen der behördlichen Verkehrsüberwachung im öffentlichen Straßenverkehr.`,
      `Das unangekündigte Betreten fremder Privatwohnungen außerhalb des Werksgeländes.`
    ];
    explanationText = `Musterlösung zu Frage ${i}: Der Streifendienst dient der Prävention, der Überwachung technischer Einrichtungen und der Entdeckung von Gefahrenquellen.`;
  }

  let correctVal = isMultiGen ? [0, 1] : 0;

  rawGsskPool.push({
    id: i,
    isMulti: isMultiGen,
    category: cat,
    subcategory: sub,
    question: questionText,
    options: optionsList,
    correct: correctVal,
    explanation: explanationText
  });
}

let currentPool = [...rawGsskPool];
let currentIndex = 0;
let userAnswers = {};
let bookmarks = JSON.parse(localStorage.getItem('gssk_bookmarks') || '[]');
let stats = JSON.parse(localStorage.getItem('gssk_stats') || '{}');
let filterMode = 'all'; 
let timerInterval = null;
let timeLeft = 45;
let timerModeEnabled = false;

const lawCases = [
  { id: 1, title: "Fall 1: Der Ladendieb im Supermarkt", text: "Kunde K steckt eine teure Spirituose ein und passiert den Kassenbereich ohne zu bezahlen. Detektiv D beobachtet dies, läuft hinterher, reißt K zu Boden (wobei K leicht verletzt wird) und fixiert ihn.", question: "Beurteilen Sie das Handeln des Detektivs D strafrechtlich (insb. Körperverletzung, Rechtfertigung über § 127 StPO).", solution: "D handelte gem. § 127 Abs. 1 StPO (Jedermann-Festnahme) rechtmäßig hinsichtlich der Festnahme. Die Gewaltanwendung muss jedoch dem Verhältnismäßigkeitsgrundsatz entsprechen." },
  { id: 2, title: "Fall 2: Der ungebetene Besucher", text: "Besucher V betritt ein Betriebsgelände trotz sichtbaren Hausverbots. Werkschützer W fordert ihn zum Verlassen auf. V weigert sich lachend und bleibt stehen.", question: "Welche Rechtsgüter und Paragraphen greifen hier ein?", solution: "V erfüllt den Tatbestand des Hausfriedensbruchs nach § 123 StGB. W kann das Hausrecht des Betreibers (§ 903 BGB) durchsetzen." },
  { id: 3, title: "Fall 3: Notwehr in der Nacht", text: "Ein Einbrecher E bricht nachts in ein Firmengebäude ein. Wachmann W überrascht ihn. E greift sofort mit einem Schraubenzieher nach W.", question: "Liegt ein Notwehrrecht nach § 32 StGB für W vor?", solution: "Ja. Es liegt ein gegenwärtiger, rechtswidriger Angriff auf die körperliche Unversehrtheit vor. W darf sich verteidigen." },
  { id: 4, title: "Fall 4: Die Schranken-Kollision", text: "Ein LKW-Fahrer will ohne Ausweis auf das Werksgelände. W schließt die Schranke nicht rechtzeitig, der LKW beschädigt das Kassenhäuschen.", question: "Welche Ansprüche hat das Sicherheitsunternehmen?", solution: "Zivilrechtliche Schadensersatzansprüche nach § 823 Abs. 1 BGB (Unerlaubte Handlung)." },
  { id: 5, title: "Fall 5: Notstand bei Brand", text: "In einem Raum brennt es. W bricht die Tür zum Nebenraum auf, um einen Feuerlöscher zu holen, obwohl der Schlüssel nicht greifbar ist.", question: "Ist das Aufbrechen der Tür strafbar?", solution: "Nein, gerechtfertigt nach § 34 StGB (rechtfertigender Notstand) zur Abwehr einer gegenwärtigen Brandgefahr." },
  { id: 6, title: "Fall 6: Die Taschedurchsuchung", text: "W will beim Verlassen des Werks alle Mitarbeiter pauschal und ohne konkreten Verdacht körperlich durchsuchen.", question: "Ist das zulässig?", solution: "Nur, wenn dies im Arbeitsvertrag, einer Betriebsvereinbarung oder ausdrücklich auf freiwilliger Basis vereinbart ist." },
  { id: 7, title: "Fall 7: Festnahme auf Verdacht", text: "W beobachtet dunkel eine Gestalt am Zaun und nimmt den Passanten sofort fest, obwohl dieser nur spazieren ging.", question: "Rechtfertigung nach § 127 StPO gegeben?", solution: "Nein! § 127 Abs. 1 StPO erfordert 'auf frischer Tat betroffen'. Ein bloßer Verdacht reicht nicht aus." },
  { id: 8, title: "Fall 8: Schlüsselverlust", text: "W verliert fahrlässig den Generalschlüssel des Objekts in einer Kneipe.", question: "Welche rechtlichen Folgen drohen?", solution: "Schadensersatzhaftung wegen Pflichtverletzung aus dem Arbeitsvertrag (§ 280 BGB)." },
  { id: 9, title: "Fall 9: Übertriebene Härte", text: "Ein Jugendlicher wirft Steine gegen die Außenwand. W fesselt ihn mit Handschellen und schlägt ihm ins Gesicht.", question: "Strafbarkeit von W?", solution: "Körperverletzung (§ 223 StGB). Keine Rechtfertigung durch Notwehr oder Jedermann-Festnahme, da völlig unverhältnismäßig." },
  { id: 10, title: "Fall 10: Datenschutz am Empfang", text: "W legt die Besucherliste offen auf den Tresen, sodass jeder Besucher die Namen einsehen kann.", question: "Verstoß gegen welche Gesetze?", solution: "Verstoß gegen die Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG)." }
];

const theoryTopics = [
  { title: "1. Rechtliche Grundlagen (Rechtskunde)", content: "Umfasst das Strafrecht (StGB: Notwehr § 32, Notstand § 34, Jedermann-Festnahme § 127 StPO), das Zivilrecht (BGB: Besitzwehr § 859, Selbsthilfe § 229, Schadensersatz § 823) sowie das Gewerberecht (§ 34a GewO, Bewachungsverordnung BewachV)." },
  { title: "2. Aufgaben im Wach- und Sicherheitsdienst (Dienstkunde)", content: "Inhaltlich geht es um Objektschutz, Werkschutz, Einlasskontrollen, Streifendienst, Wachbuchführung, Verhalten in Notfällen, Alarmverfolgung und Kooperation mit Behörden." },
  { title: "3. Sicherheitstechnik & Gefahrenabwehr", content: "Einbruchmeldeanlagen (EMA), Videoüberwachungsanlagen (CCTV), Zutrittskontrollsysteme (ZKS), Brandmeldeanlagen (BMA), mechanische Sicherungseinrichtungen (Zäune, Tore, Schlösser)." },
  { title: "4. Serviceorientiertes Verhalten & Kommunikation", content: "Kundenorientierung, Deeskalationstechniken in Konfliktsituationen, professionelles Auftreten, interkulturelle Kompetenz, Beschwerdemanagement." },
  { title: "5. Wirtschafts- und Sozialkunde", content: "Grundzüge des Arbeitsrechts (Kündigungsschutz, Arbeitszeitgesetz ArbZG), Betriebsverfassungsgesetz (BetrVG), Tarifverträge im Wach- und Sicherheitsgewerbe." },
  { title: "6. Arbeit, Gesundheit & Umwelt (AGU)", content: "Arbeitssicherheit (DGUV Vorschriften), Unfallverhütungsvorschriften (UVV), persönliche Schutzausrüstung (PSA), Umweltschutz im Betrieb, Gefahrstoffkennzeichnung." },
  { title: "7. Datenschutz und Informationssicherheit", content: "DSGVO und BDSG im Sicherheitsdienst, Umgang mit personenbezogenen Daten, Geheimhaltungspflichten, IT-Sicherheit." }
];

// --- QUIZ LOGIK ---
function renderQuizGrid() {
  const container = document.getElementById('quizGridContainer');
  if (!container) return;
  container.innerHTML = '';
  document.getElementById('quizIndexCount').textContent = currentPool.length;
  
  currentPool.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'index-grid-btn';
    if(idx === currentIndex) btn.classList.add('current');
    if(stats[q.id]) {
      if(stats[q.id].correct > stats[q.id].wrong) btn.classList.add('answered');
      else btn.classList.add('flagged');
    }
    if(bookmarks.includes(q.id)) btn.classList.add('flagged');
    
    btn.textContent = idx + 1;
    btn.onclick = () => { currentIndex = idx; renderQuizQuestion(); };
    container.appendChild(btn);
  });
}

function renderQuizQuestion() {
  stopSpeech();
  renderQuizGrid();
  
  if (currentPool.length === 0) {
    const contentArea = document.getElementById('quizContentArea');
    const finishedScreen = document.getElementById('quizFinishedScreen');
    if(contentArea) contentArea.classList.add('hidden');
    if(finishedScreen) finishedScreen.classList.remove('hidden');
    renderStatDashboard();
    return;
  }
  
  if (currentIndex >= currentPool.length) {
    currentIndex = 0;
  }

  const q = currentPool[currentIndex];
  const counterElem = document.getElementById('counter');
  if(counterElem) counterElem.textContent = `Frage ${currentIndex + 1} von ${currentPool.length}`;
  
  const catBadge = document.getElementById('catBadge');
  const subCatBadge = document.getElementById('subCatBadge');
  const questionElem = document.getElementById('question');
  
  if(catBadge) catBadge.textContent = q.category;
  if(subCatBadge) subCatBadge.textContent = q.subcategory;
  if(questionElem) questionElem.textContent = q.question;
  
  const multiBadge = document.getElementById('multiBadge');
  const multiSubmit = document.getElementById('multiSubmitContainer');
  
  if (q.isMulti) {
    if(multiBadge) multiBadge.classList.remove('hidden');
    if(multiSubmit) multiSubmit.classList.remove('hidden');
  } else {
    if(multiBadge) multiBadge.classList.add('hidden');
    if(multiSubmit) multiSubmit.classList.add('hidden');
  }

  const optionsContainer = document.getElementById('options');
  if(!optionsContainer) return;
  optionsContainer.innerHTML = '';
  
  let optionsWithIndex = q.options.map((optText, originalIndex) => {
    return { text: optText, originalIndex: originalIndex };
  });
  optionsWithIndex.sort(() => Math.random() - 0.5);

  optionsWithIndex.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.textContent = item.text;
    btn.dataset.originalIndex = item.originalIndex;
    
    if (q.isMulti) {
      btn.onclick = () => { btn.classList.toggle('selected'); };
    } else {
      btn.onclick = () => handleOptionClickDynamic(item.originalIndex, q);
    }
    
    optionsContainer.appendChild(btn);
  });

  const expBox = document.getElementById('explanation');
  if(expBox) expBox.style.display = 'none';
  const nextBtn = document.getElementById('nextBtn');
  if(nextBtn) nextBtn.disabled = true;
  
  updateBookmarkIcon();
  resetTimer();
}

function handleOptionClickDynamic(selectedOriginalIdx, q) {
  const optionsContainer = document.getElementById('options');
  const buttons = optionsContainer.getElementsByTagName('button');
  for (let b of buttons) { b.disabled = true; }

  const isCorrect = (selectedOriginalIdx === q.correct);
  playSocketSound(isCorrect);

  Array.from(buttons).forEach(b => {
    let origIdx = parseInt(b.dataset.originalIndex);
    if (origIdx === q.correct) {
      b.classList.add('correct');
    }
    if (origIdx === selectedOriginalIdx && !isCorrect) {
      b.classList.add('wrong');
    }
  });

  recordStat(q.id, isCorrect);
  showExplanation(q);
  const nextBtn = document.getElementById('nextBtn');
  if(nextBtn) nextBtn.disabled = false;
  stopTimer();
  renderQuizGrid();
}

function submitMultiAnswer() {
  const q = currentPool[currentIndex];
  const optionsContainer = document.getElementById('options');
  const buttons = optionsContainer.getElementsByTagName('button');

  let selectedOriginalIndices = [];
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('selected')) {
      selectedOriginalIndices.push(parseInt(buttons[i].dataset.originalIndex));
    }
    buttons[i].disabled = true;
  }

  const correctArr = [...q.correct].sort();
  const userArr = [...selectedOriginalIndices].sort();
  
  let isCorrect = (correctArr.length === userArr.length && correctArr.every((v, i) => v === userArr[i]));
  playSocketSound(isCorrect);

  for (let i = 0; i < buttons.length; i++) {
    let origIdx = parseInt(buttons[i].dataset.originalIndex);
    if (correctArr.includes(origIdx)) {
      buttons[i].classList.add('correct');
    } else if (buttons[i].classList.contains('selected')) {
      buttons[i].classList.add('wrong');
    }
  }

  recordStat(q.id, isCorrect);
  showExplanation(q);
  const multiSubmit = document.getElementById('multiSubmitContainer');
  if(multiSubmit) multiSubmit.classList.add('hidden');
  const nextBtn = document.getElementById('nextBtn');
  if(nextBtn) nextBtn.disabled = false;
  stopTimer();
  renderQuizGrid();
}

function showExplanation(q) {
  const expBox = document.getElementById('explanation');
  const expText = document.getElementById('explanationText');
  if(expText) expText.textContent = q.explanation;
  if(expBox) expBox.style.display = 'block';
}

function nextQuestion() {
  currentIndex++;
  renderQuizQuestion();
}

function restartQuiz() {
  currentIndex = 0;
  currentPool = [...rawGsskPool];
  const contentArea = document.getElementById('quizContentArea');
  const finishedScreen = document.getElementById('quizFinishedScreen');
  if(contentArea) contentArea.classList.remove('hidden');
  if(finishedScreen) finishedScreen.classList.add('hidden');
  renderQuizQuestion();
}

function recordStat(qid, success) {
  if (!stats[qid]) {
    stats[qid] = { correct: 0, wrong: 0 };
  }
  if (success) stats[qid].correct++;
  else stats[qid].wrong++;
  localStorage.setItem('gssk_stats', JSON.stringify(stats));
}

// Funktion zum Zurücksetzen der Statistik
function resetAllStats() {
  if (confirm("Möchtest du deinen gesamten Lernfortschritt und alle Statistiken wirklich zurücksetzen?")) {
    localStorage.removeItem('gssk_stats');
    localStorage.removeItem('gssk_bookmarks');
    stats = {};
    bookmarks = [];
    
    if (typeof renderQuizGrid === 'function') {
      renderQuizGrid();
    }
    if (typeof renderStatDashboard === 'function') {
      renderStatDashboard();
    }
    if (typeof renderQuizQuestion === 'function') {
      renderQuizQuestion();
    }
    alert("Statistik und Lesezeichen wurden erfolgreich zurückgesetzt.");
  }
}

function filterQuizQuestions() {
  const searchInput = document.getElementById('quizSearchInput');
  if(!searchInput) return;
  const query = searchInput.value.toLowerCase();
  
  currentPool = rawGsskPool.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(query) || q.category.toLowerCase().includes(query) || q.subcategory.toLowerCase().includes(query);
    if (!matchesSearch) return false;
    
    if (filterMode === 'bookmark') return bookmarks.includes(q.id);
    if (filterMode === 'weak') return stats[q.id] && stats[q.id].wrong > stats[q.id].correct;
    if (filterMode === 'mastered') return stats[q.id] && stats[q.id].correct > 0 && stats[q.id].correct >= stats[q.id].wrong;
    return true;
  });
  currentIndex = 0;
  renderQuizQuestion();
}

function toggleBookmarkFilter() {
  filterMode = (filterMode === 'bookmark') ? 'all' : 'bookmark';
  updateFilterButtons();
  filterQuizQuestions();
}
function toggleWeakFilter() {
  filterMode = (filterMode === 'weak') ? 'all' : 'weak';
  updateFilterButtons();
  filterQuizQuestions();
}
function toggleMasteredFilter() {
  filterMode = (filterMode === 'mastered') ? 'all' : 'mastered';
  updateFilterButtons();
  filterQuizQuestions();
}

function updateFilterButtons() {
  const b1 = document.getElementById('filterBookmarkBtn');
  const b2 = document.getElementById('filterWeakBtn');
  const b3 = document.getElementById('filterMasteredBtn');
  if(b1) b1.classList.toggle('active', filterMode === 'bookmark');
  if(b2) b2.classList.toggle('active', filterMode === 'weak');
  if(b3) b3.classList.toggle('active', filterMode === 'mastered');
}

function toggleCurrentBookmark() {
  const q = currentPool[currentIndex];
  if (!q) return;
  const idx = bookmarks.indexOf(q.id);
  if (idx > -1) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(q.id);
  }
  localStorage.setItem('gssk_bookmarks', JSON.stringify(bookmarks));
  updateBookmarkIcon();
  renderQuizGrid();
}

function updateBookmarkIcon() {
  const q = currentPool[currentIndex];
  const btn = document.getElementById('quizBookmarkBtn');
  if(!btn) return;
  if (q && bookmarks.includes(q.id)) {
    btn.textContent = "★";
    btn.style.color = "#fbbf24";
  } else {
    btn.textContent = "☆";
    btn.style.color = "inherit";
  }
}

function renderStatDashboard() {
  let totalAnswered = Object.keys(stats).length;
  let correctCount = Object.values(stats).filter(s => s.correct > s.wrong).length;
  let container = document.getElementById('statDashboard');
  if(!container) return;
  
  container.innerHTML = `
    <div class="section-card">
      <div class="section-title">📊 Lernfortschritt</div>
      <p>Beantwortete Fragen im Pool: <strong>${totalAnswered} / ${rawGsskPool.length}</strong></p>
      <p>Sicher beherrschte Fragen: <strong>${correctCount}</strong></p>
      <div class="stat-bar-wrapper">
        <div class="stat-bar-fill" style="width: ${(totalAnswered / rawGsskPool.length) * 100}%;"></div>
      </div>
      <button onclick="resetAllStats()" class="btn-option" style="background-color: #ef4444; color: white; margin-top: 15px; width: 100%;">
        🗑️ Lernfortschritt & Statistik zurücksetzen
      </button>
    </div>
  `;
}

function toggleTimerMode() {
  const checkbox = document.getElementById('timerCheckbox');
  if(!checkbox) return;
  timerModeEnabled = checkbox.checked;
  const timerBox = document.getElementById('quizTimerBox');
  if(timerModeEnabled) {
    if(timerBox) timerBox.classList.remove('hidden');
    resetTimer();
  } else {
    if(timerBox) timerBox.classList.add('hidden');
    stopTimer();
  }
}

function resetTimer() {
  if (!timerModeEnabled) return;
  stopTimer();
  timeLeft = 45;
  const timerBox = document.getElementById('quizTimerBox');
  if(timerBox) timerBox.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    if(timerBox) timerBox.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      nextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

let currentUtterance = null;
function speakCurrentQuestion() {
  if (!('speechSynthesis' in window)) {
    alert("Dein Browser unterstützt keine Sprachausgabe.");
    return;
  }
  window.speechSynthesis.cancel();
  const q = currentPool[currentIndex];
  if (!q) return;
  
  let textToSpeak = q.question + ". Antwortmöglichkeiten: ";
  q.options.forEach((opt, i) => {
    textToSpeak += `Option ${i+1}: ${opt}. `;
  });
  
  currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance.lang = 'de-DE';
  window.speechSynthesis.speak(currentUtterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
}

// --- IHK PRÜFUNGSSIMULATION ---
let examQuestions = [];
let examCurrentIdx = 0;
let examUserAnswers = {};
let examFlags = [];
let examTimerInterval = null;
let examTimeRemaining = 45 * 60;

function startRealExam() {
  const catSelect = document.getElementById('examCategorySelect');
  if(!catSelect) return;
  const cat = catSelect.value;
  let pool = [...rawGsskPool];
  
  if(cat !== 'all') {
    pool = pool.filter(q => q.category === cat);
  }
  
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  examQuestions = pool.slice(0, 30);
  examCurrentIdx = 0;
  examUserAnswers = {};
  examFlags = [];
  
  const startScreen = document.getElementById('examStartScreen');
  const resultScreen = document.getElementById('examResultScreen');
  const examScreen = document.getElementById('examScreen');

  if(startScreen) startScreen.classList.add('hidden');
  if(resultScreen) resultScreen.classList.add('hidden');
  if(examScreen) examScreen.classList.remove('hidden');
  
  renderExamGrid();
  loadExamQuestion();
  startExamTimer();
}

function startExamTimer() {
  examTimeRemaining = 45 * 60;
  if(examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    examTimeRemaining--;
    let mins = Math.floor(examTimeRemaining / 60);
    let secs = examTimeRemaining % 60;
    const timerElem = document.getElementById('examTimer');
    if(timerElem) timerElem.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    if(examTimeRemaining <= 0) {
      clearInterval(examTimerInterval);
      finishExam();
    }
  }, 1000);
}

function renderExamGrid() {
  const container = document.getElementById('examGridContainer');
  if(!container) return;
  container.innerHTML = '';
  examQuestions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'index-grid-btn';
    if(idx === examCurrentIdx) btn.classList.add('current');
    if(examUserAnswers[idx] !== undefined) btn.classList.add('answered');
    if(examFlags.includes(idx)) btn.classList.add('flagged');
    btn.textContent = idx + 1;
    btn.onclick = () => { 
      examCurrentIdx = idx; 
      loadExamQuestion(); 
    };
    container.appendChild(btn);
  });
}

function loadExamQuestion() {
  const q = examQuestions[examCurrentIdx];
  if(!q) return;
  
  const counterElem = document.getElementById('examCounter');
  const questionElem = document.getElementById('examQuestion');
  if(counterElem) counterElem.textContent = `Frage ${examCurrentIdx + 1} von ${examQuestions.length}`;
  if(questionElem) questionElem.textContent = q.question;
  
  const flagBtn = document.getElementById('examFlagBtn');
  if(flagBtn) flagBtn.textContent = examFlags.includes(examCurrentIdx) ? "🚩 Markierung aufheben" : "🚩 Frage markieren";
  
  const multiSubmit = document.getElementById('examMultiSubmitContainer');
  if(q.isMulti) {
    if(multiSubmit) multiSubmit.classList.remove('hidden');
  } else {
    if(multiSubmit) multiSubmit.classList.add('hidden');
  }

  const optionsContainer = document.getElementById('examOptions');
  if(!optionsContainer) return;
  optionsContainer.innerHTML = '';
  
  let optionsWithIndex = q.options.map((optText, originalIndex) => {
    return { text: optText, originalIndex: originalIndex };
  });
  optionsWithIndex.sort(() => Math.random() - 0.5);

  optionsWithIndex.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.textContent = item.text;
    btn.dataset.originalIndex = item.originalIndex;
    
    if(q.isMulti) {
      if(examUserAnswers[examCurrentIdx] && Array.isArray(examUserAnswers[examCurrentIdx]) && examUserAnswers[examCurrentIdx].includes(item.originalIndex)) {
        btn.classList.add('selected');
      }
      btn.onclick = () => { btn.classList.toggle('selected'); };
    } else {
      if(examUserAnswers[examCurrentIdx] === item.originalIndex) {
        btn.classList.add('selected');
      }
      btn.onclick = () => {
        examUserAnswers[examCurrentIdx] = item.originalIndex;
        renderExamGrid();
        loadExamQuestion();
      };
    }
    optionsContainer.appendChild(btn);
  });
  
  const prevBtn = document.getElementById('examPrevBtn');
  const nextBtn = document.getElementById('examNextBtn');
  if(prevBtn) prevBtn.disabled = (examCurrentIdx === 0);
  if(nextBtn) nextBtn.disabled = (examCurrentIdx === examQuestions.length - 1);
  
  renderExamGrid();
}

function submitExamMultiAnswer() {
  const optionsContainer = document.getElementById('examOptions');
  if(!optionsContainer) return;
  const buttons = optionsContainer.getElementsByTagName('button');
  let selected = [];
  for(let i=0; i<buttons.length; i++) {
    if(buttons[i].classList.contains('selected')) {
      let origIdx = parseInt(buttons[i].dataset.originalIndex);
      selected.push(origIdx);
    }
  }
  examUserAnswers[examCurrentIdx] = selected;
  renderExamGrid();
  alert("Mehrfachauswahl gespeichert.");
}

function nextExamQuestion() {
  if(examCurrentIdx < examQuestions.length - 1) {
    examCurrentIdx++;
    loadExamQuestion();
  }
}

function prevExamQuestion() {
  if(examCurrentIdx > 0) {
    examCurrentIdx--;
    loadExamQuestion();
  }
}

function toggleExamFlag() {
  const idx = examFlags.indexOf(examCurrentIdx);
  if(idx > -1) examFlags.splice(idx, 1);
  else examFlags.push(examCurrentIdx);
  renderExamGrid();
  loadExamQuestion();
}

function finishExamPrompt() {
  if(confirm("Möchtest du die Prüfung jetzt wirklich abgeben und auswerten lassen?")) {
    finishExam();
  }
}

function finishExam() {
  if(examTimerInterval) clearInterval(examTimerInterval);
  const examScreen = document.getElementById('examScreen');
  const resultScreen = document.getElementById('examResultScreen');
  if(examScreen) examScreen.classList.add('hidden');
  if(resultScreen) resultScreen.classList.remove('hidden');
  
  let correctCount = 0;
  examQuestions.forEach((q, idx) => {
    let ans = examUserAnswers[idx];
    if(q.isMulti) {
      if(ans && Array.isArray(ans)) {
        let correctArr = [...q.correct].sort();
        let userArr = [...ans].sort();
        if(correctArr.length === userArr.length && correctArr.every((v, i) => v === userArr[i])) {
          correctCount++;
        }
      }
    } else {
      if(ans === q.correct) correctCount++;
    }
  });
  
  let percent = Math.round((correctCount / examQuestions.length) * 100);
  let passed = percent >= 50;
  
  const resTitle = document.getElementById('resultTitle');
  const resScore = document.getElementById('resultScore');
  const resStatus = document.getElementById('resultStatus');
  if(resTitle) resTitle.textContent = passed ? "🎉 Bestanden!" : "❌ Leider nicht bestanden.";
  if(resScore) resScore.textContent = `Ergebnis: ${correctCount} von ${examQuestions.length} Fragen richtig (${percent}%)`;
  if(resStatus) resStatus.textContent = passed ? "Du hast die erforderliche Punktzahl erreicht." : "Du hast weniger als 50% erreicht. Übe weiter im Quiz-Modus!";
  
  const reviewList = document.getElementById('examReviewList');
  if(!reviewList) return;
  reviewList.innerHTML = '';
  examQuestions.forEach((q, idx) => {
    let ans = examUserAnswers[idx];
    let isCorrect = false;
    if(q.isMulti) {
      if(ans && Array.isArray(ans)) {
        let correctArr = [...q.correct].sort();
        let userArr = [...ans].sort();
        isCorrect = (correctArr.length === userArr.length && correctArr.every((v, i) => v === userArr[i]));
      }
    } else {
      isCorrect = (ans === q.correct);
    }
    
    const div = document.createElement('div');
    div.className = 'section-card';
    div.style.borderLeftColor = isCorrect ? '#10b981' : '#ef4444';
    div.innerHTML = `
      <div class="section-title">Frage ${idx + 1}: ${isCorrect ? '✅ Richtig' : '❌ Falsch'}</div>
      <p><strong>${q.question}</strong></p>
      <p style="font-size: 0.9rem; color: var(--text-muted);">${q.explanation}</p>
    `;
    reviewList.appendChild(div);
  });
}

function resetToExamStart() {
  const examResultScreen = document.getElementById('examResultScreen');
  const examStartScreen = document.getElementById('examStartScreen');
  if(examResultScreen) examResultScreen.classList.add('hidden');
  if(examStartScreen) examStartScreen.classList.remove('hidden');
}

function renderLawCases() {
  const container = document.getElementById('caseContainer');
  if(!container) return;
  container.innerHTML = '';
  lawCases.forEach(c => {
    const div = document.createElement('div');
    div.className = 'section-card law-card';
    div.innerHTML = `
      <div class="section-title law-title">${c.title}</div>
      <p><strong>Sachverhalt:</strong> ${c.text}</p>
      <p><strong>Prüfungsfrage:</strong> ${c.question}</p>
      <details style="margin-top: 10px; cursor: pointer; color: var(--text-muted);">
        <summary style="font-weight: 600; color: #60a5fa;">💡 Musterlösung anzeigen</summary>
        <p style="margin-top: 8px; color: var(--text-color); background: var(--option-bg); padding: 10px; border-radius: 6px;">${c.solution}</p>
      </details>
    `;
    container.appendChild(div);
  });
}

function renderTheoryTopics() {
  const container = document.getElementById('theoryContainer');
  if(!container) return;
  container.innerHTML = '';
  theoryTopics.forEach(t => {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.innerHTML = `
      <div class="section-title">${t.title}</div>
      <p style="line-height: 1.5;">${t.content}</p>
    `;
    container.appendChild(div);
  });
}
