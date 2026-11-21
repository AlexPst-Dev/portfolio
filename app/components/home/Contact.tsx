import Spark from "@/app/components/Spark";
import { profile } from "@/app/lib/content";
import ContactForm from "./ContactForm";
import { display } from "./styles";

/** The spark, big, and a short form; the address stays visible for those who prefer email. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="border-t border-white/10 px-5 pb-20 pt-24 md:px-10">
      <div className="mx-auto grid max-w-[1440px] justify-items-center gap-8 text-center">
        <Spark size={180} />
        <h2
          id="contact-titre"
          className={`${display} max-w-[16ch] text-[clamp(2.2rem,5.4vw,5rem)] font-[800] leading-[0.95] tracking-[-0.035em]`}
        >
          Une idée ? Allumons-la.
        </h2>
        <p className="max-w-[44ch] text-xl leading-snug text-bone/85">
          Décrivez votre projet en quelques lignes, Alexandre vous répond avec une première estimation.
        </p>
        <div className="w-full max-w-[720px] rounded-[24px] border-2 border-[#30271f] bg-[#120e0b] p-6 text-left md:p-9">
          <ContactForm email={profile.email} />
        </div>
      </div>
    </section>
  );
}
