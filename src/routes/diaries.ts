import express from 'express'
import * as diaryServices from '../services/diary'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  diary === null ? res.send('Not found') : res.send(diary)
})

router.post('/', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body
    toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary({
      date,
      weather,
      visibility,
      comment
    })
    res.json(addedDiaryEntry)
  } catch (e) {
    res.status(400).send(e)
  }
})

export default router
