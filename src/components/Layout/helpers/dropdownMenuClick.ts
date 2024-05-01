export const dropdownMenuClick = (
  e: React.MouseEvent<HTMLDivElement | HTMLLIElement, MouseEvent>,
) => {
  const target = e.target as Element;
  const isDropdownButton = target.matches("[data-dropdown-button]");

  if (!isDropdownButton && target.closest("[data-dropdown]") !== null) return;

  const currentDropdown = isDropdownButton ? target.closest("[data-dropdown]") : null;

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("active");
    }
  });

  if (currentDropdown) {
    currentDropdown.classList.toggle("active");
  }
};

export const dropdownMenuClick2 = () => {
  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    dropdown.classList.remove("active");
  });
};
