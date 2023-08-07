export type Answer = {
  type: string
  name: string
  values: { name: string; value: string }[] | string
}

export type Question = {
  question: string
  answers: Answer[]
}

export type Quiz = Question[]

// Здесь мы создаем Record с ключами `EQuizType` (перечисление) и значениями типа `Answer`.
type QuizTypeMapping = Record<EQuizType, Answer>

// Теперь, чтобы удостовериться, что каждый тип из `EQuizType` используется правильно, создадим тип для всех типов вопросов.
export type QuizTypes = {
  [Key in EQuizType]: QuizTypeMapping[Key]
}
