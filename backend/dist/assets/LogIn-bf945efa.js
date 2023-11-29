import{_ as u,r as _,o as i,c,a as e,w as g,b as a,v as d,t as h,d as b,e as f,f as m,g as v,h as w,F as y,p as k,i as S}from"./index-1e4efade.js";const x="/login.png";const I={data(){return{username:"",password:"",error:"",rememberMe:!1}},mounted(){const s=localStorage.getItem("cachedEmail");s&&this.rememberMe&&(this.username=s)},methods:{async login(){try{if((await fetch("https://loginab.onrender.com/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.username,password:this.password})})).ok)this.rememberMe?localStorage.setItem("cachedEmail",this.username):localStorage.removeItem("cachedEmail"),this.$router.push({name:"Welcome"});else throw new Error("Logga in misslyckades")}catch{this.error="Fel e-post eller lösenord",setTimeout(()=>{this.error=""},2e3)}}}},n=s=>(k("data-v-1e0a24e3"),s=s(),S(),s),E={class:"login-container"},M=n(()=>e("div",{class:"image-container"},[e("img",{src:x,alt:"Logga in",class:"login-image",loading:"lazy"})],-1)),L=n(()=>e("h2",null,"Logga in",-1)),V={class:"form-group"},C=n(()=>e("label",{for:"username",class:"label"},"E-post:",-1)),N={class:"form-group"},T=n(()=>e("label",{for:"password",class:"label"},"Lösenord:",-1)),B={key:0,class:"error-message"},F=n(()=>e("button",{type:"submit",class:"button"},"Logga in",-1)),U=n(()=>e("p",null,"Eller skapa konto nedan",-1)),D={class:"button"};function O(s,o,j,z,t,l){const p=_("router-link");return i(),c(y,null,[e("div",E,[M,L,e("form",{onSubmit:o[3]||(o[3]=g((...r)=>l.login&&l.login(...r),["prevent"])),class:"login-form"},[e("div",V,[C,a(e("input",{type:"text",id:"username","onUpdate:modelValue":o[0]||(o[0]=r=>t.username=r),class:"input"},null,512),[[d,t.username]])]),e("div",N,[T,a(e("input",{type:"password",id:"password","onUpdate:modelValue":o[1]||(o[1]=r=>t.password=r),class:"input"},null,512),[[d,t.password]])]),t.error?(i(),c("div",B,h(t.error),1)):b("",!0),e("label",null,[a(e("input",{type:"checkbox","onUpdate:modelValue":o[2]||(o[2]=r=>t.rememberMe=r)},null,512),[[f,t.rememberMe]]),m(" Kom ihåg mig ")]),F],32)]),e("div",null,[U,e("button",D,[v(p,{to:{name:"Register"}},{default:w(()=>[m("Skapa konto")]),_:1})])])],64)}const K=u(I,[["render",O],["__scopeId","data-v-1e0a24e3"]]);export{K as default};
