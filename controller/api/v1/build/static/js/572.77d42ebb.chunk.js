"use strict";(self.webpackChunkcornerstone_issuer=self.webpackChunkcornerstone_issuer||[]).push([[572],{9055:function(e,n,r){var i=r(4554),t=r(184);n.Z=function(e){var n=e.alt,r=e.children,o=e.component,a=e.src,s=e.sx;return(0,t.jsx)(i.Z,{alt:n,component:o,src:a,sx:s,children:r})}},816:function(e,n,r){var i=r(439),t=r(184);n.Z=function(e){var n=e.children,r=e.color,o=e.disabled,a=e.endIcon,s=e.onClick,u=e.size,c=e.startIcon,d=e.sx,l=e.type,_=e.variant;return(0,t.jsx)(i.Z,{color:r,disabled:o,endIcon:a,onClick:s,size:u,sx:d,startIcon:c,type:l,variant:_,children:n})}},5589:function(e,n,r){var i=r(2506),t=r(184);n.Z=function(e){var n=e.children;return(0,t.jsx)(i.l0,{children:n})}},8425:function(e,n,r){var i=r(2506),t=r(184);n.Z=function(e){var n=e.children,r=e.initialValues,o=e.onSubmit,a=e.validate;return(0,t.jsx)(i.J9,{initialValues:r,onSubmit:o,validate:a,children:n})}},4695:function(e,n,r){var i=r(1413),t=r(3006),o=r(184);n.Z=function(e){var n=e.defaultValue,r=e.disabled,a=e.error,s=e.focused,u=e.fullWidth,c=e.helperText,d=e.id,l=e.InputLabelProps,_=e.label,m=e.name,f=e.onChange,h=e.props,v=e.required,b=e.sx,x=e.type,S=e.value;return(0,o.jsx)(t.Z,(0,i.Z)({defaultValue:n,disabled:r,error:a,focused:s,fullWidth:u,helperText:c,id:d,InputLabelProps:l,label:_,name:m,onChange:f,required:v,sx:b,type:x,value:S},h))}},9624:function(e,n,r){var i=r(4567),t=r(184);n.Z=function(e){var n=e.align,r=e.children,o=e.color,a=e.sx,s=e.variant;return(0,t.jsx)(i.Z,{align:n,color:o||"#777",sx:a,variant:s,children:r})}},7572:function(e,n,r){r.r(n),r.d(n,{default:function(){return O}});var i=r(4165),t=r(5861),o=r(885),a=r(2791),s=r(4569),u=r.n(s),c=r(9098),d=r(3439),l=r(9045),_=r(6960),m=r(9624),f=r(792),h=r(3044),v=r(4721),b=r(925),x=r(9281),S=r(9055),p=r(816),C=r(8425),E=r(5589),Z=r(4695),T=r(184),g=function(e){var n={};return(0,x.Z)(e.id_number)||(n.id_number="Invalid ZA ID number!"),n},j=function(e){e.connectionId;var n=e.handleClose,r=e.open,s=(0,a.useState)(!1),c=(0,o.Z)(s,2),d=c[0],x=c[1],j=(0,a.useState)(!1),O=(0,o.Z)(j,2),R=O[0],A=O[1],D=(0,a.useState)({}),I=(0,o.Z)(D,2),P=I[0],L=I[1],W=function(){var e=(0,t.Z)((0,i.Z)().mark((function e(n){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x(!0),r="/api/v1/cornerstone/issuer/credential",{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_BASE_URL&&(r={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_BASE_URL+"/cornerstone/issuer/credential"),e.next=8;break;case 6:e.next=10;break;case 8:return e.next=10,_.Am.promise(u().post(r,n).then((function(e){L(e.data),A(!0),_.Am.success("Credential qr code generated!")})).catch((function(e){_.Am.error(e.response.data.msg)})),{pending:"Generating credential qr code..."});case 10:x(!1);case 11:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,T.jsx)(f.Z,{onClose:n,open:r,children:(0,T.jsxs)(S.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",boxShadow:24,backgroundColor:"background.paper",borderRadius:"1rem",p:"3rem 4rem 3rem 3rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"},children:[(0,T.jsx)(h.Z,{sx:{m:1},children:(0,T.jsx)(l.Z,{})}),(0,T.jsx)(m.Z,{variant:"h5",children:"Issue a Cornerstone Credential"}),(0,T.jsx)(v.Z,{}),(0,T.jsx)(C.Z,{initialValues:{email:"",id_number:"",surname:"",forenames:"",gender:"",date_of_birth:"",country_of_birth:""},validate:g,onSubmit:function(e,n){n.resetForm;W(e)},children:function(e){var n=e.values,r=e.handleChange,i=e.touched,t=e.errors;return(0,T.jsxs)(E.Z,{children:[(0,T.jsxs)("div",{children:[(0,T.jsx)(Z.Z,{error:i.id_number&&Boolean(t.id_number),helperText:i.id_number&&t.id_number,id:"id_number",name:"id_number",value:n.id_number,onChange:r,label:"ID Number",sx:{m:"1rem"},required:!0}),(0,T.jsx)(Z.Z,{id:"forenames",name:"forenames",value:n.forenames,onChange:r,label:"Forenames",sx:{m:"1rem"},required:!0})]}),(0,T.jsxs)("div",{children:[(0,T.jsx)(Z.Z,{id:"surname",name:"surname",value:n.surname,onChange:r,label:"Surname",sx:{m:"1rem"},required:!0}),(0,T.jsx)(Z.Z,{id:"gender",name:"gender",value:n.gender=n.id_number.substring(6,7)>4?"Male":"Female",onChange:r,label:"Gender",sx:{m:"1rem"},required:!0,disabled:!0})]}),(0,T.jsxs)("div",{children:[(0,T.jsx)(Z.Z,{id:"date_of_birth",name:"date_of_birth",value:n.date_of_birth=n.id_number.substring(0,1)>2?"19"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6):"20"+n.id_number.substring(0,2)+"-"+n.id_number.substring(2,4)+"-"+n.id_number.substring(4,6),onChange:r,label:"D.O.B",sx:{m:"1rem"},required:!0,disabled:!0}),(0,T.jsx)(Z.Z,{id:"country_of_birth",name:"country_of_birth",value:n.country_of_birth="0"===n.id_number.substring(10,11)?"South Africa":"",onChange:r,label:"Country of Birth",sx:{m:"1rem"},required:!0,disabled:"0"===n.id_number.substring(10,11)})]}),(0,T.jsx)("div",{children:(0,T.jsx)(Z.Z,{id:"email",name:"email",value:n.email,onChange:r,label:"Email",sx:{m:"1rem"},required:!0})}),(0,T.jsx)("div",{children:(0,T.jsx)(p.Z,{variant:"contained",type:"submit",sx:{color:"#fff",m:"1rem"},disabled:d,children:"Send"})})]})}}),R?(0,T.jsx)(b.Z,{value:P.credential}):""]})})},O=function(){var e=(0,a.useState)([]),n=(0,o.Z)(e,2),r=n[0],s=n[1],f=(0,a.useState)(!1),h=(0,o.Z)(f,2),v=h[0],b=h[1],x=(0,a.useState)(""),S=(0,o.Z)(x,2),p=S[0],C=S[1];(0,a.useEffect)((function(){var e="/api/v1/cornerstone/issuer/connections";({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).API_BASE_URL&&(e={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_BASE_URL+"/cornerstone/issuer/connections"),u().get(e+"?state=active").then((function(e){s(e.data)})).catch((function(e){return console.log(e)}))}),[]);var E=function(){var e=(0,t.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="/api/v1/cornerstone/issuer/connections",{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_BASE_URL&&(n={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_BASE_URL+"/cornerstone/issuer/connections"),e.next=7;break;case 5:e.next=9;break;case 7:return e.next=9,_.Am.promise(u().get(n+"?state=active").then((function(e){s(e.data),_.Am.success("Refreshed connections!")})).catch((function(e){return console.log(e)})),{pending:"Refreshing..."});case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=(0,T.jsx)(j,{connectionId:p,handleClose:function(){return b(!1)},open:v});return(0,T.jsxs)("div",{style:{margin:"2rem"},children:[(0,T.jsx)(c.ZP,{style:{padding:"1rem"},title:(0,T.jsx)(m.Z,{variant:"h5",sx:{textDecoration:"underline"},children:"Connections"}),data:r,columns:[{title:(0,T.jsx)(m.Z,{variant:"h6",children:"Name"}),field:"their_label"},{title:(0,T.jsx)(m.Z,{variant:"h6",children:"Connected On"}),field:"created_at",type:"datetime"},{title:(0,T.jsx)(m.Z,{variant:"h6",children:"Connection ID"}),field:"connection_id"},{title:(0,T.jsx)(m.Z,{variant:"h6",children:"Connection State"}),field:"state"}],actions:[{icon:function(){return(0,T.jsx)(d.Z,{})},tooltip:"Refresh connections",isFreeAction:!0,onClick:function(){return E()}},function(e){return{icon:function(){return(0,T.jsx)(l.Z,{})},tooltip:"Issue Credential",onClick:function(){b(!0),C(e.connection_id)}}}],options:{actionsColumnIndex:-1}}),Z]})}}}]);
//# sourceMappingURL=572.77d42ebb.chunk.js.map