"use strict";(self.webpackChunkvaccine_issuer=self.webpackChunkvaccine_issuer||[]).push([[352],{9055:function(e,n,i){var r=i(4554),a=i(184);n.Z=function(e){var n=e.alt,i=e.children,t=e.component,s=e.src,c=e.sx;return(0,a.jsx)(r.Z,{alt:n,component:t,src:s,sx:c,children:i})}},816:function(e,n,i){var r=i(439),a=i(184);n.Z=function(e){var n=e.children,i=e.color,t=e.disabled,s=e.endIcon,c=e.onClick,d=e.size,l=e.startIcon,u=e.sx,o=e.type,m=e.variant;return(0,a.jsx)(r.Z,{color:i,disabled:t,endIcon:s,onClick:c,size:d,sx:u,startIcon:l,type:o,variant:m,children:n})}},6321:function(e,n,i){var r=i(1889),a=i(184);n.Z=function(e){var n=e.children,i=e.container,t=e.item,s=e.justify,c=e.justifyContent,d=e.md,l=e.spacing,u=e.sx,o=e.xs;return(0,a.jsx)(r.ZP,{container:i,item:t,justify:s,justifyContent:c,md:d,spacing:l,sx:u,xs:o,children:n})}},9624:function(e,n,i){var r=i(4567),a=i(184);n.Z=function(e){var n=e.align,i=e.children,t=e.color,s=e.sx,c=e.variant;return(0,a.jsx)(r.Z,{align:n,color:t||"#777",sx:s,variant:c,children:i})}},5352:function(e,n,i){i.r(n),i.d(n,{default:function(){return M}});var r=i(1413),a=i(885),t=i(2791),s=i(9055),c=i(7621),d=i(9504),l=i(184),u=function(e){var n=e.children,i=e.sx;return(0,l.jsx)(c.Z,{sx:i,elevation:3,children:(0,l.jsx)(d.Z,{children:n})})},o=i(6321),m=i(2101),x=function(e){var n=e.ariaLabel,i=e.children,r=e.onChange,a=e.value;return(0,l.jsx)(m.Z,{"aria-label":n,onChange:r,value:a,children:i})},h=i(5987),v=i(3896),_=["label"],b=function(e){var n=e.label,i=(0,h.Z)(e,_);return(0,l.jsx)(v.Z,(0,r.Z)({label:n},i))},f=i(9624),p=["children","value","index"],j=function(e){var n=e.children,i=e.value,a=e.index,t=(0,h.Z)(e,p);return(0,l.jsx)("div",(0,r.Z)((0,r.Z)({role:"tabpanel",hidden:i!==a,id:"custom-tabpanel-".concat(a),"aria-labelledby":"custom-tab-".concat(a)},t),{},{children:i===a&&(0,l.jsx)(s.Z,{sx:{p:3},children:(0,l.jsx)(f.Z,{children:n})})}))},g=function(e){return{id:"custom-tab-".concat(e),"aria-controls":"custom-tabpanel-".concat(e)}},Z=i(3614),y=i(4165),C=i(5861),q=i(4721),I=i(5363),V=i(4932),S=i(8524),D=i(2626),w=i(5985),A=i(4569),k=i.n(A),P=i(925),T=i(9281),L=i(816),R=i(2506),z=function(e){var n=e.children,i=e.initialValues,r=e.onSubmit,a=e.validate;return(0,l.jsx)(R.J9,{initialValues:i,onSubmit:r,validate:a,children:n})},F=function(e){var n=e.children;return(0,l.jsx)(R.l0,{children:n})},B=i(3006),E=function(e){var n=e.defaultValue,i=e.disabled,a=e.error,t=e.focused,s=e.fullWidth,c=e.helperText,d=e.id,u=e.inputProps,o=e.InputLabelProps,m=e.label,x=e.name,h=e.onChange,v=e.props,_=e.required,b=e.sx,f=e.type,p=e.value;return(0,l.jsx)(B.Z,(0,r.Z)({defaultValue:n,disabled:i,error:a,focused:t,fullWidth:s,helperText:c,id:d,inputProps:u,InputLabelProps:o,label:m,name:x,onChange:h,required:_,sx:b,type:f,value:p},v))},N=i(5867),G=N.R+"/credential",O=function(e){var n={};return(0,T.Z)(e.id_number)||(n.id_number="Invalid ZA ID number!"),n},W=function(){var e=(0,t.useState)(!1),n=(0,a.Z)(e,2),i=n[0],r=n[1],s=(0,t.useState)(!1),c=(0,a.Z)(s,2),d=c[0],u=c[1],o=(0,t.useState)([]),m=(0,a.Z)(o,2),x=m[0],h=m[1],v=function(){var e=(0,C.Z)((0,y.Z)().mark((function e(n){return(0,y.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),e.next=3,w.Am.promise(k().post(G,n).then((function(e){h(e.data),u(!0),w.Am.success("Credential request generated!")})).catch((function(e){w.Am.error(e.response.data.msg)})),{pending:"Generating request..."});case 3:r(!1);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(f.Z,{variant:"h5",children:"Get my Vaccination Credential"}),(0,l.jsx)(q.Z,{}),(0,l.jsx)("div",{style:{marginTop:"1rem"},children:(0,l.jsx)(z,{initialValues:{id_number:"",forenames:"",surname:"",date_of_birth:"",vaccine_type:"",vaccine_dose:"",date_of_vaccination:"",administering_centre:"",country_of_vaccination:"",next_vaccination_date:"",expiry_date:""},validate:O,onSubmit:function(e,n){n.resetForm;v(e)},children:function(e){var n=e.values,r=e.handleChange,a=e.touched,t=e.errors;return(0,l.jsxs)(F,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{error:a.id_number&&Boolean(t.id_number),helperText:a.id_number&&t.id_number,id:"id_number",name:"id_number",value:n.id_number,onChange:r,label:"ID Number",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"forenames",name:"forenames",value:n.forenames,onChange:r,label:"Forenames",sx:{m:"1rem"},required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"surname",name:"surname",value:n.surname,onChange:r,label:"Surname",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"date_of_birth",name:"date_of_birth",value:n.date_of_birth=n.id_number.substring(0,1)>2?"19"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6):"20"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6),onChange:r,label:"D.O.B",sx:{m:"1rem"},required:!0,disabled:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsxs)(I.Z,{sx:{width:"16.5rem"},children:[(0,l.jsx)(V.Z,{id:"vaccine_type",sx:{margin:"1rem 0 0 1rem"},children:"Vaccine Type"}),(0,l.jsxs)(S.Z,{labelId:"vaccine_type",id:"vaccine_type",name:"vaccine_type",value:n.vaccine_type,label:"Vaccine Type",onChange:r,sx:{m:"1rem"},required:!0,children:[(0,l.jsx)(D.Z,{value:"Influenza",children:"Influenza"}),(0,l.jsx)(D.Z,{value:"SARS-CoV-2",children:"SARS-CoV-2"})]})]}),(0,l.jsxs)(I.Z,{sx:{width:"16.5rem"},children:[(0,l.jsx)(V.Z,{id:"vaccine_dose",sx:{margin:"1rem 0 0 1rem"},children:"Vaccine Dose"}),(0,l.jsxs)(S.Z,{labelId:"vaccine_dose",id:"vaccine_dose",name:"vaccine_dose",value:n.vaccine_dose,label:"Vaccine Dose",onChange:r,sx:{m:"1rem"},required:!0,children:[(0,l.jsx)(D.Z,{value:"1st",children:"1st"}),(0,l.jsx)(D.Z,{value:"2nd",children:"2nd"})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"date_of_vaccination",name:"date_of_vaccination",type:"date",InputLabelProps:{shrink:!0},value:n.date_of_vaccination,onChange:r,label:"Date of Vaccination",sx:{m:"1rem",width:"14.5rem"},required:!0}),(0,l.jsx)(E,{id:"administering_centre",name:"administering_centre",value:n.administering_centre,onChange:r,label:"Administering Centre",sx:{m:"1rem"},required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"country_of_vaccination",name:"country_of_vaccination",value:n.country_of_vaccination,onChange:r,label:"Country of Vaccination",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"next_vaccination_date",name:"next_vaccination_date",type:"date",InputLabelProps:{shrink:!0},value:n.next_vaccination_date,onChange:r,label:"Next Vaccination Date",sx:{m:"1rem",width:"14.5rem"},required:!0})]}),(0,l.jsx)("div",{children:(0,l.jsx)(E,{id:"expiry_date",name:"expiry_date",type:"date",InputLabelProps:{shrink:!0},value:n.expiry_date,onChange:r,label:"Expiry Date",sx:{m:"1rem",width:"14.5rem"},required:!0})}),(0,l.jsx)("div",{children:(0,l.jsx)(L.Z,{variant:"contained",type:"submit",sx:{color:"#fff",m:"1rem"},disabled:i,children:"Submit"})})]})}})}),d&&x.credential?(0,l.jsx)(P.Z,{value:x.credential}):""]})},J=N.R+"/credential-email",H=function(e){var n={};return(0,T.Z)(e.id_number)||(n.id_number="Invalid ZA ID number!"),n},K=function(){var e=(0,t.useState)(!1),n=(0,a.Z)(e,2),i=n[0],r=n[1],s=function(){var e=(0,C.Z)((0,y.Z)().mark((function e(n){return(0,y.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),e.next=3,w.Am.promise(k().post(J,n).then((function(e){w.Am.success("Credential request emailed!")})).catch((function(e){w.Am.error(e.response.data.msg)})),{pending:"Emailing request..."});case 3:r(!1);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(f.Z,{variant:"h5",children:"Get my Vaccination Credential"}),(0,l.jsx)(q.Z,{}),(0,l.jsx)("div",{style:{marginTop:"1rem"},children:(0,l.jsx)(z,{initialValues:{id_number:"",forenames:"",surname:"",date_of_birth:"",vaccine_type:"",vaccine_dose:"",date_of_vaccination:"",administering_centre:"",country_of_vaccination:"",next_vaccination_date:"",expiry_date:"",email:""},validate:H,onSubmit:function(e,n){n.resetForm;s(e)},children:function(e){var n=e.values,r=e.handleChange,a=e.touched,t=e.errors;return(0,l.jsxs)(F,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{error:a.id_number&&Boolean(t.id_number),helperText:a.id_number&&t.id_number,id:"id_number",name:"id_number",value:n.id_number,onChange:r,label:"ID Number",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"forenames",name:"forenames",value:n.forenames,onChange:r,label:"Forenames",sx:{m:"1rem"},required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"surname",name:"surname",value:n.surname,onChange:r,label:"Surname",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"date_of_birth",name:"date_of_birth",value:n.date_of_birth=n.id_number.substring(0,1)>2?"19"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6):"20"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6),onChange:r,label:"D.O.B",sx:{m:"1rem"},required:!0,disabled:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsxs)(I.Z,{sx:{width:"16.5rem"},children:[(0,l.jsx)(V.Z,{id:"vaccine_type",sx:{margin:"1rem 0 0 1rem"},children:"Vaccine Type"}),(0,l.jsxs)(S.Z,{labelId:"vaccine_type",id:"vaccine_type",name:"vaccine_type",value:n.vaccine_type,label:"Vaccine Type",onChange:r,sx:{m:"1rem"},required:!0,children:[(0,l.jsx)(D.Z,{value:"Influenza",children:"Influenza"}),(0,l.jsx)(D.Z,{value:"SARS-CoV-2",children:"SARS-CoV-2"})]})]}),(0,l.jsxs)(I.Z,{sx:{width:"16.5rem"},children:[(0,l.jsx)(V.Z,{id:"vaccine_dose",sx:{margin:"1rem 0 0 1rem"},children:"Vaccine Dose"}),(0,l.jsxs)(S.Z,{labelId:"vaccine_dose",id:"vaccine_dose",name:"vaccine_dose",value:n.vaccine_dose,label:"Vaccine Dose",onChange:r,sx:{m:"1rem"},required:!0,children:[(0,l.jsx)(D.Z,{value:"1st",children:"1st"}),(0,l.jsx)(D.Z,{value:"2nd",children:"2nd"})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"date_of_vaccination",name:"date_of_vaccination",type:"date",InputLabelProps:{shrink:!0},value:n.date_of_vaccination,onChange:r,label:"Date of Vaccination",sx:{m:"1rem",width:"14.5rem"},required:!0}),(0,l.jsx)(E,{id:"administering_centre",name:"administering_centre",value:n.administering_centre,onChange:r,label:"Administering Centre",sx:{m:"1rem"},required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"country_of_vaccination",name:"country_of_vaccination",value:n.country_of_vaccination,onChange:r,label:"Country of Vaccination",sx:{m:"1rem"},required:!0}),(0,l.jsx)(E,{id:"next_vaccination_date",name:"next_vaccination_date",type:"date",InputLabelProps:{shrink:!0},value:n.next_vaccination_date,onChange:r,label:"Next Vaccination Date",sx:{m:"1rem",width:"14.5rem"},required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(E,{id:"expiry_date",name:"expiry_date",type:"date",InputLabelProps:{shrink:!0},value:n.expiry_date,onChange:r,label:"Expiry Date",sx:{m:"1rem",width:"14.5rem"},required:!0}),(0,l.jsx)(E,{id:"email",name:"email",type:"email",value:n.email,onChange:r,label:"Email",sx:{m:"1rem"},required:!0})]}),(0,l.jsx)("div",{children:(0,l.jsx)(L.Z,{variant:"contained",type:"submit",sx:{color:"#fff",m:"1rem"},disabled:i,children:"Submit"})})]})}})})]})},M=function(){var e=(0,t.useState)(0),n=(0,a.Z)(e,2),i=n[0],c=n[1];return(0,l.jsxs)(o.Z,{container:!0,justify:"center",spacing:2,sx:{p:"1rem"},children:[(0,l.jsx)(o.Z,{item:!0,xs:12,md:6,children:(0,l.jsxs)(u,{sx:{marginBottom:"5rem"},children:[(0,l.jsx)(s.Z,{children:(0,l.jsxs)(x,{value:i,onChange:function(e,n){c(n)},ariaLabel:"Credential Tabs",children:[(0,l.jsx)(b,(0,r.Z)({label:"Display"},g(0))),(0,l.jsx)(b,(0,r.Z)({label:"Email"},g(1)))]})}),(0,l.jsx)(j,{value:i,index:0,children:(0,l.jsx)(W,{})}),(0,l.jsx)(j,{value:i,index:1,children:(0,l.jsx)(K,{})})]})}),(0,l.jsx)(o.Z,{item:!0,xs:12,md:6,sx:{alignItems:"center",justifyContent:"center",textAlign:"center"},children:(0,l.jsx)(s.Z,{alt:"DI",component:"img",src:Z,sx:{height:"80vh",width:"auto",opacity:.8}})})]})}},5867:function(e,n,i){i.d(n,{R:function(){return r}});var r="/api/v1/vaccine-issuer"},3614:function(e,n,i){e.exports=i.p+"static/media/bg1.e66ee70116d228faf5a5.png"}}]);
//# sourceMappingURL=352.312c139a.chunk.js.map