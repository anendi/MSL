async function loadData() {
  const res = await fetch('data2.json');
  const members = await res.json();

  const tree = document.getElementById('tree');
  tree.innerHTML = '';

  const generations = [...new Set(members.map(m => m.generation))].sort();

  generations.forEach(gen => {
    const div = document.createElement('div');
    div.className = 'generation';

    members
      .filter(m => m.generation === gen)
      .forEach(member => {
        const card = document.createElement('div');
        card.className = 'member';
        card.innerHTML = `
          <img src="${member.photo}" alt="${member.name}" />
          <strong>${member.name}</strong>
        `;
        div.appendChild(card);
      });

    tree.appendChild(div);
  });
}

function toggleLayout() {
  const tree = document.getElementById('tree');
  tree.classList.toggle('vertical');
  tree.classList.toggle('horizontal');
}

function printPDF() {
  const element = document.getElementById('tree');
  html2pdf().from(element).save('silsilah-keluarga.pdf');
}

window.onload = loadData;
window.addEventListener("load", loadData);
window.addEventListener("load", loadData());