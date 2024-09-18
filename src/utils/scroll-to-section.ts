export default function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(sectionId);
  if (element) {
    const yPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: yPosition, behavior: behavior });
  }
}
