// TODO: Write your fs functions that affect the puppy data in this file and export them.
import { log } from 'node:console'
import type { Puppy, PuppyData, Data } from '../models/Puppy.ts'
import router from './server/routes/puppies.ts'
import * as fs from 'node:fs/promises'
// import { PuppyData } from '../models/Puppy.ts'
import { writeFile } from 'node:fs/promises'
import * as Path from 'node:path'

const dataPath = './storage/data.json'

export async function getAllPuppies(): Promise<Data | undefined> {
  try {
    // the happy path goes here
    const json = await fs.readFile(dataPath, 'utf8')
    const data = JSON.parse(json)

    // console.log(data)
    return data
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('getting puppies failed', error)
  }
}

export async function getPuppyById(id: number) {
  // router.get('/puppies/:id', async (req, res) => {
  const data = await getAllPuppies()

  if (data === undefined) {
    throw new Error('No puppies found')
  }

  const puppy = data.puppies.find((item: Puppy) => item.id === id)
  // console.log(puppy)

  if (puppy === undefined) {
    throw new Error(`No puppy with id ${id}`)
  }

  return puppy as Puppy
  // const { id } = useParams

  //   try {
  //     const puppy = getAllPuppies.find((puppy: { id: unknown }) => (puppy.id) === id)

  //     // the happy path goes here
  //     // const puppy = await getAllPuppies
  //     // const data = JSON.parse(json)
  //     return puppy
  //   } catch (error: unknown) {
  //     // Something bad has happened!
  //     console.log("puppy doesn't exist", error)
  //   }
  // // })
}

//write some functions to load puppies

export async function deletePuppy(id: number): Promise<void> {
  const data = await getAllPuppies()

  // if (data === undefined) {
  //   throw new Error('No puppies found')
  // }

  // filter out puppy with the matching id
  const filteredPuppies = data?.puppies.filter((item: Puppy) => item.id !== id)
  // console.log(filteredPuppies)
  // return filteredPuppies

  // replace the old data
  const newData = { puppies: filteredPuppies }

  console.log(newData)

  // convert to string
  const jsonString = JSON.stringify(newData, null, 2)
  console.log(jsonString)

  // write to the file
  await fs.writeFile(dataPath, jsonString)

  return

  // const filePath = './data.json'
  // const newData = filteredPuppies
  // await writeFile(Path.resolve(filePath), JSON.stringify(newData, null, 2))
  // } catch (err) {
  //   console.log(err)
  // }
}

export async function createPuppy(newPuppy: PuppyData): number {
  const data = await getAllPuppies()
  console.log(data)

  // find the highest id
  let highestNum = 0

  for (const puppy of data?.puppies) {
    if (puppy.id > highestNum) {
      highestNum = puppy.id
    }
  }

  // add 1 to highest id for the new id
  const newId = highestNum + 1
  console.log('new id', newId)

  // add new puppy

  const newPuppyId: Puppy = {...newPuppy, id: newId} 

  // push new puppy
  data.puppies.push(newPuppyId)

  // Convert data back to string
  const jsonString = JSON.stringify(data, null, 2)

  // then write the puppy to the file
  await fs.writeFile(dataPath, jsonString)

return newId
}

export default router
