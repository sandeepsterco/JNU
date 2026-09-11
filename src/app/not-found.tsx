import Link from "next/link";
import '@/styles/protected/globals.css'
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="not_found_page">
      <div className="not_found_container">
        <div className="content">
          <h1>404</h1>

          <h2 className="title30">Look like you're lost</h2>

          <p>
            The page you are looking for not available!
          </p>

          <div className="not_found_btn_wrap">
            <Link href="/" className="go_back__btn">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}