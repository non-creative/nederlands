// Grammar: one-line rules with sentence structures, live examples, practice, and spaced review of topics.
// Example sources, in order: Tatoeba (api.tatoeba.org), Wiktionary usage examples, then the course's own sentences when offline.
document.head.append(Object.assign(document.createElement("style"),{textContent:".rule{background:var(--bg);border-radius:20px;padding:18px 20px}.one{font-size:19px;font-weight:500;margin:0;line-height:1.4}.st,.no,.gnote{margin-top:14px;padding-top:14px;border-top:2px solid var(--c)}.slots{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.slot{background:var(--c);color:var(--mut);border-radius:8px;padding:3px 9px;font-size:14px}.pl{display:inline-flex;gap:6px;align-items:center;white-space:nowrap}.slot.k{background:var(--c2);color:var(--on2);font-weight:500}.stx{margin-top:8px;font-size:20px}.stx b{color:var(--ac);font-weight:500}.sten,.gnote{color:var(--mut);font-size:15px}.no{font-size:17px}.w0{color:var(--bad);text-decoration:line-through}.w1{color:var(--ok);font-weight:500}#app a{color:var(--ac)}.gtop{display:flex;align-items:center;gap:8px;margin-bottom:10px}.one{font-size:21px;font-weight:500;line-height:1.35;margin:0 0 12px}.why{margin:0;color:var(--mut);font-size:17px;line-height:1.6}.pat{margin-top:14px;padding:18px 18px 16px;border-radius:20px;background:var(--bg)}.cols{display:flex;flex-wrap:wrap;gap:14px 10px;align-items:flex-end}.col{display:flex;flex-direction:column;gap:5px;min-width:0}.col .lab{font-size:12.5px;line-height:1.25;color:var(--mut);max-width:11em}.col.key .lab{color:var(--ink);font-weight:500}.col .wd{font-size:21px;line-height:1.3;padding:2px 3px 4px;border-bottom:3px solid var(--k)}.col.key .wd{font-weight:600;padding:2px 9px 4px;border-radius:9px 9px 0 0;background:color-mix(in srgb,var(--k) 16%,transparent)}.c0{--k:var(--k0)}.c1{--k:var(--k1)}.c2{--k:var(--k2)}.c3{--k:var(--k3)}.c4{--k:var(--k4)}.sten{margin-top:12px;font-size:15px;color:var(--mut)}.gnote{margin:12px 0 0;color:var(--mut);font-size:15px}.nos{display:grid;gap:8px}.nos>div{display:flex;align-items:baseline;gap:12px;padding:14px 18px;border-radius:16px;background:var(--bg);font-size:19px}.nos .tag{display:inline-block;min-width:4.6em;font-size:12.5px;color:var(--mut)}.list .card small{display:block;margin-top:2px}.list .card em{font-style:normal;font-size:13px;font-weight:500;color:var(--on2);background:var(--c2);border-radius:99px;padding:3px 10px;margin-left:12px;white-space:nowrap}:root{--k0:#0b57d0;--k1:#0b7a75;--k2:#a8620a;--k3:#a8266f;--k4:#6a41b5}@media(prefers-color-scheme:dark){:root:not([data-theme='light']){--k0:#8ab4f8;--k1:#5fd0c8;--k2:#f1b268;--k3:#f08cbf;--k4:#c3a8ff}}:root[data-theme='dark']{--k0:#8ab4f8;--k1:#5fd0c8;--k2:#f1b268;--k3:#f08cbf;--k4:#c3a8ff}"}));
const gWre=w=>new RegExp("(^|[^\\p{L}])("+w+")(?![\\p{L}])","iu"),gCap=w=>w[0]!=w[0].toLowerCase(),gUp=x=>x[0].toUpperCase()+x.slice(1);
const gNouns=()=>W.map(w=>w[0]).filter(h=>/^(de|het) \p{L}+$/u.test(h)&&!/ (ouders|buren|mensen|kleren)$/.test(h));
const GPRO={ik:0,jij:1,je:1,hij:2,wij:3,we:3};
const GSEP=["bel belt bellen|op","sta staat staan|op","neem neemt nemen|mee","kom komt komen|terug","ga gaat gaan|weg","maak maakt maken|schoon","doe doet doen|mee","denk denkt denken|na","ruim ruimt ruimen|op","vul vult vullen|in","kom komt komen|binnen","kijk kijkt kijken|uit"];
const GPH="gegeten gewerkt gekocht gehad gelezen geslapen gedronken gespeeld gewoond geleerd gekookt gebeld".split(" "),GPZ="geweest gegaan gekomen gebleven begonnen gevallen".split(" ");
const GAUX={heb:"ben",hebt:"bent",heeft:"is",hebben:"zijn",ben:"heb",bent:"hebt",is:"heeft",zijn:"hebben"};
const GPL="huis|huizen man|mannen vrouw|vrouwen kind|kinderen dag|dagen week|weken maand|maanden jaar|jaren stoel|stoelen tafel|tafels kamer|kamers auto|auto's foto|foto's appel|appels broer|broers zus|zussen vriend|vrienden stad|steden brief|brieven boom|bomen hond|honden kat|katten winkel|winkels sleutel|sleutels meisje|meisjes jongen|jongens ei|eieren deur|deuren raam|ramen trein|treinen bus|bussen les|lessen glas|glazen straat|straten schoen|schoenen collega|collega's oma|oma's taxi|taxi's kopje|kopjes dochter|dochters moeder|moeders vader|vaders dokter|dokters student|studenten vogel|vogels bloem|bloemen hand|handen voet|voeten oog|ogen woord|woorden mens|mensen probleem|problemen minuut|minuten dier|dieren paard|paarden".split(" ");
const GDIM="huis|huisje kop|kopje boek|boekje hond|hondje kat|katje kind|kindje brood|broodje bier|biertje kaart|kaartje brief|briefje tafel|tafeltje stoel|stoeltje bloem|bloemetje man|mannetje dorp|dorpje straat|straatje feest|feestje verhaal|verhaaltje lied|liedje spel|spelletje uur|uurtje stuk|stukje glas|glaasje fles|flesje zak|zakje tas|tasje kamer|kamertje tuin|tuintje auto|autootje fiets|fietsje trein|treintje ijs|ijsje koek|koekje zus|zusje broer|broertje vriend|vriendje vogel|vogeltje vis|visje ei|eitje boom|boompje raam|raampje bal|balletje ding|dingetje deur|deurtje".split(" ");
const GADJ="groot|grote klein|kleine nieuw|nieuwe oud|oude mooi|mooie goed|goede lang|lange kort|korte duur|dure goedkoop|goedkope lekker|lekkere warm|warme koud|koude rood|rode wit|witte zwart|zwarte groen|groene blauw|blauwe geel|gele jong|jonge snel|snelle leuk|leuke aardig|aardige lief|lieve vies|vieze schoon|schone zwaar|zware licht|lichte druk|drukke rustig|rustige belangrijk|belangrijke moeilijk|moeilijke makkelijk|makkelijke gezellig|gezellige vers|verse laat|late vroeg|vroege hoog|hoge laag|lage vol|volle leeg|lege sterk|sterke ziek|zieke gezond|gezonde blij|blije boos|boze".split(" ");
const GHET=new Set(W.map(w=>w[0]).filter(h=>/^het \p{L}+$/u.test(h)).map(h=>h.slice(4)).concat("ding idee verhaal moment restaurant gebouw museum nieuws gevoel leven gesprek plan spel lied dier paard land glas stuk meisje jongetje kopje huisje cadeautje verschil begin einde eten woord antwoord gezin lichaam gezicht haar hart water licht geluid programma systeem nummer".split(" ")));
const gPlWhy=(sg,pl)=>["stad","kind","ei"].includes(sg)?"This one is irregular, so learn it by heart.":pl==sg+"en"?"Most nouns just add -en.":pl==sg+"s"?"Nouns ending in -el, -er, -en or -je add -s.":/'s$/.test(pl)?"After a, i, o, u or y, add ’s.":"Add -en. The spelling changes so the vowel keeps its sound.";
const GT=[
{id:"dehet",t:"de or het",sum:"Which word for “the”",wiki:"Gender in Dutch grammar",max:8,
one:"Every noun is a de-word or a het-word. Learn the two together.",
why:"English has one word for “the”. Dutch has two, and the noun decides which. Most nouns are de-words, so de is the safer guess. Small words ending in -je are always het, and plurals are always de.",
st:[["*the word “the”|the noun", "*de|fiets", "the bike"], ["*the word “the”|the noun", "*het|huis", "the house"], ["*always het|small word in -je", "*het|huisje", "the little house"], ["*always de|more than one", "*de|huizen", "the houses"]],no:["de huis","het huis"],
keys:gNouns,q:k=>k.split(" ")[1],page:k=>k.split(" ")[1],pre:(s,k)=>s.includes(k.split(" ")[1]),
mk(s,k){const [a,n]=k.split(" "),m=s.match(new RegExp("(^|[^\\p{L}])("+a+")((?: \\p{L}+e)? )("+n+")(?![\\p{L}])","iu"));if(!m)return null;
return{b:[a,n],gap:{q:s.replace(m[0],m[1]+"___"+m[3]+m[4]),ans:m[2],opts:gCap(m[2])?["De","Het"]:["de","het"]},why:"It is “"+k+"”. Learn the article together with the noun."}}},
{id:"present",t:"Verbs in the present",sum:"ik werk, hij werkt, wij werken",wiki:"Dutch conjugation",max:8,
one:"Take -en off the verb to get the stem. Then add nothing, -t or -en.",
why:"The dictionary form of a verb ends in -en: werken. Remove -en and you get the stem: werk. With ik you use the stem as it is. With jij, hij and zij (she) you add -t. With wij, jullie and zij (they) you add -en again.",
st:[["ik|*stem", "Ik|*werk.", "I work."], ["jij, hij, zij (she)|*stem + t", "Hij|*werkt.", "He works."], ["wij, jullie, zij (they)|*stem + en", "Wij|*werken.", "We work."], ["*stem, no t|jij", "*Werk|jij?", "Do you work? When jij comes after the verb, the t drops."]],no:["Ik werkt.","Ik werk."],
keys:()=>VERBS.slice(),q:k=>pickOne(k.split("|").slice(2,5)),page:k=>k.split("|")[0],
mk(s,k){const v=k.split("|"),m=s.match(/^(Ik|Jij|Je|Hij|Wij|We) (\p{L}+)(?![\p{L}])/u);if(!m)return null;const f=v[2+GPRO[m[1].toLowerCase()]];if(m[2]!=f)return null;
return{b:[m[1].toLowerCase(),f],gap:{q:s.replace(m[0],m[1]+" ___"),ans:f,opts:shuf([...new Set(v.slice(2))])},why:v[0]+": ik "+v[2]+", jij "+v[3]+", hij "+v[4]+", wij "+v[5]+"."}}},
{id:"v2",t:"Verb in second place",sum:"Word order in a sentence",wiki:"V2 word order",max:8,
one:"The verb always takes the second place in the sentence.",
why:"Count pieces, not words. In “Morgen werk ik thuis”, Morgen is piece one and werk is piece two. You can start a sentence with the subject, a time or a place, but the verb stays second. That is why “Tomorrow I work” becomes Morgen werk ik: the subject moves behind the verb.",
st:[["who|*verb (always 2nd)|the rest", "Ik|*werk|morgen.", "I work tomorrow."], ["time or place|*verb (still 2nd)|who|the rest", "Morgen|*werk|ik|thuis.", "Tomorrow I work at home."]],no:["Morgen ik werk thuis.","Morgen werk ik thuis."],
keys:()=>"vandaag morgen nu daarna soms misschien gisteren dan hier straks daarom vanavond".split(" "),q:k=>k,page:k=>k,
mk(s,k){const m=s.match(new RegExp("^("+k+") (\\p{L}+) (ik|jij|je|hij|zij|ze|wij|we|het|u|jullie)(?![\\p{L}])","iu"));return m?{b:[m[1].toLowerCase(),m[2].toLowerCase()],why:"“"+m[1]+"” takes place 1, so the verb “"+m[2]+"” comes next and the subject follows it."}:null}},
{id:"questions",t:"Questions",sum:"Waar woon je? Woon je hier?",wiki:"Interrogative word",max:7,
one:"Question word first, then the verb, then who. No question word? Start with the verb.",
why:"For a yes or no question, swap the verb and the subject: Je woont hier becomes Woon je hier? With a question word like waar (where) or wat (what), put it first. The verb follows straight after, in second place as always.",
st:[["question word|*verb|who", "Waar|*woon|je?", "Where do you live?"], ["*verb first|who|the rest", "*Woon|je|hier?", "Do you live here? A yes or no question."]],no:["Waar je woont?","Waar woon je?"],
keys:()=>"waar wat hoe waarom wanneer wie welke".split(" "),q:k=>k,page:k=>k,
mk(s,k){const m=s.match(new RegExp("^("+k+") (\\p{L}+)","iu"));return m&&/\?$/.test(s)?{b:[m[1].toLowerCase(),m[2].toLowerCase()],why:"Question word “"+m[1]+"”, then the verb “"+m[2]+"”, then the rest."}:null}},
{id:"nietgeen",t:"niet or geen",sum:"How to say no",wiki:"Dutch grammar",max:8,
one:"Use geen before a noun. Use niet for everything else.",
why:"Both mean “not”. Geen replaces een or no article: een fiets becomes geen fiets, never niet een fiets. Niet is for the rest: a describing word, a verb, or a noun with de or het. Niet usually goes near the end of the sentence.",
st:[["the start|*geen|noun", "Ik heb|*geen|fiets.", "I have no bike. (een fiets → geen fiets)"], ["the start|*niet|describing word", "Dat is|*niet|duur.", "That is not expensive."], ["who|verb|*niet", "Ik|werk|*niet.", "I do not work."], ["the start|de or het + noun|*niet", "Ik zie|de fiets|*niet.", "I do not see the bike."]],no:["Ik heb niet een fiets.","Ik heb geen fiets."],
keys:()=>["geen","niet"],q:k=>k,page:k=>k,
mk(s){const all=s.match(/(^|[^\p{L}])(niet|geen)(?![\p{L}])/giu)||[];if(all.length!=1)return null;const m=s.match(/(^|[^\p{L}])(niet|geen)(?![\p{L}])/iu),a=m[2].toLowerCase();
return{b:[a],gap:{q:s.replace(m[0],m[1]+"___"),ans:m[2],opts:gCap(m[2])?["Niet","Geen"]:["niet","geen"]},why:a=="geen"?"geen goes before a noun that has no de or het. It means “no” or “not a”.":"niet is used here because it does not negate a noun with een or no article."}}},
{id:"separable",t:"Verbs that split",sum:"opstaan: ik sta op",wiki:"Separable verb",max:8,
one:"Some verbs split in two. The verb goes to place 2, the small word goes to the end.",
why:"A verb like opstaan (to get up) starts with a small word: op. In a normal sentence the main part, sta, goes to second place and op jumps to the very end: Ik sta om zes uur op. After wil, kan or moet the verb stays in one piece: Ik wil vroeg opstaan.",
st:[["*small word|rest of the verb", "*op|staan", "opstaan = to get up"], ["who|*verb|the rest|*small word at the end", "Ik|*sta|om zes uur|*op.", "I get up at six o’clock."], ["who|wil, kan, moet|the rest|*whole verb", "Ik|wil|vroeg|*opstaan.", "I want to get up early. After wil, kan or moet it stays in one piece."]],no:["Ik opsta om zes uur.","Ik sta om zes uur op."],
keys:()=>GSEP.slice(),q:k=>pickOne(k.split("|")[0].split(" ").slice(0,2))+" "+k.split("|")[1],page:k=>k.split("|")[1]+k.split("|")[0].split(" ")[2],
mk(s,k){const [fs,p]=k.split("|"),f=fs.split(" ").find(x=>gWre(x).test(s));if(!f||!new RegExp("(^|[^\\p{L}])"+p+"[.!?]$","iu").test(s))return null;
return{b:[f,p],why:p+fs.split(" ")[2]+": the verb “"+f+"” stays in place 2 and “"+p+"” goes to the end."}}},
{id:"sub",t:"Words like omdat",sum:"The verb goes last",wiki:"Dependent clause",max:10,
one:"After omdat, dat, als, terwijl or voordat, the verb goes to the end.",
why:"These words join two parts of a sentence. The first part is normal. In the second part, which starts with the joining word, the verb moves to the very end: omdat ik moe ben (because I am tired).",
st:[["first part|joining word|who|the rest|*verb at the end", "Ik blijf thuis|omdat|ik|moe|*ben.", "I stay home because I am tired."], ["first part|joining word|who|the rest|*verb at the end", "Hij zegt|dat|hij|morgen|*komt.", "He says that he is coming tomorrow."]],no:["… omdat ik ben moe.","… omdat ik moe ben."],
keys:()=>"omdat terwijl voordat nadat hoewel zodat".split(" "),q:k=>k,page:k=>k,
mk(s,k){return gWre(k).test(s)?{b:[k],why:"After “"+k+"”, the conjugated verb moves to the end of that part."}:null}},
{id:"modal",t:"Can, want, must",sum:"wil, kan, moet, mag",wiki:"Modal verb",max:8,
one:"wil, kan, moet and mag go in place 2. The other verb goes to the end, in its -en form.",
why:"Want, can, must and may always come with a second verb. They take place 2. The second verb goes to the end and keeps its dictionary form, which ends in -en: Ik wil Nederlands leren.",
st:[["who|*wil, kan, moet, mag|the rest|*second verb (-en)", "Ik|*wil|Nederlands|*leren.", "I want to learn Dutch."], ["who|*wil, kan, moet, mag|the rest|*second verb (-en)", "Hij|*kan|goed|*koken.", "He can cook well."]],note:"ik wil, kan, moet, mag · wij willen, kunnen, moeten, mogen",no:["Ik wil leren Nederlands.","Ik wil Nederlands leren."],
keys:()=>"wil kan moet mag willen kunnen moeten mogen".split(" "),q:k=>k,page:k=>({wil:"willen",kan:"kunnen",moet:"moeten",mag:"mogen"}[k]||k),
mk(s,k){const m=s.match(new RegExp("^(Ik|Jij|Je|Hij|Zij|Ze|Wij|We|U|Jullie) ("+k+")(?![\\p{L}])","u")),l=s.match(/(\p{L}+n)[.!?]$/u);return m&&l&&l[1].toLowerCase()!=k?{b:[k,l[1].toLowerCase()],why:"“"+k+"” takes place 2 and the other verb “"+l[1]+"” goes to the end."}:null}},
{id:"perfect",t:"Talking about the past",sum:"ik heb gegeten, ik ben gegaan",wiki:"Dutch conjugation",max:8,
one:"For the past: heb or ben in place 2, and a ge- word at the end.",
why:"Everyday Dutch talks about the past in two parts. First a helper verb in place 2: heb (or ben). Then the past form of the main verb at the end, usually starting with ge-: gegeten. Most verbs use heb. Verbs of movement or change, like gaan and komen, use ben.",
st:[["who|*heb, heeft|the rest|*ge- word at the end", "Ik|*heb|brood|*gegeten.", "I ate bread."], ["who|*ben, is|the rest|*ge- word at the end", "Ik|*ben|naar huis|*gegaan.", "I went home. Movement or change uses ben."], ["*start: ge-|verb stem|*ending: t or d", "*ge|werk|*t", "werken → gewerkt. Use t after t, k, f, s, ch, p. Use d after other sounds."]],no:["Ik heb naar huis gegaan.","Ik ben naar huis gegaan."],
keys:()=>GPH.concat(GPZ),q:k=>k,page:k=>k,
mk(s,k){const m=s.match(/^(Ik|Jij|Je|Hij|Wij|We) (heb|hebt|heeft|hebben|ben|bent|is|zijn) /u);if(!m||!new RegExp("(^|[^\\p{L}])"+k+"[.!?]$","iu").test(s))return null;
const z=GPZ.includes(k),isZ=/^(ben|bent|is|zijn)$/.test(m[2]);if(z!=isZ)return null;
return{b:[m[2],k],gap:{q:s.replace(m[0],m[1]+" ___ "),ans:m[2],opts:isZ?[GAUX[m[2]],m[2]]:[m[2],GAUX[m[2]]]},why:z?"“"+k+"” uses zijn: it is about movement or a change of state.":"“"+k+"” uses hebben, like most verbs."}}},
{id:"plural",t:"Plurals",sum:"boek → boeken, tafel → tafels",wiki:"Dutch grammar",max:9,
one:"Most nouns add -en. Some add -s.",
why:"To talk about more than one thing, most nouns add -en. Nouns ending in -el, -er, -en or -je add -s. The spelling shifts so the sound stays the same: one vowel keeps a sound long (bomen), a double letter keeps it short (mannen).",
st:[["most nouns|*add -en", "boek →|*boeken", "books"], ["short vowel|*double the last letter", "man →|*mannen", "men: this keeps the vowel short"], ["long vowel aa, ee, oo, uu|*write one vowel", "boom →|*bomen", "trees"], ["ends in -el, -er, -en, -je|*add -s", "tafel →|*tafels", "tables"], ["ends in a, i, o, u, y|*add ’s", "auto →|*auto’s", "cars"]],note:"s becomes z and f becomes v: huis → huizen, brief → brieven. A few are irregular: kind → kinderen, stad → steden.",no:["twee boeks","twee boeken"],
keys:()=>GPL.slice(),q:k=>k.split("|")[1],page:k=>k.split("|")[0],pre:(s,k)=>s.includes(k.split("|")[1]),
mk(s,k){const [sg,pl]=k.split("|"),m=s.match(new RegExp("(^|[^\\p{L}])("+pl.replace("'","['’]")+")(?![\\p{L}'’])","iu"));if(!m)return null;
const cap=gCap(m[2]),f=x=>cap?gUp(x):x,c=[sg+"en",/s$/.test(sg)?"":sg+"s",/[aeiouy]$/.test(sg)?sg+"'s":"",sg+"es"].filter(x=>x&&x!=pl).slice(0,2);
return{b:[PL(pl)],gap:{q:s.replace(m[0],m[1]+"___"),ans:f(pl),opts:shuf([pl,...c]).map(f),hint:"Plural of “"+sg+"”"},why:sg+" → "+pl+". "+gPlWhy(sg,pl)}}},
{id:"adjective",t:"Describing words",sum:"het grote huis, een groot huis",wiki:"Dutch grammar",max:9,
one:"Before a noun, a describing word (adjective) gets -e. One exception: een with a het-word.",
why:"When the describing word sits before the noun, add -e: de grote stad, het grote huis, een nieuwe fiets. The exception is een plus a het-word: een groot huis, no -e. After is there is never an -e: Het huis is groot.",
st:[["de or het|*describing word + e|noun", "het|*grote|huis", "the big house"], ["een|*describing word + e|de-word", "een|*nieuwe|fiets", "a new bike"], ["een|*describing word, no -e|het-word", "een|*groot|huis", "a big house"], ["noun|is|*describing word, no -e", "Het huis|is|*groot.", "The house is big."]],no:["een grote huis","een groot huis"],
keys:()=>GADJ.slice(),q:k=>pickOne(k.split("|")),page:k=>k.split("|")[0],pre:(s,k)=>k.split("|").some(f=>s.includes(f)),
mk(s,k){const [a,e]=k.split("|"),R=(x)=>s.match(new RegExp(x,"iu"));let m,ans,why,q;
if((m=R("(^|[^\\p{L}])(de|het|deze|die|dit|dat|mijn|jouw|zijn|haar|onze|hun|uw) ("+e+") (\\p{L}+)"))){ans=m[3];why="Before a noun the adjective gets -e. The only exception is een + het-word."}
else if((m=R("(^|[^\\p{L}])(een|geen) ("+e+") (\\p{L}+)"))&&!/^(en|of|maar)$/i.test(m[4])){ans=m[3];why="“"+m[4]+"” is a de-word, so after een the adjective still gets -e."}
else if((m=R("(^|[^\\p{L}])(een|geen) ("+a+") (\\p{L}+)"))&&GHET.has(m[4].toLowerCase())){ans=m[3];why="“"+m[4]+"” is a het-word. After een, a het-word takes no -e."}
else if((m=R("(^|[^\\p{L}])(is|zijn|was|waren|ben|bent|wordt|lijkt|blijft) ((?:erg|heel|zo|te|zeer|niet|echt|nogal|ook) )?("+a+")[.!?]$"))){ans=m[4];why="After is or zijn the adjective stands alone, so no -e.";const at=m.index+m[0].length-1-ans.length;q=s.slice(0,at)+"___"+s.slice(at+ans.length)}
else return null;
if(!q)q=s.replace(m[0],m[1]+m[2]+" ___ "+m[4]);const cap=gCap(ans);
return{b:[PL(ans)],gap:{q,ans,opts:cap?[gUp(a),gUp(e)]:[a,e]},why}}},
{id:"diminutive",t:"Small words (-je)",sum:"huis → huisje",wiki:"Diminutive",max:9,
one:"Add -je to make something small or cute. It is always a het-word.",
why:"The ending -je makes a thing little or sweet. The new word is always het. Which spelling you need depends on the last sound, so use the table.",
st:[["most nouns|*add -je", "huis →|*het huisje", "little house"], ["long vowel, or ends in -el, -er, -en|*add -tje", "stoel →|*het stoeltje", "little chair"], ["ends in m|*add -pje", "boom →|*het boompje", "little tree"], ["short vowel + l, m, n, r, ng|*add -etje", "man →|*het mannetje", "little man"], ["more than one|*add -s", "het huisje →|*de huisjes", "little houses"]],no:["de huisje","het huisje"],
keys:()=>GDIM.slice(),q:k=>k.split("|")[1],page:k=>k.split("|")[1],pre:(s,k)=>s.includes(k.split("|")[1]),
mk(s,k){const [b,d]=k.split("|"),m=s.match(new RegExp("(^|[^\\p{L}])("+d+")(s?)(?![\\p{L}])","iu"));if(!m)return null;
const cap=gCap(m[2]),f=x=>(cap?gUp(x):x)+m[3],c=shuf([b+"je",b+"tje",b+"etje",b+"pje"].filter(x=>x!=d)).slice(0,2);
return{b:[PL(d+m[3])],gap:{q:s.replace(m[0],m[1]+"___"),ans:f(d),opts:shuf([d,...c]).map(f),hint:"Small form of “"+b+"”"},why:b+" → "+d+". Words in -je are always het-words"+(m[3]?", and their plural adds -s.":".")}}}];
// ---------- spaced review of topics ----------
const GIV=[1,2,4,7,14,30],gG=()=>S.g||(S.g={});
const gDueIds=()=>GT.filter(t=>gG()[t.id]&&gG()[t.id].d<=T()).sort((a,b)=>gG()[a.id].d-gG()[b.id].d);
const gNext=()=>{const g=gG();if(cnt()<20||GT.some(t=>g[t.id]&&g[t.id].b<2))return null;return GT.find(t=>!g[t.id])||null};
const gWhen=d=>d<=0?"today":d==1?"tomorrow":"in "+d+" days";
const gStat=id=>{const o=gG()[id];return o?(o.d<=T()?"Review due now":"Next review "+gWhen(o.d-T()))+" · last score "+o.p+"%":"Not practised yet."};
function gRecord(items){const by={},g=gG(),out=[];items.forEach(x=>{if(x.ok==null)return;const o=by[x.t.id]=by[x.t.id]||[0,0,x.t];o[1]++;if(x.ok)o[0]++});
for(const id in by){const [ok,n,t]=by[id],pc=ok/n,o=g[id]||{b:0};if(pc>=.8)o.b=Math.min(5,o.b+1);else if(pc<.5)o.b=Math.max(0,o.b-1);
o.d=T()+(pc>=.8?GIV[o.b]:1);o.u=Date.now();o.n=(o.n||0)+1;o.p=Math.round(pc*100);g[id]=o;out.push([t.t,ok,n,o.d-T()])}return out}
function gramRow(){return Object.keys(gG()).length?`<div><dt>Grammar to review</dt><dd>${gDueIds().length}</dd></div>`:""}
function gramBtn(){const n=gNext();return gDueIds().length?'<button class="ghost" id="gr" style="margin:14px 0 0">Review grammar</button>':n?`<button class="ghost" id="gr" style="margin:14px 0 0">Grammar: ${n.t}</button>`:""}
function gramGo(){const d=gDueIds();if(d.length)return gramPractice("",d.slice(0,4));const n=gNext();if(n){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.v=="g"));gramTopic(n.id)}}
// ---------- fetching ----------
const GSEEN=new Set();let GERR="",GDOWN=0;
async function gJ(u,ms=9000){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);
try{const r=await fetch(u,{signal:c.signal});if(!r.ok)throw new Error("HTTP "+r.status);return await r.json()}catch(e){throw new Error(e.name=="AbortError"?"timed out":e.message||"failed")}finally{clearTimeout(t)}}
async function gTato(q,max){const b="https://api.tatoeba.org/v1/sentences?lang=nld&trans%3Alang=eng&sort=random&limit=40&q="+encodeURIComponent(q);let j;
try{j=await gJ(b+"&word_count=3-"+max+"&is_unapproved=no")}catch(e){if(!/^HTTP 4/.test(e.message))throw e;j=await gJ(b)}
return(j.data||[]).map(s=>{const tr=(s.translations||[]).flat().filter(x=>x&&x.lang=="eng"&&x.text).sort((a,b)=>(b.is_direct?1:0)-(a.is_direct?1:0));return tr[0]&&s.text?[s.text,tr[0].text,"t"+s.id]:null}).filter(Boolean)}
async function gWikt(page){const j=await gJ("https://en.wiktionary.org/w/api.php?action=parse&format=json&formatversion=2&origin=*&prop=text&redirects=1&page="+encodeURIComponent(page)),h=j.parse&&j.parse.text;
const d=new DOMParser().parseFromString(typeof h=="string"?h:(h&&h["*"])||"","text/html");
return[...d.querySelectorAll(".h-usage-example")].map(x=>{const a=x.querySelector('.e-example[lang="nl"]'),b=x.querySelector(".e-translation");return a&&b?[a.textContent.trim(),b.textContent.trim(),"w"+page+"|"+a.textContent.trim()]:null}).filter(Boolean)}
const gLocal=()=>W.map((w,i)=>[w[2].replace(/[{}]/g,""),w[3],"l"+i]).concat(DIALOGUES.flatMap((d,i)=>d.l.map((l,k)=>[l[0],l[1],"d"+i+"_"+k])));
const gClean=s=>s.length<=90&&!/[\d"“”„«»:;()\[\]<>]/.test(s);
async function gLoad(t,n){const out=[],keys=shuf(t.keys());
const take=(rows,key,src)=>{for(const [nl,en,id] of rows){if(out.length>=n)return;if(t.pre&&!t.pre(nl.toLowerCase().replace(/’/g,"'"),key))continue;if(GSEEN.has(id)||!gClean(nl))continue;const wc=nl.split(/\s+/).length;if(wc<3||wc>t.max)continue;
const x=t.mk(nl,key);if(!x)continue;GSEEN.add(id);out.push({nl,en,src,t,...x})}};
if(Date.now()-GDOWN>12e4){try{for(const k of keys.slice(0,4)){if(out.length>=n)break;take(shuf(await gTato(t.q(k),t.max)),k,"Tatoeba")}GERR=""}catch(e){GERR=e.message;GDOWN=Date.now()}}
if(out.length<n){const ks=keys.slice(0,6),rs=await Promise.allSettled(ks.map(k=>gWikt(t.page(k))));rs.forEach((r,i)=>{if(r.status=="fulfilled")take(shuf(r.value),ks[i],"Wiktionary")})}
if(out.length<Math.min(n,3)){const L=shuf(gLocal());for(const k of keys){if(out.length>=n)break;take(L,k,"course")}}
return out}
function gSrc(items){const s=[...new Set(items.map(x=>x.src))],L={Tatoeba:'<a href="https://tatoeba.org" target="_blank" rel="noopener">Tatoeba</a> (CC BY 2.0 FR)',Wiktionary:'<a href="https://en.wiktionary.org" target="_blank" rel="noopener">Wiktionary</a> (CC BY-SA 4.0)',course:"your course (offline)"};
return(s.length?"Examples from "+s.map(x=>L[x]).join(" and ")+".":"")+(GERR?" Tatoeba could not be reached ("+esc(GERR)+").":"")}
// ---------- screens ----------
let GS=[],GCUR="",GP=null;
const gIcon=k=>spk(0).replace('data-w="0"','data-gs="'+k+'"');
const gBold=(s,b)=>s.split(" ").map(t=>b&&b.includes(PL(t))?"<b>"+esc(t)+"</b>":esc(t)).join(" ");
const gParts=(x,cls)=>x.split("|").map(p=>p[0]=="*"?`<${cls?'span class="slot k"':"b"}>${p.slice(1)}</${cls?"span":"b"}>`:cls?`<span class="slot">${p}</span>`:p);
const GLOSS=[["Subject","who or what does the action: ik, jij, de man"],["Verb","the action word: werken, zijn, gaan"],["Noun","a thing, person or place: fiets, vrouw, stad"],["Adjective","a describing word, like groot or mooi"],["Stem","the verb without -en: werk, woon"],["Place 2","the second piece of the sentence, not the second word"]];
const gCols=(l,x)=>{const L=l.split("|");return x.split("|").map((p,i)=>{const k=L[i]||"",key=p[0]=="*"||k[0]=="*";return`<div class="col c${i%5}${key?" key":""}"><span class="lab">${esc(k[0]=="*"?k.slice(1):k)}</span><span class="wd">${esc(p[0]=="*"?p.slice(1):p)}</span></div>`}).join("")};
function gRule(t){return`<p class="one">${t.one}</p><p class="why">${t.why}</p><h3>The pattern</h3>${t.st.map(([l,x,en])=>`<div class="pat"><div class="cols">${gCols(l,x)}</div><div class="sten">${en}</div></div>`).join("")}${t.note?`<p class="gnote">${t.note}</p>`:""}<h3>A common mistake</h3><div class="nos"><div><span class="tag">Not this</span><span class="w0">${t.no[0]}</span></div><div><span class="tag">Say this</span><span class="w1">${t.no[1]}</span></div></div>`}
function gramPage(){const g=gG(),nx=GT.find(t=>!g[t.id]);document.body.classList.remove("in");
app.innerHTML=`<div class="gtop"><button class="x" id="pb" aria-label="Back to Learn">×</button><span class="mut">Learn</span></div><h2>Grammar</h2><p class="mut" style="margin:-8px 0 20px">Short topics, about five minutes each. Start at the top and work down.</p><div class="list">${GT.map(t=>{const o=g[t.id],tag=o&&o.d<=T()?"Review":o&&o.b>=3?"✓":!o&&nx&&nx.id==t.id?"Next":"";return`<button class="card" data-gt="${t.id}"><span>${t.t}<small>${t.sum}</small></span>${tag?`<em>${tag}</em>`:""}</button>`}).join("")}</div><div class="acts"><button class="ghost" data-gt="mix">Mixed practice</button><button class="ghost" data-grammar>Quick quiz (offline)</button></div><h3>Quick notes</h3><details><summary>Short grammar notes</summary>${G.map(([a,b])=>`<p><b>${a}.</b> ${b}</p>`).join("")}</details>`;
$("pb").onclick=learn}
async function gAdd(t){const box=$("gex");if(!box)return;const btn=$("gmore");if(btn)btn.disabled=true;
const items=await gLoad(t,6);if(GCUR!=t.id||!$("gex"))return;
if(box.dataset.n==null){box.innerHTML="";box.dataset.n=0}
if(!items.length){if(+box.dataset.n==0)box.innerHTML='<p class="mut">No examples could be loaded right now. This topic needs an internet connection. Check it and tap More examples.</p>';else toast("No new examples right now. Try again in a moment.")}
items.forEach(it=>{const k=GS.push(it.nl)-1;box.insertAdjacentHTML("beforeend",`<div class="ex" style="margin-top:12px"><div>${gBold(it.nl,it.b)}<br><i>${esc(it.en)}</i></div>${gIcon(k)}</div>`)});
box.dataset.n=+box.dataset.n+items.length;GT.all=(GT.all||[]).concat(items);$("gsrc").innerHTML=gSrc(GT.all);if(btn)btn.disabled=false}
function gramTopic(id){const t=GT.find(x=>x.id==id);GCUR=id;GS=[];GT.all=[];document.body.classList.remove("in");
app.innerHTML=`<div class="gtop"><button class="x" id="gback" aria-label="Back to Grammar">×</button><span class="mut">Grammar</span></div><h2>${t.t}</h2>${gRule(t)}<p class="mut" style="margin-top:20px">${gStat(id)}</p><button class="pri" id="gprac" style="margin-top:14px">Practice</button><h3>Examples</h3><div id="gex"><p class="mut">Loading examples…</p></div><button class="ghost" id="gmore">More examples</button><p class="mut" id="gsrc" style="margin-top:16px"></p><details id="gwiki" style="margin-top:8px"><summary>Background from Wikipedia</summary><p id="gwt">Loading…</p></details><details style="margin-top:8px"><summary>Words used on this page</summary>${GLOSS.map(([a,b])=>`<p><b>${a}:</b> ${b}</p>`).join("")}</details>`;
$("gback").onclick=()=>{GCUR="";gramPage()};$("gprac").onclick=()=>gramPractice(id);$("gmore").onclick=()=>gAdd(t);
$("gwiki").ontoggle=async()=>{const d=$("gwiki");if(!d.open||d.dataset.l)return;d.dataset.l=1;let h;
try{const j=await gJ("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=1&explaintext=1&redirects=1&titles="+encodeURIComponent(t.wiki)),p=Object.values(j.query.pages)[0];let x=(p.extract||"").trim();if(!x)throw 0;
if(x.length>700)x=x.slice(0,700).replace(/[^.]*$/,"");h=esc(x)+` <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g,"_"))}" target="_blank" rel="noopener">Read more on Wikipedia</a> (CC BY-SA 4.0)`}
catch(e){h="Could not load this right now. Check your connection."}if($("gwt")&&GCUR==id)$("gwt").innerHTML=h};
gAdd(t)}
async function gramPractice(id,rev){GCUR="p"+Math.random();const mine=GCUR;document.body.classList.add("in");
app.innerHTML=`<div class="top"><button class="x" id="gx" aria-label="Close">×</button><div class="bar"><i style="width:0"></i></div></div><p class="mut">Finding fresh sentences…</p>`;
const out=()=>{document.body.classList.remove("in");GCUR="";rev?show("p"):id?gramTopic(id):gramPage()};$("gx").onclick=out;
const started=GT.filter(t=>gG()[t.id]),ts=rev||shuf(started.length>=3?started:GT).slice(0,3);
const items=id?await gLoad(GT.find(x=>x.id==id),8):shuf((await Promise.all(ts.map(t=>gLoad(t,3)))).flat());
if(GCUR!=mine)return;if(!items.length){app.querySelector("p").textContent="No sentences could be loaded right now. Check your connection and try again.";return}
GP={id,items,i:0,ok:0,out,rev:!!rev};gStep()}
function gStep(){const P=GP;if(P.i>=P.items.length)return gDone();const it=P.items[P.i],t=it.t;GS=[it.nl];let done=false,td=0;
const head=`<div class="top"><button class="x" id="gx" aria-label="Close">×</button><div class="bar"><i style="width:${P.i/P.items.length*100}%"></i></div></div>`;
const fin=ok=>{done=true;td=Date.now();it.ok=ok;if(ok)P.ok++;$("fb").innerHTML=`<div class="fb ${ok?"ok":"bad"}">${ok?"Correct":"Not quite"}</div><div class="ex"><div>${gBold(it.nl,it.b)}<br><i>${esc(it.en)}</i></div>${gIcon(0)}</div><p class="mut" style="margin-top:12px">${esc(it.why||"")}</p>`;
say(it.nl,.8,150);const o=$("ok");o.hidden=false;o.disabled=false;o.textContent="Continue";setTimeout(()=>o.focus(),60)};
const next=()=>{if(Date.now()-td<500)return;P.i++;gStep()};
if(it.gap){const g=it.gap;
app.innerHTML=head+`<h3>${t.t} · choose the missing word</h3><div class="big2">${esc(g.q)}</div>${g.hint?`<div class="mut">${esc(g.hint)}</div>`:""}<div class="tr">${esc(it.en)}</div><div id="opts">${g.opts.map(x=>`<button class="opt">${esc(x)}</button>`).join("")}</div><div id="fb"></div><button class="pri" id="ok" hidden>Continue</button>`;
$("opts").onclick=e=>{const b=e.target.closest(".opt");if(!b||done)return;[...$("opts").children].forEach(x=>{x.disabled=true;if(x.textContent==g.ans)x.classList.add("good");else if(x==b)x.classList.add("miss")});fin(b.textContent==g.ans)};$("ok").onclick=next}
else{const tk=it.nl.replace(/[.!?]+$/,"").split(/\s+/),end=(it.nl.match(/[.!?]+$/)||[""])[0];let ord=shuf(tk.map((_,i)=>i)),pick=[];if(ord.every((v,i)=>v==i))ord.reverse();
app.innerHTML=head+`<h3>${t.t} · put the words in order</h3><div class="big2">${esc(it.en)}</div><div class="tiles" id="bd"></div><div class="tiles" id="pl2"></div><div id="fb"></div><button class="pri" id="ok" disabled>Check</button>`;
const draw=()=>{$("bd").innerHTML=pick.map(i=>`<button class="tile on" data-i="${i}">${esc(tk[i])}</button>`).join("")+(end&&pick.length==tk.length?`<span class="mut" style="align-self:center;font-size:20px">${esc(end)}</span>`:"");
$("pl2").innerHTML=ord.filter(i=>!pick.includes(i)).map(i=>`<button class="tile" data-i="${i}">${esc(tk[i])}</button>`).join("");if(!done)$("ok").disabled=pick.length!=tk.length};
const tap=e=>{const b=e.target.closest(".tile");if(!b||done)return;const i=+b.dataset.i;pick=pick.includes(i)?pick.filter(x=>x!=i):[...pick,i];draw()};
$("bd").onclick=tap;$("pl2").onclick=tap;draw();
$("ok").onclick=()=>done?next():fin(pick.map(i=>tk[i]).join(" ")==tk.join(" "))}
$("gx").onclick=P.out}
function gDone(){const P=GP,pc=Math.round(P.ok/P.items.length*100),rows=gRecord(P.items);document.body.classList.remove("in");
if(!S.d.includes(T()))S.d.push(T());save();
app.innerHTML=`<h2>${pc>=80?"Well done":"Keep going"}</h2><p class="mut">${P.ok} of ${P.items.length} correct.</p><h3>Next review</h3>${rows.map(([n,ok,tot,d])=>`<div class="urow"><span>${n} · ${ok}/${tot}</span><span>${gWhen(d)}</span></div>`).join("")}<p class="mut" style="margin-top:14px">Strong topics come back later, weak ones tomorrow. ${gSrc(P.items)}</p><button class="pri" id="gag">${P.rev?"Done":"More practice"}</button>${P.rev?"":'<button class="ghost" id="gbk" style="margin-top:14px">Back</button>'}`;
$("gag").onclick=()=>P.rev?P.out():gramPractice(P.id);if($("gbk"))$("gbk").onclick=P.out}
app.addEventListener("click",e=>{const a=e.target.closest("[data-gt]");if(a)return a.dataset.gt=="mix"?gramPractice(""):gramTopic(a.dataset.gt);
const s=e.target.closest("[data-gs]");if(s&&GS[+s.dataset.gs])say(GS[+s.dataset.gs],.8)});
if($("go")&&!document.body.classList.contains("in"))home();
