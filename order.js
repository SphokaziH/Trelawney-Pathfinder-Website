const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSfXDUK4gmrsmxqIRZ1Y9vCgfSFEu6gF3PyCm1XGbbop38EI1w/viewform?usp=pp_url';

const items = document.querySelectorAll('.order-items .item');
const totalElem = document.getElementById('total');

function calculateTotal() {
  let total = 0;
  items.forEach(item => {
    const price = Number(item.dataset.price);
    const qty = Number(item.querySelector('input.qty').value) || 0;
    total += price * qty;
  });
  totalElem.textContent = total.toFixed(2);
}

items.forEach(item => {
  item.querySelector('input.qty').addEventListener('input', calculateTotal);
});

calculateTotal();

// Add button event listener here:
document.getElementById('openForm').addEventListener('click', () => {
  // Collect user info from form inputs, e.g.:
  const parentName = document.getElementById('parentName').value.trim();
  const childName = document.getElementById('childName').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!parentName || !childName || !contact) {
    alert('Please fill in parent name, child name, and contact number before continuing.');
    return;
  }

  // Build item summary lines
  let lines = [];
  items.forEach(item => {
    const name = item.dataset.name;
    const price = Number(item.dataset.price);
    const qty = Number(item.querySelector('input.qty').value) || 0;
    if (qty > 0) {
      lines.push(`${qty} x ${name} @ R${price}`);
    }
  });

  if (lines.length === 0) {
    if (!confirm('No items selected. Continue to form?')) return;
  }

  const itemsSummary = lines.join('; ');
  const total = Number(totalElem.textContent);

  // Replace these entry IDs with your Google Form's actual entry IDs:
  const FORM_FIELDS = {
    parentName: 'entry.1034496301',
    childName: 'entry.1755059702',
    contact: 'entry.1727787080',
    items: 'entry.424668800',
    total: 'entry.729462183'
  };

  // Build prefilled URL
  const params = new URLSearchParams();
  params.append(FORM_FIELDS.parentName, parentName);
  params.append(FORM_FIELDS.childName, childName);
  params.append(FORM_FIELDS.contact, contact);
  params.append(FORM_FIELDS.items, itemsSummary);
  params.append(FORM_FIELDS.total, `R${total.toFixed(2)}`);

  const url = GOOGLE_FORM_BASE + '&' + params.toString();

  // Open the prefilled Google Form in a new tab
  window.open(url, '_blank');
});
