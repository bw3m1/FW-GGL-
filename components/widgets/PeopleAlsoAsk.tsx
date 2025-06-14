import React, { useState } from 'react';
import './Widgets.css';

interface FAQItem {
  question: string;
  answer: string;
}

const PeopleAlsoAsk: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is a related question?",
      answer: "This is an example answer to the related question that provides additional context and information."
    },
    {
      question: "How does this widget work?",
      answer: "Click on any question to expand and see its answer. Only one answer can be expanded at a time."
    },
    {
      question: "Can I customize the questions?",
      answer: "Yes, you can modify the faqs array to include your own questions and answers."
    }
  ];

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="widget people-also-ask">
      <h3>People also ask</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className="question"
            onClick={() => toggleQuestion(index)}
          >
            {faq.question}
          </div>
          {expandedIndex === index && (
            <div className="answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PeopleAlsoAsk;
