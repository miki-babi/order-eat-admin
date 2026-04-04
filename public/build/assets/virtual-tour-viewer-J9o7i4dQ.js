import{r as qi,j as sn}from"./app-EJXY2lBe.js";/* empty css            */const oo="179",hu=0,Ho=1,du=2,nc=1,uu=2,Mn=3,Hn=0,Dt=1,Sn=2,Nn=0,Ii=1,Vo=2,Go=3,Wo=4,fu=5,ii=100,pu=101,mu=102,gu=103,vu=104,_u=200,xu=201,Eu=202,Mu=203,ca=204,ha=205,Su=206,yu=207,wu=208,Tu=209,bu=210,Au=211,Cu=212,Ru=213,Pu=214,da=0,ua=1,fa=2,Fi=3,pa=4,ma=5,ga=6,va=7,ic=0,Lu=1,Du=2,On=0,sc=1,Iu=2,Uu=3,Nu=4,Ou=5,Fu=6,Bu=7,rc=300,Bi=301,zi=302,_a=303,xa=304,gr=306,Ea=1e3,ri=1001,Ma=1002,en=1003,zu=1004,Ps=1005,Jt=1006,Lr=1007,Un=1008,bn=1009,ac=1010,oc=1011,fs=1012,lo=1013,ai=1014,yn=1015,Es=1016,co=1017,ho=1018,ps=1020,lc=35902,cc=1021,hc=1022,Qt=1023,ms=1026,gs=1027,dc=1028,uo=1029,uc=1030,fo=1031,po=1033,Qs=33776,er=33777,tr=33778,nr=33779,Sa=35840,ya=35841,wa=35842,Ta=35843,ba=36196,Aa=37492,Ca=37496,Ra=37808,Pa=37809,La=37810,Da=37811,Ia=37812,Ua=37813,Na=37814,Oa=37815,Fa=37816,Ba=37817,za=37818,ka=37819,Ha=37820,Va=37821,ir=36492,Ga=36494,Wa=36495,fc=36283,Xa=36284,Ya=36285,qa=36286,ku=3200,Hu=3201,Vu=0,Gu=1,In="",Xt="srgb",oi="srgb-linear",or="linear",Ze="srgb",di=7680,Xo=519,Wu=512,Xu=513,Yu=514,pc=515,qu=516,$u=517,Zu=518,ju=519,Yo=35044,qo="300 es",cn=2e3,lr=2001;class Vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $o=1234567;const ts=Math.PI/180,vs=180/Math.PI;function Gi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]).toLowerCase()}function ze(n,e,t){return Math.max(e,Math.min(t,n))}function mo(n,e){return(n%e+e)%e}function Ku(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Ju(n,e,t){return n!==e?(t-n)/(e-n):0}function ns(n,e,t){return(1-t)*n+t*e}function Qu(n,e,t,i){return ns(n,e,1-Math.exp(-t*i))}function ef(n,e=1){return e-Math.abs(mo(n,e*2)-e)}function tf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function nf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function sf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function rf(n,e){return n+Math.random()*(e-n)}function af(n){return n*(.5-Math.random())}function of(n){n!==void 0&&($o=n);let e=$o+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lf(n){return n*ts}function cf(n){return n*vs}function hf(n){return(n&n-1)===0&&n!==0}function df(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function uf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ff(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),p=a((e-i)/2),m=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*u,c*p,o*l);break;case"YZY":n.set(c*p,o*h,c*u,o*l);break;case"ZXZ":n.set(c*u,c*p,o*h,o*l);break;case"XZX":n.set(o*h,c*v,c*m,o*l);break;case"YXY":n.set(c*m,o*h,c*v,o*l);break;case"ZYZ":n.set(c*v,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ci(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ke={DEG2RAD:ts,RAD2DEG:vs,generateUUID:Gi,clamp:ze,euclideanModulo:mo,mapLinear:Ku,inverseLerp:Ju,lerp:ns,damp:Qu,pingpong:ef,smoothstep:tf,smootherstep:nf,randInt:sf,randFloat:rf,randFloatSpread:af,seededRandom:of,degToRad:lf,radToDeg:cf,isPowerOfTwo:hf,ceilPowerOfTwo:df,floorPowerOfTwo:uf,setQuaternionFromProperEuler:ff,normalize:bt,denormalize:Ci};class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ci{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const p=r[a+0],m=r[a+1],v=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=p,e[t+1]=m,e[t+2]=v,e[t+3]=_;return}if(u!==_||c!==p||l!==m||h!==v){let f=1-o;const d=c*p+l*m+h*v+u*_,b=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){const R=Math.sqrt(w),C=Math.atan2(R,d*b);f=Math.sin(f*C)/R,o=Math.sin(o*C)/R}const E=o*b;if(c=c*f+p*E,l=l*f+m*E,h=h*f+v*E,u=u*f+_*E,f===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[a],p=r[a+1],m=r[a+2],v=r[a+3];return e[t]=o*v+h*u+c*m-l*p,e[t+1]=c*v+h*p+l*u-o*m,e[t+2]=l*v+h*m+o*p-c*u,e[t+3]=h*v-o*u-c*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),u=o(r/2),p=c(i/2),m=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=p*h*u+l*m*v,this._y=l*m*u-p*h*v,this._z=l*h*v+p*m*u,this._w=l*h*u-p*m*v;break;case"YXZ":this._x=p*h*u+l*m*v,this._y=l*m*u-p*h*v,this._z=l*h*v-p*m*u,this._w=l*h*u+p*m*v;break;case"ZXY":this._x=p*h*u-l*m*v,this._y=l*m*u+p*h*v,this._z=l*h*v+p*m*u,this._w=l*h*u-p*m*v;break;case"ZYX":this._x=p*h*u-l*m*v,this._y=l*m*u+p*h*v,this._z=l*h*v-p*m*u,this._w=l*h*u+p*m*v;break;case"YZX":this._x=p*h*u+l*m*v,this._y=l*m*u+p*h*v,this._z=l*h*v-p*m*u,this._w=l*h*u-p*m*v;break;case"XZY":this._x=p*h*u-l*m*v,this._y=l*m*u-p*h*v,this._z=l*h*v+p*m*u,this._w=l*h*u+p*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],p=i+o+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,p=Math.sin(t*h)/l;return this._w=a*u+this._w*p,this._x=i*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+c*l+a*u-o*h,this.y=i+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new O,Zo=new ci;class Ue{constructor(e,t,i,s,r,a,o,c,l){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],p=i[2],m=i[5],v=i[8],_=s[0],f=s[3],d=s[6],b=s[1],w=s[4],E=s[7],R=s[2],C=s[5],L=s[8];return r[0]=a*_+o*b+c*R,r[3]=a*f+o*w+c*C,r[6]=a*d+o*E+c*L,r[1]=l*_+h*b+u*R,r[4]=l*f+h*w+u*C,r[7]=l*d+h*E+u*L,r[2]=p*_+m*b+v*R,r[5]=p*f+m*w+v*C,r[8]=p*d+m*E+v*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,p=o*c-h*r,m=l*r-a*c,v=t*u+i*p+s*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=u*_,e[1]=(s*l-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=p*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=m*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ir.makeScale(e,t)),this}rotate(e){return this.premultiply(Ir.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ir.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ir=new Ue;function mc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function _s(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function pf(){const n=_s("canvas");return n.style.display="block",n}const jo={};function Ui(n){n in jo||(jo[n]=!0,console.warn(n))}function mf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Ko=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jo=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gf(){const n={enabled:!0,workingColorSpace:oi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=wn(s.r),s.g=wn(s.g),s.b=wn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===In?or:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ui("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ui("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[oi]:{primaries:e,whitePoint:i,transfer:or,toXYZ:Ko,fromXYZ:Jo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:Ze,toXYZ:Ko,fromXYZ:Jo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const Ve=gf();function wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ni(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ui;class vf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ui===void 0&&(ui=_s("canvas")),ui.width=e.width,ui.height=e.height;const s=ui.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ui}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_s("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(wn(t[i]/255)*255):t[i]=wn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _f=0;class go{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Gi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ur(s[a].image)):r.push(Ur(s[a]))}else r=Ur(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ur(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xf=0;const Nr=new O;class Rt extends Vi{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=ri,s=ri,r=Jt,a=Un,o=Qt,c=bn,l=Rt.DEFAULT_ANISOTROPY,h=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=Gi(),this.name="",this.source=new go(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Nr).x}get height(){return this.source.getSize(Nr).y}get depth(){return this.source.getSize(Nr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ea:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ea:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=rc;Rt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],p=c[1],m=c[5],v=c[9],_=c[2],f=c[6],d=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-_)<.01&&Math.abs(v-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+_)<.1&&Math.abs(v+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,E=(m+1)/2,R=(d+1)/2,C=(h+p)/4,L=(u+_)/4,U=(v+f)/4;return w>E&&w>R?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=C/i,r=L/i):E>R?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=C/s,r=U/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=L/r,s=U/r),this.set(i,s,r,t),this}let b=Math.sqrt((f-v)*(f-v)+(u-_)*(u-_)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(f-v)/b,this.y=(u-_)/b,this.z=(p-h)/b,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ef extends Vi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Rt(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new go(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends Ef{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class gc extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mf extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(r,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ls.copy(i.boundingBox)),Ls.applyMatrix4(e.matrixWorld),this.union(Ls)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),Ds.subVectors(this.max,$i),fi.subVectors(e.a,$i),pi.subVectors(e.b,$i),mi.subVectors(e.c,$i),An.subVectors(pi,fi),Cn.subVectors(mi,pi),Zn.subVectors(fi,mi);let t=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-Zn.z,Zn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,Zn.z,0,-Zn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-Zn.y,Zn.x,0];return!Or(t,fi,pi,mi,Ds)||(t=[1,0,0,0,1,0,0,0,1],!Or(t,fi,pi,mi,Ds))?!1:(Is.crossVectors(An,Cn),t=[Is.x,Is.y,Is.z],Or(t,fi,pi,mi,Ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mn=[new O,new O,new O,new O,new O,new O,new O,new O],qt=new O,Ls=new Wi,fi=new O,pi=new O,mi=new O,An=new O,Cn=new O,Zn=new O,$i=new O,Ds=new O,Is=new O,jn=new O;function Or(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){jn.fromArray(n,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),c=e.dot(jn),l=t.dot(jn),h=i.dot(jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Sf=new Wi,Zi=new O,Fr=new O;class vo{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Sf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zi.subVectors(e,this.center);const t=Zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Zi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zi.copy(e.center).add(Fr)),this.expandByPoint(Zi.copy(e.center).sub(Fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const gn=new O,Br=new O,Us=new O,Rn=new O,zr=new O,Ns=new O,kr=new O;class vc{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Br.copy(e).add(t).multiplyScalar(.5),Us.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(Br);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Us),o=Rn.dot(this.direction),c=-Rn.dot(Us),l=Rn.lengthSq(),h=Math.abs(1-a*a);let u,p,m,v;if(h>0)if(u=a*c-o,p=a*o-c,v=r*h,u>=0)if(p>=-v)if(p<=v){const _=1/h;u*=_,p*=_,m=u*(u+a*p+2*o)+p*(a*u+p+2*c)+l}else p=r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;else p<=-v?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l):p<=v?(u=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Br).addScaledVector(Us,p),m}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const i=gn.dot(this.direction),s=gn.dot(gn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(i=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(i=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),h>=0?(r=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-p.z)*u,c=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,c=(e.min.z-p.z)*u),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,i,s,r){zr.subVectors(t,e),Ns.subVectors(i,e),kr.crossVectors(zr,Ns);let a=this.direction.dot(kr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Rn.subVectors(this.origin,e);const c=o*this.direction.dot(Ns.crossVectors(Rn,Ns));if(c<0)return null;const l=o*this.direction.dot(zr.cross(Rn));if(l<0||c+l>a)return null;const h=-o*Rn.dot(kr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,i,s,r,a,o,c,l,h,u,p,m,v,_,f){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,u,p,m,v,_,f)}set(e,t,i,s,r,a,o,c,l,h,u,p,m,v,_,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=p,d[3]=m,d[7]=v,d[11]=_,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/gi.setFromMatrixColumn(e,0).length(),r=1/gi.setFromMatrixColumn(e,1).length(),a=1/gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=a*h,m=a*u,v=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+v*l,t[5]=p-_*l,t[9]=-o*c,t[2]=_-p*l,t[6]=v+m*l,t[10]=a*c}else if(e.order==="YXZ"){const p=c*h,m=c*u,v=l*h,_=l*u;t[0]=p+_*o,t[4]=v*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-v,t[6]=_+p*o,t[10]=a*c}else if(e.order==="ZXY"){const p=c*h,m=c*u,v=l*h,_=l*u;t[0]=p-_*o,t[4]=-a*u,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*h,t[9]=_-p*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const p=a*h,m=a*u,v=o*h,_=o*u;t[0]=c*h,t[4]=v*l-m,t[8]=p*l+_,t[1]=c*u,t[5]=_*l+p,t[9]=m*l-v,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const p=a*c,m=a*l,v=o*c,_=o*l;t[0]=c*h,t[4]=_-p*u,t[8]=v*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+v,t[10]=p-_*u}else if(e.order==="XZY"){const p=a*c,m=a*l,v=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=p*u+_,t[5]=a*h,t[9]=m*u-v,t[2]=v*u-m,t[6]=o*h,t[10]=_*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yf,e,wf)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Pn.crossVectors(i,Ot),Pn.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Pn.crossVectors(i,Ot)),Pn.normalize(),Os.crossVectors(Ot,Pn),s[0]=Pn.x,s[4]=Os.x,s[8]=Ot.x,s[1]=Pn.y,s[5]=Os.y,s[9]=Ot.y,s[2]=Pn.z,s[6]=Os.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],p=i[9],m=i[13],v=i[2],_=i[6],f=i[10],d=i[14],b=i[3],w=i[7],E=i[11],R=i[15],C=s[0],L=s[4],U=s[8],S=s[12],M=s[1],A=s[5],Y=s[9],H=s[13],V=s[2],Z=s[6],X=s[10],ee=s[14],z=s[3],re=s[7],he=s[11],Me=s[15];return r[0]=a*C+o*M+c*V+l*z,r[4]=a*L+o*A+c*Z+l*re,r[8]=a*U+o*Y+c*X+l*he,r[12]=a*S+o*H+c*ee+l*Me,r[1]=h*C+u*M+p*V+m*z,r[5]=h*L+u*A+p*Z+m*re,r[9]=h*U+u*Y+p*X+m*he,r[13]=h*S+u*H+p*ee+m*Me,r[2]=v*C+_*M+f*V+d*z,r[6]=v*L+_*A+f*Z+d*re,r[10]=v*U+_*Y+f*X+d*he,r[14]=v*S+_*H+f*ee+d*Me,r[3]=b*C+w*M+E*V+R*z,r[7]=b*L+w*A+E*Z+R*re,r[11]=b*U+w*Y+E*X+R*he,r[15]=b*S+w*H+E*ee+R*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],p=e[10],m=e[14],v=e[3],_=e[7],f=e[11],d=e[15];return v*(+r*c*u-s*l*u-r*o*p+i*l*p+s*o*m-i*c*m)+_*(+t*c*m-t*l*p+r*a*p-s*a*m+s*l*h-r*c*h)+f*(+t*l*u-t*o*m-r*a*u+i*a*m+r*o*h-i*l*h)+d*(-s*o*h-t*c*u+t*o*p+s*a*u-i*a*p+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],p=e[10],m=e[11],v=e[12],_=e[13],f=e[14],d=e[15],b=u*f*l-_*p*l+_*c*m-o*f*m-u*c*d+o*p*d,w=v*p*l-h*f*l-v*c*m+a*f*m+h*c*d-a*p*d,E=h*_*l-v*u*l+v*o*m-a*_*m-h*o*d+a*u*d,R=v*u*c-h*_*c-v*o*p+a*_*p+h*o*f-a*u*f,C=t*b+i*w+s*E+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/C;return e[0]=b*L,e[1]=(_*p*r-u*f*r-_*s*m+i*f*m+u*s*d-i*p*d)*L,e[2]=(o*f*r-_*c*r+_*s*l-i*f*l-o*s*d+i*c*d)*L,e[3]=(u*c*r-o*p*r-u*s*l+i*p*l+o*s*m-i*c*m)*L,e[4]=w*L,e[5]=(h*f*r-v*p*r+v*s*m-t*f*m-h*s*d+t*p*d)*L,e[6]=(v*c*r-a*f*r-v*s*l+t*f*l+a*s*d-t*c*d)*L,e[7]=(a*p*r-h*c*r+h*s*l-t*p*l-a*s*m+t*c*m)*L,e[8]=E*L,e[9]=(v*u*r-h*_*r-v*i*m+t*_*m+h*i*d-t*u*d)*L,e[10]=(a*_*r-v*o*r+v*i*l-t*_*l-a*i*d+t*o*d)*L,e[11]=(h*o*r-a*u*r-h*i*l+t*u*l+a*i*m-t*o*m)*L,e[12]=R*L,e[13]=(h*_*s-v*u*s+v*i*p-t*_*p-h*i*f+t*u*f)*L,e[14]=(v*o*s-a*_*s-v*i*c+t*_*c+a*i*f-t*o*f)*L,e[15]=(a*u*s-h*o*s+h*i*c-t*u*c-a*i*p+t*o*p)*L,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,p=r*l,m=r*h,v=r*u,_=a*h,f=a*u,d=o*u,b=c*l,w=c*h,E=c*u,R=i.x,C=i.y,L=i.z;return s[0]=(1-(_+d))*R,s[1]=(m+E)*R,s[2]=(v-w)*R,s[3]=0,s[4]=(m-E)*C,s[5]=(1-(p+d))*C,s[6]=(f+b)*C,s[7]=0,s[8]=(v+w)*L,s[9]=(f-b)*L,s[10]=(1-(p+_))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=gi.set(s[0],s[1],s[2]).length();const a=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$t.copy(this);const l=1/r,h=1/a,u=1/o;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=cn,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(i-s),p=(t+e)/(t-e),m=(i+s)/(i-s);let v,_;if(c)v=r/(a-r),_=a*r/(a-r);else if(o===cn)v=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===lr)v=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=cn,c=!1){const l=this.elements,h=2/(t-e),u=2/(i-s),p=-(t+e)/(t-e),m=-(i+s)/(i-s);let v,_;if(c)v=1/(a-r),_=a/(a-r);else if(o===cn)v=-2/(a-r),_=-(a+r)/(a-r);else if(o===lr)v=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=v,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const gi=new O,$t=new it,yf=new O(0,0,0),wf=new O(1,1,1),Pn=new O,Os=new O,Ot=new O,Qo=new it,el=new ci;class fn{constructor(e=0,t=0,i=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return el.setFromEuler(this),this.setFromQuaternion(el,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class _o{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tf=0;const tl=new O,vi=new ci,vn=new it,Fs=new O,ji=new O,bf=new O,Af=new ci,nl=new O(1,0,0),il=new O(0,1,0),sl=new O(0,0,1),rl={type:"added"},Cf={type:"removed"},_i={type:"childadded",child:null},Hr={type:"childremoved",child:null};class Pt extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new O,t=new fn,i=new ci,s=new O(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Ue}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _o,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.multiply(vi),this}rotateOnWorldAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.premultiply(vi),this}rotateX(e){return this.rotateOnAxis(nl,e)}rotateY(e){return this.rotateOnAxis(il,e)}rotateZ(e){return this.rotateOnAxis(sl,e)}translateOnAxis(e,t){return tl.copy(e).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nl,e)}translateY(e){return this.translateOnAxis(il,e)}translateZ(e){return this.translateOnAxis(sl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fs.copy(e):Fs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(ji,Fs,this.up):vn.lookAt(Fs,ji,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),vi.setFromRotationMatrix(vn),this.quaternion.premultiply(vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rl),_i.child=e,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cf),Hr.child=e,this.dispatchEvent(Hr),Hr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rl),_i.child=e,this.dispatchEvent(_i),_i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,e,bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Af,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new O(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new O,_n=new O,Vr=new O,xn=new O,xi=new O,Ei=new O,al=new O,Gr=new O,Wr=new O,Xr=new O,Yr=new dt,qr=new dt,$r=new dt;class Kt{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Zt.subVectors(s,t),_n.subVectors(i,t),Vr.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(_n),c=Zt.dot(Vr),l=_n.dot(_n),h=_n.dot(Vr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(l*c-o*h)*p,v=(a*h-o*c)*p;return r.set(1-m-v,v,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(a,xn.y),c.addScaledVector(o,xn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Yr.setScalar(0),qr.setScalar(0),$r.setScalar(0),Yr.fromBufferAttribute(e,t),qr.fromBufferAttribute(e,i),$r.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Yr,r.x),a.addScaledVector(qr,r.y),a.addScaledVector($r,r.z),a}static isFrontFacing(e,t,i,s){return Zt.subVectors(i,t),_n.subVectors(e,t),Zt.cross(_n).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Zt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;xi.subVectors(s,i),Ei.subVectors(r,i),Gr.subVectors(e,i);const c=xi.dot(Gr),l=Ei.dot(Gr);if(c<=0&&l<=0)return t.copy(i);Wr.subVectors(e,s);const h=xi.dot(Wr),u=Ei.dot(Wr);if(h>=0&&u<=h)return t.copy(s);const p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(xi,a);Xr.subVectors(e,r);const m=xi.dot(Xr),v=Ei.dot(Xr);if(v>=0&&m<=v)return t.copy(r);const _=m*l-c*v;if(_<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(i).addScaledVector(Ei,o);const f=h*v-m*u;if(f<=0&&u-h>=0&&m-v>=0)return al.subVectors(r,s),o=(u-h)/(u-h+(m-v)),t.copy(s).addScaledVector(al,o);const d=1/(f+_+p);return a=_*d,o=p*d,t.copy(i).addScaledVector(xi,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Bs={h:0,s:0,l:0};function Zr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ke{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ve.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ve.workingColorSpace){if(e=mo(e,1),t=ze(t,0,1),i=ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Zr(a,r,e+1/3),this.g=Zr(a,r,e),this.b=Zr(a,r,e-1/3)}return Ve.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=_c[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wn(e.r),this.g=wn(e.g),this.b=wn(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ve.workingToColorSpace(wt.copy(this),e),Math.round(ze(wt.r*255,0,255))*65536+Math.round(ze(wt.g*255,0,255))*256+Math.round(ze(wt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.workingToColorSpace(wt.copy(this),t);const i=wt.r,s=wt.g,r=wt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Xt){Ve.workingToColorSpace(wt.copy(this),e);const t=wt.r,i=wt.g,s=wt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Bs);const i=ns(Ln.h,Bs.h,t),s=ns(Ln.s,Bs.s,t),r=ns(Ln.l,Bs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ke;Ke.NAMES=_c;let Rf=0;class vr extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=Ii,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=ha,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Hn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ca&&(i.blendSrc=this.blendSrc),this.blendDst!==ha&&(i.blendDst=this.blendDst),this.blendEquation!==ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ms extends vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new O,zs=new Ye;let Pf=0;class dn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Yo,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)zs.fromBufferAttribute(this,t),zs.applyMatrix3(e),this.setXY(t,zs.x,zs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yo&&(e.usage=this.usage),e}}class xc extends dn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ec extends dn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class un extends dn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Lf=0;const Gt=new it,jr=new Pt,Mi=new O,Ft=new Wi,Ki=new Wi,vt=new O;class Xn extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mc(e)?Ec:xc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ue().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,i){return Gt.makeTranslation(e,t,i),this.applyMatrix4(Gt),this}scale(e,t,i){return Gt.makeScale(e,t,i),this.applyMatrix4(Gt),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new un(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Ft.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ki.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Ft.min,Ki.min),Ft.expandByPoint(vt),vt.addVectors(Ft.max,Ki.max),Ft.expandByPoint(vt)):(Ft.expandByPoint(Ki.min),Ft.expandByPoint(Ki.max))}Ft.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)vt.fromBufferAttribute(o,l),c&&(Mi.fromBufferAttribute(e,l),vt.add(Mi)),s=Math.max(s,i.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<i.count;U++)o[U]=new O,c[U]=new O;const l=new O,h=new O,u=new O,p=new Ye,m=new Ye,v=new Ye,_=new O,f=new O;function d(U,S,M){l.fromBufferAttribute(i,U),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),p.fromBufferAttribute(r,U),m.fromBufferAttribute(r,S),v.fromBufferAttribute(r,M),h.sub(l),u.sub(l),m.sub(p),v.sub(p);const A=1/(m.x*v.y-v.x*m.y);isFinite(A)&&(_.copy(h).multiplyScalar(v.y).addScaledVector(u,-m.y).multiplyScalar(A),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-v.x).multiplyScalar(A),o[U].add(_),o[S].add(_),o[M].add(_),c[U].add(f),c[S].add(f),c[M].add(f))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let U=0,S=b.length;U<S;++U){const M=b[U],A=M.start,Y=M.count;for(let H=A,V=A+Y;H<V;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new O,E=new O,R=new O,C=new O;function L(U){R.fromBufferAttribute(s,U),C.copy(R);const S=o[U];w.copy(S),w.sub(R.multiplyScalar(R.dot(S))).normalize(),E.crossVectors(C,S);const A=E.dot(c[U])<0?-1:1;a.setXYZW(U,w.x,w.y,w.z,A)}for(let U=0,S=b.length;U<S;++U){const M=b[U],A=M.start,Y=M.count;for(let H=A,V=A+Y;H<V;H+=3)L(e.getX(H+0)),L(e.getX(H+1)),L(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,m=i.count;p<m;p++)i.setXYZ(p,0,0,0);const s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let p=0,m=e.count;p<m;p+=3){const v=e.getX(p+0),_=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,f),o.add(h),c.add(h),l.add(h),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(p+0,h.x,h.y,h.z),i.setXYZ(p+1,h.x,h.y,h.z),i.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,p=new l.constructor(c.length*h);let m=0,v=0;for(let _=0,f=c.length;_<f;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*h;for(let d=0;d<h;d++)p[v++]=l[m++]}return new dn(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xn,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const p=l[h],m=e(p,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let p=0,m=u.length;p<m;p++)h.push(u[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ol=new it,Kn=new vc,ks=new vo,ll=new O,Hs=new O,Vs=new O,Gs=new O,Kr=new O,Ws=new O,cl=new O,Xs=new O;class Yt extends Pt{constructor(e=new Xn,t=new Ms){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ws.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Kr.fromBufferAttribute(u,e),a?Ws.addScaledVector(Kr,h):Ws.addScaledVector(Kr.sub(t),h))}t.add(Ws)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(ks.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(ks,ll)===null||Kn.origin.distanceToSquared(ll)>(e.far-e.near)**2))&&(ol.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(ol),!(i.boundingBox!==null&&Kn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,_=p.length;v<_;v++){const f=p[v],d=a[f.materialIndex],b=Math.max(f.start,m.start),w=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let E=b,R=w;E<R;E+=3){const C=o.getX(E),L=o.getX(E+1),U=o.getX(E+2);s=Ys(this,d,e,i,l,h,u,C,L,U),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const v=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let f=v,d=_;f<d;f+=3){const b=o.getX(f),w=o.getX(f+1),E=o.getX(f+2);s=Ys(this,a,e,i,l,h,u,b,w,E),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,_=p.length;v<_;v++){const f=p[v],d=a[f.materialIndex],b=Math.max(f.start,m.start),w=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let E=b,R=w;E<R;E+=3){const C=E,L=E+1,U=E+2;s=Ys(this,d,e,i,l,h,u,C,L,U),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const v=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let f=v,d=_;f<d;f+=3){const b=f,w=f+1,E=f+2;s=Ys(this,a,e,i,l,h,u,b,w,E),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function Df(n,e,t,i,s,r,a,o){let c;if(e.side===Dt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===Hn,o),c===null)return null;Xs.copy(o),Xs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Xs);return l<t.near||l>t.far?null:{distance:l,point:Xs.clone(),object:n}}function Ys(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Hs),n.getVertexPosition(c,Vs),n.getVertexPosition(l,Gs);const h=Df(n,e,t,i,Hs,Vs,Gs,cl);if(h){const u=new O;Kt.getBarycoord(cl,Hs,Vs,Gs,u),s&&(h.uv=Kt.getInterpolatedAttribute(s,o,c,l,u,new Ye)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,o,c,l,u,new Ye)),a&&(h.normal=Kt.getInterpolatedAttribute(a,o,c,l,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new O,materialIndex:0};Kt.getNormal(Hs,Vs,Gs,p.normal),h.face=p,h.barycoord=u}return h}class Ss extends Xn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let p=0,m=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new un(l,3)),this.setAttribute("normal",new un(h,3)),this.setAttribute("uv",new un(u,2));function v(_,f,d,b,w,E,R,C,L,U,S){const M=E/L,A=R/U,Y=E/2,H=R/2,V=C/2,Z=L+1,X=U+1;let ee=0,z=0;const re=new O;for(let he=0;he<X;he++){const Me=he*A-H;for(let Oe=0;Oe<Z;Oe++){const st=Oe*M-Y;re[_]=st*b,re[f]=Me*w,re[d]=V,l.push(re.x,re.y,re.z),re[_]=0,re[f]=0,re[d]=C>0?1:-1,h.push(re.x,re.y,re.z),u.push(Oe/L),u.push(1-he/U),ee+=1}}for(let he=0;he<U;he++)for(let Me=0;Me<L;Me++){const Oe=p+Me+Z*he,st=p+Me+Z*(he+1),Je=p+(Me+1)+Z*(he+1),W=p+(Me+1)+Z*he;c.push(Oe,st,W),c.push(st,Je,W),z+=6}o.addGroup(m,z,S),m+=z,p+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ki(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function At(n){const e={};for(let t=0;t<n.length;t++){const i=ki(n[t]);for(const s in i)e[s]=i[s]}return e}function If(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Mc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const Uf={clone:ki,merge:At};var Nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends vr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nf,this.fragmentShader=Of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ki(e.uniforms),this.uniformsGroups=If(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Sc extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new O,hl=new Ye,dl=new Ye;class zt extends Sc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,hl,dl),t.subVectors(dl,hl)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ts*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,yi=1;class Ff extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zt(Si,yi,e,t);s.layers=this.layers,this.add(s);const r=new zt(Si,yi,e,t);r.layers=this.layers,this.add(r);const a=new zt(Si,yi,e,t);a.layers=this.layers,this.add(a);const o=new zt(Si,yi,e,t);o.layers=this.layers,this.add(o);const c=new zt(Si,yi,e,t);c.layers=this.layers,this.add(c);const l=new zt(Si,yi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===cn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,p,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class yc extends Rt{constructor(e=[],t=Bi,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bf extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new yc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ss(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:ki(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dt,blending:Nn});r.uniforms.tEquirect.value=t;const a=new Yt(s,r),o=t.minFilter;return t.minFilter===Un&&(t.minFilter=Jt),new Ff(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class Pi extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zf={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const f=t.getJointPose(_,i),d=this._getHandJoint(l,_);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),m=.02,v=.005;l.inputState.pinching&&p>m+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Pi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class $a extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qr=new O,kf=new O,Hf=new Ue;class ti{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Qr.subVectors(i,t).cross(kf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Qr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Hf.getNormalMatrix(e),s=this.coplanarPoint(Qr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new vo,Vf=new Ye(.5,.5),qs=new O;class xo{constructor(e=new ti,t=new ti,i=new ti,s=new ti,r=new ti,a=new ti){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=cn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],p=r[6],m=r[7],v=r[8],_=r[9],f=r[10],d=r[11],b=r[12],w=r[13],E=r[14],R=r[15];if(s[0].setComponents(l-a,m-h,d-v,R-b).normalize(),s[1].setComponents(l+a,m+h,d+v,R+b).normalize(),s[2].setComponents(l+o,m+u,d+_,R+w).normalize(),s[3].setComponents(l-o,m-u,d-_,R-w).normalize(),i)s[4].setComponents(c,p,f,E).normalize(),s[5].setComponents(l-c,m-p,d-f,R-E).normalize();else if(s[4].setComponents(l-c,m-p,d-f,R-E).normalize(),t===cn)s[5].setComponents(l+c,m+p,d+f,R+E).normalize();else if(t===lr)s[5].setComponents(c,p,f,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=Vf.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(qs.x=s.normal.x>0?e.max.x:e.min.x,qs.y=s.normal.y>0?e.max.y:e.min.y,qs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wc extends Rt{constructor(e,t,i=ai,s,r,a,o=en,c=en,l,h=ms,u=1){if(h!==ms&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:u};super(p,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new go(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class _r extends Xn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,u=e/o,p=t/c,m=[],v=[],_=[],f=[];for(let d=0;d<h;d++){const b=d*p-a;for(let w=0;w<l;w++){const E=w*u-r;v.push(E,-b,0),_.push(0,0,1),f.push(w/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const w=b+l*d,E=b+l*(d+1),R=b+1+l*(d+1),C=b+1+l*d;m.push(w,E,C),m.push(E,R,C)}this.setIndex(m),this.setAttribute("position",new un(v,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.widthSegments,e.heightSegments)}}class ys extends Xn{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new O,p=new O,m=[],v=[],_=[],f=[];for(let d=0;d<=i;d++){const b=[],w=d/i;let E=0;d===0&&a===0?E=.5/t:d===i&&c===Math.PI&&(E=-.5/t);for(let R=0;R<=t;R++){const C=R/t;u.x=-e*Math.cos(s+C*r)*Math.sin(a+w*o),u.y=e*Math.cos(a+w*o),u.z=e*Math.sin(s+C*r)*Math.sin(a+w*o),v.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(C+E,1-w),b.push(l++)}h.push(b)}for(let d=0;d<i;d++)for(let b=0;b<t;b++){const w=h[d][b+1],E=h[d][b],R=h[d+1][b],C=h[d+1][b+1];(d!==0||a>0)&&m.push(w,E,C),(d!==i-1||c<Math.PI)&&m.push(E,R,C)}this.setIndex(m),this.setAttribute("position",new un(v,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ys(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Gf extends vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wf extends vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fn={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Xf{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=l.length;u<p;u+=2){const m=l[u],v=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Yf=new Xf;let Eo=class{constructor(e){this.manager=e!==void 0?e:Yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Eo.DEFAULT_MATERIAL_NAME="__DEFAULT";const En={};class qf extends Error{constructor(e,t){super(e),this.response=t}}class $f extends Eo{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Fn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(En[e]!==void 0){En[e].push({onLoad:t,onProgress:i,onError:s});return}En[e]=[],En[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=En[e],u=l.body.getReader(),p=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=p?parseInt(p):0,v=m!==0;let _=0;const f=new ReadableStream({start(d){b();function b(){u.read().then(({done:w,value:E})=>{if(w)d.close();else{_+=E.byteLength;const R=new ProgressEvent("progress",{lengthComputable:v,loaded:_,total:m});for(let C=0,L=h.length;C<L;C++){const U=h[C];U.onProgress&&U.onProgress(R)}d.enqueue(E),b()}},w=>{d.error(w)})}}});return new Response(f)}else throw new qf(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),p=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(p);return l.arrayBuffer().then(v=>m.decode(v))}}}).then(l=>{Fn.add(`file:${e}`,l);const h=En[e];delete En[e];for(let u=0,p=h.length;u<p;u++){const m=h[u];m.onLoad&&m.onLoad(l)}}).catch(l=>{const h=En[e];if(h===void 0)throw this.manager.itemError(e),l;delete En[e];for(let u=0,p=h.length;u<p;u++){const m=h[u];m.onError&&m.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const wi=new WeakMap;class Zf extends Eo{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Fn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=wi.get(a);u===void 0&&(u=[],wi.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=_s("img");function c(){h(),t&&t(this);const u=wi.get(this)||[];for(let p=0;p<u.length;p++){const m=u[p];m.onLoad&&m.onLoad(this)}wi.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Fn.remove(`image:${e}`);const p=wi.get(this)||[];for(let m=0;m<p.length;m++){const v=p[m];v.onError&&v.onError(u)}wi.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class jf extends Sc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Kf extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ul=new it;class Jf{constructor(e,t,i=0,s=1/0){this.ray=new vc(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new _o,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ul.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ul),this}intersectObject(e,t=!0,i=[]){return Za(e,this,i,t),i.sort(fl),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Za(e[s],this,i,t);return i.sort(fl),i}}function fl(n,e){return n.distance-e.distance}function Za(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Za(r[a],e,t,!0)}}function pl(n,e,t,i){const s=Qf(i);switch(t){case cc:return n*e;case dc:return n*e/s.components*s.byteLength;case uo:return n*e/s.components*s.byteLength;case uc:return n*e*2/s.components*s.byteLength;case fo:return n*e*2/s.components*s.byteLength;case hc:return n*e*3/s.components*s.byteLength;case Qt:return n*e*4/s.components*s.byteLength;case po:return n*e*4/s.components*s.byteLength;case Qs:case er:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case tr:case nr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ya:case Ta:return Math.max(n,16)*Math.max(e,8)/4;case Sa:case wa:return Math.max(n,8)*Math.max(e,8)/2;case ba:case Aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case La:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Da:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Na:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ka:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ha:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Va:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ir:case Ga:case Wa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fc:case Xa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ya:case qa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qf(n){switch(n){case bn:case ac:return{byteLength:1,components:1};case fs:case oc:case Es:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case ai:case lo:case yn:return{byteLength:4,components:1};case lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);function Tc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function ep(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,h);else{u.sort((m,v)=>m.start-v.start);let p=0;for(let m=1;m<u.length;m++){const v=u[p],_=u[m];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++p,u[p]=_)}u.length=p+1;for(let m=0,v=u.length;m<v;m++){const _=u[m];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,np=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ap=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,op=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$p=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,em=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,im=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,am=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,um=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Om=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ym=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$m=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ig=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,og=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_g=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ag=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:tp,alphahash_pars_fragment:np,alphamap_fragment:ip,alphamap_pars_fragment:sp,alphatest_fragment:rp,alphatest_pars_fragment:ap,aomap_fragment:op,aomap_pars_fragment:lp,batching_pars_vertex:cp,batching_vertex:hp,begin_vertex:dp,beginnormal_vertex:up,bsdfs:fp,iridescence_fragment:pp,bumpmap_pars_fragment:mp,clipping_planes_fragment:gp,clipping_planes_pars_fragment:vp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:xp,color_fragment:Ep,color_pars_fragment:Mp,color_pars_vertex:Sp,color_vertex:yp,common:wp,cube_uv_reflection_fragment:Tp,defaultnormal_vertex:bp,displacementmap_pars_vertex:Ap,displacementmap_vertex:Cp,emissivemap_fragment:Rp,emissivemap_pars_fragment:Pp,colorspace_fragment:Lp,colorspace_pars_fragment:Dp,envmap_fragment:Ip,envmap_common_pars_fragment:Up,envmap_pars_fragment:Np,envmap_pars_vertex:Op,envmap_physical_pars_fragment:qp,envmap_vertex:Fp,fog_vertex:Bp,fog_pars_vertex:zp,fog_fragment:kp,fog_pars_fragment:Hp,gradientmap_pars_fragment:Vp,lightmap_pars_fragment:Gp,lights_lambert_fragment:Wp,lights_lambert_pars_fragment:Xp,lights_pars_begin:Yp,lights_toon_fragment:$p,lights_toon_pars_fragment:Zp,lights_phong_fragment:jp,lights_phong_pars_fragment:Kp,lights_physical_fragment:Jp,lights_physical_pars_fragment:Qp,lights_fragment_begin:em,lights_fragment_maps:tm,lights_fragment_end:nm,logdepthbuf_fragment:im,logdepthbuf_pars_fragment:sm,logdepthbuf_pars_vertex:rm,logdepthbuf_vertex:am,map_fragment:om,map_pars_fragment:lm,map_particle_fragment:cm,map_particle_pars_fragment:hm,metalnessmap_fragment:dm,metalnessmap_pars_fragment:um,morphinstance_vertex:fm,morphcolor_vertex:pm,morphnormal_vertex:mm,morphtarget_pars_vertex:gm,morphtarget_vertex:vm,normal_fragment_begin:_m,normal_fragment_maps:xm,normal_pars_fragment:Em,normal_pars_vertex:Mm,normal_vertex:Sm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:wm,clearcoat_normal_fragment_maps:Tm,clearcoat_pars_fragment:bm,iridescence_pars_fragment:Am,opaque_fragment:Cm,packing:Rm,premultiplied_alpha_fragment:Pm,project_vertex:Lm,dithering_fragment:Dm,dithering_pars_fragment:Im,roughnessmap_fragment:Um,roughnessmap_pars_fragment:Nm,shadowmap_pars_fragment:Om,shadowmap_pars_vertex:Fm,shadowmap_vertex:Bm,shadowmask_pars_fragment:zm,skinbase_vertex:km,skinning_pars_vertex:Hm,skinning_vertex:Vm,skinnormal_vertex:Gm,specularmap_fragment:Wm,specularmap_pars_fragment:Xm,tonemapping_fragment:Ym,tonemapping_pars_fragment:qm,transmission_fragment:$m,transmission_pars_fragment:Zm,uv_pars_fragment:jm,uv_pars_vertex:Km,uv_vertex:Jm,worldpos_vertex:Qm,background_vert:eg,background_frag:tg,backgroundCube_vert:ng,backgroundCube_frag:ig,cube_vert:sg,cube_frag:rg,depth_vert:ag,depth_frag:og,distanceRGBA_vert:lg,distanceRGBA_frag:cg,equirect_vert:hg,equirect_frag:dg,linedashed_vert:ug,linedashed_frag:fg,meshbasic_vert:pg,meshbasic_frag:mg,meshlambert_vert:gg,meshlambert_frag:vg,meshmatcap_vert:_g,meshmatcap_frag:xg,meshnormal_vert:Eg,meshnormal_frag:Mg,meshphong_vert:Sg,meshphong_frag:yg,meshphysical_vert:wg,meshphysical_frag:Tg,meshtoon_vert:bg,meshtoon_frag:Ag,points_vert:Cg,points_frag:Rg,shadow_vert:Pg,shadow_frag:Lg,sprite_vert:Dg,sprite_frag:Ig},se={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},ln={basic:{uniforms:At([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:At([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:At([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:At([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:At([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:At([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:At([se.points,se.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:At([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:At([se.common,se.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:At([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:At([se.sprite,se.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:At([se.common,se.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:At([se.lights,se.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};ln.physical={uniforms:At([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const $s={r:0,b:0,g:0},Qn=new fn,Ug=new it;function Ng(n,e,t,i,s,r,a){const o=new Ke(0);let c=r===!0?0:1,l,h,u=null,p=0,m=null;function v(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?t:e).get(E)),E}function _(w){let E=!1;const R=v(w);R===null?d(o,c):R&&R.isColor&&(d(R,1),E=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(w,E){const R=v(E);R&&(R.isCubeTexture||R.mapping===gr)?(h===void 0&&(h=new Yt(new Ss(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:ki(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,L,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Qn.copy(E.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(Qn)),h.material.toneMapped=Ve.getTransfer(R.colorSpace)!==Ze,(u!==R||p!==R.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=R,p=R.version,m=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Yt(new _r(2,2),new Gn({name:"BackgroundMaterial",uniforms:ki(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ve.getTransfer(R.colorSpace)!==Ze,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||p!==R.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,u=R,p=R.version,m=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function d(w,E){w.getRGB($s,Mc(n)),i.buffers.color.setClear($s.r,$s.g,$s.b,E,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,E=1){o.set(w),c=E,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,d(o,c)},render:_,addToRenderList:f,dispose:b}}function Og(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,a=!1;function o(M,A,Y,H,V){let Z=!1;const X=u(H,Y,A);r!==X&&(r=X,l(r.object)),Z=m(M,H,Y,V),Z&&v(M,H,Y,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,E(M,A,Y,H),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,A,Y){const H=Y.wireframe===!0;let V=i[M.id];V===void 0&&(V={},i[M.id]=V);let Z=V[A.id];Z===void 0&&(Z={},V[A.id]=Z);let X=Z[H];return X===void 0&&(X=p(c()),Z[H]=X),X}function p(M){const A=[],Y=[],H=[];for(let V=0;V<t;V++)A[V]=0,Y[V]=0,H[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:Y,attributeDivisors:H,object:M,attributes:{},index:null}}function m(M,A,Y,H){const V=r.attributes,Z=A.attributes;let X=0;const ee=Y.getAttributes();for(const z in ee)if(ee[z].location>=0){const he=V[z];let Me=Z[z];if(Me===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(Me=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(Me=M.instanceColor)),he===void 0||he.attribute!==Me||Me&&he.data!==Me.data)return!0;X++}return r.attributesNum!==X||r.index!==H}function v(M,A,Y,H){const V={},Z=A.attributes;let X=0;const ee=Y.getAttributes();for(const z in ee)if(ee[z].location>=0){let he=Z[z];he===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));const Me={};Me.attribute=he,he&&he.data&&(Me.data=he.data),V[z]=Me,X++}r.attributes=V,r.attributesNum=X,r.index=H}function _(){const M=r.newAttributes;for(let A=0,Y=M.length;A<Y;A++)M[A]=0}function f(M){d(M,0)}function d(M,A){const Y=r.newAttributes,H=r.enabledAttributes,V=r.attributeDivisors;Y[M]=1,H[M]===0&&(n.enableVertexAttribArray(M),H[M]=1),V[M]!==A&&(n.vertexAttribDivisor(M,A),V[M]=A)}function b(){const M=r.newAttributes,A=r.enabledAttributes;for(let Y=0,H=A.length;Y<H;Y++)A[Y]!==M[Y]&&(n.disableVertexAttribArray(Y),A[Y]=0)}function w(M,A,Y,H,V,Z,X){X===!0?n.vertexAttribIPointer(M,A,Y,V,Z):n.vertexAttribPointer(M,A,Y,H,V,Z)}function E(M,A,Y,H){_();const V=H.attributes,Z=Y.getAttributes(),X=A.defaultAttributeValues;for(const ee in Z){const z=Z[ee];if(z.location>=0){let re=V[ee];if(re===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(re=M.instanceColor)),re!==void 0){const he=re.normalized,Me=re.itemSize,Oe=e.get(re);if(Oe===void 0)continue;const st=Oe.buffer,Je=Oe.type,W=Oe.bytesPerElement,ae=Je===n.INT||Je===n.UNSIGNED_INT||re.gpuType===lo;if(re.isInterleavedBufferAttribute){const ne=re.data,be=ne.stride,Ae=re.offset;if(ne.isInstancedInterleavedBuffer){for(let Le=0;Le<z.locationSize;Le++)d(z.location+Le,ne.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Le=0;Le<z.locationSize;Le++)f(z.location+Le);n.bindBuffer(n.ARRAY_BUFFER,st);for(let Le=0;Le<z.locationSize;Le++)w(z.location+Le,Me/z.locationSize,Je,he,be*W,(Ae+Me/z.locationSize*Le)*W,ae)}else{if(re.isInstancedBufferAttribute){for(let ne=0;ne<z.locationSize;ne++)d(z.location+ne,re.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ne=0;ne<z.locationSize;ne++)f(z.location+ne);n.bindBuffer(n.ARRAY_BUFFER,st);for(let ne=0;ne<z.locationSize;ne++)w(z.location+ne,Me/z.locationSize,Je,he,Me*W,Me/z.locationSize*ne*W,ae)}}else if(X!==void 0){const he=X[ee];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(z.location,he);break;case 3:n.vertexAttrib3fv(z.location,he);break;case 4:n.vertexAttrib4fv(z.location,he);break;default:n.vertexAttrib1fv(z.location,he)}}}}b()}function R(){U();for(const M in i){const A=i[M];for(const Y in A){const H=A[Y];for(const V in H)h(H[V].object),delete H[V];delete A[Y]}delete i[M]}}function C(M){if(i[M.id]===void 0)return;const A=i[M.id];for(const Y in A){const H=A[Y];for(const V in H)h(H[V].object),delete H[V];delete A[Y]}delete i[M.id]}function L(M){for(const A in i){const Y=i[A];if(Y[M.id]===void 0)continue;const H=Y[M.id];for(const V in H)h(H[V].object),delete H[V];delete Y[M.id]}}function U(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:f,disableUnusedAttributes:b}}function Fg(n,e,t){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function a(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v];t.update(m,i,1)}function c(l,h,u,p){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<l.length;v++)a(l[v],h[v],p[v]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,p,0,u);let v=0;for(let _=0;_<u;_++)v+=h[_]*p[_];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Bg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Qt&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const U=L===Es&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==bn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==yn&&!U)}function c(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=v>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:E,vertexTextures:R,maxSamples:C}}function zg(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ti,o=new Ue,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||i!==0||s;return s=p,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=h(u,p,0)},this.setState=function(u,p,m){const v=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,d=n.get(u);if(!s||v===null||v.length===0||r&&!f)r?h(null):l();else{const b=r?0:i,w=b*4;let E=d.clippingState||null;c.value=E,E=h(v,p,w,m);for(let R=0;R!==w;++R)E[R]=t[R];d.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,p,m,v){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=c.value,v!==!0||f===null){const d=m+_*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(f===null||f.length<d)&&(f=new Float32Array(d));for(let w=0,E=m;w!==_;++w,E+=4)a.copy(u[w]).applyMatrix4(b,o),a.normal.toArray(f,E),f[E+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}}function kg(n){let e=new WeakMap;function t(a,o){return o===_a?a.mapping=Bi:o===xa&&(a.mapping=zi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===_a||o===xa)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Bf(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Li=4,ml=[.125,.215,.35,.446,.526,.582],si=20,ea=new jf,gl=new Ke;let ta=null,na=0,ia=0,sa=!1;const ni=(1+Math.sqrt(5))/2,Ti=1/ni,vl=[new O(-ni,Ti,0),new O(ni,Ti,0),new O(-Ti,0,ni),new O(Ti,0,ni),new O(0,ni,-Ti),new O(0,ni,Ti),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Hg=new O;class _l{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Hg}=r;ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=El(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ta,na,ia),this._renderer.xr.enabled=sa,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Es,format:Qt,colorSpace:oi,depthBuffer:!1},s=xl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xl(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vg(r)),this._blurMaterial=Gg(r,e,t)}return s}_compileMaterial(e){const t=new Yt(this._lodPlanes[0],e);this._renderer.compile(t,ea)}_sceneToCubeUV(e,t,i,s,r){const c=new zt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(gl),u.toneMapping=On,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new Ms({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),f=new Yt(new Ss,_);let d=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,d=!0):(_.color.copy(gl),d=!0);for(let w=0;w<6;w++){const E=w%3;E===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):E===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));const R=this._cubeSize;Zs(s,E*R,w>2?R:0,R,R),u.setRenderTarget(s),d&&u.render(f,c),u.render(e,c)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=m,u.autoClear=p,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Bi||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=El());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Yt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Zs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,ea)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vl[(s-r-1)%vl.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Yt(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*si-1),_=r/v,f=isFinite(r)?1+Math.floor(h*_):si;f>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${si}`);const d=[];let b=0;for(let L=0;L<si;++L){const U=L/_,S=Math.exp(-U*U/2);d.push(S),L===0?b+=S:L<f&&(b+=2*S)}for(let L=0;L<d.length;L++)d[L]=d[L]/b;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:w}=this;p.dTheta.value=v,p.mipInt.value=w-i;const E=this._sizeLods[s],R=3*E*(s>w-Li?s-w+Li:0),C=4*(this._cubeSize-E);Zs(t,R,C,3*E,2*E),c.setRenderTarget(t),c.render(u,ea)}}function Vg(n){const e=[],t=[],i=[];let s=n;const r=n-Li+1+ml.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-Li?c=ml[a-n+Li-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,u=1+l,p=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,v=6,_=3,f=2,d=1,b=new Float32Array(_*v*m),w=new Float32Array(f*v*m),E=new Float32Array(d*v*m);for(let C=0;C<m;C++){const L=C%3*2/3-1,U=C>2?0:-1,S=[L,U,0,L+2/3,U,0,L+2/3,U+1,0,L,U,0,L+2/3,U+1,0,L,U+1,0];b.set(S,_*v*C),w.set(p,f*v*C);const M=[C,C,C,C,C,C];E.set(M,d*v*C)}const R=new Xn;R.setAttribute("position",new dn(b,_)),R.setAttribute("uv",new dn(w,f)),R.setAttribute("faceIndex",new dn(E,d)),e.push(R),s>Li&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function xl(n,e,t){const i=new Vn(n,e,t);return i.texture.mapping=gr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Gg(n,e,t){const i=new Float32Array(si),s=new O(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function El(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Ml(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wg(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===_a||c===xa,h=c===Bi||c===zi;if(l||h){let u=e.get(o);const p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new _l(n)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new _l(n)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Xg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ui("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Yg(n,e,t,i){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const v in p.attributes)e.remove(p.attributes[v]);p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function c(u){const p=u.attributes;for(const m in p)e.update(p[m],n.ARRAY_BUFFER)}function l(u){const p=[],m=u.index,v=u.attributes.position;let _=0;if(m!==null){const b=m.array;_=m.version;for(let w=0,E=b.length;w<E;w+=3){const R=b[w+0],C=b[w+1],L=b[w+2];p.push(R,C,C,L,L,R)}}else if(v!==void 0){const b=v.array;_=v.version;for(let w=0,E=b.length/3-1;w<E;w+=3){const R=w+0,C=w+1,L=w+2;p.push(R,C,C,L,L,R)}}else return;const f=new(mc(p)?Ec:xc)(p,1);f.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,f)}function h(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function qg(n,e,t){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,m){n.drawElements(i,m,r,p*a),t.update(m,i,1)}function l(p,m,v){v!==0&&(n.drawElementsInstanced(i,m,r,p*a,v),t.update(m,i,v))}function h(p,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,p,0,v);let f=0;for(let d=0;d<v;d++)f+=m[d];t.update(f,i,1)}function u(p,m,v,_){if(v===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)l(p[d]/a,m[d],_[d]);else{f.multiDrawElementsInstancedWEBGL(i,m,0,r,p,0,_,0,v);let d=0;for(let b=0;b<v;b++)d+=m[b]*_[b];t.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function $g(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Zg(n,e,t){const i=new WeakMap,s=new dt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let p=i.get(o);if(p===void 0||p.count!==u){let S=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",S)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let w=0;m===!0&&(w=1),v===!0&&(w=2),_===!0&&(w=3);let E=o.attributes.position.count*w,R=1;E>e.maxTextureSize&&(R=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*R*4*u),L=new gc(C,E,R,u);L.type=yn,L.needsUpdate=!0;const U=w*4;for(let M=0;M<u;M++){const A=f[M],Y=d[M],H=b[M],V=E*R*4*M;for(let Z=0;Z<A.count;Z++){const X=Z*U;m===!0&&(s.fromBufferAttribute(A,Z),C[V+X+0]=s.x,C[V+X+1]=s.y,C[V+X+2]=s.z,C[V+X+3]=0),v===!0&&(s.fromBufferAttribute(Y,Z),C[V+X+4]=s.x,C[V+X+5]=s.y,C[V+X+6]=s.z,C[V+X+7]=0),_===!0&&(s.fromBufferAttribute(H,Z),C[V+X+8]=s.x,C[V+X+9]=s.y,C[V+X+10]=s.z,C[V+X+11]=H.itemSize===4?s.w:1)}}p={count:u,texture:L,size:new Ye(E,R)},i.set(o,p),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let _=0;_<l.length;_++)m+=l[_];const v=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function jg(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const bc=new Rt,Sl=new wc(1,1),Ac=new gc,Cc=new Mf,Rc=new yc,yl=[],wl=[],Tl=new Float32Array(16),bl=new Float32Array(9),Al=new Float32Array(4);function Xi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=yl[s];if(r===void 0&&(r=new Float32Array(s),yl[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function xr(n,e){let t=wl[e];t===void 0&&(t=new Int32Array(e),wl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Kg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function Qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function tv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Al.set(i),n.uniformMatrix2fv(this.addr,!1,Al),mt(t,i)}}function nv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;bl.set(i),n.uniformMatrix3fv(this.addr,!1,bl),mt(t,i)}}function iv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),mt(t,i)}}function sv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function lv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function uv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Sl.compareFunction=pc,r=Sl):r=bc,t.setTexture2D(e||r,s)}function fv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Cc,s)}function pv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Rc,s)}function mv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Ac,s)}function gv(n){switch(n){case 5126:return Kg;case 35664:return Jg;case 35665:return Qg;case 35666:return ev;case 35674:return tv;case 35675:return nv;case 35676:return iv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return av;case 35669:case 35673:return ov;case 5125:return lv;case 36294:return cv;case 36295:return hv;case 36296:return dv;case 35678:case 36198:case 36298:case 36306:case 35682:return uv;case 35679:case 36299:case 36307:return fv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}function vv(n,e){n.uniform1fv(this.addr,e)}function _v(n,e){const t=Xi(e,this.size,2);n.uniform2fv(this.addr,t)}function xv(n,e){const t=Xi(e,this.size,3);n.uniform3fv(this.addr,t)}function Ev(n,e){const t=Xi(e,this.size,4);n.uniform4fv(this.addr,t)}function Mv(n,e){const t=Xi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Sv(n,e){const t=Xi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function yv(n,e){const t=Xi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function wv(n,e){n.uniform1iv(this.addr,e)}function Tv(n,e){n.uniform2iv(this.addr,e)}function bv(n,e){n.uniform3iv(this.addr,e)}function Av(n,e){n.uniform4iv(this.addr,e)}function Cv(n,e){n.uniform1uiv(this.addr,e)}function Rv(n,e){n.uniform2uiv(this.addr,e)}function Pv(n,e){n.uniform3uiv(this.addr,e)}function Lv(n,e){n.uniform4uiv(this.addr,e)}function Dv(n,e,t){const i=this.cache,s=e.length,r=xr(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||bc,r[a])}function Iv(n,e,t){const i=this.cache,s=e.length,r=xr(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Cc,r[a])}function Uv(n,e,t){const i=this.cache,s=e.length,r=xr(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Rc,r[a])}function Nv(n,e,t){const i=this.cache,s=e.length,r=xr(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ac,r[a])}function Ov(n){switch(n){case 5126:return vv;case 35664:return _v;case 35665:return xv;case 35666:return Ev;case 35674:return Mv;case 35675:return Sv;case 35676:return yv;case 5124:case 35670:return wv;case 35667:case 35671:return Tv;case 35668:case 35672:return bv;case 35669:case 35673:return Av;case 5125:return Cv;case 36294:return Rv;case 36295:return Pv;case 36296:return Lv;case 35678:case 36198:case 36298:case 36306:case 35682:return Dv;case 35679:case 36299:case 36307:return Iv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return Nv}}class Fv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gv(t.type)}}class Bv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ov(t.type)}}class zv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Cl(n,e){n.seq.push(e),n.map[e.id]=e}function kv(n,e,t){const i=n.name,s=i.length;for(ra.lastIndex=0;;){const r=ra.exec(i),a=ra.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Cl(t,l===void 0?new Fv(o,n,e):new Bv(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new zv(o),Cl(t,u)),t=u}}}class sr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);kv(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Rl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Hv=37297;let Vv=0;function Gv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Pl=new Ue;function Wv(n){Ve._getMatrix(Pl,Ve.workingColorSpace,n);const e=`mat3( ${Pl.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(n)){case or:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ll(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Gv(n.getShaderSource(e),o)}else return r}function Xv(n,e){const t=Wv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Yv(n,e){let t;switch(e){case sc:t="Linear";break;case Iu:t="Reinhard";break;case Uu:t="Cineon";break;case Nu:t="ACESFilmic";break;case Fu:t="AgX";break;case Bu:t="Neutral";break;case Ou:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const js=new O;function qv(){Ve.getLuminanceCoefficients(js);const n=js.x.toFixed(4),e=js.y.toFixed(4),t=js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $v(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qi).join(`
`)}function Zv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function jv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Qi(n){return n!==""}function Dl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Il(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ja(n){return n.replace(Kv,Qv)}const Jv=new Map;function Qv(n,e){let t=Ne[e];if(t===void 0){const i=Jv.get(e);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ja(t)}const e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(n){return n.replace(e_,t_)}function t_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function n_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===nc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===uu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Mn&&(e="SHADOWMAP_TYPE_VSM"),e}function i_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Bi:case zi:e="ENVMAP_TYPE_CUBE";break;case gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function s_(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===zi&&(e="ENVMAP_MODE_REFRACTION"),e}function r_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ic:e="ENVMAP_BLENDING_MULTIPLY";break;case Lu:e="ENVMAP_BLENDING_MIX";break;case Du:e="ENVMAP_BLENDING_ADD";break}return e}function a_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function o_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=n_(t),l=i_(t),h=s_(t),u=r_(t),p=a_(t),m=$v(t),v=Zv(r),_=s.createProgram();let f,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Qi).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Qi).join(`
`),d.length>0&&(d+=`
`)):(f=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qi).join(`
`),d=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Ne.tonemapping_pars_fragment:"",t.toneMapping!==On?Yv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Xv("linearToOutputTexel",t.outputColorSpace),qv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qi).join(`
`)),a=ja(a),a=Dl(a,t),a=Il(a,t),o=ja(o),o=Dl(o,t),o=Il(o,t),a=Ul(a),o=Ul(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=b+f+a,E=b+d+o,R=Rl(s,s.VERTEX_SHADER,w),C=Rl(s,s.FRAGMENT_SHADER,E);s.attachShader(_,R),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function L(A){if(n.debug.checkShaderErrors){const Y=s.getProgramInfoLog(_)||"",H=s.getShaderInfoLog(R)||"",V=s.getShaderInfoLog(C)||"",Z=Y.trim(),X=H.trim(),ee=V.trim();let z=!0,re=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,R,C);else{const he=Ll(s,R,"vertex"),Me=Ll(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+Z+`
`+he+`
`+Me)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(X===""||ee==="")&&(re=!1);re&&(A.diagnostics={runnable:z,programLog:Z,vertexShader:{log:X,prefix:f},fragmentShader:{log:ee,prefix:d}})}s.deleteShader(R),s.deleteShader(C),U=new sr(s,_),S=jv(s,_)}let U;this.getUniforms=function(){return U===void 0&&L(this),U};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Hv)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}let l_=0;class c_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new h_(e),t.set(e,i)),i}}class h_{constructor(e){this.id=l_++,this.code=e,this.usedTimes=0}}function d_(n,e,t,i,s,r,a){const o=new _o,c=new c_,l=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function f(S,M,A,Y,H){const V=Y.fog,Z=H.geometry,X=S.isMeshStandardMaterial?Y.environment:null,ee=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),z=ee&&ee.mapping===gr?ee.image.height:null,re=v[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const he=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Me=he!==void 0?he.length:0;let Oe=0;Z.morphAttributes.position!==void 0&&(Oe=1),Z.morphAttributes.normal!==void 0&&(Oe=2),Z.morphAttributes.color!==void 0&&(Oe=3);let st,Je,W,ae;if(re){const Xe=ln[re];st=Xe.vertexShader,Je=Xe.fragmentShader}else st=S.vertexShader,Je=S.fragmentShader,c.update(S),W=c.getVertexShaderID(S),ae=c.getFragmentShaderID(S);const ne=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ae=H.isInstancedMesh===!0,Le=H.isBatchedMesh===!0,ct=!!S.map,He=!!S.matcap,T=!!ee,et=!!S.aoMap,ye=!!S.lightMap,We=!!S.bumpMap,Ee=!!S.normalMap,rt=!!S.displacementMap,fe=!!S.emissiveMap,Fe=!!S.metalnessMap,gt=!!S.roughnessMap,ht=S.anisotropy>0,y=S.clearcoat>0,g=S.dispersion>0,N=S.iridescence>0,G=S.sheen>0,$=S.transmission>0,k=ht&&!!S.anisotropyMap,xe=y&&!!S.clearcoatMap,te=y&&!!S.clearcoatNormalMap,ge=y&&!!S.clearcoatRoughnessMap,ve=N&&!!S.iridescenceMap,J=N&&!!S.iridescenceThicknessMap,ce=G&&!!S.sheenColorMap,Re=G&&!!S.sheenRoughnessMap,_e=!!S.specularMap,oe=!!S.specularColorMap,Ie=!!S.specularIntensityMap,P=$&&!!S.transmissionMap,Q=$&&!!S.thicknessMap,ie=!!S.gradientMap,ue=!!S.alphaMap,j=S.alphaTest>0,q=!!S.alphaHash,me=!!S.extensions;let De=On;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(De=n.toneMapping);const tt={shaderID:re,shaderType:S.type,shaderName:S.name,vertexShader:st,fragmentShader:Je,defines:S.defines,customVertexShaderID:W,customFragmentShaderID:ae,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Le,batchingColor:Le&&H._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&H.instanceColor!==null,instancingMorph:Ae&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:oi,alphaToCoverage:!!S.alphaToCoverage,map:ct,matcap:He,envMap:T,envMapMode:T&&ee.mapping,envMapCubeUVHeight:z,aoMap:et,lightMap:ye,bumpMap:We,normalMap:Ee,displacementMap:p&&rt,emissiveMap:fe,normalMapObjectSpace:Ee&&S.normalMapType===Gu,normalMapTangentSpace:Ee&&S.normalMapType===Vu,metalnessMap:Fe,roughnessMap:gt,anisotropy:ht,anisotropyMap:k,clearcoat:y,clearcoatMap:xe,clearcoatNormalMap:te,clearcoatRoughnessMap:ge,dispersion:g,iridescence:N,iridescenceMap:ve,iridescenceThicknessMap:J,sheen:G,sheenColorMap:ce,sheenRoughnessMap:Re,specularMap:_e,specularColorMap:oe,specularIntensityMap:Ie,transmission:$,transmissionMap:P,thicknessMap:Q,gradientMap:ie,opaque:S.transparent===!1&&S.blending===Ii&&S.alphaToCoverage===!1,alphaMap:ue,alphaTest:j,alphaHash:q,combine:S.combine,mapUv:ct&&_(S.map.channel),aoMapUv:et&&_(S.aoMap.channel),lightMapUv:ye&&_(S.lightMap.channel),bumpMapUv:We&&_(S.bumpMap.channel),normalMapUv:Ee&&_(S.normalMap.channel),displacementMapUv:rt&&_(S.displacementMap.channel),emissiveMapUv:fe&&_(S.emissiveMap.channel),metalnessMapUv:Fe&&_(S.metalnessMap.channel),roughnessMapUv:gt&&_(S.roughnessMap.channel),anisotropyMapUv:k&&_(S.anisotropyMap.channel),clearcoatMapUv:xe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(S.sheenRoughnessMap.channel),specularMapUv:_e&&_(S.specularMap.channel),specularColorMapUv:oe&&_(S.specularColorMap.channel),specularIntensityMapUv:Ie&&_(S.specularIntensityMap.channel),transmissionMapUv:P&&_(S.transmissionMap.channel),thicknessMapUv:Q&&_(S.thicknessMap.channel),alphaMapUv:ue&&_(S.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Ee||ht),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(ct||ue),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Oe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:ct&&S.map.isVideoTexture===!0&&Ve.getTransfer(S.map.colorSpace)===Ze,decodeVideoTextureEmissive:fe&&S.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(S.emissiveMap.colorSpace)===Ze,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Sn,flipSided:S.side===Dt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:me&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&S.extensions.multiDraw===!0||Le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return tt.vertexUv1s=l.has(1),tt.vertexUv2s=l.has(2),tt.vertexUv3s=l.has(3),l.clear(),tt}function d(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)M.push(A),M.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(b(M,S),w(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function w(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function E(S){const M=v[S.type];let A;if(M){const Y=ln[M];A=Uf.clone(Y.uniforms)}else A=S.uniforms;return A}function R(S,M){let A;for(let Y=0,H=h.length;Y<H;Y++){const V=h[Y];if(V.cacheKey===M){A=V,++A.usedTimes;break}}return A===void 0&&(A=new o_(n,M,S,r),h.push(A)),A}function C(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function L(S){c.remove(S)}function U(){c.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:E,acquireProgram:R,releaseProgram:C,releaseShaderCache:L,programs:h,dispose:U}}function u_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function f_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ol(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Fl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,p,m,v,_,f){let d=n[e];return d===void 0?(d={id:u.id,object:u,geometry:p,material:m,groupOrder:v,renderOrder:u.renderOrder,z:_,group:f},n[e]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=m,d.groupOrder=v,d.renderOrder=u.renderOrder,d.z=_,d.group=f),e++,d}function o(u,p,m,v,_,f){const d=a(u,p,m,v,_,f);m.transmission>0?i.push(d):m.transparent===!0?s.push(d):t.push(d)}function c(u,p,m,v,_,f){const d=a(u,p,m,v,_,f);m.transmission>0?i.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,p){t.length>1&&t.sort(u||f_),i.length>1&&i.sort(p||Ol),s.length>1&&s.sort(p||Ol)}function h(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function p_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Fl,n.set(i,[a])):s>=r.length?(a=new Fl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function m_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ke};break;case"SpotLight":t={position:new O,direction:new O,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function g_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let v_=0;function __(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function x_(n){const e=new m_,t=g_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const s=new O,r=new it,a=new it;function o(l){let h=0,u=0,p=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,v=0,_=0,f=0,d=0,b=0,w=0,E=0,R=0,C=0,L=0;l.sort(__);for(let S=0,M=l.length;S<M;S++){const A=l[S],Y=A.color,H=A.intensity,V=A.distance,Z=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=Y.r*H,u+=Y.g*H,p+=Y.b*H;else if(A.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(A.sh.coefficients[X],H);L++}else if(A.isDirectionalLight){const X=e.get(A);if(X.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const ee=A.shadow,z=t.get(A);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,i.directionalShadow[m]=z,i.directionalShadowMap[m]=Z,i.directionalShadowMatrix[m]=A.shadow.matrix,b++}i.directional[m]=X,m++}else if(A.isSpotLight){const X=e.get(A);X.position.setFromMatrixPosition(A.matrixWorld),X.color.copy(Y).multiplyScalar(H),X.distance=V,X.coneCos=Math.cos(A.angle),X.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),X.decay=A.decay,i.spot[_]=X;const ee=A.shadow;if(A.map&&(i.spotLightMap[R]=A.map,R++,ee.updateMatrices(A),A.castShadow&&C++),i.spotLightMatrix[_]=ee.matrix,A.castShadow){const z=t.get(A);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,i.spotShadow[_]=z,i.spotShadowMap[_]=Z,E++}_++}else if(A.isRectAreaLight){const X=e.get(A);X.color.copy(Y).multiplyScalar(H),X.halfWidth.set(A.width*.5,0,0),X.halfHeight.set(0,A.height*.5,0),i.rectArea[f]=X,f++}else if(A.isPointLight){const X=e.get(A);if(X.color.copy(A.color).multiplyScalar(A.intensity),X.distance=A.distance,X.decay=A.decay,A.castShadow){const ee=A.shadow,z=t.get(A);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,z.shadowCameraNear=ee.camera.near,z.shadowCameraFar=ee.camera.far,i.pointShadow[v]=z,i.pointShadowMap[v]=Z,i.pointShadowMatrix[v]=A.shadow.matrix,w++}i.point[v]=X,v++}else if(A.isHemisphereLight){const X=e.get(A);X.skyColor.copy(A.color).multiplyScalar(H),X.groundColor.copy(A.groundColor).multiplyScalar(H),i.hemi[d]=X,d++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=p;const U=i.hash;(U.directionalLength!==m||U.pointLength!==v||U.spotLength!==_||U.rectAreaLength!==f||U.hemiLength!==d||U.numDirectionalShadows!==b||U.numPointShadows!==w||U.numSpotShadows!==E||U.numSpotMaps!==R||U.numLightProbes!==L)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=f,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,U.directionalLength=m,U.pointLength=v,U.spotLength=_,U.rectAreaLength=f,U.hemiLength=d,U.numDirectionalShadows=b,U.numPointShadows=w,U.numSpotShadows=E,U.numSpotMaps=R,U.numLightProbes=L,i.version=v_++)}function c(l,h){let u=0,p=0,m=0,v=0,_=0;const f=h.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const w=l[d];if(w.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),u++}else if(w.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),m++}else if(w.isRectAreaLight){const E=i.rectArea[v];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),a.identity(),r.copy(w.matrixWorld),r.premultiply(f),a.extractRotation(r),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(w.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),p++}else if(w.isHemisphereLight){const E=i.hemi[_];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(f),_++}}}return{setup:o,setupView:c,state:i}}function Bl(n){const e=new x_(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function E_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Bl(n),e.set(s,[o])):r>=a.length?(o=new Bl(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const M_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,S_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function y_(n,e,t){let i=new xo;const s=new Ye,r=new Ye,a=new dt,o=new Gf({depthPacking:Hu}),c=new Wf,l={},h=t.maxTextureSize,u={[Hn]:Dt,[Dt]:Hn,[Sn]:Sn},p=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:M_,fragmentShader:S_}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const v=new Xn;v.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Yt(v,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let d=this.type;this.render=function(C,L,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;const S=n.getRenderTarget(),M=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(Nn),Y.buffers.depth.getReversed()?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const H=d!==Mn&&this.type===Mn,V=d===Mn&&this.type!==Mn;for(let Z=0,X=C.length;Z<X;Z++){const ee=C[Z],z=ee.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const re=z.getFrameExtents();if(s.multiply(re),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,z.mapSize.y=r.y)),z.map===null||H===!0||V===!0){const Me=this.type!==Mn?{minFilter:en,magFilter:en}:{};z.map!==null&&z.map.dispose(),z.map=new Vn(s.x,s.y,Me),z.map.texture.name=ee.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const he=z.getViewportCount();for(let Me=0;Me<he;Me++){const Oe=z.getViewport(Me);a.set(r.x*Oe.x,r.y*Oe.y,r.x*Oe.z,r.y*Oe.w),Y.viewport(a),z.updateMatrices(ee,Me),i=z.getFrustum(),E(L,U,z.camera,ee,this.type)}z.isPointLightShadow!==!0&&this.type===Mn&&b(z,U),z.needsUpdate=!1}d=this.type,f.needsUpdate=!1,n.setRenderTarget(S,M,A)};function b(C,L){const U=e.update(_);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Vn(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(L,null,U,p,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(L,null,U,m,_,null)}function w(C,L,U,S){let M=null;const A=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(A!==void 0)M=A;else if(M=U.isPointLight===!0?c:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const Y=M.uuid,H=L.uuid;let V=l[Y];V===void 0&&(V={},l[Y]=V);let Z=V[H];Z===void 0&&(Z=M.clone(),V[H]=Z,L.addEventListener("dispose",R)),M=Z}if(M.visible=L.visible,M.wireframe=L.wireframe,S===Mn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:u[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const Y=n.properties.get(M);Y.light=U}return M}function E(C,L,U,S,M){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Mn)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const H=e.update(C),V=C.material;if(Array.isArray(V)){const Z=H.groups;for(let X=0,ee=Z.length;X<ee;X++){const z=Z[X],re=V[z.materialIndex];if(re&&re.visible){const he=w(C,re,S,M);C.onBeforeShadow(n,C,L,U,H,he,z),n.renderBufferDirect(U,null,H,he,C,z),C.onAfterShadow(n,C,L,U,H,he,z)}}}else if(V.visible){const Z=w(C,V,S,M);C.onBeforeShadow(n,C,L,U,H,Z,null),n.renderBufferDirect(U,null,H,Z,C,null),C.onAfterShadow(n,C,L,U,H,Z,null)}}const Y=C.children;for(let H=0,V=Y.length;H<V;H++)E(Y[H],L,U,S,M)}function R(C){C.target.removeEventListener("dispose",R);for(const U in l){const S=l[U],M=C.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const w_={[da]:ua,[fa]:ga,[pa]:va,[Fi]:ma,[ua]:da,[ga]:fa,[va]:pa,[ma]:Fi};function T_(n,e){function t(){let P=!1;const Q=new dt;let ie=null;const ue=new dt(0,0,0,0);return{setMask:function(j){ie!==j&&!P&&(n.colorMask(j,j,j,j),ie=j)},setLocked:function(j){P=j},setClear:function(j,q,me,De,tt){tt===!0&&(j*=De,q*=De,me*=De),Q.set(j,q,me,De),ue.equals(Q)===!1&&(n.clearColor(j,q,me,De),ue.copy(Q))},reset:function(){P=!1,ie=null,ue.set(-1,0,0,0)}}}function i(){let P=!1,Q=!1,ie=null,ue=null,j=null;return{setReversed:function(q){if(Q!==q){const me=e.get("EXT_clip_control");q?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),Q=q;const De=j;j=null,this.setClear(De)}},getReversed:function(){return Q},setTest:function(q){q?ne(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(q){ie!==q&&!P&&(n.depthMask(q),ie=q)},setFunc:function(q){if(Q&&(q=w_[q]),ue!==q){switch(q){case da:n.depthFunc(n.NEVER);break;case ua:n.depthFunc(n.ALWAYS);break;case fa:n.depthFunc(n.LESS);break;case Fi:n.depthFunc(n.LEQUAL);break;case pa:n.depthFunc(n.EQUAL);break;case ma:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=q}},setLocked:function(q){P=q},setClear:function(q){j!==q&&(Q&&(q=1-q),n.clearDepth(q),j=q)},reset:function(){P=!1,ie=null,ue=null,j=null,Q=!1}}}function s(){let P=!1,Q=null,ie=null,ue=null,j=null,q=null,me=null,De=null,tt=null;return{setTest:function(Xe){P||(Xe?ne(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(Xe){Q!==Xe&&!P&&(n.stencilMask(Xe),Q=Xe)},setFunc:function(Xe,pn,nn){(ie!==Xe||ue!==pn||j!==nn)&&(n.stencilFunc(Xe,pn,nn),ie=Xe,ue=pn,j=nn)},setOp:function(Xe,pn,nn){(q!==Xe||me!==pn||De!==nn)&&(n.stencilOp(Xe,pn,nn),q=Xe,me=pn,De=nn)},setLocked:function(Xe){P=Xe},setClear:function(Xe){tt!==Xe&&(n.clearStencil(Xe),tt=Xe)},reset:function(){P=!1,Q=null,ie=null,ue=null,j=null,q=null,me=null,De=null,tt=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},p=new WeakMap,m=[],v=null,_=!1,f=null,d=null,b=null,w=null,E=null,R=null,C=null,L=new Ke(0,0,0),U=0,S=!1,M=null,A=null,Y=null,H=null,V=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ee=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(z)[1]),X=ee>=1):z.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),X=ee>=2);let re=null,he={};const Me=n.getParameter(n.SCISSOR_BOX),Oe=n.getParameter(n.VIEWPORT),st=new dt().fromArray(Me),Je=new dt().fromArray(Oe);function W(P,Q,ie,ue){const j=new Uint8Array(4),q=n.createTexture();n.bindTexture(P,q),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let me=0;me<ie;me++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(Q,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,j):n.texImage2D(Q+me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,j);return q}const ae={};ae[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(Fi),We(!1),Ee(Ho),ne(n.CULL_FACE),et(Nn);function ne(P){h[P]!==!0&&(n.enable(P),h[P]=!0)}function be(P){h[P]!==!1&&(n.disable(P),h[P]=!1)}function Ae(P,Q){return u[P]!==Q?(n.bindFramebuffer(P,Q),u[P]=Q,P===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Q),P===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Q),!0):!1}function Le(P,Q){let ie=m,ue=!1;if(P){ie=p.get(Q),ie===void 0&&(ie=[],p.set(Q,ie));const j=P.textures;if(ie.length!==j.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let q=0,me=j.length;q<me;q++)ie[q]=n.COLOR_ATTACHMENT0+q;ie.length=j.length,ue=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,ue=!0);ue&&n.drawBuffers(ie)}function ct(P){return v!==P?(n.useProgram(P),v=P,!0):!1}const He={[ii]:n.FUNC_ADD,[pu]:n.FUNC_SUBTRACT,[mu]:n.FUNC_REVERSE_SUBTRACT};He[gu]=n.MIN,He[vu]=n.MAX;const T={[_u]:n.ZERO,[xu]:n.ONE,[Eu]:n.SRC_COLOR,[ca]:n.SRC_ALPHA,[bu]:n.SRC_ALPHA_SATURATE,[wu]:n.DST_COLOR,[Su]:n.DST_ALPHA,[Mu]:n.ONE_MINUS_SRC_COLOR,[ha]:n.ONE_MINUS_SRC_ALPHA,[Tu]:n.ONE_MINUS_DST_COLOR,[yu]:n.ONE_MINUS_DST_ALPHA,[Au]:n.CONSTANT_COLOR,[Cu]:n.ONE_MINUS_CONSTANT_COLOR,[Ru]:n.CONSTANT_ALPHA,[Pu]:n.ONE_MINUS_CONSTANT_ALPHA};function et(P,Q,ie,ue,j,q,me,De,tt,Xe){if(P===Nn){_===!0&&(be(n.BLEND),_=!1);return}if(_===!1&&(ne(n.BLEND),_=!0),P!==fu){if(P!==f||Xe!==S){if((d!==ii||E!==ii)&&(n.blendEquation(n.FUNC_ADD),d=ii,E=ii),Xe)switch(P){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vo:n.blendFunc(n.ONE,n.ONE);break;case Go:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Go:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,w=null,R=null,C=null,L.set(0,0,0),U=0,f=P,S=Xe}return}j=j||Q,q=q||ie,me=me||ue,(Q!==d||j!==E)&&(n.blendEquationSeparate(He[Q],He[j]),d=Q,E=j),(ie!==b||ue!==w||q!==R||me!==C)&&(n.blendFuncSeparate(T[ie],T[ue],T[q],T[me]),b=ie,w=ue,R=q,C=me),(De.equals(L)===!1||tt!==U)&&(n.blendColor(De.r,De.g,De.b,tt),L.copy(De),U=tt),f=P,S=!1}function ye(P,Q){P.side===Sn?be(n.CULL_FACE):ne(n.CULL_FACE);let ie=P.side===Dt;Q&&(ie=!ie),We(ie),P.blending===Ii&&P.transparent===!1?et(Nn):et(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const ue=P.stencilWrite;o.setTest(ue),ue&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),fe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(P){M!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),M=P)}function Ee(P){P!==hu?(ne(n.CULL_FACE),P!==A&&(P===Ho?n.cullFace(n.BACK):P===du?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),A=P}function rt(P){P!==Y&&(X&&n.lineWidth(P),Y=P)}function fe(P,Q,ie){P?(ne(n.POLYGON_OFFSET_FILL),(H!==Q||V!==ie)&&(n.polygonOffset(Q,ie),H=Q,V=ie)):be(n.POLYGON_OFFSET_FILL)}function Fe(P){P?ne(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function gt(P){P===void 0&&(P=n.TEXTURE0+Z-1),re!==P&&(n.activeTexture(P),re=P)}function ht(P,Q,ie){ie===void 0&&(re===null?ie=n.TEXTURE0+Z-1:ie=re);let ue=he[ie];ue===void 0&&(ue={type:void 0,texture:void 0},he[ie]=ue),(ue.type!==P||ue.texture!==Q)&&(re!==ie&&(n.activeTexture(ie),re=ie),n.bindTexture(P,Q||ae[P]),ue.type=P,ue.texture=Q)}function y(){const P=he[re];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function g(){try{n.compressedTexImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function G(){try{n.texSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{n.texSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{n.compressedTexSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function te(){try{n.texStorage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ge(){try{n.texStorage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(){try{n.texImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{n.texImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(P){st.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),st.copy(P))}function Re(P){Je.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Je.copy(P))}function _e(P,Q){let ie=l.get(Q);ie===void 0&&(ie=new WeakMap,l.set(Q,ie));let ue=ie.get(P);ue===void 0&&(ue=n.getUniformBlockIndex(Q,P.name),ie.set(P,ue))}function oe(P,Q){const ue=l.get(Q).get(P);c.get(Q)!==ue&&(n.uniformBlockBinding(Q,ue,P.__bindingPointIndex),c.set(Q,ue))}function Ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},re=null,he={},u={},p=new WeakMap,m=[],v=null,_=!1,f=null,d=null,b=null,w=null,E=null,R=null,C=null,L=new Ke(0,0,0),U=0,S=!1,M=null,A=null,Y=null,H=null,V=null,st.set(0,0,n.canvas.width,n.canvas.height),Je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:be,bindFramebuffer:Ae,drawBuffers:Le,useProgram:ct,setBlending:et,setMaterial:ye,setFlipSided:We,setCullFace:Ee,setLineWidth:rt,setPolygonOffset:fe,setScissorTest:Fe,activeTexture:gt,bindTexture:ht,unbindTexture:y,compressedTexImage2D:g,compressedTexImage3D:N,texImage2D:ve,texImage3D:J,updateUBOMapping:_e,uniformBlockBinding:oe,texStorage2D:te,texStorage3D:ge,texSubImage2D:G,texSubImage3D:$,compressedTexSubImage2D:k,compressedTexSubImage3D:xe,scissor:ce,viewport:Re,reset:Ie}}function b_(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ye,h=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(y,g){return m?new OffscreenCanvas(y,g):_s("canvas")}function _(y,g,N){let G=1;const $=ht(y);if(($.width>N||$.height>N)&&(G=N/Math.max($.width,$.height)),G<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const k=Math.floor(G*$.width),xe=Math.floor(G*$.height);u===void 0&&(u=v(k,xe));const te=g?v(k,xe):u;return te.width=k,te.height=xe,te.getContext("2d").drawImage(y,0,0,k,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+k+"x"+xe+")."),te}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),y;return y}function f(y){return y.generateMipmaps}function d(y){n.generateMipmap(y)}function b(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(y,g,N,G,$=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let k=g;if(g===n.RED&&(N===n.FLOAT&&(k=n.R32F),N===n.HALF_FLOAT&&(k=n.R16F),N===n.UNSIGNED_BYTE&&(k=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(k=n.R8UI),N===n.UNSIGNED_SHORT&&(k=n.R16UI),N===n.UNSIGNED_INT&&(k=n.R32UI),N===n.BYTE&&(k=n.R8I),N===n.SHORT&&(k=n.R16I),N===n.INT&&(k=n.R32I)),g===n.RG&&(N===n.FLOAT&&(k=n.RG32F),N===n.HALF_FLOAT&&(k=n.RG16F),N===n.UNSIGNED_BYTE&&(k=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(k=n.RG8UI),N===n.UNSIGNED_SHORT&&(k=n.RG16UI),N===n.UNSIGNED_INT&&(k=n.RG32UI),N===n.BYTE&&(k=n.RG8I),N===n.SHORT&&(k=n.RG16I),N===n.INT&&(k=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(k=n.RGB8UI),N===n.UNSIGNED_SHORT&&(k=n.RGB16UI),N===n.UNSIGNED_INT&&(k=n.RGB32UI),N===n.BYTE&&(k=n.RGB8I),N===n.SHORT&&(k=n.RGB16I),N===n.INT&&(k=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(k=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(k=n.RGBA16UI),N===n.UNSIGNED_INT&&(k=n.RGBA32UI),N===n.BYTE&&(k=n.RGBA8I),N===n.SHORT&&(k=n.RGBA16I),N===n.INT&&(k=n.RGBA32I)),g===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(k=n.RGB9_E5),g===n.RGBA){const xe=$?or:Ve.getTransfer(G);N===n.FLOAT&&(k=n.RGBA32F),N===n.HALF_FLOAT&&(k=n.RGBA16F),N===n.UNSIGNED_BYTE&&(k=xe===Ze?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(k=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(k=n.RGB5_A1)}return(k===n.R16F||k===n.R32F||k===n.RG16F||k===n.RG32F||k===n.RGBA16F||k===n.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function E(y,g){let N;return y?g===null||g===ai||g===ps?N=n.DEPTH24_STENCIL8:g===yn?N=n.DEPTH32F_STENCIL8:g===fs&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ai||g===ps?N=n.DEPTH_COMPONENT24:g===yn?N=n.DEPTH_COMPONENT32F:g===fs&&(N=n.DEPTH_COMPONENT16),N}function R(y,g){return f(y)===!0||y.isFramebufferTexture&&y.minFilter!==en&&y.minFilter!==Jt?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function C(y){const g=y.target;g.removeEventListener("dispose",C),U(g),g.isVideoTexture&&h.delete(g)}function L(y){const g=y.target;g.removeEventListener("dispose",L),M(g)}function U(y){const g=i.get(y);if(g.__webglInit===void 0)return;const N=y.source,G=p.get(N);if(G){const $=G[g.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(y),Object.keys(G).length===0&&p.delete(N)}i.remove(y)}function S(y){const g=i.get(y);n.deleteTexture(g.__webglTexture);const N=y.source,G=p.get(N);delete G[g.__cacheKey],a.memory.textures--}function M(y){const g=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(g.__webglFramebuffer[G]))for(let $=0;$<g.__webglFramebuffer[G].length;$++)n.deleteFramebuffer(g.__webglFramebuffer[G][$]);else n.deleteFramebuffer(g.__webglFramebuffer[G]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[G])}else{if(Array.isArray(g.__webglFramebuffer))for(let G=0;G<g.__webglFramebuffer.length;G++)n.deleteFramebuffer(g.__webglFramebuffer[G]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let G=0;G<g.__webglColorRenderbuffer.length;G++)g.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[G]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=y.textures;for(let G=0,$=N.length;G<$;G++){const k=i.get(N[G]);k.__webglTexture&&(n.deleteTexture(k.__webglTexture),a.memory.textures--),i.remove(N[G])}i.remove(y)}let A=0;function Y(){A=0}function H(){const y=A;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),A+=1,y}function V(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function Z(y,g){const N=i.get(y);if(y.isVideoTexture&&Fe(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&N.__version!==y.version){const G=y.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(N,y,g);return}}else y.isExternalTexture&&(N.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function X(y,g){const N=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){ae(N,y,g);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function ee(y,g){const N=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){ae(N,y,g);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function z(y,g){const N=i.get(y);if(y.version>0&&N.__version!==y.version){ne(N,y,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const re={[Ea]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[Ma]:n.MIRRORED_REPEAT},he={[en]:n.NEAREST,[zu]:n.NEAREST_MIPMAP_NEAREST,[Ps]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[Lr]:n.LINEAR_MIPMAP_NEAREST,[Un]:n.LINEAR_MIPMAP_LINEAR},Me={[Wu]:n.NEVER,[ju]:n.ALWAYS,[Xu]:n.LESS,[pc]:n.LEQUAL,[Yu]:n.EQUAL,[Zu]:n.GEQUAL,[qu]:n.GREATER,[$u]:n.NOTEQUAL};function Oe(y,g){if(g.type===yn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Jt||g.magFilter===Lr||g.magFilter===Ps||g.magFilter===Un||g.minFilter===Jt||g.minFilter===Lr||g.minFilter===Ps||g.minFilter===Un)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,re[g.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,re[g.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,re[g.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,he[g.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,he[g.minFilter]),g.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Me[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===en||g.minFilter!==Ps&&g.minFilter!==Un||g.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function st(y,g){let N=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",C));const G=g.source;let $=p.get(G);$===void 0&&($={},p.set(G,$));const k=V(g);if(k!==y.__cacheKey){$[k]===void 0&&($[k]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),$[k].usedTimes++;const xe=$[y.__cacheKey];xe!==void 0&&($[y.__cacheKey].usedTimes--,xe.usedTimes===0&&S(g)),y.__cacheKey=k,y.__webglTexture=$[k].texture}return N}function Je(y,g,N){return Math.floor(Math.floor(y/N)/g)}function W(y,g,N,G){const k=y.updateRanges;if(k.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,N,G,g.data);else{k.sort((J,ce)=>J.start-ce.start);let xe=0;for(let J=1;J<k.length;J++){const ce=k[xe],Re=k[J],_e=ce.start+ce.count,oe=Je(Re.start,g.width,4),Ie=Je(ce.start,g.width,4);Re.start<=_e+1&&oe===Ie&&Je(Re.start+Re.count-1,g.width,4)===oe?ce.count=Math.max(ce.count,Re.start+Re.count-ce.start):(++xe,k[xe]=Re)}k.length=xe+1;const te=n.getParameter(n.UNPACK_ROW_LENGTH),ge=n.getParameter(n.UNPACK_SKIP_PIXELS),ve=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let J=0,ce=k.length;J<ce;J++){const Re=k[J],_e=Math.floor(Re.start/4),oe=Math.ceil(Re.count/4),Ie=_e%g.width,P=Math.floor(_e/g.width),Q=oe,ie=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,P),t.texSubImage2D(n.TEXTURE_2D,0,Ie,P,Q,ie,N,G,g.data)}y.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,te),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,ve)}}function ae(y,g,N){let G=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(G=n.TEXTURE_3D);const $=st(y,g),k=g.source;t.bindTexture(G,y.__webglTexture,n.TEXTURE0+N);const xe=i.get(k);if(k.version!==xe.__version||$===!0){t.activeTexture(n.TEXTURE0+N);const te=Ve.getPrimaries(Ve.workingColorSpace),ge=g.colorSpace===In?null:Ve.getPrimaries(g.colorSpace),ve=g.colorSpace===In||te===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let J=_(g.image,!1,s.maxTextureSize);J=gt(g,J);const ce=r.convert(g.format,g.colorSpace),Re=r.convert(g.type);let _e=w(g.internalFormat,ce,Re,g.colorSpace,g.isVideoTexture);Oe(G,g);let oe;const Ie=g.mipmaps,P=g.isVideoTexture!==!0,Q=xe.__version===void 0||$===!0,ie=k.dataReady,ue=R(g,J);if(g.isDepthTexture)_e=E(g.format===gs,g.type),Q&&(P?t.texStorage2D(n.TEXTURE_2D,1,_e,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,_e,J.width,J.height,0,ce,Re,null));else if(g.isDataTexture)if(Ie.length>0){P&&Q&&t.texStorage2D(n.TEXTURE_2D,ue,_e,Ie[0].width,Ie[0].height);for(let j=0,q=Ie.length;j<q;j++)oe=Ie[j],P?ie&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Re,oe.data):t.texImage2D(n.TEXTURE_2D,j,_e,oe.width,oe.height,0,ce,Re,oe.data);g.generateMipmaps=!1}else P?(Q&&t.texStorage2D(n.TEXTURE_2D,ue,_e,J.width,J.height),ie&&W(g,J,ce,Re)):t.texImage2D(n.TEXTURE_2D,0,_e,J.width,J.height,0,ce,Re,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){P&&Q&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,_e,Ie[0].width,Ie[0].height,J.depth);for(let j=0,q=Ie.length;j<q;j++)if(oe=Ie[j],g.format!==Qt)if(ce!==null)if(P){if(ie)if(g.layerUpdates.size>0){const me=pl(oe.width,oe.height,g.format,g.type);for(const De of g.layerUpdates){const tt=oe.data.subarray(De*me/oe.data.BYTES_PER_ELEMENT,(De+1)*me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,De,oe.width,oe.height,1,ce,tt)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ce,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,_e,oe.width,oe.height,J.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ce,Re,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,_e,oe.width,oe.height,J.depth,0,ce,Re,oe.data)}else{P&&Q&&t.texStorage2D(n.TEXTURE_2D,ue,_e,Ie[0].width,Ie[0].height);for(let j=0,q=Ie.length;j<q;j++)oe=Ie[j],g.format!==Qt?ce!==null?P?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,j,_e,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?ie&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Re,oe.data):t.texImage2D(n.TEXTURE_2D,j,_e,oe.width,oe.height,0,ce,Re,oe.data)}else if(g.isDataArrayTexture)if(P){if(Q&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,_e,J.width,J.height,J.depth),ie)if(g.layerUpdates.size>0){const j=pl(J.width,J.height,g.format,g.type);for(const q of g.layerUpdates){const me=J.data.subarray(q*j/J.data.BYTES_PER_ELEMENT,(q+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,q,J.width,J.height,1,ce,Re,me)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ce,Re,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,_e,J.width,J.height,J.depth,0,ce,Re,J.data);else if(g.isData3DTexture)P?(Q&&t.texStorage3D(n.TEXTURE_3D,ue,_e,J.width,J.height,J.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ce,Re,J.data)):t.texImage3D(n.TEXTURE_3D,0,_e,J.width,J.height,J.depth,0,ce,Re,J.data);else if(g.isFramebufferTexture){if(Q)if(P)t.texStorage2D(n.TEXTURE_2D,ue,_e,J.width,J.height);else{let j=J.width,q=J.height;for(let me=0;me<ue;me++)t.texImage2D(n.TEXTURE_2D,me,_e,j,q,0,ce,Re,null),j>>=1,q>>=1}}else if(Ie.length>0){if(P&&Q){const j=ht(Ie[0]);t.texStorage2D(n.TEXTURE_2D,ue,_e,j.width,j.height)}for(let j=0,q=Ie.length;j<q;j++)oe=Ie[j],P?ie&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,ce,Re,oe):t.texImage2D(n.TEXTURE_2D,j,_e,ce,Re,oe);g.generateMipmaps=!1}else if(P){if(Q){const j=ht(J);t.texStorage2D(n.TEXTURE_2D,ue,_e,j.width,j.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce,Re,J)}else t.texImage2D(n.TEXTURE_2D,0,_e,ce,Re,J);f(g)&&d(G),xe.__version=k.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function ne(y,g,N){if(g.image.length!==6)return;const G=st(y,g),$=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+N);const k=i.get($);if($.version!==k.__version||G===!0){t.activeTexture(n.TEXTURE0+N);const xe=Ve.getPrimaries(Ve.workingColorSpace),te=g.colorSpace===In?null:Ve.getPrimaries(g.colorSpace),ge=g.colorSpace===In||xe===te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const ve=g.isCompressedTexture||g.image[0].isCompressedTexture,J=g.image[0]&&g.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!ve&&!J?ce[q]=_(g.image[q],!0,s.maxCubemapSize):ce[q]=J?g.image[q].image:g.image[q],ce[q]=gt(g,ce[q]);const Re=ce[0],_e=r.convert(g.format,g.colorSpace),oe=r.convert(g.type),Ie=w(g.internalFormat,_e,oe,g.colorSpace),P=g.isVideoTexture!==!0,Q=k.__version===void 0||G===!0,ie=$.dataReady;let ue=R(g,Re);Oe(n.TEXTURE_CUBE_MAP,g);let j;if(ve){P&&Q&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Ie,Re.width,Re.height);for(let q=0;q<6;q++){j=ce[q].mipmaps;for(let me=0;me<j.length;me++){const De=j[me];g.format!==Qt?_e!==null?P?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,De.width,De.height,_e,De.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Ie,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,De.width,De.height,_e,oe,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Ie,De.width,De.height,0,_e,oe,De.data)}}}else{if(j=g.mipmaps,P&&Q){j.length>0&&ue++;const q=ht(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Ie,q.width,q.height)}for(let q=0;q<6;q++)if(J){P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,_e,oe,ce[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ie,ce[q].width,ce[q].height,0,_e,oe,ce[q].data);for(let me=0;me<j.length;me++){const tt=j[me].image[q].image;P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,tt.width,tt.height,_e,oe,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Ie,tt.width,tt.height,0,_e,oe,tt.data)}}else{P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,_e,oe,ce[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ie,_e,oe,ce[q]);for(let me=0;me<j.length;me++){const De=j[me];P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,_e,oe,De.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Ie,_e,oe,De.image[q])}}}f(g)&&d(n.TEXTURE_CUBE_MAP),k.__version=$.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function be(y,g,N,G,$,k){const xe=r.convert(N.format,N.colorSpace),te=r.convert(N.type),ge=w(N.internalFormat,xe,te,N.colorSpace),ve=i.get(g),J=i.get(N);if(J.__renderTarget=g,!ve.__hasExternalTextures){const ce=Math.max(1,g.width>>k),Re=Math.max(1,g.height>>k);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,k,ge,ce,Re,g.depth,0,xe,te,null):t.texImage2D($,k,ge,ce,Re,0,xe,te,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,$,J.__webglTexture,0,rt(g)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,$,J.__webglTexture,k),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(y,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,y),g.depthBuffer){const G=g.depthTexture,$=G&&G.isDepthTexture?G.type:null,k=E(g.stencilBuffer,$),xe=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=rt(g);fe(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,k,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,k,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,k,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,y)}else{const G=g.textures;for(let $=0;$<G.length;$++){const k=G[$],xe=r.convert(k.format,k.colorSpace),te=r.convert(k.type),ge=w(k.internalFormat,xe,te,k.colorSpace),ve=rt(g);N&&fe(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,ge,g.width,g.height):fe(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,ge,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ge,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(g.depthTexture);G.__renderTarget=g,(!G.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Z(g.depthTexture,0);const $=G.__webglTexture,k=rt(g);if(g.depthTexture.format===ms)fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(g.depthTexture.format===gs)fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function ct(y){const g=i.get(y),N=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){const G=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),G){const $=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,G.removeEventListener("dispose",$)};G.addEventListener("dispose",$),g.__depthDisposeCallback=$}g.__boundDepthTexture=G}if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const G=y.texture.mipmaps;G&&G.length>0?Le(g.__webglFramebuffer[0],y):Le(g.__webglFramebuffer,y)}else if(N){g.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[G]),g.__webglDepthbuffer[G]===void 0)g.__webglDepthbuffer[G]=n.createRenderbuffer(),Ae(g.__webglDepthbuffer[G],y,!1);else{const $=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=g.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,k)}}else{const G=y.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Ae(g.__webglDepthbuffer,y,!1);else{const $=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,k)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(y,g,N){const G=i.get(y);g!==void 0&&be(G.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&ct(y)}function T(y){const g=y.texture,N=i.get(y),G=i.get(g);y.addEventListener("dispose",L);const $=y.textures,k=y.isWebGLCubeRenderTarget===!0,xe=$.length>1;if(xe||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=g.version,a.memory.textures++),k){N.__webglFramebuffer=[];for(let te=0;te<6;te++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[te]=[];for(let ge=0;ge<g.mipmaps.length;ge++)N.__webglFramebuffer[te][ge]=n.createFramebuffer()}else N.__webglFramebuffer[te]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let te=0;te<g.mipmaps.length;te++)N.__webglFramebuffer[te]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(xe)for(let te=0,ge=$.length;te<ge;te++){const ve=i.get($[te]);ve.__webglTexture===void 0&&(ve.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&fe(y)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let te=0;te<$.length;te++){const ge=$[te];N.__webglColorRenderbuffer[te]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[te]);const ve=r.convert(ge.format,ge.colorSpace),J=r.convert(ge.type),ce=w(ge.internalFormat,ve,J,ge.colorSpace,y.isXRRenderTarget===!0),Re=rt(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ce,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+te,n.RENDERBUFFER,N.__webglColorRenderbuffer[te])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(N.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(k){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,g);for(let te=0;te<6;te++)if(g.mipmaps&&g.mipmaps.length>0)for(let ge=0;ge<g.mipmaps.length;ge++)be(N.__webglFramebuffer[te][ge],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ge);else be(N.__webglFramebuffer[te],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);f(g)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let te=0,ge=$.length;te<ge;te++){const ve=$[te],J=i.get(ve);let ce=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ce=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,J.__webglTexture),Oe(ce,ve),be(N.__webglFramebuffer,y,ve,n.COLOR_ATTACHMENT0+te,ce,0),f(ve)&&d(ce)}t.unbindTexture()}else{let te=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(te=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,G.__webglTexture),Oe(te,g),g.mipmaps&&g.mipmaps.length>0)for(let ge=0;ge<g.mipmaps.length;ge++)be(N.__webglFramebuffer[ge],y,g,n.COLOR_ATTACHMENT0,te,ge);else be(N.__webglFramebuffer,y,g,n.COLOR_ATTACHMENT0,te,0);f(g)&&d(te),t.unbindTexture()}y.depthBuffer&&ct(y)}function et(y){const g=y.textures;for(let N=0,G=g.length;N<G;N++){const $=g[N];if(f($)){const k=b(y),xe=i.get($).__webglTexture;t.bindTexture(k,xe),d(k),t.unbindTexture()}}}const ye=[],We=[];function Ee(y){if(y.samples>0){if(fe(y)===!1){const g=y.textures,N=y.width,G=y.height;let $=n.COLOR_BUFFER_BIT;const k=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(y),te=g.length>1;if(te)for(let ve=0;ve<g.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const ge=y.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let ve=0;ve<g.length;ve++){if(y.resolveDepthBuffer&&(y.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),te){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[ve]);const J=i.get(g[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,N,G,0,0,N,G,$,n.NEAREST),c===!0&&(ye.length=0,We.length=0,ye.push(n.COLOR_ATTACHMENT0+ve),y.depthBuffer&&y.resolveDepthBuffer===!1&&(ye.push(k),We.push(k),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,We)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ye))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),te)for(let ve=0;ve<g.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,xe.__webglColorRenderbuffer[ve]);const J=i.get(g[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const g=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function rt(y){return Math.min(s.maxSamples,y.samples)}function fe(y){const g=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Fe(y){const g=a.render.frame;h.get(y)!==g&&(h.set(y,g),y.update())}function gt(y,g){const N=y.colorSpace,G=y.format,$=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||N!==oi&&N!==In&&(Ve.getTransfer(N)===Ze?(G!==Qt||$!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function ht(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=Y,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=ee,this.setTextureCube=z,this.rebindTextures=He,this.setupRenderTarget=T,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=be,this.useMultisampledRTT=fe}function A_(n,e){function t(i,s=In){let r;const a=Ve.getTransfer(s);if(i===bn)return n.UNSIGNED_BYTE;if(i===co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ho)return n.UNSIGNED_SHORT_5_5_5_1;if(i===lc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ac)return n.BYTE;if(i===oc)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===lo)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===yn)return n.FLOAT;if(i===Es)return n.HALF_FLOAT;if(i===cc)return n.ALPHA;if(i===hc)return n.RGB;if(i===Qt)return n.RGBA;if(i===ms)return n.DEPTH_COMPONENT;if(i===gs)return n.DEPTH_STENCIL;if(i===dc)return n.RED;if(i===uo)return n.RED_INTEGER;if(i===uc)return n.RG;if(i===fo)return n.RG_INTEGER;if(i===po)return n.RGBA_INTEGER;if(i===Qs||i===er||i===tr||i===nr)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===er)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sa||i===ya||i===wa||i===Ta)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ba||i===Aa||i===Ca)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ba||i===Aa)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ca)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ra||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Oa||i===Fa||i===Ba||i===za||i===ka||i===Ha||i===Va)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ra)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Pa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===La)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Da)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ia)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ua)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Na)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Oa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ba)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===za)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ka)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ha)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Va)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ir||i===Ga||i===Wa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ir)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fc||i===Xa||i===Ya||i===qa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ir)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Pc extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const C_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class P_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Pc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Gn({vertexShader:C_,fragmentShader:R_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yt(new _r(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class L_ extends Vi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,p=null,m=null,v=null;const _=new P_,f={},d=t.getContextAttributes();let b=null,w=null;const E=[],R=[],C=new Ye;let L=null;const U=new zt;U.viewport=new dt;const S=new zt;S.viewport=new dt;const M=[U,S],A=new Kf;let Y=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ae=E[W];return ae===void 0&&(ae=new Jr,E[W]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(W){let ae=E[W];return ae===void 0&&(ae=new Jr,E[W]=ae),ae.getGripSpace()},this.getHand=function(W){let ae=E[W];return ae===void 0&&(ae=new Jr,E[W]=ae),ae.getHandSpace()};function V(W){const ae=R.indexOf(W.inputSource);if(ae===-1)return;const ne=E[ae];ne!==void 0&&(ne.update(W.inputSource,W.frame,l||a),ne.dispatchEvent({type:W.type,data:W.inputSource}))}function Z(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",X);for(let W=0;W<E.length;W++){const ae=R[W];ae!==null&&(R[W]=null,E[W].disconnect(ae))}Y=null,H=null,_.reset();for(const W in f)delete f[W];e.setRenderTarget(b),m=null,p=null,u=null,s=null,w=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",X),d.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(C),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(s,t)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,be=null,Ae=null;d.depth&&(Ae=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=d.stencil?gs:ms,be=d.stencil?ps:ai);const Le={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};p=u.createProjectionLayer(Le),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),w=new Vn(p.textureWidth,p.textureHeight,{format:Qt,type:bn,depthTexture:new wc(p.textureWidth,p.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ne={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new Vn(m.framebufferWidth,m.framebufferHeight,{format:Qt,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Je.setContext(s),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(W){for(let ae=0;ae<W.removed.length;ae++){const ne=W.removed[ae],be=R.indexOf(ne);be>=0&&(R[be]=null,E[be].disconnect(ne))}for(let ae=0;ae<W.added.length;ae++){const ne=W.added[ae];let be=R.indexOf(ne);if(be===-1){for(let Le=0;Le<E.length;Le++)if(Le>=R.length){R.push(ne),be=Le;break}else if(R[Le]===null){R[Le]=ne,be=Le;break}if(be===-1)break}const Ae=E[be];Ae&&Ae.connect(ne)}}const ee=new O,z=new O;function re(W,ae,ne){ee.setFromMatrixPosition(ae.matrixWorld),z.setFromMatrixPosition(ne.matrixWorld);const be=ee.distanceTo(z),Ae=ae.projectionMatrix.elements,Le=ne.projectionMatrix.elements,ct=Ae[14]/(Ae[10]-1),He=Ae[14]/(Ae[10]+1),T=(Ae[9]+1)/Ae[5],et=(Ae[9]-1)/Ae[5],ye=(Ae[8]-1)/Ae[0],We=(Le[8]+1)/Le[0],Ee=ct*ye,rt=ct*We,fe=be/(-ye+We),Fe=fe*-ye;if(ae.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Fe),W.translateZ(fe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ae[10]===-1)W.projectionMatrix.copy(ae.projectionMatrix),W.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const gt=ct+fe,ht=He+fe,y=Ee-Fe,g=rt+(be-Fe),N=T*He/ht*gt,G=et*He/ht*gt;W.projectionMatrix.makePerspective(y,g,N,G,gt,ht),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function he(W,ae){ae===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ae.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let ae=W.near,ne=W.far;_.texture!==null&&(_.depthNear>0&&(ae=_.depthNear),_.depthFar>0&&(ne=_.depthFar)),A.near=S.near=U.near=ae,A.far=S.far=U.far=ne,(Y!==A.near||H!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),Y=A.near,H=A.far),A.layers.mask=W.layers.mask|6,U.layers.mask=A.layers.mask&3,S.layers.mask=A.layers.mask&5;const be=W.parent,Ae=A.cameras;he(A,be);for(let Le=0;Le<Ae.length;Le++)he(Ae[Le],be);Ae.length===2?re(A,U,S):A.projectionMatrix.copy(U.projectionMatrix),Me(W,A,be)};function Me(W,ae,ne){ne===null?W.matrix.copy(ae.matrixWorld):(W.matrix.copy(ne.matrixWorld),W.matrix.invert(),W.matrix.multiply(ae.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ae.projectionMatrix),W.projectionMatrixInverse.copy(ae.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=vs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(W){c=W,p!==null&&(p.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(W){return f[W]};let Oe=null;function st(W,ae){if(h=ae.getViewerPose(l||a),v=ae,h!==null){const ne=h.views;m!==null&&(e.setRenderTargetFramebuffer(w,m.framebuffer),e.setRenderTarget(w));let be=!1;ne.length!==A.cameras.length&&(A.cameras.length=0,be=!0);for(let He=0;He<ne.length;He++){const T=ne[He];let et=null;if(m!==null)et=m.getViewport(T);else{const We=u.getViewSubImage(p,T);et=We.viewport,He===0&&(e.setRenderTargetTextures(w,We.colorTexture,We.depthStencilTexture),e.setRenderTarget(w))}let ye=M[He];ye===void 0&&(ye=new zt,ye.layers.enable(He),ye.viewport=new dt,M[He]=ye),ye.matrix.fromArray(T.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(T.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(et.x,et.y,et.width,et.height),He===0&&(A.matrix.copy(ye.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),be===!0&&A.cameras.push(ye)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const He=u.getDepthInformation(ne[0]);He&&He.isValid&&He.texture&&_.init(He,s.renderState)}if(Ae&&Ae.includes("camera-access")&&(e.state.unbindTexture(),u))for(let He=0;He<ne.length;He++){const T=ne[He].camera;if(T){let et=f[T];et||(et=new Pc,f[T]=et);const ye=u.getCameraImage(T);et.sourceTexture=ye}}}for(let ne=0;ne<E.length;ne++){const be=R[ne],Ae=E[ne];be!==null&&Ae!==void 0&&Ae.update(be,ae,l||a)}Oe&&Oe(W,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),v=null}const Je=new Tc;Je.setAnimationLoop(st),this.setAnimationLoop=function(W){Oe=W},this.dispose=function(){}}}const ei=new fn,D_=new it;function I_(n,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function i(f,d){d.color.getRGB(f.fogColor.value,Mc(n)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,b,w,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),u(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,E)):d.isMeshMatcapMaterial?(r(f,d),v(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),_(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,b,w):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Dt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Dt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const b=e.get(d),w=b.envMap,E=b.envMapRotation;w&&(f.envMap.value=w,ei.copy(E),ei.x*=-1,ei.y*=-1,ei.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),f.envMapRotation.value.setFromMatrix4(D_.makeRotationFromEuler(ei)),f.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,b,w){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*b,f.scale.value=w*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,b){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Dt&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=b.texture,f.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function v(f,d){d.matcap&&(f.matcap.value=d.matcap)}function _(f,d){const b=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(b.matrixWorld),f.nearDistance.value=b.shadow.camera.near,f.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function U_(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){const E=w.program;i.uniformBlockBinding(b,E)}function l(b,w){let E=s[b.id];E===void 0&&(v(b),E=h(b),s[b.id]=E,b.addEventListener("dispose",f));const R=w.program;i.updateUBOMapping(b,R);const C=e.render.frame;r[b.id]!==C&&(p(b),r[b.id]=C)}function h(b){const w=u();b.__bindingPointIndex=w;const E=n.createBuffer(),R=b.__size,C=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const w=s[b.id],E=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,L=E.length;C<L;C++){const U=Array.isArray(E[C])?E[C]:[E[C]];for(let S=0,M=U.length;S<M;S++){const A=U[S];if(m(A,C,S,R)===!0){const Y=A.__offset,H=Array.isArray(A.value)?A.value:[A.value];let V=0;for(let Z=0;Z<H.length;Z++){const X=H[Z],ee=_(X);typeof X=="number"||typeof X=="boolean"?(A.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,Y+V,A.__data)):X.isMatrix3?(A.__data[0]=X.elements[0],A.__data[1]=X.elements[1],A.__data[2]=X.elements[2],A.__data[3]=0,A.__data[4]=X.elements[3],A.__data[5]=X.elements[4],A.__data[6]=X.elements[5],A.__data[7]=0,A.__data[8]=X.elements[6],A.__data[9]=X.elements[7],A.__data[10]=X.elements[8],A.__data[11]=0):(X.toArray(A.__data,V),V+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,w,E,R){const C=b.value,L=w+"_"+E;if(R[L]===void 0)return typeof C=="number"||typeof C=="boolean"?R[L]=C:R[L]=C.clone(),!0;{const U=R[L];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return R[L]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function v(b){const w=b.uniforms;let E=0;const R=16;for(let L=0,U=w.length;L<U;L++){const S=Array.isArray(w[L])?w[L]:[w[L]];for(let M=0,A=S.length;M<A;M++){const Y=S[M],H=Array.isArray(Y.value)?Y.value:[Y.value];for(let V=0,Z=H.length;V<Z;V++){const X=H[V],ee=_(X),z=E%R,re=z%ee.boundary,he=z+re;E+=re,he!==0&&R-he<ee.storage&&(E+=R-he),Y.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=E,E+=ee.storage}}}const C=E%R;return C>0&&(E+=R-C),b.__size=E,b.__cache={},this}function _(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function f(b){const w=b.target;w.removeEventListener("dispose",f);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function d(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}class N_{constructor(e={}){const{canvas:t=pf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const v=new Uint32Array(4),_=new Int32Array(4);let f=null,d=null;const b=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let R=!1;this._outputColorSpace=Xt;let C=0,L=0,U=null,S=-1,M=null;const A=new dt,Y=new dt;let H=null;const V=new Ke(0);let Z=0,X=t.width,ee=t.height,z=1,re=null,he=null;const Me=new dt(0,0,X,ee),Oe=new dt(0,0,X,ee);let st=!1;const Je=new xo;let W=!1,ae=!1;const ne=new it,be=new O,Ae=new dt,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function He(){return U===null?z:1}let T=i;function et(x,D){return t.getContext(x,D)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oo}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",j,!1),T===null){const D="webgl2";if(T=et(D,x),T===null)throw et(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let ye,We,Ee,rt,fe,Fe,gt,ht,y,g,N,G,$,k,xe,te,ge,ve,J,ce,Re,_e,oe,Ie;function P(){ye=new Xg(T),ye.init(),_e=new A_(T,ye),We=new Bg(T,ye,e,_e),Ee=new T_(T,ye),We.reversedDepthBuffer&&p&&Ee.buffers.depth.setReversed(!0),rt=new $g(T),fe=new u_,Fe=new b_(T,ye,Ee,fe,We,_e,rt),gt=new kg(E),ht=new Wg(E),y=new ep(T),oe=new Og(T,y),g=new Yg(T,y,rt,oe),N=new jg(T,g,y,rt),J=new Zg(T,We,Fe),te=new zg(fe),G=new d_(E,gt,ht,ye,We,oe,te),$=new I_(E,fe),k=new p_,xe=new E_(ye),ve=new Ng(E,gt,ht,Ee,N,m,c),ge=new y_(E,N,We),Ie=new U_(T,rt,We,Ee),ce=new Fg(T,ye,rt),Re=new qg(T,ye,rt),rt.programs=G.programs,E.capabilities=We,E.extensions=ye,E.properties=fe,E.renderLists=k,E.shadowMap=ge,E.state=Ee,E.info=rt}P();const Q=new L_(E,T);this.xr=Q,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const x=ye.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ye.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(x){x!==void 0&&(z=x,this.setSize(X,ee,!1))},this.getSize=function(x){return x.set(X,ee)},this.setSize=function(x,D,F=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,ee=D,t.width=Math.floor(x*z),t.height=Math.floor(D*z),F===!0&&(t.style.width=x+"px",t.style.height=D+"px"),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(X*z,ee*z).floor()},this.setDrawingBufferSize=function(x,D,F){X=x,ee=D,z=F,t.width=Math.floor(x*F),t.height=Math.floor(D*F),this.setViewport(0,0,x,D)},this.getCurrentViewport=function(x){return x.copy(A)},this.getViewport=function(x){return x.copy(Me)},this.setViewport=function(x,D,F,B){x.isVector4?Me.set(x.x,x.y,x.z,x.w):Me.set(x,D,F,B),Ee.viewport(A.copy(Me).multiplyScalar(z).round())},this.getScissor=function(x){return x.copy(Oe)},this.setScissor=function(x,D,F,B){x.isVector4?Oe.set(x.x,x.y,x.z,x.w):Oe.set(x,D,F,B),Ee.scissor(Y.copy(Oe).multiplyScalar(z).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(x){Ee.setScissorTest(st=x)},this.setOpaqueSort=function(x){re=x},this.setTransparentSort=function(x){he=x},this.getClearColor=function(x){return x.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(x=!0,D=!0,F=!0){let B=0;if(x){let I=!1;if(U!==null){const K=U.texture.format;I=K===po||K===fo||K===uo}if(I){const K=U.texture.type,le=K===bn||K===ai||K===fs||K===ps||K===co||K===ho,pe=ve.getClearColor(),de=ve.getClearAlpha(),Ce=pe.r,Pe=pe.g,Se=pe.b;le?(v[0]=Ce,v[1]=Pe,v[2]=Se,v[3]=de,T.clearBufferuiv(T.COLOR,0,v)):(_[0]=Ce,_[1]=Pe,_[2]=Se,_[3]=de,T.clearBufferiv(T.COLOR,0,_))}else B|=T.COLOR_BUFFER_BIT}D&&(B|=T.DEPTH_BUFFER_BIT),F&&(B|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",j,!1),ve.dispose(),k.dispose(),xe.dispose(),fe.dispose(),gt.dispose(),ht.dispose(),N.dispose(),oe.dispose(),Ie.dispose(),G.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",nn),Q.removeEventListener("sessionend",No),qn.stop()};function ie(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const x=rt.autoReset,D=ge.enabled,F=ge.autoUpdate,B=ge.needsUpdate,I=ge.type;P(),rt.autoReset=x,ge.enabled=D,ge.autoUpdate=F,ge.needsUpdate=B,ge.type=I}function j(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function q(x){const D=x.target;D.removeEventListener("dispose",q),me(D)}function me(x){De(x),fe.remove(x)}function De(x){const D=fe.get(x).programs;D!==void 0&&(D.forEach(function(F){G.releaseProgram(F)}),x.isShaderMaterial&&G.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,F,B,I,K){D===null&&(D=Le);const le=I.isMesh&&I.matrixWorld.determinant()<0,pe=su(x,D,F,B,I);Ee.setMaterial(B,le);let de=F.index,Ce=1;if(B.wireframe===!0){if(de=g.getWireframeAttribute(F),de===void 0)return;Ce=2}const Pe=F.drawRange,Se=F.attributes.position;let Be=Pe.start*Ce,$e=(Pe.start+Pe.count)*Ce;K!==null&&(Be=Math.max(Be,K.start*Ce),$e=Math.min($e,(K.start+K.count)*Ce)),de!==null?(Be=Math.max(Be,0),$e=Math.min($e,de.count)):Se!=null&&(Be=Math.max(Be,0),$e=Math.min($e,Se.count));const lt=$e-Be;if(lt<0||lt===1/0)return;oe.setup(I,B,pe,F,de);let nt,Qe=ce;if(de!==null&&(nt=y.get(de),Qe=Re,Qe.setIndex(nt)),I.isMesh)B.wireframe===!0?(Ee.setLineWidth(B.wireframeLinewidth*He()),Qe.setMode(T.LINES)):Qe.setMode(T.TRIANGLES);else if(I.isLine){let we=B.linewidth;we===void 0&&(we=1),Ee.setLineWidth(we*He()),I.isLineSegments?Qe.setMode(T.LINES):I.isLineLoop?Qe.setMode(T.LINE_LOOP):Qe.setMode(T.LINE_STRIP)}else I.isPoints?Qe.setMode(T.POINTS):I.isSprite&&Qe.setMode(T.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Ui("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qe.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(ye.get("WEBGL_multi_draw"))Qe.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const we=I._multiDrawStarts,at=I._multiDrawCounts,Ge=I._multiDrawCount,Ut=de?y.get(de).bytesPerElement:1,hi=fe.get(B).currentProgram.getUniforms();for(let Nt=0;Nt<Ge;Nt++)hi.setValue(T,"_gl_DrawID",Nt),Qe.render(we[Nt]/Ut,at[Nt])}else if(I.isInstancedMesh)Qe.renderInstances(Be,lt,I.count);else if(F.isInstancedBufferGeometry){const we=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,at=Math.min(F.instanceCount,we);Qe.renderInstances(Be,lt,at)}else Qe.render(Be,lt)};function tt(x,D,F){x.transparent===!0&&x.side===Sn&&x.forceSinglePass===!1?(x.side=Dt,x.needsUpdate=!0,Rs(x,D,F),x.side=Hn,x.needsUpdate=!0,Rs(x,D,F),x.side=Sn):Rs(x,D,F)}this.compile=function(x,D,F=null){F===null&&(F=x),d=xe.get(F),d.init(D),w.push(d),F.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),x!==F&&x.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const B=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const K=I.material;if(K)if(Array.isArray(K))for(let le=0;le<K.length;le++){const pe=K[le];tt(pe,F,I),B.add(pe)}else tt(K,F,I),B.add(K)}),d=w.pop(),B},this.compileAsync=function(x,D,F=null){const B=this.compile(x,D,F);return new Promise(I=>{function K(){if(B.forEach(function(le){fe.get(le).currentProgram.isReady()&&B.delete(le)}),B.size===0){I(x);return}setTimeout(K,10)}ye.get("KHR_parallel_shader_compile")!==null?K():setTimeout(K,10)})};let Xe=null;function pn(x){Xe&&Xe(x)}function nn(){qn.stop()}function No(){qn.start()}const qn=new Tc;qn.setAnimationLoop(pn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(x){Xe=x,Q.setAnimationLoop(x),x===null?qn.stop():qn.start()},Q.addEventListener("sessionstart",nn),Q.addEventListener("sessionend",No),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(D),D=Q.getCamera()),x.isScene===!0&&x.onBeforeRender(E,x,D,U),d=xe.get(x,w.length),d.init(D),w.push(d),ne.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Je.setFromProjectionMatrix(ne,cn,D.reversedDepth),ae=this.localClippingEnabled,W=te.init(this.clippingPlanes,ae),f=k.get(x,b.length),f.init(),b.push(f),Q.enabled===!0&&Q.isPresenting===!0){const K=E.xr.getDepthSensingMesh();K!==null&&Rr(K,D,-1/0,E.sortObjects)}Rr(x,D,0,E.sortObjects),f.finish(),E.sortObjects===!0&&f.sort(re,he),ct=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,ct&&ve.addToRenderList(f,x),this.info.render.frame++,W===!0&&te.beginShadows();const F=d.state.shadowsArray;ge.render(F,x,D),W===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=f.opaque,I=f.transmissive;if(d.setupLights(),D.isArrayCamera){const K=D.cameras;if(I.length>0)for(let le=0,pe=K.length;le<pe;le++){const de=K[le];Fo(B,I,x,de)}ct&&ve.render(x);for(let le=0,pe=K.length;le<pe;le++){const de=K[le];Oo(f,x,de,de.viewport)}}else I.length>0&&Fo(B,I,x,D),ct&&ve.render(x),Oo(f,x,D);U!==null&&L===0&&(Fe.updateMultisampleRenderTarget(U),Fe.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(E,x,D),oe.resetDefaultState(),S=-1,M=null,w.pop(),w.length>0?(d=w[w.length-1],W===!0&&te.setGlobalState(E.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?f=b[b.length-1]:f=null};function Rr(x,D,F,B){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Je.intersectsSprite(x)){B&&Ae.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ne);const le=N.update(x),pe=x.material;pe.visible&&f.push(x,le,pe,F,Ae.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Je.intersectsObject(x))){const le=N.update(x),pe=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ae.copy(x.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Ae.copy(le.boundingSphere.center)),Ae.applyMatrix4(x.matrixWorld).applyMatrix4(ne)),Array.isArray(pe)){const de=le.groups;for(let Ce=0,Pe=de.length;Ce<Pe;Ce++){const Se=de[Ce],Be=pe[Se.materialIndex];Be&&Be.visible&&f.push(x,le,Be,F,Ae.z,Se)}}else pe.visible&&f.push(x,le,pe,F,Ae.z,null)}}const K=x.children;for(let le=0,pe=K.length;le<pe;le++)Rr(K[le],D,F,B)}function Oo(x,D,F,B){const I=x.opaque,K=x.transmissive,le=x.transparent;d.setupLightsView(F),W===!0&&te.setGlobalState(E.clippingPlanes,F),B&&Ee.viewport(A.copy(B)),I.length>0&&Cs(I,D,F),K.length>0&&Cs(K,D,F),le.length>0&&Cs(le,D,F),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Fo(x,D,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Vn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float")?Es:bn,minFilter:Un,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace}));const K=d.state.transmissionRenderTarget[B.id],le=B.viewport||A;K.setSize(le.z*E.transmissionResolutionScale,le.w*E.transmissionResolutionScale);const pe=E.getRenderTarget(),de=E.getActiveCubeFace(),Ce=E.getActiveMipmapLevel();E.setRenderTarget(K),E.getClearColor(V),Z=E.getClearAlpha(),Z<1&&E.setClearColor(16777215,.5),E.clear(),ct&&ve.render(F);const Pe=E.toneMapping;E.toneMapping=On;const Se=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),W===!0&&te.setGlobalState(E.clippingPlanes,B),Cs(x,F,B),Fe.updateMultisampleRenderTarget(K),Fe.updateRenderTargetMipmap(K),ye.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let $e=0,lt=D.length;$e<lt;$e++){const nt=D[$e],Qe=nt.object,we=nt.geometry,at=nt.material,Ge=nt.group;if(at.side===Sn&&Qe.layers.test(B.layers)){const Ut=at.side;at.side=Dt,at.needsUpdate=!0,Bo(Qe,F,B,we,at,Ge),at.side=Ut,at.needsUpdate=!0,Be=!0}}Be===!0&&(Fe.updateMultisampleRenderTarget(K),Fe.updateRenderTargetMipmap(K))}E.setRenderTarget(pe,de,Ce),E.setClearColor(V,Z),Se!==void 0&&(B.viewport=Se),E.toneMapping=Pe}function Cs(x,D,F){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,K=x.length;I<K;I++){const le=x[I],pe=le.object,de=le.geometry,Ce=le.group;let Pe=le.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),pe.layers.test(F.layers)&&Bo(pe,D,F,de,Pe,Ce)}}function Bo(x,D,F,B,I,K){x.onBeforeRender(E,D,F,B,I,K),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(E,D,F,B,x,K),I.transparent===!0&&I.side===Sn&&I.forceSinglePass===!1?(I.side=Dt,I.needsUpdate=!0,E.renderBufferDirect(F,D,B,I,x,K),I.side=Hn,I.needsUpdate=!0,E.renderBufferDirect(F,D,B,I,x,K),I.side=Sn):E.renderBufferDirect(F,D,B,I,x,K),x.onAfterRender(E,D,F,B,I,K)}function Rs(x,D,F){D.isScene!==!0&&(D=Le);const B=fe.get(x),I=d.state.lights,K=d.state.shadowsArray,le=I.state.version,pe=G.getParameters(x,I.state,K,D,F),de=G.getProgramCacheKey(pe);let Ce=B.programs;B.environment=x.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(x.isMeshStandardMaterial?ht:gt).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,Ce===void 0&&(x.addEventListener("dispose",q),Ce=new Map,B.programs=Ce);let Pe=Ce.get(de);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===le)return ko(x,pe),Pe}else pe.uniforms=G.getUniforms(x),x.onBeforeCompile(pe,E),Pe=G.acquireProgram(pe,de),Ce.set(de,Pe),B.uniforms=pe.uniforms;const Se=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Se.clippingPlanes=te.uniform),ko(x,pe),B.needsLights=au(x),B.lightsStateVersion=le,B.needsLights&&(Se.ambientLightColor.value=I.state.ambient,Se.lightProbe.value=I.state.probe,Se.directionalLights.value=I.state.directional,Se.directionalLightShadows.value=I.state.directionalShadow,Se.spotLights.value=I.state.spot,Se.spotLightShadows.value=I.state.spotShadow,Se.rectAreaLights.value=I.state.rectArea,Se.ltc_1.value=I.state.rectAreaLTC1,Se.ltc_2.value=I.state.rectAreaLTC2,Se.pointLights.value=I.state.point,Se.pointLightShadows.value=I.state.pointShadow,Se.hemisphereLights.value=I.state.hemi,Se.directionalShadowMap.value=I.state.directionalShadowMap,Se.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Se.spotShadowMap.value=I.state.spotShadowMap,Se.spotLightMatrix.value=I.state.spotLightMatrix,Se.spotLightMap.value=I.state.spotLightMap,Se.pointShadowMap.value=I.state.pointShadowMap,Se.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function zo(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=sr.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function ko(x,D){const F=fe.get(x);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function su(x,D,F,B,I){D.isScene!==!0&&(D=Le),Fe.resetTextureUnits();const K=D.fog,le=B.isMeshStandardMaterial?D.environment:null,pe=U===null?E.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:oi,de=(B.isMeshStandardMaterial?ht:gt).get(B.envMap||le),Ce=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pe=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Se=!!F.morphAttributes.position,Be=!!F.morphAttributes.normal,$e=!!F.morphAttributes.color;let lt=On;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(lt=E.toneMapping);const nt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Qe=nt!==void 0?nt.length:0,we=fe.get(B),at=d.state.lights;if(W===!0&&(ae===!0||x!==M)){const Tt=x===M&&B.id===S;te.setState(B,x,Tt)}let Ge=!1;B.version===we.__version?(we.needsLights&&we.lightsStateVersion!==at.state.version||we.outputColorSpace!==pe||I.isBatchedMesh&&we.batching===!1||!I.isBatchedMesh&&we.batching===!0||I.isBatchedMesh&&we.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&we.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&we.instancing===!1||!I.isInstancedMesh&&we.instancing===!0||I.isSkinnedMesh&&we.skinning===!1||!I.isSkinnedMesh&&we.skinning===!0||I.isInstancedMesh&&we.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&we.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&we.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&we.instancingMorph===!1&&I.morphTexture!==null||we.envMap!==de||B.fog===!0&&we.fog!==K||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==te.numPlanes||we.numIntersection!==te.numIntersection)||we.vertexAlphas!==Ce||we.vertexTangents!==Pe||we.morphTargets!==Se||we.morphNormals!==Be||we.morphColors!==$e||we.toneMapping!==lt||we.morphTargetsCount!==Qe)&&(Ge=!0):(Ge=!0,we.__version=B.version);let Ut=we.currentProgram;Ge===!0&&(Ut=Rs(B,D,I));let hi=!1,Nt=!1,Yi=!1;const ot=Ut.getUniforms(),Ht=we.uniforms;if(Ee.useProgram(Ut.program)&&(hi=!0,Nt=!0,Yi=!0),B.id!==S&&(S=B.id,Nt=!0),hi||M!==x){Ee.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ot.setValue(T,"projectionMatrix",x.projectionMatrix),ot.setValue(T,"viewMatrix",x.matrixWorldInverse);const Lt=ot.map.cameraPosition;Lt!==void 0&&Lt.setValue(T,be.setFromMatrixPosition(x.matrixWorld)),We.logarithmicDepthBuffer&&ot.setValue(T,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ot.setValue(T,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,Nt=!0,Yi=!0)}if(I.isSkinnedMesh){ot.setOptional(T,I,"bindMatrix"),ot.setOptional(T,I,"bindMatrixInverse");const Tt=I.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),ot.setValue(T,"boneTexture",Tt.boneTexture,Fe))}I.isBatchedMesh&&(ot.setOptional(T,I,"batchingTexture"),ot.setValue(T,"batchingTexture",I._matricesTexture,Fe),ot.setOptional(T,I,"batchingIdTexture"),ot.setValue(T,"batchingIdTexture",I._indirectTexture,Fe),ot.setOptional(T,I,"batchingColorTexture"),I._colorsTexture!==null&&ot.setValue(T,"batchingColorTexture",I._colorsTexture,Fe));const Vt=F.morphAttributes;if((Vt.position!==void 0||Vt.normal!==void 0||Vt.color!==void 0)&&J.update(I,F,Ut),(Nt||we.receiveShadow!==I.receiveShadow)&&(we.receiveShadow=I.receiveShadow,ot.setValue(T,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Ht.envMap.value=de,Ht.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(Ht.envMapIntensity.value=D.environmentIntensity),Nt&&(ot.setValue(T,"toneMappingExposure",E.toneMappingExposure),we.needsLights&&ru(Ht,Yi),K&&B.fog===!0&&$.refreshFogUniforms(Ht,K),$.refreshMaterialUniforms(Ht,B,z,ee,d.state.transmissionRenderTarget[x.id]),sr.upload(T,zo(we),Ht,Fe)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(sr.upload(T,zo(we),Ht,Fe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ot.setValue(T,"center",I.center),ot.setValue(T,"modelViewMatrix",I.modelViewMatrix),ot.setValue(T,"normalMatrix",I.normalMatrix),ot.setValue(T,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Tt=B.uniformsGroups;for(let Lt=0,Pr=Tt.length;Lt<Pr;Lt++){const $n=Tt[Lt];Ie.update($n,Ut),Ie.bind($n,Ut)}}return Ut}function ru(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function au(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,D,F){const B=fe.get(x);B.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),fe.get(x.texture).__webglTexture=D,fe.get(x.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:F,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,D){const F=fe.get(x);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0};const ou=T.createFramebuffer();this.setRenderTarget=function(x,D=0,F=0){U=x,C=D,L=F;let B=!0,I=null,K=!1,le=!1;if(x){const de=fe.get(x);if(de.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(T.FRAMEBUFFER,null),B=!1;else if(de.__webglFramebuffer===void 0)Fe.setupRenderTarget(x);else if(de.__hasExternalTextures)Fe.rebindTextures(x,fe.get(x.texture).__webglTexture,fe.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Se=x.depthTexture;if(de.__boundDepthTexture!==Se){if(Se!==null&&fe.has(Se)&&(x.width!==Se.image.width||x.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(x)}}const Ce=x.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(le=!0);const Pe=fe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?I=Pe[D][F]:I=Pe[D],K=!0):x.samples>0&&Fe.useMultisampledRTT(x)===!1?I=fe.get(x).__webglMultisampledFramebuffer:Array.isArray(Pe)?I=Pe[F]:I=Pe,A.copy(x.viewport),Y.copy(x.scissor),H=x.scissorTest}else A.copy(Me).multiplyScalar(z).floor(),Y.copy(Oe).multiplyScalar(z).floor(),H=st;if(F!==0&&(I=ou),Ee.bindFramebuffer(T.FRAMEBUFFER,I)&&B&&Ee.drawBuffers(x,I),Ee.viewport(A),Ee.scissor(Y),Ee.setScissorTest(H),K){const de=fe.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+D,de.__webglTexture,F)}else if(le){const de=D;for(let Ce=0;Ce<x.textures.length;Ce++){const Pe=fe.get(x.textures[Ce]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Ce,Pe.__webglTexture,F,de)}}else if(x!==null&&F!==0){const de=fe.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,de.__webglTexture,F)}S=-1},this.readRenderTargetPixels=function(x,D,F,B,I,K,le,pe=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=fe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){Ee.bindFramebuffer(T.FRAMEBUFFER,de);try{const Ce=x.textures[pe],Pe=Ce.format,Se=Ce.type;if(!We.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-B&&F>=0&&F<=x.height-I&&(x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+pe),T.readPixels(D,F,B,I,_e.convert(Pe),_e.convert(Se),K))}finally{const Ce=U!==null?fe.get(U).__webglFramebuffer:null;Ee.bindFramebuffer(T.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(x,D,F,B,I,K,le,pe=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=fe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(D>=0&&D<=x.width-B&&F>=0&&F<=x.height-I){Ee.bindFramebuffer(T.FRAMEBUFFER,de);const Ce=x.textures[pe],Pe=Ce.format,Se=Ce.type;if(!We.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Be),T.bufferData(T.PIXEL_PACK_BUFFER,K.byteLength,T.STREAM_READ),x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+pe),T.readPixels(D,F,B,I,_e.convert(Pe),_e.convert(Se),0);const $e=U!==null?fe.get(U).__webglFramebuffer:null;Ee.bindFramebuffer(T.FRAMEBUFFER,$e);const lt=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await mf(T,lt,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Be),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,K),T.deleteBuffer(Be),T.deleteSync(lt),K}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,D=null,F=0){const B=Math.pow(2,-F),I=Math.floor(x.image.width*B),K=Math.floor(x.image.height*B),le=D!==null?D.x:0,pe=D!==null?D.y:0;Fe.setTexture2D(x,0),T.copyTexSubImage2D(T.TEXTURE_2D,F,0,0,le,pe,I,K),Ee.unbindTexture()};const lu=T.createFramebuffer(),cu=T.createFramebuffer();this.copyTextureToTexture=function(x,D,F=null,B=null,I=0,K=null){K===null&&(I!==0?(Ui("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),K=I,I=0):K=0);let le,pe,de,Ce,Pe,Se,Be,$e,lt;const nt=x.isCompressedTexture?x.mipmaps[K]:x.image;if(F!==null)le=F.max.x-F.min.x,pe=F.max.y-F.min.y,de=F.isBox3?F.max.z-F.min.z:1,Ce=F.min.x,Pe=F.min.y,Se=F.isBox3?F.min.z:0;else{const Vt=Math.pow(2,-I);le=Math.floor(nt.width*Vt),pe=Math.floor(nt.height*Vt),x.isDataArrayTexture?de=nt.depth:x.isData3DTexture?de=Math.floor(nt.depth*Vt):de=1,Ce=0,Pe=0,Se=0}B!==null?(Be=B.x,$e=B.y,lt=B.z):(Be=0,$e=0,lt=0);const Qe=_e.convert(D.format),we=_e.convert(D.type);let at;D.isData3DTexture?(Fe.setTexture3D(D,0),at=T.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Fe.setTexture2DArray(D,0),at=T.TEXTURE_2D_ARRAY):(Fe.setTexture2D(D,0),at=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,D.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,D.unpackAlignment);const Ge=T.getParameter(T.UNPACK_ROW_LENGTH),Ut=T.getParameter(T.UNPACK_IMAGE_HEIGHT),hi=T.getParameter(T.UNPACK_SKIP_PIXELS),Nt=T.getParameter(T.UNPACK_SKIP_ROWS),Yi=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,nt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,nt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ce),T.pixelStorei(T.UNPACK_SKIP_ROWS,Pe),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Se);const ot=x.isDataArrayTexture||x.isData3DTexture,Ht=D.isDataArrayTexture||D.isData3DTexture;if(x.isDepthTexture){const Vt=fe.get(x),Tt=fe.get(D),Lt=fe.get(Vt.__renderTarget),Pr=fe.get(Tt.__renderTarget);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,Lt.__webglFramebuffer),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,Pr.__webglFramebuffer);for(let $n=0;$n<de;$n++)ot&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,fe.get(x).__webglTexture,I,Se+$n),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,fe.get(D).__webglTexture,K,lt+$n)),T.blitFramebuffer(Ce,Pe,le,pe,Be,$e,le,pe,T.DEPTH_BUFFER_BIT,T.NEAREST);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(I!==0||x.isRenderTargetTexture||fe.has(x)){const Vt=fe.get(x),Tt=fe.get(D);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,lu),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,cu);for(let Lt=0;Lt<de;Lt++)ot?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Vt.__webglTexture,I,Se+Lt):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Vt.__webglTexture,I),Ht?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Tt.__webglTexture,K,lt+Lt):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Tt.__webglTexture,K),I!==0?T.blitFramebuffer(Ce,Pe,le,pe,Be,$e,le,pe,T.COLOR_BUFFER_BIT,T.NEAREST):Ht?T.copyTexSubImage3D(at,K,Be,$e,lt+Lt,Ce,Pe,le,pe):T.copyTexSubImage2D(at,K,Be,$e,Ce,Pe,le,pe);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else Ht?x.isDataTexture||x.isData3DTexture?T.texSubImage3D(at,K,Be,$e,lt,le,pe,de,Qe,we,nt.data):D.isCompressedArrayTexture?T.compressedTexSubImage3D(at,K,Be,$e,lt,le,pe,de,Qe,nt.data):T.texSubImage3D(at,K,Be,$e,lt,le,pe,de,Qe,we,nt):x.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,K,Be,$e,le,pe,Qe,we,nt.data):x.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,K,Be,$e,nt.width,nt.height,Qe,nt.data):T.texSubImage2D(T.TEXTURE_2D,K,Be,$e,le,pe,Qe,we,nt);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ge),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ut),T.pixelStorei(T.UNPACK_SKIP_PIXELS,hi),T.pixelStorei(T.UNPACK_SKIP_ROWS,Nt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Yi),K===0&&D.generateMipmaps&&T.generateMipmap(at),Ee.unbindTexture()},this.copyTextureToTexture3D=function(x,D,F=null,B=null,I=0){return Ui('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,D,F,B,I)},this.initRenderTarget=function(x){fe.get(x).__webglFramebuffer===void 0&&Fe.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Fe.setTextureCube(x,0):x.isData3DTexture?Fe.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Fe.setTexture2DArray(x,0):Fe.setTexture2D(x,0),Ee.unbindTexture()},this.resetState=function(){C=0,L=0,U=null,Ee.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}var O_=Object.defineProperty,So=(n,e)=>{for(var t in e)O_(n,t,{get:e[t],enumerable:!0})},F_={};So(F_,{ACTIONS:()=>Oc,ANIMATION_MIN_DURATION:()=>Ka,CAPTURE_EVENTS_CLASS:()=>ws,CTRLZOOM_TIMEOUT:()=>Nc,DBLCLICK_DELAY:()=>Dc,EASINGS:()=>rr,ICONS:()=>tn,IDS:()=>Mt,KEY_CODES:()=>_t,LONGTOUCH_DELAY:()=>Ic,MOVE_THRESHOLD:()=>Lc,SPHERE_RADIUS:()=>li,TWOFINGERSOVERLAY_DELAY:()=>Uc,VIEWER_DATA:()=>Wn});var B_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 432 432"><g transform="rotate(0, 256, 256)"><path fill="currentColor" d="M425.23 210.55H227.39a5 5 0 01-3.53-8.53l56.56-56.57a45.5 45.5 0 000-64.28 45.15 45.15 0 00-32.13-13.3 45.15 45.15 0 00-32.14 13.3L41.32 256l174.83 174.83a45.15 45.15 0 0032.14 13.3 45.15 45.15 0 0032.13-13.3 45.5 45.5 0 000-64.28l-56.57-56.57a5 5 0 013.54-8.53h197.84c25.06 0 45.45-20.39 45.45-45.45s-20.4-45.45-45.45-45.45z"/></g><!-- Created by Flatart from the Noun Project --></svg>
`,z_='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="currentColor" transform=" translate(50, 50) rotate(45)"><rect x="-5" y="-65" width="10" height="130"/><rect x="-65" y="-5" width="130" height="10"/></g></svg>',k_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M83.3 35.6h-17V3H32.2v32.6H16.6l33.6 32.7 33-32.7z"/><path fill="currentColor" d="M83.3 64.2v16.3H16.6V64.2H-.1v32.6H100V64.2H83.3z"/><!--Created by Michael Zenaty from the Noun Project--></svg>
`,H_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M100 40H87.1V18.8h-21V6H100zM100 93.2H66V80.3h21.1v-21H100zM34 93.2H0v-34h12.9v21.1h21zM12.9 40H0V6h34v12.9H12.8z"/><!--Created by Garrett Knoll from the Noun Project--></svg>
`,V_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M66 7h13v21h21v13H66zM66 60.3h34v12.9H79v21H66zM0 60.3h34v34H21V73.1H0zM21 7h13v34H0V28h21z"/><!--Created by Garrett Knoll from the Noun Project--></svg>
`,G_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M28.3 26.1c-1 2.6-1.9 4.8-2.6 7-2.5 7.4-5 14.7-7.2 22-1.3 4.4.5 7.2 4.3 7.8 1.3.2 2.8.2 4.2-.1 8.2-2 11.9-8.6 15.7-15.2l-2.2 2a18.8 18.8 0 0 1-7.4 5.2 2 2 0 0 1-1.6-.2c-.2-.1 0-1 0-1.4l.8-1.8L41.9 28c.5-1.4.9-3 .7-4.4-.2-2.6-3-4.4-6.3-4.4-8.8.2-15 4.5-19.5 11.8-.2.3-.2.6-.3 1.3 3.7-2.8 6.8-6.1 11.8-6.2z"/><circle fill="currentColor" cx="39.3" cy="9.2" r="8.2"/><!--Created by Arafat Uddin from the Noun Project--></svg>
`,W_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><g fill="currentColor"><circle r="10" cx="20" cy="20"/><circle r="10" cx="50" cy="20"/><circle r="10" cx="80" cy="20"/><circle r="10" cx="20" cy="50"/><circle r="10" cx="50" cy="50"/><circle r="10" cx="80" cy="50"/><circle r="10" cx="20" cy="80"/><circle r="10" cx="50" cy="80"/><circle r="10" cx="80" cy="80"/></g><!-- Created by Richard Kunák from the Noun Project--></svg>
`,X_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path fill="currentColor" d="M8.728 4.009H6.744v2.737H4.006V8.73h2.738v2.736h1.984V8.73h2.737V6.746H8.728z"/><!--Created by Ryan Canning from the Noun Project--></svg>
`,Y_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path fill="currentColor" d="M4.006 6.746h7.459V8.73H4.006z"/><!--Created by Ryan Canning from the Noun Project--></svg>
`,Ka=500,Lc=4,Dc=300,Ic=500,Uc=100,Nc=2e3,li=10,Wn="photoSphereViewer",ws="psv--capture-event",Oc=(n=>(n.ROTATE_UP="ROTATE_UP",n.ROTATE_DOWN="ROTATE_DOWN",n.ROTATE_RIGHT="ROTATE_RIGHT",n.ROTATE_LEFT="ROTATE_LEFT",n.ZOOM_IN="ZOOM_IN",n.ZOOM_OUT="ZOOM_OUT",n))(Oc||{}),Mt={MENU:"menu",TWO_FINGERS:"twoFingers",CTRL_ZOOM:"ctrlZoom",ERROR:"error",DESCRIPTION:"description"},_t={Enter:"Enter",Control:"Control",Escape:"Escape",Space:" ",PageUp:"PageUp",PageDown:"PageDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",ArrowDown:"ArrowDown",Delete:"Delete",Plus:"+",Minus:"-"},tn={arrow:B_,close:z_,download:k_,fullscreenIn:H_,fullscreenOut:V_,info:G_,menu:W_,zoomIn:X_,zoomOut:Y_},rr={linear:n=>n,inQuad:n=>n*n,outQuad:n=>n*(2-n),inOutQuad:n=>n<.5?2*n*n:-1+(4-2*n)*n,inCubic:n=>n*n*n,outCubic:n=>--n*n*n+1,inOutCubic:n=>n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1,inQuart:n=>n*n*n*n,outQuart:n=>1- --n*n*n*n,inOutQuart:n=>n<.5?8*n*n*n*n:1-8*--n*n*n*n,inQuint:n=>n*n*n*n*n,outQuint:n=>1+--n*n*n*n*n,inOutQuint:n=>n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n,inSine:n=>1-Math.cos(n*(Math.PI/2)),outSine:n=>Math.sin(n*(Math.PI/2)),inOutSine:n=>.5-.5*Math.cos(Math.PI*n),inExpo:n=>Math.pow(2,10*(n-1)),outExpo:n=>1-Math.pow(2,-10*n),inOutExpo:n=>(n=n*2-1)<0?.5*Math.pow(2,10*n):1-.5*Math.pow(2,-10*n),inCirc:n=>1-Math.sqrt(1-n*n),outCirc:n=>Math.sqrt(1-(n-1)*(n-1)),inOutCirc:n=>(n*=2)<1?.5-.5*Math.sqrt(1-n*n):.5+.5*Math.sqrt(1-(n-=2)*n)},je={};So(je,{Animation:()=>fr,Dynamic:()=>es,MultiDynamic:()=>rh,PressHandler:()=>wr,Slider:()=>oh,SliderDirection:()=>ah,addClasses:()=>yo,angle:()=>Bc,applyEulerInverse:()=>no,checkClosedShadowDom:()=>ih,checkStylesheet:()=>nh,checkVersion:()=>Ro,cleanCssPosition:()=>eh,clone:()=>Mr,createTexture:()=>to,cssPositionIsOrdered:()=>Co,dasherize:()=>K_,deepEqual:()=>Kc,deepmerge:()=>Zc,distance:()=>Fc,exitFullscreen:()=>qc,firstNonNull:()=>an,getAbortError:()=>Qa,getAngle:()=>kc,getClosest:()=>Vc,getConfigParser:()=>yr,getElement:()=>Hc,getEventTarget:()=>cr,getMatchingTarget:()=>Gc,getPosition:()=>Wc,getShortestArc:()=>zc,getStyleProperty:()=>hn,getTouchData:()=>Ja,getXMPValue:()=>Bt,greatArcDistance:()=>$_,hasParent:()=>j_,invertResolvableBoolean:()=>Sr,isAbortError:()=>Qc,isEmpty:()=>jc,isExtendedPosition:()=>Ao,isFullscreenEnabled:()=>Xc,isNil:()=>xt,isPlainObject:()=>To,keyPressMatch:()=>wo,logWarn:()=>St,mergePanoData:()=>sh,parseAngle:()=>on,parsePoint:()=>J_,parseSpeed:()=>th,removeClasses:()=>Z_,requestFullscreen:()=>Yc,resolveBoolean:()=>bo,speedToDuration:()=>eo,sum:()=>q_,throttle:()=>$c,toggleClass:()=>Er,wrap:()=>is});function is(n,e){let t=n%e;return t<0&&(t+=e),t}function q_(n){return n.reduce((e,t)=>e+t,0)}function Fc(n,e){return Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2))}function Bc(n,e){return Math.atan2(e.y-n.y,e.x-n.x)}function zc(n,e){return[0,Math.PI*2,-Math.PI*2].reduce((i,s)=>{const r=e-n+s;return Math.abs(r)<Math.abs(i)?r:i},1/0)}function kc(n,e){return Math.acos(Math.cos(n.pitch)*Math.cos(e.pitch)*Math.cos(n.yaw-e.yaw)+Math.sin(n.pitch)*Math.sin(e.pitch))}function $_([n,e],[t,i]){n-t>Math.PI?n-=2*Math.PI:n-t<-Math.PI&&(n+=2*Math.PI);const s=(t-n)*Math.cos((e+i)/2),r=i-e;return Math.sqrt(s*s+r*r)}function Hc(n){return typeof n=="string"?n.match(/^[a-z]/i)?document.getElementById(n):document.querySelector(n):n}function Er(n,e,t){t===void 0?n.classList.toggle(e):t?n.classList.add(e):t||n.classList.remove(e)}function yo(n,e){n.classList.add(...e.split(" ").filter(t=>!!t))}function Z_(n,e){n.classList.remove(...e.split(" ").filter(t=>!!t))}function j_(n,e){let t=n;do{if(t===e)return!0;t=t.parentElement}while(t);return!1}function Vc(n,e){if(!n?.matches)return null;let t=n;do{if(t.matches(e))return t;t=t.parentElement}while(t);return null}function cr(n){return n?.composedPath()[0]||null}function Gc(n,e){return n?n.composedPath().find(t=>!(t instanceof HTMLElement)&&!(t instanceof SVGElement)?!1:t.matches(e)):null}function Wc(n){let e=0,t=0,i=n;for(;i;)e+=i.offsetLeft-i.scrollLeft+i.clientLeft,t+=i.offsetTop-i.scrollTop+i.clientTop,i=i.offsetParent;return e-=window.scrollX,t-=window.scrollY,{x:e,y:t}}function hn(n,e){return window.getComputedStyle(n).getPropertyValue(e)}function Ja(n){if(n.touches.length<2)return null;const e={x:n.touches[0].clientX,y:n.touches[0].clientY},t={x:n.touches[1].clientX,y:n.touches[1].clientY};return{distance:Fc(e,t),angle:Bc(e,t),center:{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}}var hr;function Xc(n,e=!1){return e?n===hr:document.fullscreenElement===n}function Yc(n,e=!1){e?(hr=n,n.classList.add("psv-fullscreen-emulation"),document.dispatchEvent(new Event("fullscreenchange"))):n.requestFullscreen()}function qc(n=!1){n?(hr.classList.remove("psv-fullscreen-emulation"),hr=null,document.dispatchEvent(new Event("fullscreenchange"))):document.exitFullscreen()}function wo(n,e){let t,i=!1,s=!1,r=!1,a=!1;return e==="+"?t=e:e.split("+").forEach(o=>{switch(o){case"Shift":i=!0;break;case"Ctrl":s=!0;break;case"Alt":r=!0;break;case"Meta":a=!0;break;case"Space":t=" ";break;case"Plus":t="+";break;case"Minus":t="-";break;default:t=o;break}}),i===n.shiftKey&&s===n.ctrlKey&&r===n.altKey&&a===n.metaKey&&t===n.key}function K_(n){return n.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g,(e,t)=>(t>0?"-":"")+e.toLowerCase())}function $c(n,e){let t=!1;return function(...i){t||(t=!0,setTimeout(()=>{n.apply(this,i),t=!1},e))}}function To(n){if(typeof n!="object"||n===null||Object.prototype.toString.call(n)!=="[object Object]")return!1;if(Object.getPrototypeOf(n)===null)return!0;let e=n;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(n)===e}function Zc(n,e){const t=e;return(function i(s,r){return Array.isArray(r)?(!s||!Array.isArray(s)?s=[]:s.length=0,r.forEach((a,o)=>{s[o]=i(null,a)})):typeof r=="object"?((!s||Array.isArray(s))&&(s={}),Object.keys(r).forEach(a=>{a!=="__proto__"&&(typeof r[a]!="object"||!r[a]||!To(r[a])?s[a]=r[a]:r[a]!==t&&(s[a]?i(s[a],r[a]):s[a]=i(null,r[a])))})):s=r,s})(n,e)}function Mr(n){return Zc(null,n)}function jc(n){return!n||Object.keys(n).length===0&&n.constructor===Object}function xt(n){return n==null}function an(...n){for(const e of n)if(!xt(e))return e;return null}function Kc(n,e){if(n===e)return!0;if(zl(n)&&zl(e)){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t of Object.keys(n))if(!Kc(n[t],e[t]))return!1;return!0}else return!1}function zl(n){return typeof n=="object"&&n!==null}var Te=class Jc extends Error{constructor(e,t){super(t&&t instanceof Error?`${e}: ${t.message}`:e),this.name="PSVError",Error.captureStackTrace?.(this,Jc)}};function bo(n,e){To(n)?(e(n.initial,!0),n.promise.then(t=>e(t,!1))):e(n,!0)}function Sr(n){return{initial:!n.initial,promise:n.promise.then(e=>!e)}}function Qa(){const n=new Error("Loading was aborted.");return n.name="AbortError",n}function Qc(n){return n?.name==="AbortError"}function St(n){console.warn(`PhotoSphereViewer: ${n}`)}function Ao(n){return!n||Array.isArray(n)?!1:[["textureX","textureY"],["yaw","pitch"]].some(([e,t])=>n[e]!==void 0&&n[t]!==void 0)}function Bt(n,e,t=!0){let i=n.match("<GPano:"+e+">(.*)</GPano:"+e+">");if(i!==null){const s=t?parseInt(i[1],10):parseFloat(i[1]);return isNaN(s)?null:s}if(i=n.match("GPano:"+e+'="(.*?)"'),i!==null){const s=t?parseInt(i[1],10):parseFloat(i[1]);return isNaN(s)?null:s}return null}var kl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},dr=["left","center","right"],ur=["top","center","bottom"],Hl=[...dr,...ur],Wt="center";function J_(n){if(!n)return{x:.5,y:.5};if(typeof n=="object")return n;let e=n.toLocaleLowerCase().split(" ").slice(0,2);e.length===1&&(kl[e[0]]?e=[e[0],Wt]:e=[e[0],e[0]]);const t=e[1]!=="left"&&e[1]!=="right"&&e[0]!=="top"&&e[0]!=="bottom";e=e.map(s=>kl[s]||s),t||e.reverse();const i=e.join(" ").match(/^([0-9.]+)% ([0-9.]+)%$/);return i?{x:parseFloat(i[1])/100,y:parseFloat(i[2])/100}:{x:.5,y:.5}}function eh(n,{allowCenter:e,cssOrder:t}={allowCenter:!0,cssOrder:!0}){return n?(typeof n=="string"&&(n=n.split(" ")),n.length===1&&(n[0]===Wt?n=[Wt,Wt]:dr.indexOf(n[0])!==-1?n=[Wt,n[0]]:ur.indexOf(n[0])!==-1&&(n=[n[0],Wt])),n.length!==2||Hl.indexOf(n[0])===-1||Hl.indexOf(n[1])===-1?(St(`Unparsable position ${n}`),null):!e&&n[0]===Wt&&n[1]===Wt?(St("Invalid position center center"),null):(t&&!Co(n)&&(n=[n[1],n[0]]),n[1]===Wt&&dr.indexOf(n[0])!==-1&&(n=[Wt,n[0]]),n[0]===Wt&&ur.indexOf(n[1])!==-1&&(n=[n[1],Wt]),n)):null}function Co(n){return ur.indexOf(n[0])!==-1&&dr.indexOf(n[1])!==-1}function th(n){let e;if(typeof n=="string"){const t=n.toString().trim();let i=parseFloat(t.replace(/^(-?[0-9]+(?:\.[0-9]*)?).*$/,"$1"));const s=t.replace(/^-?[0-9]+(?:\.[0-9]*)?(.*)$/,"$1").trim();switch(s.match(/(pm|per minute)$/)&&(i/=60),s){case"dpm":case"degrees per minute":case"dps":case"degrees per second":e=ke.degToRad(i);break;case"rdpm":case"radians per minute":case"rdps":case"radians per second":e=i;break;case"rpm":case"revolutions per minute":case"rps":case"revolutions per second":e=i*Math.PI*2;break;default:throw new Te(`Unknown speed unit "${s}"`)}}else e=n;return e}function eo(n,e){if(typeof n!="number"){const t=th(n);return e/Math.abs(t)*1e3}else return Math.abs(n)}function on(n,e=!1,t=e){let i;if(typeof n=="string"){const s=n.toLowerCase().trim().match(/^(-?[0-9]+(?:\.[0-9]*)?)(.*)$/);if(!s)throw new Te(`Unknown angle "${n}"`);const r=parseFloat(s[1]),a=s[2];if(a)switch(a){case"deg":case"degs":i=ke.degToRad(r);break;case"rad":case"rads":i=r;break;default:throw new Te(`Unknown angle unit "${a}"`)}else i=r}else if(typeof n=="number"&&!isNaN(n))i=n;else throw new Te(`Unknown angle "${n}"`);return i=is(e?i+Math.PI:i,Math.PI*2),e?ke.clamp(i-Math.PI,-Math.PI/(t?2:1),Math.PI/(t?2:1)):i}function to(n,e=!1){const t=new Rt(n);return t.needsUpdate=!0,t.minFilter=e?Un:Jt,t.generateMipmaps=e,t.anisotropy=e?2:1,t}var Vl=new ci;function no(n,e){Vl.setFromEuler(e).invert(),n.applyQuaternion(Vl)}function yr(n,e){const t=function(i){const s=Mr({...n,...i}),r={};for(let[a,o]of Object.entries(s)){if(e&&a in e)o=e[a](o,{rawConfig:s,defValue:n[a]});else if(!(a in n)){St(`Unknown option ${a}`);continue}r[a]=o}return r};return t.defaults=n,t.parsers=e||{},t}function nh(n,e){hn(n,`--psv-${e}-loaded`)!=="true"&&console.error(`PhotoSphereViewer: stylesheet "@photo-sphere-viewer/${e}/index.css" is not loaded`)}function Ro(n,e,t){e&&e!==t&&console.error(`PhotoSphereViewer: @photo-sphere-viewer/${n} is in version ${e} but @photo-sphere-viewer/core is in version ${t}`)}function ih(n){do{if(n instanceof ShadowRoot&&n.mode==="closed"){console.error("PhotoSphereViewer: closed shadow DOM detected, the viewer might not work as expected");return}n=n.parentNode}while(n)}function sh(n,e,t,i){const s={isEquirectangular:!0,fullWidth:an(t?.fullWidth,i?.fullWidth),fullHeight:an(t?.fullHeight,i?.fullHeight),croppedWidth:an(t?.croppedWidth,i?.croppedWidth,n),croppedHeight:an(t?.croppedHeight,i?.croppedHeight,e),croppedX:an(t?.croppedX,i?.croppedX),croppedY:an(t?.croppedY,i?.croppedY),poseHeading:an(t?.poseHeading,i?.poseHeading,0),posePitch:an(t?.posePitch,i?.posePitch,0),poseRoll:an(t?.poseRoll,i?.poseRoll,0),initialHeading:i?.initialHeading,initialPitch:i?.initialPitch,initialFov:i?.initialFov};if(s.croppedWidth!==n){const r=n/s.croppedWidth;["fullWidth","fullHeight","croppedWidth","croppedHeight","croppedX","croppedY"].forEach(a=>{s[a]&&(s[a]=Math.round(s[a]*r))})}return!s.fullWidth&&!s.fullHeight&&(s.fullWidth=Math.max(s.croppedWidth,s.croppedHeight*2),s.fullHeight=Math.round(s.fullWidth/2)),s.fullWidth||(s.fullWidth=s.fullHeight*2),s.fullHeight||(s.fullHeight=Math.round(s.fullWidth/2)),s.croppedX===null&&(s.croppedX=Math.round((s.fullWidth-n)/2)),s.croppedY===null&&(s.croppedY=Math.round((s.fullHeight-e)/2)),Math.abs(s.fullWidth-s.fullHeight*2)>1&&(St("Invalid panoData, fullWidth should be twice fullHeight"),s.fullHeight=Math.round(s.fullWidth/2)),s.croppedX+s.croppedWidth>s.fullWidth&&(St("Invalid panoData, croppedX + croppedWidth > fullWidth"),s.croppedX=s.fullWidth-s.croppedWidth),s.croppedY+s.croppedHeight>s.fullHeight&&(St("Invalid panoData, croppedY + croppedHeight > fullHeight"),s.croppedY=s.fullHeight-s.croppedHeight),s.croppedX<0&&(St("Invalid panoData, croppedX < 0"),s.croppedX=0),s.croppedY<0&&(St("Invalid panoData, croppedY < 0"),s.croppedY=0),s}var fr=class{constructor(n){this.easing=rr.linear,this.callbacks=[],this.resolved=!1,this.cancelled=!1,this.options=n,n?(n.easing&&(this.easing=typeof n.easing=="function"?n.easing:rr[n.easing]||rr.linear),this.delayTimeout=setTimeout(()=>{this.delayTimeout=void 0,this.animationFrame=window.requestAnimationFrame(e=>this.__run(e))},n.delay||0)):this.resolved=!0}__run(n){if(this.cancelled)return;this.start||(this.start=n);const e=(n-this.start)/this.options.duration,t={};if(e<1){for(const[i,s]of Object.entries(this.options.properties))if(s){const r=s.start+(s.end-s.start)*this.easing(e);t[i]=r}this.options.onTick(t,e),this.animationFrame=window.requestAnimationFrame(i=>this.__run(i))}else{for(const[i,s]of Object.entries(this.options.properties))s&&(t[i]=s.end);this.options.onTick(t,1),this.__resolve(!0),this.animationFrame=void 0}}__resolve(n){n?this.resolved=!0:this.cancelled=!0,this.callbacks.forEach(e=>e(n)),this.callbacks.length=0}then(n){return this.resolved||this.cancelled?Promise.resolve(this.resolved).then(n):new Promise(e=>{this.callbacks.push(e)}).then(n)}cancel(){!this.cancelled&&!this.resolved&&(this.__resolve(!1),this.delayTimeout&&(window.clearTimeout(this.delayTimeout),this.delayTimeout=void 0),this.animationFrame&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=void 0))}},es=class{constructor(n,e){if(this.fn=n,this.mode=0,this.speed=0,this.speedMult=0,this.currentSpeed=0,this.target=0,this.__current=0,this.min=e.min,this.max=e.max,this.wrap=e.wrap,this.current=e.defaultValue,this.wrap&&this.min!==0)throw new Te("invalid config");this.fn&&this.fn(this.current)}get current(){return this.__current}set current(n){this.__current=n}setSpeed(n){this.speed=n}goto(n,e=1){this.mode=2,this.target=this.wrap?is(n,this.max):ke.clamp(n,this.min,this.max),this.speedMult=e}step(n,e=1){e===0?this.setValue(this.current+n):(this.mode!==2&&(this.target=this.current),this.goto(this.target+n,e))}roll(n=!1,e=1){this.mode=1,this.target=n?-1/0:1/0,this.speedMult=e}stop(){this.mode=0}setValue(n){return this.target=this.wrap?is(n,this.max):ke.clamp(n,this.min,this.max),this.mode=0,this.currentSpeed=0,this.target!==this.current?(this.current=this.target,this.fn&&this.fn(this.current),!0):!1}update(n){if(this.mode===2){this.wrap&&Math.abs(this.target-this.current)>this.max/2&&(this.current=this.current<this.target?this.current+this.max:this.current-this.max);const i=this.currentSpeed*this.currentSpeed/(this.speed*this.speedMult*4);Math.abs(this.target-this.current)<=i&&(this.mode=0)}let e=this.mode===0?0:this.speed*this.speedMult;this.target<this.current&&(e=-e),this.currentSpeed<e?this.currentSpeed=Math.min(e,this.currentSpeed+n/1e3*this.speed*this.speedMult*2):this.currentSpeed>e&&(this.currentSpeed=Math.max(e,this.currentSpeed-n/1e3*this.speed*this.speedMult*2));let t=null;return this.current>this.target&&this.currentSpeed?t=Math.max(this.target,this.current+this.currentSpeed*n/1e3):this.current<this.target&&this.currentSpeed&&(t=Math.min(this.target,this.current+this.currentSpeed*n/1e3)),t!==null&&(t=this.wrap?is(t,this.max):ke.clamp(t,this.min,this.max),t!==this.current)?(this.current=t,this.fn&&this.fn(this.current),!0):!1}},rh=class{constructor(n,e){this.fn=n,this.dynamics=e,this.fn&&this.fn(this.current)}get current(){return Object.entries(this.dynamics).reduce((n,[e,t])=>(n[e]=t.current,n),{})}setSpeed(n){for(const e of Object.values(this.dynamics))e.setSpeed(n)}goto(n,e=1){for(const[t,i]of Object.entries(n))this.dynamics[t].goto(i,e)}step(n,e=1){if(e===0)this.setValue(Object.keys(n).reduce((t,i)=>(t[i]=n[i]+this.dynamics[i].current,t),{}));else for(const[t,i]of Object.entries(n))this.dynamics[t].step(i,e)}roll(n,e=1){for(const[t,i]of Object.entries(n))this.dynamics[t].roll(i,e)}stop(){for(const n of Object.values(this.dynamics))n.stop()}setValue(n){let e=!1;for(const[t,i]of Object.entries(n))e=this.dynamics[t].setValue(i)||e;return e&&this.fn&&this.fn(this.current),e}update(n){let e=!1;for(const t of Object.values(this.dynamics))e=t.update(n)||e;return e&&this.fn&&this.fn(this.current),e}},wr=class{constructor(n=200){this.delay=n,this.time=0,this.delay=n}get pending(){return this.time!==0}down(n){this.timeout&&(clearTimeout(this.timeout),this.timeout=void 0),this.time=new Date().getTime(),this.data=n}up(n){if(!this.time)return;Date.now()-this.time<this.delay?this.timeout=setTimeout(()=>{n(this.data),this.timeout=void 0,this.time=0,this.data=void 0},this.delay):(n(this.data),this.time=0,this.data=void 0)}},ah=(n=>(n.VERTICAL="VERTICAL",n.HORIZONTAL="HORIZONTAL",n))(ah||{}),oh=class{constructor(n,e,t){this.container=n,this.direction=e,this.listener=t,this.mousedown=!1,this.mouseover=!1,this.container.addEventListener("click",this),this.container.addEventListener("mousedown",this),this.container.addEventListener("mouseenter",this),this.container.addEventListener("mouseleave",this),this.container.addEventListener("touchstart",this),this.container.addEventListener("mousemove",this,!0),this.container.addEventListener("touchmove",this,!0),window.addEventListener("mouseup",this),window.addEventListener("touchend",this)}get isVertical(){return this.direction==="VERTICAL"}get isHorizontal(){return this.direction==="HORIZONTAL"}destroy(){window.removeEventListener("mouseup",this),window.removeEventListener("touchend",this)}handleEvent(n){switch(n.type){case"click":n.stopPropagation();break;case"mousedown":this.__onMouseDown(n);break;case"mouseenter":this.__onMouseEnter(n);break;case"mouseleave":this.__onMouseLeave(n);break;case"touchstart":this.__onTouchStart(n);break;case"mousemove":this.__onMouseMove(n);break;case"touchmove":this.__onTouchMove(n);break;case"mouseup":this.__onMouseUp(n);break;case"touchend":this.__onTouchEnd(n);break}}__onMouseDown(n){this.mousedown=!0,this.__update(n.clientX,n.clientY,!0)}__onMouseEnter(n){this.mouseover=!0,this.__update(n.clientX,n.clientY,!0)}__onTouchStart(n){this.mouseover=!0,this.mousedown=!0;const e=n.changedTouches[0];this.__update(e.clientX,e.clientY,!0)}__onMouseMove(n){(this.mousedown||this.mouseover)&&(n.stopPropagation(),this.__update(n.clientX,n.clientY,!0))}__onTouchMove(n){if(this.mousedown||this.mouseover){n.stopPropagation();const e=n.changedTouches[0];this.__update(e.clientX,e.clientY,!0)}}__onMouseUp(n){this.mousedown&&(this.mousedown=!1,this.__update(n.clientX,n.clientY,!1))}__onMouseLeave(n){this.mouseover&&(this.mouseover=!1,this.__update(n.clientX,n.clientY,!0))}__onTouchEnd(n){if(this.mousedown){this.mouseover=!1,this.mousedown=!1;const e=n.changedTouches[0];this.__update(e.clientX,e.clientY,!1)}}__update(n,e,t){const i=this.container.getBoundingClientRect();let s;this.isVertical?s=ke.clamp((i.bottom-e)/i.height,0,1):s=ke.clamp((n-i.left)/i.width,0,1),this.listener({value:s,click:!t,mousedown:this.mousedown,mouseover:this.mouseover,cursor:{clientX:n,clientY:e}})}},Et={};So(Et,{BeforeAnimateEvent:()=>Po,BeforeRenderEvent:()=>ss,BeforeRotateEvent:()=>mh,ClickEvent:()=>_h,ConfigChangedEvent:()=>It,DoubleClickEvent:()=>yh,FullscreenEvent:()=>rs,HideNotificationEvent:()=>as,HideOverlayEvent:()=>Ph,HidePanelEvent:()=>Bn,HideTooltipEvent:()=>Nh,KeypressEvent:()=>zn,LoadProgressEvent:()=>kh,ObjectEnterEvent:()=>Td,ObjectEvent:()=>br,ObjectHoverEvent:()=>Pd,ObjectLeaveEvent:()=>io,PanoramaErrorEvent:()=>$h,PanoramaLoadEvent:()=>Gh,PanoramaLoadedEvent:()=>Oi,PositionUpdatedEvent:()=>os,ReadyEvent:()=>cs,RenderEvent:()=>ad,RollUpdatedEvent:()=>ls,ShowNotificationEvent:()=>hs,ShowOverlayEvent:()=>dd,ShowPanelEvent:()=>kn,ShowTooltipEvent:()=>gd,SizeUpdatedEvent:()=>ds,StopAllEvent:()=>us,TransitionDoneEvent:()=>Kh,ViewerEvent:()=>qe,ZoomUpdatedEvent:()=>Tn});var Tr=class extends Event{constructor(n,e=!1){super(n,{cancelable:e})}},lh=class extends EventTarget{dispatchEvent(n){return super.dispatchEvent(n)}addEventListener(n,e,t){super.addEventListener(n,e,t)}removeEventListener(n,e,t){super.removeEventListener(n,e,t)}},qe=class extends Tr{},ch=class hh extends qe{constructor(e,t){super(hh.type,!0),this.position=e,this.zoomLevel=t}};ch.type="before-animate";var Po=ch,dh=class uh extends qe{constructor(e,t){super(uh.type),this.timestamp=e,this.elapsed=t}};dh.type="before-render";var ss=dh,fh=class ph extends qe{constructor(e){super(ph.type,!0),this.position=e}};fh.type="before-rotate";var mh=fh,gh=class vh extends qe{constructor(e){super(vh.type),this.data=e}};gh.type="click";var _h=gh,xh=class Eh extends qe{constructor(e){super(Eh.type),this.options=e}containsOptions(...e){return e.some(t=>this.options.includes(t))}};xh.type="config-changed";var It=xh,Mh=class Sh extends qe{constructor(e){super(Sh.type),this.data=e}};Mh.type="dblclick";var yh=Mh,wh=class Th extends qe{constructor(e){super(Th.type),this.fullscreenEnabled=e}};wh.type="fullscreen";var rs=wh,bh=class Ah extends qe{constructor(e){super(Ah.type),this.notificationId=e}};bh.type="hide-notification";var as=bh,Ch=class Rh extends qe{constructor(e){super(Rh.type),this.overlayId=e}};Ch.type="hide-overlay";var Ph=Ch,Lh=class Dh extends qe{constructor(e){super(Dh.type),this.panelId=e}};Lh.type="hide-panel";var Bn=Lh,Ih=class Uh extends qe{constructor(e){super(Uh.type),this.tooltipData=e}};Ih.type="hide-tooltip";var Nh=Ih,Oh=class Fh extends qe{constructor(e,t){super(Fh.type,!0),this.key=e,this.originalEvent=t}matches(e){return wo(this.originalEvent,e)}};Oh.type="key-press";var zn=Oh,Bh=class zh extends qe{constructor(e){super(zh.type),this.progress=e}};Bh.type="load-progress";var kh=Bh,Hh=class Vh extends qe{constructor(e){super(Vh.type),this.panorama=e}};Hh.type="panorama-load";var Gh=Hh,Wh=class Xh extends qe{constructor(e){super(Xh.type),this.data=e}};Wh.type="panorama-loaded";var Oi=Wh,Yh=class qh extends qe{constructor(e,t){super(qh.type),this.panorama=e,this.error=t}};Yh.type="panorama-error";var $h=Yh,Zh=class jh extends qe{constructor(e){super(jh.type),this.completed=e}};Zh.type="transition-done";var Kh=Zh,Jh=class Qh extends qe{constructor(e){super(Qh.type),this.position=e}};Jh.type="position-updated";var os=Jh,ed=class td extends qe{constructor(e){super(td.type),this.roll=e}};ed.type="roll-updated";var ls=ed,nd=class id extends qe{constructor(){super(id.type)}};nd.type="ready";var cs=nd,sd=class rd extends qe{constructor(){super(rd.type)}};sd.type="render";var ad=sd,od=class ld extends qe{constructor(e){super(ld.type),this.notificationId=e}};od.type="show-notification";var hs=od,cd=class hd extends qe{constructor(e){super(hd.type),this.overlayId=e}};cd.type="show-overlay";var dd=cd,ud=class fd extends qe{constructor(e){super(fd.type),this.panelId=e}};ud.type="show-panel";var kn=ud,pd=class md extends qe{constructor(e,t){super(md.type),this.tooltip=e,this.tooltipData=t}};pd.type="show-tooltip";var gd=pd,vd=class _d extends qe{constructor(e){super(_d.type),this.size=e}};vd.type="size-updated";var ds=vd,xd=class Ed extends qe{constructor(){super(Ed.type)}};xd.type="stop-all";var us=xd,Md=class Sd extends qe{constructor(e){super(Sd.type),this.zoomLevel=e}};Md.type="zoom-updated";var Tn=Md,br=class extends qe{constructor(n,e,t,i,s){super(n),this.originalEvent=e,this.object=t,this.viewerPoint=i,this.userDataKey=s}},yd=class wd extends br{constructor(e,t,i,s){super(wd.type,e,t,i,s)}};yd.type="enter-object";var Td=yd,bd=class Ad extends br{constructor(e,t,i,s){super(Ad.type,e,t,i,s)}};bd.type="leave-object";var io=bd,Cd=class Rd extends br{constructor(e,t,i,s){super(Rd.type,e,t,i,s)}};Cd.type="hover-object";var Pd=Cd,Lo=class{constructor(n){this.viewer=n}init(){}destroy(){}supportsTransition(n){return!1}supportsPreload(n){return!1}textureCoordsToSphericalCoords(n,e){throw new Te("Current adapter does not support texture coordinates.")}sphericalCoordsToTextureCoords(n,e){throw new Te("Current adapter does not support texture coordinates.")}};Lo.supportsDownload=!1;function Gl(n){if(n){for(const[,e]of[["_",n],...Object.entries(n)])if(e.prototype instanceof Lo)return Ro(e.id,e.VERSION,"5.14.1"),e}return null}var Ji=`${Wn}_touchSupport`,Ct={loaded:!1,pixelRatio:1,isWebGLSupported:!1,maxTextureWidth:0,isTouchEnabled:null,__maxCanvasWidth:null,isIphone:!1,get maxCanvasWidth(){return this.__maxCanvasWidth===null&&(this.__maxCanvasWidth=t0(this.maxTextureWidth)),this.__maxCanvasWidth},load(){if(!this.loaded){const n=Q_();this.pixelRatio=window.devicePixelRatio||1,this.isWebGLSupported=!!n,this.maxTextureWidth=n?n.getParameter(n.MAX_TEXTURE_SIZE):0,this.isTouchEnabled=e0(),this.isIphone=/iPhone/i.test(navigator.userAgent),this.loaded=!0}if(!Ct.isWebGLSupported)throw new Te("WebGL 2 is not supported.");if(Ct.maxTextureWidth===0)throw new Te("Unable to detect system capabilities")}};function Q_(){try{return document.createElement("canvas").getContext("webgl2")}catch{return null}}function e0(){let n="ontouchstart"in window||navigator.maxTouchPoints>0;Ji in localStorage&&(n=localStorage[Ji]==="true");const e=new Promise(t=>{const i=()=>{window.removeEventListener("mousedown",s),window.removeEventListener("touchstart",r),clearTimeout(o)},s=()=>{i(),localStorage[Ji]=!1,t(!1)},r=()=>{i(),localStorage[Ji]=!0,t(!0)},a=()=>{i(),localStorage[Ji]=n,t(n)};window.addEventListener("mousedown",s,!1),window.addEventListener("touchstart",r,!1);const o=setTimeout(a,1e4)});return{initial:n,promise:e}}function t0(n){let e=n,t=!1;const i=document.createElement("canvas"),s=i.getContext("2d");for(i.width=1,i.height=1;e>1024&&!t;){const r=document.createElement("canvas"),a=r.getContext("2d");r.width=e,r.height=e/2;try{a.fillStyle="white",a.fillRect(e-1,e/2-1,1,1),s.drawImage(r,e-1,e/2-1,1,1,0,0,1,1),s.getImageData(0,0,1,1).data[0]>0&&(t=!0)}catch{}r.width=0,r.height=0,t||(e/=2)}if(t)return e;throw new Te("Unable to detect system capabilities")}var n0=yr({resolution:64,useXmpData:!0,blur:!1},{resolution:n=>{if(!n||!ke.isPowerOfTwo(n))throw new Te("EquirectangularAdapter resolution must be power of two.");return n}}),Ar=class Ld extends Lo{static withConfig(e){return[Ld,e]}constructor(e,t){super(e),this.config=n0(t),this.SPHERE_SEGMENTS=this.config.resolution,this.SPHERE_HORIZONTAL_SEGMENTS=this.SPHERE_SEGMENTS/2}supportsTransition(){return!0}supportsPreload(){return!0}textureCoordsToSphericalCoords(e,t){if(xt(e.textureX)||xt(e.textureY))throw new Te("Texture position is missing 'textureX' or 'textureY'");const i=(e.textureX+t.croppedX)/t.fullWidth*Math.PI*2,s=(e.textureY+t.croppedY)/t.fullHeight*Math.PI;return{yaw:i>=Math.PI?i-Math.PI:i+Math.PI,pitch:Math.PI/2-s}}sphericalCoordsToTextureCoords(e,t){const i=e.yaw/Math.PI/2*t.fullWidth,s=e.pitch/Math.PI*t.fullHeight;let r=Math.round(e.yaw<Math.PI?i+t.fullWidth/2:i-t.fullWidth/2)-t.croppedX,a=Math.round(t.fullHeight/2-s)-t.croppedY;return(r<0||r>t.croppedWidth||a<0||a>t.croppedHeight)&&(r=a=void 0),{textureX:r,textureY:a}}async loadTexture(e,t=!0,i,s=this.config.useXmpData){if(typeof e!="string"&&(typeof e!="object"||!e.path))return Promise.reject(new Te("Invalid panorama url, are you using the right adapter?"));let r;typeof e=="string"?r={path:e,data:i}:r={data:i,...e};const a=await this.viewer.textureLoader.loadFile(r.path,t?u=>this.viewer.textureLoader.dispatchProgress(u):null,r.path),o=s?await this.loadXMP(a):null,c=await this.viewer.textureLoader.blobToImage(a);typeof r.data=="function"&&(r.data=r.data(c,o));const l=sh(c.width,c.height,r.data,o),h=this.createEquirectangularTexture(c);return{panorama:e,texture:h,panoData:l,cacheKey:r.path}}async loadXMP(e){const t=await this.loadBlobAsString(e),i=t.indexOf("<x:xmpmeta");if(i===-1)return null;const s=t.indexOf("</x:xmpmeta>",i);if(s===-1)return null;const r=t.substring(i,s);return r.includes("GPano:")?{fullWidth:Bt(r,"FullPanoWidthPixels"),fullHeight:Bt(r,"FullPanoHeightPixels"),croppedWidth:Bt(r,"CroppedAreaImageWidthPixels"),croppedHeight:Bt(r,"CroppedAreaImageHeightPixels"),croppedX:Bt(r,"CroppedAreaLeftPixels"),croppedY:Bt(r,"CroppedAreaTopPixels"),poseHeading:Bt(r,"PoseHeadingDegrees",!1),posePitch:Bt(r,"PosePitchDegrees",!1),poseRoll:Bt(r,"PoseRollDegrees",!1),initialHeading:Bt(r,"InitialViewHeadingDegrees",!1),initialPitch:Bt(r,"InitialViewPitchDegrees",!1),initialFov:Bt(r,"InitialHorizontalFOVDegrees",!1)}:null}loadBlobAsString(e){return new Promise((t,i)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=i,s.readAsText(e)})}createEquirectangularTexture(e){if(this.config.blur||e.width>Ct.maxTextureWidth){const t=Math.min(1,Ct.maxCanvasWidth/e.width),i=new OffscreenCanvas(Math.floor(e.width*t),Math.floor(e.height*t)),s=i.getContext("2d");return this.config.blur&&(s.filter=`blur(${i.width/2048}px)`),s.drawImage(e,0,0,i.width,i.height),to(i)}return to(e)}createMesh(e){const t=e.croppedX/e.fullWidth*2*Math.PI,i=e.croppedWidth/e.fullWidth*2*Math.PI,s=e.croppedY/e.fullHeight*Math.PI,r=e.croppedHeight/e.fullHeight*Math.PI,a=new ys(li,Math.round(this.SPHERE_SEGMENTS/(2*Math.PI)*i),Math.round(this.SPHERE_HORIZONTAL_SEGMENTS/Math.PI*r),-Math.PI/2+t,i,s,r).scale(-1,1,1),o=new Ms({depthTest:!1,depthWrite:!1});return new Yt(a,o)}setTexture(e,t){e.material.map=t.texture}setTextureOpacity(e,t){e.material.opacity=t,e.material.transparent=t<1}disposeTexture({texture:e}){e.dispose()}disposeMesh(e){e.geometry.dispose(),e.material.dispose()}};Ar.id="equirectangular";Ar.VERSION="5.14.1";Ar.supportsDownload=!0;var Dd=Ar,Id=class Ud extends Dd{static withConfig(e){return[Ud,e]}constructor(e,t){super(e,{resolution:t?.resolution??64,useXmpData:!1})}async loadTexture(e,t){const i=await super.loadTexture(e,t,null,!1);return i.panoData=null,i}createMesh(){const e=new ys(li,this.SPHERE_SEGMENTS,this.SPHERE_HORIZONTAL_SEGMENTS).scale(-1,1,1).toNonIndexed(),t=e.getAttribute("uv"),i=e.getAttribute("normal");for(let r=0;r<t.count;r++)for(let a=0;a<3;a++){const o=r*3+a,c=i.getX(o),l=i.getY(o),h=i.getZ(o),u=.947;if(r<t.count/6){const p=c===0&&h===0?1:Math.acos(l)/Math.sqrt(c*c+h*h)*(2/Math.PI);t.setXY(o,c*(u/4)*p+1/4,h*(u/2)*p+1/2)}else{const p=c===0&&h===0?1:Math.acos(-l)/Math.sqrt(c*c+h*h)*(2/Math.PI);t.setXY(o,-c*(u/4)*p+3/4,h*(u/2)*p+1/2)}}e.rotateX(-Math.PI/2),e.rotateY(Math.PI);const s=new Ms({depthTest:!1,depthWrite:!1});return new Yt(e,s)}};Id.id="dual-fisheye";Id.VERSION="5.14.1";var Yn=class Nd{constructor(e,t){this.parent=e,this.children=[],this.state={visible:!0},this.viewer=e instanceof Nd?e.viewer:e,this.container=document.createElement(t.tagName??"div"),this.container.className=t.className||"",this.parent.children.push(this),this.parent.container.appendChild(this.container)}destroy(){this.parent.container.removeChild(this.container);const e=this.parent.children.indexOf(this);e!==-1&&this.parent.children.splice(e,1),this.children.slice().forEach(t=>t.destroy()),this.children.length=0}toggle(e=!this.isVisible()){e?this.show():this.hide()}hide(e){this.container.style.display="none",this.state.visible=!1}show(e){this.container.style.display="",this.state.visible=!0}isVisible(){return this.state.visible}},i0=yr({id:null,tagName:null,className:null,title:null,hoverScale:!1,collapsable:!1,tabbable:!0,icon:null,iconActive:null}),kt=class extends Yn{constructor(n,e){super(n,{tagName:e.tagName,className:`psv-button ${e.hoverScale?"psv-button--hover-scale":""} ${e.className||""}`}),this.state={visible:!0,enabled:!0,supported:!0,collapsed:!1,active:!1,width:0},this.config=i0(e),e.id||(this.config.id=this.constructor.id),e.icon&&this.__setIcon(e.icon),this.state.width=this.container.offsetWidth,this.config.title?this.container.title=this.viewer.config.lang[this.config.title]??this.config.title:this.id&&this.id in this.viewer.config.lang&&(this.container.title=this.viewer.config.lang[this.id]),e.tabbable&&(this.container.tabIndex=0),this.container.addEventListener("click",t=>{this.state.enabled&&this.onClick(),t.stopPropagation()}),this.container.addEventListener("keydown",t=>{t.key===_t.Enter&&this.state.enabled&&(this.onClick(),t.stopPropagation())})}get id(){return this.config.id}get title(){return this.container.title}get content(){return this.container.innerHTML}get width(){return this.state.width}get collapsable(){return this.config.collapsable}show(n=!0){this.isVisible()||(this.state.visible=!0,this.state.collapsed||(this.container.style.display=""),n&&this.viewer.navbar.autoSize())}hide(n=!0){this.isVisible()&&(this.state.visible=!1,this.container.style.display="none",n&&this.viewer.navbar.autoSize())}checkSupported(){bo(this.isSupported(),(n,e)=>{this.state&&(this.state.supported=n,e?n||this.hide():this.toggle(n))})}autoSize(){}isSupported(){return!0}toggleActive(n=!this.state.active){n!==this.state.active&&(this.state.active=n,Er(this.container,"psv-button--active",this.state.active),this.config.iconActive&&this.__setIcon(this.state.active?this.config.iconActive:this.config.icon))}disable(){this.container.classList.add("psv-button--disabled"),this.state.enabled=!1}enable(){this.container.classList.remove("psv-button--disabled"),this.state.enabled=!0}collapse(){this.state.collapsed=!0,this.container.style.display="none"}uncollapse(){this.state.collapsed=!1,this.state.visible&&(this.container.style.display="")}__setIcon(n){this.container.innerHTML=n,yo(this.container.querySelector("svg"),"psv-button-svg")}},s0=class extends kt{constructor(n,e){super(n,{id:e.id??`psvButton-${Math.random().toString(36).substring(2)}`,className:`psv-custom-button ${e.className||""}`,hoverScale:!1,collapsable:e.collapsable!==!1,tabbable:e.tabbable!==!1,title:e.title}),this.customOnClick=e.onClick,e.content&&(typeof e.content=="string"?this.container.innerHTML=e.content:(this.container.classList.add("psv-custom-button--no-padding"),e.content.style.height="100%",e.content.attachViewer?.(this.viewer),this.container.appendChild(e.content))),this.state.width=this.container.offsetWidth,e.disabled&&this.disable(),e.visible===!1&&this.hide()}onClick(){this.customOnClick?.(this.viewer)}},xs=class extends kt{constructor(n){super(n,{className:"psv-description-button",hoverScale:!0,collapsable:!1,tabbable:!0,icon:tn.info}),this.mode=0,this.viewer.addEventListener(as.type,this),this.viewer.addEventListener(hs.type,this),this.viewer.addEventListener(Bn.type,this),this.viewer.addEventListener(kn.type,this),this.viewer.addEventListener(It.type,this)}destroy(){this.viewer.removeEventListener(as.type,this),this.viewer.removeEventListener(hs.type,this),this.viewer.removeEventListener(Bn.type,this),this.viewer.removeEventListener(kn.type,this),this.viewer.removeEventListener(It.type,this),super.destroy()}handleEvent(n){if(n instanceof It){n.containsOptions("description")&&this.autoSize(!0);return}if(!this.mode)return;let e=!1;n instanceof as?e=this.mode===1:n instanceof hs?e=this.mode===1&&n.notificationId!==Mt.DESCRIPTION:n instanceof Bn?e=this.mode===2:n instanceof kn&&(e=this.mode===2&&n.panelId!==Mt.DESCRIPTION),e&&(this.toggleActive(!1),this.mode=0)}onClick(){this.mode?this.__close():this.__open()}hide(n){super.hide(n),this.mode&&this.__close()}autoSize(n=!1){if(n){const e=this.viewer.navbar.getButton("caption",!1),t=e&&!e.isVisible(),i=!!this.viewer.config.description;t||i?this.show(!1):this.hide(!1)}}__close(){switch(this.mode){case 1:this.viewer.notification.hide(Mt.DESCRIPTION);break;case 2:this.viewer.panel.hide(Mt.DESCRIPTION);break}}__open(){this.toggleActive(!0),this.viewer.config.description?(this.mode=2,this.viewer.panel.show({id:Mt.DESCRIPTION,content:`${this.viewer.config.caption?`<p>${this.viewer.config.caption}</p>`:""}${this.viewer.config.description}`})):(this.mode=1,this.viewer.notification.show({id:Mt.DESCRIPTION,content:this.viewer.config.caption}))}};xs.id="description";var Od=class extends kt{constructor(n){super(n,{tagName:"a",className:"psv-download-button",hoverScale:!0,collapsable:!0,tabbable:!0,icon:tn.download}),this.viewer.addEventListener(It.type,this),this.viewer.addEventListener(Oi.type,this)}destroy(){this.viewer.removeEventListener(It.type,this),this.viewer.removeEventListener(Oi.type,this),super.destroy()}handleEvent(n){n instanceof It?(n.containsOptions("downloadUrl")&&this.checkSupported(),n.containsOptions("downloadUrl","downloadName")&&this.__update()):n instanceof Oi&&this.__update()}onClick(){}checkSupported(){this.viewer.adapter.constructor.supportsDownload||this.viewer.config.downloadUrl?this.show():this.hide()}__update(){const n=this.container;n.href=this.viewer.config.downloadUrl||this.viewer.config.panorama,n.target="_blank",n.href.startsWith("data:")&&!this.viewer.config.downloadName?n.download="panorama."+n.href.substring(0,n.href.indexOf(";")).split("/").pop():n.download=this.viewer.config.downloadName||n.href.split("/").pop()}};Od.id="download";var Fd=class extends kt{constructor(n){super(n,{className:"psv-fullscreen-button",hoverScale:!0,collapsable:!1,tabbable:!0,icon:tn.fullscreenIn,iconActive:tn.fullscreenOut}),this.viewer.addEventListener(rs.type,this)}destroy(){this.viewer.removeEventListener(rs.type,this),super.destroy()}handleEvent(n){n instanceof rs&&this.toggleActive(n.fullscreenEnabled)}onClick(){this.viewer.toggleFullscreen()}};Fd.id="fullscreen";var r0="psvButton",a0=(n,e)=>`
<div class="psv-panel-menu psv-panel-menu--stripped">
  <h1 class="psv-panel-menu-title">${tn.menu} ${e}</h1>
  <ul class="psv-panel-menu-list">
    ${n.map(t=>`
    <li data-psv-button="${t.id}" class="psv-panel-menu-item" tabindex="0">
      <span class="psv-panel-menu-item-icon">${t.content}</span>
      <span class="psv-panel-menu-item-label">${t.title}</span>
    </li>
    `).join("")}
  </ul>
</div>
`,ar=class extends kt{constructor(n){super(n,{className:"psv-menu-button",hoverScale:!0,collapsable:!1,tabbable:!0,icon:tn.menu}),this.viewer.addEventListener(kn.type,this),this.viewer.addEventListener(Bn.type,this),super.hide()}destroy(){this.viewer.removeEventListener(kn.type,this),this.viewer.removeEventListener(Bn.type,this),super.destroy()}handleEvent(n){n instanceof kn?this.toggleActive(n.panelId===Mt.MENU):n instanceof Bn&&this.toggleActive(!1)}onClick(){this.state.active?this.__hideMenu():this.__showMenu()}hide(n){super.hide(n),this.__hideMenu()}show(n){super.show(n),this.state.active&&this.__showMenu()}__showMenu(){this.viewer.panel.show({id:Mt.MENU,content:a0(this.viewer.navbar.collapsed,this.viewer.config.lang.menu),noMargin:!0,clickHandler:n=>{const e=n?Vc(n,".psv-panel-menu-item"):void 0,t=e?e.dataset[r0]:void 0;t&&(this.viewer.navbar.getButton(t).onClick(),this.__hideMenu())}})}__hideMenu(){this.viewer.panel.hide(Mt.MENU)}};ar.id="menu";function o0(n){let e=0;switch(n){case 0:e=90;break;case 1:e=-90;break;case 3:e=180;break;default:e=0;break}return tn.arrow.replace("rotate(0",`rotate(${e}`)}var Ts=class extends kt{constructor(n,e){super(n,{className:"psv-move-button",hoverScale:!0,collapsable:!1,tabbable:!0,icon:o0(e)}),this.direction=e,this.handler=new wr,this.container.addEventListener("mousedown",this),this.container.addEventListener("keydown",this),this.container.addEventListener("keyup",this),this.viewer.container.addEventListener("mouseup",this),this.viewer.container.addEventListener("touchend",this)}destroy(){this.__onMouseUp(),this.viewer.container.removeEventListener("mouseup",this),this.viewer.container.removeEventListener("touchend",this),super.destroy()}handleEvent(n){switch(n.type){case"mousedown":this.__onMouseDown();break;case"mouseup":this.__onMouseUp();break;case"touchend":this.__onMouseUp();break;case"keydown":n.key===_t.Enter&&this.__onMouseDown();break;case"keyup":n.key===_t.Enter&&this.__onMouseUp();break}}onClick(){}isSupported(){return Sr(Ct.isTouchEnabled)}__onMouseDown(){if(!this.state.enabled)return;const n={};switch(this.direction){case 0:n.pitch=!1;break;case 1:n.pitch=!0;break;case 3:n.yaw=!1;break;default:n.yaw=!0;break}this.viewer.stopAll(),this.viewer.dynamics.position.roll(n),this.handler.down()}__onMouseUp(){this.state.enabled&&this.handler.up(()=>{this.viewer.dynamics.position.stop(),this.viewer.resetIdleTimer()})}};Ts.groupId="move";var Bd=class extends Ts{constructor(n){super(n,1)}};Bd.id="moveDown";var zd=class extends Ts{constructor(n){super(n,2)}};zd.id="moveLeft";var kd=class extends Ts{constructor(n){super(n,3)}};kd.id="moveRight";var Hd=class extends Ts{constructor(n){super(n,0)}};Hd.id="moveUp";var Do=class extends kt{constructor(n,e,t){super(n,{className:"psv-zoom-button",hoverScale:!0,collapsable:!1,tabbable:!0,icon:e}),this.direction=t,this.handler=new wr,this.container.addEventListener("mousedown",this),this.container.addEventListener("keydown",this),this.container.addEventListener("keyup",this),this.viewer.container.addEventListener("mouseup",this),this.viewer.container.addEventListener("touchend",this)}destroy(){this.__onMouseUp(),this.viewer.container.removeEventListener("mouseup",this),this.viewer.container.removeEventListener("touchend",this),super.destroy()}handleEvent(n){switch(n.type){case"mousedown":this.__onMouseDown();break;case"mouseup":this.__onMouseUp();break;case"touchend":this.__onMouseUp();break;case"keydown":n.key===_t.Enter&&this.__onMouseDown();break;case"keyup":n.key===_t.Enter&&this.__onMouseUp();break}}onClick(){}isSupported(){return Sr(Ct.isTouchEnabled)}__onMouseDown(){this.state.enabled&&(this.viewer.dynamics.zoom.roll(this.direction===1),this.handler.down())}__onMouseUp(){this.state.enabled&&this.handler.up(()=>this.viewer.dynamics.zoom.stop())}};Do.groupId="zoom";var Vd=class extends Do{constructor(n){super(n,tn.zoomIn,0)}};Vd.id="zoomIn";var Gd=class extends Do{constructor(n){super(n,tn.zoomOut,1)}};Gd.id="zoomOut";var Io=class extends kt{constructor(n){super(n,{className:"psv-zoom-range",hoverScale:!1,collapsable:!1,tabbable:!1}),this.zoomRange=document.createElement("div"),this.zoomRange.className="psv-zoom-range-line",this.container.appendChild(this.zoomRange),this.zoomValue=document.createElement("div"),this.zoomValue.className="psv-zoom-range-handle",this.zoomRange.appendChild(this.zoomValue),this.slider=new oh(this.container,"HORIZONTAL",e=>this.__onSliderUpdate(e)),this.mediaMinWidth=parseInt(hn(this.container,"max-width"),10),this.viewer.addEventListener(Tn.type,this),this.viewer.state.ready?this.__moveZoomValue(this.viewer.getZoomLevel()):this.viewer.addEventListener(cs.type,this)}destroy(){this.slider.destroy(),this.viewer.removeEventListener(Tn.type,this),this.viewer.removeEventListener(cs.type,this),super.destroy()}handleEvent(n){n instanceof Tn?this.__moveZoomValue(n.zoomLevel):n instanceof cs&&this.__moveZoomValue(this.viewer.getZoomLevel())}onClick(){}isSupported(){return Sr(Ct.isTouchEnabled)}autoSize(){this.state.supported&&(this.viewer.state.size.width<=this.mediaMinWidth&&this.state.visible?this.hide(!1):this.viewer.state.size.width>this.mediaMinWidth&&!this.state.visible&&this.show(!1))}__moveZoomValue(n){this.zoomValue.style.left=n/100*this.zoomRange.offsetWidth-this.zoomValue.offsetWidth/2+"px"}__onSliderUpdate(n){n.mousedown&&this.viewer.zoom(n.value*100)}};Io.id="zoomRange";Io.groupId="zoom";var Wd=class extends lh{constructor(n){super(),this.viewer=n}init(){}destroy(){}},Xd=class extends Wd{constructor(n,e){super(n),this.config=this.constructor.configParser(e)}setOption(n,e){this.setOptions({[n]:e})}setOptions(n){const e={...this.config,...n},t=this.constructor,i=t.configParser,s=t.readonlyOptions,r=t.id;for(let[a,o]of Object.entries(n)){if(!(a in i.defaults)){St(`${r}: Unknown option "${a}"`);continue}if(s.includes(a)){St(`${r}: Option "${a}" cannot be updated`);continue}a in i.parsers&&(o=i.parsers[a](o,{rawConfig:e,defValue:i.defaults[a]})),this.config[a]=o}}};Xd.readonlyOptions=[];function so(n){if(n){for(const[,e]of[["_",n],...Object.entries(n)])if(e.prototype instanceof Wd)return Ro(e.id,e.VERSION,"5.14.1"),e}return null}var Hi={panorama:null,container:null,adapter:[Dd,null],plugins:[],caption:null,description:null,downloadUrl:null,downloadName:null,loadingImg:null,loadingTxt:"",size:null,fisheye:0,minFov:30,maxFov:90,defaultZoomLvl:50,defaultYaw:0,defaultPitch:0,sphereCorrection:null,moveSpeed:1,zoomSpeed:1,moveInertia:.8,mousewheel:!0,mousemove:!0,mousewheelCtrlKey:!1,touchmoveTwoFingers:!1,panoData:null,requestHeaders:null,canvasBackground:"#000",defaultTransition:{speed:1500,rotation:!0,effect:"fade"},rendererParameters:{alpha:!0,antialias:!0},withCredentials:()=>!1,navbar:["zoom","move","download","description","caption","fullscreen"],lang:{zoom:"Zoom",zoomOut:"Zoom out",zoomIn:"Zoom in",moveUp:"Move up",moveDown:"Move down",moveLeft:"Move left",moveRight:"Move right",description:"Description",download:"Download",fullscreen:"Fullscreen",loading:"Loading...",menu:"Menu",close:"Close",twoFingers:"Use two fingers to navigate",ctrlZoom:"Use ctrl + scroll to zoom the image",loadError:"The panorama cannot be loaded",webglError:"Your browser does not seem to support WebGL"},keyboard:"fullscreen",keyboardActions:{[_t.ArrowUp]:"ROTATE_UP",[_t.ArrowDown]:"ROTATE_DOWN",[_t.ArrowRight]:"ROTATE_RIGHT",[_t.ArrowLeft]:"ROTATE_LEFT",[_t.PageUp]:"ZOOM_IN",[_t.PageDown]:"ZOOM_OUT",[_t.Plus]:"ZOOM_IN",[_t.Minus]:"ZOOM_OUT"}},Wl={panorama:"Use setPanorama method to change the panorama",panoData:"Use setPanorama method to change the panorama",container:"Cannot change viewer container",adapter:"Cannot change adapter",plugins:"Cannot change plugins"},ro={container:n=>{if(!n)throw new Te("No value given for container.");return n},adapter:(n,{defValue:e})=>{if(n?Array.isArray(n)?n=[Gl(n[0]),n[1]]:n=[Gl(n),null]:n=e,!n[0])throw new Te("An undefined value was given for adapter.");if(!n[0].id)throw new Te("Adapter has no id.");return n},defaultYaw:n=>on(n),defaultPitch:n=>on(n,!0),defaultZoomLvl:n=>ke.clamp(n,0,100),minFov:(n,{rawConfig:e})=>(e.maxFov<n&&(St("maxFov cannot be lower than minFov"),n=e.maxFov),ke.clamp(n,1,179)),maxFov:(n,{rawConfig:e})=>(n<e.minFov&&(n=e.minFov),ke.clamp(n,1,179)),moveInertia:(n,{defValue:e})=>n===!0?e:n===!1?0:n,lang:n=>({...Hi.lang,...n}),fisheye:n=>n===!0?1:n===!1?0:n,requestHeaders:n=>n&&typeof n=="object"?()=>n:typeof n=="function"?n:null,withCredentials:n=>typeof n=="boolean"?()=>n:typeof n=="function"?n:()=>!1,defaultTransition:(n,{defValue:e})=>n===null||n.speed===0?null:{...e,...n},rendererParameters:(n,{defValue:e})=>({...n,...e}),plugins:n=>n.map((e,t)=>{if(Array.isArray(e)?e=[so(e[0]),e[1]]:e=[so(e),null],!e[0])throw new Te(`An undefined value was given for plugin ${t}.`);if(!e[0].id)throw new Te(`Plugin ${t} has no id.`);return e}),navbar:n=>n===!1?null:n===!0?Mr(Hi.navbar):typeof n=="string"?n.split(/[ ,]/):n},l0=yr(Hi,ro),Di=class extends kt{constructor(n){super(n,{className:"psv-caption",hoverScale:!1,collapsable:!1,tabbable:!0}),this.contentWidth=0,this.state.width=0,this.contentElt=document.createElement("div"),this.contentElt.className="psv-caption-content",this.container.appendChild(this.contentElt),this.setCaption(this.viewer.config.caption)}hide(){this.contentElt.style.display="none",this.state.visible=!1}show(){this.contentElt.style.display="",this.state.visible=!0}onClick(){}setCaption(n){this.show(),this.contentElt.innerHTML=n??"",this.contentElt.innerHTML?this.contentWidth=this.contentElt.offsetWidth:this.contentWidth=0,this.autoSize()}autoSize(){this.toggle(this.container.offsetWidth>=this.contentWidth),this.__refreshButton()}__refreshButton(){this.viewer.navbar.getButton(xs.id,!1)?.autoSize(!0)}};Di.id="caption";var ao={},pr={};function c0(n,e){if(!n.id)throw new Te("Button id is required");ao[n.id]=n,n.groupId&&(pr[n.groupId]=pr[n.groupId]||[]).push(n)}[Gd,Io,Vd,xs,Di,Od,Fd,zd,kd,Hd,Bd].forEach(n=>c0(n));var h0=class extends Yn{constructor(n){super(n,{className:`psv-navbar ${ws}`}),this.collapsed=[],this.state.visible=!1}show(){this.viewer.container.classList.add("psv--has-navbar"),this.container.classList.add("psv-navbar--open"),this.state.visible=!0}hide(){this.viewer.container.classList.remove("psv--has-navbar"),this.container.classList.remove("psv-navbar--open"),this.state.visible=!1}setButtons(n){this.children.slice().forEach(e=>e.destroy()),this.children.length=0,n.indexOf(Di.id)!==-1&&n.indexOf(xs.id)===-1&&n.splice(n.indexOf(Di.id),0,xs.id),n.forEach(e=>{typeof e=="object"?new s0(this,e):ao[e]?new ao[e](this):pr[e]?pr[e].forEach(t=>{new t(this)}):St(`Unknown button ${e}`)}),new ar(this),this.children.forEach(e=>{e instanceof kt&&e.checkSupported()}),this.autoSize()}setCaption(n){this.children.some(e=>e instanceof Di?(e.setCaption(n),!0):!1)}getButton(n,e=!0){const t=this.children.find(i=>i instanceof kt&&i.id===n);return!t&&e&&St(`button "${n}" not found in the navbar`),t}focusButton(n){this.isVisible()&&(this.getButton(n,!1)?.container||this.container.firstElementChild)?.focus()}autoSize(){this.children.forEach(i=>{i instanceof kt&&i.autoSize()});const n=this.container.offsetWidth;let e=0;const t=[];this.children.forEach(i=>{i.isVisible()&&i instanceof kt&&(e+=i.width,i.collapsable&&t.push(i))}),e!==0&&(n<e&&t.length>0?(t.forEach(i=>i.collapse()),this.collapsed=t,this.getButton(ar.id).show(!1)):n>=e&&this.collapsed.length>0&&(this.collapsed.forEach(i=>i.uncollapse()),this.collapsed=[],this.getButton(ar.id).hide(!1)),this.getButton(Di.id,!1)?.autoSize())}};Fn.enabled=!1;var Ri={enabled:!0,maxItems:10,ttl:600,items:{},purgeInterval:null,init(){Fn.enabled&&(St("ThreeJS cache should be disabled"),Fn.enabled=!1),!this.purgeInterval&&this.enabled&&(this.purgeInterval=setInterval(()=>this.purge(),60*1e3))},add(n,e,t){this.enabled&&e&&(this.items[e]=this.items[e]??{files:{},lastAccess:null},this.items[e].files[n]=t,this.items[e].lastAccess=Date.now())},get(n,e){if(this.enabled&&e&&this.items[e])return this.items[e].lastAccess=Date.now(),this.items[e].files[n]},remove(n,e){this.enabled&&e&&this.items[e]&&(delete this.items[e].files[n],Object.keys(this.items[e].files).length===0&&delete this.items[e])},purge(){Object.entries(this.items).sort(([,n],[,e])=>e.lastAccess-n.lastAccess).forEach(([n,{lastAccess:e}],t)=>{t>0&&(Date.now()-e>=this.ttl*1e3||t>=this.maxItems)&&delete this.items[n]})}},d0=class extends Yn{constructor(n){super(n,{className:"psv-loader-container"}),this.loader=document.createElement("div"),this.loader.className="psv-loader",this.container.appendChild(this.loader),this.size=this.loader.offsetWidth,this.canvas=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.canvas.setAttribute("class","psv-loader-canvas"),this.canvas.setAttribute("viewBox",`0 0 ${this.size} ${this.size}`),this.loader.appendChild(this.canvas),this.textColor=hn(this.loader,"color"),this.color=hn(this.canvas,"color"),this.border=parseInt(hn(this.loader,"--psv-loader-border"),10),this.thickness=parseInt(hn(this.loader,"--psv-loader-tickness"),10);const e=this.size/2;this.canvas.innerHTML=`
            <circle cx="${e}" cy="${e}" r="${e}" fill="${this.color}"/>
            <path d="" fill="none" stroke="${this.textColor}" stroke-width="${this.thickness}" stroke-linecap="round"/>
        `,this.viewer.addEventListener(It.type,this),this.__updateContent(),this.hide()}destroy(){this.viewer.removeEventListener(It.type,this),super.destroy()}handleEvent(n){n instanceof It&&n.containsOptions("loadingImg","loadingTxt","lang")&&this.__updateContent()}setProgress(n){this.container.classList.remove("psv-loader--undefined");const e=ke.clamp(n,0,99.999)/100*Math.PI*2,t=this.size/2,i=t,s=this.thickness/2+this.border,r=(this.size-this.thickness)/2-this.border,a=Math.sin(e)*r+t,o=-Math.cos(e)*r+t,c=n>50?"1":"0";this.canvas.querySelector("path").setAttributeNS(null,"d",`M ${i} ${s} A ${r} ${r} 0 ${c} 1 ${a} ${o}`)}showUndefined(){this.show(),this.setProgress(25),this.container.classList.add("psv-loader--undefined")}__updateContent(){const n=this.loader.querySelector(".psv-loader-image, .psv-loader-text");n&&this.loader.removeChild(n);let e;if(this.viewer.config.loadingImg?(e=document.createElement("img"),e.className="psv-loader-image",e.src=this.viewer.config.loadingImg):this.viewer.config.loadingTxt!==null&&(e=document.createElement("div"),e.className="psv-loader-text",e.innerHTML=this.viewer.config.loadingTxt||this.viewer.config.lang.loading),e){const t=Math.round(Math.sqrt(2*Math.pow(this.size/2-this.thickness/2-this.border,2)));e.style.maxWidth=t+"px",e.style.maxHeight=t+"px",this.loader.appendChild(e)}}},u0=class extends Yn{constructor(n){super(n,{className:"psv-notification"}),this.state={visible:!1,contentId:null,timeout:null},this.content=document.createElement("div"),this.content.className="psv-notification-content",this.container.appendChild(this.content),this.content.addEventListener("click",()=>this.hide())}isVisible(n){return this.state.visible&&(!n||!this.state.contentId||this.state.contentId===n)}toggle(){throw new Te("Notification cannot be toggled")}show(n){this.state.timeout&&(clearTimeout(this.state.timeout),this.state.timeout=null),typeof n=="string"&&(n={content:n}),this.state.contentId=n.id||null,this.content.innerHTML=n.content,this.container.classList.add("psv-notification--visible"),this.state.visible=!0,this.viewer.dispatchEvent(new hs(this.state.contentId)),n.timeout&&(this.state.timeout=setTimeout(()=>this.hide(this.state.contentId),n.timeout))}hide(n){if(this.isVisible(n)){const e=this.state.contentId;this.container.classList.remove("psv-notification--visible"),this.state.visible=!1,this.state.contentId=null,this.viewer.dispatchEvent(new as(e))}}},f0=class extends Yn{constructor(n){super(n,{className:`psv-overlay ${ws}`}),this.state={visible:!1,contentId:null,dismissible:!0},this.image=document.createElement("div"),this.image.className="psv-overlay-image",this.container.appendChild(this.image),this.title=document.createElement("div"),this.title.className="psv-overlay-title",this.container.appendChild(this.title),this.text=document.createElement("div"),this.text.className="psv-overlay-text",this.container.appendChild(this.text),this.container.addEventListener("click",this),this.viewer.addEventListener(zn.type,this),super.hide()}destroy(){this.viewer.removeEventListener(zn.type,this),super.destroy()}handleEvent(n){n.type==="click"?this.isVisible()&&this.state.dismissible&&(this.hide(),n.stopPropagation()):n instanceof zn&&this.isVisible()&&this.state.dismissible&&n.matches(_t.Escape)&&(this.hide(),n.preventDefault())}isVisible(n){return this.state.visible&&(!n||!this.state.contentId||this.state.contentId===n)}toggle(){throw new Te("Overlay cannot be toggled")}show(n){typeof n=="string"&&(n={title:n}),this.state.contentId=n.id||null,this.state.dismissible=n.dismissible!==!1,this.image.innerHTML=n.image||"",this.title.innerHTML=n.title||"",this.text.innerHTML=n.text||"",super.show(),this.viewer.dispatchEvent(new dd(this.state.contentId))}hide(n){if(this.isVisible(n)){const e=this.state.contentId;super.hide(),this.state.contentId=null,this.viewer.dispatchEvent(new Ph(e))}}},p0=200,aa="psv-panel-content--no-interaction",m0=class extends Yn{constructor(n){super(n,{className:`psv-panel ${ws}`}),this.state={visible:!1,contentId:null,mouseX:0,mouseY:0,mousedown:!1,clickHandler:null,keyHandler:null,width:{}};const e=document.createElement("div");e.className="psv-panel-resizer",this.container.appendChild(e);const t=document.createElement("div");t.className="psv-panel-close-button",t.innerHTML=tn.close,t.title=n.config.lang.close,this.container.appendChild(t),this.content=document.createElement("div"),this.content.className="psv-panel-content",this.container.appendChild(this.content),t.addEventListener("click",()=>this.hide()),e.addEventListener("mousedown",this),e.addEventListener("touchstart",this),this.viewer.container.addEventListener("mouseup",this),this.viewer.container.addEventListener("touchend",this),this.viewer.container.addEventListener("mousemove",this),this.viewer.container.addEventListener("touchmove",this),this.viewer.addEventListener(zn.type,this)}destroy(){this.viewer.removeEventListener(zn.type,this),this.viewer.container.removeEventListener("mousemove",this),this.viewer.container.removeEventListener("touchmove",this),this.viewer.container.removeEventListener("mouseup",this),this.viewer.container.removeEventListener("touchend",this),super.destroy()}handleEvent(n){switch(n.type){case"mousedown":this.__onMouseDown(n);break;case"touchstart":this.__onTouchStart(n);break;case"mousemove":this.__onMouseMove(n);break;case"touchmove":this.__onTouchMove(n);break;case"mouseup":this.__onMouseUp(n);break;case"touchend":this.__onTouchEnd(n);break;case zn.type:this.__onKeyPress(n);break}}isVisible(n){return this.state.visible&&(!n||!this.state.contentId||this.state.contentId===n)}toggle(){throw new Te("Panel cannot be toggled")}show(n){typeof n=="string"&&(n={content:n});const e=this.isVisible(n.id);this.state.contentId=n.id||null,this.state.visible=!0,this.state.clickHandler&&(this.content.removeEventListener("click",this.state.clickHandler),this.content.removeEventListener("keydown",this.state.keyHandler),this.state.clickHandler=null,this.state.keyHandler=null),n.id&&this.state.width[n.id]?this.container.style.width=this.state.width[n.id]:n.width?this.container.style.width=n.width:this.container.style.width=null,this.content.innerHTML=n.content,this.content.scrollTop=0,this.container.classList.add("psv-panel--open"),Er(this.content,"psv-panel-content--no-margin",n.noMargin===!0),n.clickHandler&&(this.state.clickHandler=t=>{n.clickHandler(cr(t))},this.state.keyHandler=t=>{t.key===_t.Enter&&n.clickHandler(cr(t))},this.content.addEventListener("click",this.state.clickHandler),this.content.addEventListener("keydown",this.state.keyHandler),e||setTimeout(()=>{this.content.querySelector("a,button,[tabindex]")?.focus()},300)),this.viewer.dispatchEvent(new kn(this.state.contentId))}hide(n){if(this.isVisible(n)){const e=this.state.contentId;this.state.visible=!1,this.state.contentId=null,this.content.innerHTML=null,this.container.classList.remove("psv-panel--open"),this.state.clickHandler&&(this.content.removeEventListener("click",this.state.clickHandler),this.content.removeEventListener("keydown",this.state.keyHandler),this.state.clickHandler=null,this.state.keyHandler=null),this.viewer.dispatchEvent(new Bn(e))}}__onMouseDown(n){n.stopPropagation(),this.__startResize(n.clientX,n.clientY)}__onTouchStart(n){if(n.stopPropagation(),n.touches.length===1){const e=n.touches[0];this.__startResize(e.clientX,e.clientY)}}__onMouseUp(n){this.state.mousedown&&(n.stopPropagation(),this.state.mousedown=!1,this.content.classList.remove(aa))}__onTouchEnd(n){this.state.mousedown&&(n.stopPropagation(),n.touches.length===0&&(this.state.mousedown=!1,this.content.classList.remove(aa)))}__onMouseMove(n){this.state.mousedown&&(n.stopPropagation(),this.__resize(n.clientX,n.clientY))}__onTouchMove(n){if(this.state.mousedown){const e=n.touches[0];this.__resize(e.clientX,e.clientY)}}__onKeyPress(n){this.isVisible()&&n.matches(_t.Escape)&&(this.hide(),n.preventDefault())}__startResize(n,e){this.state.mouseX=n,this.state.mouseY=e,this.state.mousedown=!0,this.content.classList.add(aa)}__resize(n,e){const t=n,i=e,s=Math.max(p0,this.container.offsetWidth-(t-this.state.mouseX))+"px";this.state.contentId&&(this.state.width[this.state.contentId]=s),this.container.style.width=s,this.state.mouseX=t,this.state.mouseY=i}},g0=class extends Yn{constructor(n,e){super(n,{className:"psv-tooltip"}),this.state={visible:!0,arrow:0,border:0,state:0,width:0,height:0,pos:"",config:null,data:null,hideTimeout:null},this.content=document.createElement("div"),this.content.className="psv-tooltip-content",this.container.appendChild(this.content),this.arrow=document.createElement("div"),this.arrow.className="psv-tooltip-arrow",this.container.appendChild(this.arrow),this.container.addEventListener("transitionend",this),this.container.addEventListener("touchdown",t=>t.stopPropagation()),this.container.addEventListener("mousedown",t=>t.stopPropagation()),this.container.style.top="-1000px",this.container.style.left="-1000px",this.show(e)}handleEvent(n){n.type==="transitionend"&&this.__onTransitionEnd(n)}destroy(){clearTimeout(this.state.hideTimeout),delete this.state.data,super.destroy()}toggle(){throw new Te("Tooltip cannot be toggled")}show(n){if(this.state.state!==0)throw new Te("Initialized tooltip cannot be re-initialized");n.className&&yo(this.container,n.className),n.style&&Object.assign(this.container.style,n.style),this.state.state=3,this.update(n.content,n),this.state.data=n.data,this.state.state=1,this.viewer.dispatchEvent(new gd(this,this.state.data)),this.__waitImages()}update(n,e){this.content.innerHTML=n;const t=this.container.getBoundingClientRect();this.state.width=t.right-t.left,this.state.height=t.bottom-t.top,this.state.arrow=parseInt(hn(this.arrow,"border-top-width"),10),this.state.border=parseInt(hn(this.container,"border-top-left-radius"),10),this.move(e??this.state.config),this.__waitImages()}move(n){if(this.state.state!==1&&this.state.state!==3)throw new Te("Uninitialized tooltip cannot be moved");n.box=n.box??this.state.config?.box??{width:0,height:0},this.state.config=n;const e=this.container,t=this.arrow,i={posClass:eh(n.position,{allowCenter:!1,cssOrder:!1})||["top","center"],width:this.state.width,height:this.state.height,top:0,left:0,arrowTop:0,arrowLeft:0};this.__computeTooltipPosition(i,n);let s=null,r=null;if(i.top<0?s="bottom":i.top+i.height>this.viewer.state.size.height&&(s="top"),i.left<0?r="right":i.left+i.width>this.viewer.state.size.width&&(r="left"),r||s){const o=Co(i.posClass);s&&(i.posClass[o?0:1]=s),r&&(i.posClass[o?1:0]=r),this.__computeTooltipPosition(i,n)}e.style.top=i.top+"px",e.style.left=i.left+"px",t.style.top=i.arrowTop+"px",t.style.left=i.arrowLeft+"px";const a=i.posClass.join("-");a!==this.state.pos&&(e.classList.remove(`psv-tooltip--${this.state.pos}`),this.state.pos=a,e.classList.add(`psv-tooltip--${this.state.pos}`))}hide(){this.container.classList.remove("psv-tooltip--visible"),this.state.state=2,this.viewer.dispatchEvent(new Nh(this.state.data));const n=parseFloat(hn(this.container,"transition-duration"));this.state.hideTimeout=setTimeout(()=>{this.destroy()},n*2)}__onTransitionEnd(n){if(n.propertyName==="transform")switch(this.state.state){case 1:this.container.classList.add("psv-tooltip--visible"),this.state.state=3;break;case 2:this.state.state=0,this.destroy();break}}__computeTooltipPosition(n,e){const t=this.state.arrow,i=e.top,s=n.height,r=e.left,a=n.width,o=t+this.state.border,c=e.box.width/2+t*2,l=e.box.height/2+t*2;switch(n.posClass.join("-")){case"top-left":n.top=i-l-s,n.left=r+o-a,n.arrowTop=s,n.arrowLeft=a-o-t;break;case"top-center":n.top=i-l-s,n.left=r-a/2,n.arrowTop=s,n.arrowLeft=a/2-t;break;case"top-right":n.top=i-l-s,n.left=r-o,n.arrowTop=s,n.arrowLeft=t;break;case"bottom-left":n.top=i+l,n.left=r+o-a,n.arrowTop=-t*2,n.arrowLeft=a-o-t;break;case"bottom-center":n.top=i+l,n.left=r-a/2,n.arrowTop=-t*2,n.arrowLeft=a/2-t;break;case"bottom-right":n.top=i+l,n.left=r-o,n.arrowTop=-t*2,n.arrowLeft=t;break;case"left-top":n.top=i+o-s,n.left=r-c-a,n.arrowTop=s-o-t,n.arrowLeft=a;break;case"center-left":n.top=i-s/2,n.left=r-c-a,n.arrowTop=s/2-t,n.arrowLeft=a;break;case"left-bottom":n.top=i-o,n.left=r-c-a,n.arrowTop=t,n.arrowLeft=a;break;case"right-top":n.top=i+o-s,n.left=r+c,n.arrowTop=s-o-t,n.arrowLeft=-t*2;break;case"center-right":n.top=i-s/2,n.left=r+c,n.arrowTop=s/2-t,n.arrowLeft=-t*2;break;case"right-bottom":n.top=i-o,n.left=r+c,n.arrowTop=t,n.arrowLeft=-t*2;break}}__waitImages(){const n=this.content.querySelectorAll("img");if(n.length>0){const e=[];n.forEach(t=>{t.complete||e.push(new Promise(i=>{t.onload=i,t.onerror=i}))}),e.length&&Promise.all(e).then(()=>{if(this.state.state===1||this.state.state===3){const t=this.container.getBoundingClientRect();this.state.width=t.right-t.left,this.state.height=t.bottom-t.top,this.move(this.state.config)}})}}},v0=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="15 15 70 70"><path fill="currentColor" d="M50,16.2c-18.6,0-33.8,15.1-33.8,33.8S31.4,83.7,50,83.7S83.8,68.6,83.8,50S68.6,16.2,50,16.2z M50,80.2c-16.7,0-30.2-13.6-30.2-30.2S33.3,19.7,50,19.7S80.3,33.3,80.3,50S66.7,80.2,50,80.2z"/><rect fill="currentColor" x="48" y="31.7" width="4" height="28"/><rect fill="currentColor" x="48" y="63.2" width="4" height="5"/><!--Created by Shastry from the Noun Project--></svg>
`,bs=class{constructor(n){this.viewer=n,this.config=n.config,this.state=n.state}destroy(){}},jt=new O,Ks=new fn(0,0,0,"ZXY"),_0=class extends bs{constructor(n){super(n)}fovToZoomLevel(n){const e=Math.round((n-this.config.minFov)/(this.config.maxFov-this.config.minFov)*100);return ke.clamp(e-2*(e-50),0,100)}zoomLevelToFov(n){return this.config.maxFov+n/100*(this.config.minFov-this.config.maxFov)}vFovToHFov(n){return ke.radToDeg(2*Math.atan(Math.tan(ke.degToRad(n)/2)*this.state.aspect))}hFovToVFov(n){return ke.radToDeg(2*Math.atan(Math.tan(ke.degToRad(n)/2)/this.state.aspect))}getAnimationProperties(n,e,t){const i=!xt(e),s=!xt(t),r={};let a=null;if(i){const o=this.viewer.getPosition(),c=zc(o.yaw,e.yaw);r.yaw={start:o.yaw,end:o.yaw+c},r.pitch={start:o.pitch,end:e.pitch},a=eo(n,kc(o,e))}if(s){const o=this.viewer.getZoomLevel(),c=Math.abs(t-o);r.zoom={start:o,end:t},a===null&&(a=eo(n,Math.PI/4*c/100))}return a===null?typeof n=="number"?a=n:a=Ka:a=Math.max(Ka,a),{duration:a,properties:r}}getTransitionOptions(n){let e;const t=this.config.defaultTransition??Hi.defaultTransition;return n.transition===!1||n.transition===null?e=null:n.transition===!0?e={...t}:typeof n.transition=="object"?e={...t,...n.transition}:e=this.config.defaultTransition,e}textureCoordsToSphericalCoords(n){if(!this.state.textureData?.panoData)throw new Te("Current adapter does not support texture coordinates or no texture has been loaded");const e=this.viewer.adapter.textureCoordsToSphericalCoords(n,this.state.textureData.panoData);return!Ks.equals(this.viewer.renderer.panoramaPose)||!Ks.equals(this.viewer.renderer.sphereCorrection)?(this.sphericalCoordsToVector3(e,jt),jt.applyEuler(this.viewer.renderer.panoramaPose),jt.applyEuler(this.viewer.renderer.sphereCorrection),this.vector3ToSphericalCoords(jt)):e}sphericalCoordsToTextureCoords(n){if(!this.state.textureData?.panoData)throw new Te("Current adapter does not support texture coordinates or no texture has been loaded");return(!Ks.equals(this.viewer.renderer.panoramaPose)||!Ks.equals(this.viewer.renderer.sphereCorrection))&&(this.sphericalCoordsToVector3(n,jt),no(jt,this.viewer.renderer.sphereCorrection),no(jt,this.viewer.renderer.panoramaPose),n=this.vector3ToSphericalCoords(jt)),this.viewer.adapter.sphericalCoordsToTextureCoords(n,this.state.textureData.panoData)}sphericalCoordsToVector3(n,e,t=li){return e||(e=new O),e.x=t*-Math.cos(n.pitch)*Math.sin(n.yaw),e.y=t*Math.sin(n.pitch),e.z=t*Math.cos(n.pitch)*Math.cos(n.yaw),e}vector3ToSphericalCoords(n){const e=Math.acos(n.y/Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z)),t=Math.atan2(n.x,n.z);return{yaw:t<0?-t:Math.PI*2-t,pitch:Math.PI/2-e}}viewerCoordsToVector3(n){const e=this.viewer.renderer.getIntersections(n).filter(t=>t.object.userData[Wn]);return e.length?e[0].point:null}viewerCoordsToSphericalCoords(n){const e=this.viewerCoordsToVector3(n);return e?this.vector3ToSphericalCoords(e):null}vector3ToViewerCoords(n){const e=n.clone();return e.project(this.viewer.renderer.camera),{x:Math.round((e.x+1)/2*this.state.size.width),y:Math.round((1-e.y)/2*this.state.size.height)}}sphericalCoordsToViewerCoords(n){return this.sphericalCoordsToVector3(n,jt),this.vector3ToViewerCoords(jt)}isPointVisible(n){let e,t;if(n instanceof O)e=n,t=this.vector3ToViewerCoords(n);else if(Ao(n))e=this.sphericalCoordsToVector3(n,jt),t=this.vector3ToViewerCoords(e);else return!1;return e.dot(this.viewer.state.direction)>0&&t.x>=0&&t.x<=this.viewer.state.size.width&&t.y>=0&&t.y<=this.viewer.state.size.height}cleanPosition(n){if("yaw"in n||"pitch"in n){if(!("yaw"in n)||!("pitch"in n))throw new Te("Position is missing 'yaw' or 'pitch'");return{yaw:on(n.yaw),pitch:on(n.pitch,!0)}}else return this.textureCoordsToSphericalCoords(n)}cleanSphereCorrection(n){return{pan:on(n?.pan||0),tilt:on(n?.tilt||0,!0),roll:on(n?.roll||0,!0,!1)}}cleanPanoramaPose(n){return{pan:ke.degToRad(n?.poseHeading||0),tilt:ke.degToRad(n?.posePitch||0),roll:ke.degToRad(n?.poseRoll||0)}}cleanPanoramaOptions(n,e){return e?.isEquirectangular&&(xt(n.zoom)&&!xt(e.initialFov)&&(n={...n,zoom:this.fovToZoomLevel(this.hFovToVFov(e.initialFov))}),xt(n.position)&&!xt(e.initialHeading)&&!xt(e.initialPitch)&&(n={...n,position:{yaw:on(e.initialHeading),pitch:on(e.initialPitch,!0)}})),n}},x0=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M33.38 33.2a1.96 1.96 0 0 0 1.5-3.23 10.61 10.61 0 0 1 7.18-17.51c.7-.06 1.31-.49 1.61-1.12a13.02 13.02 0 0 1 11.74-7.43c7.14 0 12.96 5.8 12.96 12.9 0 3.07-1.1 6.05-3.1 8.38-.7.82-.61 2.05.21 2.76.83.7 2.07.6 2.78-.22a16.77 16.77 0 0 0 4.04-10.91C72.3 7.54 64.72 0 55.4 0a16.98 16.98 0 0 0-14.79 8.7 14.6 14.6 0 0 0-12.23 14.36c0 3.46 1.25 6.82 3.5 9.45.4.45.94.69 1.5.69m45.74 43.55a22.13 22.13 0 0 1-5.23 12.4c-4 4.55-9.53 6.86-16.42 6.86-12.6 0-20.1-10.8-20.17-10.91a1.82 1.82 0 0 0-.08-.1c-5.3-6.83-14.55-23.82-17.27-28.87-.05-.1 0-.21.02-.23a6.3 6.3 0 0 1 8.24 1.85l9.38 12.59a1.97 1.97 0 0 0 3.54-1.17V25.34a4 4 0 0 1 1.19-2.87 3.32 3.32 0 0 1 2.4-.95c1.88.05 3.4 1.82 3.4 3.94v24.32a1.96 1.96 0 0 0 3.93 0v-33.1a3.5 3.5 0 0 1 7 0v35.39a1.96 1.96 0 0 0 3.93 0v-.44c.05-2.05 1.6-3.7 3.49-3.7 1.93 0 3.5 1.7 3.5 3.82v5.63c0 .24.04.48.13.71l.1.26a1.97 1.97 0 0 0 3.76-.37c.33-1.78 1.77-3.07 3.43-3.07 1.9 0 3.45 1.67 3.5 3.74l-1.77 18.1zM77.39 51c-1.25 0-2.45.32-3.5.9v-.15c0-4.27-3.33-7.74-7.42-7.74-1.26 0-2.45.33-3.5.9V16.69a7.42 7.42 0 0 0-14.85 0v1.86a7 7 0 0 0-3.28-.94 7.21 7.21 0 0 0-5.26 2.07 7.92 7.92 0 0 0-2.38 5.67v37.9l-5.83-7.82a10.2 10.2 0 0 0-13.35-2.92 4.1 4.1 0 0 0-1.53 5.48C20 64.52 28.74 80.45 34.07 87.34c.72 1.04 9.02 12.59 23.4 12.59 7.96 0 14.66-2.84 19.38-8.2a26.06 26.06 0 0 0 6.18-14.6l1.78-18.2v-.2c0-4.26-3.32-7.73-7.42-7.73z"/><!--Created by AomAm from the Noun Project--></svg>
`,E0=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 17 79 79"><path fill="currentColor" d="M38.1 29.27c-.24 0-.44.2-.44.45v10.7a.45.45 0 00.9 0v-10.7c0-.25-.2-.45-.45-.45zm10.2 26.66a11.54 11.54 0 01-8.48-6.14.45.45 0 10-.8.41 12.45 12.45 0 009.22 6.62.45.45 0 00.07-.9zm24.55-13.08a23.04 23.04 0 00-22.56-23v7.07l-.01.05a2.83 2.83 0 012.39 2.78v14.03l.09-.02h8.84v-9.22a.45.45 0 11.9 0v9.22h10.35v-.9zm0 27.33V44.66H62.5c-.02 2.01-.52 4-1.47 5.76a.45.45 0 01-.61.18.45.45 0 01-.19-.61 11.54 11.54 0 001.36-5.33h-8.83l-.1-.01a2.83 2.83 0 01-2.83 2.84h-.04-.04a2.83 2.83 0 01-2.83-2.83v-14.9a2.82 2.82 0 012.47-2.8v-7.11a23.04 23.04 0 00-22.57 23v.91h14.72V29.88a8.2 8.2 0 015.02-7.57c.22-.1.5.01.59.24.1.23-.01.5-.24.6a7.3 7.3 0 00-4.47 6.73v13.88h3.9a.45.45 0 110 .9h-3.9v.15a7.32 7.32 0 0011.23 6.17.45.45 0 01.49.76 8.22 8.22 0 01-12.62-6.93v-.15H26.82v25.52a23.04 23.04 0 0023.01 23.01 23.04 23.04 0 0023.02-23.01zm1.8-27.33v27.33A24.85 24.85 0 0149.84 95a24.85 24.85 0 01-24.82-24.82V42.85a24.85 24.85 0 0124.82-24.82 24.85 24.85 0 0124.83 24.82zM57.98 29.88v9.36a.45.45 0 11-.9 0v-9.36a7.28 7.28 0 00-3.4-6.17.45.45 0 01.49-.76 8.18 8.18 0 013.8 6.93z"/><!-- Created by Icon Island from the Noun Project --></svg>
`,Cr=class Yd{constructor(){this.$=Yd.IDLE}is(...e){return e.some(t=>this.$&t)}set(e){this.$=e}add(e){this.$|=e}remove(e){this.$&=~e}};Cr.IDLE=0;Cr.CLICK=1;Cr.MOVING=2;var ft=Cr,M0=class extends bs{constructor(n){super(n),this.data={startMouseX:0,startMouseY:0,mouseX:0,mouseY:0,pinchDist:0,moveDelta:{yaw:0,pitch:0,zoom:0},accumulatorFactor:0,ctrlKeyDown:!1,dblclickData:null,dblclickTimeout:null,longtouchTimeout:null,twofingersTimeout:null,ctrlZoomTimeout:null},this.step=new ft,this.keyHandler=new wr,this.resizeObserver=new ResizeObserver($c(()=>this.viewer.autoSize(),50)),this.moveThreshold=Lc*Ct.pixelRatio}init(){window.addEventListener("keydown",this,{passive:!1}),window.addEventListener("keyup",this),this.viewer.container.addEventListener("mousedown",this),window.addEventListener("mousemove",this,{passive:!1}),window.addEventListener("mouseup",this),this.viewer.container.addEventListener("touchstart",this,{passive:!1}),window.addEventListener("touchmove",this,{passive:!1}),window.addEventListener("touchend",this,{passive:!1}),this.viewer.container.addEventListener("wheel",this,{passive:!1}),document.addEventListener("fullscreenchange",this),this.resizeObserver.observe(this.viewer.container),this.viewer.addEventListener(ss.type,this),this.viewer.addEventListener(us.type,this)}destroy(){window.removeEventListener("keydown",this),window.removeEventListener("keyup",this),this.viewer.container.removeEventListener("mousedown",this),window.removeEventListener("mousemove",this),window.removeEventListener("mouseup",this),this.viewer.container.removeEventListener("touchstart",this),window.removeEventListener("touchmove",this),window.removeEventListener("touchend",this),this.viewer.container.removeEventListener("wheel",this),document.removeEventListener("fullscreenchange",this),this.resizeObserver.disconnect(),this.viewer.removeEventListener(ss.type,this),this.viewer.removeEventListener(us.type,this),clearTimeout(this.data.dblclickTimeout),clearTimeout(this.data.longtouchTimeout),clearTimeout(this.data.twofingersTimeout),clearTimeout(this.data.ctrlZoomTimeout),super.destroy()}handleEvent(n){switch(n.type){case"keydown":this.__onKeyDown(n);break;case"keyup":this.__onKeyUp();break;case"mousemove":this.__onMouseMove(n);break;case"mouseup":this.__onMouseUp(n);break;case"touchmove":this.__onTouchMove(n);break;case"touchend":this.__onTouchEnd(n);break;case"fullscreenchange":this.__onFullscreenChange();break;case ss.type:this.__applyMoveDelta();break;case us.type:this.__clearMoveDelta();break}if(!Gc(n,"."+ws))switch(n.type){case"mousedown":this.__onMouseDown(n);break;case"touchstart":this.__onTouchStart(n);break;case"wheel":this.__onMouseWheel(n);break}}__onKeyDown(n){if(this.config.mousewheelCtrlKey&&(this.data.ctrlKeyDown=n.key===_t.Control,this.data.ctrlKeyDown&&(clearTimeout(this.data.ctrlZoomTimeout),this.viewer.overlay.hide(Mt.CTRL_ZOOM))),!!this.viewer.dispatchEvent(new zn(n.key,n))&&!(!this.state.keyboardEnabled||!this.config.keyboardActions||this.keyHandler.pending)){for(const[e,t]of Object.entries(this.config.keyboardActions))if(wo(n,e)){if(typeof t=="function")t(this.viewer,n);else{switch(t!=="ZOOM_IN"&&t!=="ZOOM_OUT"&&this.viewer.stopAll(),t){case"ROTATE_UP":this.viewer.dynamics.position.roll({pitch:!1});break;case"ROTATE_DOWN":this.viewer.dynamics.position.roll({pitch:!0});break;case"ROTATE_RIGHT":this.viewer.dynamics.position.roll({yaw:!1});break;case"ROTATE_LEFT":this.viewer.dynamics.position.roll({yaw:!0});break;case"ZOOM_IN":this.viewer.dynamics.zoom.roll(!1);break;case"ZOOM_OUT":this.viewer.dynamics.zoom.roll(!0);break}this.keyHandler.down(t)}n.preventDefault();return}}}__onKeyUp(){this.data.ctrlKeyDown=!1,this.state.keyboardEnabled&&this.keyHandler.up(n=>{n==="ZOOM_IN"||n==="ZOOM_OUT"?this.viewer.dynamics.zoom.stop():(this.viewer.dynamics.position.stop(),this.viewer.resetIdleTimer())})}__onMouseDown(n){this.step.add(ft.CLICK),this.data.startMouseX=n.clientX,this.data.startMouseY=n.clientY,this.config.mousemove&&n.preventDefault()}__onMouseUp(n){this.step.is(ft.CLICK,ft.MOVING)&&this.__stopMove(n.clientX,n.clientY,n,n.button===2)}__onMouseMove(n){this.config.mousemove&&this.step.is(ft.CLICK,ft.MOVING)&&(n.preventDefault(),this.__doMove(n.clientX,n.clientY)),this.__handleObjectsEvents(n)}__onTouchStart(n){n.touches.length===1?(this.step.add(ft.CLICK),this.data.startMouseX=n.touches[0].clientX,this.data.startMouseY=n.touches[0].clientY,this.data.longtouchTimeout||(this.data.longtouchTimeout=setTimeout(()=>{const e=n.touches[0];this.__stopMove(e.clientX,e.clientY,n,!0),this.data.longtouchTimeout=null},Ic))):n.touches.length===2&&(this.step.set(ft.IDLE),this.__cancelLongTouch(),this.config.mousemove&&(this.__cancelTwoFingersOverlay(),this.__startMoveZoom(n),n.preventDefault()))}__onTouchEnd(n){if(this.__cancelLongTouch(),this.step.is(ft.CLICK,ft.MOVING)){if(n.preventDefault(),this.__cancelTwoFingersOverlay(),n.touches.length===1)this.__stopMove(this.data.mouseX,this.data.mouseY);else if(n.touches.length===0){const e=n.changedTouches[0];this.__stopMove(e.clientX,e.clientY,n)}}}__onTouchMove(n){if(this.__cancelLongTouch(),!!this.config.mousemove)if(n.touches.length===1){if(this.config.touchmoveTwoFingers)this.step.is(ft.CLICK)&&!this.data.twofingersTimeout&&(this.data.twofingersTimeout=setTimeout(()=>{this.viewer.overlay.show({id:Mt.TWO_FINGERS,image:x0,title:this.config.lang.twoFingers})},Uc));else if(this.step.is(ft.CLICK,ft.MOVING)){n.preventDefault();const e=n.touches[0];this.__doMove(e.clientX,e.clientY)}}else this.__doMoveZoom(n),this.__cancelTwoFingersOverlay()}__cancelLongTouch(){this.data.longtouchTimeout&&(clearTimeout(this.data.longtouchTimeout),this.data.longtouchTimeout=null)}__cancelTwoFingersOverlay(){this.config.touchmoveTwoFingers&&(this.data.twofingersTimeout&&(clearTimeout(this.data.twofingersTimeout),this.data.twofingersTimeout=null),this.viewer.overlay.hide(Mt.TWO_FINGERS))}__onMouseWheel(n){if(!this.config.mousewheel||!n.deltaY)return;if(this.config.mousewheelCtrlKey&&!this.data.ctrlKeyDown){this.viewer.overlay.show({id:Mt.CTRL_ZOOM,image:E0,title:this.config.lang.ctrlZoom}),clearTimeout(this.data.ctrlZoomTimeout),this.data.ctrlZoomTimeout=setTimeout(()=>this.viewer.overlay.hide(Mt.CTRL_ZOOM),Nc);return}n.preventDefault(),n.stopPropagation();const e=n.deltaY/Math.abs(n.deltaY)*5*this.config.zoomSpeed;e!==0&&this.viewer.dynamics.zoom.step(-e,5)}__onFullscreenChange(){const n=this.viewer.isFullscreenEnabled();this.config.keyboard==="fullscreen"&&(n?this.viewer.startKeyboardControl():this.viewer.stopKeyboardControl()),this.viewer.dispatchEvent(new rs(n))}__resetMove(){this.step.set(ft.IDLE),this.data.mouseX=0,this.data.mouseY=0,this.data.startMouseX=0,this.data.startMouseY=0}__startMoveZoom(n){this.viewer.stopAll(),this.__resetMove();const e=Ja(n);this.step.set(ft.MOVING),this.data.accumulatorFactor=this.config.moveInertia,{distance:this.data.pinchDist,center:{x:this.data.mouseX,y:this.data.mouseY}}=e}__stopMove(n,e,t,i=!1){this.step.is(ft.CLICK)&&!this.__moveThresholdReached(n,e)&&this.__doClick(n,e,t,i),this.config.moveInertia&&(this.data.accumulatorFactor=Math.pow(this.config.moveInertia,.5)),this.__resetMove(),this.viewer.resetIdleTimer()}__doClick(n,e,t,i=!1){const s=this.viewer.container.getBoundingClientRect(),r=n-s.left,a=e-s.top,o=this.viewer.renderer.getIntersections({x:r,y:a}),c=o.find(l=>l.object.userData[Wn]);if(c){const l=this.viewer.dataHelper.vector3ToSphericalCoords(c.point),h={rightclick:i,originalEvent:t,target:cr(t),clientX:n,clientY:e,viewerX:r,viewerY:a,yaw:l.yaw,pitch:l.pitch,objects:o.map(u=>u.object).filter(u=>!u.userData[Wn])};try{const u=this.viewer.dataHelper.sphericalCoordsToTextureCoords(h);Object.assign(h,u)}catch{}this.data.dblclickTimeout?(Math.abs(this.data.dblclickData.clientX-h.clientX)<this.moveThreshold&&Math.abs(this.data.dblclickData.clientY-h.clientY)<this.moveThreshold&&this.viewer.dispatchEvent(new yh(this.data.dblclickData)),clearTimeout(this.data.dblclickTimeout),this.data.dblclickTimeout=null,this.data.dblclickData=null):(this.viewer.dispatchEvent(new _h(h)),this.data.dblclickData=Mr(h),this.data.dblclickTimeout=setTimeout(()=>{this.data.dblclickTimeout=null,this.data.dblclickData=null},Dc))}}__handleObjectsEvents(n){if(!jc(this.state.objectsObservers)&&n.composedPath().includes(this.viewer.container)){const e=Wc(this.viewer.container),t={x:n.clientX-e.x,y:n.clientY-e.y},i=this.viewer.renderer.getIntersections(t),s=(r,a,o)=>{this.viewer.dispatchEvent(new o(n,r,t,a))};for(const[r,a]of Object.entries(this.state.objectsObservers)){const o=i.find(c=>c.object.userData[r]);o?(a&&o.object!==a&&(s(a,r,io),this.state.objectsObservers[r]=null),a?s(o.object,r,Pd):(this.state.objectsObservers[r]=o.object,s(o.object,r,Td))):a&&(s(a,r,io),this.state.objectsObservers[r]=null)}}}__doMove(n,e){if(this.step.is(ft.CLICK)&&this.__moveThresholdReached(n,e))this.viewer.stopAll(),this.__resetMove(),this.step.set(ft.MOVING),this.data.mouseX=n,this.data.mouseY=e,this.data.accumulatorFactor=this.config.moveInertia;else if(this.step.is(ft.MOVING)){const t=(n-this.data.mouseX)*Math.cos(this.state.roll)-(e-this.data.mouseY)*Math.sin(this.state.roll),i=(e-this.data.mouseY)*Math.cos(this.state.roll)+(n-this.data.mouseX)*Math.sin(this.state.roll),s={yaw:this.config.moveSpeed*(t/this.state.size.width)*ke.degToRad(this.state.hFov),pitch:this.config.moveSpeed*(i/this.state.size.height)*ke.degToRad(this.state.vFov)};this.data.moveDelta.yaw+=s.yaw,this.data.moveDelta.pitch+=s.pitch,this.data.mouseX=n,this.data.mouseY=e}}__moveThresholdReached(n,e){return Math.abs(n-this.data.startMouseX)>=this.moveThreshold||Math.abs(e-this.data.startMouseY)>=this.moveThreshold}__doMoveZoom(n){if(this.step.is(ft.MOVING)){n.preventDefault();const e=Ja(n);this.__doMove(e.center.x,e.center.y),this.data.moveDelta.zoom+=this.config.zoomSpeed*((e.distance-this.data.pinchDist)/Ct.pixelRatio),this.data.pinchDist=e.distance}}__applyMoveDelta(){if(Math.abs(this.data.moveDelta.yaw)>0||Math.abs(this.data.moveDelta.pitch)>0){const e=this.viewer.getPosition();this.viewer.rotate({yaw:e.yaw-this.data.moveDelta.yaw*(1-this.config.moveInertia),pitch:e.pitch+this.data.moveDelta.pitch*(1-this.config.moveInertia)}),this.data.moveDelta.yaw*=this.data.accumulatorFactor,this.data.moveDelta.pitch*=this.data.accumulatorFactor,Math.abs(this.data.moveDelta.yaw)<=.001&&(this.data.moveDelta.yaw=0),Math.abs(this.data.moveDelta.pitch)<=.001&&(this.data.moveDelta.pitch=0)}if(Math.abs(this.data.moveDelta.zoom)>0){const e=this.viewer.getZoomLevel();this.viewer.zoom(e+this.data.moveDelta.zoom*(1-this.config.moveInertia)),this.data.moveDelta.zoom*=this.config.moveInertia,Math.abs(this.data.moveDelta.zoom)<=.001&&(this.data.moveDelta.zoom=0)}}__clearMoveDelta(){this.data.moveDelta.yaw=0,this.data.moveDelta.pitch=0,this.data.moveDelta.zoom=0}};Ve.enabled=!1;var Js=new Ye,Xl=new it,Yl=new Wi,S0=class extends bs{constructor(n){super(n),this.frustumNeedsUpdate=!0,this.renderer=new N_(this.config.rendererParameters),this.renderer.setPixelRatio(Ct.pixelRatio),this.renderer.outputColorSpace=oi,this.renderer.toneMapping=sc,this.renderer.domElement.className="psv-canvas",this.renderer.domElement.style.background=this.config.canvasBackground,this.scene=new $a,this.camera=new zt(50,16/9,.1,2*li),this.camera.matrixAutoUpdate=!1;const e=new Yt(new ys(li).scale(-1,1,1),new Ms({opacity:0,transparent:!0,depthTest:!1,depthWrite:!1}));e.userData={[Wn]:!0},this.scene.add(e),this.raycaster=new Jf,this.frustum=new xo,this.container=document.createElement("div"),this.container.className="psv-canvas-container",this.container.appendChild(this.renderer.domElement),this.viewer.container.appendChild(this.container),this.container.addEventListener("contextmenu",t=>t.preventDefault()),this.viewer.addEventListener(ds.type,this),this.viewer.addEventListener(Tn.type,this),this.viewer.addEventListener(os.type,this),this.viewer.addEventListener(ls.type,this),this.viewer.addEventListener(It.type,this),this.hide()}get panoramaPose(){return this.mesh.rotation}get sphereCorrection(){return this.meshContainer.rotation}init(){this.show(),this.renderer.setAnimationLoop(n=>this.__renderLoop(n))}destroy(){this.renderer.setAnimationLoop(null),this.cleanScene(this.scene),this.renderer.dispose(),this.viewer.container.removeChild(this.container),this.viewer.removeEventListener(ds.type,this),this.viewer.removeEventListener(Tn.type,this),this.viewer.removeEventListener(os.type,this),this.viewer.removeEventListener(ls.type,this),this.viewer.removeEventListener(It.type,this),super.destroy()}handleEvent(n){switch(n.type){case ds.type:this.__onSizeUpdated();break;case Tn.type:this.__onZoomUpdated();break;case os.type:this.__onPositionUpdated();break;case ls.type:this.__onPositionUpdated();break;case It.type:n.containsOptions("fisheye")&&this.__onPositionUpdated(),n.containsOptions("canvasBackground")&&(this.renderer.domElement.style.background=this.config.canvasBackground);break}}hide(){this.container.style.opacity="0"}show(){this.container.style.opacity="1"}setCustomRenderer(n){n?this.customRenderer=n(this.renderer):this.customRenderer=null,this.viewer.needsUpdate()}__onSizeUpdated(){this.renderer.setSize(this.state.size.width,this.state.size.height),this.camera.aspect=this.state.aspect,this.camera.updateProjectionMatrix(),this.viewer.needsUpdate(),this.frustumNeedsUpdate=!0}__onZoomUpdated(){this.camera.fov=this.state.vFov,this.camera.updateProjectionMatrix(),this.viewer.needsUpdate(),this.frustumNeedsUpdate=!0}__onPositionUpdated(){this.camera.position.set(0,0,0),this.camera.lookAt(this.state.direction),this.config.fisheye&&this.camera.position.copy(this.state.direction).multiplyScalar(this.config.fisheye/2).negate(),this.camera.rotateZ(-this.state.roll),this.camera.updateMatrix(),this.camera.updateMatrixWorld(),this.viewer.needsUpdate(),this.frustumNeedsUpdate=!0}__renderLoop(n){const e=this.timestamp?n-this.timestamp:0;this.timestamp=n,this.viewer.dispatchEvent(new ss(n,e)),this.viewer.dynamics.update(e),(this.state.needsUpdate||this.state.continuousUpdateCount>0)&&(this.state.needsUpdate=!1,(this.customRenderer||this.renderer).render(this.scene,this.camera),this.viewer.dispatchEvent(new ad))}setTexture(n){this.meshContainer||(this.meshContainer=new Pi,this.scene.add(this.meshContainer)),this.state.textureData&&this.viewer.adapter.disposeTexture(this.state.textureData),this.mesh&&(this.meshContainer.remove(this.mesh),this.viewer.adapter.disposeMesh(this.mesh)),this.mesh=this.viewer.adapter.createMesh(n.panoData),this.viewer.adapter.setTexture(this.mesh,n,!1),this.meshContainer.add(this.mesh),this.state.textureData=n,this.viewer.needsUpdate()}setPanoramaPose(n,e=this.mesh){const t=this.viewer.dataHelper.cleanPanoramaPose(n);e.rotation.set(-t.tilt,t.pan,t.roll,"YXZ")}setSphereCorrection(n,e=this.meshContainer){const t=this.viewer.dataHelper.cleanSphereCorrection(n);e.rotation.set(t.tilt,t.pan,t.roll,"YXZ")}transition(n,e,t){const i=t.effect==="fade"||t.rotation,s=!xt(e.position),r=!xt(e.zoom),a=new Po(s?this.viewer.dataHelper.cleanPosition(e.position):void 0,e.zoom);this.viewer.dispatchEvent(a);const o=new Pi,c=this.viewer.adapter.createMesh(n.panoData);if(this.viewer.adapter.setTexture(c,n,!0),this.viewer.adapter.setTextureOpacity(c,0),this.setPanoramaPose(n.panoData,c),this.setSphereCorrection(e.sphereCorrection,o),s&&!t.rotation){const p=this.viewer.getPosition(),m=new O(0,1,0);o.rotateOnWorldAxis(m,a.position.yaw-p.yaw);const v=new O(0,1,0).cross(this.camera.getWorldDirection(new O)).normalize();o.rotateOnWorldAxis(v,a.position.pitch-p.pitch)}o.add(c),this.scene.add(o),this.renderer.setRenderTarget(new Vn),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null);const{duration:l,properties:h}=this.viewer.dataHelper.getAnimationProperties(t.speed,t.rotation?a.position:null,i?a.zoomLevel:null),u=new fr({properties:{...h,opacity:{start:0,end:1}},duration:l,easing:"inOutCubic",onTick:p=>{switch(t.effect){case"fade":this.viewer.adapter.setTextureOpacity(c,p.opacity);break;case"black":case"white":p.opacity<.5?this.renderer.toneMappingExposure=t.effect==="black"?ke.mapLinear(p.opacity,0,.5,1,0):ke.mapLinear(p.opacity,0,.5,1,5):(this.renderer.toneMappingExposure=t.effect==="black"?ke.mapLinear(p.opacity,.5,1,0,1):ke.mapLinear(p.opacity,.5,1,5,1),this.mesh.visible=!1,this.viewer.adapter.setTextureOpacity(c,1),r&&!i&&this.viewer.dynamics.zoom.setValue(a.zoomLevel));break}s&&t.rotation&&this.viewer.dynamics.position.setValue({yaw:p.yaw,pitch:p.pitch}),r&&i&&this.viewer.dynamics.zoom.setValue(p.zoom),this.viewer.needsUpdate()}});return u.then(p=>{o.remove(c),this.scene.remove(o),p?(this.viewer.adapter.disposeTexture(this.state.textureData),this.meshContainer.remove(this.mesh),this.viewer.adapter.disposeMesh(this.mesh),this.mesh=c,this.meshContainer.add(c),this.state.textureData=n,this.setPanoramaPose(n.panoData),this.setSphereCorrection(e.sphereCorrection),s&&!t.rotation&&this.viewer.rotate(e.position)):(this.viewer.adapter.disposeTexture(n),this.viewer.adapter.disposeMesh(c))}),u}getIntersections(n){Js.x=2*n.x/this.state.size.width-1,Js.y=-2*n.y/this.state.size.height+1,this.raycaster.setFromCamera(Js,this.camera);const e=this.raycaster.intersectObjects(this.scene.children,!0).filter(t=>t.object.visible).filter(t=>t.object.isMesh&&!!t.object.userData);return this.customRenderer?.getIntersections&&e.push(...this.customRenderer.getIntersections(this.raycaster,Js)),e}isObjectVisible(n){if(!n)return!1;if(this.frustumNeedsUpdate&&(Xl.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(Xl),this.frustumNeedsUpdate=!1),n.isVector3)return this.frustum.containsPoint(n);if(n.isMesh&&n.geometry){const e=n;return e.geometry.boundingBox||e.geometry.computeBoundingBox(),Yl.copy(e.geometry.boundingBox).applyMatrix4(e.matrixWorld),this.frustum.intersectsBox(Yl)}else return n.isObject3D?this.frustum.intersectsObject(n):!1}addObject(n){this.scene.add(n)}removeObject(n){this.scene.remove(n)}cleanScene(n){const e=t=>{t.map?.dispose(),t.uniforms&&Object.values(t.uniforms).forEach(i=>{i.value?.dispose?.()}),t.dispose()};n.traverse(t=>{t.geometry?.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(i=>{e(i)}):e(t.material)),t instanceof $a||t.dispose?.(),t!==n&&this.cleanScene(t)})}},y0=class extends Zf{constructor(){super(...arguments),this._abortController=new AbortController}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}load(n,e,t,i){const s=this._abortController.signal,r=super.load(n,c=>{o(),e(c)},t,c=>{if(o(),s.aborted){const l=new Error;l.name="AbortError",l.message="The operation was aborted.",i(l)}else i(c)});function a(){r.src=""}function o(){s.removeEventListener("abort",a,!1)}return s.addEventListener("abort",a,!1),r}},w0=class extends bs{constructor(n){super(n),this.fileLoader=new $f,this.fileLoader.setResponseType("blob"),this.imageLoader=new y0}destroy(){this.abortLoading(),super.destroy()}abortLoading(){this.fileLoader.abort?.(),this.imageLoader.abort()}loadFile(n,e,t){const i=Ri.get(n,t);if(i){if(i instanceof Blob)return e?.(100),Promise.resolve(i);Ri.remove(n,t)}this.config.requestHeaders&&this.fileLoader.setRequestHeader(this.config.requestHeaders(n)),this.fileLoader.setWithCredentials(this.config.withCredentials(n));let s=0;return e?.(s),this.fileLoader.loadAsync(n,r=>{if(r.lengthComputable){const a=r.loaded/r.total*100;a>s&&(s=a,e?.(s))}}).then(r=>(s=100,e?.(s),Ri.add(n,t,r),r))}loadImage(n,e,t){const i=Ri.get(n,t);return i?(e?.(100),i instanceof Blob?this.blobToImage(i):Promise.resolve(i)):!e&&!this.config.requestHeaders?(this.imageLoader.setWithCredentials(this.config.withCredentials(n)),this.imageLoader.loadAsync(n).then(s=>(Ri.add(n,t,s),s))):this.loadFile(n,e,t).then(s=>this.blobToImage(s))}blobToImage(n){return new Promise((e,t)=>{const i=document.createElement("img");i.onload=()=>{URL.revokeObjectURL(i.src),e(i)},i.onerror=t,i.src=URL.createObjectURL(n)})}preloadPanorama(n){return this.viewer.adapter.supportsPreload(n)?this.viewer.adapter.loadTexture(n,!1):Promise.reject(new Te("Current adapter does not support preload"))}dispatchProgress(n){this.viewer.loader.setProgress(n),this.viewer.dispatchEvent(new kh(Math.round(n)))}},T0=class extends bs{constructor(n){super(n),this.zoom=new es(e=>{this.viewer.state.vFov=this.viewer.dataHelper.zoomLevelToFov(e),this.viewer.state.hFov=this.viewer.dataHelper.vFovToHFov(this.viewer.state.vFov),this.viewer.dispatchEvent(new Tn(e))},{defaultValue:this.viewer.config.defaultZoomLvl,min:0,max:100,wrap:!1}),this.position=new rh(e=>{this.viewer.dataHelper.sphericalCoordsToVector3(e,this.viewer.state.direction),this.viewer.dispatchEvent(new os(e))},{yaw:new es(null,{defaultValue:this.config.defaultYaw,min:0,max:2*Math.PI,wrap:!0}),pitch:new es(null,{defaultValue:this.config.defaultPitch,min:-Math.PI/2,max:Math.PI/2,wrap:!1})}),this.roll=new es(e=>{this.viewer.state.roll=e,this.viewer.dispatchEvent(new ls(e))},{defaultValue:0,min:-Math.PI,max:Math.PI,wrap:!1}),this.updateSpeeds()}updateSpeeds(){this.zoom.setSpeed(this.config.zoomSpeed*50),this.position.setSpeed(ke.degToRad(this.config.moveSpeed*50)),this.roll.setSpeed(ke.degToRad(this.config.moveSpeed*50))}update(n){this.zoom.update(n),this.position.update(n),this.roll.update(n)}},b0=class{constructor(){this.ready=!1,this.needsUpdate=!1,this.continuousUpdateCount=0,this.keyboardEnabled=!1,this.direction=new O(0,0,li),this.roll=0,this.vFov=60,this.hFov=60,this.aspect=1,this.animation=null,this.transitionAnimation=null,this.loadingPromise=null,this.idleTime=-1,this.objectsObservers={},this.size={width:0,height:0}}},A0=class extends lh{constructor(n){if(super(),this.plugins={},this.children=[],this.parent=Hc(n.container),!this.parent)throw new Te('"container" element not found.');this.parent[Wn]=this,this.container=document.createElement("div"),this.container.classList.add("psv-container"),this.parent.appendChild(this.container),ih(this.parent),nh(this.container,"core"),this.state=new b0,this.config=l0(n),this.__setSize(this.config.size),this.overlay=new f0(this);try{Ct.load()}catch(e){console.error(e),this.showError(this.config.lang.webglError);return}Ri.init(),this.adapter=new this.config.adapter[0](this,this.config.adapter[1]),this.renderer=new S0(this),this.textureLoader=new w0(this),this.eventsHandler=new M0(this),this.dataHelper=new _0(this),this.dynamics=new T0(this),this.adapter.init?.(),this.loader=new d0(this),this.navbar=new h0(this),this.panel=new m0(this),this.notification=new u0(this),this.autoSize(),this.setCursor(null),bo(Ct.isTouchEnabled,e=>{Er(this.container,"psv--is-touch",e)}),this.config.plugins.forEach(([e,t])=>{this.plugins[e.id]=new e(this,t)});for(const e of Object.values(this.plugins))e.init?.();this.config.navbar&&this.navbar.setButtons(this.config.navbar),this.state.loadingPromise||(this.config.panorama?this.setPanorama(this.config.panorama,{sphereCorrection:this.config.sphereCorrection,panoData:this.config.panoData}):this.loader.show())}destroy(){this.stopAll(),this.stopKeyboardControl(),this.exitFullscreen();for(const[n,e]of Object.entries(this.plugins))e.destroy(),delete this.plugins[n];this.children.slice().forEach(n=>n.destroy()),this.children.length=0,this.eventsHandler?.destroy(),this.renderer?.destroy(),this.textureLoader?.destroy(),this.dataHelper?.destroy(),this.adapter?.destroy(),this.dynamics?.destroy(),this.parent.removeChild(this.container),delete this.parent[Wn]}init(){this.eventsHandler.init(),this.renderer.init(),this.config.navbar&&this.navbar.show(),this.config.keyboard==="always"&&this.startKeyboardControl(),this.resetIdleTimer(),this.state.ready=!0,this.dispatchEvent(new cs)}resetIdleTimer(){this.state.idleTime=performance.now()}disableIdleTimer(){this.state.idleTime=-1}getPlugin(n){if(typeof n=="string")return this.plugins[n];{const e=so(n);return e?this.plugins[e.id]:null}}getPosition(){return this.dataHelper.cleanPosition(this.dynamics.position.current)}getZoomLevel(){return this.dynamics.zoom.current}getSize(){return{...this.state.size}}isFullscreenEnabled(){return Xc(this.parent,Ct.isIphone)}needsUpdate(){this.state.needsUpdate=!0}needsContinuousUpdate(n){n?this.state.continuousUpdateCount++:this.state.continuousUpdateCount>0&&this.state.continuousUpdateCount--}autoSize(){(this.container.clientWidth!==this.state.size.width||this.container.clientHeight!==this.state.size.height)&&(this.state.size.width=Math.round(this.container.clientWidth),this.state.size.height=Math.round(this.container.clientHeight),this.state.aspect=this.state.size.width/this.state.size.height,this.state.hFov=this.dataHelper.vFovToHFov(this.state.vFov),this.dispatchEvent(new ds(this.getSize())),this.navbar.autoSize())}setPanorama(n,e={}){this.textureLoader.abortLoading(),this.state.transitionAnimation?.cancel();const t=this.dataHelper.getTransitionOptions(e);e.showLoader===void 0&&(e.showLoader=!0),e.caption===void 0&&(e.caption=this.config.caption),e.description===void 0&&(e.description=this.config.description),!e.panoData&&typeof this.config.panoData=="function"&&(e.panoData=this.config.panoData),this.hideError(),this.resetIdleTimer(),this.config.panorama=n,this.config.caption=e.caption,this.config.description=e.description,this.config.sphereCorrection=e.sphereCorrection,(typeof this.config.panoData!="function"||typeof e.panoData=="function")&&(this.config.panoData=e.panoData);const i=r=>{if(Qc(r))return!1;if(this.loader.hide(),this.state.loadingPromise=null,r)throw this.navbar.setCaption(null),this.showError(this.config.lang.loadError),console.error(r),this.dispatchEvent(new $h(n,r)),r;return this.navbar.setCaption(this.config.caption),!0};this.navbar.setCaption(`<em>${this.config.lang.loading}</em>`),(e.showLoader||!this.state.ready)&&this.loader.show(),this.dispatchEvent(new Gh(n));const s=this.adapter.loadTexture(this.config.panorama,!0,e.panoData).then(r=>{if(r.panorama!==this.config.panorama)throw this.adapter.disposeTexture(r),Qa();const a=this.dataHelper.cleanPanoramaOptions(e,r.panoData);return(!xt(a.zoom)||!xt(a.position))&&this.stopAll(),{textureData:r,cleanOptions:a}});return!t||!this.state.ready||!this.adapter.supportsTransition(this.config.panorama)?this.state.loadingPromise=s.then(({textureData:r,cleanOptions:a})=>{this.renderer.show(),this.renderer.setTexture(r),this.renderer.setPanoramaPose(r.panoData),this.renderer.setSphereCorrection(e.sphereCorrection),this.state.ready||this.init(),this.dispatchEvent(new Oi(r)),xt(a.zoom)||this.zoom(a.zoom),xt(a.position)||this.rotate(a.position)}).then(()=>i(),r=>i(r)):this.state.loadingPromise=s.then(({textureData:r,cleanOptions:a})=>(this.loader.hide(),this.dispatchEvent(new Oi(r)),this.state.transitionAnimation=this.renderer.transition(r,a,t),this.state.transitionAnimation)).then(r=>{if(this.state.transitionAnimation=null,this.dispatchEvent(new Kh(r)),!r)throw Qa()}).then(()=>i(),r=>i(r)),this.state.loadingPromise}setOptions(n){const e={...this.config,...n};for(let[t,i]of Object.entries(n)){if(!(t in Hi)){St(`Unknown option ${t}`);continue}if(t in Wl){St(Wl[t]);continue}switch(t in ro&&(i=ro[t](i,{rawConfig:e,defValue:Hi[t]})),this.config[t]=i,t){case"mousemove":this.state.cursorOverride||this.setCursor(null);break;case"caption":this.navbar.setCaption(this.config.caption);break;case"size":this.resize(this.config.size);break;case"sphereCorrection":this.renderer.setSphereCorrection(this.config.sphereCorrection);break;case"navbar":case"lang":this.navbar.setButtons(this.config.navbar);break;case"moveSpeed":case"zoomSpeed":this.dynamics.updateSpeeds();break;case"minFov":case"maxFov":this.dynamics.zoom.setValue(this.dataHelper.fovToZoomLevel(this.state.vFov)),this.dispatchEvent(new Tn(this.getZoomLevel()));break;case"keyboard":this.config.keyboard==="always"?this.startKeyboardControl():this.stopKeyboardControl();break}}this.needsUpdate(),this.dispatchEvent(new It(Object.keys(n)))}setOption(n,e){this.setOptions({[n]:e})}showError(n){this.overlay.show({id:Mt.ERROR,image:v0,title:n,dismissible:!1})}hideError(){this.overlay.hide(Mt.ERROR)}rotate(n){const e=new mh(this.dataHelper.cleanPosition(n));this.dispatchEvent(e),!e.defaultPrevented&&this.dynamics.position.setValue(e.position)}zoom(n){this.dynamics.zoom.setValue(n)}zoomIn(n=1){this.dynamics.zoom.step(n)}zoomOut(n=1){this.dynamics.zoom.step(-n)}animate(n){const e=Ao(n),t=!xt(n.zoom),i=new Po(e?this.dataHelper.cleanPosition(n):void 0,n.zoom);if(this.dispatchEvent(i),i.defaultPrevented)return;this.stopAll();const{duration:s,properties:r}=this.dataHelper.getAnimationProperties(n.speed,i.position,i.zoomLevel);return s?(this.state.animation=new fr({properties:r,duration:s,easing:n.easing||"inOutSine",onTick:a=>{e&&this.dynamics.position.setValue({yaw:a.yaw,pitch:a.pitch}),t&&this.dynamics.zoom.setValue(a.zoom)}}),this.state.animation.then(()=>{this.state.animation=null,this.resetIdleTimer()}),this.state.animation):(e&&this.rotate(i.position),t&&this.zoom(i.zoomLevel),new fr(null))}stopAnimation(){return this.state.animation?(this.state.animation.cancel(),this.state.animation):Promise.resolve()}resize(n){this.__setSize(n),this.autoSize()}__setSize(n){["width","height"].forEach(e=>{n?.[e]&&(/^[0-9.]+$/.test(n[e])&&(n[e]+="px"),this.parent.style[e]=n[e])})}enterFullscreen(){this.isFullscreenEnabled()||Yc(this.parent,Ct.isIphone)}exitFullscreen(){this.isFullscreenEnabled()&&qc(Ct.isIphone)}toggleFullscreen(){this.isFullscreenEnabled()?this.exitFullscreen():this.enterFullscreen()}startKeyboardControl(){this.state.keyboardEnabled=!0}stopKeyboardControl(){this.state.keyboardEnabled=!1}createTooltip(n){return new g0(this,n)}setCursor(n){this.state.cursorOverride=n,n?this.container.style.cursor=n:this.container.style.cursor=this.config.mousemove?"move":"default"}observeObjects(n){this.state.objectsObservers[n]||(this.state.objectsObservers[n]=null)}unobserveObjects(n){delete this.state.objectsObservers[n]}stopAll(){return this.dispatchEvent(new us),this.disableIdleTimer(),this.stopAnimation()}};var C0=Object.defineProperty,R0=(n,e)=>{for(var t in e)C0(n,t,{get:e[t],enumerable:!0})},P0={};R0(P0,{EnterArrowEvent:()=>Jd,LeaveArrowEvent:()=>tu,NodeChangedEvent:()=>Zd});var qd=class $d extends Tr{constructor(e,t){super($d.type),this.node=e,this.data=t}};qd.type="node-changed";var Zd=qd,jd=class Kd extends Tr{constructor(e,t){super(Kd.type),this.link=e,this.node=t}};jd.type="enter-arrow";var Jd=jd,Qd=class eu extends Tr{constructor(e,t){super(eu.type),this.link=e,this.node=t}};Qd.type="leave-arrow";var tu=Qd,L0=class extends Pt{constructor(n=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=n,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ye(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(n,e){return super.copy(n,e),this.element=n.element.cloneNode(!0),this.center=n.center,this}},bi=new O,ql=new it,$l=new it,Zl=new O,jl=new O,D0=class{constructor(n={}){const e=this;let t,i,s,r;const a={objects:new WeakMap},o=n.element!==void 0?n.element:document.createElement("div");o.style.overflow="hidden",this.domElement=o,this.getSize=function(){return{width:t,height:i}},this.render=function(m,v){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),ql.copy(v.matrixWorldInverse),$l.multiplyMatrices(v.projectionMatrix,ql),l(m,m,v),p(m)},this.setSize=function(m,v){t=m,i=v,s=t/2,r=i/2,o.style.width=m+"px",o.style.height=v+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let v=0,_=m.children.length;v<_;v++)c(m.children[v])}function l(m,v,_){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){bi.setFromMatrixPosition(m.matrixWorld),bi.applyMatrix4($l);const f=bi.z>=-1&&bi.z<=1&&m.layers.test(_.layers)===!0,d=m.element;d.style.display=f===!0?"":"none",f===!0&&(m.onBeforeRender(e,v,_),d.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(bi.x*s+s)+"px,"+(-bi.y*r+r)+"px)",d.parentNode!==o&&o.appendChild(d),m.onAfterRender(e,v,_));const b={distanceToCameraSquared:h(_,m)};a.objects.set(m,b)}for(let f=0,d=m.children.length;f<d;f++)l(m.children[f],v,_)}function h(m,v){return Zl.setFromMatrixPosition(m.matrixWorld),jl.setFromMatrixPosition(v.matrixWorld),Zl.distanceToSquared(jl)}function u(m){const v=[];return m.traverseVisible(function(_){_.isCSS2DObject&&v.push(_)}),v}function p(m){const v=u(m).sort(function(f,d){if(f.renderOrder!==d.renderOrder)return d.renderOrder-f.renderOrder;const b=a.objects.get(f).distanceToCameraSquared,w=a.objects.get(d).distanceToCameraSquared;return b-w}),_=v.length;for(let f=0,d=v.length;f<d;f++)v[f].element.style.zIndex=_-f}}},Kl=new O,I0=new ci,Jl=new O,U0=class extends Pt{constructor(n=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=n,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(n,e){return super.copy(n,e),this.element=n.element.cloneNode(!0),this}},rn=new it,N0=new it,O0=class{constructor(n={}){const e=this;let t,i,s,r;const a={camera:{style:""},objects:new WeakMap},o=n.element!==void 0?n.element:document.createElement("div");o.style.overflow="hidden",this.domElement=o;const c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",o.appendChild(c);const l=document.createElement("div");l.style.transformStyle="preserve-3d",c.appendChild(l),this.getSize=function(){return{width:t,height:i}},this.render=function(_,f){const d=f.projectionMatrix.elements[5]*r;f.view&&f.view.enabled?(c.style.transform=`translate( ${-f.view.offsetX*(t/f.view.width)}px, ${-f.view.offsetY*(i/f.view.height)}px )`,c.style.transform+=`scale( ${f.view.fullWidth/f.view.width}, ${f.view.fullHeight/f.view.height} )`):c.style.transform="",_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),f.parent===null&&f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld();let b,w;f.isOrthographicCamera&&(b=-(f.right+f.left)/2,w=(f.top+f.bottom)/2);const E=f.view&&f.view.enabled?f.view.height/f.view.fullHeight:1,R=f.isOrthographicCamera?`scale( ${E} )scale(`+d+")translate("+h(b)+"px,"+h(w)+"px)"+u(f.matrixWorldInverse):`scale( ${E} )translateZ(`+d+"px)"+u(f.matrixWorldInverse),L=(f.isPerspectiveCamera?"perspective("+d+"px) ":"")+R+"translate("+s+"px,"+r+"px)";a.camera.style!==L&&(l.style.transform=L,a.camera.style=L),v(_,_,f)},this.setSize=function(_,f){t=_,i=f,s=t/2,r=i/2,o.style.width=_+"px",o.style.height=f+"px",c.style.width=_+"px",c.style.height=f+"px",l.style.width=_+"px",l.style.height=f+"px"};function h(_){return Math.abs(_)<1e-10?0:_}function u(_){const f=_.elements;return"matrix3d("+h(f[0])+","+h(-f[1])+","+h(f[2])+","+h(f[3])+","+h(f[4])+","+h(-f[5])+","+h(f[6])+","+h(f[7])+","+h(f[8])+","+h(-f[9])+","+h(f[10])+","+h(f[11])+","+h(f[12])+","+h(-f[13])+","+h(f[14])+","+h(f[15])+")"}function p(_){const f=_.elements;return"translate(-50%,-50%)"+("matrix3d("+h(f[0])+","+h(f[1])+","+h(f[2])+","+h(f[3])+","+h(-f[4])+","+h(-f[5])+","+h(-f[6])+","+h(-f[7])+","+h(f[8])+","+h(f[9])+","+h(f[10])+","+h(f[11])+","+h(f[12])+","+h(f[13])+","+h(f[14])+","+h(f[15])+")")}function m(_){_.isCSS3DObject&&(_.element.style.display="none");for(let f=0,d=_.children.length;f<d;f++)m(_.children[f])}function v(_,f,d,b){if(_.visible===!1){m(_);return}if(_.isCSS3DObject){const w=_.layers.test(d.layers)===!0,E=_.element;if(E.style.display=w===!0?"":"none",w===!0){_.onBeforeRender(e,f,d);let R;_.isCSS3DSprite?(rn.copy(d.matrixWorldInverse),rn.transpose(),_.rotation2D!==0&&rn.multiply(N0.makeRotationZ(_.rotation2D)),_.matrixWorld.decompose(Kl,I0,Jl),rn.setPosition(Kl),rn.scale(Jl),rn.elements[3]=0,rn.elements[7]=0,rn.elements[11]=0,rn.elements[15]=1,R=p(rn)):R=p(_.matrixWorld);const C=a.objects.get(_);if(C===void 0||C.style!==R){E.style.transform=R;const L={style:R};a.objects.set(_,L)}E.parentNode!==l&&l.appendChild(E),_.onAfterRender(e,f,d)}}for(let w=0,E=_.children.length;w<E;w++)v(_.children[w],f,d)}}},F0=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill-rule="even-odd" fill="currentColor" d="
        M50,50 m45,0
        a45,45 0 1,0 -90,0
        a45,45 0 1,0  90,0

        M50,50 m38,0
        a38,38 0 0,1 -76,0
        a38,38 0 0,1  76,0

        M50,50 m30,0
        a30,30 0 1,0 -60,0
        a30,30 0 1,0  60,0
        
        M50,40 m2.5,-2.5
        l17.5,17.5
        a 2.5,2.5 0 0 1 -5,5
        l-15,-15
        l-15,15
        a 2.5,2.5 0 0 1 -5,-5
        l17.5,-17.5
        a 3.5,3.5 0 0 1 5,0
    "/>
</svg>`,mr="tourLink",Ai="__tour-link__",B0={className:"psv-virtual-tour-tooltip",content:'<div class="psv-virtual-tour-loader"><div></div><div></div><div></div></div>'},z0={element:()=>{const n=document.createElement("button");return n.className="psv-virtual-tour-arrow",n.innerHTML=F0,n},size:{width:80,height:80}},oa="arrow",k0=class extends Yn{constructor(n,e){super(n,{className:"psv-virtual-tour-arrows"}),this.plugin=e,this.renderer=this.is3D?new O0({element:this.container}):new D0({element:this.container}),this.camera=this.is3D?new zt(30,1):null,this.scene=new $a,this.viewer.addEventListener(Et.ReadyEvent.type,this,{once:!0}),this.viewer.addEventListener(Et.PositionUpdatedEvent.type,this),this.viewer.addEventListener(Et.SizeUpdatedEvent.type,this),this.viewer.addEventListener(Et.RenderEvent.type,this),this.viewer.addEventListener(Et.ClickEvent.type,this),this.container.addEventListener("mouseenter",this,!0),this.container.addEventListener("mouseleave",this,!0),this.container.addEventListener("mousemove",this,!0),this.container.addEventListener("contextmenu",t=>t.preventDefault())}get is3D(){return this.plugin.is3D}get arrowsPosition(){return this.plugin.config.arrowsPosition}get arrowStyle(){return this.plugin.config.arrowStyle}init(){this.is3D&&(this.gallery=this.viewer.getPlugin("gallery"),this.gallery?.addEventListener("show-gallery",this),this.gallery?.addEventListener("hide-gallery",this))}destroy(){this.viewer.removeEventListener(Et.ReadyEvent.type,this),this.viewer.removeEventListener(Et.PositionUpdatedEvent.type,this),this.viewer.removeEventListener(Et.SizeUpdatedEvent.type,this),this.viewer.removeEventListener(Et.RenderEvent.type,this),this.viewer.removeEventListener(Et.ClickEvent.type,this),this.gallery?.removeEventListener("show-gallery",this),this.gallery?.removeEventListener("hide-gallery",this),super.destroy()}handleEvent(n){switch(n.type){case Et.ReadyEvent.type:case Et.SizeUpdatedEvent.type:case Et.PositionUpdatedEvent.type:this.__updateCamera();break;case Et.RenderEvent.type:this.render();break;case Et.ClickEvent.type:{if(n.data.rightclick)break;const e=this.__getTargetLink(n.data.target,!0);e&&this.plugin.setCurrentNode(e.nodeId,null,e);break}case"mouseenter":{const e=this.__getTargetLink(je.getEventTarget(n));e&&this.plugin.__onEnterArrow(e,n);break}case"mouseleave":{const e=this.__getTargetLink(je.getEventTarget(n));e&&this.plugin.__onLeaveArrow(e);break}case"mousemove":{this.__getTargetLink(je.getEventTarget(n),!0)&&this.plugin.__onHoverArrow(n);break}case"hide-gallery":this.__onToggleGallery(!1);break;case"show-gallery":n.fullscreen||this.__onToggleGallery(!0);break}}__updateCamera(){const n=this.viewer.getSize();if(this.renderer.setSize(n.width,n.height),this.is3D){const e=this.viewer.getPosition();e.pitch=ke.clamp(e.pitch,-this.arrowsPosition.maxPitch,-this.arrowsPosition.minPitch),this.viewer.dataHelper.sphericalCoordsToVector3(e,this.camera.position,n.height*2).negate(),this.camera.lookAt(0,0,0),this.camera.translateY(n.height/3),this.camera.updateProjectionMatrix()}}render(){if(this.is3D){const n=this.viewer.getPosition(),e=[];let t=Number.MAX_SAFE_INTEGER;this.scene.children.forEach(i=>{const s=i.userData[oa];if(s.conflict){const r=Math.abs(je.getShortestArc(n.yaw,s.yaw));t=Math.min(t,r),e.push([i,r])}}),e.forEach(([i,s])=>{const r=s!==t;i.element.style.opacity=r?"0.5":null,i.element.style.zIndex=r?"-1":null}),this.renderer.render(this.scene,this.camera)}else this.renderer.render(this.scene,this.viewer.renderer.camera)}clear(){this.scene.clear()}__buildArrowElement(n,e){if(e?.image){const t=document.createElement("img");return t.src=e.image,t}else if(e?.element)return typeof e.element=="function"?e.element(n):e.element}addLinkArrow(n,e,t=1){let i=this.__buildArrowElement(n,n.arrowStyle);i||(i=this.__buildArrowElement(n,this.arrowStyle)),i[mr]=n;const s={...this.arrowStyle,...n.arrowStyle};if(i.classList.add("psv-virtual-tour-link"),s.className&&je.addClasses(i,s.className),s.style&&Object.assign(i.style,s.style),this.is3D){i.style.width=s.size.width*1.5+"px",i.style.height=s.size.height*1.5+"px";let r=!1;this.scene.children.forEach(o=>{const c=o.userData[oa];Math.abs(je.getShortestArc(c.yaw,e.yaw))<this.arrowsPosition.linkOverlapAngle&&(c.conflict=!0,r=!0)});const a=new U0(i);a.userData[oa]={yaw:e.yaw,conflict:r},a.rotation.set(-Math.PI/2,0,Math.PI-e.yaw),this.viewer.dataHelper.sphericalCoordsToVector3({yaw:e.yaw,pitch:0},a.position,t*100),this.scene.add(a)}else{i.style.width=s.size.width+"px",i.style.height=s.size.height+"px",i.style.pointerEvents="auto";const r=new L0(i);this.viewer.dataHelper.sphericalCoordsToVector3(e,r.position),this.scene.add(r)}}__getTargetLink(n,e=!1){const t=e?je.getClosest(n,".psv-virtual-tour-link"):n;return t?t[mr]:void 0}__onToggleGallery(n){n?this.container.style.marginBottom=this.viewer.container.querySelector(".psv-gallery").offsetHeight+"px":this.container.style.marginBottom=""}},nu=class{constructor(n,e){this.plugin=n,this.viewer=e,this.nodes={}}destroy(){}checkNode(n){if(!n.id)throw new Te("No id given for node");if(!n.panorama)throw new Te(`No panorama provided for node ${n.id}`);if(this.plugin.isGps&&!(n.gps?.length>=2))throw new Te(`No GPS position provided for node ${n.id}`);if(!this.plugin.isGps&&n.markers?.some(e=>e.gps&&!e.position))throw new Te("Cannot use GPS positioning for markers in manual mode");n.links||(je.logWarn(`Node ${n.id} has no links`),n.links=[])}checkLink(n,e){if(!e.nodeId)throw new Te(`Link of node ${n.id} has no target id`);if(e.nodeId===n.id)throw new Te(`Node ${n.id} links to itself`);if(!this.plugin.isGps&&!je.isExtendedPosition(e.position))throw new Te(`No position provided for link ${e.nodeId} of node ${n.id}`);if(this.plugin.isGps&&!e.gps)throw new Te(`No GPS position provided for link ${e.nodeId} of node ${n.id}`)}},H0=class extends nu{async loadNode(n){if(this.nodes[n])return this.nodes[n];throw new Te(`Node ${n} not found`)}setNodes(n){if(!n?.length)throw new Te("No nodes provided");const e={},t={};n.forEach(i=>{if(this.checkNode(i),e[i.id])throw new Te(`Duplicate node ${i.id}`);e[i.id]=i}),n.forEach(i=>{this.__checkLinks(i,e),i.links.forEach(s=>{t[s.nodeId]=!0})}),n.forEach(i=>{t[i.id]||je.logWarn(`Node ${i.id} is never linked to`)}),this.nodes=e}updateNode(n){if(!n.id)throw new Te("No id given for node");const e=this.nodes[n.id];if(!e)throw new Te(`Node ${n.id} does not exist`);return Object.assign(e,n),this.checkNode(e),this.__checkLinks(e,this.nodes),e}__checkLinks(n,e){n.links.forEach(t=>{if(!e[t.nodeId])throw new Te(`Target node ${t.nodeId} of node ${n.id} does not exists`);t.gps=t.gps||e[t.nodeId].gps,this.checkLink(n,t)})}},V0=class extends nu{constructor(n,e){if(super(n,e),!n.config.getNode)throw new Te("Missing getNode() option.");this.nodeResolver=n.config.getNode}async loadNode(n){if(this.nodes[n])return this.nodes[n];{const e=await this.nodeResolver(n);return this.checkNode(e),e.links.forEach(t=>{this.checkLink(e,t)}),this.nodes[n]=e,e}}clearCache(){this.nodes={}}};function Ql(n,e){const t=ec(n),i=ec(e),s=n[2]??0,r=e[2]??0;let a=0;return s!==r&&(a=Math.atan((r-s)/G0(t,i))),{yaw:W0(t,i),pitch:a}}function ec(n){return[ke.degToRad(n[0]),ke.degToRad(n[1])]}function G0(n,e){return je.greatArcDistance(n,e)*6371e3}function W0(n,e){const[t,i]=n,[s,r]=e,a=Math.sin(s-t)*Math.cos(r),o=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(s-t);return Math.atan2(a,o)}var Uo=je.getConfigParser({dataMode:"client",positionMode:"manual",renderMode:"3d",nodes:null,getNode:null,startNodeId:null,preload:!1,transitionOptions:{showLoader:!0,speed:"20rpm",effect:"fade",rotation:!0},linksOnCompass:!0,showLinkTooltip:!0,getLinkTooltip:null,arrowStyle:z0,arrowsPosition:{minPitch:.3,maxPitch:Math.PI/2,linkOverlapAngle:Math.PI/4,linkPitchOffset:-.1},map:null},{dataMode(n){if(n!=="client"&&n!=="server")throw new Te("VirtualTourPlugin: invalid dataMode");return n},positionMode(n){if(n!=="gps"&&n!=="manual")throw new Te("VirtualTourPlugin: invalid positionMode");return n},renderMode(n){if(n!=="3d"&&n!=="2d")throw new Te("VirtualTourPlugin: invalid renderMode");return n},arrowsPosition(n,{defValue:e}){return{...e,...n}},arrowStyle(n,{defValue:e}){return{...e,...n}},map(n,{rawConfig:e}){if(n){if(e.dataMode==="server")return je.logWarn("VirtualTourPlugin: The map cannot be used in server side mode"),null;if(!n.imageUrl)return je.logWarn('VirtualTourPlugin: configuring the map requires at least "imageUrl"'),null;"recenter"in n||(n.recenter=!0)}return n}}),As=class iu extends Xd{constructor(e,t){super(e,t),this.state={currentNode:null,currentTooltip:null,loadingNode:null,preload:{}},this.arrowsRenderer=new k0(this.viewer,this)}get is3D(){return this.config.renderMode==="3d"}get isServerSide(){return this.config.dataMode==="server"}get isGps(){return this.config.positionMode==="gps"}static withConfig(e){return[iu,e]}init(){super.init(),this.arrowsRenderer.init(),je.checkStylesheet(this.viewer.container,"virtual-tour-plugin"),this.markers=this.viewer.getPlugin("markers"),this.compass=this.viewer.getPlugin("compass"),this.markers?.config.markers&&(je.logWarn("No default markers can be configured on the MarkersPlugin when using the VirtualTourPlugin. Consider defining `markers` on each tour node."),delete this.markers.config.markers),this.isGps&&(this.plan=this.viewer.getPlugin("plan")),this.isServerSide||(this.gallery=this.viewer.getPlugin("gallery"),this.map=this.viewer.getPlugin("map"),this.config.map&&!this.map&&je.logWarn("The map is configured on the VirtualTourPlugin but the MapPlugin is not loaded.")),this.datasource=this.isServerSide?new V0(this,this.viewer):new H0(this,this.viewer),this.map&&(this.map.addEventListener("select-hotspot",this),this.map.setImage(this.config.map.imageUrl)),this.plan?.addEventListener("select-hotspot",this),this.isServerSide?this.config.startNodeId&&this.setCurrentNode(this.config.startNodeId):this.config.nodes&&(this.setNodes(this.config.nodes,this.config.startNodeId),delete this.config.nodes)}destroy(){this.map?.removeEventListener("select-hotspot",this),this.plan?.removeEventListener("select-hotspot",this),this.datasource.destroy(),this.arrowsRenderer.destroy(),delete this.datasource,delete this.markers,delete this.compass,delete this.gallery,delete this.arrowsRenderer,super.destroy()}handleEvent(e){if(e instanceof Et.ClickEvent){const t=e.data.objects.find(i=>i.userData[mr])?.userData[mr];t&&this.setCurrentNode(t.nodeId,null,t)}else if(e.type==="select-hotspot"){const t=e.hotspotId;t.startsWith(Ai)&&this.setCurrentNode(t.substring(Ai.length))}}getCurrentNode(){return this.state.currentNode}setNodes(e,t){if(this.isServerSide)throw new Te("Cannot set nodes in server side mode");this.__hideTooltip(),this.state.currentNode=null,this.datasource.setNodes(e),t?this.datasource.nodes[t]||(t=e[0].id,je.logWarn(`startNodeId not found is provided nodes, resetted to ${t}`)):t=e[0].id,this.setCurrentNode(t),this.__setGalleryItems(),this.__setMapHotspots(),this.__setPlanHotspots()}setCurrentNode(e,t,i){if(e===this.state.currentNode?.id&&!t?.forceUpdate)return Promise.resolve(!0);t?.forceUpdate&&this.isServerSide&&this.datasource.clearCache(),this.viewer.hideError(),this.state.loadingNode=e;const s=this.state.currentNode,r=s&&i?this.__getLinkPosition(s,i):null;return Promise.resolve(this.state.preload[e]).then(()=>{if(this.state.loadingNode!==e)throw je.getAbortError();return this.datasource.loadNode(e)}).then(a=>{if(this.state.loadingNode!==e)throw je.getAbortError();const o={...Uo.defaults.transitionOptions,rotateTo:r,zoomTo:r?this.viewer.getZoomLevel():null,...typeof this.config.transitionOptions=="function"?this.config.transitionOptions(a,s,i):this.config.transitionOptions,...t};return o.effect||(o.effect="none"),this.viewer.panel.hide("description"),this.__hideTooltip(),this.arrowsRenderer.clear(),this.gallery?.config.hideOnClick&&this.gallery.hide(),this.map?.config.minimizeOnHotspotClick&&this.map.minimize(),this.plan?.config.minimizeOnHotspotClick&&this.plan.minimize(),o.rotation&&o.effect==="none"?this.viewer.animate({...o.rotateTo,zoom:o.zoomTo,speed:o.speed}).then(()=>[a,o]):Promise.resolve([a,o])}).then(([a,o])=>{if(this.state.loadingNode!==e)throw je.getAbortError();return this.markers?.clearMarkers(),this.config.linksOnCompass&&this.compass?.clearHotspots(),this.viewer.setPanorama(a.panorama,{caption:a.caption,description:a.description,panoData:a.panoData,sphereCorrection:a.sphereCorrection,showLoader:o.showLoader,position:o.rotateTo,zoom:o.zoomTo,transition:o.effect==="none"?!1:{effect:o.effect,rotation:o.rotation,speed:o.speed}}).then(c=>{if(!c)throw je.getAbortError();return a})}).then(a=>{if(this.state.loadingNode!==e)throw je.getAbortError();return this.state.currentNode=a,this.map&&this.map.setCenter(this.__getNodeMapPosition(a)??this.map.config.center,this.config.map.recenter),this.plan?.setCoordinates(a.gps),this.__addNodeMarkers(a),this.__renderLinks(a),this.__preload(a),this.state.loadingNode=null,this.dispatchEvent(new Zd(a,{fromNode:s,fromLink:i,fromLinkPosition:r})),this.viewer.resetIdleTimer(),!0}).catch(a=>{if(je.isAbortError(a))return!1;throw this.viewer.showError(this.viewer.config.lang.loadError),this.viewer.loader.hide(),this.viewer.navbar.setCaption(""),this.state.loadingNode=null,a})}async gotoLink(e,t="8rpm"){const i=this.getLinkPosition(e);t?await this.viewer.animate({...i,speed:t}):this.viewer.rotate(i)}getLinkPosition(e){const t=this.state.currentNode?.links.find(i=>i.nodeId===e);if(!t)throw new Te(`Cannot find link "${e}"`);return this.__getLinkPosition(this.state.currentNode,t)}updateNode(e){if(this.isServerSide)throw new Te("Cannot update node in server side mode");const t=this.datasource.updateNode(e);if((e.name||e.thumbnail||e.panorama)&&this.__setGalleryItems(),(e.name||e.gps||e.map)&&this.__setMapHotspots(),(e.name||e.gps||e.plan)&&this.__setPlanHotspots(),this.state.currentNode?.id===t.id){if(this.__hideTooltip(),e.panorama||e.panoData||e.sphereCorrection){this.setCurrentNode(t.id,{forceUpdate:!0});return}e.caption&&this.viewer.setOption("caption",t.caption),e.description&&this.viewer.setOption("description",t.description),(e.links||e.gps)&&this.__renderLinks(t),e.gps&&this.plan?.setCoordinates(t.gps),(e.map||e.gps)&&this.map?.setCenter(this.__getNodeMapPosition(t)),(e.markers||e.gps)&&this.__addNodeMarkers(t)}}__setGalleryItems(){this.gallery&&this.gallery.setItems(Object.values(this.datasource.nodes).filter(e=>e.showInGallery!==!1).map(e=>({id:e.id,panorama:e.panorama,name:e.name,thumbnail:e.thumbnail})),e=>{this.setCurrentNode(e)})}__setMapHotspots(){this.map&&this.map.setHotspots(Object.values(this.datasource.nodes).filter(e=>e.map!==!1).map(e=>({tooltip:e.name,...e.map||{},...this.__getNodeMapPosition(e),id:Ai+e.id})))}__setPlanHotspots(){this.plan&&this.plan.setHotspots(Object.values(this.datasource.nodes).filter(e=>e.plan!==!1).map(e=>({tooltip:e.name,...e.plan||{},coordinates:e.gps,id:Ai+e.id})))}__renderLinks(e){this.arrowsRenderer.clear();const t=[];e.links.forEach(i=>{const s=this.__getLinkPosition(e,i);s.yaw+=i.linkOffset?.yaw??0,s.pitch+=i.linkOffset?.pitch??0,this.isGps&&!this.is3D&&(s.pitch+=this.config.arrowsPosition.linkPitchOffset),t.push(s),this.arrowsRenderer.addLinkArrow(i,s,i.linkOffset?.depth)}),this.arrowsRenderer.render(),this.config.linksOnCompass&&this.compass?.setHotspots(t)}__getLinkPosition(e,t){return this.isGps?Ql(e.gps,t.gps):this.viewer.dataHelper.cleanPosition(t.position)}async __getTooltipContent(e){const t=await this.datasource.loadNode(e.nodeId),i=[];(t.name||t.thumbnail||t.caption)&&(t.name&&i.push(`<h3>${t.name}</h3>`),t.thumbnail&&i.push(`<img src="${t.thumbnail}">`),t.caption&&i.push(`<p>${t.caption}</p>`));let s=i.join("");return this.config.getLinkTooltip&&(s=this.config.getLinkTooltip(s,e,t)),s}__onEnterArrow(e,t){const i=je.getPosition(this.viewer.container),s={x:t.clientX-i.x,y:t.clientY-i.y};this.config.showLinkTooltip&&(this.state.currentTooltip=this.viewer.createTooltip({...B0,left:s.x,top:s.y,box:{width:20,height:20}}),this.__getTooltipContent(e).then(r=>{r?this.state.currentTooltip.update(r):this.__hideTooltip()})),this.map?.setActiveHotspot(Ai+e.nodeId),this.plan?.setActiveHotspot(Ai+e.nodeId),this.dispatchEvent(new Jd(e,this.state.currentNode))}__onHoverArrow(e){const t=je.getPosition(this.viewer.container),i={x:e.clientX-t.x,y:e.clientY-t.y};this.state.currentTooltip?.move({left:i.x,top:i.y})}__onLeaveArrow(e){this.__hideTooltip(),this.map?.setActiveHotspot(null),this.plan?.setActiveHotspot(null),this.dispatchEvent(new tu(e,this.state.currentNode))}__hideTooltip(){this.state.currentTooltip?.hide(),this.state.currentTooltip=null}__preload(e){this.config.preload&&(this.state.preload[e.id]=!0,this.state.currentNode.links.filter(t=>!this.state.preload[t.nodeId]).filter(t=>typeof this.config.preload=="function"?this.config.preload(this.state.currentNode,t):!0).forEach(t=>{this.state.preload[t.nodeId]=this.datasource.loadNode(t.nodeId).then(i=>this.viewer.textureLoader.preloadPanorama(i.panorama)).then(()=>{this.state.preload[t.nodeId]=!0}).catch(()=>{delete this.state.preload[t.nodeId]})}))}__addNodeMarkers(e){e.markers&&(this.markers?this.markers.setMarkers(e.markers.map(t=>(t.gps&&this.isGps&&(t.position=Ql(e.gps,t.gps),t.data?.map&&Object.assign(t.data.map,this.__getGpsMapPosition(t.gps)),t.data?.plan&&(t.data.plan.coordinates=t.gps)),t))):je.logWarn(`Node ${e.id} markers ignored because the plugin is not loaded.`))}__getNodeMapPosition(e){const t=this.__getGpsMapPosition(e.gps);return t||(e.map?{x:e.map.x,y:e.map.y}:null)}__getGpsMapPosition(e){const t=this.config.map;return this.isGps&&t&&t.extent&&t.size?{x:ke.mapLinear(e[0],t.extent[0],t.extent[2],0,t.size.width),y:ke.mapLinear(e[1],t.extent[1],t.extent[3],0,t.size.height)}:null}};As.id="virtual-tour";As.VERSION="5.14.1";As.configParser=Uo;As.readonlyOptions=Object.keys(Uo.defaults);var tc=As;const la=[{id:"lobby",panorama:"/virtual-tour/pano.jpg",name:"Luxury Living Area",links:[{nodeId:"hallway",position:{yaw:.5,pitch:0}}]},{id:"hallway",panorama:"/virtual-tour/hallway.jpg",name:"Luxury Bathroom",links:[{nodeId:"lobby",position:{yaw:Math.PI,pitch:0}},{nodeId:"suite",position:{yaw:0,pitch:0}}]},{id:"suite",panorama:"/virtual-tour/suite-interior.jpg",name:"Imperial Bedroom",links:[{nodeId:"hallway",position:{yaw:Math.PI,pitch:0}}]}];function $0({initialNodeId:n}){const e=qi.useRef(null),t=qi.useRef(null),[i,s]=qi.useState("loading"),[r,a]=qi.useState("");return qi.useEffect(()=>{const o=e.current;if(!o)return;t.current&&(t.current.destroy(),t.current=null);let c=!1;try{const l=la.find(u=>u.id===n)??la[0],h=new A0({container:o,panorama:l.panorama,defaultZoomLvl:30,navbar:["zoom","fullscreen"],loadingTxt:"Loading room...",plugins:[[tc,{positionMode:"manual",renderMode:"3d",startNodeId:l.id,preload:!1,nodes:la}]]});t.current=h,h.addEventListener("ready",()=>{if(c)return;s("ready"),a(l.name),h.getPlugin(tc)?.addEventListener("node-changed",p=>{c||a(p.node.name)})}),h.addEventListener("panorama-error",()=>{c||s("error")})}catch(l){console.error("[VirtualTourViewer] failed to create viewer",l),c||s("error")}return()=>{c=!0,t.current&&(t.current.destroy(),t.current=null)}},[n]),sn.jsxs("div",{className:"relative h-[58vh] min-h-[420px] w-full overflow-hidden rounded-2xl",children:[sn.jsx("div",{ref:e,className:"h-full w-full"}),i==="loading"&&sn.jsxs("div",{className:"pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-950",children:[sn.jsx("div",{className:"h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/70"}),sn.jsx("span",{className:"text-sm font-semibold text-white/60",children:"Loading virtual tour…"})]}),i==="error"&&sn.jsxs("div",{className:"pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950",children:[sn.jsx("span",{className:"text-2xl",children:"⚠️"}),sn.jsx("span",{className:"text-sm font-semibold text-white/60",children:"Failed to load panorama"})]}),i==="ready"&&r&&sn.jsx("div",{className:"pointer-events-none absolute left-4 top-4 z-30 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm",children:r}),sn.jsx("div",{className:"pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur",children:"Click and drag to look around · Use arrows to move between rooms"})]})}export{$0 as default};
