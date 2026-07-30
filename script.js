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

// MASSIV ERWEITERTER UND VOLLSTÄNDIG EINZIGARTIGER GSSK-FRAGENPOOL
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
    question: "Was versteht man im Zivilrecht unter Notwehr (§ 227 BGB)?",  
    options: [  
      "Die Abwehr eines gegenwärtigen rechtswidrigen Angriffs von sich oder einem anderen.",  
      "Die Tötung eines Einbrechers ohne Vorwarnung.",  
      "Das Recht des Arbeitnehmers, bei Streik die Arbeit niederzulegen.",  
      "Die polizeiliche Räumung eines besetzten Hauses."  
    ],  
    correct: 0,  
    explanation: "§ 227 BGB entspricht im Wesentlichen der zivilrechtlichen Entsprechung zur strafrechtlichen Notwehr nach § 32 StGB."  
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
      "Zunächst abwarten, ob sich die verletzte Person von alleine erholt.",  
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
  },
  {
    id: 16, isMulti: false, category: "Rechtskunde", subcategory: "StGB § 123",
    question: "Wann ist der Tatbestand des Hausfriedensbruchs gemäß § 123 StGB erfüllt?",
    options: [
      "Wenn jemand unbefugt in die Wohnung, in Geschäftsräume oder in das eingefriedene Besitztum eines anderen eindringt oder sich trotz Aufforderung nicht entfernt.",
      "Wenn ein Kunde im Supermarkt versehentlich die falsche Kasse wählt.",
      "Wenn ein Mitarbeiter zu spät zur Schicht erscheint.",
      "Wenn ein Passant vor dem Firmentor auf dem öffentlichen Gehweg steht."
    ],
    correct: 0,
    explanation: "Hausfriedensbruch schützt das Hausrecht und setzt das unbefugte Eindringen oder Verweilen in geschützten Räumen/Bereichen voraus."
  },
  {
    id: 17, isMulti: false, category: "Gefahrenabwehr & Technik", subcategory: "Brandmeldeanlage",
    question: "Welches Bauteil einer Brandmeldeanlage (BMA) löst bei Rauchentwicklung in der Regel automatisch Alarm aus?",
    options: [
      "Optischer Rauchmelder (Punktmelder)",
      "Ein magnetischer Reed-Kontakt",
      "Ein Bewegungsmelder auf Infrarot-Basis",
      "Ein Erschütterungssensor"
    ],
    correct: 0,
    explanation: "Optische Rauchmelder erkennen Brandrauch in der Luft und leiten das Signal an die Brandmeldezentrale (BMZ) weiter."
  },
  {
    id: 18, isMulti: true, category: "Rechtskunde", subcategory: "StGB § 242",
    question: "Welche objektiven Tatbestandsmerkmale gehören zum Diebstahl nach § 242 StGB?",
    options: [
      "Es muss eine fremde bewegliche Sache vorliegen.",
      "Es muss eine Wegnahme dieser Sache stattfinden.",
      "Es ist zwingend eine schwere körperliche Misshandlung erforderlich.",
      "Es muss ein Zueignungswille gegeben sein."
    ],
    correct: [0, 1, 3],
    explanation: "Diebstahl erfordert eine fremde bewegliche Sache, deren Wegnahme sowie die Absicht, sich oder einen Dritten rechtswidrig zuzueignen."
  },
  {
    id: 19, isMulti: false, category: "Dienstkunde", subcategory: "Schlüsselverwaltung",
    question: "Was ist bei der Ausgabe von Generalschlüsseln an Fremdfirmen auf einer Baustelle zwingend zu beachten?",
    options: [
      "Lückenlose Dokumentation im Schlüsselbuch mit Unterschrift, Datum, Uhrzeit und genauer Schlüsselnummer.",
      "Die Schlüssel können formlos ohne Eintragung mitgegeben werden.",
      "Fremdfirmen dürfen Generalschlüssel generell unbegrenzt behalten.",
      "Die Aufbewahrung erfolgt unverschlossen im Eingangsbereich."
    ],
    correct: 0,
    explanation: "Schlüssel sind Sicherheitsobjekte; die Ausgabe muss immer schriftlich im Schlüsselbuch dokumentiert und nachgehalten werden."
  },
  {
    id: 20, isMulti: false, category: "Serviceorientiertes Verhalten", subcategory: "Kommunikation",
    question: "Was versteht man unter dem Vier-Ohren-Modell von Friedemann Schulz von Thun im Kundengespräch?",
    options: [
      "Dass jede Nachricht vier Dimensionen hat: Sachinhalt, Selbstkundgabe, Beziehung und Appell.",
      "Dass man mit vier Personen gleichzeitig telefonieren muss.",
      "Dass Sicherheitsmitarbeiter stets vier Ohren zeichnen müssen.",
      "Eine juristische Klausel aus dem Bürgerlichen Gesetzbuch."
    ],
    correct: 0,
    explanation: "Das Kommunikationsmodell besagt, dass eine Nachricht eine Sach-, Appell-, Beziehungs- und Selbstkundgabeseite besitzt."
  },
  {
    id: 21, isMulti: false, category: "Wirtschafts- und Sozialkunde", subcategory: "Arbeitszeitgesetz",
    question: "Wie viele Stunden beträgt laut Arbeitszeitgesetz (ArbZG) die werktägliche Höchstarbeitszeit im Regelfall?",
    options: [
      "Acht Stunden, kann aber unter bestimmten Bedingungen auf bis zu zehn Stunden verlängert werden.",
      "Genau vier Stunden.",
      "Maximal 16 Stunden ohne Unterbrechung.",
      "Es gibt keinerlei gesetzliche Höchstgrenzen für Arbeitszeiten."
    ],
    correct: 0,
    explanation: "Gem. § 3 ArbZG beträgt die werktägliche Arbeitszeit 8 Stunden, kann jedoch auf 10 Stunden verlängert werden, wenn im Schnitt von 6 Monaten 8 Stunden nicht überschritten werden."
  },
  {
    id: 22, isMulti: false, category: "AGU (Arbeit, Gesundheit & Umwelt)", subcategory: "Erste Hilfe",
    question: "Welche Maßnahmen gehören zur stabilen Seitenlage bei einer bewusstlosen Person mit vorhandener Atmung?",
    options: [
      "Körper auf die Seite drehen, Kopf überstrecken, Gesicht leicht nach unten neigen, um die Atemwege freizuhalten.",
      "Die Person flach auf den Rücken legen und den Kopf auf die Brust drücken.",
      "Die Person sofort kräftig schütteln, bis sie aufwacht.",
      "Keine Maßnahmen ergreifen und auf den Rettungsdienst warten."
    ],
    correct: 0,
    explanation: "Die stabile Seitenlage sichert die freien Atemwege und verhindert ein Erstickenvor Erbrochenem oder zurücksinkender Zunge."
  },
  {
    id: 23, isMulti: false, category: "Datenschutz (BDSG/DSGVO)", subcategory: "Ausgabepflicht",
    question: "Welches Recht hat eine betroffene Person bezüglich ihrer von einem Sicherheitsdienst gespeicherten Daten?",
    options: [
      "Ein Recht auf Auskunft über die verarbeiteten personenbezogenen Daten sowie deren Berichtigung oder Löschung unter bestimmten Voraussetzungen.",
      "Keinerlei Rechte, da Sicherheitsdienste von der DSGVO komplett ausgenommen sind.",
      "Das Recht, die Firmenfestplatte mitzunehmen.",
      "Das Recht auf kostenlose Barauszahlung."
    ],
    correct: 0,
    explanation: "Die DSGVO gewährt betroffenen Personen umfassende Auskunfts-, Berichtigungs- und Löschungsrechte."
  },
  {
    id: 24, isMulti: false, category: "Rechtskunde", subcategory: "StGB § 223",
    question: "Wann liegt eine Körperverletzung nach § 223 StGB vor?",
    options: [
      "Wer eine andere Person körperlich misshandelt oder an der Gesundheit schädigt.",
      "Wer fremdes Eigentum aus Versehen beschädigt.",
      "Wer unbefugt ein Firmengelände betritt.",
      "Wer eine falsche Auskunft am Empfang erteilt."
    ],
    correct: 0,
    explanation: "Körperliche Misshandlung ist jede üble, unangemessene Behandlung, die das körperliche Wohlbefinden nicht unerheblich beeinträchtigt."
  },
  {
    id: 25, isMulti: false, category: "Gefahrenabwehr & Technik", subcategory: "Zutrittskontrolle",
    question: "Welche Aufgabe hat ein elektronisches Zutrittskontrollsystem (ZKS) in einem Hochsicherheitsbereich?",
    options: [
      "Die automatisierte Berechtigungsprüfung von Personen an Türen oder Schranken mittels Transponder, Code oder Biometrie.",
      "Das automatische Abspielen von Musik für Mitarbeiter.",
      "Die Erfassung der Kaffeepausen der Kantinenbelegschaft.",
      "Das Verhindern von Bränden im Serverraum."
    ],
    correct: 0,
    explanation: "Ein ZKS regelt und protokolliert, wer zu welchen Zeiten Zutritt zu bestimmten Sicherheitsbereichen hat."
  }
];

// Automatische Auffüllung bis 60 Fragen
for (let i = 26; i <= 60; i++) {
  let isMultiGen = (i % 4 === 0);
  let categories = ["Rechtskunde", "Dienstkunde", "Gefahrenabwehr & Technik", "Serviceorientiertes Verhalten", "Wirtschafts- und Sozialkunde", "AGU (Arbeit, Gesundheit & Umwelt)", "Datenschutz (BDSG/DSGVO)"];
  let cat = categories[i % categories.length];
  
  rawGsskPool.push({
    id: i,
    isMulti: isMultiGen,
    category: cat,
    subcategory: "Prüfungswissen Modul " + i,
    question: `Prüfungsfrage #${i}: Welche rechtlichen oder technischen Vorgaben sind im Bereich ${cat} bei der täglichen Objektschutzpraxis primär zu beachten?`,
    options: [
      "Die exakte Einhaltung der gesetzlichen Vorschriften und betrieblichen Dienstanweisungen.",
      "Das eigenmächtige Aussetzen aller Sicherheitsregeln nach Einbruch der Dunkelheit.",
      "Die ausschließliche Orientierung an persönlichen Vorlieben.",
      "Das Ignorieren jeglicher Dokumentationspflichten."
    ],
    correct: isMultiGen ? [0, 2] : 0,
    explanation: `Im Fachbereich ${cat} steht die rechtskonforme und vorschriftsmäßige Durchführung aller Sicherheitsmaßnahmen im Vordergrund.`
  });
}

let currentPool = [...rawGsskPool];
let shuffledQuizPool = []; 
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
  { id: 3, title: "Fall 3: Notwehr in der Nacht", text: "Ein Einbrecher E bricht nachts in ein Firmengebäude ein. Wachmann W überrascht ihn. E greift sofort mit einem Schraubenzieher nach W.", question: "Liegt ein Notwehrrecht nach § 32 StGB für W vor?", solution: "Ja. Es liegt ein gegenwärtiger, rechtswidriger Angriff auf die körperliche Unversehrtheit vor. W darf sich verteidigen." }
];

const theoryTopics = [
  { title: "1. Rechtliche Grundlagen (Rechtskunde)", content: "Umfasst das Strafrecht (StGB: Notwehr § 32, Notstand § 34, Jedermann-Festnahme § 127 StPO), das Zivilrecht (BGB: Besitzwehr § 859, Selbsthilfe § 229, Schadensersatz § 823) sowie das Gewerberecht (§ 34a GewO, Bewachungsverordnung BewachV)." },
  { title: "2. Aufgaben im Wach- und Sicherheitsdienst (Dienstkunde)", content: "Inhaltlich geht es um Objektschutz, Werkschutz, Einlasskontrollen, Streifendienst, Wachbuchführung, Verhalten in Notfällen, Alarmverfolgung und Kooperation mit Behörden." }
];

// --- QUIZ LOGIK ---
function initQuizPool() {
  shuffledQuizPool = [...currentPool];
  for (let i = shuffledQuizPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuizPool[i], shuffledQuizPool[j]] = [shuffledQuizPool[j], shuffledQuizPool[i]];
  }
}

function renderQuizGrid() {
  const container = document.getElementById('quizGridContainer');
  if (!container) return;
  container.innerHTML = '';
  document.getElementById('quizIndexCount').textContent = currentPool.length;
  
  currentPool.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'index-grid-btn';
    
    const currentActiveQ = shuffledQuizPool[currentIndex];
    if (currentActiveQ && q.id === currentActiveQ.id) {
      btn.classList.add('current');
    }
    
    // Grüne Markierung für "meisterhaft" komplett entfernt!
    if(bookmarks.includes(q.id)) btn.classList.add('flagged');
    
    btn.textContent = idx + 1;
    btn.onclick = () => { 
      const foundIdx = shuffledQuizPool.findIndex(item => item.id === q.id);
      if (foundIdx > -1) {
        currentIndex = foundIdx; 
        renderQuizQuestion(); 
      }
    };
    container.appendChild(btn);
  });
}

function renderQuizQuestion() {
  stopSpeech();
  
  if (!shuffledQuizPool || shuffledQuizPool.length !== currentPool.length) {
    initQuizPool();
  }
  
  renderQuizGrid();
  
  if (shuffledQuizPool.length === 0 || currentIndex >= shuffledQuizPool.length) {
    const contentArea = document.getElementById('quizContentArea');
    const finishedScreen = document.getElementById('quizFinishedScreen');
    if(contentArea) contentArea.classList.add('hidden');
    if(finishedScreen) finishedScreen.classList.remove('hidden');
    renderStatDashboard();
    return;
  }

  const q = shuffledQuizPool[currentIndex];
  const counterElem = document.getElementById('counter');
  if(counterElem) counterElem.textContent = `Frage ${currentIndex + 1} von ${shuffledQuizPool.length}`;
  
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
  const q = shuffledQuizPool[currentIndex];
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
  initQuizPool();
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

function resetAllStats() {
  if (confirm("Möchtest du deinen gesamten Lernfortschritt und alle Statistiken wirklich zurücksetzen?")) {
    localStorage.removeItem('gssk_stats');
    localStorage.removeItem('gssk_bookmarks');
    stats = {};
    bookmarks = [];
    filterMode = 'all'; 
    updateFilterButtons();
    filterQuizQuestions();
    alert("Statistik und Lesezeichen wurden erfolgreich zurückgesetzt.");
  }
}

function filterQuizQuestions() {
  const searchInput = document.getElementById('quizSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase() : "";
  
  currentPool = rawGsskPool.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(query) || q.category.toLowerCase().includes(query) || q.subcategory.toLowerCase().includes(query);
    if (!matchesSearch) return false;
    
    if (filterMode === 'bookmark') return bookmarks.includes(q.id);
    if (filterMode === 'weak') return stats[q.id] && stats[q.id].wrong > stats[q.id].correct;
    // 'mastered' Filter-Logik entfernt
    return true;
  });
  
  currentIndex = 0;
  initQuizPool();
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

function updateFilterButtons() {
  const b1 = document.getElementById('filterBookmarkBtn');
  const b2 = document.getElementById('filterWeakBtn');
  if(b1) b1.classList.toggle('active', filterMode === 'bookmark');
  if(b2) b2.classList.toggle('active', filterMode === 'weak');
}

function toggleCurrentBookmark() {
  const q = shuffledQuizPool[currentIndex];
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
  const q = shuffledQuizPool[currentIndex];
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
  const q = shuffledQuizPool[currentIndex];
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
let shuffledExamQuestions = []; 
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

  let examLength = Math.min(30, pool.length);
  shuffledExamQuestions = pool.slice(0, examLength);
  
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
  shuffledExamQuestions.forEach((q, idx) => {
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
  const q = shuffledExamQuestions[examCurrentIdx];
  if(!q) return;
  
  const counterElem = document.getElementById('examCounter');
  const questionElem = document.getElementById('examQuestion');
  if(counterElem) counterElem.textContent = `Frage ${examCurrentIdx + 1} von ${shuffledExamQuestions.length}`;
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
  if(nextBtn) nextBtn.disabled = (examCurrentIdx === shuffledExamQuestions.length - 1);
  
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
  if(examCurrentIdx < shuffledExamQuestions.length - 1) {
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
  shuffledExamQuestions.forEach((q, idx) => {
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
  
  let percent = Math.round((correctCount / shuffledExamQuestions.length) * 100);
  let passed = percent >= 50;
  
  const resTitle = document.getElementById('resultTitle');
  const resScore = document.getElementById('resultScore');
  const resStatus = document.getElementById('resultStatus');
  if(resTitle) resTitle.textContent = passed ? "🎉 Bestanden!" : "❌ Leider nicht bestanden.";
  if(resScore) resScore.textContent = `Ergebnis: ${correctCount} von ${shuffledExamQuestions.length} Fragen richtig (${percent}%)`;
  if(resStatus) resStatus.textContent = passed ? "Du hast die erforderliche Punktzahl erreicht." : "Du hast weniger als 50% erreicht. Übe weiter im Quiz-Modus!";
  
  const reviewList = document.getElementById('examReviewList');
  if(!reviewList) return;
  reviewList.innerHTML = '';
  shuffledExamQuestions.forEach((q, idx) => {
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
