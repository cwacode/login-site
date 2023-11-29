import{_ as h,o as r,c as n,a as e,f as c,t as d,d as f,w as p,b as m,v as u,p as D,i as g}from"./index-1e4efade.js";const M={data(){return{showDeleteModal:!1,emailToDelete:"",errorMessage:"",successMessage:"",showEditModal:!1,profileData:{firstName:"",lastName:"",email:"",password:""},userData:null,showUserData:!1,emailToShowDetails:""}},methods:{confirmDeleteProfile(){this.showDeleteModal=!0},closeModal(){this.showDeleteModal=!1,this.emailToDelete=""},showUserDetails(){const l=localStorage.getItem("cachedEmail");l&&(this.emailToShowDetails=l,fetch(`https://loginab.onrender.com/api/profile/${this.emailToShowDetails}`).then(s=>{if(s.ok)return s.json();throw new Error("Failed to fetch user details")}).then(s=>{this.userData=s,this.showUserData=!0}).catch(s=>{console.error("Error fetching user details:",s)}))},closeUserDataModal(){this.showUserData=!1},saveProfileChanges(){fetch("https://loginab.onrender.com/api/profile/update",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:this.profileData.firstName,lastName:this.profileData.lastName,email:this.profileData.email,password:this.profileData.password})}).then(l=>{l.ok?(this.successMessage="Profilen är nu ändrad",setTimeout(()=>{this.showEditModal=!1,this.successMessage=""},4e3)):(this.errorMessage="Profilen finns inte",setTimeout(()=>{this.showEditModal=!1,this.errorMessage=""},4e3))}).catch(l=>{console.error("Error updating profile:",l)})},closeEditModal(){this.showEditModal=!1},closeEmailModal(){this.showEmailModal=!1,this.emailToShowDetails=""},openEditModal(){this.showEditModal=!0},deleteProfile(){this.emailToDelete.trim()!==""&&fetch(`https://loginab.onrender.com/api/delete/${this.emailToDelete}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(l=>{l.ok?(this.successMessage="Profilen är nu raderad",setTimeout(()=>{this.successMessage="",this.closeModal()},1e3)):l.status===404?(this.errorMessage="Profilen finns inte",setTimeout(()=>{this.errorMessage=""},1e3)):console.error("Error deleting profile:",l.status)}).catch(l=>{console.error("Error:",l)})}}},i=l=>(D("data-v-40692a67"),l=l(),g(),l),_={key:0,class:"modal"},w={class:"modal-content"},E=i(()=>e("h3",null,"Användaruppgifter",-1)),v=i(()=>e("strong",null,"Förnamn:",-1)),k=i(()=>e("strong",null,"Efternamn:",-1)),y=i(()=>e("strong",null,"E-post:",-1)),T={key:1,class:"modal"},U={class:"modal-content"},b=i(()=>e("h3",null,"Ändra profil",-1)),N={class:"form-group"},P=i(()=>e("label",{for:"firstName"},"Förnamn:",-1)),C={class:"form-group"},S=i(()=>e("label",{for:"lastName"},"Efternamn:",-1)),V={class:"form-group"},x=i(()=>e("label",{for:"email"},"E-post:",-1)),I={class:"form-group"},B=i(()=>e("label",{for:"password"},"Lösenord:",-1)),j={class:"form-group"},F=i(()=>e("button",{type:"submit"},"Spara ändringar",-1)),A={key:0,class:"success-message"},L={key:1,class:"error-message"},J={key:2,class:"modal"},O={class:"modal-content"},R=i(()=>e("p",null,"Ange din e-postadress:",-1)),q={key:0,class:"success-message"},z={key:1,class:"error-message"};function G(l,s,H,K,t,a){return r(),n("form",{onSubmit:s[13]||(s[13]=p((...o)=>l.updateUserProfile&&l.updateUserProfile(...o),["prevent"]))},[e("button",{onClick:s[0]||(s[0]=(...o)=>a.showUserDetails&&a.showUserDetails(...o)),class:"button"},"Visa mina uppgifter"),t.showUserData&&t.userData?(r(),n("div",_,[e("div",w,[e("span",{class:"close",onClick:s[1]||(s[1]=(...o)=>a.closeUserDataModal&&a.closeUserDataModal(...o))},"×"),E,e("div",null,[e("p",null,[v,c(" "+d(t.userData.first_name),1)]),e("p",null,[k,c(" "+d(t.userData.last_name),1)]),e("p",null,[y,c(" "+d(t.userData.email),1)])])])])):f("",!0),e("button",{onClick:s[2]||(s[2]=(...o)=>a.openEditModal&&a.openEditModal(...o))},"Uppdatera profil"),t.showEditModal?(r(),n("div",T,[e("div",U,[e("span",{class:"close",onClick:s[3]||(s[3]=(...o)=>a.closeEditModal&&a.closeEditModal(...o))},"×"),b,e("form",{onSubmit:s[8]||(s[8]=p((...o)=>a.saveProfileChanges&&a.saveProfileChanges(...o),["prevent"])),class:"vertical-form"},[e("div",N,[P,m(e("input",{type:"text",id:"firstName","onUpdate:modelValue":s[4]||(s[4]=o=>t.profileData.firstName=o)},null,512),[[u,t.profileData.firstName]])]),e("div",C,[S,m(e("input",{type:"text",id:"lastName","onUpdate:modelValue":s[5]||(s[5]=o=>t.profileData.lastName=o)},null,512),[[u,t.profileData.lastName]])]),e("div",V,[x,m(e("input",{type:"email",id:"email","onUpdate:modelValue":s[6]||(s[6]=o=>t.profileData.email=o)},null,512),[[u,t.profileData.email]])]),e("div",I,[B,m(e("input",{type:"password",id:"password","onUpdate:modelValue":s[7]||(s[7]=o=>t.profileData.password=o)},null,512),[[u,t.profileData.password]])]),e("div",j,[F,t.successMessage?(r(),n("div",A,d(t.successMessage),1)):f("",!0),t.errorMessage?(r(),n("div",L,d(t.errorMessage),1)):f("",!0)])],32)])])):f("",!0),e("button",{class:"delete",onClick:s[9]||(s[9]=(...o)=>a.confirmDeleteProfile&&a.confirmDeleteProfile(...o))},"Radera mitt konto"),t.showDeleteModal?(r(),n("div",J,[e("div",O,[e("span",{class:"close",onClick:s[10]||(s[10]=(...o)=>a.closeModal&&a.closeModal(...o))},"×"),R,m(e("input",{type:"email","onUpdate:modelValue":s[11]||(s[11]=o=>t.emailToDelete=o)},null,512),[[u,t.emailToDelete]]),e("button",{onClick:s[12]||(s[12]=(...o)=>a.deleteProfile&&a.deleteProfile(...o))},"Bekräfta"),t.successMessage?(r(),n("div",q,d(t.successMessage),1)):f("",!0),t.errorMessage?(r(),n("div",z,d(t.errorMessage),1)):f("",!0)])])):f("",!0)],32)}const W=h(M,[["render",G],["__scopeId","data-v-40692a67"]]);export{W as default};
