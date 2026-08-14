import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center rounded-lg bg-sage-800 px-8 py-12 text-white sm:px-12 sm:py-16">
          <h1 className="mb-6 text-3xl font-medium leading-snug sm:text-4xl">
            Do you have any questions?
            <br />
            Want to talk more about your thought?
          </h1>
          <a
            href="mailto:whyeatlab@gmail.com"
            className="w-fit border-b border-white/40 text-lg transition-colors hover:border-white"
          >
            whyeatlab@gmail.com
          </a>
        </div>

        <div className="flex flex-col justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
