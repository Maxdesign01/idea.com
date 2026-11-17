import { HelpCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Can someone just read my teaser and steal my idea without paying?",
      a: "No. The public teaser contains only the high-level problem, target audience, and market opportunity—the kind of information that signals value without giving away the solution. The actionable 'secret sauce' (detailed SOPs, specific vendor names, financial models, code templates, or scripts) remains cryptographically locked in the protected payload until payment is executed.",
    },
    {
      q: "How does the payment and escrow system work?",
      a: "When a buyer clicks to unlock an idea, funds are charged via Stripe Checkout and placed into a neutral platform escrow account. For non-exclusive licenses, the files are unlocked instantly and funds are disbursed to the creator. For exclusive buyouts ($1,000+), an automated 72-hour review period begins. If the deliverables match the teaser, funds are transferred automatically to the creator's Stripe Connect bank account.",
    },
    {
      q: "Who are the people buying these ideas?",
      a: "Buyers include serial software founders (indie hackers looking for verified niches), media producers and YouTube channel operators (looking for unscripted reality show bibles), corporate innovation leaders (seeking fresh product angles), and private equity/search fund investors seeking high-margin service business models.",
    },
    {
      q: "What is the difference between Non-Exclusive and Exclusive Buyout?",
      a: "A Non-Exclusive license ($29–$299) allows multiple entrepreneurs to buy and study your blueprint (ideal for playbooks, agency models, and SaaS frameworks). An Exclusive Buyout ($1,000–$50,000+) sells 100% intellectual property ownership to a single buyer. Once purchased, the blueprint is unlisted permanently and our platform generates a binding digital IP Assignment Deed.",
    },
    {
      q: "How does the platform make money?",
      a: "IdeaSprint takes a standard 15% to 20% platform commission on completed blueprint sales and exclusive buyouts. We also earn through a 10% fee on enterprise bounty creation and a $49/month Buyer Pro subscription for venture studios and investors.",
    },
  ];

  return (
    <section className="py-20 border-t border-zinc-800 bg-zinc-950/70">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-orange-400" />
            Clear Answers
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Everything you need to know about safety, legal assignment, and payout mechanics.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm"
            >
              <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
