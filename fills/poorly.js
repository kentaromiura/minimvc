"use strict";!function(e){/*! (c) 2017 Andrea Giammarchi @WebReflection, (ISC) */
    e.Map=e.Map||function(){var e=void 0,t=void 0,n=void 0,r=function(){t=[],n=[]},u=function(n){return-1<(e=t.indexOf(n))};return r(),{get size(){return t.length},has:u,clear:r,get:function(e){return n[t.indexOf(e)]},keys:function(){return t.slice()},values:function(){return n.slice()},entries:function(){return t.map(function(e,t){return[e,n[t]]})},delete:function(r){return u(r)&&t.splice(e,1)&&!!n.splice(e,1)},forEach:function(e,r){var u=this;n.forEach(function(n,i){return e.call(r,n,t[i],u)})},set:function(r,i){return u(r)?n[e]=i:n[t.push(r)-1]=i,this}}},e.Set=e.Set||function(){var t=new e.Map,n=t.set;return delete t.get,delete t.set,t.add=function(e){return n.call(t,e,e)},t};var t=0,n={}.hasOwnProperty;e.WeakMap=e.WeakMap||function(){var e="__"+[t++,Math.random()],r=function(t){return n.call(t,e)};return{has:r,get:function(t){return t[e]},delete:function(t){return r(t)&&delete t[e]},set:function(t,n){return Object.defineProperty(t,e,{configurable:!0,value:n}),this}}},e.WeakSet=e.WeakSet||function(){var t=new e.WeakMap;return{has:function(e){return!0===t.get(e)},delete:t.delete,add:function(e){return t.set(e,!0),this}}}}(new Function('return this')());