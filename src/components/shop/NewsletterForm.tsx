"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="Your email address" className="input flex-1" required />
      <button type="submit" className="btn-md btn-primary flex-shrink-0">Subscribe</button>
    </form>
  );
}
