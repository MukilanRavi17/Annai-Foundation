/**
 * Annai Foundation - Donation Engine & Payment Simulation
 * Handles preset gift chips, 80G tax benefit live calculator,
 * simulated UPI QR / Card / NetBanking checkout, and instant printable 80G tax receipt.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDonationForm();
  initUrlParameters();
});

function initDonationForm() {
  const form = document.getElementById('mainDonationForm');
  const chipBtns = document.querySelectorAll('.giving-chips-grid .chip-btn');
  const customInput = document.getElementById('customAmountInput');
  const taxBenefitDisplay = document.getElementById('taxBenefitAmount');
  const causeSelect = document.getElementById('donationCauseSelect');
  const freqOneTimeBtn = document.getElementById('freqOneTime');
  const freqMonthlyBtn = document.getElementById('freqMonthly');

  let selectedAmount = 2500;
  let selectedFrequency = 'One-Time';

  // Preset chips click
  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = parseInt(btn.getAttribute('data-amt'), 10) || 2500;
      selectedAmount = amt;
      if (customInput) customInput.value = '';
      updateTaxBenefit(selectedAmount);
    });
  });

  // Custom amount input
  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val && val > 0) {
        chipBtns.forEach(b => b.classList.remove('active'));
        selectedAmount = val;
        updateTaxBenefit(selectedAmount);
      }
    });
  }

  // Frequency toggles
  if (freqOneTimeBtn && freqMonthlyBtn) {
    freqOneTimeBtn.addEventListener('click', () => {
      freqOneTimeBtn.className = 'btn btn-sm btn-primary';
      freqOneTimeBtn.style.border = 'none';
      freqMonthlyBtn.className = 'btn btn-sm btn-outline';
      freqMonthlyBtn.style.border = 'none';
      selectedFrequency = 'One-Time';
    });

    freqMonthlyBtn.addEventListener('click', () => {
      freqMonthlyBtn.className = 'btn btn-sm btn-primary';
      freqMonthlyBtn.style.border = 'none';
      freqOneTimeBtn.className = 'btn btn-sm btn-outline';
      freqOneTimeBtn.style.border = 'none';
      selectedFrequency = 'Monthly Regular';
    });
  }

  function updateTaxBenefit(amount) {
    if (!taxBenefitDisplay) return;
    const taxSaved = Math.round(amount * 0.5);
    taxBenefitDisplay.innerText = `₹${taxSaved.toLocaleString('en-IN')} Saved`;
  }

  // Handle Form Submission -> Open Checkout Modal
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const donorName = document.getElementById('donorName')?.value.trim();
      const donorMobile = document.getElementById('donorMobile')?.value.trim();
      const donorEmail = document.getElementById('donorEmail')?.value.trim();
      const donorPan = document.getElementById('donorPan')?.value.trim() || 'NOT_PROVIDED';
      const causeText = causeSelect?.options[causeSelect.selectedIndex]?.text || 'General Lifeline Fund';

      if (!donorName || !donorMobile || !donorEmail) {
        showToast('Please provide your Name, Mobile, and Email address.', 'error');
        return;
      }

      openCheckoutModal({
        name: donorName,
        phone: donorMobile,
        email: donorEmail,
        pan: donorPan,
        amount: selectedAmount,
        cause: causeText,
        frequency: selectedFrequency
      });
    });
  }

  updateTaxBenefit(selectedAmount);
}

/* --- Parse Query Parameters (from home chips or causes) --- */
function initUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const amountParam = urlParams.get('amount');
  const causeParam = urlParams.get('cause');

  if (amountParam) {
    const customInput = document.getElementById('customAmountInput');
    const chipBtns = document.querySelectorAll('.giving-chips-grid .chip-btn');
    let matchedChip = false;

    chipBtns.forEach(btn => {
      if (btn.getAttribute('data-amt') === amountParam) {
        chipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.click();
        matchedChip = true;
      }
    });

    if (!matchedChip && customInput) {
      chipBtns.forEach(b => b.classList.remove('active'));
      customInput.value = amountParam;
      customInput.dispatchEvent(new Event('input'));
    }
  }

  if (causeParam) {
    const causeSelect = document.getElementById('donationCauseSelect');
    if (causeSelect) {
      for (let opt of causeSelect.options) {
        if (opt.value.toLowerCase().includes(causeParam.toLowerCase()) || opt.text.toLowerCase().includes(causeParam.toLowerCase())) {
          causeSelect.value = opt.value;
          break;
        }
      }
    }
  }
}

/* --- Simulated Payment Checkout Modal --- */
function openCheckoutModal(donorData) {
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const formattedAmt = `₹${donorData.amount.toLocaleString('en-IN')}`;

  const payDisplay = document.getElementById('modalPayAmountDisplay');
  if (payDisplay) payDisplay.innerText = formattedAmt;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Payment tab switching (UPI / Card / NetBanking)
  const payTabs = modal.querySelectorAll('.pay-mode-btn');
  const panelUpi = document.getElementById('panelUpi');
  const panelCard = document.getElementById('panelCard');
  const panelNet = document.getElementById('panelNet');

  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabType = tab.getAttribute('data-tab');

      if (panelUpi) panelUpi.style.display = tabType === 'upi' ? 'block' : 'none';
      if (panelCard) panelCard.style.display = tabType === 'card' ? 'block' : 'none';
      if (panelNet) panelNet.style.display = tabType === 'net' ? 'block' : 'none';
    });
  });

  // Confirm Payment Button
  const confirmBtn = document.getElementById('btnConfirmDonation');
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Verifying Transaction...';

      setTimeout(() => {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Confirm & Generate 80G Receipt';
        modal.classList.remove('open');
        showToast(`Thank you ${donorData.name}! Your contribution of ${formattedAmt} was received successfully.`, 'success');
        
        // Open Official 80G Receipt Modal
        openReceiptModal(donorData, formattedAmt);
      }, 1400);
    };
  }
}

/* --- Printable 80G Official Receipt Modal --- */
function openReceiptModal(donorData, formattedAmt) {
  const receiptModal = document.getElementById('receiptModal');
  if (!receiptModal) return;

  const txnId = 'AF-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const elTxn = document.getElementById('receiptTxnId');
  const elDate = document.getElementById('receiptDate');
  const elName = document.getElementById('receiptDonorName');
  const elPan = document.getElementById('receiptDonorPan');
  const elEmail = document.getElementById('receiptDonorEmail');
  const elPhone = document.getElementById('receiptDonorPhone');
  const elAmount = document.getElementById('receiptAmount');
  const elCause = document.getElementById('receiptCause');

  if (elTxn) elTxn.innerText = txnId;
  if (elDate) elDate.innerText = dateStr;
  if (elName) elName.innerText = donorData.name;
  if (elPan) elPan.innerText = donorData.pan !== 'NOT_PROVIDED' ? donorData.pan : 'PAN NOT SUBMITTED';
  if (elEmail) elEmail.innerText = donorData.email;
  if (elPhone) elPhone.innerText = donorData.phone;
  if (elAmount) elAmount.innerText = formattedAmt;
  if (elCause) elCause.innerText = donorData.cause;

  receiptModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const printBtn = document.getElementById('btnPrintReceipt');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }
}
