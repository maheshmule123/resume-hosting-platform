const $ = (id) => document.getElementById(id);
const getUser = () => JSON.parse(localStorage.getItem('resumeBuilderUser') || 'null');
const getResume = () => JSON.parse(localStorage.getItem('resumeData') || 'null');
const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function toast(msg){const t=$('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function requireLogin(){if(!localStorage.getItem('loggedIn')) location.href='login.html'}
function logout(){localStorage.removeItem('loggedIn');location.href='index.html'}
function downloadPDF(){window.print()}

// Register
if($('registerForm')) $('registerForm').addEventListener('submit',e=>{e.preventDefault();const name=$('name').value.trim(),email=$('email').value.trim().toLowerCase(),password=$('password').value,confirm=$('confirmPassword').value;if(password.length<6)return alert('Password must contain at least 6 characters.');if(password!==confirm)return alert('Passwords do not match.');localStorage.setItem('resumeBuilderUser',JSON.stringify({name,email,password}));alert('Registration successful!');location.href='login.html'});

// Login
if($('loginForm')) $('loginForm').addEventListener('submit',e=>{e.preventDefault();const email=$('email').value.trim().toLowerCase(),password=$('password').value,u=getUser();if(!u)return alert('Please register first.');if(email===u.email&&password===u.password){localStorage.setItem('loggedIn','true');localStorage.setItem('loggedInEmail',u.email);alert('Login successful!');location.href='dashboard.html'}else alert('Invalid email or password.')});

// Dashboard
if($('welcomeUser')){requireLogin();const u=getUser();$('welcomeUser').textContent='Welcome, '+(u?.name||'Mahesh')+'!';$('resumeStatus').textContent=getResume()?'Resume saved and ready to edit.':'No resume created yet.';}

// Resume form
if($('resumeForm')){requireLogin();const d=getResume();const ids=['name','address','phone','email','linkedin','github','summary','experience','education','technicalSkills','softSkills','tools','projects','certificates','languages','hobbies'];if(d)ids.forEach(id=>{if($(id)&&d[id])$(id).value=d[id]});if(d?.photo){$('photoPreview').innerHTML='<img src="'+d.photo+'" alt="Profile">'}$('photo').addEventListener('change',()=>{const f=$('photo').files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('photoPreview').innerHTML='<img src="'+r.result+'" alt="Profile">';$('photo').dataset.preview=r.result};r.readAsDataURL(f)});$('resumeForm').addEventListener('submit',e=>{e.preventDefault();const data={};ids.forEach(id=>data[id]=$(id)?.value.trim()||'');data.photo=$('photo').dataset.preview||d?.photo||'';localStorage.setItem('resumeData',JSON.stringify(data));location.href='resume.html'})}

// Resume output
if($('resumeRoot')){requireLogin();const d=getResume();if(!d){alert('Please create your resume first.');location.href='resume-form.html'}else{const set=(id,val)=>{if($(id))$(id).textContent=val||'Not added';};set('rName',d.name||'Mahesh');set('rAddress',d.address);set('rPhone',d.phone);set('rEmail',d.email);set('rLinkedin',d.linkedin);set('rGithub',d.github);set('rSummary',d.summary);set('rLanguages',d.languages);set('rHobbies',d.hobbies);const photo=$('rPhoto');if(d.photo)photo.src=d.photo;else photo.style.display='none';
const makeItems=(text)=>text.split(/\n+/).map(x=>x.trim()).filter(Boolean);const fillList=(id,text)=>{const el=$(id);el.innerHTML='';makeItems(text).forEach(x=>{const li=document.createElement('li');li.textContent=x;el.appendChild(li)})};
fillList('rExperience',d.experience);fillList('rEducation',d.education);fillList('rProjects',d.projects);fillList('rCertificates',d.certificates);set('rTechnical',d.technicalSkills);set('rSoft',d.softSkills);set('rTools',d.tools);}}
