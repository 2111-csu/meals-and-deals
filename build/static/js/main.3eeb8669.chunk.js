(this.webpackJsonpstarting_code=this.webpackJsonpstarting_code||[]).push([[0],{29:function(e,t,a){e.exports=a(59)},52:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(27),l=a.n(c),o=a(6),s=a(3),u=a(2),m=a(1),i=a.n(m),d=a(4),p=a(13),E=a.n(p),f=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_API_URL,g=void 0===f?"https://mealanddeals.herokuapp.com/api":f,h=function(){var e=Object(d.a)(i.a.mark((function e(t){var a,r,n,c,l,o,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.url,r=t.method,n=void 0===r?"GET":r,c=t.token,l=t.body,e.prev=1,o={method:n.toUpperCase(),headers:{"Content-Type":"application/json"},data:l},c&&(o.headers.Authorization="Bearer ".concat(c)),console.log(a),console.log(o),e.next=8,E()(g+a,o);case 8:return s=e.sent,e.abrupt("return",s.data);case 12:e.prev=12,e.t0=e.catch(1),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}();function b(e,t){return v.apply(this,arguments)}function v(){return(v=Object(d.a)(i.a.mark((function e(t,a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h({url:"/orders/cart",body:t,token:a});case 3:return r=e.sent,e.abrupt("return",r);case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function O(){return k.apply(this,arguments)}function k(){return(k=Object(d.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.get("/api/orders");case 3:return t=e.sent,a=t.data,e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}a(52);var j=function(){var e=Object(r.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],l=Object(r.useState)([]),m=Object(s.a)(l,2),i=m[0],d=m[1],p=Object(r.useState)({}),E=Object(s.a)(p,2),f=E[0],g=E[1],h=Object(r.useState)(""),b=Object(s.a)(h,2),v=b[0],k=b[1],j=Object(r.useState)(""),N=Object(s.a)(j,2),S=N[0],y=N[1],_=Object(r.useState)({}),R=Object(s.a)(_,2),D=R[0],J=R[1],Y=Object(r.useState)({}),q=Object(s.a)(Y,2),B=q[0],M=q[1],W=Object(r.useState)(Number),H=Object(s.a)(W,2),K=H[0],V=H[1],G=Object(r.useState)([]),z=Object(s.a)(G,2),$=z[0],Q=(z[1],Object(r.useState)([])),X=Object(s.a)(Q,2),Z=X[0],ee=X[1],te=Object(u.e)();Object(r.useEffect)((function(){var e=localStorage.getItem("token"),t=localStorage.getItem("username"),a=localStorage.getItem("userId"),r=localStorage.getItem("user"),n=JSON.parse(r),c=localStorage.getItem("cart"),l=JSON.parse(c);e&&k(e),t&&y(t),a&&V(a),n&&g(n),l&&J(l)}),[]);var ae={products:i,setProducts:d,token:v,setToken:k,userName:S,setUserName:y,userId:K,setUserId:V,user:f,setUser:g,cart:D,setCart:J,setMessage:c,message:a,getOrdersByUser:O,orders:$,localCart:B,setLocalCart:M,setCartItems:ee,cartItems:Z};return n.a.createElement(n.a.Fragment,null,n.a.createElement("header",null,n.a.createElement("div",{className:"app-container"}),n.a.createElement(o.b,{to:"/products",className:"nav-link"},"Meals"),n.a.createElement(o.b,{to:"/",className:"nav-link"},"Home"),n.a.createElement(o.b,{to:"/cart",className:"nav-link"},"Your Cart"),v?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.b,{to:"/account",className:"nav-link"},"Account"),n.a.createElement("button",{className:"logout",onClick:function(){localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("userId"),localStorage.removeItem("user"),localStorage.removeItem("cart"),y(""),V(""),k(""),g({}),J({}),ee([]),te.push("/")}},"Logout")," "):n.a.createElement(o.b,{to:"/account/login",className:"nav-link"},"Sign In")),n.a.createElement("main",null,n.a.createElement(u.a,{exact:!0,path:"/"},n.a.createElement(w,ae)),n.a.createElement(u.a,{exact:!0,path:"/products"},n.a.createElement(I,ae)),n.a.createElement(u.a,{exact:!0,path:"/products/:productId"},n.a.createElement(x,ae)),n.a.createElement(u.a,{exact:!0,path:"/account/:method"},n.a.createElement(C,ae)),n.a.createElement(u.a,{exact:!0,path:"/account"},n.a.createElement(P,ae)),n.a.createElement(u.a,{exact:!0,path:"/cart"},n.a.createElement(F,ae)),n.a.createElement(u.a,{exact:!0,path:"/users"},n.a.createElement(L,ae)),n.a.createElement(u.a,{exact:!0,path:"/cart/checkout"},n.a.createElement(T,ae)),n.a.createElement(u.a,{exact:!0,path:"/orders"},n.a.createElement(U,ae)),n.a.createElement(u.a,{exact:!0,path:"/orders/:orderId"},n.a.createElement(A,{orders:$}))))},N="",S=[1,2,3,4,5,6,7,8,9];console.log("order id",N);var y={products:[]},I=function(e){var t=e.products,a=(e.getProducts,e.setProducts),c=e.token,l=e.cart,u=e.user,m=e.setCart,p=e.setLocalCart,E=e.localCart;N="";var f=Object(r.useState)("1"),g=Object(s.a)(f,2),v=g[0],O=g[1];console.log("cart",l);var k=function(){var e=Object(d.a)(i.a.mark((function e(t){var a,r,n,o,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.id||(t.orderProductsId=t.id,t.quantity=v,y.products.push(t),console.log("newobj",y),p([y]),localStorage.setItem("cart",JSON.stringify(y)),console.log("local cart",E)),!u.id){e.next=28;break}if(l[0]&&(a=Object(s.a)(l,1),(r=a[0])&&(N=r.id)),""!==N){e.next=14;break}return e.prev=4,e.next=7,h({url:"/orders",method:"POST",body:{status:"created",userId:u.id,datePlaced:"04 / 22 / 2022"},token:c});case 7:(n=e.sent)&&(N=n.id),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),alert(e.t0);case 14:return e.prev=14,e.next=17,h({url:"/orders/".concat(N,"/products"),method:"POST",body:{productId:t.id,price:t.price,quantity:v},token:c});case 17:return o=e.sent,e.next=20,b(u,c);case 20:return(d=e.sent)&&(console.log("new",d),m(d),O(1)),e.abrupt("return",o);case 25:e.prev=25,e.t1=e.catch(14),alert(e.t1);case 28:case"end":return e.stop()}}),e,null,[[4,11],[14,25]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){(function(){var e=Object(d.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/products"});case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n.a.createElement(n.a.Fragment,null,t.map((function(e){return n.a.createElement("div",{className:"singleProduct",key:e.id},n.a.createElement(o.b,{to:"/products/".concat(e.id)},n.a.createElement("h2",null,e.name,"(",e.price,")")),n.a.createElement("p",null,e.description),n.a.createElement("img",{className:"productImage",src:e.imageURL,alt:"Product"}),n.a.createElement("select",{onChange:function(e){return O(e.target.value)}},S.map((function(e){return n.a.createElement("option",{key:e,value:e},e)}))),n.a.createElement("button",{key:e.id,onClick:function(){return k(e)}},"Add to Cart"))})))},x=function(e){var t=e.products,a=Object(u.f)().productId,r=t.filter((function(e){return+e.id===+a}))[0];return r?n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"singleProduct",key:r.id},n.a.createElement("h2",null,r.name,"(",r.price,")"),n.a.createElement("p",null,r.description),n.a.createElement("img",{className:"productImage",src:r.imageURL,alt:"Product"}),n.a.createElement("button",null,"Add to Cart"))):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,"Product Not Found"))},C=function(e){var t=e.setToken,a=e.setUserName,c=e.setUserId,l=e.setUser,m=e.setCartItems,p=(e.token,Object(r.useState)("")),E=Object(s.a)(p,2),f=E[0],g=E[1],b=Object(r.useState)(""),v=Object(s.a)(b,2),O=v[0],k=v[1],j=Object(r.useState)(""),N=Object(s.a)(j,2),S=N[0],y=N[1],I=Object(r.useState)(""),x=Object(s.a)(I,2),C=x[0],w=x[1],P=Object(r.useState)(""),F=Object(s.a)(P,2),L=F[0],T=F[1],U=Object(r.useState)(""),A=Object(s.a)(U,2),_=A[0],R=A[1],D=Object(r.useState)(""),J=Object(s.a)(D,2),Y=J[0],q=J[1],B=Object(u.f)(),M=Object(u.e)();return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"form-container"},n.a.createElement("div",{className:"login-header"},"register"===B.method?n.a.createElement("h3",{className:"header"},"Register a New Account"):n.a.createElement("h3",{className:"header"},"Login To Your Account")),n.a.createElement("form",{className:"login-form",onSubmit:function(){var e=Object(d.a)(i.a.mark((function e(r){var n,o,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,h({url:"/users/".concat(B.method),method:"POST",body:{firstName:f,lastName:O,email:S,username:C,password:L}});case 4:n=e.sent,console.log(n),n.error&&q(n.error),n.token&&(o=n.token,s=n.user,t(o),l(s),localStorage.setItem("token",o),console.log(s),localStorage.setItem("user",JSON.stringify(s)),s&&(a(s.username),localStorage.setItem("username",s.username),c(s.id),localStorage.setItem("userId",s.id),w(""),T(""),m([]),M.push("/"))),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()},"register"===B.method?n.a.createElement(n.a.Fragment,null,n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"First Name "),n.a.createElement("input",{className:"input-field",type:"text",name:"First Name",onChange:function(e){return g(e.target.value)}})),n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"Last Name "),n.a.createElement("input",{className:"input-field",type:"text",name:"Last Name",onChange:function(e){return k(e.target.value)}})),n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"Email "),n.a.createElement("input",{className:"input-field",type:"text",name:"Email",onChange:function(e){return y(e.target.value)}}))):null,n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"Username "),n.a.createElement("input",{className:"input-field",type:"text",name:"Login Name",onChange:function(e){return w(e.target.value)}})),n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"Password "),n.a.createElement("input",{className:"input-field",type:"password",name:"Password",placeholder:" (min length 8 chars)",onChange:function(e){return T(e.target.value)}})),"register"===B.method?n.a.createElement("fieldset",{className:"input-fieldset"},n.a.createElement("label",null,"Verify Password"),n.a.createElement("input",{className:"input-field",type:"password",name:"Verify Password",placeholder:" (re-enter your password)",onChange:function(e){return R(e.target.value)}})):null,"register"===B.method?n.a.createElement("button",{className:"login-button",type:"submit",disabled:!L||!C||L.length<8||L!==_},"Register"):n.a.createElement("button",{className:"login-button",type:"submit",disabled:!L||!C||L.length<8},"Login"),"register"===B.method&&L!==_&&n.a.createElement("span",{className:"password-alert"},"Passwords must match!"),"register"===B.method&&L.length<8&&n.a.createElement("span",{className:"password-alert"},"(Passwords must contain at least 8 characters)"),Y?n.a.createElement("span",null,Y):null,n.a.createElement("hr",null),"register"===B.method?n.a.createElement(n.a.Fragment,null,n.a.createElement("span",null,"Already have an account? "),n.a.createElement(o.b,{to:"/account/login",className:"login-link"},"Click here to log in!")):n.a.createElement(n.a.Fragment,null,n.a.createElement("hr",null),n.a.createElement("span",null,"Don't have an account? "),n.a.createElement(o.b,{to:"/account/register",className:"login-link"},"Click here to register!")))))},w=function(e){var t=e.userName,a=e.message;return console.log(a),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement("h1",null,"Welcome to Meals and Deals!"),""===t?n.a.createElement("h2",null,"You are not Signed in"):n.a.createElement("h2",null,"You are Signed in as ",t)),n.a.createElement("h2",null,a))},P=function(e){var t=e.user;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement("h1",null,"Account Info"),n.a.createElement("h1",null,t.username),n.a.createElement("h2",null,t.firstname," ",t.lastname),n.a.createElement("h2",null,t.email)))},F=function(e){var t=e.token,a=e.user,c=e.setCart,l=(e.cart,e.setCartItems),o=e.cartItems,s=function(){var e=Object(d.a)(i.a.mark((function e(){var r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/orders/cart",body:a,token:t});case 2:r=e.sent,n=r&&r[0],c(r),n&&(console.log("yeee"),l(n.products));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){l([]),t&&function(){var e=Object(d.a)(i.a.mark((function e(){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/orders/cart",token:t});case 2:a=e.sent,r&&c(r),a&&c(a),(n=a&&a[0])&&l(n.products);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();var e=localStorage.getItem("cart"),r=JSON.parse(e);!a.id&&r&&l(r.products)}),[t]);var m=Object(u.e)(),p=function(){var e=Object(d.a)(i.a.mark((function e(r){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.id){e.next=6;break}return e.next=3,h({url:"/order_products/".concat(r),method:"DELETE",token:t});case 3:return n=e.sent,s(),e.abrupt("return",n);case 6:a.id||(localStorage.removeItem("cart"),l([]));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return console.log("cartitems",o),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,"Your Cart:",o.map((function(e){return n.a.createElement("div",{className:"cartProduct",key:e.orderProductsId},n.a.createElement("h2",null,e.name,"(",e.price,")x",e.quantity,n.a.createElement("button",{key:e.orderProductsId,onClick:function(){return p(e.orderProductsId)}},"Remove Item")))})),n.a.createElement("button",{onClick:function(){return m.push("/cart/checkout")}},"Go To Checkout")))},L=function(e){e.user;var t=e.setUser;return Object(r.useEffect)((function(){(function(){var e=Object(d.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/users"});case 2:a=e.sent,t(a);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",null,"Users Listings"))},T=function(e){var t=e.token,a=e.user,r=(e.setCart,e.cart),c=(e.setMessage,Object(u.e)()),l=function(){var e=Object(d.a)(i.a.mark((function e(a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/orders/".concat(a),method:"POST",token:t});case 2:return r=e.sent,console.log(r),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(d.a)(i.a.mark((function e(a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({url:"/orders/".concat(a),method:"DELETE",token:t});case 2:return r=e.sent,console.log(r),c.push("/"),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=r[0],m=[],p={};return console.log("cart",r),console.log(s),s&&(m=s.products,p=m[0],console.log("cartITems",m)),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,"Checkout",n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement("h1",null,a.username),n.a.createElement("h2",null,a.firstname," ",a.lastname),n.a.createElement("h2",null,a.email))),"Your Cart:",m.map((function(e){return n.a.createElement("div",{className:"cartProduct",key:e.orderProductsId},n.a.createElement("h2",null,e.name,"($",e.price,")x",e.quantity))})),n.a.createElement("button",{onClick:function(){return o(p.orderId)}},"Cancel Order"),n.a.createElement("button",{onClick:function(){return c.push("/cart")}},"Edit Order"),n.a.createElement("button",{onClick:function(){return l(p.orderId)}},"Complete Order")))},U=function(e){var t=e.user,a=e.orders;return console.log(a,"fetched"),n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",null,"Admin Log of Orders"),n.a.createElement(n.a.Fragment,null),a.map((function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"adminOrderLog",key:e.id},!0===t.isAdmin?n.a.createElement("h2",null,e.id," ",e.status," ",n.a.createElement("br",null)," by ",e.creatorName," ",n.a.createElement("br",null),"on ",e.datePlaced,e.products.map((function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"productsOrders"},e.name," ",e.price,e.description,n.a.createElement("br",null),n.a.createElement("img",{className:"orderImage",src:e.imageURL,alt:"Product"})))})),n.a.createElement(o.b,{to:"/orders/".concat(e.id)},"See Details")):null))})),n.a.createElement(n.a.Fragment,null," SEE ORDERS "))},A=function(e){var t=e.orders,a=Object(u.f)().orderId,r=t.filter((function(e){return+e.id===+a}));console.log(r);var c=r[0];return c?n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",null,"Order ",c.id),n.a.createElement("p",null,c.status," on ",c.datePlaced)):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,"Order Loading..."))};a(58);l.a.render(n.a.createElement(o.a,null,n.a.createElement(j,null)),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.3eeb8669.chunk.js.map