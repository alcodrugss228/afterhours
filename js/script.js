const ticketSection = document.querySelector("#tickets");
const ticketButton = document.querySelector("#ticketButton");
const ticketStatus = document.querySelector("#ticketStatus");
const ticketNote = document.querySelector("#ticketNote");
const ticketObject = document.querySelector("#ticketObject");

if (ticketSection && ticketButton && ticketStatus && ticketNote) {
  ticketButton.addEventListener("click", () => {
    ticketSection.classList.remove("ticket-activated");

    // Перезапускаем короткий визуальный эффект
    void ticketSection.offsetWidth;
    ticketSection.classList.add("ticket-activated");

    ticketStatus.textContent = "СИГНАЛ ПРИНЯТ";
    ticketNote.textContent =
      "Ты на частоте. Продажи ещё закрыты. Следи за следующим сигналом.";

    ticketButton.textContent = "ОЖИДАЙ СИГНАЛА";
    ticketButton.disabled = true;
    ticketButton.style.cursor = "default";
    ticketButton.style.opacity = "0.65";
  });
}

// Лёгкая реакция пропуска на движение мыши
if (ticketObject && window.matchMedia("(hover: hover)").matches) {
  ticketObject.addEventListener("pointermove", (event) => {
    const bounds = ticketObject.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    ticketObject.style.transform = `rotate(-1deg) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  });

  ticketObject.addEventListener("pointerleave", () => {
    ticketObject.style.transform = "";
  });
}

// Периодические цифровые помехи
const glitchTargets = document.querySelectorAll(
  ".hero h1, .about-heading, .lineup-poster h2, .event-info h2, .ticket-intro h2",
);

if (
  glitchTargets.length &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  glitchTargets.forEach((heading) => {
    const triggerGlitch = () => {
      heading.classList.remove("glitch-active");
      void heading.offsetWidth;
      heading.classList.add("glitch-active");

      window.setTimeout(() => {
        heading.classList.remove("glitch-active");
      }, 550);

      // Следующая помеха через случайный интервал
      window.setTimeout(triggerGlitch, 2500 + Math.random() * 6000);
    };

    window.setTimeout(triggerGlitch, 1500 + Math.random() * 4000);
  });
}
