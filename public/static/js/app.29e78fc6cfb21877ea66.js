webpackJsonp([0],[function(t,e,n){"use strict";var a=n(24),o=n.n(a);e.a=function(){return o.a.production}},,,,function(t,e,n){function a(t){n(12)}var o=n(5)(n(9),n(18),a,"data-v-1e2091f4",null);t.exports=o.exports},,function(t,e,n){"use strict";var a=n(1),o=n(20),r=n(4),s=n.n(r);a.a.use(o.a),e.a=new o.a({mode:"history",routes:[{path:"/",name:"Home",component:s.a}]})},function(t,e,n){function a(t){n(13),n(14)}var o=n(5)(n(8),n(19),a,"data-v-2a1ff92f",null);t.exports=o.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(11),o=(n.n(a),n(4)),r=n.n(o);e.default={components:{home:r.a},data:function(){return{}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(23),o=(n.n(a),n(15)),r=n.n(o);n(0);e.default={created:function(){var t=this,e={};console.log("Base URL: "+this.BASE_URL),fetch(this.BASE_URL+"/lgs/all",e).then(function(e){return t.handleResponse(e)}).then(function(e){t.lgs=e}).catch(function(e){if(console.log(e),!e.body)return t.genericErrorAlert();e.body.then(function(e){if(40==e.code)return e.errors.map(function(e){var n=e.message.split(":::"),a=n[0],o=n[1];t.fields[a].err=!0,t.fields[a].msg=o,t.invalidFields.push(a)})})})},data:function(){return{userData:{lg:"",num:""},lgs:[],showLoader:!1,results:[]}},methods:{modalClicked:function(t){console.log(t),"modal"==t.target.className&&(this.results=[])},save:function(){var t=this;console.log(this.userData);var e={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r.a.stringify(this.userData)};this.toggleButton(),fetch(this.BASE_URL+"/plates/add",e).then(function(e){return t.handleResponse(e)}).then(function(e){t.toggleButton(),t.results=e}).catch(function(e){if(t.toggleButton(),console.log(e),!e.body)return t.genericErrorAlert();e.body.then(function(e){if(40==e.code)return e.errors.map(function(e){var n=e.message.split(":::"),a=n[0],o=n[1];t.fields[a].err=!0,t.fields[a].msg=o,t.invalidFields.push(a)})})})},toggleButton:function(){this.showLoader=!this.showLoader}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=n(7),r=n.n(o),s=n(6),l=n(0);a.a.config.productionTip=!1,a.a.mixin({data:function(){return{baseUrl:"http://plate.local",apiUrl:"http://plate.local",get BASE_URL(){return n.i(l.a)().base_url},get AUTH_URL(){return n.i(l.a)().auth_url}}},methods:{genericErrorAlert:function(){var t="An error occured.";return!1===navigator.onLine?alert(t+" Please check your internet connection."):alert(t+" Please try again.")},handleResponse:function(t,e){var n=t.headers.get("x-refresh-token"),a=t.headers.get("access-token");if(n&&this.$store.commit("saveRefreshToken",n),a&&this.$store.commit("saveAccessToken",a),e&&"function"==typeof e&&e(t),t.ok)return t.json();var o=new Error;o.status=t.status,o.headers=t.headers;try{o.body=t.json()}catch(o){console.log(o)}throw o}}}),new a.a({el:"#app",router:s.a,template:"<App/>",components:{App:r.a}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"s"}},[n("h3",{staticClass:"text-center"},[t._v("\n            Welcome, Please select your local government\n        ")]),t._v(" "),n("form",{staticClass:"form",attrs:{action:"/plate_n",method:"post"},on:{submit:function(e){e.preventDefault(),t.save()}}},[n("div",{staticClass:"col-sm-6 form-group"},[n("label",{staticClass:"sr-only",attrs:{for:"local_g"}},[t._v("\n                    Select your local Government\n                ")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.userData.lg,expression:"userData.lg"}],staticClass:"form-control",attrs:{name:"status"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.userData.lg=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"0"}},[t._v("Select Local government")]),t._v(" "),t._l(t.lgs,function(e){return n("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),t._v(" "),n("div",{staticClass:"col-sm-6 form-group"},[n("label",{staticClass:"sr-only",attrs:{for:"num"}},[t._v("\n                    Enter number of plate numbers\n                ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.num,expression:"userData.num"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Number of Plate numbers"},domProps:{value:t.userData.num},on:{input:function(e){e.target.composing||(t.userData.num=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"col-sm-6 col-sm-offset-3"},[n("button",{staticClass:"form-control btn bblue"},[t.showLoader?n("span",{staticClass:"spinner"}):n("span",{staticClass:"txt"},[t._v("Save")])])])])]),t._v(" "),n("transition",{attrs:{"enter-active-class":"fade-in","leave-active-class":"fade-out"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],staticClass:"modal",on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.modalClicked(e)}}},[n("div",{attrs:{id:"results"}},[n("table",{staticClass:"table table-bordered table-hover"},[n("thead",[n("tr",[n("th",[t._v("Plate numbers")])])]),t._v(" "),n("tbody",t._l(t.results,function(e){return n("tr",[n("td",[t._v(t._s(e))])])}))])])])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("header",{attrs:{id:"site-header"}}),t._v(" "),n("main",{staticClass:"fw"},[n("home")],1)])},staticRenderFns:[]}},,,,,function(t,e){t.exports={development:{auth_url:"http://plate.local",base_url:"http://plate.local"},production:{auth_url:"",base_url:""}}}],[10]);
//# sourceMappingURL=app.29e78fc6cfb21877ea66.js.map