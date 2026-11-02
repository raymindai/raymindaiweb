/* Wakeel presence orb (Midad). Engine: wakeel-wip/hub/src/symbol-studio.js, copied as is apart from the off-screen pause. */
/* Wakeel presence: symbol studio.
 *
 * One orb, every symbol animation, and controls for each. The waw is split into its body and its
 * fatha (the short stroke above) so they can move apart. Each part is uploaded twice, sharp and
 * blurred; the blurred copy works as a soft distance field, so a threshold can thicken, thin,
 * bleed or write the stroke. window.SymbolStudio.mount(root, {body, fatha}) builds the page.
 */
(function () {
  'use strict';

  var FS = [
    'precision highp float;',
    'uniform vec2 uR; uniform float uT, uFlow;',
    'uniform float uListen, uThink, uSpeak, uAttn, uDone, uOff, uWork, uLevel, uBlink; uniform vec2 uLook;',
    'uniform sampler2D uTex; uniform vec2 uFathaC;',
    'uniform sampler2D uTex2; uniform float uSwap, uMorph, uFromWaw, uToWaw; uniform vec2 uSpin; uniform float uPulse, uJelly, uBulge; uniform vec4 uParts[14];',
    'uniform float pSize, pDepth, pBreath, pVoice, pFatha, pBleed, pScatter, pWrite, pWriteSpeed, pSheen;',
    'uniform float pInk, pHue, pGlow, pWarm, pEyes, pBody, pWave, pWaveFreq, pWaveSpeed, pWaveGlow, pWobble, pGlass, pSynapse, pSpeech, pSpeechTone, pDrop, pWork, pAgents, pDoneGlow, pRec, pDust, pThinkDust, pTurb, pGrain, pLight;',
    'float h3(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}',
    'float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);',
    ' return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),',
    '  mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}',
    'float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n3(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}',
    'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
    'vec4 tex(vec2 q){vec2 t=q*.5+.5; t.y=1.-t.y; if(t.x<0.||t.x>1.||t.y<0.||t.y>1.)return vec4(0); return texture2D(uTex,t);}',
    'vec4 tex2(vec2 q){vec2 t=q*.5+.5; t.y=1.-t.y; if(t.x<0.||t.x>1.||t.y<0.||t.y>1.)return vec4(0); return texture2D(uTex2,t);}',
    'vec3 hue(vec3 c, float a){ const vec3 k=vec3(.57735); float ca=cos(a); return c*ca+cross(k,c)*sin(a)+k*dot(k,c)*(1.-ca);}',
    'float eyes(vec2 q, vec2 look, float open, float happy){ float m=0.;',
    ' for(int i=0;i<2;i++){ float s=float(i)*2.-1.; vec2 e=q-vec2(s*.23,.05)-look; e.y/=max(open,.07); e.y+=happy*.07*(1.-abs(e.x)*9.);',
    '  m=max(m, smoothstep(.105,.085,length(e*vec2(1.,.55)))); } return m;}',
    'float segd(vec2 p, vec2 a, vec2 b, out float t){ vec2 pa=p-a, ba=b-a; t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*t);}',
    'vec2 node(vec2 cell, float layer){ vec2 h=vec2(h3(vec3(cell,layer+.5)),h3(vec3(cell+7.1,layer+.5))); return cell+.2+.6*h+.07*vec2(sin(uT*.3+h.x*6.),cos(uT*.27+h.y*6.)); }',
    'vec3 synapse(vec2 q, vec3 n, float layer, float scale){',
    ' vec2 p=q*scale+n.xy*layer*.5;',
    ' p+=.55*(vec2(n3(vec3(p*.9,layer*3.+.5)),n3(vec3(p*.9+5.2,layer*3.+1.7)))-.5)+.18*(vec2(n3(vec3(p*2.3,layer+9.)),n3(vec3(p*2.3+3.1,layer+9.)))-.5); vec2 c=floor(p); float lines=0., spark=0., flash=0.;',
    ' for(int i=-1;i<=0;i++) for(int j=-1;j<=0;j++){ vec2 ci=c+vec2(float(i),float(j)); vec2 a=node(ci,layer);',
    '  for(int k=0;k<3;k++){ vec2 off=k==0?vec2(1.,0.):(k==1?vec2(0.,1.):vec2(1.,1.)); vec2 b=node(ci+off,layer);',
    '   float hh=h3(vec3(ci*3.1+off*7.3,layer+2.)); if(hh<.62) continue;',
    '   float t; float d=segd(p,a,b,t);',
    '   ',
    '   float rate=.35+.45*hh, cyc=uT*rate+hh*13.; float sp=fract(cyc);',
    '   float active=step(.64,fract(hh*7.31+floor(cyc)*.618));',
    '   float tp=sp/.8; lines+=active*smoothstep(.007,0.,d)*smoothstep(tp-1.,tp,t)*step(t,tp)*(1.-smoothstep(.72,.8,sp))*.42; float live=smoothstep(0.,.08,sp)*(1.-smoothstep(.72,.8,sp)); vec2 hp=mix(a,b,clamp(tp,0.,1.)); float hd=length(p-hp); spark+=active*live*(smoothstep(.022,0.,hd)*2.4+exp(-hd*38.)*.9)*smoothstep(0.,.08,sp)*(1.-smoothstep(.72,.8,sp));',
    '   flash+=active*exp(-length(p-b)*30.)*.45*smoothstep(.7,.8,sp)*(1.-smoothstep(.8,1.,sp))*1.8; }',
    '   }',
    ' return vec3(lines,spark,flash);}',
    'vec3 thinkLight(vec2 q, vec3 n){ vec3 s1=synapse(q,n,0.,2.), s2=synapse(q,n,1.,2.8);',
    ' return ((s1.x+s2.x*.4)*vec3(.30,.75,.70)+(s1.y+s2.y*.35)*vec3(.55,1.,.95)+(s1.z+s2.z*.3)*vec3(.85,1.,1.))*.5;}',
    'float call(float d){ float k=fract(uT*.55); float ring=smoothstep(.035,0.,abs(d-k*.42))*(1.-k)*(1.-k); return uAttn*.12*pow(max(sin(uT*3.45),0.),4.); }',
    'vec3 doneGlow(vec2 q){ float d=dot(q,q); float br=.5+.5*sin(uT*2.6); return uDone*((.05+.11*br)*exp(-d*7.)+.04*br*exp(-d*3.2))*vec3(.55,1.,.62); }',
    'float syl(){ return smoothstep(.15,.7,(.5+.5*sin(uT*4.3))*(.55+.45*sin(uT*1.9+1.3))); }',
    'float dropShape(float th, float amt){ return amt*(.5*sin(2.*th+uT*1.3)+.3*sin(3.*th-uT*1.9+1.)+.2*sin(5.*th+uT*2.6+2.)+.25*(n3(vec3(cos(th)*1.7,sin(th)*1.7,uT*.7))-.5)); }',
    'float speakLv(){ return syl()*(.55+.45*abs(sin(uT*9.3))); }',
    'float speechRings(float rr){ return uSpeak*speakLv()*max(sin(rr*16.-uT*7.),0.)*(1.-rr*.5); }',
    'vec2 wander(float fi, float tt){ return .46*vec2(sin(tt*.61+fi*2.3)+.35*sin(tt*1.37+fi*4.1), cos(tt*.53+fi*1.7)+.35*cos(tt*1.19+fi*5.3))/1.35; }',
    'vec3 workLight(vec2 q, float nA){ vec3 acc=vec3(0);',
    ' for(int i=0;i<4;i++){ float fi=float(i); if(fi>=nA) break; float tt=uT*(.9+.12*fi)+fi*7.;',
    '  float depth=.55+.45*sin(tt*.4+fi*2.);',
    '  for(int k=0;k<8;k++){ float fk=float(k); vec2 hp=wander(fi,tt-fk*.09); float fade=(1.-fk/8.); fade*=fade;',
    '   acc+=vec3(.55,1.,.92)*exp(-length(q-hp)*(21.+fk*3.5))*fade*(k==0?2.3:.9)*depth; } }',
    ' return acc; }',
    'uniform vec2 uPath[17]; uniform float uPathS[17];',
    'vec3 strokeAt(vec2 g){ float best=1e5, s=0., side=0.;',
    ' for(int i=0;i<16;i++){ if(i==14) continue; vec2 a=uPath[i], ba=uPath[i+1]-a, pa=g-a; float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); float d=length(pa-ba*t);',
    '  if(d<best){ best=d; s=mix(uPathS[i],uPathS[i+1],t); side=sign(ba.x*pa.y-ba.y*pa.x)*d; } }',
    ' return vec3(s,side,best); }',
    'float brushLight(vec2 g, float speed){ vec3 st=strokeAt(g); float head=fract(uT*speed*.6)*2.4-.15, x=head-st.x;',
    ' float glint=x>0.?exp(-x*16.):exp(x*40.);',
    ' float bristle=.5+.5*n3(vec3(st.y*95., st.x*5., 3.));',
    ' return glint*mix(.8,1.1,bristle); }',
    'float dust(vec2 q, float rr){ float acc=0.;',
    ' for(int l=0;l<2;l++){ float fl=float(l); float sc=8.+5.*fl; vec2 p=q*sc+vec2(uT*(.35+.2*fl),-uT*.22)+2.2*(vec2(n3(vec3(q*1.6,uT*.45+fl*5.)),n3(vec3(q*1.6+4.,uT*.45+fl*5.)))-.5);',
    '  vec2 c=floor(p), f=fract(p)-.5; float h=h3(vec3(c,fl+3.)); vec2 o=vec2(h3(vec3(c,fl+7.)),h3(vec3(c,fl+11.)))-.5;',
    '  float tw=.5+.5*sin(uT*(2.+3.*h)+h*20.); float dd=length(f-o*.6); acc+=step(.68,h)*(exp(-dd*dd*26.)*.28+exp(-dd*6.)*.08)*(.35+.65*tw)*(1.-fl*.3); }',
    ' return acc*(1.-rr*.4); }',
    /* thinking: fine specks drift slowly and fade in and out softly, never popping */
    'float thinkDust(vec2 q, float rr){ float acc=0.;',
    ' for(int l=0;l<2;l++){ float fl=float(l); float sc=11.+6.*fl; vec2 p=q*sc+vec2(uT*.08*(1.+fl),uT*.05)+1.4*(vec2(n3(vec3(q*1.3,uT*.12+fl*4.)),n3(vec3(q*1.3+6.,uT*.12+fl*4.)))-.5);',
    '  vec2 c=floor(p), f=fract(p)-.5; float h=h3(vec3(c,fl+21.)); vec2 o=vec2(h3(vec3(c,fl+23.)),h3(vec3(c,fl+29.)))-.5; float dd=length(f-o*.6);',
    '  float tw=.5+.5*sin(uT*(.6+.9*h)+h*31.); tw*=tw; acc+=step(.3,h)*(smoothstep(.06,0.,dd)+exp(-dd*22.)*.25)*tw*(1.-fl*.35); }',
    ' return acc*(1.-rr*.5); }',
    /* coverage of the symbol at one point: the waw and its fatha, or the shape it is turning into */
    'float covAt(vec2 gb, vec2 gf, float th, float s, float m){ vec4 tb=tex(gb), tf=tex(gf);',
    ' float c=max(smoothstep(th-s,th+s,tb.g), smoothstep(th-s,th+s,tf.a));',
    ' if(uSwap>.5){ vec4 t2=tex2(gb); float fw=max(tb.g,tf.a); float fA=mix(t2.g,fw,uFromWaw), fB=mix(t2.a,fw,uToWaw);',
    '  c=smoothstep(th-s,th+s,mix(fA,fB,m)-.06*sin(3.14159*uMorph)); }',
    ' return c; }',
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy*2.-uR)/min(uR.x,uR.y);',
    ' float wave=uListen*uLevel*pWave;',
    ' float r=length(p); vec4 o=vec4(0);',
    /* the orb keeps its size; its outline moves like a drop of water only while it hears or speaks */
    ' float amt=pDrop*(.045*wave+.032*uSpeak*syl())*(1.-uOff);',
    ' float R=.62*(1.+.008*sin(uT*1.25)*(1.-.5*uOff))*(1.+dropShape(atan(p.y,p.x),amt));',
    /* a double-tap squashes the glass like jelly and lifts its top, as if something is leaving it */
    ' float jA=atan(p.y,p.x); R*=1.+uJelly*.075*cos(2.*jA)+uBulge*.09*pow(max(sin(jA),0.),3.)-uBulge*.025;',
    /* halo, with rings that travel outward while it listens */
 ' vec3 haloC=mix(mix(mix(vec3(.25,.78,.72), vec3(.42,.52,1.), clamp(uThink+uWork,0.,1.)), vec3(1.,.72,.34), uAttn*pWarm), vec3(.42,.9,.54), uDone);',
    ' float rings=uListen*pWave*(.5+.5*sin((r-R)*pWaveFreq*1.2+uT*pWaveSpeed*6.))*exp(-max(r-R,0.)*3.5)*(.25+uLevel);',
    ' float halo=exp(-max(r-R,0.)*11.)*(.04+.05*sin(uT*1.25)*.5+(.24*uAttn*pWarm*(.5+.5*sin(uT*3.45))+.1*wave*pWaveGlow+.27*uDone+.2*clamp(uThink+uWork,0.,1.))*smoothstep(.3,.95,.5+.5*cos(atan(p.y,p.x)-uT*.5))+.03*uDone)*(1.-.55*uOff);',
    ' float sw=.5+.5*sin((r-R)*13.-uT*6.); float srings=0.;',
    ' vec3 speakC=mix(vec3(.25,.6,.55),vec3(.95,.86,.62),pSpeechTone);',
    ' float cl=call(max(r-R,0.))*pWarm*exp(-max(r-R,0.)*2.5);',
    ' o=vec4(haloC*halo+speakC*srings+vec3(1.,.74,.36)*cl, halo+srings+cl);',
    /* light looks (pLight 1 milk glass, 2 clear glass, 3 deep teal): the orb rests on the page with a soft shadow under it */
    ' float lt=step(.5,pLight); float sh=lt*.2*exp(-max(length(p-vec2(0.,-.04*R))-R*.97,0.)*12.)*step(R*.9,r);',
    ' o.rgb=(o.rgb*o.a+vec3(.03,.1,.1)*sh)/max(o.a+sh,1e-3); o.a=min(1.,o.a+sh);',
    ' float wob=fbm(vec3(p*2.,uT*.25))*(.02+pWobble*(.04+.35*wave));',
    ' float edgeR=R*(1.-wob*pBody);',
    ' if(r<R*1.02){',
    '  vec2 q=p/R; float rr=length(q); float z=sqrt(max(0.,1.-min(dot(q,q),1.))); vec3 n=vec3(q,z);',
    '  float mask=mix(smoothstep(1.,1.-2./min(uR.x,uR.y)*2./R,rr), 1.-smoothstep(.84-wob*4.,1.,rr), pBody);',
    /* ink */
    /* drag turns the glass: the ink is read on the sphere turned by the drag, so it rotates as one body, however far it turns */
    '  vec3 nr=n; float cy=cos(uSpin.x), sy=sin(uSpin.x); nr=vec3(cy*nr.x+sy*nr.z, nr.y, -sy*nr.x+cy*nr.z);',
    '  float cx=cos(uSpin.y), sx=sin(uSpin.y); nr=vec3(nr.x, cx*nr.y-sx*nr.z, sx*nr.y+cx*nr.z); float dz=nr.z-n.z;',
    '  float t=uFlow; vec3 dp=vec3((nr.xy*1.5+n.xy*.15)*pGrain, t+dz*1.5); dp.xy=rot(t*.6)*dp.xy;',
    '  vec3 w=vec3(fbm(dp),fbm(dp+4.3),0.);',
    '  float a=fbm(dp+w*2.*pTurb), b=fbm(vec3((nr.xy*2.4-n.xy*.25)*pGrain, t*1.3+5.+dz*2.4)+w*pTurb);',
    /* listening ripple inside the ink: stronger, denser and faster with the controls */
    '  float lwv=sin(rr*pWaveFreq+uT*pWaveSpeed*8.); a+=wave*.3*lwv*(1.-rr*.6);',
    '  a+=uSpeak*pSpeech*speakLv()*.45*sin(rr*pWaveFreq*.8-uT*pWaveSpeed*7.)*(1.-rr*.6);',
    '  float d=(smoothstep(.42,.8,a)*.62+smoothstep(.5,.85,b)*.28)*pInk;',
    '  d+=.35*exp(-length(q)*1.6)*pBody;',
    /* the symbol */
    /* the symbol lives in the ink: the same ripples bend it, the current carries it a little */
    '  vec2 dir=q/max(rr,.001); float rip=wave*.5*lwv+uSpeak*pSpeech*speakLv()*.45*sin(rr*pWaveFreq*.8-uT*pWaveSpeed*7.);',
    '  vec2 g=q/pSize+n.xy*pDepth*.12+dir*rip*.04+(w.xy-.5)*.035;',
    '  vec2 disp=(vec2(fbm(vec3(q*3.,uFlow*2.)),fbm(vec3(q*3.+7.,uFlow*2.)))-.5)*pScatter*uThink*.7;',
    '  vec2 gb=g+disp;',
    /* fatha: lifts to listen, tilts while thinking, bounces when it needs you, sways while speaking */
    '  float lift=pFatha*(.07*uListen+.05*wave+.10*uAttn*max(sin(uT*3.2),0.)+.02*sin(uT*1.1));',
    '  float tilt=pFatha*(-.18*uListen+.08*uSpeak*sin(uT*5.)+.3*uOff);',
    '  vec2 gf=gb-uFathaC; gf=rot(tilt)*gf; gf.y-=lift; gf+=uFathaC;',
    '  vec4 tb=tex(gb), tf=tex(gf);',
    /* stroke thickness: breath, voice, speech */
    '  float th=.5 - pBreath*.07*sin(uT*1.2) - pVoice*uListen*uLevel*.16 - .04*uSpeak*sin(uT*7.)*pBreath;',
    '  float bleed=(fbm(vec3(q*7.,uFlow*3.))-.5)*pBleed*.25*.45;',
    '  float soft=.035+.02*pBleed;',
    '  float body=smoothstep(th+bleed-soft, th+bleed+soft, tb.g)*(1.-uOff*.4);',
    '  float fa=smoothstep(th+bleed-soft, th+bleed+soft, tf.a);',
    /* writing: along the stroke from the head of the waw to its tail, then the fatha */
    '  float path=strokeAt(gb).x; float pathF=strokeAt(gf).x;',
    '  float loop=fract(uT*.12*pWriteSpeed)*1.6-.1;',
    '  float prog=pWrite<.5?2.:(pWrite<1.5?loop:mix(2.,loop,uSpeak));',
    '  float shownB=smoothstep(prog+.03,prog-.03,path), shownF=smoothstep(prog+.03,prog-.03,pathF);',
    '  float tip=(smoothstep(.05,0.,abs(path-prog))*tb.g+smoothstep(.05,0.,abs(pathF-prog))*tf.a)*step(.5,pWrite);',
    '  body*=mix(.45,1.,shownB); fa*=mix(.45,1.,shownF);',
    /* symbol change: the ink lets go of one shape and gathers into the next, unevenly, like ink in water */
    '  float nz=fbm(vec3(q*3.,uT*.35)); float m=clamp(uMorph*1.8-.4+(nz-.5),0.,1.); m=m*m*(3.-2.*m);',
    '  if(uSwap>.5){ body=covAt(gb,gf,th+bleed,soft,m)*(1.-uOff*.4); fa=0.; tip=0.; }',
    /* a real blur, uneven: twelve samples on a spiral whose radius drifts across the symbol, wide in some places, almost none in others */
    '  float rb=mix(.0,.05,smoothstep(.5,.82,fbm(vec3(q*2.2+9.,uT*.12))));',
    '  float jit=h3(vec3(gl_FragCoord.xy,1.))*6.2832; float acc=0.; for(int i=0;i<16;i++){ float fi=float(i), an=fi*2.39996+jit; vec2 o=vec2(cos(an),sin(an))*rb*sqrt((fi+.5)/16.); acc+=covAt(gb+o,gf+o,th+bleed,soft+rb*.35,m); }',
    '  float sym=acc/16.*(1.-uOff*.4)*mix(.45,1.,max(shownB,shownF));',
    /* ink drifting in front veils the symbol in places, so it sits inside the glass, not on it */
    '  sym*=1.-.38*smoothstep(.45,.85,b)*pInk;',
    /* eyes in place of the symbol while it addresses you */
    '  float face=clamp(uListen+uAttn+uSpeak*.85+uDone,0.,1.)*(1.-uOff)*pEyes;',
    '  float toEyes=smoothstep(face-.15,face+.15,fbm(vec3(q*3.,uT*.2)));',
    '  float e=eyes(q,uLook*.12,clamp(1.-uBlink,0.,1.)*(1.+.25*uListen)*(1.-.6*uDone),uDone)*(1.-toEyes);',
    '  sym*=mix(1.,toEyes,pEyes);',
    /* color */
    '  float gy=smoothstep(-.2,1.,.55*n.z+.45*q.y+.15); vec3 deep=mix(vec3(.004,.018,.022), vec3(.03,.115,.12), gy), teal=hue(vec3(.15,.70,.64),pHue);',
    /* milk and clear glass: pale mint glass with the ink in deep teal; deep teal: the dark glass lifted to a mid teal */
    '  float lMilk=step(.5,pLight)*step(pLight,2.5), lTeal=step(2.5,pLight), lClear=step(1.5,pLight)*step(pLight,2.5);',
    '  deep=mix(deep, mix(vec3(.78,.89,.88), vec3(.95,.98,.97), gy), lMilk); teal=mix(teal, vec3(.04,.36,.35), lMilk);',
    '  deep=mix(deep, mix(vec3(.04,.2,.21), vec3(.12,.37,.37), gy), lTeal); teal=mix(teal, vec3(.42,.86,.8), lTeal);',
    /* colour lives in the ink: some streaks of the turbulence turn gold when it needs him, coral while it records */
    /* irregular: patches of colour come and go in place and in time, never a steady wash */
    '  float flick=smoothstep(.42,.72,fbm(vec3(q*1.3+3.,uT*.33)))*(.35+.65*smoothstep(.25,.75,n3(vec3(uT*.31,1.7,0.))));',
    '  float streak=smoothstep(.42,.72,b)*flick;',
    '  vec3 inkC=mix(teal, vec3(1.,.74,.3), clamp(uAttn*pWarm*streak*1.35,0.,1.)); d+=uAttn*pWarm*streak*.22;',
    '  inkC=mix(inkC, vec3(1.,.34,.3), clamp(uListen*pRec*streak*1.35,0.,1.)); d+=uListen*pRec*streak*.2;',
    /* done: the same streaks turn a fresh green */
    '  float busy=clamp(uThink+uWork,0.,1.); inkC=mix(inkC, vec3(.4,.5,1.), clamp(busy*(.42+streak*1.5),0.,1.)); d+=busy*streak*.2;',
    '  inkC=mix(inkC, vec3(.4,.88,.5), clamp(uDone*pDoneGlow*(.42+streak*1.35),0.,1.)); d+=uDone*pDoneGlow*streak*.2;',
    '  vec3 c=mix(deep,inkC,clamp(d,0.,1.)); c=mix(c,mix(hue(vec3(.6,.97,.9),pHue),vec3(1.,.86,.6),uAttn*pWarm*streak),smoothstep(.9,1.25,d)*.45);',
    /* the symbol stays white in every state; only needs-you warms it */
    '  vec3 symC=mix(vec3(.97,1.,.99), vec3(.02,.15,.16), lMilk);',
    '  symC=mix(symC, mix(vec3(1.,.82,.52), vec3(.42,.25,.04), lMilk)*(.95+.1*sin(uT*3.45)), clamp(uAttn*pWarm*.45,0.,1.));',
    /* white, but not cut out: a soft edge and a faint bloom from the blurred field, as ink lit from inside */
    '  float bloom=smoothstep(.12,.55,max(tb.g,tf.a))*(1.-uSwap)+smoothstep(.12,.55,body)*uSwap;',
    '  vec3 sc=mix(symC, vec3(.30,.80,.74), .12*(1.-lMilk))*(1.+rip*.35*(1.-lMilk)); c=mix(c, sc, sym*mix(.8,.92,lMilk)); c+=sc*bloom*.09*(1.-lMilk); c=mix(c, c*vec3(.8,.9,.9), bloom*.25*lMilk);',
    '  c+=sym*pGlow*.1*hue(vec3(.4,.9,.8),pHue)*(1.+uDone)*(1.-lMilk);',
    '  c+=tip*hue(vec3(.75,1.,.94),pHue)*1.4;',
    /* thinking: impulses run through a network of fine threads; a spark reaching the letter lights it */
    '  vec3 tl=uThink*pSynapse*thinkLight(q,n); c+=tl; c+=sym*uThink*pSynapse*dot(tl,vec3(.3))*.35; c+=uThink*pThinkDust*thinkDust(q,rr)*hue(vec3(.6,1.,.95),pHue)*.55;',
    /* speaking: light ripples out from the symbol, the orb itself keeps its size */
    '  c+=speechRings(rr)*speakC*pSpeech*.35;',
    /* working: each running agent is a light travelling its own orbit inside the glass */
    '  c+=uWork*pWork*(workLight(q,pAgents)+dust(q,rr)*hue(vec3(.55,1.,.92),pHue)*1.1*pDust);',
    /* done: light fills the glass from the centre and the letter brightens */
    '  c+=doneGlow(q)*pDoneGlow; float br=.5+.5*sin(uT*2.6); c+=sym*uDone*pDoneGlow*(.18+.22*br)*vec3(.72,1.,.78); c*=1.+uDone*pDoneGlow*.14*(br-.5);',
    /* a touch answers with a brief, faint light from the centre */
    '  c+=uPulse*(.12*exp(-rr*rr*3.)+.03)*vec3(.7,1.,.95);',
    '  c=mix(c, vec3(.88,1.,.97), e*.95);',
    /* brush light: a glint runs along the stroke the way the pen moved, with fine bristle lines */
    '  c+=brushLight(gb,(.11+.22*uSpeak)*pWriteSpeed)*sym*(pSheen+.3*uSpeak)*.4*hue(vec3(.8,1.,.95),pHue);',
    /* glass */
    '  vec3 L=normalize(vec3(-.45,.62,.65));',
    '  c*=.82+.18*n.z;',
    /* the rim darkens and deepens like thicker glass (a multiply), with only a hairline of light to hold the outline */
    '  float rim=pow(1.-n.z,2.); c*=mix(vec3(1.), vec3(.62,.82,.84), rim*.5*(1.-pBody*.5)); c*=mix(vec3(1.), vec3(.55,.72,.72), pow(1.-n.z,5.)*.8*lMilk);',
    '  c+=pow(1.-n.z,6.)*vec3(.30,.52,.52)*.35*(1.-uAttn*pWarm)*(1.-pBody*.5);',
    /* light at the edge, as on real glass: a fine bright rim on the lit side, a faint bounce opposite */
    '  float fres=pow(1.-n.z,3.2); float lit=max(dot(normalize(n.xy+1e-4),normalize(vec2(-.62,.78))),0.), bounce=max(dot(normalize(n.xy+1e-4),normalize(vec2(.55,-.83))),0.);',
    '  c+=fres*(.1+.5*pow(lit,1.6))*vec3(.78,.96,.96)*(1.-pBody*.5)+pow(1.-n.z,5.)*pow(bounce,2.)*.22*vec3(.45,.85,.8);',
    /* needs you: warmth spreads well into the glass from the rim, so it still reads at 20 points, not as a thin line */
    /* colour never fills the whole rim: it lights one part of it, and that part drifts slowly round */
    '  vec3 cPre=c;',
    '  float patch=(.1+.9*smoothstep(.15,.9,.5+.5*cos(atan(q.y,q.x)-uT*.5)))*(.7+.3*fbm(vec3(q*2.,uT*.2)));',
    /* and a little of the colour reaches inside the glass */
    '  float warmIn=uAttn*pWarm*(.65+.35*sin(uT*3.45)); c=mix(c, c*vec3(1.15,1.,.86), warmIn*.25*(.25+.75*patch));',
    /* needs you: a wide band of gold that shades to amber along its length, bright at the rim and bleeding into the ink */
    '  float warmP=uAttn*pWarm*(.6+.4*smoothstep(.2,.8,n3(vec3(uT*.42,4.1,0.))))*patch*1.65; float ang=atan(q.y,q.x);',
    '  vec3 gold=mix(vec3(1.,.78,.42), vec3(1.,.52,.26), .5+.5*sin(ang*2.+uT*.7));',
    '  c*=mix(vec3(1.), vec3(1.28,.98,.74), pow(1.-n.z,1.1)*warmP);',
    '  c+=warmP*gold*(pow(1.-n.z,2.)*.9+pow(1.-n.z,5.)*.7);',
    /* done: the same drifting accent, in green */
    /* thinking and working: a deeper indigo accent on part of the rim, quieter than done */
    '  float busyP=clamp(uThink+uWork,0.,1.)*(.55+.45*smoothstep(.2,.8,n3(vec3(uT*.6,9.7,0.))))*patch*2.2; c*=mix(vec3(1.), vec3(.8,.9,1.4), pow(1.-n.z,1.1)*busyP); c+=busyP*vec3(.42,.52,1.)*(pow(1.-n.z,2.)*.9+pow(1.-n.z,5.)*.7);',
    '  float doneP=uDone*pDoneGlow*(.6+.4*smoothstep(.2,.8,n3(vec3(uT*.42,7.3,0.))))*patch*1.85; c*=mix(vec3(1.), vec3(.86,1.25,.88), pow(1.-n.z,1.1)*doneP); c+=doneP*vec3(.4,.9,.5)*(pow(1.-n.z,2.)*.9+pow(1.-n.z,5.)*.7);',
    '  c+=(smoothstep(.24,0.,length(q-vec2(-.36,.44)))*.28+pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.),110.)*.9)*pGlass*(1.-pBody);',
    /* listening is recording: the rim warms to red with the voice, and the incoming ripples carry a little of it */
    '  c+=pow(1.-n.z,1.7)*mix(vec3(1.,.3,.26), vec3(1.,.42,.55), .5+.5*sin(atan(q.y,q.x)*2.-uT*.8))*uListen*pRec*(.95+.85*uLevel)*(1.-pBody*.5)*patch; c=mix(c, c*vec3(1.2,.86,.84)+vec3(.03,0.,0.), uListen*pRec*.3*(.4+.6*patch)); c+=max(lwv,0.)*wave*pRec*vec3(.95,.24,.22)*.06*(1.-rr*.6);',
    /* on pale glass, light added for a state would only wash it out: it becomes a tint of the same hue instead */
    '  vec3 addL=max(c-cPre,0.); float mA=max(max(addL.r,addL.g),addL.b); c=mix(c, cPre*mix(vec3(1.), addL/max(mA,1e-3)*.92, clamp(mA*1.25,0.,.72)), lMilk);',
    '  c=mix(c, vec3(pow(dot(c,vec3(.299,.587,.114)),.9))*(.78+.1*sin(uT*.8)), uOff);',
    '  float ga=mix(1., clamp(.18+d*1.5+sym+pow(1.-n.z,3.)*.9, 0., 1.), lClear); o.rgb=mix(o.rgb,c,mask*ga); o.a=max(o.a,mask*ga);',
    ' }',
    /* sparks thrown off by a tap or a drag: small soft lights that fly out past the rim and fade */
    ' float pg=0.; for(int i=0;i<14;i++){ vec4 pa=uParts[i]; if(pa.z<=0.) continue; vec2 dd=p-pa.xy; pg+=pa.z*pa.z*exp(-dot(dd,dd)/(pa.w*pa.w)); }',
    ' pg=min(pg*.75,1.); vec3 pc=mix(vec3(.62,1.,.94), vec3(1.,.78,.46), uAttn*pWarm);',
    ' o.rgb=(o.rgb*o.a+pc*pg)/max(o.a+pg,1e-3); o.a=min(1.,o.a+pg);',
    ' gl_FragColor=vec4(o.rgb*o.a,o.a);',
    '}'
  ].join('\n');

  /* the waw's centreline in glyph space, in the order a pen writes it: round the head counter-clockwise,
     down the tail, then the fatha. Light and writing travel along it. */
  var WAW_PATH = [[.20, .10], [.18, .25], [.08, .31], [-.04, .27], [-.08, .16], [-.04, .06], [.08, .03], [.20, .06], [.27, 0], [.27, -.13],
    [.20, -.26], [.06, -.35], [-.12, -.41], [-.25, -.48], [-.33, -.57], [.17, .56], [-.03, .43]];
  var WAW_S = (function () { var s = [0], L = 0, i; for (i = 1; i < 15; i++) { L += Math.hypot(WAW_PATH[i][0] - WAW_PATH[i - 1][0], WAW_PATH[i][1] - WAW_PATH[i - 1][1]); s.push(L); }
    s = s.map(function (v) { return v / L; }); s.push(1.05, 1.2); return s; })();
  var WAW_FLAT = [].concat.apply([], WAW_PATH);

  /* tweaks saved in this browser; the key moves when the defaults are re-set, so every page opens on the shared defaults */
  var SAVE_KEY = 'symbol-studio-2';
  var STATES = {
    idle:      [0, 0, 0, 0, 0, 0], listening: [1, 0, 0, 0, 0, 0], thinking: [0, 1, 0, 0, 0, 0], speaking: [0, 0, 1, 0, 0, 0],
    working:   [0, 0, 0, 0, 0, 0, 1],
    needsyou:  [0, 0, 0, 1, 0, 0], done: [0, 0, 0, 0, 1, 0], offline: [0, 0, 0, 0, 0, 1]
  };
  var SKEYS = ['uListen', 'uThink', 'uSpeak', 'uAttn', 'uDone', 'uOff', 'uWork'];
  Object.keys(STATES).forEach(function (k) { while (STATES[k].length < SKEYS.length) STATES[k].push(0); });

  /* every control: id, label, group, min, max, step, default */
  var PARAMS = [
    ['pSpeed', 'Speed', 'Motion', .25, 2, .05, 1],
    ['pFlowThink', 'Thinking flow', 'Motion', 1, 6, .1, 2.5],
    ['pSynapse', 'Thinking impulses', 'Thinking', 0, 2, .05, 1],
    ['pThinkDust', 'Thinking particles', 'Thinking', 0, 3, .05, 1],
    ['pSpeech', 'Speaking waves', 'Speaking', 0, 2, .05, 1],
    ['pSpeechTone', 'Speaking color (teal to pearl)', 'Speaking', 0, 1, .02, .65],
    ['pWork', 'Agent light', 'Working', 0, 2, .05, 1],
    ['pAgents', 'Agents running', 'Working', 1, 4, 1, 3],
    ['pFlowWork', 'Ink turbulence speed', 'Working', 1, 10, .1, 5],
    ['pDust', 'Fine particles', 'Working', 0, 2, .05, 1],
    ['pDoneGlow', 'Done inner glow', 'Done', 0, 2, .05, 1],
    ['pDrop', 'Droplet shape', 'Body', 0, 3, .05, 1],
    ['pWave', 'Listening wave strength', 'Listening', 0, 3, .05, 1],
    ['pWaveFreq', 'Wave rings', 'Listening', 6, 40, 1, 20],
    ['pWaveSpeed', 'Wave speed', 'Listening', .2, 3, .05, 1],
    ['pWaveGlow', 'Wave glow', 'Listening', 0, 3, .05, 1],
    ['pWobble', 'Edge wobble', 'Listening', 0, 1, .02, .3],
    ['pRec', 'Recording red', 'Listening', 0, 2, .05, 1],
    ['pLevel', 'Voice level (auto when 0)', 'Listening', 0, 1, .02, 0],
    ['pSize', 'Symbol size', 'Symbol', .7, 1.35, .01, 1],
    ['pDepth', 'Symbol depth', 'Symbol', 0, 1, .02, .3],
    ['pBreath', 'Stroke breath', 'Symbol', 0, 1.5, .02, .4],
    ['pVoice', 'Stroke follows voice', 'Symbol', 0, 1.5, .02, .6],
    ['pFatha', 'Fatha expression', 'Symbol', 0, 2, .02, 0],
    ['pBleed', 'Ink bleed', 'Symbol', 0, 1.5, .02, .6],
    ['pScatter', 'Scatter while thinking', 'Symbol', 0, 1.5, .02, 0],
    ['pWrite', 'Writing (0 off, 1 always, 2 while speaking)', 'Symbol', 0, 2, 1, 0],
    ['pWriteSpeed', 'Writing speed', 'Symbol', .3, 3, .05, 1],
    ['pSheen', 'Brush light along the stroke', 'Symbol', 0, 1.5, .02, .4],
    ['pEyes', 'Eyes when addressing you', 'Character', 0, 1, 1, 0],
    ['pBody', 'Body (0 glass sphere, 1 ink drop)', 'Body', 0, 1, .05, 0],
    ['pGlass', 'Glass highlights', 'Body', 0, 1.5, .02, 1],
    ['pInk', 'Ink density', 'Body', 0, 1.6, .02, 1],
    ['pTurb', 'Turbulence (how hard the ink folds)', 'Body', 0, 3, .02, .6],
    ['pGrain', 'Turbulence grain (broad to fine)', 'Body', .5, 2.5, .02, .9],
    ['pChurn', 'Turbulence churn (flow speed)', 'Body', 0, 3, .02, .7],
    ['pLight', 'Light look (0 dark glass, 1 milk glass, 2 clear glass, 3 deep teal)', 'Body', 0, 3, 1, 0],
    ['pGlow', 'Symbol light', 'Body', 0, 1, .02, .7],
    ['pHue', 'Hue shift', 'Body', -.6, .6, .01, 0],
    ['pWarm', 'Needs-you warmth', 'Body', 0, 1.5, .02, 1]
  ];
  var PRESETS = {
    'Calm':        { pSpeed: .8, pWave: .7, pBreath: .25, pFatha: .5, pBleed: .3, pWrite: 0, pSheen: .25, pEyes: 0, pBody: 0, pGlow: .65 },
    'Expressive':  { pSpeed: 1.1, pWave: 2.2, pWaveFreq: 26, pWaveGlow: 2, pWobble: .6, pBreath: .8, pVoice: 1.2, pFatha: 1.6, pBleed: 1, pWrite: 0, pSheen: .7, pEyes: 0 },
    'Harf':        { pFatha: 1.3, pBreath: .5, pVoice: .9, pBleed: .2, pWrite: 0, pSheen: .5, pEyes: 0, pGlow: .9 },
    'Qalam':       { pWrite: 1, pWriteSpeed: 1, pBleed: .4, pFatha: .6, pEyes: 0 },
    'Rafeeq quiet':{ pEyes: 1, pFatha: .6, pBleed: .5, pWrite: 0, pBody: 0 },
    'Ink drop':    { pEyes: 1, pBody: 1, pWobble: .5, pGlass: .3, pFatha: .4, pWrite: 0 }
  };

  /* what the symbol can turn into: numbers in Lora, icons as strokes on a 24-unit grid */
  /* what the symbol can turn into: numbers in Lora; icons are Phosphor at regular weight, the web app's own set */
  var CONTENTS = {
    waw: null, '3': { text: '3' }, '12': { text: '12' }, '13': { text: '13' },
    check: { fill: 'M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z' },
    mail: { fill: 'M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z' },
    calendar: { fill: 'M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z' },
    doc: { fill: 'M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z' },
    clock: { fill: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z' },
    bell: { fill: 'M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z' },
    mic: { fill: 'M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z' }
  };
  var SCENARIOS = [
    ['Symbol to number', ['waw', '3']], ['Number to symbol', ['3', 'waw']], ['Number to icon', ['3', 'check']],
    ['Icon to symbol', ['check', 'waw']], ['Count up', ['12', '13']], ['Symbol to icon', ['waw', 'mail']],
    ['Number to icon (bell)', ['3', 'bell']], ['Tour', ['waw', '3', 'check', 'waw', 'calendar', '12', '13', 'waw'], true]
  ];
  var fieldCache = {};
  function contentField(key) {
    if (fieldCache[key]) return fieldCache[key];
    var N = 512, spec = CONTENTS[key], c = document.createElement('canvas'); c.width = c.height = N;
    var g = c.getContext('2d'); g.filter = 'blur(4px)'; g.fillStyle = g.strokeStyle = '#000';
    if (spec.text) {
      /* centre the figure by its drawn outline, not its em box, so it sits in the middle of the orb */
      g.font = '400 ' + (spec.text.length > 1 ? 196 : 228) + 'px Lora, Georgia, serif'; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
      var mt = g.measureText(spec.text), bw = mt.actualBoundingBoxLeft + mt.actualBoundingBoxRight, bh = mt.actualBoundingBoxAscent + mt.actualBoundingBoxDescent;
      g.fillText(spec.text, N / 2 - bw / 2 + mt.actualBoundingBoxLeft, N / 2 + bh / 2 - mt.actualBoundingBoxDescent);
    } else {
      if (spec.fill) { var sf = 214 / 256, of = (N - 214) / 2; g.translate(of, of); g.scale(sf, sf); g.fill(new Path2D(spec.fill)); }
      else { var sc = 206 / 24, o = (N - 206) / 2; g.translate(o, o); g.scale(sc, sc); g.lineWidth = 1.7; g.lineCap = g.lineJoin = 'round'; g.stroke(new Path2D(spec.path)); }
    }
    var d = g.getImageData(0, 0, N, N).data, f = new Uint8Array(N * N);
    for (var i = 0; i < N * N; i++) f[i] = Math.min(255, d[i * 4 + 3] * 1.05);
    return (fieldCache[key] = f);
  }

  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }

  function buildTexture(srcs, cb) {
    var N = 512, out = document.createElement('canvas'); out.width = out.height = N;
    var parts = [], done = 0, box = null;
    srcs.forEach(function (src, i) {
      var img = new Image();
      img.onload = function () {
        var hgt = 300, w = hgt * .557, x = (N - w) / 2, y = (N - hgt) / 2;
        var sharp = document.createElement('canvas'); sharp.width = sharp.height = N; sharp.getContext('2d').drawImage(img, x, y, w, hgt);
        var blur = document.createElement('canvas'); blur.width = blur.height = N; var bg = blur.getContext('2d'); bg.filter = 'blur(7px)'; bg.drawImage(img, x, y, w, hgt);
        parts[i] = { sharp: sharp.getContext('2d').getImageData(0, 0, N, N).data, blur: bg.getImageData(0, 0, N, N).data };
        if (++done === srcs.length) pack();
      };
      img.src = src;
    });
    function pack() {
      var g = out.getContext('2d'), id = g.createImageData(N, N), D = id.data, b = parts[1], f = parts[0], sx = 0, sy = 0, cnt = 0;
      for (var i = 0; i < N * N; i++) {
        /* blurred field normalised so the stroke's edge sits near .5 */
        D[i * 4] = b.sharp[i * 4 + 3]; D[i * 4 + 1] = Math.min(255, b.blur[i * 4 + 3] * 1.9);
        D[i * 4 + 2] = f.sharp[i * 4 + 3]; D[i * 4 + 3] = Math.min(255, f.blur[i * 4 + 3] * 1.9);
        if (f.sharp[i * 4 + 3] > 128) { sx += i % N; sy += (i / N) | 0; cnt++; }
      }
      g.putImageData(id, 0, 0);
      /* the fatha's centre, in the orb's q space */
      box = cnt ? [(sx / cnt) / N * 2 - 1, -((sy / cnt) / N * 2 - 1)] : [0, .5];
      cb(out, id, box);
    }
  }

  function mount(root, src, opts) {
    opts = opts || {};
    var stage = el('div', { class: 'ss-stage' }), canvas = el('canvas', { class: 'ss-orb' });
    var sizes = el('div', { class: 'ss-sizes' });
    /* previews at the sizes the app draws the orb: a large Ask hero, the tab bar orb, the record button, inline */
    var minis = opts.bare ? [] : [[120, '120'], [88, '88'], [58, '58 tab bar'], [44, '44 record'], [20, '20 inline']].map(function (sz) { var px = sz[0]; var c = el('canvas', { width: px * 3, height: px * 3, style: 'width:' + px + 'px;height:' + px + 'px' }); var f = el('figure'); f.appendChild(c); f.appendChild(el('figcaption', {}, sz[1])); sizes.appendChild(f); return c; });
    /* halve step by step so a small orb keeps a clean round edge instead of a jagged one */
    var steps = [document.createElement('canvas'), document.createElement('canvas')];
    function downscale(dst) {
      var src = canvas, w = canvas.width, i = 0;
      while (w / 2 >= dst.width) { var t = steps[i % 2], nw = Math.round(w / 2); if (t.width !== nw) { t.width = t.height = nw; }
        var tg = t.getContext('2d'); tg.clearRect(0, 0, nw, nw); tg.imageSmoothingQuality = 'high'; tg.drawImage(src, 0, 0, nw, nw); src = t; w = nw; i++; }
      var g = dst.getContext('2d'); g.clearRect(0, 0, dst.width, dst.height); g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, w, w, 0, 0, dst.width, dst.height);
    }
    stage.appendChild(canvas); stage.appendChild(sizes);
    var panel = el('div', { class: 'ss-panel' });
    /* bare: just the orb, filling the given element, driven through the returned controls (the app prototype's tab orb) */
    if (opts.bare) { canvas.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;cursor:grab'; root.appendChild(canvas); }
    else { root.appendChild(stage); root.appendChild(panel); }

    var stateRow = el('div', { class: 'ss-row', role: 'group', 'aria-label': 'State' }, '<span class="ss-k">State</span>');
    Object.keys(STATES).forEach(function (s) { stateRow.appendChild(el('button', { type: 'button', 'data-s': s, 'aria-pressed': s === (opts.compact ? 'idle' : 'listening') }, s === 'needsyou' ? 'needs you' : s)); });
    stateRow.appendChild(el('button', { type: 'button', 'data-cycle': '1', 'aria-pressed': 'false' }, 'cycle'));
    var presetRow = el('div', { class: 'ss-row', role: 'group', 'aria-label': 'Presets' }, '<span class="ss-k">Presets</span>');
    Object.keys(PRESETS).forEach(function (p) { presetRow.appendChild(el('button', { type: 'button', 'data-p': p }, p)); });
    presetRow.appendChild(el('button', { type: 'button', 'data-reset': '1' }, 'reset'));
    presetRow.appendChild(el('button', { type: 'button', 'data-copy': '1' }, 'copy settings'));
    var swapRow = el('div', { class: 'ss-row', role: 'group', 'aria-label': 'Symbol change' }, '<span class="ss-k">Symbol change</span>');
    SCENARIOS.forEach(function (sc, i) { swapRow.appendChild(el('button', { type: 'button', 'data-sw': i, 'aria-pressed': 'false' }, sc[0])); });
    swapRow.appendChild(el('button', { type: 'button', 'data-sw': 'off', 'aria-pressed': 'true' }, 'off'));
    panel.appendChild(stateRow); if (!opts.compact) panel.appendChild(presetRow); panel.appendChild(swapRow);

    var vals = {}, inputs = {};
    PARAMS.forEach(function (p) { vals[p[0]] = p[6]; });
    if (opts.params) for (var pk in opts.params) if (pk in vals) vals[pk] = opts.params[pk];
    if (!opts.compact && !opts.bare) try { var saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (saved) for (var k in saved) if (k in vals) vals[k] = saved[k]; } catch (e) {}
    var groups = {};
    if (!opts.compact) PARAMS.forEach(function (p) {
      if (!groups[p[2]]) { groups[p[2]] = el('fieldset', { class: 'ss-group' }, '<legend>' + p[2] + '</legend>'); panel.appendChild(groups[p[2]]); }
      var row = el('label', { class: 'ss-ctl' }), out = el('output', {});
      var inp = el('input', { type: 'range', min: p[3], max: p[4], step: p[5], value: vals[p[0]] });
      row.appendChild(el('span', {}, p[1])); row.appendChild(inp); row.appendChild(out);
      groups[p[2]].appendChild(row); inputs[p[0]] = { inp: inp, out: out };
      out.textContent = (+vals[p[0]]).toFixed(p[5] >= 1 ? 0 : 2);
      inp.addEventListener('input', function () { vals[p[0]] = +inp.value; out.textContent = (+inp.value).toFixed(p[5] >= 1 ? 0 : 2); save(); });
    });
    function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(vals)); } catch (e) {} }
    function setVals(v) { for (var k in v) if (inputs[k]) { vals[k] = v[k]; inputs[k].inp.value = v[k]; inputs[k].out.textContent = (+v[k]).toFixed(inputs[k].inp.step >= 1 ? 0 : 2); } save(); }

    var gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!gl) { stage.appendChild(el('p', { class: 'note' }, 'WebGL is not available in this browser.')); return; }
    function sh(type, s) { var x = gl.createShader(type); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(x)); return x; }
    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}')); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog); gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    var U = {}; function u(n) { if (!(n in U)) U[n] = gl.getUniformLocation(prog, n); return U[n]; }
    var tex = gl.createTexture(), fathaC = [0, .5];
    /* symbol change: tex2 holds the shape it leaves in green and the shape it becomes in alpha */
    var tex2 = gl.createTexture(), swap = null, fontsReady = document.fonts ? document.fonts.load('600 300px Lora') : Promise.resolve();
    function loadPair(a, b) {
      var N = 512, D = new Uint8Array(N * N * 4), fa = a === 'waw' ? null : contentField(a), fb = b === 'waw' ? null : contentField(b);
      for (var i = 0; i < N * N; i++) { D[i * 4 + 1] = fa ? fa[i] : 0; D[i * 4 + 3] = fb ? fb[i] : 0; }
      gl.bindTexture(gl.TEXTURE_2D, tex2); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, N, N, 0, gl.RGBA, gl.UNSIGNED_BYTE, D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    /* turn the symbol into another shape (a number, an icon, or the waw) from whatever it shows now */
    var showing = 'waw';
    function show(key) {
      if (key === showing) return;
      if (!CONTENTS.hasOwnProperty(key)) CONTENTS[key] = /^\d+$/.test(key) ? { text: key } : null;
      var from = showing; showing = key;
      fontsReady.then(function () { swap = { seq: [from, key], loop: false, idx: 0, t: .9, m: 0, dur: .45 }; loadPair(from, key); });
    }
    function startSwap(i) {
      swapRow.querySelectorAll('[data-sw]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.sw === String(i))); });
      if (i === 'off') { swap = null; return; }
      fontsReady.then(function () { var sc = SCENARIOS[i]; swap = { seq: sc[1], loop: !!sc[2], idx: 0, t: 0, m: 0 }; loadPair(sc[1][0], sc[1][1]); });
    }
    /* the compact copy on the Presence page starts on the tour */
    if (opts.compact) startSwap(SCENARIOS.length - 1);
    swapRow.addEventListener('click', function (e) { var b = e.target.closest('[data-sw]'); if (b) startSwap(b.dataset.sw === 'off' ? 'off' : +b.dataset.sw); });
    buildTexture([src.fatha, src.body], function (cnv, imgData, c) {
      fathaC = c; gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    });

    var cur = [0, 0, 0, 0, 0, 0, 0], target = STATES[opts.compact || opts.bare ? 'idle' : 'listening'].slice(), state = opts.compact || opts.bare ? 'idle' : 'listening';
    var t0 = performance.now(), last = t0, time = 0, flow = 0, level = 0, blink = 0, nextBlink = 2, look = [0, 0], lookT = [0, 0], cycleT = 0;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var alive = true;
    /* click and drag turns the orb: the ink inside follows the pointer and keeps turning a little after release.
       A press that does not move is a tap (opts.onTap: on the app's orb, talk to Wakeel). */
    /* the pointer moves a target; the ink follows it with a soft lag, so the turn feels heavy and smooth */
    var spin = [0, 0], spinT = [0, 0], spinV = [0, 0], spinRest = [0, 0], spinDrag = null, lastTap = 0, tapTimer = 0, pulse = 0, jellyT = 9;
    /* the orb gives a little under the finger and springs back; a flick nudges it the way it was thrown */
    var springy = 'transform .42s cubic-bezier(.3,1.7,.45,1)';
    var parts = []; var partBuf = new Float32Array(14 * 4); var lastSpark = 0;
    /* throw n sparks from the rim, around angle a (or all round when a is null), outward */
    function sparks(n, a, spread) {
      for (var i = 0; i < n; i++) {
        var th = a == null ? Math.random() * Math.PI * 2 : a + (Math.random() - .5) * (spread || 1.2);
        var sp = .22 + Math.random() * .28;
        if (parts.length >= 14) parts.shift();
        parts.push({ x: Math.cos(th) * .6, y: Math.sin(th) * .6, vx: Math.cos(th) * sp, vy: Math.sin(th) * sp, life: 1, size: .006 + Math.random() * .007 });
      }
    }
    function nudge(tr) { canvas.style.transition = 'transform .12s ease-out'; canvas.style.transform = tr; setTimeout(function () { canvas.style.transition = springy; canvas.style.transform = 'none'; }, 130); }
    canvas.addEventListener('pointerdown', function (e) {
      spinDrag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), t: performance.now(), moved: 0, held: false };
      /* press and hold without moving: push to talk (opts.onHoldStart / onHoldEnd) */
      var d0 = spinDrag;
      if (opts.onHoldStart) setTimeout(function () { if (spinDrag === d0 && d0.moved < 6) { d0.held = true; opts.onHoldStart(); } }, 280);
      try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
      canvas.style.cursor = 'grabbing';
      canvas.style.transition = 'transform .12s ease-out'; canvas.style.transform = 'scale(.97)'; pulse = 1; sparks(5, null);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!spinDrag || spinDrag.held) return;
      var r = canvas.getBoundingClientRect(), now = performance.now(), dt = Math.max(.008, (now - spinDrag.t) / 1000);
      var dx = (e.clientX - spinDrag.x) / (r.width * .45), dy = (e.clientY - spinDrag.y) / (r.width * .45);
      spinT[0] -= dx; spinT[1] -= dy; var cl = function (v) { return Math.max(-2, Math.min(2, v)); }; spinV = [spinV[0] * .7 + cl(-dx / dt) * .3, spinV[1] * .7 + cl(-dy / dt) * .3];
      spinDrag.moved += Math.abs(e.clientX - spinDrag.x) + Math.abs(e.clientY - spinDrag.y);
      spinDrag.x = e.clientX; spinDrag.y = e.clientY; spinDrag.t = now;
      /* while turning, a few sparks leave the side it is turned toward */
      if (now - lastSpark > 70 && Math.hypot(dx, dy) > .004) { lastSpark = now; sparks(1, Math.atan2(dy, dx), .9); }
    });
    function endDrag() {
      if (!spinDrag) return;
      var d = spinDrag, held = d.held, tap = d.moved < 6 && !held; spinDrag = null; canvas.style.cursor = 'grab';
      canvas.style.transition = springy; canvas.style.transform = 'none';
      var fx = d.x - d.x0, fy = d.y - d.y0, quick = performance.now() - d.t0 < 420;
      if (held && opts.onHoldEnd) opts.onHoldEnd();
      /* a quick, long stroke is a flick: up, down, left or right */
      else if (!held && quick && Math.hypot(fx, fy) > 46 && opts.onFlick) { var dir = Math.abs(fx) > Math.abs(fy) ? (fx < 0 ? 'left' : 'right') : (fy < 0 ? 'up' : 'down'); var k = 9 / Math.hypot(fx, fy); nudge('translate(' + (fx * k).toFixed(1) + 'px,' + (fy * k).toFixed(1) + 'px)'); opts.onFlick(dir); }
      else if (tap) {
        /* two taps close together are a double tap; one tap waits a moment to be sure */
        if (opts.onDoubleTap && lastTap && performance.now() - lastTap < 300) { clearTimeout(tapTimer); lastTap = 0; jellyT = 0; opts.onDoubleTap(); }
        else { lastTap = performance.now(); tapTimer = setTimeout(function () { lastTap = 0; if (opts.onTap) opts.onTap(); }, opts.onDoubleTap ? 260 : 0); }
      }
      /* a slow turn of the glass, let go: the host can offer something new */
      else if (!held && d.moved > 30 && opts.onSpinEnd) opts.onSpinEnd();
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', function () { spinDrag = null; canvas.style.cursor = 'grab'; });
    /* portfolio: a bare orb stops drawing while it is off screen and picks up where it was */
    var offscreen = false, parked = false;
    if (opts.bare && window.IntersectionObserver) new IntersectionObserver(function (es) {
      offscreen = !es[es.length - 1].isIntersecting;
      if (!offscreen && parked) { parked = false; last = performance.now(); requestAnimationFrame(frame); }
    }, { rootMargin: '120px' }).observe(canvas);
    function frame(now) {
      if (!alive) return;
      if (offscreen) { parked = true; return; }
      requestAnimationFrame(frame);
      var dt = Math.min(.05, (now - last) / 1000); last = now;
      var sp = vals.pSpeed * (reduce ? .3 : 1); time += dt * sp;
      var k = 1 - Math.exp(-dt * 4.5);
      for (var i = 0; i < SKEYS.length; i++) cur[i] += (target[i] - cur[i]) * k;
      flow += dt * sp * .05 * vals.pChurn * (1 + (vals.pFlowThink - 1) * cur[1] + (vals.pFlowWork - 1) * cur[6]);
      var auto = .12 + (.55 + .45 * Math.sin(time * 2.1)) * Math.abs(Math.sin(time * 9.3)) * ((time * 3.7) % 5 < .7 ? .2 : 1);
      level += ((vals.pLevel > 0 ? vals.pLevel : auto) - level) * Math.min(1, dt * 14);
      nextBlink -= dt; if (nextBlink < 0) { blink = 1; nextBlink = 2.5 + Math.random() * 4; } blink = Math.max(0, blink - dt * 7);
      look[0] += (lookT[0] - look[0]) * k; look[1] += (lookT[1] - look[1]) * k;
      if (cycleT) { cycleT -= dt; if (cycleT <= 0) { var ks = Object.keys(STATES); setState(ks[(ks.indexOf(state) + 1) % ks.length], true); cycleT = 2.8; } }
      var d = Math.min(2, window.devicePixelRatio || 1), w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * d)) { canvas.width = Math.round(w * d); canvas.height = Math.round(h * d); }
      gl.viewport(0, 0, canvas.width, canvas.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u('uR'), canvas.width, canvas.height); gl.uniform1f(u('uT'), time); gl.uniform1f(u('uFlow'), flow);
      for (i = 0; i < SKEYS.length; i++) gl.uniform1f(u(SKEYS[i]), cur[i]);
      gl.uniform1f(u('uLevel'), level); gl.uniform1f(u('uBlink'), blink > .5 ? 2 - blink * 2 : blink * 2);
      if (!spinDrag) {
        /* after a spin it never stops dead: it slows into a gentle drift in the direction it was turned */
        var sp = Math.hypot(spinV[0], spinV[1]), rest = sp > 1e-4 ? [spinV[0] / sp * .045, spinV[1] / sp * .045] : [spinRest[0], spinRest[1]];
        if (sp > 1e-4) spinRest = rest;
        var damp = 1 - Math.exp(-dt * 1.2); spinV[0] += (rest[0] - spinV[0]) * damp; spinV[1] += (rest[1] - spinV[1]) * damp;
        spinT[0] += spinV[0] * dt; spinT[1] += spinV[1] * dt;
      }
      var follow = 1 - Math.exp(-dt * (spinDrag ? 14 : 3)); spin[0] += (spinT[0] - spin[0]) * follow; spin[1] += (spinT[1] - spin[1]) * follow;
      pulse *= Math.exp(-dt * 5); gl.uniform1f(u('uPulse'), pulse);
      for (var pi = 0; pi < 14; pi++) {
        var pp = parts[pi];
        if (pp) { pp.x += pp.vx * dt; pp.y += pp.vy * dt; var dr = Math.exp(-dt * 4); pp.vx *= dr; pp.vy *= dr; pp.life -= dt * 1.9; }
        partBuf[pi * 4] = pp ? pp.x : 0; partBuf[pi * 4 + 1] = pp ? pp.y : 0; partBuf[pi * 4 + 2] = pp && pp.life > 0 ? pp.life : 0; partBuf[pi * 4 + 3] = pp ? pp.size : 1;
      }
      parts = parts.filter(function (pp) { return pp.life > 0; });
      gl.uniform4fv(u('uParts[0]'), partBuf);
      gl.uniform2f(u('uSpin'), spin[0], spin[1]); jellyT += dt; gl.uniform1f(u('uJelly'), Math.exp(-jellyT * 5.5) * Math.sin(jellyT * 21)); gl.uniform1f(u('uBulge'), Math.exp(-jellyT * 4.5) * (1 - Math.exp(-jellyT * 28)));
      gl.uniform2f(u('uLook'), look[0], look[1]); gl.uniform2f(u('uFathaC'), fathaC[0], fathaC[1]); gl.uniform2fv(u('uPath'), WAW_FLAT); gl.uniform1fv(u('uPathS'), WAW_S);
      PARAMS.forEach(function (p) { if (p[0] !== 'pSpeed' && p[0] !== 'pFlowThink' && p[0] !== 'pFlowWork' && p[0] !== 'pChurn' && p[0] !== 'pLevel') gl.uniform1f(u(p[0]), vals[p[0]]); });
      /* symbol change: hold 0.9s, change over 1.4s, hold 1.4s, then the next step; a live change (show) goes at once and quickly */
      var swapOn = 0;
      if (swap) {
        swap.t += dt; swap.m = Math.max(0, Math.min(1, (swap.t - .9) / (swap.dur || 1.4)));
        if (swap.t > 3.7) {
          if (swap.idx + 2 < swap.seq.length) { swap.idx++; swap.t = 0; swap.m = 0; loadPair(swap.seq[swap.idx], swap.seq[swap.idx + 1]); }
          else if (swap.loop) { swap.idx = 0; swap.t = 0; swap.m = 0; loadPair(swap.seq[0], swap.seq[1]); }
        }
        var a = swap.seq[swap.idx], b2 = swap.seq[swap.idx + 1];
        /* resting on the waw again hands back to the live waw, with its fatha */
        swapOn = (swap.m >= 1 && b2 === 'waw') || (swap.m <= 0 && a === 'waw') ? 0 : 1;
        gl.uniform1f(u('uMorph'), swap.m); gl.uniform1f(u('uFromWaw'), a === 'waw' ? 1 : 0); gl.uniform1f(u('uToWaw'), b2 === 'waw' ? 1 : 0);
      }
      gl.uniform1f(u('uSwap'), swapOn);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex2); gl.uniform1i(u('uTex2'), 1);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(u('uTex'), 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      minis.forEach(downscale);
    }
    requestAnimationFrame(frame);

    function setState(s, fromCycle) {
      state = s; target = STATES[s].slice();
      stateRow.querySelectorAll('[data-s]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.s === s); });
      if (!fromCycle) { cycleT = 0; stateRow.querySelector('[data-cycle]').setAttribute('aria-pressed', 'false'); }
    }
    stateRow.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.cycle) { var on = !cycleT; cycleT = on ? .01 : 0; b.setAttribute('aria-pressed', on); return; }
      setState(b.dataset.s);
    });
    presetRow.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.reset) { var d0 = {}; PARAMS.forEach(function (p) { d0[p[0]] = p[6]; }); setVals(d0); return; }
      if (b.dataset.copy) {
        var txt = JSON.stringify(vals);
        try { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { b.textContent = 'copied'; setTimeout(function () { b.textContent = 'copy settings'; }, 1500); }, function () { prompt('Settings', txt); }); } catch (x) {}
        return;
      }
      var d1 = {}; PARAMS.forEach(function (p) { d1[p[0]] = p[6]; }); var pr = PRESETS[b.dataset.p]; for (var k2 in pr) d1[k2] = pr[k2]; setVals(d1);
    });
    stage.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect();
      lookT = [Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / (r.width / 2))), Math.max(-1, Math.min(1, -(e.clientY - r.top - r.height / 2) / (r.height / 2)))]; });
    stage.addEventListener('pointerleave', function () { lookT = [0, 0]; });
    return { setState: function (s) { if (STATES[s]) setState(s); }, show: show, jelly: function () { jellyT = 0; }, setParam: function (k, v) { if (k in vals) vals[k] = v; }, destroy: function () { alive = false; if (canvas.parentNode) canvas.parentNode.removeChild(canvas); } };
  }

  window.SymbolStudio = { mount: mount };
})();

/* Portfolio: mount the Hub's orb engine on the Wakeel case page. Each orb mounts when it comes near the
   screen; the captured image stays underneath as the fallback (no WebGL, or reduced motion). */
(function () {
  var WAW = { fatha: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NTciIGhlaWdodD0iMTAwMCIgdmlld0JveD0iMzQ2IDEyMyA1NTcgMTAwMCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwxMjU0KSBzY2FsZSgwLjEsLTAuMSkiPjxwYXRoIGQ9Ik03Njg1IDExMjQxIGMtNjYgLTM3IC0xOTYgLTEwOSAtMjkwIC0xNjEgLTUzNiAtMjk1IC0xMjkyIC03MTkgLTEzMTMgLTczNSAtMiAtMiAtMTEyIC01NTIgLTEzNiAtNjg3IC03IC0zNCAtMiAtMzQgNTQgLTIgMjAyIDExNiA5MzEgNTE3IDEzMzUgNzM0IDE4NyAxMDAgMzQxIDE4MyAzNDMgMTg1IDMgMyAxNDIgNzE0IDE0MiA3MjggMCAxMyAtMTMgNyAtMTM1IC02MnogIiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+', body: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NTciIGhlaWdodD0iMTAwMCIgdmlld0JveD0iMzQ2IDEyMyA1NTcgMTAwMCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwxMjU0KSBzY2FsZSgwLjEsLTAuMSkiPjxwYXRoIGQ9Ik02OTgyIDkyOTYgYy00NjkgLTkwIC04ODggLTQ3MCAtMTIwNiAtMTA5NSAtMzk4IC03ODIgLTQyNiAtMTQzMiAtODIgLTE5MDEgMjkyIC0zOTggODczIC01NTEgMTM1MyAtMzU2IDM3NiAxNTQgNzMwIDU1NyAxMDA3IDExNDkgMzggODEgNzIgMTQ3IDc1IDE0NyAyNyAwIDE1OSAtNDQxIDE5NiAtNjUzIDE3NCAtMTAxMyAtMzQ2IC0xODkzIC0xNDIwIC0yNDA4IC0yNTYgLTEyMiAtMzYxIC0xNjAgLTEyNjAgLTQ1MiAtMTEzNCAtMzY5IC0xNjgyIC03ODEgLTIwMDAgLTE1MDcgLTEwOCAtMjQ2IC0xODcgLTYxOCAtMTg0IC04NjAgMSAtNTQgMSAtNTQgMTEgLTIwIDE2MSA1NTAgNDQ1IDg4NSA5OTMgMTE3MSAyOTMgMTUzIDQ4MiAyMjYgMTI2MCA0ODQgODEyIDI2OSAxMTQxIDQwNiAxNTAwIDYyMyA5NTIgNTc1IDE1OTMgMTU3MyAxNzY0IDI3NDcgMTM3IDkzMSAtMTE1IDE4MzUgLTY2OSAyNDA5IC0yNTkgMjY4IC01MjQgNDI3IC04NDUgNTA3IC0xMDYgMjcgLTM4NiAzNSAtNDkzIDE1eiBtLTQwIC04OTYgYzM5MSAtODAgNzU2IC0zNzAgMTAxOCAtODA5IDM4IC02NCA4MCAtMTQyIDk0IC0xNzMgbDI1IC01NyAtNjcgLTY1IGMtMjQ4IC0yNDEgLTU4NSAtNDI4IC04OTIgLTQ5MyAtMTMzIC0yOCAtNDE0IC0yNSAtNTQwIDYgLTI0NCA1OSAtNDg4IDIyOCAtNTk4IDQxNCAtMTM5IDIzNCAtMTY1IDQ2OCAtNzYgNjg3IDE0OCAzNjQgNjAxIDU3OCAxMDM2IDQ5MHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=' };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var probe = document.createElement('canvas'), ok = false;
  try { ok = !!(probe.getContext('webgl')); } catch (e) {}
  if (!ok || reduce || !window.SymbolStudio) return;
  function mount(box) {
    var o = SymbolStudio.mount(box, WAW, { bare: true });
    if (!o) return null;
    var cv = box.querySelector('canvas'); if (cv) cv.style.touchAction = 'pan-y';
    box.classList.add('is-live');
    return o;
  }
  function start(box) {
    if (box.hasAttribute('data-orb')) { var o = mount(box); if (o) o.setState(box.getAttribute('data-orb')); return; }
    if (box.hasAttribute('data-orb-tour')) {
      var t = mount(box); if (!t) return;
      var seq = [['3', 'needsyou'], ['waw', 'idle'], ['check', 'done'], ['waw', 'idle'], ['mail', 'working'], ['waw', 'idle']], i = -1;
      var step = function () { i = (i + 1) % seq.length; t.show(seq[i][0]); t.setState(seq[i][1]); };
      setTimeout(step, 900); setInterval(step, 2600);
    }
  }
  var boxes = [].slice.call(document.querySelectorAll('[data-orb], [data-orb-tour]'));
  if (!boxes.length) return;
  var cap = document.querySelector('[data-live-cap]'); if (cap) cap.textContent = cap.getAttribute('data-live-cap');
  if (!window.IntersectionObserver) { boxes.forEach(start); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); start(e.target); } });
  }, { rootMargin: '400px 0px' });
  boxes.forEach(function (b) { io.observe(b); });
})();
