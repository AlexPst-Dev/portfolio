import { experience, stack } from "@/app/lib/content";
import { display, h2, wrap } from "./styles";

/** Career timeline next to the stack, grouped by what each tool is for. */
export default function Career() {
  return (
    <section id="parcours" aria-labelledby="parcours-titre" className="border-t border-white/10">
      <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-2`}>
        <div>
          <h2 id="parcours-titre" className={h2}>
            Le parcours
          </h2>
          <ol className="mt-10 grid gap-8">
            {experience.map((e) => (
              <li key={e.title} className="grid gap-1">
                <p className="text-[15px] tabular-nums text-flame">{e.period}</p>
                <h3 className={`${display} text-xl font-[700]`}>{e.title}</h3>
                <p className="max-w-[52ch] text-bone/80">{e.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid content-start gap-6 rounded-[24px] border-2 border-[#30271f] p-8">
          <h3 className="sr-only">La stack</h3>
          <dl className="grid gap-6">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="grid gap-2.5">
                <dt className="font-semibold text-[#c9bfb5]">{group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((t) => (
                      <li key={t} className="rounded-full bg-[#1f1914] px-3.5 py-1.5 text-[15px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
