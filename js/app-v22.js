(function(){
var modal=document.getElementById("modal"),form=document.getElementById("form"),bar=document.getElementById("bar"),state={},step=0;
var catalog={
"Dentist":{icon:"🦷",steps:[["🚗","Travel to the dentist"],["🏢","Arrive and check in"],["⏳","Wait for my turn"],["👋","Meet the dental team"],["🪑","Sit in the dental chair"],["💡","Notice the light and tools"],["😮","The team may look at my teeth"],["⭐","Finish and leave"]],notices:["Bright lights","Tool sounds","Things near my mouth","New tastes or smells","Waiting"]},
"Doctor":{icon:"🩺",steps:[["🚗","Travel to the office"],["🏢","Check in"],["⏳","Wait for my turn"],["👋","Meet the care team"],["⚖️","The team may do routine checks"],["🗣️","Talk or communicate about the visit"],["✋","Ask for help, time, or a break"],["⭐","Finish and leave"]],notices:["Waiting","New people","Touch","Medical equipment","Questions"]},
"Haircut":{icon:"✂️",steps:[["🚗","Travel to my haircut"],["👋","Meet the stylist or barber"],["🪑","See the chair and tools"],["🧥","A cape may be offered"],["💇","My hair may be cut"],["🧹","I may notice loose hair"],["🪞","Look at my haircut if I want"],["⭐","Finish and leave"]],notices:["Clippers","Scissors","Hair touching my skin","Cape around my neck","Mirror"]},
"Airplane":{icon:"✈️",steps:[["🧳","Pack what I need"],["🚗","Travel to the airport"],["🎫","Check in"],["🛡️","Go through security"],["⏳","Wait at the gate"],["✈️","Get on the airplane"],["💺","Spend time on the flight"],["🛬","Land and get off"]],notices:["Crowds","Announcements","Security","Waiting","Engine noise"]},
"First Day of School":{icon:"🎒",steps:[["🌅","Get ready for school"],["🚗","Travel to school"],["🏫","Enter the building"],["👋","Meet adults and classmates"],["🪑","Find my classroom"],["📚","Learn the class routine"],["🍎","Use scheduled breaks and meals"],["🏠","Go home when school ends"]],notices:["New people","Bell sounds","Busy hallways","New routines","Classroom noise"]},
"Restaurant":{icon:"🍽️",steps:[["🚗","Travel to the restaurant"],["👋","Enter the restaurant"],["🪑","Find our table"],["📖","Look at available choices"],["🗣️","Communicate my order or choice"],["⏳","Wait for food"],["🍽️","Spend time at the table"],["⭐","Finish and leave"]],notices:["Food smells","People talking","Waiting","Dishes and kitchen sounds","New foods"]},
"Grocery Store":{icon:"🛒",steps:[["📝","Get ready to shop"],["🚗","Travel to the store"],["🛒","Get a cart or basket"],["🥫","Find the items we need"],["👥","Move around other shoppers"],["⏳","Wait at checkout"],["💳","Pay for the items"],["🏠","Leave the store"]],notices:["Crowds","Bright lights","Announcements","Waiting","Many choices"]},
"Birthday Party":{icon:"🎈",steps:[["🎁","Get ready for the party"],["🚗","Travel there"],["👋","Arrive"],["🎵","Notice party sounds and people"],["🎲","Choose whether to join activities"],["🎂","Food or cake may be offered"],["✋","Take a break when needed"],["🏠","Leave when it is time"]],notices:["Music","Groups of people","Games","Food","Unexpected changes"]},
"Custom":{icon:"✨",steps:[["🏠","Get ready"],["🚗","Travel or transition"],["👋","Arrive"],["👀","Look at what is happening"],["➡️","Learn what happens next"],["✋","Communicate what I need"],["✅","Move through the experience"],["⭐","Finish"]],notices:["New people","New sounds","Waiting","Changes in routine","Unfamiliar places"]}
};
var stages=["about","communication","details","sensory","supports","story","preview"];
var experienceQuestions={
"Dentist":{title:"What may happen at this dentist visit?",key:"experienceEvents",items:["Cleaning","Exam","X-rays","Filling","Fluoride","First visit","Not sure yet"]},
"Doctor":{title:"What may happen at this appointment?",key:"experienceEvents",items:["Height & weight","Temperature","Blood pressure","Stethoscope","Ear / throat check","Shot / vaccine","Blood draw","Not sure yet"]},
"Haircut":{title:"What might be part of the haircut?",key:"experienceEvents",items:["Scissors","Clippers","Water spray","Hair wash","Cape","Blow dryer","Mirror","Not sure yet"]},
"Airplane":{title:"What parts of the trip are likely?",key:"experienceEvents",items:["Parking / shuttle","Check-in","Security","Wait at gate","Boarding","Takeoff","Time in the air","Landing","Baggage claim"]},
"First Day of School":{title:"What parts of the school day should we prepare for?",key:"experienceEvents",items:["Arrival / drop-off","New classroom","Meet teacher","Classmates","Bell / announcements","Lunch","Transitions","Dismissal"]},
"Restaurant":{title:"What parts of the restaurant visit are likely?",key:"experienceEvents",items:["Wait for a table","Choose a seat","Read menu","Order","Wait for food","Eat at table","Pay","Leave"]},
"Grocery Store":{title:"What parts of shopping are likely?",key:"experienceEvents",items:["Get cart / basket","Follow a list","Busy aisles","Choose items","Wait at checkout","Pay","Bag groceries","Leave"]},
"Birthday Party":{title:"What might happen at the party?",key:"experienceEvents",items:["Greet people","Music","Games","Presents","Singing","Cake / food","Photos","Goodbyes"]}
};
var eventSteps={
"Dentist":{"Cleaning":["🪥","My teeth may be cleaned"],"Exam":["😮","The dentist may look at my teeth"],"X-rays":["📷","Pictures of my teeth may be taken"],"Filling":["🦷","A tooth may be treated"],"Fluoride":["✨","Fluoride may be placed on my teeth"],"First visit":["👀","I can look around and meet the dental team"]},
"Doctor":{"Height & weight":["⚖️","My height and weight may be checked"],"Temperature":["🌡️","My temperature may be checked"],"Blood pressure":["💪","A cuff may squeeze my arm"],"Stethoscope":["🩺","The provider may listen with a stethoscope"],"Ear / throat check":["👂","My ears or throat may be checked"],"Shot / vaccine":["💉","I may be offered a shot or vaccine"],"Blood draw":["🩸","I may have a blood draw"]},
"Haircut":{"Scissors":["✂️","Scissors may trim my hair"],"Clippers":["🔊","Clippers may buzz near my hair"],"Water spray":["💧","Water may be sprayed on my hair"],"Hair wash":["🫧","My hair may be washed"],"Cape":["🧥","A cape may go around me"],"Blow dryer":["💨","A blow dryer may make warm air and sound"],"Mirror":["🪞","I can look in the mirror if I want"]},
"Airplane":{"Parking / shuttle":["🚐","I may park or ride a shuttle"],"Check-in":["🎫","I may check in for the flight"],"Security":["🛡️","I will go through airport security"],"Wait at gate":["⏳","I may wait at the gate"],"Boarding":["🚪","I will board the airplane"],"Takeoff":["⬆️","The airplane will take off"],"Time in the air":["💺","I will spend time on the airplane"],"Landing":["🛬","The airplane will land"],"Baggage claim":["🧳","I may collect baggage"]},
"First Day of School":{"Arrival / drop-off":["🏫","I will arrive at school"],"New classroom":["🪑","I will find my classroom"],"Meet teacher":["👋","I will meet my teacher"],"Classmates":["👥","I may be around classmates"],"Bell / announcements":["🔔","I may hear bells or announcements"],"Lunch":["🍎","I may have lunch"],"Transitions":["➡️","I may move to another place or activity"],"Dismissal":["🏠","I will leave when the school day ends"]},
"Restaurant":{"Wait for a table":["⏳","I may wait for a table"],"Choose a seat":["🪑","I will sit at our table"],"Read menu":["📖","I can look at the choices"],"Order":["🗣️","I can communicate my order or choice"],"Wait for food":["⏳","I may wait while food is prepared"],"Eat at table":["🍽️","I can eat or spend time at the table"],"Pay":["💳","We will pay"],"Leave":["⭐","We will leave when we are finished"]},
"Grocery Store":{"Get cart / basket":["🛒","I can get a cart or basket"],"Follow a list":["📝","We can follow a shopping list"],"Busy aisles":["👥","I may move around other shoppers"],"Choose items":["🥫","We will choose items"],"Wait at checkout":["⏳","I may wait at checkout"],"Pay":["💳","We will pay for the items"],"Bag groceries":["🛍️","The groceries may be bagged"],"Leave":["🏠","We will leave the store"]},
"Birthday Party":{"Greet people":["👋","I may greet people"],"Music":["🎵","I may hear music"],"Games":["🎲","I can choose whether to join games"],"Presents":["🎁","There may be presents"],"Singing":["🎶","People may sing"],"Cake / food":["🎂","Cake or other food may be offered"],"Photos":["📷","People may take photos"],"Goodbyes":["🏠","I can say goodbye and leave when it is time"]}
};
function specificSteps(c){var selected=state.experienceEvents||[],map=eventSteps[state.type]||{},eq=experienceQuestions[state.type],order=eq?eq.items:selected,out=[];if(selected.length&&selected.indexOf("Not sure yet")<0){out.push(c.steps[0]);order.forEach(function(v){if(selected.indexOf(v)>-1&&map[v])out.push(map[v])});out.push(c.steps[c.steps.length-1]);}else out=c.steps.slice();var seen={};return out.filter(function(v){var k=v[1];if(seen[k])return false;seen[k]=1;return true})}
function detailedSteps(steps){var extras=[["👀","Preview the plan and space"],["💬","Communicate what I need"],["⏸️","Use a break or extra time if I need it"],["➡️","Check what happens next"]],out=steps.slice(),i=0;while(out.length<10){out.splice(Math.max(1,out.length-1),0,extras[i%extras.length]);i++}return out.slice(0,10)}

function esc(v){return String(v||"").replace(/[&<>"']/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]})}
function checked(a,v){return(a||[]).indexOf(v)>-1?"checked":""}
function field(l,k,p){return'<label>'+l+'</label><input data-key="'+k+'" value="'+esc(state[k])+'" placeholder="'+p+'">'}
function area(l,k,p){return'<label>'+l+'</label><textarea data-key="'+k+'" placeholder="'+p+'">'+esc(state[k])+'</textarea>'}
function select(l,k,items){return'<label>'+l+'</label><select data-key="'+k+'">'+items.map(function(v){return'<option value="'+esc(v)+'" '+(state[k]===v?"selected":"")+'>'+v+'</option>'}).join("")+'</select>'}
function choices(title,key,items){return'<fieldset class="single-choice"><legend>'+title+'</legend><div class="choice-grid">'+items.map(function(v){return'<label class="choice-card"><input type="radio" name="'+key+'" data-key="'+key+'" value="'+esc(v)+'" '+(state[key]===v?"checked":"")+'><span>'+v+'</span></label>'}).join("")+'</div></fieldset>'}
function chips(title,key,items){return'<fieldset><legend>'+title+'</legend><div class="chip-grid">'+items.map(function(v){return'<label class="chip"><input type="checkbox" data-list="'+key+'" value="'+esc(v)+'" '+checked(state[key],v)+'><span>'+v+'</span></label>'}).join("")+'</div></fieldset>'}
function validateStep(){
var msg="";
if(step===0&&!String(state.name||"").trim())msg="Add a first name or nickname so the Ready Pack can be personalized.";
if(step===1&&!(state.communication||[]).length)msg="Choose at least one communication method.";
if(step===5&&!state.voice)state.voice="Simple first-person — “I can…”";
if(step===5&&!state.length)state.length="Standard — 8 steps";
if(msg){var old=form.querySelector(".form-error");if(old)old.remove();var box=document.createElement("div");box.className="form-error";box.setAttribute("role","alert");box.textContent=msg;var actions=form.querySelector(".form-actions");if(actions)actions.parentNode.insertBefore(box,actions);return false}return true}
function buttons(back,next){return'<div class="form-actions">'+(back?'<button class="secondary" data-back>← Back</button>':'<span></span>')+'<button class="primary" data-next>'+next+' →</button></div>'}
function open(type){var trigger=document.activeElement;modal._returnFocus=trigger;state={type:type,communication:[],sensory:[],supports:[],signals:[],experienceEvents:[],voice:"Simple first-person — “I can…”",length:"Standard — 8 steps"};step=0;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");render();setTimeout(function(){var f=form.querySelector("input,textarea,select,button");if(f)f.focus()},0)}
function render(){bar.style.width=((step+1)/stages.length*100)+"%";var c=catalog[state.type]||catalog.Custom,b="";
if(step===0)b='<span class="badge">ABOUT ME</span><h2>Start with the person, not the diagnosis.</h2><p>This creates an individualized Ready Pack and a support-person handoff.</p>'+field("First name or nickname","name","Alex")+field("Age (optional)","age","8")+(state.type==="Custom"?field("What are we getting ready for?","customType","Example: going to a wedding"):"")+buttons(false,"Communication");
if(step===1)b='<span class="badge">COMMUNICATION</span><h2>How do they communicate best?</h2><p>Select every method that is useful. Speech is only one way to communicate.</p>'+chips("Communication methods","communication",["Spoken words","Short phrases","AAC device","Picture symbols","Gestures","Sign language","Writing / typing","Yes / No responses"])+choices("Language that works best","language",["Short, concrete phrases","Single words + visuals","Full sentences","Age-respectful, low-language support"])+chips("How can they communicate a need or boundary?","signals",["Say or select BREAK","Say or select STOP","Gesture / point","Move away","Use AAC","Show a break card","Caregiver helps interpret"])+area("Anything adults should know about communication?","communicationNotes","Example: Give extra processing time. Ask one question at a time.")+buttons(true,"Experience");
if(step===2){var eq=experienceQuestions[state.type];b='<span class="badge">THE EXPERIENCE</span><h2>What is coming up?</h2><p>Choose what is likely. If you are not sure, that is okay—the story will stay flexible.</p>'+field("When is it happening?","when","Saturday morning")+(eq?chips(eq.title,eq.key,eq.items):"")+area("What else do you know about the plan?","details","Where, who may be there, what may happen, and anything that could change.")+buttons(true,"Sensory needs");}
if(step===3)b='<span class="badge">SENSORY & ENVIRONMENT</span><h2>What might they notice?</h2><p>Choose considerations, not “bad behaviors.” The goal is to prepare and accommodate.</p>'+chips("Sensory or environmental considerations","sensory",c.notices.concat(["Touch","Crowds","Strong smells","Temperature","Movement","Waiting","Unexpected changes","Being rushed"]))+area("What should adults avoid when possible?","avoid","Example: Do not touch without warning; avoid several people talking at once.")+buttons(true,"Supports");
if(step===4)b='<span class="badge">WHAT HELPS</span><h2>Build the support plan.</h2><p>Choose supports that are already useful or appropriate for this person.</p>'+chips("Helpful supports","supports",["Headphones","Sunglasses / lower light","Visual schedule","First / Then","Countdown / timer","Breaks","Comfort item","Choice of two options","Short directions","Extra processing time","Preview tools first","Reduced waiting","Quiet space","Preferred activity afterward"])+area("Other things that help","helps","Example: Explain before touching. Let them see tools first. Give a 5-minute warning.")+buttons(true,"Story style");
if(step===5)b='<span class="badge">VISUAL PREPARATION STORY</span><h2>How should the story be written?</h2><p>The language will describe and prepare—not demand compliance.</p>'+select("Story voice","voice",["Simple first-person — “I can…”","Reassuring first-person","Simple third-person","Very short / low language"])+select("Story length","length",["Standard — 8 steps","Short — 6 steps","Detailed — 10 steps"])+area("Main preparation goal","goal","Example: Know what may happen and how to ask for a break.")+field("What can happen afterward? (optional)","then","Example: listen to music in the car")+buttons(true,"Create preview");
if(step===6){pack();return}form.innerHTML='<div class="question">'+b+'</div>';bind()}
function bind(){var e=form.querySelectorAll("[data-key]");for(var i=0;i<e.length;i++)e[i].oninput=function(){state[this.getAttribute("data-key")]=this.value};var boxes=form.querySelectorAll("[data-list]");for(var j=0;j<boxes.length;j++)boxes[j].onchange=function(){var k=this.getAttribute("data-list");state[k]=state[k]||[];if(this.checked){if(state[k].indexOf(this.value)<0)state[k].push(this.value)}else{var v=this.value;state[k]=state[k].filter(function(x){return x!==v})}};var n=form.querySelector("[data-next]"),bk=form.querySelector("[data-back]");if(n)n.onclick=function(){if(!validateStep())return;step++;render()};if(bk)bk.onclick=function(){step--;render()}}
function sentenceFor(title,name,voice){
var third=voice&&voice.indexOf("third-person")>-1,low=voice&&voice.indexOf("low language")>-1,who=third?name:"I";
var copy={
"Travel to the dentist":"I will travel to the dentist. I can bring supports that help me feel prepared.",
"Arrive and check in":"I will arrive and check in. I may need to wait before it is my turn.",
"Wait for my turn":"I may wait for my turn. I can use my supports while I wait.",
"Meet the dental team":"I will meet the dental team. They can tell me what will happen before they begin.",
"Sit in the dental chair":"I may sit in the dental chair. I can ask for time, help, or a break.",
"Notice the light and tools":"I may see a bright light or dental tools. I can ask to see or learn about them first.",
"My teeth may be cleaned":"My teeth may be cleaned. I may notice sounds, tastes, water, or touch near my mouth.",
"The dentist may look at my teeth":"The dentist may look at my teeth. I can communicate if I need them to stop or give me time.",
"Pictures of my teeth may be taken":"Pictures of my teeth may be taken. The team can explain what I need to do one step at a time.",
"A tooth may be treated":"A tooth may be treated. I can use my communication and supports throughout the visit.",
"Fluoride may be placed on my teeth":"Fluoride may be placed on my teeth. I may notice a new taste or feeling in my mouth.",
"I can look around and meet the dental team":"I can look around and meet the dental team. I can take time to become familiar with the space.",
"My height and weight may be checked":"My height and weight may be checked. The team can show me the equipment before using it.",
"My temperature may be checked":"My temperature may be checked. I can ask what will happen before the check begins.",
"A cuff may squeeze my arm":"A cuff may wrap around and squeeze my arm for a short time. I can ask for an explanation first.",
"The provider may listen with a stethoscope":"The provider may use a stethoscope to listen. I can ask them to tell me before they touch me.",
"My ears or throat may be checked":"The provider may look at my ears or throat. I can ask for time or a break.",
"I may be offered a shot or vaccine":"I may be offered a shot or vaccine. I can ask questions, use my supports, and communicate what I need.",
"I may have a blood draw":"I may have a blood draw. I can use my supports and ask for time, help, or a break.",
"Scissors may trim my hair":"Scissors may make small sounds while my hair is trimmed. I can ask for a pause.",
"Clippers may buzz near my hair":"Clippers may buzz and vibrate near my head. I can use supports that help with the sound or feeling.",
"Water may be sprayed on my hair":"Water may be sprayed on my hair. I can ask to know before it happens.",
"My hair may be washed":"My hair may be washed. I may notice water, touch, smells, or a change in position.",
"A cape may go around me":"A cape may go around me. I can communicate if it feels uncomfortable.",
"A blow dryer may make warm air and sound":"A blow dryer may make warm air and sound. I can ask for a different option when possible.",
"I can look in the mirror if I want":"I can look in the mirror if I want. I do not have to look before I am ready.",
"I may park or ride a shuttle":"I may park or ride a shuttle before entering the airport.",
"I may check in for the flight":"I may check in for the flight and get the information I need.",
"I will go through airport security":"I will go through airport security. There may be lines, instructions, and people nearby.",
"I may wait at the gate":"I may wait at the gate. I can use my supports while I wait.",
"I will board the airplane":"I will board the airplane and find my seat.",
"The airplane will take off":"The airplane will take off. I may notice louder sounds, movement, or pressure changes.",
"I will spend time on the airplane":"I will spend time on the airplane. I can use activities and supports that help me.",
"The airplane will land":"The airplane will land. I may notice movement, sound, and pressure changes again.",
"I may collect baggage":"I may collect baggage after the flight, then move on to what comes next.",
"I will arrive at school":"I will arrive at school and follow the arrival plan.",
"I will find my classroom":"I will find my classroom. I can look at my schedule to know what comes next.",
"I will meet my teacher":"I will meet my teacher. My teacher can learn how I communicate and what helps me.",
"I may be around classmates":"I may be around classmates. I can use my supports if the room feels busy.",
"I may hear bells or announcements":"I may hear bells or announcements. Some sounds may be sudden or loud.",
"I may have lunch":"I may have lunch. I can follow my plan and communicate what I need.",
"I may move to another place or activity":"I may move to another place or activity. A warning or schedule can help me prepare.",
"I will leave when the school day ends":"I will leave when the school day ends and follow my dismissal plan.",
"I may wait for a table":"I may wait for a table. I can use my supports while I wait.",
"I will sit at our table":"I will choose or be shown where to sit at our table.",
"I can look at the choices":"I can look at the menu or choices. I can take time to decide.",
"I can communicate my order or choice":"I can communicate my order or choice in the way that works for me.",
"I may wait while food is prepared":"I may wait while food is prepared. I can use a preferred activity while I wait.",
"I can eat or spend time at the table":"I can eat what works for me or spend time at the table.",
"We will pay":"We will pay when we are finished.",
"We will leave when we are finished":"We will leave when we are finished and move on to what comes next.",
"I can get a cart or basket":"I can get a cart or basket before shopping.",
"We can follow a shopping list":"We can follow a shopping list so I can see what we need.",
"I may move around other shoppers":"I may move through busy aisles with other shoppers nearby.",
"We will choose items":"We will choose the items we need.",
"I may wait at checkout":"I may wait at checkout. I can use my supports while I wait.",
"We will pay for the items":"We will pay for the items at checkout.",
"The groceries may be bagged":"The groceries may be bagged before we leave.",
"We will leave the store":"We will leave the store when shopping is finished.",
"I may greet people":"I may greet people in the way that works for me.",
"I may hear music":"I may hear music. I can move away or use sound supports if I need them.",
"I can choose whether to join games":"I can choose whether to join games or watch first.",
"There may be presents":"There may be presents and people may react with excitement.",
"People may sing":"People may sing. I can prepare for the sound or step away if I need to.",
"Cake or other food may be offered":"Cake or other food may be offered. I can choose what works for me.",
"People may take photos":"People may take photos. Adults can tell me before taking my photo.",
"I can say goodbye and leave when it is time":"I can say goodbye in my own way and leave when it is time.",
"Preview the plan and space":"I can preview the plan, pictures, or space before the experience when possible.",
"Communicate what I need":"I can communicate yes, no, stop, help, or break in the way that works for me.",
"Use a break or extra time if I need it":"I can use a break or extra time when I need it.",
"Check what happens next":"I can check my schedule or ask what happens next.",
"Finish and leave":"I will finish and leave. I can move on to what comes next.",
"Finish":"I will finish the experience and move on to what comes next."
};
var t=copy[title]||("I can learn about "+title.toLowerCase()+". I can communicate what I need.");
if(low){return title.replace(/^I |^My |^We /,"")+"."}
if(third){t=t.replace(/\bI\b/g,name).replace(/\bmy\b/g,name+"’s").replace(/\bme\b/g,name);}
return t;
}
function sceneId(type){return{"Dentist":"dentist","Doctor":"doctor","Haircut":"haircut","Airplane":"airplane","First Day of School":"school","Restaurant":"restaurant","Grocery Store":"grocery","Birthday Party":"birthday","Custom":"custom"}[type]||"custom"}
function listText(a,fallback){return(a&&a.length)?a.join(" • "):fallback}
function buildPackModel(){
var c=catalog[state.type]||catalog.Custom,display=state.type==="Custom"?(state.customType||"My Experience"):state.type,rawName=state.name||"This person",steps=specificSteps(c);
if((state.length||"").indexOf("Detailed")===0)steps=detailedSteps(steps);else if((state.length||"").indexOf("Short")===0)steps=steps.slice(0,6);else steps=steps.slice(0,8);
var commCards=["BREAK","STOP","HELP","YES","NO","ALL DONE"];
if((state.communication||[]).indexOf("AAC device")>-1)commCards.push("MY AAC");
if((state.supports||[]).indexOf("Quiet space")>-1)commCards.push("QUIET SPACE");
if((state.supports||[]).indexOf("Extra processing time")>-1)commCards.push("MORE TIME");
return{name:rawName,display:display,when:state.when||"Upcoming experience",scene:sceneId(state.type),goal:state.goal||"Know what may happen and how to communicate what I need.",steps:steps.map(function(s,i){return{icon:s[0],title:s[1],text:sentenceFor(s[1],rawName,state.voice),number:i+1}}),schedule:steps.map(function(s,i){return{number:i+1,title:s[1]}}),cards:commCards,communication:listText(state.communication,"Ask how this person communicates best"),language:state.language||"Short, concrete phrases",communicationNotes:state.communicationNotes||"Give time to process and respond.",signals:listText(state.signals,"Ask how this person communicates a boundary or break"),sensory:listText(state.sensory,"Ask about individual sensory and environmental needs"),supports:listText(state.supports,"Clear information • Processing time • Breaks when needed"),avoid:state.avoid||"Avoid rushing. Explain before touching or changing the plan when possible.",helps:state.helps||"Preview what will happen, use clear language, and allow processing time.",then:state.then||"move on to a preferred or familiar activity",details:state.details||""};
}
function storyCards(m,limit){return m.steps.slice(0,limit==null?m.steps.length:limit).map(function(s){return'<article class="pack-story-step"><div class="step-number">'+s.number+'</div><div><b>'+esc(s.title)+'</b><p>'+esc(s.text)+'</p></div></article>'}).join("")}
function fullPackHTML(m){
return '<div class="full-ready-pack" aria-label="Complete Ready Pack"><section class="pack-page pack-title-page"><div class="pack-mark">Autism<span>Ready</span></div><svg class="pack-scene" viewBox="0 0 120 82"><use href="/assets/experience-scenes.svg#'+m.scene+'"></use></svg><span class="section-label">PERSONALIZED READY PACK</span><h1>'+esc(m.name)+'’s '+esc(m.display)+' Ready Pack</h1><p>'+esc(m.when)+'</p><div class="pack-purpose"><b>Preparation goal</b><p>'+esc(m.goal)+'</p></div></section>'+
'<section class="pack-page"><span class="section-label">MY VISUAL PREPARATION STORY</span><h2>What may happen</h2><div class="pack-story-list">'+storyCards(m)+'</div></section>'+
'<section class="pack-page"><span class="section-label">MY VISUAL SCHEDULE</span><h2>What comes next</h2><div class="schedule-grid">'+m.schedule.map(function(x){return'<div><b>'+x.number+'</b><span>'+esc(x.title)+'</span></div>'}).join("")+'</div></section>'+
'<section class="pack-page"><span class="section-label">MY COMMUNICATION CARDS</span><h2>Ways I can communicate</h2><div class="communication-card-grid">'+m.cards.map(function(x){return'<div class="communication-card"><strong>'+esc(x)+'</strong></div>'}).join("")+'</div><p class="pack-note">Honor communication in the form that works for this person, including speech, AAC, gestures, pictures, signs, writing, or moving away.</p></section>'+
'<section class="pack-page"><span class="section-label">FIRST / THEN</span><h2>One step at a time</h2><div class="first-then-grid"><div><small>FIRST</small><strong>'+esc(m.schedule[0]?m.schedule[0].title:m.display)+'</strong></div><div><small>THEN</small><strong>'+esc(m.then)+'</strong></div></div></section>'+
'<section class="pack-page"><span class="section-label">SENSORY PREPARATION</span><h2>What I may notice & what helps</h2><div class="pack-info-grid"><article><b>I may notice</b><p>'+esc(m.sensory)+'</p></article><article><b>Supports that may help</b><p>'+esc(m.supports)+'</p></article><article><b>Please avoid when possible</b><p>'+esc(m.avoid)+'</p></article><article><b>Other things that help</b><p>'+esc(m.helps)+'</p></article></div></section>'+
'<section class="pack-page support-handoff"><span class="section-label">HOW TO SUPPORT ME</span><h2>Quick guide for '+esc(m.name)+'</h2><div class="handoff-row"><b>Communication</b><p>'+esc(m.communication)+'</p></div><div class="handoff-row"><b>Language & processing</b><p>'+esc(m.language)+' • '+esc(m.communicationNotes)+'</p></div><div class="handoff-row"><b>Boundaries & break signals</b><p>'+esc(m.signals)+'</p></div><div class="handoff-row"><b>Sensory / environment</b><p>'+esc(m.sensory)+'</p></div><div class="handoff-row"><b>What helps</b><p>'+esc(m.supports)+' • '+esc(m.helps)+'</p></div><div class="handoff-row"><b>Please avoid when possible</b><p>'+esc(m.avoid)+'</p></div><div class="handoff-reminder">Prepare me for the experience. Prepare the experience to support me.</div></section></div>';
}
function pack(){var m=buildPackModel(),c=catalog[state.type]||catalog.Custom,name=esc(m.name),pc=Math.max(1,Math.ceil(m.steps.length*.2));
form.innerHTML='<div class="question pack-screen"><span class="badge">PERSONALIZED PREVIEW</span><h2>'+name+'’s '+esc(m.display)+' Ready Pack</h2><p>One profile creates a coordinated toolkit for the individual and the people supporting them.</p><div class="pack-toolbar"><button class="secondary" data-back>← Edit</button><button class="secondary" data-new>Build another</button></div><div class="ready-pack preview-pack"><div class="pack-cover"><div class="pack-mark">Autism<span>Ready</span></div><svg class="pack-preview-scene" viewBox="0 0 120 82"><use href="/assets/experience-scenes.svg#'+m.scene+'"></use></svg><h1>'+name+'’s '+esc(m.display)+' Ready Pack</h1><p>Clear information. Personalized supports. Ways to communicate.</p><small>'+esc(m.when)+'</small></div><section class="pack-section story"><div class="section-label">PREVIEW • 20% OF VISUAL PREPARATION STORY</div><h3>I can get ready for '+esc(m.display).toLowerCase()+'.</h3><p class="goal"><strong>Preparation goal:</strong> '+esc(m.goal)+'</p><div class="pack-story-list">'+storyCards(m,pc)+'</div></section><section class="support-card-preview"><div class="section-label">HOW TO SUPPORT ME • SAMPLE</div><h3>What adults should know</h3><div class="support-grid"><div><b>💬 I communicate with</b><p>'+esc(m.communication)+'</p></div><div><b>⏳ Language & processing</b><p>'+esc(m.language)+' • '+esc(m.communicationNotes)+'</p></div><div><b>✋ My boundaries / break signals</b><p>'+esc(m.signals)+'</p></div><div><b>🎧 Helpful supports</b><p>'+esc(m.supports)+'</p></div></div></section><section class="locked-product"><div class="lock-icon">🔒</div><h3>Your complete personalized Ready Pack is built</h3><p>The paid pack includes '+m.steps.length+' story steps plus six coordinated printable support tools.</p><div class="locked-list"><span>🔒 Full '+m.steps.length+'-step preparation story</span><span>🔒 Full visual schedule</span><span>🔒 Personalized communication cards</span><span>🔒 Sensory preparation page</span><span>🔒 First / Then page</span><span>🔒 Complete “How to Support Me” handoff</span><span>🔒 Print-ready toolkit</span></div><div class="unlock-price">$7.99 <small>one-time</small></div><button class="primary unlock-btn" data-unlock>Unlock my complete Ready Pack →</button><small class="secure-note">Checkout is being connected. No payment is collected in this preview build.</small></section></div></div>';
var bk=form.querySelector("[data-back]"),nw=form.querySelector("[data-new]"),u=form.querySelector("[data-unlock]");if(bk)bk.onclick=function(){step=5;render()};if(nw)nw.onclick=function(){modal.classList.remove("open");document.getElementById("builder").scrollIntoView({behavior:"smooth"})};if(u)u.onclick=async function(){
try{sessionStorage.setItem("autismready_pack",JSON.stringify(m));}catch(e){}
u.disabled=true;u.textContent="Opening secure checkout…";
try{
var res=await fetch("/api/create-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})});
var data=await res.json();
if(!res.ok||!data.url)throw new Error(data.error||"Checkout unavailable");
window.location.href=data.url;
}catch(err){u.disabled=false;u.textContent="Unlock my complete Ready Pack →";var note=form.querySelector(".secure-note");if(note)note.textContent="Checkout could not open. Please try again."}
}}

var ex=document.querySelectorAll(".experience");for(var i=0;i<ex.length;i++)ex[i].onclick=function(){open(this.getAttribute("data-type"))};var st=document.querySelectorAll("[data-start]");for(var j=0;j<st.length;j++)st[j].onclick=function(){document.getElementById("builder").scrollIntoView({behavior:"smooth"})};var close=document.querySelector(".close");function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");if(modal._returnFocus&&modal._returnFocus.focus)modal._returnFocus.focus()}
if(close)close.onclick=closeModal;if(modal)modal.onclick=function(e){if(e.target===modal)closeModal()};document.addEventListener("keydown",function(e){if(e.key==="Escape"&&modal.classList.contains("open"))closeModal()});
})();

/* Storefront Ready Pack demo */
(function(){
var page=document.getElementById("demoPage"),tabs=document.querySelectorAll(".demo-tab");if(!page||!tabs.length)return;
var views={
story:'<div class="demo-page-label">MY VISUAL PREPARATION STORY</div><h3>My Dentist Visit</h3><div class="demo-story-row"><b>1</b><div><strong>I will arrive and check in.</strong><p>I can use my AAC or gestures if I need help or a break.</p></div></div><div class="demo-story-row"><b>2</b><div><strong>I may wait for my turn.</strong><p>I can wear my headphones while I wait.</p></div></div><div class="demo-story-row"><b>3</b><div><strong>I will meet the dental team.</strong><p>They can tell me what will happen before they begin.</p></div></div>',
schedule:'<div class="demo-page-label">MY VISUAL SCHEDULE</div><h3>What comes next</h3><div class="demo-story-row"><b>1</b><div><strong>Arrive & check in</strong><p>First, I arrive at the dentist.</p></div></div><div class="demo-story-row"><b>2</b><div><strong>Wait for my turn</strong><p>I can use headphones while I wait.</p></div></div><div class="demo-story-row"><b>3</b><div><strong>Meet the dental team</strong><p>Then I can learn what happens next.</p></div></div>',
communicate:'<div class="demo-page-label">MY COMMUNICATION CARDS</div><h3>What I may need to say</h3><div class="demo-story-row"><b>✋</b><div><strong>BREAK</strong><p>I need some time before we continue.</p></div></div><div class="demo-story-row"><b>■</b><div><strong>STOP</strong><p>Please stop and give me time to communicate.</p></div></div><div class="demo-story-row"><b>?</b><div><strong>HELP</strong><p>Please show or explain what happens next.</p></div></div>',
firstthen:'<div class="demo-page-label">FIRST / THEN SUPPORT</div><h3>One step at a time</h3><div class="demo-story-row"><b>1</b><div><strong>FIRST</strong><p>I sit in the dental chair and learn what is happening.</p></div></div><div class="demo-story-row"><b>2</b><div><strong>THEN</strong><p>I finish and move on to what comes afterward.</p></div></div>',
support:'<div class="demo-page-label">HOW TO SUPPORT MARCUS</div><h3>A quick guide for the person helping me</h3><div class="demo-story-row"><b>💬</b><div><strong>Communication</strong><p>Marcus uses AAC and gestures. Give extra processing time.</p></div></div><div class="demo-story-row"><b>🎧</b><div><strong>Sensory</strong><p>Bright lights may matter. Headphones can help with sound.</p></div></div><div class="demo-story-row"><b>✋</b><div><strong>Boundaries</strong><p>Explain before touching. Honor STOP and BREAK communication.</p></div></div>'
};
for(var i=0;i<tabs.length;i++)tabs[i].onclick=function(){for(var j=0;j<tabs.length;j++)tabs[j].classList.remove("active");this.classList.add("active");page.innerHTML=views[this.getAttribute("data-demo")]||views.story;page.style.animation="none";void page.offsetWidth;page.style.animation=""};
})();
