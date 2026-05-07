import { mutedText, navBrandClass } from "../styles/common";

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className={navBrandClass}>MyBlog</p>
        <p className={mutedText}>© 2026 MyBlog</p>
      </div>
    </footer>
  );
}

export default Footer;
