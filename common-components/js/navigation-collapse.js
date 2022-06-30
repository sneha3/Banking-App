function nav_expand() {
    let labels = document.getElementsByClassName("common-navigation-label-nav-desktop-collapse");
    let nav = document.getElementById("common-navigation-nav-bar-collapse");
    let content = document.getElementById("dynamiccontent");
    let left_arrow = document.getElementById("nav-left-double-arrow");
    let right_arrow = document.getElementById("nav-right-double-arrow");
    let icon_text = document.getElementsByClassName("common-navigation-nav-bar-collapse-tooltiptext");
    if (nav.style.zIndex === "0") {
        nav.style.zIndex = "2";
        nav.style.width = "13rem";
        nav.style.position = "absolute";
        content.style.paddingLeft = "3.5rem";

        left_arrow.style.display = "inline";
        right_arrow.style.display = "none";

        Array.from(icon_text).forEach((icon) => {
            icon.style.display = "none";
        })

    } else {
        nav.style.zIndex = "0";
        nav.style.width = "3.5rem";
        nav.style.position = "relative";
        content.style.paddingLeft = "0rem";

        left_arrow.style.display = "none";
        right_arrow.style.display = "inline";

        Array.from(icon_text).forEach((icon) => {
            icon.style.display = "inline";
        })
    }

    Array.from(labels).forEach((label) => {
        if (label.style.display === "none") {
            label.style.display = "inline";
        } else {
            label.style.display = "none";
        }
    })
}
  