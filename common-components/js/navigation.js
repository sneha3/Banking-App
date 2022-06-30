function activeNavItem(anchorTag) {
  const items = document.querySelectorAll(".inactive.active");

  if (items.length) {
    items[0].className = "inactive";
  }

  anchorTag.className = "inactive active";
}
