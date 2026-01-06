// ==========================================
// 1. DATA SECTION (Gallery aur Events ki details yaha badle)
// ==========================================

const clubData = {
  // Impact Stats
  stats: {
    events: 10,
    members: 60,
    projects: 5,
  },

  // Gallery Images (Ek line mein slide hongi)
  gallery: [
    { url: "management.png", caption: "Forum Incharge" },
    { url: "lead.png", caption: "Lead" },
    { url: "Co-lead.png", caption: "Co-Leads" },
    { url: "App dev.png", caption: "App-dev Team" },
    { url: "web-dev 1.png", caption: "Web-Dev Team" },
    { url: "web-dev2.png", caption: "Web-Dev Team" },
  ],

  // Events Details (Yeh bhi ab slide honge)
  events: [
    {
      title: "Code Rush",
      date: "Dec 28, 2026",
      img: "CODE_RUSH.png",
      tag: "CodeRush",
      link: " https://vision.hack2skill.com/event/GDGoC-25-gdg-kits",
    },
    {
      title: "Career Guidance Session",
      date: "Sep 05, 2025",
      img: "workshop.png",
      tag: "Session",
      link: "https://gdg.community.dev/",
    },
    {
      title: "UI/UX Session",
      date: "Aug 8, 2025",
      img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800",
      tag: "UI/UX",
      link: "https://gdg.community.dev/",
    },
    {
      title: "Web Hackathon",
      date: "Mar 12, 2026",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      tag: "Web",
      link: "https://gdg.community.dev/",
    },
  ],
};

// ==========================================
// 2. INITIALIZATION (Jab page load hoga tab yeh chalega)
// ==========================================
async function initSite() {
  // A. STATS UPDATE
  const sEvents = document.getElementById("stat-events");
  const sMembers = document.getElementById("stat-members");
  const sProjects = document.getElementById("stat-projects");

  if (sEvents) sEvents.innerText = clubData.stats.events + "+";
  if (sMembers) sMembers.innerText = clubData.stats.members + "+";
  if (sProjects) sProjects.innerText = clubData.stats.projects + "+";

  // B. GALLERY SLIDER POPULATE
  const photoGrid = document.getElementById("photo-grid");
  if (photoGrid) {
    photoGrid.innerHTML = clubData.gallery
      .map(
        (p) => `
            <div class="gallery-item relative group h-80 overflow-hidden rounded-[2.5rem] bento-card border-none shadow-md">

<img src="${p.url}" class="w-full h-full object-contain group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 img-overlay flex items-end p-8 opacity-0 group-hover:opacity-100 transition duration-300">
                    <p class="text-white font-bold text-lg">${p.caption}</p>
                </div>
            </div>
        `
      )
      .join("");
  }

  // C. EVENTS SLIDER POPULATE
//   const eventGrid = document.getElementById("events-grid");
//   if (eventGrid) {
//     eventGrid.innerHTML = clubData.events
//       .map(
//         (e) => `
//             <div class="event-card bento-card overflow-hidden rounded-[2rem] bg-white">

//                 <img src="${e.img}" class="w-full h-48 object-contain bg-gray-50">
//                 <div class="p-8">
//                     <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${e.tag}</span>
//                     <h4 class="text-xl font-bold mt-4">${e.title}</h4>
//                     <p class="text-slate-500 text-sm mt-2 mb-4"><i class="far fa-calendar-alt mr-2"></i>${e.date}</p>
//                     <button onclick="window.open('${e.link}', '_blank')" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">View Details</button>
//                 </div>
//             </div>
//         `
//       )
//       .join("");
//   }
// }

// ==========================================
// 3. OTHER FUNCTIONS
// ==========================================
// function joinCommunity() {
//   window.open("https://gdg.community.dev/", "_blank");
// }

// Page load hone par sab start karo
// window.onload = initSite;

// 
// C. DYNAMIC EVENT SECTION 
const eventGrid = document.getElementById("events-grid");
if (eventGrid) {
  try {
      // 1. Get the list of event folders from your main list.json
    const response = await fetch('Events Info/list.json');
    const eventPaths = await response.json(); // Expected: ["career-guidance/details.json", "code-rush/details.json"]

      // 2. Fetch details for each event
    const eventDataPromises = eventPaths.map(path => 
      fetch(`Events Info/list.json${path}`).then(res => res.json())
    );
      
    const allEvents = await Promise.all(eventDataPromises);

      // 3. Render to HTML
    eventGrid.innerHTML = allEvents.map(e => `
      <div class="event-card bento-card ...">
          <img src="${e.img}" class="...">
          <div class="p-8">
              <span class="...">${e.tag}</span>
              <h4 class="text-xl font-bold mt-4">${e.title}</h4>
              <p class="...">${e.date}</p>
              <button onclick="window.open('${e.link}', '_blank')" class="...">View Details</button>
          </div>
      </div>
    `).join("");
      
  } catch (error) {
    console.error("Error loading events:", error);
   }
 }}

window.onload = initSite;