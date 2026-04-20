/*ANIMACIÓN DEL BOTÓN DEL NAVEGADOR*/ 
const toggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});



/*BACKEND ENVÍO DE CORREOS*/ 

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value,
    };

    try {
      const res = await fetch("https://mentalgame-backend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Mensaje enviado correctamente");
        form.reset();
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }
  });
}



/* SECCIÓN DE LOS CURSOS*/ 

(function() {
  if (typeof jQuery == "undefined") {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    script.type = "text/javascript";
    script.onload = function() {
      jQuery(document).ready(loadCourses);
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    jQuery(document).ready(loadCourses);
  }
})();

function loadCourses() {
  jQuery.getJSON(
    "https://www.aepsis.com/functions/cursos_JSON.php?ref=3ca1e55c7878fb",
    function(data) {
      let container = jQuery("#cursos-container");
      container.empty();

      jQuery.each(data, function(index, curso) {
        let estrellas = "";
        for (let i = 0; i < curso.num_estrellas; i++) {
          estrellas += '<img src="https://www.aepsis.com/images/star.png" alt="estrella">';
        }

        let cursoHTML = `
          <div class="curso">
            <a href="${curso.urlinfo}" target="_blank">
              <img src="${curso.url_imagen}" alt="${curso.nombre}" />
            </a>
            <a href="${curso.urlinfo}" target="_blank">
              <h3>${curso.nombre}</h3>
            </a>
            <div class="info">
              <div class="estrellas">${estrellas}</div>
              <div class="alumnos">
                <img src="https://www.aepsis.com/wp-content/uploads/2019/01/user_icon.png" style="width:15px;">
                ${curso.num_alumnos}
              </div>
            </div>
            <div class="precio">
              <span class="precio-tachado">€${curso.precio_tachado}</span>
              <strong>€${curso.precio}</strong>
            </div>
          </div>
        `;

        container.append(cursoHTML);
      });
    }
  );
}
