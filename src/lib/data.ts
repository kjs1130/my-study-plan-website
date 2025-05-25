import { Book, Quote } from "./store"

export const books: Book[] = [
  {
    id: "1",
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    description:
      "The story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin far out in the Gulf Stream.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    tags: ["Classic", "Fiction", "Adventure"],
    emotions: ["Hopeful", "Inspired", "Calm"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  },
  {
    id: "2",
    title: "노인의 바다",
    author: "헤밍웨이",
    description:
      "쿠바의 한 늙은 어부가 멕시코 만류에서 거대한 청새치와 벌이는 치열한 사투를 그린 작품.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    tags: ["고전", "소설", "모험"],
    emotions: ["Hopeful", "Inspired", "Calm"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  },
  {
    id: "3",
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
    tags: ["Fiction", "Fantasy", "Self-discovery"],
    emotions: ["Hopeful", "Inspired", "Nostalgic"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  },
  {
    id: "4",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how to make time for new habits, overcome lack of motivation, and get back on track when you fall off course.",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    tags: ["Self-help", "Psychology", "Productivity"],
    emotions: ["Motivated", "Inspired", "Hopeful"],
    personalityTypes: ["INTJ", "ISTJ", "ESTJ"],
  },
  {
    id: "5",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A shepherd boy named Santiago travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids.",
    cover: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    tags: ["Fiction", "Adventure", "Spirituality"],
    emotions: ["Inspired", "Hopeful", "Calm"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  },
  {
    id: "6",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description:
      "Psychiatrist Viktor Frankl's memoir has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    tags: ["Psychology", "Memoir", "Philosophy"],
    emotions: ["Inspired", "Hopeful", "Calm"],
    personalityTypes: ["INFJ", "INTJ", "INFP"],
  },
  {
    id: "7",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description:
      "Timeless lessons on wealth, greed, and happiness. The book explores the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    tags: ["Finance", "Psychology", "Self-help"],
    emotions: ["Calm", "Inspired", "Hopeful"],
    personalityTypes: ["INTJ", "ISTJ", "ESTJ"],
  },
  {
    id: "8",
    title: "When Things Fall Apart",
    author: "Pema Chödrön",
    description:
      "A collection of talks on the Buddhist approach to dealing with difficult emotions and situations in life.",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
    tags: ["Spirituality", "Self-help", "Buddhism"],
    emotions: ["Sad", "Calm", "Hopeful"],
    personalityTypes: ["ESTP", "ISTP", "ENFP"],
  },
  {
    id: "9",
    title: "The Comfort Book",
    author: "Matt Haig",
    description:
      "A collection of consolations learned in hard times and suggestions for making the bad days better.",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    tags: ["Self-help", "Mental Health", "Comfort"],
    emotions: ["Sad", "Hopeful", "Calm"],
    personalityTypes: ["ESTP", "ISTP", "ENFP"],
  },
  {
    id: "10",
    title: "Reasons to Stay Alive",
    author: "Matt Haig",
    description:
      "A memoir about depression and how the author overcame it, offering hope and understanding to those who are struggling.",
    cover: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    tags: ["Memoir", "Mental Health", "Self-help"],
    emotions: ["Sad", "Hopeful", "Inspired"],
    personalityTypes: ["ESTP", "ISTP", "ENFP"],
  },
  {
    id: "11",
    title: "어린 왕자",
    author: "생텍쥐페리",
    description:
      "어린 왕자가 지구에 도착하여 조종사를 만나고, 사막에서 여우를 만나며 진정한 사랑과 책임에 대해 배워가는 이야기.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    tags: ["고전", "소설", "철학"],
    emotions: ["Hopeful", "Inspired", "Nostalgic"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  },
  {
    id: "12",
    title: "데미안",
    author: "헤르만 헤세",
    description:
      "주인공 에밀 싱클레어가 자신의 내면을 탐구하며 성장해 나가는 과정을 그린 성장 소설.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    tags: ["고전", "소설", "성장"],
    emotions: ["Inspired", "Hopeful", "Nostalgic"],
    personalityTypes: ["INFJ", "INFP", "ENFP"],
  }
]

export const quotes: Quote[] = [
  {
    id: "1",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    emotion: "Inspired",
  },
  {
    id: "2",
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    emotion: "Hopeful",
  },
  {
    id: "3",
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    emotion: "Motivated",
  },
  {
    id: "4",
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    emotion: "Calm",
  },
  {
    id: "5",
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    emotion: "Hopeful",
  },
  {
    id: "6",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    emotion: "Motivated",
  },
  {
    id: "7",
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    emotion: "Inspired",
  },
  {
    id: "8",
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    emotion: "Calm",
  },
  {
    id: "9",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    emotion: "Hopeful",
  },
  {
    id: "10",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    emotion: "Motivated",
  },
  {
    id: "11",
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    emotion: "Sad",
  },
  {
    id: "12",
    text: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    author: "Viktor E. Frankl",
    emotion: "Sad",
  },
  {
    id: "13",
    text: "인생은 당신이 만나는 모든 사람에게서 배울 수 있는 학교다.",
    author: "헤밍웨이",
    emotion: "Inspired",
  },
  {
    id: "14",
    text: "가장 중요한 것은 보이지 않는다.",
    author: "생텍쥐페리",
    emotion: "Hopeful",
  }
] 