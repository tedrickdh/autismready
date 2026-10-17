import React,{useEffect,useRef,useState} from 'react';
import {ActivityIndicator,BackHandler,Linking,Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {WebView} from 'react-native-webview';

const SITE='https://autismready.pages.dev/';
const EXPERIENCES=[
 {name:'Dentist',emoji:'🦷',steps:['Travel to the dentist','Arrive and check in','Wait for my turn','Meet the dental team','Sit in the dental chair','The team may look at my teeth','Ask for a break if I need one','Finish and leave']},
 {name:'Doctor',emoji:'🩺',steps:['Travel to the office','Check in','Wait for my turn','Meet the care team','Routine checks may happen','Communicate what I need','Ask for a break','Finish and leave']},
 {name:'Haircut',emoji:'✂️',steps:['Travel to my haircut','Meet the stylist','See the chair and tools','A cape may be offered','My hair may be cut','I may notice loose hair','Look in the mirror if I want','Finish and leave']},
 {name:'Airplane',emoji:'✈️',steps:['Pack what I need','Travel to the airport','Check in','Go through security','Wait at the gate','Board the airplane','Spend time on the flight','Land and get off']},
 {name:'School',emoji:'🎒',steps:['Get ready for school','Travel to school','Enter the building','Meet adults and classmates','Find my classroom','Learn the class routine','Take scheduled breaks','Go home']},
 {name:'Restaurant',emoji:'🍽️',steps:['Travel to the restaurant','Enter the restaurant','Find our table','Look at the choices','Communicate my order','Wait for food','Spend time at the table','Finish and leave']},
 {name:'Grocery Store',emoji:'🛒',steps:['Get ready to shop','Travel to the store','Get a cart or basket','Find the items we need','Move around other shoppers','Wait at checkout','Pay for the items','Leave the store']},
 {name:'Birthday Party',emoji:'🎈',steps:['Get ready for the party','Travel there','Arrive','Notice sounds and people','Choose activities','Food may be offered','Take a break if needed','Leave when it is time']}
];
function Action({label,onPress,secondary=false}){return <Pressable accessibilityRole="button" onPress={onPress} style={[styles.button,secondary&&styles.secondary]}><Text style={[styles.buttonText,secondary&&styles.secondaryText]}>{label}</Text></Pressable>}
export default function App(){
 const [screen,setScreen]=useState('home'),[experience,setExperience]=useState(EXPERIENCES[0]),[step,setStep]=useState(0),[completed,setCompleted]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(false),[canBack,setCanBack]=useState(false),[breakOpen,setBreakOpen]=useState(false);
 const web=useRef(null);
 function home(){setScreen('home');setBreakOpen(false)}
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(screen==='website'&&canBack){web.current?.goBack();return true}if(screen!=='home'){home();return true}return false});return()=>sub.remove()},[screen,canBack]);
 function choose(item){setExperience(item);setStep(0);setCompleted([]);setBreakOpen(false);setScreen('ready')}
 function allow(req){const url=req.url||'';if(url.startsWith('https://checkout.stripe.com/')||url.startsWith('https://billing.stripe.com/')){Linking.openURL(url);return false}if(url.startsWith('http')&&!url.startsWith(SITE)){Linking.openURL(url);return false}return true}
 function done(){setCompleted(old=>old.includes(step)?old:old.concat(step));if(step<experience.steps.length-1)setStep(step+1)}
 const progress=completed.length/experience.steps.length;
 return <SafeAreaView style={styles.root}>
  <View style={styles.header}><Pressable onPress={home} accessibilityRole="button"><Text style={styles.brand}>Autism<Text style={styles.green}>Ready</Text></Text></Pressable><Text style={styles.sub}>PREPARE TODAY. MORE FAMILIAR TOMORROW.</Text></View>
  {screen==='home'?<ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>WELCOME TO AUTISMREADY</Text><Text style={styles.title}>Feel more ready for what comes next.</Text>
    <Text style={styles.body}>Create a personalized Ready Pack or explore an interactive visual schedule.</Text>
    <Action label="Create a personalized Ready Pack →" onPress={()=>setScreen('website')}/>
    <View style={styles.section}><Text style={styles.heading}>Try Ready Mode</Text><Text style={styles.body}>Explore an example schedule. Your purchased Ready Packs are not yet connected to this preview.</Text></View>
    <View style={styles.grid}>{EXPERIENCES.map(item=><Pressable key={item.name} accessibilityRole="button" accessibilityLabel={'Preview '+item.name+' schedule'} onPress={()=>choose(item)} style={styles.tile}><Text style={styles.tileIcon}>{item.emoji}</Text><Text style={styles.tileTitle}>{item.name}</Text><Text style={styles.tileSub}>Preview schedule →</Text></Pressable>)}</View>
    <Text style={styles.note}>Ready Mode currently uses example steps. To customize the story, communication tools and supports, choose Create a personalized Ready Pack.</Text>
  </ScrollView>:null}
  {screen==='ready'?<ScrollView contentContainerStyle={styles.content}>
    <View style={styles.topline}><Pressable onPress={home}><Text style={styles.green}>‹ All experiences</Text></Pressable><Text style={styles.eyebrow}>EXAMPLE READY MODE</Text></View>
    <Text style={styles.heading}>{experience.emoji} {experience.name}</Text><Text style={styles.body}>Step {step+1} of {experience.steps.length}</Text>
    <View style={styles.track}><View style={[styles.fill,{width:(progress*100)+'%'}]}/></View>
    <View style={styles.stepCard}><Text style={styles.stepEmoji}>{experience.emoji}</Text><Text style={styles.eyebrow}>WHAT MAY HAPPEN</Text><Text style={styles.stepTitle}>{experience.steps[step]}</Text><Text style={styles.body}>The plan may change. I can ask what happens next.</Text></View>
    {breakOpen?<View style={styles.breakCard}><Text style={styles.heading}>I need a break</Text><Text style={styles.body}>I can ask for more time, a quieter place, or help.</Text><Action label="Close break card" secondary onPress={()=>setBreakOpen(false)}/></View>:null}
    <Action label={completed.includes(step)?'Completed ✓':step===experience.steps.length-1?'Mark finished ✓':'Done — next step →'} onPress={done}/>
    <View style={styles.controls}><Action label="‹ Previous" secondary onPress={()=>setStep(Math.max(0,step-1))}/><Action label="Next ›" secondary onPress={()=>setStep(Math.min(experience.steps.length-1,step+1))}/></View>
    <Action label="I need a break" secondary onPress={()=>setBreakOpen(true)}/>
    <Text style={styles.note}>This is a generic preview, not a purchased or individualized schedule.</Text>
  </ScrollView>:null}
  {screen==='website'?<View style={styles.webWrap}><View style={styles.webBar}><Pressable onPress={home}><Text style={styles.green}>‹ Home</Text></Pressable><Text style={styles.body}>Ready Pack builder</Text></View><WebView ref={web} source={{uri:SITE}} onShouldStartLoadWithRequest={allow} onNavigationStateChange={s=>setCanBack(s.canGoBack)} onLoadStart={()=>setLoading(true)} onLoadEnd={()=>setLoading(false)} onError={()=>{setError(true);setLoading(false)}} javaScriptEnabled domStorageEnabled sharedCookiesEnabled style={styles.web}/>{loading?<View style={styles.loader}><ActivityIndicator size="large" color="#087f78"/></View>:null}{error?<View style={styles.loader}><Text>Unable to connect.</Text><Action label="Retry" onPress={()=>{setError(false);web.current?.reload()}}/></View>:null}</View>:null}
 </SafeAreaView>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fbf7ef'},header:{padding:16,borderBottomWidth:1,borderColor:'#d8e2e5'},brand:{fontSize:23,fontWeight:'800',color:'#13283f'},green:{color:'#087f78',fontWeight:'700'},sub:{fontSize:10,color:'#657484',letterSpacing:1,marginTop:3},content:{padding:20,paddingBottom:42},eyebrow:{fontSize:11,fontWeight:'800',color:'#087f78',letterSpacing:1},title:{fontSize:30,lineHeight:37,fontWeight:'800',color:'#13283f',marginVertical:13},heading:{fontSize:22,fontWeight:'800',color:'#13283f',marginBottom:7},body:{fontSize:15,lineHeight:22,color:'#526476'},button:{backgroundColor:'#087f78',padding:16,borderRadius:14,alignItems:'center',marginTop:16},buttonText:{fontWeight:'800',fontSize:15,color:'#fff'},secondary:{backgroundColor:'#e1f1ee',borderWidth:1,borderColor:'#bddad4'},secondaryText:{color:'#087f78'},section:{marginTop:30,marginBottom:15},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},tile:{width:'48%',minHeight:138,padding:16,backgroundColor:'#fff',borderWidth:1,borderColor:'#d8e2e5',borderRadius:18,marginBottom:12},tileIcon:{fontSize:32,marginBottom:12},tileTitle:{fontSize:16,fontWeight:'800',color:'#13283f'},tileSub:{fontSize:12,color:'#087f78',marginTop:7},note:{fontSize:12,color:'#687887',lineHeight:18,marginTop:22},topline:{flexDirection:'row',justifyContent:'space-between',marginBottom:20},track:{height:9,backgroundColor:'#dceae7',borderRadius:8,marginTop:14,marginBottom:18,overflow:'hidden'},fill:{height:'100%',backgroundColor:'#087f78'},stepCard:{backgroundColor:'#fff',borderRadius:22,padding:24,borderWidth:1,borderColor:'#d8e2e5',alignItems:'center',minHeight:310,justifyContent:'center'},stepEmoji:{fontSize:76,marginBottom:20},stepTitle:{fontSize:26,fontWeight:'800',color:'#13283f',textAlign:'center',marginVertical:14,lineHeight:33},controls:{flexDirection:'row',gap:12},breakCard:{backgroundColor:'#e1f1ee',padding:20,borderRadius:16,marginTop:15},webWrap:{flex:1},webBar:{padding:12,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#d8e2e5'},web:{flex:1},loader:{position:'absolute',top:48,bottom:0,left:0,right:0,justifyContent:'center',alignItems:'center',backgroundColor:'#fbf7ef'}});
