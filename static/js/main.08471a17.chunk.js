(this["webpackJsonpstore-app"]=this["webpackJsonpstore-app"]||[]).push([[0],{63:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(0),c=n.n(a),i=n(9),s=n.n(i),o=n(29),u=n.n(o),l=n(40),d=n(32),j=n(30),b=n(37),p=n(107),h=n(105),m=n(95),x=n(101),O=n(100),f=n(99),v=n(108),g=n(104),y=n(106),k=function(e){var t=e.name,n=e.size,r=e.type;return fetch("/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,size:n,type:r})})},z=function(){var e=Object(a.useState)(!1),t=Object(b.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(""),s=Object(b.a)(i,2),o=s[0],z=s[1],w=Object(a.useState)({name:"",size:"",type:""}),C=Object(b.a)(w,2),S=C[0],T=C[1],P=function(e){var t=e.name,n=e.value;T((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(d.a)({},t,n?"":"The ".concat(t," is required")))}))},B=function(e){var t=e.name,n=e.size,r=e.type;P({name:"name",value:t}),P({name:"size",value:n}),P({name:"type",value:r})},F=function(e,t,n){return{name:e.value,size:t.value,type:n.value}},I=function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(500!==t.status){e.next=3;break}return z("Unexpected error, Try again"),e.abrupt("return");case 3:if(400!==t.status){e.next=9;break}return e.next=6,t.json();case 6:return n=e.sent,z(n.message),e.abrupt("return");case 9:z("Connection error, please try later");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,a,i,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c(!0),n=t.target.elements,r=n.name,a=n.size,i=n.type,B(F(r,a,i)),e.prev=4,e.next=7,k(F(r,a,i));case 7:if((s=e.sent).ok){e.next=10;break}throw s;case 10:201===s.status&&(t.target.reset(),z("Product stored")),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),I(e.t0);case 16:c(!1);case 17:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t){return e.apply(this,arguments)}}(),D=function(e){var t=e.target,n=t.name,r=t.value;P({name:n,value:r})};return Object(r.jsxs)(m.a,{maxWidth:"sm",children:[Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(f.a,{component:"h1",variant:"h5",align:"center",style:{color:"#d65382",fontSize:35},children:"Create Products"}),Object(r.jsx)(f.a,{component:"p",variant:"body1",children:o}),Object(r.jsx)("br",{}),Object(r.jsx)(O.a,{style:{padding:40,backgroundColor:"rgba(255, 255, 255, 0.45)"},children:Object(r.jsx)("form",{onSubmit:J,noValidate:!0,autoComplete:"off",children:Object(r.jsxs)(x.a,{container:!0,spacing:4,justify:"center",alignItems:"center",children:[Object(r.jsx)(x.a,{item:!0,md:6,sm:12,xs:12,children:Object(r.jsx)(p.a,{variant:"outlined",style:{width:"100%"},label:"Name",id:"name",name:"name",helperText:S.name,error:!!S.name.length,onBlur:D})}),Object(r.jsx)(x.a,{item:!0,md:6,sm:12,xs:12,children:Object(r.jsx)(p.a,{variant:"outlined",style:{width:"100%"},label:"Size",id:"size",name:"size",helperText:S.size,error:!!S.size.length,onBlur:D})}),Object(r.jsxs)(x.a,{item:!0,md:12,sm:12,xs:12,children:[Object(r.jsx)(v.a,{htmlFor:"type",style:{marginBottom:5},children:"Type"}),Object(r.jsxs)(h.a,{variant:"outlined",error:!!S.type.length,style:{width:"100%"},native:!0,inputProps:{id:"type"},onChange:function(){T((function(e){return Object(j.a)(Object(j.a)({},e),{},{type:""})}))},children:[Object(r.jsx)("option",{value:"",children:"seleccione"}),Object(r.jsx)("option",{value:"electronic",children:"electronic"}),Object(r.jsx)("option",{value:"furniture",children:"furniture"}),Object(r.jsx)("option",{value:"clothing",children:"clothing"})]}),!!S.type.length&&Object(r.jsx)(g.a,{error:!!S.type.length,children:S.type})]}),Object(r.jsx)(x.a,{item:!0,children:Object(r.jsx)(y.a,{disabled:n,"aria-disabled":n,type:"submit",style:{backgroundColor:"#d65483",color:"#fff",width:"120px"},children:"Submit"})})]})})})]})},w=n.p+"static/media/fondo.da89ad47.jpg";var C=function(){return Object(r.jsx)("div",{style:{backgroundImage:"url(".concat(w,")"),height:"100vh",backgroundRepeat:"no-repeat",backgroundPosition:"right bottom",backgroundColor:"#e0d28b"},children:Object(r.jsx)(z,{})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,110)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(C,{})}),document.getElementById("root")),S()}},[[63,1,2]]]);
//# sourceMappingURL=main.08471a17.chunk.js.map