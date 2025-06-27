"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What happens when I run out of credits?",
    answer:
      "Free users get 100 credits per month that reset on the 1st. If you run out, you can upgrade to Pro for unlimited usage or wait for the monthly reset.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, all data processing happens locally in your browser. We never store or transmit your sensitive data to our servers.",
  },
  {
    question: "Do you offer team discounts?",
    answer: "Yes, we offer volume discounts for teams of 10 or more users. Contact our sales team for custom pricing.",
  },
]

export function PricingFAQ() {
  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about our pricing and plans.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
