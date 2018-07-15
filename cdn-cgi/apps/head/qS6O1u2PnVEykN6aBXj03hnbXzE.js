;window.CloudflareApps=window.Eager=window.CloudflareApps||window.Eager||{};window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId="2d4d5e99a5de4b46a831117551b8b75b";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'
CloudflareApps.internal=CloudflareApps.internal||{}
var errors=[]
CloudflareApps.internal.placementErrors=errors
var errorHashes={}
function noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')
if(errorHashes[hash]){return}
errorHashes[hash]=true
errors.push(options)}
var initializedSelectors={}
var currentInit=false
CloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()
currentInit=true
setTimeout(function(){currentInit=false})}}
function check(){var installs=window.CloudflareApps.installs
for(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}
var selectors=installs[installId].selectors
if(!selectors){continue}
for(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}
var hash=installId+'::'+key
if(initializedSelectors[hash]){continue}
var els=document.querySelectorAll(selectors[key])
if(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})
initializedSelectors[hash]=true
continue}else if(!els||!els.length){continue}
initializedSelectors[hash]=true
els[0].setAttribute('cfapps-selector',selectors[key])}}}
CloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}
CloudflareApps.internal.markSelectors()
var els=document.querySelectorAll('[cfapps-selector="'+selector+'"]')
if(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})
els=document.querySelectorAll(selector)
if(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})
return null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}
return els[0]}
if(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}
return els[0]}}());(function(){'use strict'
var prevEls={}
CloudflareApps.createElement=function createElement(options,prevEl){options=options||{}
CloudflareApps.internal.markSelectors()
try{if(prevEl&&prevEl.parentNode){var replacedEl
if(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}
if(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)
delete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}
var element=document.createElement('cloudflare-app')
var container
if(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}
try{container=CloudflareApps.querySelector(options.selector)}catch(e){}
if(!container){return element}
if(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}
if(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}
switch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)
break}
case'append':container.appendChild(element)
break
case'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}
break
case'before':container.parentNode.insertBefore(element,container)
break
case'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)
prevEls[id]=container}catch(e){}
container.parentNode.replaceChild(element,container)}
return element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'
CloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}
var loc=document.location.host+document.location.pathname
if(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed
loc=url.host+url.path}
for(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')
if(re.test(loc)){return true}}
return false}}());CloudflareApps.installs["XQnamnLgJr4M"]={appId:"lMxPPXVOqmoE",scope:{}};;CloudflareApps.installs["XQnamnLgJr4M"].options={"id":"UA-120197833-1","social":true};;CloudflareApps.installs["8PudKa8c0Drh"]={appId:"VKFmubmShtXS",scope:{}};;CloudflareApps.installs["8PudKa8c0Drh"].options={"account":{"accountId":"KflPQEsPg129","service":"shareaholic","userId":5148809},"siteId":"afb6d3973ff422f5590724a2b24ada3a"};;if(CloudflareApps.matchPage(CloudflareApps.installs['8PudKa8c0Drh'].URLPatterns)){(function(){var options=CloudflareApps.installs['8PudKa8c0Drh'].options;var isPreview="8PudKa8c0Drh"=="preview";if(isPreview){if(!options.siteId){options.siteId='d66d1e26c0f1f07ba8e3709578a8e11a';}}
if(!options.siteId){return;}
var setOptions=function(opts){options=opts;};var shr=document.createElement('script');shr.setAttribute('data-cfasync','false');shr.src='https://apps.shareaholic.com/assets/pub/shareaholic.js';shr.type='text/javascript';shr.async='true';shr.onload=shr.onreadystatechange=function(){var rs=this.readyState;if(rs&&rs!='complete'&&rs!='loaded')return;try{Shareaholic.init(options.siteId);}catch(e){}};var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(shr,s);CloudflareApps.installs['8PudKa8c0Drh'].scope={setOptions:setOptions};})();};if(CloudflareApps.matchPage(CloudflareApps.installs['XQnamnLgJr4M'].URLPatterns)){(function(){var options=CloudflareApps.installs['XQnamnLgJr4M'].options
var id
if(options.account&&options.organization){id=options['web-properties-for-'+options.organization]}else{id=(options.id||'').trim()}
if(!id){console.log('Cloudflare Google Analytics: Disabled. UA-ID not present.')
return}else if("XQnamnLgJr4M"==='preview'){console.log('Cloudflare Google Analytics: Enabled',id)}
function resolveParameter(uri,parameter){if(uri){var parameters=uri.split('#')[0].match(/[^?=&]+=([^&]*)?/g)
for(var i=0,chunk;chunk=parameters[i];++i){if(chunk.indexOf(parameter)===0){return unescape(chunk.split('=')[1])}}}}
window.dataLayer=window.dataLayer||[]
function gtag(){window.dataLayer.push(arguments)}
gtag('js',new Date())
gtag('config',id)
var vendorScript=document.createElement('script')
vendorScript.src='https://www.googletagmanager.com/gtag/js?id='+id
document.head.appendChild(vendorScript)
if(options.social){window.addEventListener('load',function googleAnalyticsSocialTracking(){var FB=window.FB
var twttr=window.twttr
if('FB'in window&&'Event'in FB&&'subscribe'in window.FB.Event){FB.Event.subscribe('edge.create',function(targetUrl){gtag('event','share',{method:'facebook',event_action:'like',content_id:targetUrl})})
FB.Event.subscribe('edge.remove',function(targetUrl){gtag('event','share',{method:'facebook',event_action:'unlike',content_id:targetUrl})})
FB.Event.subscribe('message.send',function(targetUrl){gtag('event','share',{method:'facebook',event_action:'send',content_id:targetUrl})})}
if('twttr'in window&&'events'in twttr&&'bind'in twttr.events){twttr.events.bind('tweet',function(event){if(event){var targetUrl
if(event.target&&event.target.nodeName==='IFRAME'){targetUrl=resolveParameter(event.target.src,'url')}
gtag('event','share',{method:'twitter',event_action:'tweet',content_id:targetUrl})}})}},false)}}())}