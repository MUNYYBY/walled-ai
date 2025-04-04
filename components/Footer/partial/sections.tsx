interface SocialIcon {
  src: string;
  alt: string;
  href?: string;
}

interface FooterSection {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

const footer_sections: FooterSection[] = [
  {
    title: "Guardrails",
    links: [
      { title: "Walled Protect", href: "#contactEmailSection" },
      { title: "Walled Redact", href: "#contactEmailSection" },
      { title: "Walled Correct", href: "#contactEmailSection" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Blogs", href: "#contactEmailSection" },
      { title: "Research", href: "#contactEmailSection" },
      { title: "News", href: "#contactEmailSection" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "#contactEmailSection" },
      { title: "Pricing", href: "#contactEmailSection" },
      { title: "Contact Us", href: "#contactEmailSection" },
    ],
  },
  {
    title: "More",
    links: [
      { title: "Privacy Policy", href: "#contactEmailSection" },
      { title: "Terms of Use", href: "#contactEmailSection" },
    ],
  },
];

export default footer_sections;
