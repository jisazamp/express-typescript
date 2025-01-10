import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (
  id: number
): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id)
  if (entry != null) {
    const { comment, ...restOfEntry } = entry
    return restOfEntry
  }
  return undefined
}

export const getEntriesWithoutSensitiveInfo =
  (): NonSensitiveInfoDiaryEntry[] =>
    diaries.map(({ id, weather, date, visibility }: DiaryEntry) => ({
      id,
      weather,
      date,
      visibility
    }))

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: diaries.length,
    ...newDiaryEntry
  }

  diaries.push(newDiary)
  return newDiary
}
