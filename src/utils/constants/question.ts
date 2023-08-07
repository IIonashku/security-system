import { EQuizType } from 'src/types/enums'
import { Quiz } from 'src/types/quiz'

export const quiz: Quiz = [
  {
    question: 'What type of property is this system for?',
    answers: [
      {
        type: EQuizType.radio,
        name: 'property_type',
        values: [
          {
            name: 'Owned',
            value: 'owned'
          },
          {
            name: 'Rented',
            value: 'rented'
          }
        ]
      }
    ]
  },
  {
    question: 'What is your zip code?',
    answers: [
      {
        type: EQuizType.zip,
        name: 'zip_code',
        values: ''
      }
    ]
  },
  {
    question: 'What is your installation preference?',
    answers: [
      {
        type: EQuizType.radio,
        name: 'installation_preference',
        values: [
          {
            name: 'Professional installation',
            value: 'professional'
          },
          {
            name: 'Self installation',
            value: 'self'
          }
        ]
      }
    ]
  },
  {
    question: 'What home security features would you like to have?',
    answers: [
      {
        type: EQuizType.select,
        name: 'features',
        values: [
          {
            name: 'Cameras',
            value: 'cameras'
          },
          {
            name: 'Motion Sensors',
            value: 'motion'
          },
          {
            name: 'Glass break sensors',
            value: 'glass'
          },
          {
            name: 'Doorbell Cameras',
            value: 'doorbell'
          }
        ]
      }
    ]
  },
  {
    question: 'What kind of System do you need?',
    answers: [
      {
        type: EQuizType.radio,
        name: 'system_type',
        values: [
          {
            name: 'Burglar / intrusion',
            value: 'burglar'
          },
          {
            name: 'Fire detection',
            value: 'fire'
          },
          {
            name: 'Both burglar and fire detection',
            value: 'both'
          }
        ]
      }
    ]
  },
  {
    question: 'How many entrances exist?',
    answers: [
      {
        type: EQuizType.radio,
        name: 'entrances',
        values: [
          {
            name: '1',
            value: '1'
          },
          {
            name: '2-4',
            value: '2-4'
          },
          {
            name: '5',
            value: '5'
          },
          {
            name: 'More than 5',
            value: '5+'
          }
        ]
      }
    ]
  },
  {
    question: 'What is your address?',
    answers: [
      {
        type: EQuizType.inputAddress,
        name: 'address',
        values: ''
      }
    ]
  },
  {
    question: 'Your Details',
    answers: [
      {
        type: EQuizType.input,
        name: 'first_name',
        values: ''
      },
      {
        type: EQuizType.input,
        name: 'last_name',
        values: ''
      },
      {
        type: EQuizType.email,
        name: 'email_address',
        values: ''
      },
      {
        type: EQuizType.phone,
        name: 'phone_home',
        values: ''
      }
    ]
  }
]
