
(function(){
var q=document.getElementById('q'),cat=document.getElementById('fcat'),ctry=document.getElementById('fctry'),
sort=document.getElementById('fsort'),freeC=document.getElementById('ffree'),cnt=document.getElementById('cnt'),
grid=document.getElementById('grid'),tagBtn=document.getElementById('tagbtn'),tagWrap=document.getElementById('tagwrap');
if(grid){
var cards=[].slice.call(grid.querySelectorAll('.card'));
var state={q:'',cat:'',ctry:'',sort:'new',free:false,tag:''};
function apply(){
var ql=state.q.trim().toLowerCase(),vis=0;
cards.forEach(function(c){
var ok=!state.free||c.dataset.free==='1';
if(ok&&state.cat)ok=(c.dataset.cat||'').split(' ').indexOf(state.cat)>-1;
if(ok&&state.ctry)ok=c.dataset.ctry===state.ctry;
if(ok&&state.tag)ok=(c.dataset.tags||'').split(' ').indexOf(state.tag)>-1;
if(ok&&ql)ok=(c.dataset.search||'').indexOf(ql)>-1;
c.style.display=ok?'':'none';if(ok)vis++;});
if(cnt)cnt.innerHTML=cnt.getAttribute('data-tpl').replace('{n}','<b>'+vis+'</b>');
var em=document.getElementById('empty');
if(em)em.style.display=vis?'none':'block';
grid.style.display=vis?'':'none';
if(tagWrap)tagWrap.style.display=state.tag?'inline-flex':'none';
if(state.tag&&tagBtn)tagBtn.textContent=tagBtn.getAttribute('data-tpl').replace('{t}',state.tag);
}
function sortBy(){
var arr=cards.slice();
if(state.sort==='new')arr.sort(function(a,b){return b.dataset.date.localeCompare(a.dataset.date)});
else if(state.sort==='cheap')arr.sort(function(a,b){return a.dataset.amount-b.dataset.amount});
else if(state.sort==='exp')arr.sort(function(a,b){return b.dataset.amount-a.dataset.amount});
else if(state.sort==='pop')arr.sort(function(a,b){return b.dataset.views-a.dataset.views});
arr.forEach(function(c){grid.appendChild(c)});
}
try{var us=new URLSearchParams(location.search);
if(us.get('q')){state.q=us.get('q');if(q)q.value=state.q;}
if(us.get('cat')){state.cat=us.get('cat');if(cat)cat.value=state.cat;}
if(us.get('country')){state.ctry=us.get('country');if(ctry)ctry.value=state.ctry;}
if(us.get('sort')){state.sort=us.get('sort');if(sort)sort.value=state.sort;}
if(us.get('free')==='1'){state.free=true;if(freeC)freeC.checked=true;}
if(us.get('tag'))state.tag=us.get('tag');}catch(e){}
if(state.sort&&state.sort!=='new')sortBy();
if(state.tag)[].slice.call(document.querySelectorAll('.tag')).forEach(function(x){
if(x.getAttribute('data-tag')===state.tag)x.classList.add('c-on')});
if(q)q.addEventListener('input',function(){state.q=q.value;apply()});
if(cat)cat.addEventListener('change',function(){state.cat=cat.value;apply()});
if(ctry)ctry.addEventListener('change',function(){state.ctry=ctry.value;apply()});
if(sort)sort.addEventListener('change',function(){state.sort=sort.value;sortBy()});
if(freeC)freeC.addEventListener('change',function(){state.free=freeC.checked;apply()});
document.addEventListener('click',function(e){
var t=e.target.closest('.tag');if(!t)return;
var slug=t.getAttribute('data-tag');
state.tag=(state.tag===slug)?'':slug;
[].slice.call(document.querySelectorAll('.tag')).forEach(function(x){x.classList.remove('c-on')});
if(state.tag)t.classList.add('c-on');
apply();});
if(tagBtn)tagBtn.addEventListener('click',function(){state.tag='';
[].slice.call(document.querySelectorAll('.tag')).forEach(function(x){x.classList.remove('c-on')});apply()});
apply();
}
var pmain=document.getElementById('pmain');
if(pmain){[].slice.call(document.querySelectorAll('.p-thumb')).forEach(function(t){
t.addEventListener('click',function(){
pmain.src=t.getAttribute('data-src');pmain.alt=t.getAttribute('data-alt')||'';
[].slice.call(document.querySelectorAll('.p-thumb')).forEach(function(x){x.classList.remove('on')});
t.classList.add('on');});});}
})();
