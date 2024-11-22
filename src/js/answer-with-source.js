if (document.getElementById("answerWithSource") != null) {

    const btn = document.getElementById("btnToggleSources");
    const header = document.getElementById("answerWithSourceHeader");
    const wrapper = document.getElementById("answerWithSourceWrapper");
    const main = document.getElementById("answerWithSourceMain");
    const aside = document.getElementById("answerWithSourceAside");

    let hidden = true;

    btn.onclick = toggleSources;
  
    function toggleSources() {
        wrapper.classList.toggle("grid");
        if (!hidden) {
            hidden = true;
            btn.innerText = "Vis uddrag";
            header.classList.replace("max-w-5xl", "max-w-3xl");
            wrapper.classList.replace("max-w-5xl", "max-w-3xl");
            // main.classList.replace("md:col-span-4", "md:col-span-3");
            // aside.classList.replace("md:col-span-1", "md:col-span-2");
            aside.classList.add("md:hidden");
            console.log(hidden);
        } else {
            hidden = false;
            btn.innerText = "Skjul uddrag";
            header.classList.replace("max-w-3xl", "max-w-5xl");
            wrapper.classList.replace("max-w-3xl", "max-w-5xl");
            // main.classList.replace("md:col-span-3", "md:col-span-4");
            // aside.classList.replace("md:col-span-2", "md:col-span-1");
            aside.classList.remove("md:hidden");
            console.log(hidden);
        }

    }
}