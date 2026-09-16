/**
 * Annai Foundation - Interactive Event Calendar & RSVP Manager
 * Generates interactive monthly grid, filterable Bento event cards list,
 * modal RSVP registration, and downloadable .ics calendar invitations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEventCalendar();
  renderEventsList();
  initEventFilters();
  initRsvpModal();
});

let currentYear = 2026;
let currentMonth = 8; // 8 = September (0-indexed)

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/* --- Interactive Month Calendar Grid --- */
function initEventCalendar() {
  const monthDisplay = document.getElementById('calendarMonthName');
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  const daysGrid = document.getElementById('calendarDaysGrid');

  if (!daysGrid) return;

  function renderCalendar() {
    if (monthDisplay) {
      monthDisplay.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    }

    daysGrid.innerHTML = '';

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      daysGrid.appendChild(emptyCell);
    }

    // Days in current month
    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      dayCell.innerText = day;

      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const eventsOnDay = (typeof ANNAI_DATA !== 'undefined' && ANNAI_DATA.events) 
        ? ANNAI_DATA.events.filter(e => e.date === dateStr)
        : [];

      if (eventsOnDay.length > 0) {
        dayCell.classList.add('has-event');
        dayCell.title = `${eventsOnDay.length} Event(s): ` + eventsOnDay.map(e => e.title).join(', ');

        dayCell.addEventListener('click', () => {
          document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
          dayCell.classList.add('selected');
          filterEventsByDate(dateStr);
        });
      }

      daysGrid.appendChild(dayCell);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  renderCalendar();
}

/* --- Render Event Cards List Dynamically --- */
function renderEventsList() {
  const container = document.getElementById('eventsListContainer');
  if (!container || typeof ANNAI_DATA === 'undefined' || !ANNAI_DATA.events) return;

  container.innerHTML = ANNAI_DATA.events.map(evt => {
    let badgeClass = 'badge-evergreen';
    if (evt.category === 'Education') badgeClass = 'badge-saffron';
    if (evt.category === 'Volunteer' || evt.category === 'Relief') badgeClass = 'badge-terracotta';

    return `
      <div class="bento-card event-card-item" data-category="${evt.category}" data-date="${evt.date}" style="padding: 1.5rem; display: flex; gap: 1.5rem; align-items: flex-start; transition: transform 0.25s ease, border-color 0.25s ease;">
        <div style="min-width: 95px; text-align: center;">
          <div style="background: var(--bg-subtle); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 0.85rem; margin-bottom: 0.5rem;">
            <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; line-height: 1; display: block; color: var(--primary);">${evt.day}</span>
            <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">${evt.month}</span>
          </div>
          ${evt.image ? `<img src="${evt.image}" alt="${evt.title}" style="width: 100%; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">` : ''}
        </div>
        
        <div style="flex: 1;">
          <div class="flex-between items-center" style="margin-bottom: 0.4rem;">
            <span class="badge-pill ${badgeClass}" style="font-size: 0.72rem; margin-bottom: 0;">${evt.badge}</span>
            <span style="font-size: 0.78rem; color: var(--secondary); font-weight: 700;">
              <i class="bi bi-people-fill"></i> ${evt.seatsAvailable} Spots Open
            </span>
          </div>
          <h3 class="event-title" style="font-size: 1.25rem; margin-bottom: 0.4rem;">${evt.title}</h3>
          <p class="event-desc" style="font-size: 0.88rem; color: var(--text-body); margin-bottom: 0.85rem;">${evt.description}</p>
          
          <div class="flex gap-3 flex-wrap" style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">
            <span><i class="bi bi-clock-fill" style="color: var(--primary);"></i> ${evt.time}</span>
            <span><i class="bi bi-geo-alt-fill" style="color: var(--secondary);"></i> ${evt.location}</span>
          </div>

          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm btn-open-rsvp" data-event-id="${evt.id}">
              <i class="bi bi-check2-circle"></i> Register Free RSVP
            </button>
            <button class="btn btn-outline btn-sm btn-download-ics" data-event-id="${evt.id}" title="Add to Calendar (.ics)">
              <i class="bi bi-calendar-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-bind events to new DOM nodes
  bindEventCardButtons();
}

/* --- Event Category Filters --- */
function initEventFilters() {
  const filterBtns = document.querySelectorAll('.event-filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
      const category = btn.getAttribute('data-category') || 'all';
      applyEventFilter(category);
    });
  });
}

function applyEventFilter(category) {
  const cards = document.querySelectorAll('.event-card-item');
  cards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const filterCat = category.toLowerCase();

    if (
      filterCat === 'all' || 
      cardCat === filterCat || 
      (filterCat === 'relief' && (cardCat === 'relief' || cardCat === 'volunteer' || cardCat === 'humanitarian' || cardCat === 'livelihood'))
    ) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterEventsByDate(dateStr) {
  const cards = document.querySelectorAll('.event-card-item');
  let matchFound = false;

  cards.forEach(card => {
    const cardDate = card.getAttribute('data-date');
    if (cardDate === dateStr) {
      card.style.display = 'flex';
      matchFound = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (matchFound) {
    const container = document.getElementById('eventsListContainer');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

/* --- RSVP Registration Modal & ICS Generation --- */
let activeRsvpEvent = null;

function bindEventCardButtons() {
  document.querySelectorAll('.btn-open-rsvp').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      activeRsvpEvent = ANNAI_DATA.events.find(e => e.id === eventId);
      if (activeRsvpEvent) {
        const modal = document.getElementById('eventRsvpModal');
        const title = document.getElementById('rsvpModalEventTitle');
        const date = document.getElementById('rsvpModalEventDate');
        if (title) title.innerText = activeRsvpEvent.title;
        if (date) date.innerText = `${activeRsvpEvent.displayDate} • ${activeRsvpEvent.time} • ${activeRsvpEvent.location}`;
        if (modal) {
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  document.querySelectorAll('.btn-download-ics').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const evt = ANNAI_DATA.events.find(e => e.id === eventId);
      if (evt) {
        downloadIcsFile(evt);
        showToast(`Calendar invite downloaded: ${evt.title}`, 'success');
      }
    });
  });
}

function initRsvpModal() {
  const rsvpForm = document.getElementById('rsvpForm');
  const modal = document.getElementById('eventRsvpModal');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpName')?.value.trim();
      const phone = document.getElementById('rsvpPhone')?.value.trim();

      if (!name || !phone) {
        showToast('Please enter your Name and WhatsApp Mobile number.', 'error');
        return;
      }

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Confirming Spot...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Confirm Free RSVP';
        }
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
        showToast(`Registration confirmed for ${name}! Pass sent via WhatsApp/SMS to ${phone}.`, 'success');

        if (activeRsvpEvent) {
          downloadIcsFile(activeRsvpEvent);
        }
        rsvpForm.reset();
      }, 1200);
    });
  }
}

/* --- Generate and Download .ICS Calendar Invite --- */
function downloadIcsFile(evt) {
  const cleanDate = evt.date.replace(/-/g, '');
  const startStamp = `${cleanDate}T090000Z`;
  const endStamp = `${cleanDate}T140000Z`;

  const icsBody = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Annai Foundation//NGO Events//EN',
    'BEGIN:VEVENT',
    `UID:${evt.id}-${Date.now()}@annaifoundation.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startStamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:${evt.title}`,
    `DESCRIPTION:${evt.description} | Organized by Annai Foundation Karaikal (Helpline: +91 95004 15161)`,
    `LOCATION:${evt.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsBody], { type: 'text/calendar;charset=utf-8' });
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.setAttribute('download', `${evt.id}-annai-foundation.ics`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
