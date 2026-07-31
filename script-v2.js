
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const strengths = [
  ['Operational Excellence','Designing systems that simplify complexity.'],
  ['Executive Partnership','Supporting leaders through trust, organization, and strategic coordination.'],
  ['HR Operations','Creating consistent, people-centered employee experiences.'],
  ['Process Improvement','Building better, clearer ways of working.'],
  ['Executive Communications','Helping leaders communicate with clarity and purpose.'],
  ['AI Productivity','Using modern tools to enhance efficiency while preserving human judgment.'],
  ['Cross-Functional Leadership','Connecting people, priorities, and outcomes across teams.'],
  ['Strategic Planning','Turning competing priorities into an organized path forward.']
];
let index = 0;
const title = document.getElementById('strengthTitle');
const text = document.getElementById('strengthText');
const box = document.getElementById('strengthBox');
const dots = document.getElementById('dots');
let timer;

function showStrength(i){
  index=i;
  title.style.opacity='0';
  title.style.transform='translateY(8px)';
  setTimeout(()=>{
    title.textContent=strengths[i][0];
    text.textContent=strengths[i][1];
    title.style.opacity='1';
    title.style.transform='translateY(0)';
    [...dots.children].forEach((d,n)=>d.classList.toggle('active',n===i));
  },260);
}
strengths.forEach((s,i)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.setAttribute('aria-label',`Show ${s[0]}`);
  dot.addEventListener('click',()=>{showStrength(i);restart();});
  dots.appendChild(dot);
});
function restart(){
  clearInterval(timer);
  timer=setInterval(()=>showStrength((index+1)%strengths.length),3200);
}
box?.addEventListener('click',()=>{showStrength((index+1)%strengths.length);restart();});
showStrength(0); restart();

const metricObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el=entry.target, target=Number(el.dataset.target||0);
    const prefix=el.dataset.prefix||'', suffix=el.dataset.suffix||'';
    const start=performance.now(), duration=1100;
    function animate(now){
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=`${prefix}${Math.round(target*eased)}${suffix}`;
      if(p<1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    metricObserver.unobserve(el);
  });
},{threshold:.6});
document.querySelectorAll('.metric strong').forEach(el=>metricObserver.observe(el));
