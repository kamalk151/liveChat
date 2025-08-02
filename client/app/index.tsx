"use client"
import Link from "next/link"
import UserEntryModal from "./userEntryModal"
import { useState } from "react"
import TermOfUse from "./termOfUse"

export default function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(true)
  const [openIndex, setOpenIndex] = useState<any>(null)

  const toggleIndex = (index: any) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqData = [
    {
      title: 'Is this platform appropriate for minors?',
      desc: 'This platform is designed for users who are 18 years and older. We value the safety and well-being of our users. It is strongly advised that minors should use age-appropriate platforms for online communications.',
    },
    {
      title: 'How does the platform maintain user safety?',
      desc: 'A 24/7 moderation system is dedicated to ensure user safety and create a secure environment for interactions.',
    },
    {
      title: 'Can I use PalHola on a global scale?',
      desc: 'Definitely, this platform allows users to make new friends around the world, experience different cultures and meet people from different walks of life.',
    },
    {
      title: 'How fast is the matching process on this platform?',
      desc: 'The matching process on this platform is fast and easy! Users can match with someone seamlessly with a stable internet connection.',
    },
    {
      title: 'Is PalHola free to use?',
      desc: 'Yes, users can use PalHola free of charge. Dive into random video chats, talk to strangers, and enjoy fun experiences with cool people without any subscription fees!',
    },
  ]

  const termData = [
    {
      title: 'PalHola Terms of Use',
      desc: <TermOfUse />,
    }
  ]

  return (
    <div className="mt-15 min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <UserEntryModal
        show={showModal}
        onClose={() => setShowModal(false) }
        title={'Enter your details'}
      />
      <h1 className="text-5xl font-bold text-gray-900 mb-4" title="PalHola - Random Chat!">
        Talk to strangers, make new friends!
      </h1>
      <p className="text-gray-700 max-w-xl mb-8">
        PalHola – lets you connect with random people for a one-on-one chat experience. Choose between text or video and start chatting now — no sign-up required!
      </p>
      
      <div className="mt-15 w-half text-2xl">
        <ul className="space-y-4 max-w-3xl mx-auto w-full">
        { faqData.map((faq, idx) => (
          <li key={idx} className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 w-full">
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none hover:bg-gray-50 transition"
              aria-expanded={openIndex === idx}
              aria-controls={`faq-content-${idx}`}
            >
              <span className="font-medium text-gray-900">{faq.title}</span>
              <span
                className={`transform transition-transform duration-300 text-gray-500 ${
                  openIndex === idx ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>
            <div
              id={`faq-content-${idx}`}
              className={`px-5 text-sm text-gray-600 transition-all duration-300 ${
                openIndex === idx ? 'pb-4 block' : 'h-0 overflow-hidden'
              }`}
            >
              <div className={openIndex === idx ? 'opacity-100' : 'opacity-0'}>
                {faq.desc}
              </div>
            </div>
          </li>
        ))}
        </ul>
      </div>
      
      <div className="mt-15 text-3xl flex flex-col sm:flex-row gap-4">
        <Link
          href="/chat"
          className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Text Chat
        </Link>
        <Link
          href="/video"
          className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Video Chat
        </Link>
      </div>
      <div className="mt-8 terms-of-use">
        <ul className="text-2xl space-y-4 max-w-3xl mx-auto w-full">
          { termData.map((faq, idx) => (
            <li key={`${idx}idx`} className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 w-full">
              <button
                onClick={() => toggleIndex(`${idx}idx`)}
                className="w-full flex justify-between  px-5 py-4 text-left focus:outline-none hover:bg-gray-50 transition"
                aria-expanded={openIndex === `${idx}idx`}
                aria-controls={`faq-content-${`${idx}idx`}`}
              >
                <span className="font-medium text-gray-900">{faq.title}</span>
                <span
                  className={`transform transition-transform duration-300 text-gray-500 ${
                    openIndex === `${idx}idx` ? 'rotate-90' : ''
                  }`}
                >
                  ▶
                </span>
              </button>
              <div
                id={`faq-content-${`${idx}idx`}`}
                className={`px-5 text-sm text-gray-600 transition-all duration-300 ${
                  openIndex === `${idx}idx`  ? 'pb-4 block' : 'h-0 overflow-hidden'
                }`}
              >
                <div className={openIndex === `${idx}idx` ? 'opacity-100' : 'opacity-0'}>
                  {faq.desc}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
    
  )
}
