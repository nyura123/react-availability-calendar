(this["webpackJsonpreact-availability-calendar-example"]=this["webpackJsonpreact-availability-calendar-example"]||[]).push([[0],{12:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(6),l=a.n(o),i=(a(12),a(2)),s=a(3),c=a(1);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function d(e){function t(e){return e.endDate.getTime()-e.startDate.getTime()}function a(e,t){t=t>0?Math.min(864e5,t):Math.max(-864e5,t);var a=(e=Math.min(864e5,Math.max(0,e)))-t;return a<0?a+864e5:a}function n(e,t){var n=e.map((function(e){return[a(e[0],t)%864e5,a(e[1],t)%864e5]})),r=n.map((function(e,t){return e[1]<e[0]?t:-1})).filter((function(e){return e>=0})),o=Array.isArray(r),l=0;for(r=o?r:r[Symbol.iterator]();;){var i;if(o){if(l>=r.length)break;i=r[l++]}else{if((l=r.next()).done)break;i=l.value}var s=i,c=n[s];n[s]=[-1,-1],n.push([c[0],864e5]),n.push([0,c[1]])}var u=n.filter((function(e){return e[0]>=0}));return u.sort((function(e,t){return e[0]-t[0]})),u}function r(e,t){if(!t)return 0;var a=new Date(e),n=new Date(a.toLocaleString("en-US",{timeZone:t}));return 36e5*Math.floor((n.getTime()-a.getTime())/36e5+.5)}function o(e,t){return e&&t&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function l(e,t,a,o,l){for(var i=[].concat(a),s=new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),c=new Date(l.getFullYear(),l.getMonth(),l.getDate()).getTime(),u=s;u<=c;u+=864e5){var d=n(e,r(u,t)),m=Array.isArray(d),f=0;for(d=m?d:d[Symbol.iterator]();;){var v;if(m){if(f>=d.length)break;v=d[f++]}else{if((f=d.next()).done)break;v=f.value}var h=v;i.push({startDate:new Date(u+h[0]),endDate:new Date(u+h[1])})}i.push({startDate:new Date(u+864e5-1),endDate:new Date(u+864e5)})}return i}return{msInHour:36e5,datesEqual:o,formatAsMonth:function(t){return e(t).format("MMM YYYY")},sameMonth:function(t,a){return o(e(t).startOf("month").toDate(),e(a).startOf("month").toDate())},formatAsDateWithTime:function(t){return e(t).format("ddd, MMM Do h:mma")},formatAsDateJustTime:function(t){return e(t).format("h:mma")},formatAsDate:function(t){return e(t).format("ddd, MMM Do YYYY")},shouldHideWeek:function(t,a,n){return t&&(r=t,l=a[0],!o(e(r).startOf("week").toDate(),e(l).startOf("week").toDate()))&&n.length>0;var r,l},availByIndex:function(e,t){return(e||[]).map((function(e){return{hasAvail:t.some((function(t){return o(t.startDate,e)}))}}))},addBlockOutBookings:l,availabilitiesFromBookings:function(e,t,a,n,r,o){var i,s=Math.max((i=n.getTime(),36e5*Math.floor(i/36e5)+36e5),r.getTime()),c=new Date(s);if(o.getTime()<=c.getTime())return[];var u=[{startDate:c,endDate:o}],d=l(e,t,a,c,o).sort((function(e,t){return e.startDate.getTime()-t.startDate.getTime()})),m=Array.isArray(d),f=0;for(d=m?d:d[Symbol.iterator]();;){var v;if(m){if(f>=d.length)break;v=d[f++]}else{if((f=d.next()).done)break;v=f.value}var h=v,b=u[u.length-1],y=h.startDate.getTime(),g=h.endDate.getTime();if(h.startDate&&h.endDate&&!(y>=g))if(y<b.startDate.getTime())b.startDate=new Date(Math.max(b.startDate.getTime(),g));else if(y<b.endDate.getTime()){var D=b.endDate;b.endDate=new Date(y),g<D.getTime()&&u.push({startDate:new Date(g),endDate:D})}}return u},toStartAndEnd:function(e){var t={startDate:e.start||e[0],endDate:e.end||e[e.length-1]};return t.startDate.getTime()===t.endDate.getTime()&&(t.endDate=new Date(t.endDate.getTime()+864e5)),t},monthRangeForDate:function(t){return{start:e(t).startOf("month").toDate(),end:e(t).endOf("month").toDate()}},monthDaysForDate:function(t){for(var a=e(t).startOf("month"),n=e(t).endOf("month"),r=a.startOf("week"),o=n.endOf("week").diff(r,"days")+1,l=[],i=[],s=r,c=Math.floor(o/7),u=0;u<c;++u){var d=[];l.push(d);for(var m=0;m<7;++m)d.push(s.toDate()),i.push(s.toDate()),s.add(1,"day")}return{weeks:l,days:i}},chunkify:function(e,a,n){var r=[],o=e,l=Array.isArray(o),i=0;for(o=l?o:o[Symbol.iterator]();;){var s;if(l){if(i>=o.length)break;s=o[i++]}else{if((i=o.next()).done)break;s=i.value}for(var c=s,u=c.endDate.getTime(),d=c.startDate.getTime();d<u;d+=n){var m=d,f={startDate:new Date(m),endDate:new Date(Math.min(u,m+a))};t(f)>=a&&r.push(f)}}return r}}}var m={dayClassBase:"rounded-circle",dayClassSelected:"border-primary",dayClassHasAvailability:"border-info",dayClassDefault:"border border-default",slotsContainerStyleShow:{transition:"transform 300ms",transform:"scale(1)"},slotsContainerStyleHide:{transition:"transform 300ms",transform:"scale(0)"},slotContainerCloseClass:"close",slotButtonClass:"btn btn-primary",toolBarStyle:{flexWrap:"nowrap",width:"100%",minHeight:50},toolBarButtonsContainerClass:"border btn-group w-100",toolBarButtonClass:"btn",toolBarLabelClass:"btn btn-link",requestAppointmentLabel:"Request Appointment"},f={format:function(e){throw new Error("not implemented")},startOf:function(e){throw new Error("not implemented")},endOf:function(e){throw new Error("not implemented")},add:function(e,t){throw new Error("not implemented")},diff:function(e,t,a){throw new Error("not implemented")},toDate:function(){throw new Error("not implemented")}},v=r.a.createContext({moment:function(){return f},utils:d((function(){return f})),theme:m}),h=function(){return Object(n.useContext)(v)},b=function(e){var t=e.moment,a=e.theme,o=e.children,l=Object(n.useMemo)((function(){return d(t)}),[t]);return r.a.createElement(v.Provider,{value:{moment:t,utils:l,theme:a}},o)};function y(e,t){return"function"===typeof e?e(t||{}):e}function g(e,t){return"function"===typeof e?e(t||{}):e}function D(e,t,a,n,r,o){return void 0===e?{Root:t.Root,className:g(t.className,a),style:u({},y(t.style,a)),internalProps:t.internalProps}:{Root:e.Root||t.Root,className:g(e.className,a)||g(t.className,a),style:u({},y(t.style,a),{},y(e.style,a)),internalProps:u({},t.internalProps,{},e.internalProps)}}var p={ToolBar:{},ToolBarButton:{},Weekdays:{},Weekday:{},DayCells:{},DayCell:{},Availabilities:{},AvailSlot:{}};var w="PREV",E="NEXT",C="TODAY",M=function(e){var t=e.localizer.messages,a=e.label,n=e.onNavigate,o=e.overrides,l=h().theme,i=function(e,t){return D(e?e.ToolBar:void 0,t,{})}(o,{style:l.toolBarStyle,className:l.toolBarButtonsContainerClass}),s=i.Root,c=i.style,u=i.className;return s?r.a.createElement(s,Object.assign({},{localizer:{messages:t},label:a,onNavigate:n})):r.a.createElement("div",{style:c,className:u,role:"group"},r.a.createElement(k,{theme:l,overrides:o,onClick:function(){return n(C)},message:t.today}),r.a.createElement(k,{theme:l,overrides:o,onClick:function(){return n(w)},message:t.previous}),r.a.createElement(k,{theme:l,overrides:o,onClick:function(){return n(E)},message:t.next}),r.a.createElement("button",{disabled:!0,className:l.toolBarLabelClass,style:{width:110}},r.a.createElement("span",null,a)))};function k(e){var t=e.message,a=e.onClick,n=function(e,t){return D(e?e.ToolBarButton:void 0,t,{})}(e.overrides,{className:e.theme.toolBarButtonClass}),o=n.Root,l=n.style,i=n.internalProps,s=n.className;return void 0!==o?r.a.createElement(o,{message:t,onClicked:a}):r.a.createElement("button",Object.assign({className:s,onClick:a,style:l},i),t)}var O=["S","M","T","W","Th","F","Sa"],S=function(e){var t=e.overrides,a=function(e,t){return D(e?e.Weekdays:void 0,t,{})}(t,{style:{display:"flex",justifyContent:"flex-start",flexWrap:"nowrap",flexDirection:"row"}}),n=a.Root,o=a.style;if(n)return r.a.createElement(n,null);var l=function(e,t){return D(e?e.Weekday:void 0,t,{})}(t,{className:"border border-default",style:{width:50,height:50,marginBottom:10,display:"flex",justifyContent:"center",alignItems:"center"}}),i=l.Root,s=l.className,c=l.style;return r.a.createElement("div",{style:o},O.map((function(e){return i?r.a.createElement(i,{weekday:e}):r.a.createElement("div",{className:s,key:e,style:c},e)})))};function A(e){var t=e.theme,a=e.onAvailabilitySelected,n=e.s,o=e.formatAsDateJustTime,l=function(e,t,a){return D(e?e.AvailSlot:void 0,t,a)}(e.overrides,{className:t.slotButtonClass,style:{minWidth:200}},{date:n.startDate}),i=l.Root,s=l.className,c=l.style;return i?r.a.createElement(i,Object.assign({},{theme:t,onAvailabilitySelected:a,s:n,formatAsDateJustTime:o})):r.a.createElement("div",{style:{marginBottom:10}},r.a.createElement("button",{className:s,disabled:!1,style:c,onClick:function(){return a({startDate:new Date(n.startDate),endDate:new Date(n.endDate)})}},o(new Date(n.startDate))))}var j=function(e){var t=e.viewingDayAvailabilities,a=e.handleUnselect,n=e.onAvailabilitySelected,o=e.show,l=e.slotStepMs,i=e.slotLengthMs,s=e.utils,c=e.theme,u=e.overrides,d=function(e,t){return D(e?e.Availabilities:void 0,t,{})}(u,{style:o?c.slotsContainerStyleShow:c.slotsContainerStyleHide}),m=d.Root,f=d.style;return m?r.a.createElement(m,Object.assign({},{viewingDayAvailabilities:t,handleUnselect:a,onAvailabilitySelected:n,show:o,slotStepMs:l,slotLengthMs:i,utils:s,theme:c})):r.a.createElement("div",{style:f},o&&r.a.createElement("div",{className:"mt-2 mr-1"},r.a.createElement("button",{type:"button",className:c.slotContainerCloseClass,"aria-label":"Close",style:{outline:"none"},onClick:a},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")),r.a.createElement(x,{theme:c,durationMinutes:60,avails:t,onAvailabilitySelected:n,slotLengthMs:i,slotStepMs:l,utils:s,overrides:u}),t.length>7&&r.a.createElement("button",{type:"button",className:c.slotContainerCloseClass,"aria-label":"Close",style:{outline:"none"},onClick:a},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))))},x=function(e){var t=e.avails,a=e.slotLengthMs,o=e.slotStepMs,l=e.onAvailabilitySelected,i=e.theme,s=e.utils,c=e.overrides,u=s.chunkify,d=s.msInHour,m=s.formatAsDate,f=s.formatAsDateJustTime,v=Object(n.useMemo)((function(){return u(t.map((function(e){return{startDate:e.startDate,endDate:e.endDate}})),a||1*d,o||.5*d)}),[t,d,u,a,o]);return r.a.createElement("div",null,r.a.createElement("h4",null,i.requestAppointmentLabel),r.a.createElement("h5",null,t&&t.length>0?m(t[0].startDate):""),v.map((function(e,t){return r.a.createElement(A,Object.assign({key:"b_"+t},{theme:i,onAvailabilitySelected:l,s:e,formatAsDateJustTime:f,overrides:c}))})))},T=function(e){var t=e.date,a=e.shouldDisplay,n=e.dayIndexInWeek,o=e.weekIndexInCalRange,l=e.availsByIndex,i=e.selectedDate,s=e.handleSelected,c=e.moment,d=e.utils,m=e.theme,f=e.overrides,v=7*o+n,h=!!i&&d.datesEqual(t,i),b=l[v].hasAvail,y=function(e,t,a){return D(e?e.DayCell:void 0,t,a)}(f,{className:m.dayClassBase+" "+(i&&d.datesEqual(t,i)?m.dayClassSelected:l[v].hasAvail?m.dayClassHasAvailability:m.dayClassDefault),style:{cursor:"pointer",border:i&&d.datesEqual(t,i)?"4px solid":l[v].hasAvail?"3px solid":"",height:50,width:50,display:"flex",justifyContent:"center",alignItems:"center"}},{date:t,isSelected:h,hasAvail:b}),g=y.Root,p=y.style,w=y.className;if(g)return r.a.createElement(g,Object.assign({},{shouldDisplay:a,date:t,dayIndexInWeek:n,weekIndexInCalRange:o,availsByIndex:l,selectedDate:i,handleSelected:s,moment:c,utils:d,theme:m}));var E=a?p:u({},p,{visibility:"hidden"});return r.a.createElement("div",{className:w,style:E,onClick:function(){return s(t)}},c(t).format("D"))};function N(e){var t=e.week,a=e.date,n=e.selectedDate,o=e.weekIndexInCalRange,l=e.handleSelected,i=e.availsByIndex,s=e.moment,c=e.utils,u=e.theme,d=e.overrides,m=function(e,t){return D(e?e.DayCells:void 0,t,{})}(d,{style:{display:"flex",justifyContent:"flex-start",flexWrap:"nowrap",flexDirection:"row"}}),f=m.Root,v=m.style;return f?r.a.createElement(f,Object.assign({},{date:a,week:t,selectedDate:n,weekIndexInCalRange:o,handleSelected:l,availsByIndex:i,moment:s,utils:c,theme:u})):r.a.createElement("div",{style:v},t.map((function(e,t){return r.a.createElement(T,Object.assign({key:"d_"+t},{shouldDisplay:c.sameMonth(e,a),date:e,selectedDate:n,weekIndexInCalRange:o,dayIndexInWeek:t,handleSelected:l,availsByIndex:i,moment:s,utils:c,theme:u,overrides:d}))})))}var B=function(e){var t=e.availabilities,a=e.onAvailabilitySelected,o=e.onDaySelected,l=e.slotLengthMs,i=e.slotStepMs,s=e.date,c=e.style,d=e.overrides,m=h(),f=m.moment,v=m.theme,b=m.utils,y=Object(n.useState)(null),g=y[0],D=y[1];Object(n.useEffect)((function(){D(null),o&&o(null)}),[s]);var p=function(e){g&&b.datesEqual(e,g)?(D(null),o&&o(null)):(D(e),o&&o(e))},w=Object(n.useMemo)((function(){return b.monthDaysForDate(s)}),[s,b]),E=w.days,C=w.weeks,M=Object(n.useMemo)((function(){return b.availByIndex(E,t)}),[E,t,b]),k=Object(n.useMemo)((function(){return null!==g?(t||[]).filter((function(e){var t=e.startDate;return b.datesEqual(t,g)})):[]}),[g,t,b]);return r.a.createElement("div",{style:u({minHeight:368},c)},r.a.createElement(S,{overrides:d}),C.map((function(e,t){return b.shouldHideWeek(g,e,k)?null:r.a.createElement(r.a.Fragment,{key:"w_"+t},r.a.createElement(N,Object.assign({},{date:s,week:e,selectedDate:g,weekIndexInCalRange:t,handleSelected:p,availsByIndex:M,moment:f,utils:b,theme:v,overrides:d})))})),r.a.createElement(j,Object.assign({},{show:!!g&&k.length>0,onAvailabilitySelected:a,viewingDayAvailabilities:k,handleUnselect:function(){o&&o(null),D(null)},slotLengthMs:l,slotStepMs:i,utils:b,theme:v,overrides:d})))},I=function(e){var t=e.initialDate,a=e.onAvailabilitySelected,o=e.onDaySelected,l=e.blockOutPeriods,i=e.providerTimeZone,s=e.bookings,c=e.avails,u=e.onCalRangeChange,d=e.slotLengthMs,m=e.slotStepMs,f=e.overrides,v=h(),b=v.moment,y=v.utils,g=Object(n.useState)(t||new Date)[0],D=Object(n.useState)(y.monthRangeForDate(g)),p=D[0],w=D[1],E=Object(n.useState)(g),C=E[0],k=E[1],O=Object(n.useRef)(null);Object(n.useEffect)((function(){O.current!==p&&(u&&u(p),O.current=p)}),[p,u]);var S=Object(n.useMemo)((function(){if(c)return c;var e=y.toStartAndEnd(p);return y.availabilitiesFromBookings(l||[],i,s,new Date,e.startDate,e.endDate)}),[c,s,i,p,g,l,y]);return r.a.createElement("div",null,r.a.createElement(M,{onNavigate:function(e){if("TODAY"===e){var t=new Date;return k(t),void w(y.monthRangeForDate(t))}if("NEXT"===e||"PREV"===e){var a=b(C).add("NEXT"===e?1:-1,"month").toDate();k(a),w(y.monthRangeForDate(a))}},label:y.formatAsMonth(C),localizer:{messages:{today:"Today",previous:"Previous",next:"Next"}},overrides:f}),r.a.createElement(B,{availabilities:S,date:C,onAvailabilitySelected:a,onDaySelected:o,slotLengthMs:d,slotStepMs:m,overrides:f}))},R=function(e){var t=e.moment,a=e.theme,n=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["moment","theme"]);return r.a.createElement(b,{moment:t,theme:a?u({},m,{},a):m},r.a.createElement(I,Object.assign({},n)))},W=a(4),Y=a.n(W),F=(a(14),a(15),function(e){var t=e.calMode,a=e.setCalMode;return r.a.createElement("div",{className:"m-1 btn-group"},r.a.createElement(L,Object.assign({label:"Morning",calModeTarget:"morning"},{setCalMode:a,calMode:t})),r.a.createElement(L,Object.assign({label:"Noon",calModeTarget:"noon"},{setCalMode:a,calMode:t})),r.a.createElement(L,Object.assign({label:"Evening",calModeTarget:"evening"},{setCalMode:a,calMode:t})),r.a.createElement(L,Object.assign({label:"All Day",calModeTarget:"allDay"},{setCalMode:a,calMode:t})))}),L=function(e){var t=e.calMode,a=e.setCalMode,n=e.calModeTarget,o=e.label;return r.a.createElement("button",{onClick:function(){return a(n)},className:q(t,n)},o)},P={position:"absolute",transition:"transform 300ms",transform:"scale(1)"},H={position:"absolute",transition:"transform 300ms",transform:"scale(0)"},q=function(e,t){return e===t?"btn btn-sm btn-primary":"btn btn-sm btn-default"},J=[],_=[[0,18e6],[432e5,864e5]],U=[[0,432e5],[612e5,864e5]],z=[[0,612e5]];var X=function(){var e=Object(n.useState)({}),t=Object(c.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(!1),u=Object(c.a)(l,2),d=u[0],m=u[1],f=Object(n.useState)("evening"),v=Object(c.a)(f,2),h=v[0],b=v[1],y=Object(n.useState)(new Date),g=Object(c.a)(y,2),D=g[0],w=g[1],E=Object(n.useState)(1),C=Object(c.a)(E,2),M=C[0],k=C[1],O=Object(n.useState)(null),S=Object(c.a)(O,2),A=S[0],j=S[1],x=function(e){switch(e){case"allDay":return J;case"morning":return _;case"noon":return U;case"evening":return z}}(h),T=[{startDate:new Date(2020,2,1,19),endDate:new Date(2020,2,1,20)},{startDate:new Date(2020,2,1,16,30),endDate:new Date(2020,2,1,17)}],N=Object(n.useMemo)((function(){return Object(s.a)({},p,{ToolBar:{className:"border btn-group",style:{minHeight:void 0}},ToolBarButton:{className:"btn btn-outline-info",style:{outline:"none"}},AvailSlot:{className:function(e){return a[e.date.getTime()]?"btn btn-secondary":"btn btn-primary"}},Weekday:{style:{borderWidth:0,borderStyle:"solid",borderBottomWidth:1,borderRightWidth:1,borderColor:"#dddddd"},className:"none"},DayCell:{style:function(e){return e.isSelected?{transition:"width 200ms, height 200ms",height:60,width:60}:{transition:"width 200ms, height 200ms"}},className:function(e){return e.isSelected?"rounded-circle border-success":e.hasAvail?"rounded-circle border-primary":"rounded-circle border-secondary"}}})}),[a]);return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("div",null,r.a.createElement("a",{href:"https://github.com/nyura123/react-availability-calendar/tree/master/examples/example1"},"Code")),r.a.createElement("div",{style:{maxWidth:350,maxHeight:520,overflowY:"auto"}},r.a.createElement(R,{key:"cal_v"+M,bookings:T,providerTimeZone:"America/New_York",moment:Y.a,initialDate:D,onAvailabilitySelected:function(e){console.log("Availability slot selected!: ",e);var t=e.startDate.getTime(),n=!!a[t];o((function(a){return Object(s.a)({},a,Object(i.a)({},t,n?null:e))}))},onDaySelected:function(e){m(!!e),j(e),e&&w(e)},onCalRangeChange:function(e){return console.log("Calendar range selected (fetch bookings here): ",e)},blockOutPeriods:x,overrides:N})),r.a.createElement("div",{className:"shadow",style:Object(s.a)({width:"100%",maxWidth:350,backgroundColor:"rgba(200, 200, 200, 1)"},d?P:H,{top:0,left:0})},r.a.createElement(F,{calMode:h,setCalMode:b}),r.a.createElement("button",{className:"btn btn-sm btn-outline-secondary",onClick:function(){m(!1),k((function(e){return e+1}))}},"Close"),A&&r.a.createElement("div",{className:"text-primary",style:{float:"right",paddingRight:50}},r.a.createElement("small",null,"Selected:")," ",Y()(A).format("ddd, ll"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,a){e.exports=a(16)}},[[7,1,2]]]);
//# sourceMappingURL=main.defc841e.chunk.js.map