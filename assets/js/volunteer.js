/**
 * Annai Foundation - Volunteer Onboarding Wizard & Pass Generator
 * 4-Stage multi-step registration with field validation, role allocation,
 * and instant printable volunteer digital ID pass creation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initVolunteerWizard();
});

function initVolunteerWizard() {
  const wizardForm = document.getElementById('volunteerWizardForm');
  if (!wizardForm) return;

  let currentStep = 1;
  const totalSteps = 4;

  const stepIndicators = [
    document.getElementById('stepIndicator1'),
    document.getElementById('stepIndicator2'),
    document.getElementById('stepIndicator3'),
    document.getElementById('stepIndicator4')
  ];

  const stepPanels = [
    document.getElementById('stepPanel1'),
    document.getElementById('stepPanel2'),
    document.getElementById('stepPanel3'),
    document.getElementById('stepPanel4')
  ];

  const nextBtn = document.getElementById('btnWizardNext');
  const prevBtn = document.getElementById('btnWizardPrev');
  const submitBtn = document.getElementById('btnWizardSubmit');

  function updateWizardUI() {
    // Update step numbers and indicators
    stepIndicators.forEach((indicator, index) => {
      if (!indicator) return;
      const stepNum = index + 1;
      indicator.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        indicator.classList.add('active');
      } else if (stepNum < currentStep) {
        indicator.classList.add('completed');
      }
    });

    // Update panels
    stepPanels.forEach((panel, index) => {
      if (!panel) return;
      panel.style.display = (index + 1 === currentStep) ? 'block' : 'none';
    });

    // Button visibilities
    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (currentStep === totalSteps) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'inline-flex';
    } else {
      if (nextBtn) nextBtn.style.display = 'inline-flex';
      if (submitBtn) submitBtn.style.display = 'none';
    }
  }

  function validateStep(step) {
    if (step === 1) {
      const name = document.getElementById('volName')?.value.trim();
      const phone = document.getElementById('volPhone')?.value.trim();
      const email = document.getElementById('volEmail')?.value.trim();
      const city = document.getElementById('volCity')?.value.trim();

      if (!name || !phone || !email || !city) {
        showToast('Please fill in your Name, Phone, Email, and City.', 'error');
        return false;
      }
      return true;
    }

    if (step === 2) {
      const checkedRoles = document.querySelectorAll('input[name="volRole"]:checked');
      if (checkedRoles.length === 0) {
        showToast('Please select at least one mission role or area of interest.', 'error');
        return false;
      }
      return true;
    }

    if (step === 3) {
      const checkedAvail = document.querySelectorAll('input[name="volAvailability"]:checked');
      if (checkedAvail.length === 0) {
        showToast('Please specify your availability preferences.', 'error');
        return false;
      }
      return true;
    }

    if (step === 4) {
      const agreed = document.getElementById('volAgreeTerms')?.checked;
      if (!agreed) {
        showToast('Please agree to the Volunteer Code of Conduct.', 'error');
        return false;
      }
      return true;
    }

    return true;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateWizardUI();
        const wizardSection = document.getElementById('volunteerWizardSection');
        if (wizardSection) {
          window.scrollTo({ top: wizardSection.offsetTop - 80, behavior: 'smooth' });
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  // Handle Form Submission
  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Registering Volunteer Profile...';
    }

    const rolesSelected = Array.from(document.querySelectorAll('input[name="volRole"]:checked'))
      .map(cb => cb.value)
      .join(', ');

    const volunteerData = {
      name: document.getElementById('volName')?.value.trim() || 'Volunteer',
      phone: document.getElementById('volPhone')?.value.trim(),
      email: document.getElementById('volEmail')?.value.trim(),
      city: document.getElementById('volCity')?.value.trim() || 'Karaikal',
      bloodGroup: document.getElementById('volBloodGroup')?.value || 'O+',
      role: rolesSelected || 'Emergency Ambulance Response'
    };

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Generate Volunteer Pass';
      }

      showToast(`Welcome to Annai Foundation, ${volunteerData.name}! Your volunteer registration is complete.`, 'success');
      openVolunteerBadgeModal(volunteerData);

      wizardForm.reset();
      currentStep = 1;
      updateWizardUI();
    }, 1300);
  });

  updateWizardUI();
}

/* --- Volunteer Digital ID Pass Modal --- */
function openVolunteerBadgeModal(vol) {
  const modal = document.getElementById('volunteerBadgeModal');
  if (!modal) return;

  const volId = 'AF-VOL-' + Math.floor(1000 + Math.random() * 9000);
  const joinDate = new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  const elId = document.getElementById('badgeVolId');
  const elName = document.getElementById('badgeVolName');
  const elRole = document.getElementById('badgeVolRole');
  const elCity = document.getElementById('badgeVolCity');
  const elDate = document.getElementById('badgeVolDate');

  if (elId) elId.innerText = volId;
  if (elName) elName.innerText = vol.name;
  if (elRole) elRole.innerText = vol.role;
  if (elCity) elCity.innerText = `${vol.city} (Blood Group: ${vol.bloodGroup})`;
  if (elDate) elDate.innerText = `Active Volunteer Since: ${joinDate}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const printBtn = document.getElementById('btnPrintBadge');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }
}
