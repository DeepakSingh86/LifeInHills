/* ==== NEW JSON AUTO-LOADER SYSTEM ==== */
document.addEventListener("DOMContentLoaded", () => {
  const dataURL =
    "https://raw.githubusercontent.com/DeepakSingh86/LifeInHills/main/data/posts.json";
  const magazineContainer = document.getElementById("magazine-container");

  async function loadMagazineData() {
    try {
      const response = await fetch(dataURL);
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        magazineContainer.innerHTML = `
          <div class="empty-state">
            <h3>No Magazine Issues Yet</h3>
            <p>Upload content using the Admin Panel or data/posts.json</p>
          </div>`;
        return;
      }

      magazineContainer.innerHTML = data
        .map(
          (item) => `
          <div class="magazine-card">
            <img src="${item.image || "assets/default.jpg"}" alt="${item.title}">
            <div class="magazine-info">
              <h3>${item.title}</h3>
              <p>${item.description || "No description"}</p>
              <p class="date">${item.date || ""}</p>
              <a href="#" class="read-more">Read More</a>
            </div>
          </div>`
        )
        .join("");
    } catch (err) {
      magazineContainer.innerHTML = `
        <div class="error-state">
          <h3>Unable to load magazine data</h3>
          <p>Check that your repository is public and the JSON path is correct.</p>
        </div>`;
      console.error("Error loading JSON:", err);
    }
  }

  loadMagazineData();
});
