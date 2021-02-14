(this["webpackJsonpfront-playground-template"]=this["webpackJsonpfront-playground-template"]||[]).push([[0],{29:function(e,n,t){"use strict";t.r(n);var c=t(2),s=t.n(c),r=t(14),i=t.n(r),o=t(13),a=t(7),l=t(10),j=t.n(l);var d,u=t(3),b=(d='\nversion: 2.1\nworkflows:\n  tests:\n    jobs:\n      - test\n      - deploy:\n          filters:\n            branches:\n              only: master\n          requires:\n            - test\n\ncommands:\n  setup:\n    steps:\n      - checkout\n      - restore_cache:\n          keys:\n            - key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}\n            - key-v2-{{ .Branch }}\n            - key-v2-master\n            - key-v2-\n      - run: yarn install\njobs:\n  test:\n    docker:\n      - image: circleci/node:14.15.5\n    steps:\n      - checkout\n      - setup\n      - save_cache:\n          paths:\n            - node_modules/\n          key: key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}\n      - run: yarn test\n  deploy:\n    docker:\n      - image: circleci/node:14.15.5\n    steps:\n      - add_ssh_keys:\n          fingerprints:\n            - \'fd:81:f7:f7:e7:ff:32:2e:4c:16:90:41:5b:8b:77:19\'\n      - setup\n      - run: |\n          git config user.email "azsisisin@gmail.com"\n          git config user.name "sisisin"\n      - run: yarn deploy\n',j.a.parse(d)),h=function(){return Object(u.jsx)("div",{children:Object(u.jsx)("pre",{children:JSON.stringify(b,null,"  ")})})};var p=t(11),v=t(32),O=function(){var e=Object(p.c)(),n=e.register,t=e.handleSubmit,c=e.control,s=Object(p.b)({control:c,name:"jobs"}),r=s.fields,i=s.append,l=Object(v.a)(),d=Object(a.a)(l,2),b=d[0],O=d[1],f=t((function(e){console.log(j.a.stringify(e)),O(j.a.stringify(e))}));return Object(u.jsxs)("div",{children:[Object(u.jsx)(p.a,Object(o.a)(Object(o.a)({},e),{},{children:Object(u.jsxs)("form",{onSubmit:f,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"version:"}),Object(u.jsxs)("select",{name:"version",ref:n,placeholder:"version",children:[Object(u.jsx)("option",{value:"2.0",children:"2.0"}),Object(u.jsx)("option",{value:"2.1",children:"2.1"})]})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"jobs:"}),r.map((function(e,t){return Object(u.jsx)("div",{children:Object(u.jsx)("input",{name:"jobs[".concat(t,"].value"),ref:n(),defaultValue:e.value})},e.id)})),Object(u.jsx)("input",{type:"button",value:"add",onClick:function(){return i({value:""})}})]}),Object(u.jsxs)("div",{children:[b.error?Object(u.jsxs)("p",{children:["Unable to copy value: ",b.error.message]}):b.value&&Object(u.jsxs)("div",{children:["Copied.",Object(u.jsx)("pre",{children:b.value})]}),Object(u.jsx)("input",{type:"submit"})]})]})})),Object(u.jsx)("hr",{}),Object(u.jsx)(h,{})]})},f=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,33)).then((function(n){var t=n.getCLS,c=n.getFID,s=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),c(e),s(e),r(e),i(e)}))};i.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),f()}},[[29,1,2]]]);
//# sourceMappingURL=main.9d285ec1.chunk.js.map