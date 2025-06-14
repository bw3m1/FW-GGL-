import React, { useState, useEffect } from 'react';
import './Widgets.css';

interface FAQItem {
  question: string;
  answer: string;
}

const PeopleAlsoAsk: React.FC<{ searchQuery?: string }> = ({ searchQuery }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    // Simulate fetching related questions based on search query
    const getRelatedQuestions = (query: string) => {
      const defaultQuestions = [
        {
          question: `What is ${query}?`,
          answer: `Here's a comprehensive explanation about ${query}...`
        },
        {
          question: `How does ${query} work?`,
          answer: `${query} works by following these principles...`
        },
        {
          question: `Why is ${query} important?`,
          answer: `${query} is important because...`
        }
      ];
      return defaultQuestions;
    };

    if (searchQuery) {
      setFaqs(getRelatedQuestions(searchQuery));
    }
  }, [searchQuery]);

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!faqs.length) return null;

  return (
    <div className="widget people-also-ask">
      <h3>People also ask</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="question" onClick={() => toggleQuestion(index)}>
            {faq.question}
          </div>
          <div className={`answer ${expandedIndex === index ? 'expanded' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleAlsoAsk;
