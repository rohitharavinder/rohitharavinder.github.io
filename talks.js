// Talks and Conference Attendance Data
// To add new entries, just add objects to this array
const talksData = [
  {
    year: 2023,
    type: "Poster",
    event: "SWAT4HCLS Conference",
    location: "Basel, Feb 13-16",
    contribution: "Thesis poster, OntoClue poster"
  },
  {
    year: 2023,
    type: "Talk",
    event: "ESWC Conferecne",
    location: "Hersonissos, May 28-29",
    contribution: "Talk on OntoClue"
  },
  {
    year: 2023,
    type: "Workshop",
    event: "deRSE Unconference",
    location: "Jena, Sept 25-28",
    contribution: "Participant"
  },
  {
    year: 2023,
    type: "Hackathon",
    event: "BioHackathon Europe",
    location: "Barcelona, Oct 30–Nov 3",
    contribution: "Signposting & RO-Crate"
  },
  {
    year: 2024,
    type: "Talk",
    event: "SWAT4HCLS Conference",
    location: "Leiden, Feb 26–29",
    contribution: "Poster on Gamification of FAIR4RS"
  },
  {
    year: 2024,
    type: "Workshop",
    event: "deRSE Conference",
    location: "Würzburg, Mar 5–7",
    contribution: "Talk"
  },
  {
    year: 2024,
    type: "Talk",
    event: "FDO Conference",
    location: "Berlin, March 19-21",
    contribution: "RO-Crate and Signposting"
  },
  {
    year: 2024,
    type: "Summer School",
    event: "ISWS Summer School",
    location: "Bari, June 9-15",
    contribution: "Participant"
  },
  {
    year: 2024,
    type: "Hackathon",
    event: "BioHackathon Europe",
    location: "Barcelona, Nov 4-8",
    contribution: "Croissant ML project"
  },
  {
    year: 2025,
    type: "Talk",
    event: "NFDI4Chem Ontogies Workshop",
    location: "Limburg, Nov 11",
    contribution: "RO-Crate and Signposting"
  },
  {
    year: 2025,
    type: "Summer School",
    event: "ASIRF Summer School",
    location: "Dagstuhl, Aug 24-29",
    contribution: "Participant"
  },
  {
    year: 2025,
    type: "Summer School",
    event: "Recsys Summer School",
    location: "Vienna, Sept 15-19",
    contribution: "Participant"
  },
  {
    year: 2025,
    type: "Hackathon",
    event: "BioHackathon Germany",
    location: "Walsrode, Dec 1-5",
    contribution: "MCP Server Project"
  }
];

// Color scheme for different types
const typeColors = {
  "Talk": "#34c3ddff",
  "Poster": "#7a60cfff",
  "Workshop": "#f3ca7eff",
  "Hackathon": "#e672d8ff",
  "Summer School": "#57dac6ff"
};

// Function to get color for type
function getTypeColor(type) {
  return typeColors[type] || "#00b4d8";
}

// Function to create filter buttons
function createFilters() {
  const talksSection = document.querySelector('.talks');
  const filterDiv = document.createElement('div');
  filterDiv.className = 'filter-controls';
  
  // Get unique types
  const types = [...new Set(talksData.map(talk => talk.type))];
  
  // Create "All" button
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'All';
  allBtn.onclick = () => filterTalks(null);
  filterDiv.appendChild(allBtn);
  
  // Create button for each type
  types.forEach(type => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = type;
    btn.style.setProperty('--type-color', getTypeColor(type));
    btn.onclick = () => filterTalks(type);
    filterDiv.appendChild(btn);
  });
  
  // Insert before table
  const tableWrapper = document.querySelector('.table-wrapper');
  talksSection.insertBefore(filterDiv, tableWrapper);
}

// Function to filter talks
function filterTalks(type) {
  const rows = document.querySelectorAll('#talks-tbody tr');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => {
    if ((type === null && btn.textContent === 'All') || btn.textContent === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Filter rows
  rows.forEach(row => {
    const rowType = row.dataset.type;
    if (type === null || rowType === type) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Function to load talks into the table
function loadTalks() {
  const tbody = document.getElementById('talks-tbody');
  
  // Sort by year (newest first)
  const sortedTalks = talksData.sort((a, b) => b.year - a.year);
  
  // Generate table rows
  sortedTalks.forEach(talk => {
    const row = document.createElement('tr');
    row.dataset.type = talk.type;
    
    const typeColor = getTypeColor(talk.type);
    
    row.innerHTML = `
      <td>${talk.year}</td>
      <td><span class="type-badge" style="background-color: ${typeColor}">${talk.type}</span></td>
      <td><strong>${talk.event}</strong></td>
      <td>${talk.location}</td>
      <td>${talk.contribution}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  // Create filter buttons
  createFilters();
  
  // Add search functionality
  addSearchBox();
}

// Function to add search box
function addSearchBox() {
  const talksSection = document.querySelector('.talks');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'search-box';
  searchDiv.innerHTML = `
    <input type="text" id="search-input" placeholder="Search events, locations, or contributions...">
  `;
  
  const tableWrapper = document.querySelector('.table-wrapper');
  talksSection.insertBefore(searchDiv, tableWrapper);
  
  // Add search functionality
  document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#talks-tbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Load talks when the page loads
document.addEventListener('DOMContentLoaded', loadTalks);