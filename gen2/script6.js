async function loadData() {
  const res = await fetch("data7.json");
  const members = await res.json();

  const tree = document.getElementById("tree");
  tree.innerHTML = "";

  const generations = [...new Set(members.map((m) => m.generation))].sort();

  generations.forEach((gen) => {
    const div = document.createElement("div");
    div.className = "generation";

    members
      .filter((m) => m.generation === gen)
      .forEach((member) => {
        const card = document.createElement("div");
        card.className = "member";
        card.innerHTML = `
          <div class="row"><div class="col ${member.photo ? "" : "d-none"}"><img src="${member.photo}" alt="${member.name}" /></div>
          <div class="col ${member.photo2 ? "" : "d-none"}"><img src="${member.photo2}" alt="${member.name}" /></div>
          </div>
          <p class="text-justify ${member.nam || member.nam2 ? "" : "d-none"}">  ${member.nam ?? ""}${member.dob && member.nam2 ? " - " : ""}${member.nam2 ?? ""}</p>
          <p class="text-justify ${member.dob || member.dob2 ? "" : "d-none"}">  ${member.dob ?? ""}${member.dob && member.dob2 ? " - " : ""}${member.dob2 ?? ""}</p>
          <p class="text-justify ${member.die || member.die2 ? "" : "d-none"}">  ${member.die ?? ""}${member.die && member.die2 ? " - " : ""}${member.die2 ?? ""}</p>
 
    <strong>${member.name}</strong>
  </a>
        `;
        div.appendChild(card);
      });

    tree.appendChild(div);
  });
}

function toggleLayout() {
  const tree = document.getElementById("tree");
  tree.classList.toggle("vertical");
  tree.classList.toggle("horizontal");
}

function printPDF() {
  const element = document.getElementById("tree");
  html2pdf().from(element).save("silsilah-keluarga.pdf");
}

window.onload = loadData;
window.addEventListener("load", loadData);
window.addEventListener("load", loadData());
