(this["webpackJsonpfront-playground-template"]=this["webpackJsonpfront-playground-template"]||[]).push([[0],{30:function(e,n,t){"use strict";t.r(n);var c=t(2),s=t.n(c),r=t(14),i=t.n(r),a=t(13),o=t(7),l=t(10),u=t.n(l);function d(e,n){var t=function(e,n){return e.workflows[n].jobs.map((function(e){if("string"===typeof e)return{key:e,value:null};var n=Object.keys(e)[0];return{key:n,value:e[n]}}))}(e,n),c=[],s=[],r=0,i=0;return t.forEach((function(e){var n,t,a={id:e.key,label:e.key,position:{x:r,y:i}};null===(n=e.value)||void 0===n||null===(t=n.requires)||void 0===t||t.forEach((function(n){var t={source:n,target:e.key};s.push(t)})),c.push(a),r+=210,i+=50})),{edges:s,nodes:c}}var j,b=t(15),p=t.n(b),h=t(3),v=(j='\nversion: 2.1\nworkflows:\n  tests:\n    jobs:\n      - test\n      - deploy:\n          filters:\n            branches:\n              only: master\n          requires:\n            - test\n  test2:\n    jobs:\n      - build\n      - acceptance_test_1:\n          requires:\n            - build\n      - acceptance_test_2:\n          requires:\n            - build\n      - acceptance_test_3:\n          requires:\n            - build\n      - acceptance_test_4:\n          requires:\n            - build\n      - deploy:\n          requires:\n            - acceptance_test_1\n            - acceptance_test_2\n            - acceptance_test_3\n            - acceptance_test_4\n\ncommands:\n  setup:\n    steps:\n      - checkout\n      - restore_cache:\n          keys:\n            - key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}\n            - key-v2-{{ .Branch }}\n            - key-v2-master\n            - key-v2-\n      - run: yarn install\njobs:\n  test:\n    docker:\n      - image: circleci/node:14.15.5\n    steps:\n      - checkout\n      - setup\n      - save_cache:\n          paths:\n            - node_modules/\n          key: key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}\n      - run: yarn test\n  deploy:\n    docker:\n      - image: circleci/node:14.15.5\n    steps:\n      - add_ssh_keys:\n          fingerprints:\n            - \'fd:81:f7:f7:e7:ff:32:2e:4c:16:90:41:5b:8b:77:19\'\n      - setup\n      - run: |\n          git config user.email "azsisisin@gmail.com"\n          git config user.name "sisisin"\n      - run: yarn deploy\n',u.a.parse(j)),f=function(){var e=s.a.useState(d(v,"test2")),n=Object(o.a)(e,2),t=n[0],c=n[1];return Object(h.jsxs)("div",{children:[Object(h.jsx)(p.a,{width:1600,height:600,json:t,onChange:function(e){c(e)},scale:1,isVertical:!0,shouldNodeFitContent:!0}),Object(h.jsx)("pre",{children:JSON.stringify(v,null,"  ")})]})};var y=t(11),O=t(33),g=function(){var e=Object(y.c)(),n=e.register,t=e.handleSubmit,c=e.control,s=Object(y.b)({control:c,name:"jobs"}),r=s.fields,i=s.append,l=Object(O.a)(),d=Object(o.a)(l,2),j=d[0],b=d[1],p=t((function(e){console.log(u.a.stringify(e)),b(u.a.stringify(e))}));return Object(h.jsxs)("div",{children:[Object(h.jsx)(y.a,Object(a.a)(Object(a.a)({},e),{},{children:Object(h.jsxs)("form",{onSubmit:p,children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"version:"}),Object(h.jsxs)("select",{name:"version",ref:n,placeholder:"version",children:[Object(h.jsx)("option",{value:"2.0",children:"2.0"}),Object(h.jsx)("option",{value:"2.1",children:"2.1"})]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"jobs:"}),r.map((function(e,t){return Object(h.jsx)("div",{children:Object(h.jsx)("input",{name:"jobs[".concat(t,"].value"),ref:n(),defaultValue:e.value})},e.id)})),Object(h.jsx)("input",{type:"button",value:"add",onClick:function(){return i({value:""})}})]}),Object(h.jsxs)("div",{children:[j.error?Object(h.jsxs)("p",{children:["Unable to copy value: ",j.error.message]}):j.value&&Object(h.jsxs)("div",{children:["Copied.",Object(h.jsx)("pre",{children:j.value})]}),Object(h.jsx)("input",{type:"submit"})]})]})})),Object(h.jsx)("hr",{}),Object(h.jsx)(f,{})]})},k=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,34)).then((function(n){var t=n.getCLS,c=n.getFID,s=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),c(e),s(e),r(e),i(e)}))};i.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root")),k()}},[[30,1,2]]]);
//# sourceMappingURL=main.3137faa2.chunk.js.map