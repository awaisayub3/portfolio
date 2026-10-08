// @ts-nocheck
// Generated from imports/lahore-footer.html
export function buildFooterArt(root: HTMLElement) {
/* stars */
  var s=7;function r(){s=(s*16807)%2147483647;return s/2147483647;}
  var st="";
  for(var i=0;i<70;i++){st+='<circle cx="'+(r()*1600).toFixed(0)+'" cy="'+(r()*190).toFixed(0)+'" r="'+(0.6+r()*1).toFixed(2)+'" style="animation-delay:-'+(r()*3).toFixed(2)+'s;animation-duration:'+(2+r()*2.5).toFixed(2)+'s"/>';}
  root.querySelector("#stars").innerHTML=st;

  /* helpers */
  var MAR="#F6F1E7",MARD="#D9D2C3",DARK="#2B120D";
  function dome(cx,b,w,h){return "M"+(cx-w)+","+b+" C"+(cx-w*1.18)+","+(b-h*.32)+" "+(cx-w*.5)+","+(b-h*.72)+" "+cx+","+(b-h)+" C"+(cx+w*.5)+","+(b-h*.72)+" "+(cx+w*1.18)+","+(b-h*.32)+" "+(cx+w)+","+b+" Z";}
  function domeSvg(cx,b,w,h){
    return '<rect x="'+(cx-w*.86)+'" y="'+(b-6)+'" width="'+(w*1.72)+'" height="16" fill="url(#mg)"/>'+
      '<path d="'+dome(cx,b,w,h)+'" fill="url(#dg)"/>'+
      '<path d="M'+(cx-w*.5)+','+(b-h*.5)+' Q'+(cx-w*.2)+','+(b-h*.85)+' '+cx+','+(b-h+4)+'" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<rect x="'+(cx-1.5)+'" y="'+(b-h-26)+'" width="3" height="28" fill="#E2B85C"/><circle cx="'+cx+'" cy="'+(b-h-28)+'" r="4" fill="#E2B85C"/>';
  }
  function chhatri(tx,ty,sc){
    return '<g transform="translate('+tx+','+ty+') scale('+sc+')">'+
      '<rect x="-16" y="-6" width="32" height="6" rx="1.5" fill="'+MAR+'"/>'+
      '<rect x="-12" y="-32" width="3" height="26" fill="'+MARD+'"/><rect x="-4" y="-32" width="3" height="26" fill="'+MAR+'"/><rect x="2" y="-32" width="3" height="26" fill="'+MAR+'"/><rect x="9" y="-32" width="3" height="26" fill="'+MARD+'"/>'+
      '<path d="'+dome(0,-32,15,26)+'" fill="url(#dg)"/><rect x="-1" y="-70" width="2" height="14" fill="#E2B85C"/></g>';
  }
  function minaret(cx){
    var o='<rect x="'+(cx-24)+'" y="585" width="48" height="16" fill="#8F3D2B"/>'+
      '<polygon points="'+(cx-17)+',585 '+(cx-13)+',302 '+(cx+13)+',302 '+(cx+17)+',585" fill="url(#ng)"/>';
    [545,490,435,380,335].forEach(function(y){var hw=13+(y-302)/283*4+2;o+='<rect x="'+(cx-hw)+'" y="'+y+'" width="'+(hw*2)+'" height="7" rx="1.5" fill="'+MAR+'"/>';});
    [470,360].forEach(function(y){o+='<rect x="'+(cx-22)+'" y="'+y+'" width="44" height="8" rx="2" fill="'+MAR+'"/><rect x="'+(cx-22)+'" y="'+(y+8)+'" width="44" height="3" fill="'+MARD+'"/>';});
    o+=chhatri(cx,302,1);
    return o;
  }

  /* Badshahi Mosque (drawn at 1:1, then scaled into the banner) */
  var m='<defs>'+
    '<linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9694E"/><stop offset="1" stop-color="#A24530"/></linearGradient>'+
    '<linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D2735A"/><stop offset="1" stop-color="#B0503A"/></linearGradient>'+
    '<linearGradient id="dg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#EFE9DC"/><stop offset="1" stop-color="#C4BBA8"/></linearGradient>'+
    '<linearGradient id="mg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF"/><stop offset="1" stop-color="#D9D2C3"/></linearGradient>'+
    '<linearGradient id="ng" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A24530"/><stop offset=".5" stop-color="#CF6D51"/><stop offset="1" stop-color="#8A3828"/></linearGradient>'+
    '<linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD98A"/><stop offset="1" stop-color="#FF9A3C"/></linearGradient>'+
    '</defs><g transform="translate(523.6,-36) scale(0.56)">';
  m+=domeSvg(470,418,85,135)+domeSvg(305,418,58,92)+domeSvg(635,418,58,92);
  m+='<rect x="190" y="430" width="560" height="155" fill="url(#sg)"/>';
  for(var x=196;x<748;x+=16){m+='<path d="M'+x+',430 v-6 l5,-9 l5,9 v6 z" fill="#C9694E"/>';}
  m+='<rect x="186" y="426" width="568" height="8" fill="'+MARD+'"/><rect x="190" y="492" width="560" height="5" fill="'+MAR+'"/><rect x="180" y="585" width="580" height="16" fill="#8F3D2B"/>';
  [232,289,346,594,651,708].forEach(function(cx){
    m+='<path d="M'+(cx-22)+',585 V520 Q'+(cx-22)+',500 '+cx+',486 Q'+(cx+22)+',500 '+(cx+22)+',520 V585 Z" fill="'+DARK+'" stroke="'+MAR+'" stroke-width="3"/>';
    m+='<path class="lit" d="M'+(cx-15)+',585 V526 Q'+(cx-15)+',512 '+cx+',501 Q'+(cx+15)+',512 '+(cx+15)+',526 V585 Z" fill="url(#lg)"/>';
    m+='<path d="M'+(cx-11)+',478 V458 Q'+(cx-11)+',447 '+cx+',440 Q'+(cx+11)+',447 '+(cx+11)+',458 V478 Z" fill="'+DARK+'" stroke="'+MAR+'" stroke-width="2"/>';
    m+='<path class="lit" d="M'+(cx-8)+',478 V460 Q'+(cx-8)+',451 '+cx+',446 Q'+(cx+8)+',451 '+(cx+8)+',460 V478 Z" fill="url(#lg)"/>';
  });
  m+='<rect x="395" y="392" width="150" height="193" fill="url(#pg)" stroke="'+MAR+'" stroke-width="4"/>'+
     '<rect x="395" y="392" width="150" height="12" fill="'+MAR+'"/>'+
     '<rect x="405" y="412" width="26" height="62" rx="13" fill="none" stroke="'+MAR+'" stroke-width="2.5"/><rect x="509" y="412" width="26" height="62" rx="13" fill="none" stroke="'+MAR+'" stroke-width="2.5"/>'+
     '<rect x="405" y="490" width="26" height="62" rx="13" fill="none" stroke="'+MAR+'" stroke-width="2.5"/><rect x="509" y="490" width="26" height="62" rx="13" fill="none" stroke="'+MAR+'" stroke-width="2.5"/>'+
     '<path d="M422,585 V505 Q422,468 470,430 Q518,468 518,505 V585 Z" fill="'+DARK+'" stroke="'+MAR+'" stroke-width="6"/>'+
     '<path class="lit" d="M446,585 V535 Q446,512 470,497 Q494,512 494,535 V585 Z" fill="url(#lg)"/>'+
     '<path d="M446,585 V535 Q446,512 470,497 Q494,512 494,535 V585 Z" fill="none" stroke="'+MAR+'" stroke-width="2" opacity=".8"/>';
  m+=chhatri(410,392,.85)+chhatri(530,392,.85)+chhatri(215,430,1)+chhatri(725,430,1);
  m+='<rect x="385" y="585" width="170" height="8" fill="'+MAR+'"/><rect x="375" y="593" width="190" height="8" fill="'+MARD+'"/><rect x="365" y="601" width="210" height="8" fill="'+MAR+'"/>';
  m+=minaret(160)+minaret(780)+'</g>';
  root.querySelector("#mosque").innerHTML=m;

  /* Minar-e-Pakistan */
  var n='<defs>'+
    '<linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#EDE8DC"/><stop offset="1" stop-color="#B9B2A2"/></linearGradient>'+
    '<radialGradient id="uplight" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#FFC766" stop-opacity=".65"/><stop offset="1" stop-color="#FFC766" stop-opacity="0"/></radialGradient>'+
    '</defs><g transform="translate(645.2,12) scale(0.48)">';
  n+='<path d="M915,600 Q915,572 940,572 H1080 Q1105,572 1105,600 Z" fill="#CFCBC1"/>'+
     '<path d="M935,572 Q935,548 958,548 H1062 Q1085,548 1085,572 Z" fill="#DAD6CC"/>'+
     '<path d="M955,548 Q955,526 978,526 H1042 Q1065,526 1065,548 Z" fill="#E5E2D9"/>'+
     '<polygon points="990,526 997,158 1010,148 1010,526" fill="#F3F0E8"/><polygon points="1010,148 1023,158 1030,526 1010,526" fill="#C9C4B7"/>'+
     '<line x1="1002" y1="526" x2="1003" y2="160" stroke="#000" stroke-opacity=".08" stroke-width="2"/><line x1="1018" y1="526" x2="1017" y2="160" stroke="#000" stroke-opacity=".1" stroke-width="2"/>'+
     '<rect x="982" y="182" width="56" height="9" rx="3" fill="#D9D2C3"/><rect x="986" y="174" width="48" height="8" rx="3" fill="#EFEADF"/>'+
     '<path d="M985,176 C960,146 974,108 1010,58 C1046,108 1060,146 1035,176 Z" fill="url(#cg)"/>'+
     '<path d="M1010,58 C1000,104 994,140 999,176" fill="none" stroke="#B9B2A2" stroke-width="2"/><path d="M1010,58 C1020,104 1026,140 1021,176" fill="none" stroke="#B9B2A2" stroke-width="2"/><line x1="1010" y1="58" x2="1010" y2="176" stroke="#A39C8B" stroke-width="1.5"/>'+
     '<line x1="1010" y1="58" x2="1010" y2="36" stroke="#C9C4B7" stroke-width="3"/><circle id="beacon" cx="1010" cy="34" r="5" fill="#FF5A4D"/>'+
     '<ellipse class="lit" cx="1010" cy="602" rx="150" ry="44" fill="url(#uplight)"/></g>';
  root.querySelector("#minar").innerHTML=n;

  /* Greater Iqbal Park lawn: paths, hedges, trees, lamps */
  var L='<defs><radialGradient id="lampg"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".9"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient></defs>';
  L+='<path d="M770,300 L804,300 L856,360 L718,360 Z" fill="#d8c69f" opacity=".85"/>';
  L+='<path d="M-40,346 Q800,316 1640,346" fill="none" stroke="#d8c69f" stroke-width="9" opacity=".6"/>';
  [60,150,250,1050,1120,1240,1340,1430,1530].forEach(function(x,i){L+='<ellipse cx="'+x+'" cy="301" rx="'+(22+(i%3)*6)+'" ry="'+(9+(i%2)*3)+'" fill="#1f5a2b"/>';});
  function tree(x,sc){return '<g transform="translate('+x+',302) scale('+sc+')"><rect x="-3" y="-26" width="6" height="26" fill="#4a2f1f"/><circle cx="0" cy="-38" r="20" fill="#1c5228"/><circle cx="-14" cy="-28" r="14" fill="#23602f"/><circle cx="14" cy="-29" r="14" fill="#216a2f"/></g>';}
  L+=tree(575,.9)+tree(1225,.85)+tree(1565,1)+tree(40,1)+tree(1465,.75);
  [548,1040,1290,1510].forEach(function(x){L+='<rect x="'+(x-1)+'" y="272" width="2" height="30" fill="#2b2b34"/><circle cx="'+x+'" cy="270" r="3" fill="#2b2b34"/><circle class="lit" cx="'+x+'" cy="270" r="18" fill="url(#lampg)"/><circle class="lit" cx="'+x+'" cy="270" r="3" fill="#FFE7A8"/>';});
  root.querySelector("#lawn").innerHTML=L;

  /* people walking around the lawn */
  var W={
    w:'#F2EFE6', cream:'#E8E2D0', navy:'#23345c', maroon:'#8B2E3F', teal:'#1f8a7a', gold:'#D4A22B',
    sky:'#6FA8DC', red:'#E4572E', jean:'#33507a', dk:'#2b2b34', grey:'#d9d4c4'
  };
  function fig(o){
    var hip=o.t==="s"?30:(o.t==="k"?34:36), sk=o.skin||"#C68E5F", pc=o.pc||W.cream, c=o.c, sp=o.sp||(o.fast?".32s":".62s");
    var v='<div class="fg" style="left:'+(o.x||0)+'px;--k:'+(o.k||1)+'"><svg width="24" height="60" viewBox="0 0 24 60" style="--sp:'+sp+'">';
    v+='<ellipse cx="12" cy="59" rx="9" ry="2" fill="rgba(0,0,0,.35)"/><g class="bob">';
    v+='<rect class="leg a" x="8" y="'+hip+'" width="4.6" height="'+(58-hip)+'" rx="2.2" fill="'+pc+'"/><rect class="leg b" x="12.6" y="'+hip+'" width="4.6" height="'+(58-hip)+'" rx="2.2" fill="'+pc+'"/>';
    v+='<rect class="arm a" x="17.8" y="14" width="3.6" height="16" rx="1.8" fill="'+c+'"/><rect class="arm b" x="2.6" y="14" width="3.6" height="16" rx="1.8" fill="'+c+'"/>';
    v+=o.t==="s"?'<path d="M5.5,14 Q12,11 18.5,14 L18,31 L6,31 Z" fill="'+c+'"/>':'<path d="M5.5,14 Q12,11 18.5,14 L19.5,38 L4.5,38 Z" fill="'+c+'"/>';
    v+='<rect x="10.5" y="11" width="3" height="3.5" fill="'+sk+'"/><circle cx="12" cy="7.5" r="5" fill="'+sk+'"/>';
    if(o.dup){v+='<path d="M6.3,8 A5.7,5.7 0 0 1 17.7,8 L17.7,9.5 Q12,5.5 6.3,9.5 Z" fill="'+o.dup+'"/><path d="M17,12 Q21,19 18.5,27 L10,19 Z" fill="'+o.dup+'" opacity=".92"/>';}
    else if(o.cap){v+='<path d="M6.8,7.2 A5.2,5.2 0 0 1 17.2,7.2 Z" fill="'+o.cap+'"/>';}
    else{v+='<path d="M7,7.5 A5,5 0 0 1 17,7.5 Q12,4.8 7,7.5 Z" fill="'+(o.hair||"#1a1210")+'"/>';}
    v+='</g>';
    if(o.balloon){v+='<g class="bal"><line x1="20" y1="28" x2="28" y2="-8" stroke="#ddd" stroke-width=".8"/><ellipse cx="28.5" cy="-15" rx="7" ry="9" fill="'+o.balloon+'"/></g>';}
    return v+'</svg></div>';
  }
  function grp(o){
    var w=0;o.figs.forEach(function(f){w=Math.max(w,(f.x||0)+26);});
    return '<div class="walker" style="bottom:'+(360-o.y)+'px;--s:'+o.s+';--f:'+o.dir+';animation-name:'+(o.dir>0?"wR":"wL")+';animation-duration:'+o.dur+'s;animation-delay:'+o.off+'s"><div class="grp" style="width:'+w+'px">'+o.figs.map(fig).join("")+'</div></div>';
  }
  var G=[
    {y:346,s:.68,dir:1,dur:52,off:-14,figs:[{t:"k",c:W.w,pc:W.cream,cap:"#fff",x:0},{t:"d",c:W.maroon,pc:"#6b2431",dup:"#d9b25f",skin:"#E0AC7E",x:30}]},
    {y:334,s:.56,dir:-1,dur:62,off:-26,figs:[{t:"s",c:W.navy,pc:W.jean,x:0},{t:"d",c:W.teal,pc:"#166a5e",dup:"#e6d9b8",skin:"#E0AC7E",x:28},{t:"k",c:W.gold,pc:W.cream,k:.62,x:52,balloon:"#e04b6a",skin:"#D39A6A"}]},
    {y:350,s:.66,dir:1,dur:22,off:-4,figs:[{t:"s",c:W.red,pc:W.navy,fast:true,x:0,skin:"#A9714A"}]},
    {y:322,s:.44,dir:1,dur:72,off:-40,figs:[{t:"k",c:W.grey,pc:W.cream,x:0,cap:"#fff"},{t:"s",c:W.sky,pc:W.dk,x:26}]},
    {y:327,s:.48,dir:-1,dur:84,off:-18,figs:[{t:"k",c:W.grey,pc:"#cfc8b4",hair:"#b9b4ac",skin:"#8C5A3A",sp:".95s",x:0}]},
    {y:342,s:.5,dir:-1,dur:36,off:-9,figs:[{t:"k",c:W.gold,pc:W.cream,k:.62,fast:true,x:0,skin:"#D39A6A"},{t:"s",c:W.sky,pc:W.jean,k:.6,fast:true,x:22},{t:"d",c:W.maroon,pc:"#6b2431",dup:"#d9b25f",k:.6,fast:true,x:44,skin:"#E0AC7E"}]},
    {y:330,s:.52,dir:1,dur:66,off:-52,figs:[{t:"d",c:W.teal,pc:"#166a5e",dup:"#f0e3c0",skin:"#C68E5F",x:0}]}
  ];
  root.querySelector("#walkers").innerHTML=G.map(grp).join("");

  
}
