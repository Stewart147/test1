 
    const addBtn = document.getElementById("addBtn");
    const imgUrlInput = document.getElementById("imgUrl");
    const imgGallery = document.getElementById("gallery");

    addBtn.addEventListener("click", () => {
      const url = imgUrlInput.value;
      if (!url) return;

      const newDiv = document.createElement("div");
      newDiv.className = "img-newDiv";

      const img = document.createElement("img");
      img.src = url;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
      newDiv.remove();
      });

      newDiv.appendChild(img);
      newDiv.appendChild(removeBtn);
      imgGallery.appendChild(newDiv);

      imgUrlInput.value = "";
    });
