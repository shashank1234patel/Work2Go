const jobs = [
  {id:1,title:'Delivery Helper',employer:'Rahul Stores',location:'Navrangpura',distance:2.5,pay:500,payment:'day',hours:'4 hours',mode:'Offline',category:'Delivery',skills:'Two-wheeler · Driving licence',rating:4.5,reviews:18,description:'Help deliver grocery orders around your neighbourhood.',newest:3},
  {id:2,title:'Cafe Service Assistant',employer:'The Daily Brew',location:'Vastrapur',distance:1.2,pay:550,payment:'day',hours:'5 hours',mode:'Offline',category:'Retail',skills:'Customer service · Friendly attitude',rating:4.8,reviews:31,description:'Assist customers and help keep a busy local cafe running.',newest:1},
  {id:3,title:'Online Maths Tutor',employer:'Bright Minds',location:'Work from home',distance:0,pay:700,payment:'hour',hours:'2 hours',mode:'Online',category:'Teaching',skills:'Maths · Clear communication',rating:4.9,reviews:42,description:'Help school students understand maths through online sessions.',newest:2},
  {id:4,title:'Store Stock Helper',employer:'Fresh Basket',location:'Bodakdev',distance:4.7,pay:450,payment:'day',hours:'4 hours',mode:'Offline',category:'Retail',skills:'Organising · Lifting boxes',rating:4.2,reviews:12,description:'Organise stock and assist with evening shelf refills.',newest:4}
];
const $ = s => document.querySelector(s);
document.querySelectorAll('.menu-toggle').forEach(button => button.addEventListener('click', () => $('nav').classList.toggle('show')));

function renderJobs() {
  const list = $('#jobList'); if (!list) return;
  const term = $('#jobSearch').value.toLowerCase();
  const distance = $('#distanceFilter').value, salary = $('#salaryFilter').value, cat = $('#categoryFilter').value, mode = $('#modeFilter').value, rating = $('#ratingFilter').value;
  let result = jobs.filter(j => (!term || `${j.title} ${j.employer} ${j.category} ${j.location}`.toLowerCase().includes(term)) && (distance === 'all' || j.distance <= +distance) && (salary === 'all' || j.pay >= +salary) && (cat === 'all' || j.category === cat) && (mode === 'all' || j.mode === mode) && (rating === 'all' || j.rating >= +rating));
  const sort = $('#sortJobs').value;
  result.sort((a,b) => sort==='pay'?b.pay-a.pay : sort==='rating'?b.rating-a.rating : sort==='newest'?a.newest-b.newest : a.distance-b.distance);
  $('#resultsCount').textContent = `${result.length} job${result.length===1?'':'s'} found`;
  list.innerHTML = result.length ? result.map(j => `<article class="job-card"><div><p class="job-label">${j.category.toUpperCase()} · ${j.mode.toUpperCase()}</p><h2>${j.title}</h2><p class="company">${j.employer} · <span class="rating">★ ${j.rating}/5</span> (${j.reviews} reviews)</p><div class="job-info"><span>📍 <b>${j.distance ? j.distance+' km away' : 'Online'}</b></span><span>💰 <b>₹${j.pay}/${j.payment}</b></span><span>⏰ <b>${j.hours}</b></span></div><p class="job-description">${j.description} Skills: ${j.skills}.</p></div><div class="card-actions"><a class="small-button" href="job-details.html?id=${j.id}">View Details</a><button class="small-button apply" data-title="${j.title}">Apply Now</button></div></article>`).join('') : '<p class="muted">No jobs match these filters. Try clearing a filter.</p>';
}
if ($('#jobList')) { ['jobSearch','distanceFilter','salaryFilter','categoryFilter','modeFilter','ratingFilter','sortJobs'].forEach(id => $('#'+id).addEventListener('input',renderJobs)); $('#clearFilters').addEventListener('click',()=>{document.querySelectorAll('.filters select').forEach(s=>s.selectedIndex=0);renderJobs()}); renderJobs(); }
document.addEventListener('click', e => { if(e.target.matches('.small-button.apply')) { e.target.textContent='Applied ✓'; e.target.disabled=true; e.target.style.opacity='.7'; } });
if ($('#jobForm')) $('#jobForm').addEventListener('submit',e=>{e.preventDefault(); e.target.style.display='none'; $('#successCard').style.display='block'; window.scrollTo({top:0,behavior:'smooth'});});
if ($('#profileForm')) $('#profileForm').addEventListener('submit', e=>{e.preventDefault(); $('#choiceCard').scrollIntoView({behavior:'smooth',block:'center'});});
if ($('#profilePhoto')) $('#profilePhoto').addEventListener('change',e=>{const file=e.target.files[0]; if(file){const r=new FileReader();r.onload=()=>{$('#photoPreview').style.background=`center/cover url(${r.result})`;$('#photoPreview').textContent=''};r.readAsDataURL(file)}});
if ($('#editProfile')) $('#editProfile').addEventListener('click',()=>$('#profileForm').scrollIntoView({behavior:'smooth'}));
if ($('#applyButton')) $('#applyButton').addEventListener('click',e=>{e.target.textContent='Application sent ✓';e.target.disabled=true;e.target.style.opacity='.75'});
if ($('#reportJob')) $('#reportJob').addEventListener('click',()=>alert('Thanks. This job has been flagged for review.'));
if (location.pathname.endsWith('job-details.html')) {const job=jobs.find(j=>j.id===+new URLSearchParams(location.search).get('id'))||jobs[0]; $('#detailTitle').textContent=job.title; $('#detailEmployer').textContent=job.employer; $('#detailRating').textContent=job.rating; $('#detailPay').textContent=`₹${job.pay}/${job.payment}`; $('#applyPay').textContent=`₹${job.pay}/${job.payment}`; $('#detailHours').textContent=job.hours; $('#detailDistance').textContent=job.distance?`${job.distance} km away`:'Online';}
