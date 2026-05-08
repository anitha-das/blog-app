import { NavLink } from "react-router-dom";
import heroImg from "../assets/img.jpeg";
import {
  pageWrapper,
  pageTitleClass,
  headingClass,
  bodyText,
  mutedText,
  primaryBtn,
  secondaryBtn,
  cardClass,
  section,
  tagClass,
} from "../styles/common";

function Home() {
  return (
    <main className={pageWrapper}>
      <section className={`${section} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
        <div>
          <p className={tagClass}>Write. Share. Inspire.</p>

          <h1 className={`${pageTitleClass} mt-4`}>
            Your words can become someone's next idea.
          </h1>

          <p className={`${bodyText} text-lg mt-6 max-w-xl`}>
            A thought becomes powerful when it is shared. Read meaningful blogs,
            write your own articles, and build a place where ideas keep growing.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <NavLink to="/register" className={primaryBtn}>
              Start Writing
            </NavLink>

            <NavLink to="/login" className={secondaryBtn}>
              Explore Blogs
            </NavLink>
          </div>
        </div>

        <div className="bg-[#f5f5f7] rounded-2xl p-4">
          <img
            src={heroImg}
            alt="Blog writing"
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>
      </section>

      <section className={`${section} bg-[#f5f5f7] rounded-2xl px-8 py-10 text-center`}>
        <h2 className={headingClass}>
          One clear article can teach, encourage, and change the way someone thinks.
        </h2>

        <p className={`${bodyText} max-w-2xl mx-auto mt-4`}>
          Whether you are a reader, author, or admin, MyBlog gives you a simple
          and focused space to learn, express, and manage content.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardClass}>
          <h3 className={headingClass}>Read Better</h3>
          <p className={`${bodyText} mt-3`}>
            Discover useful articles and learn something valuable every day.
          </p>
        </div>

        <div className={cardClass}>
          <h3 className={headingClass}>Write Freely</h3>
          <p className={`${bodyText} mt-3`}>
            Share your knowledge, stories, and ideas with confidence.
          </p>
        </div>

        <div className={cardClass}>
          <h3 className={headingClass}>Manage Smartly</h3>
          <p className={`${bodyText} mt-3`}>
            Admins can control users and articles to keep the platform clean.
          </p>
        </div>
      </section>

      <section className="mt-14 text-center">
        <p className={mutedText}>
          Built for readers who think, authors who create, and admins who keep things organized.
        </p>
      </section>
    </main>
  );
}

export default Home;
