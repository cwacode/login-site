import{_ as p,o as r,c as n,a as s,f as u,t as d,d as c,w as h,b as m,v as f,p as g,i as _}from"./index-924daf65.js";const D="/cone.png",w="/back.png";const M={data(){return{errorMessage:"",successMessage:"",showEditModal:!1,profileData:{firstName:"",lastName:"",email:"",password:""},userData:null,showUserData:!1,emailToShowDetails:"",showDeleteModal:!1}},methods:{showUserDetails(){const a=localStorage.getItem("cachedEmail");a&&(this.emailToShowDetails=a,fetch(`https://loginab.onrender.com/api/profile/${this.emailToShowDetails}`).then(e=>{if(e.ok)return e.json();throw new Error("Failed to fetch user details")}).then(e=>{this.userData=e,this.showUserData=!0}).catch(e=>{console.error("Error fetching user details:",e)}))},closeUserDataModal(){this.showUserData=!1},saveProfileChanges(){fetch("https://loginab.onrender.com/api/profile/update",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:this.profileData.firstName,lastName:this.profileData.lastName,email:this.profileData.email,password:this.profileData.password})}).then(a=>{a.ok?(this.successMessage="Profilen är nu ändrad",setTimeout(()=>{this.showEditModal=!1,this.successMessage=""},4e3)):(this.errorMessage="Profilen finns inte",setTimeout(()=>{this.showEditModal=!1,this.errorMessage=""},4e3))}).catch(a=>{console.error("Error updating profile:",a)})},closeEditModal(){this.showEditModal=!1},openEditModal(){this.showEditModal=!0},showDeleteConfirmation(){this.showDeleteModal=!0},goBack(){this.$router.push({name:"Welcome"})},confirmDeleteProfile(){console.log("confirmDeleteProfile method is triggered");const a=localStorage.getItem("cachedEmail");a?(this.emailToShowDetails=a,fetch(`https://loginab.onrender.com/api/delete/${this.emailToShowDetails}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(e=>{e.ok?this.$router.push({name:"LogIn"}):e.status===404?this.errorMessage="Profilen finns inte":console.error("Error deleting profile:",e.status)}).catch(e=>{console.error("Error:",e)})):console.error("Cached email not found")},closeModal(){this.showDeleteModal=!1}}},i=a=>(g("data-v-41d222b5"),a=a(),_(),a),v=i(()=>s("div",{class:"image-container"},[s("img",{src:D,alt:"Logga in",class:"welcome-image",loading:"lazy"})],-1)),E=i(()=>s("img",{src:w,alt:"Tillbaka",class:"login-image",loading:"lazy"},null,-1)),k=[E],b={key:0,class:"modal"},y={class:"modal-content"},C=i(()=>s("h3",null,"Användaruppgifter",-1)),N=i(()=>s("strong",null,"Förnamn:",-1)),U=i(()=>s("strong",null,"Efternamn:",-1)),P=i(()=>s("strong",null,"E-post:",-1)),S={key:1,class:"modal"},T={class:"modal-content"},V=i(()=>s("h3",null,"Ändra profil",-1)),I={class:"form-group"},x=i(()=>s("label",{for:"firstName"},"Förnamn:",-1)),B={class:"form-group"},j=i(()=>s("label",{for:"lastName"},"Efternamn:",-1)),L={class:"form-group"},F=i(()=>s("label",{for:"email"},"E-post:",-1)),z={class:"form-group"},J=i(()=>s("label",{for:"password"},"Lösenord:",-1)),R={class:"form-group"},A=i(()=>s("button",{type:"submit"},"Spara ändringar",-1)),O={key:0,class:"success-message"},W={key:1,class:"error-message"},q={key:2,class:"modal"},G={class:"modal-content"},H=i(()=>s("h3",null,"Radera konto",-1)),K=i(()=>s("p",null,"Är du säker på att vill radera ditt konto?",-1)),Q={key:3,class:"error-message"};function X(a,e,Y,Z,t,l){return r(),n("form",{onSubmit:e[14]||(e[14]=h((...o)=>a.updateUserProfile&&a.updateUserProfile(...o),["prevent"]))},[v,s("div",{onClick:e[0]||(e[0]=(...o)=>l.goBack&&l.goBack(...o)),class:"login-image-container"},k),s("button",{onClick:e[1]||(e[1]=(...o)=>l.showUserDetails&&l.showUserDetails(...o)),class:"button"},"Visa mina uppgifter"),t.showUserData&&t.userData?(r(),n("div",b,[s("div",y,[s("span",{class:"close",onClick:e[2]||(e[2]=(...o)=>l.closeUserDataModal&&l.closeUserDataModal(...o))},"×"),C,s("div",null,[s("p",null,[N,u(" "+d(t.userData.first_name),1)]),s("p",null,[U,u(" "+d(t.userData.last_name),1)]),s("p",null,[P,u(" "+d(t.userData.email),1)])])])])):c("",!0),s("button",{onClick:e[3]||(e[3]=(...o)=>l.openEditModal&&l.openEditModal(...o))},"Uppdatera profil"),t.showEditModal?(r(),n("div",S,[s("div",T,[s("span",{class:"close",onClick:e[4]||(e[4]=(...o)=>l.closeEditModal&&l.closeEditModal(...o))},"×"),V,s("form",{onSubmit:e[9]||(e[9]=h((...o)=>l.saveProfileChanges&&l.saveProfileChanges(...o),["prevent"])),class:"vertical-form"},[s("div",I,[x,m(s("input",{type:"text",id:"firstName","onUpdate:modelValue":e[5]||(e[5]=o=>t.profileData.firstName=o)},null,512),[[f,t.profileData.firstName]])]),s("div",B,[j,m(s("input",{type:"text",id:"lastName","onUpdate:modelValue":e[6]||(e[6]=o=>t.profileData.lastName=o)},null,512),[[f,t.profileData.lastName]])]),s("div",L,[F,m(s("input",{type:"email",id:"email","onUpdate:modelValue":e[7]||(e[7]=o=>t.profileData.email=o)},null,512),[[f,t.profileData.email]])]),s("div",z,[J,m(s("input",{type:"password",id:"password","onUpdate:modelValue":e[8]||(e[8]=o=>t.profileData.password=o)},null,512),[[f,t.profileData.password]])]),s("div",R,[A,t.successMessage?(r(),n("div",O,d(t.successMessage),1)):c("",!0),t.errorMessage?(r(),n("div",W,d(t.errorMessage),1)):c("",!0)])],32)])])):c("",!0),s("button",{class:"delete",onClick:e[10]||(e[10]=(...o)=>l.showDeleteConfirmation&&l.showDeleteConfirmation(...o))},"Radera mitt konto"),t.showDeleteModal?(r(),n("div",q,[s("div",G,[s("span",{class:"close",onClick:e[11]||(e[11]=(...o)=>l.closeModal&&l.closeModal(...o))},"×"),H,K,s("div",null,[s("button",{onClick:e[12]||(e[12]=(...o)=>l.confirmDeleteProfile&&l.confirmDeleteProfile(...o))},"Ja"),s("button",{onClick:e[13]||(e[13]=(...o)=>l.closeModal&&l.closeModal(...o)),class:"red-button"},"Nej")])])])):c("",!0),t.errorMessage?(r(),n("div",Q,d(t.errorMessage),1)):c("",!0)],32)}const ee=p(M,[["render",X],["__scopeId","data-v-41d222b5"]]);export{ee as default};