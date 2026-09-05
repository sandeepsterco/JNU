import Link from "next/link";
import "./coming-soon.css";

export default function ComingSoon() {
  return (
    <main className="coming_soon_page">
      <div className="coming_soon_content">
        <h1 className="coming_soon_title">
          Coming Soon
        </h1>

        <p className="coming_soon_description">
          We are currently working on this page. Please stay tuned!
        </p>

        <div className="coming_soon_actions">
          <Link href="/" className="go_back__btn">
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}