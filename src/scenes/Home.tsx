import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Platform, StyleSheet, View } from 'react-native'
import Tts, { TtsEvent } from 'react-native-tts'
import { ButtonText } from 'components/ButtonText'
import { Text } from 'components/Text'

type Voice = {
  networkConnectionRequired?: boolean
  latency?: number
  notInstalled?: boolean
  quality: number
  language: string
  name: string
  id: string
}

const enVoices: Voice[] = [
  {
    language: 'en-AU',
    id: 'com.apple.ttsbundle.Karen-compact',
    quality: 300,
    name: 'Karen',
  },
  {
    language: 'en-GB',
    id: 'com.apple.ttsbundle.Daniel-compact',
    quality: 300,
    name: 'Daniel',
  },
  {
    language: 'en-IE',
    id: 'com.apple.ttsbundle.Moira-compact',
    quality: 300,
    name: 'Moira',
  },
  {
    language: 'en-IN',
    id: 'com.apple.ttsbundle.Rishi-compact',
    quality: 300,
    name: 'Rishi',
  },
  {
    language: 'en-US',
    id: 'com.apple.ttsbundle.Samantha-compact',
    quality: 300,
    name: 'Samantha',
  },
  {
    language: 'en-ZA',
    id: 'com.apple.ttsbundle.Tessa-compact',
    quality: 300,
    name: 'Tessa',
  },
]

const androidEnVoices: Voice[] = [
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpf-local',
    id: 'en-us-x-tpf-local',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iom-local',
    id: 'en-us-x-iom-local',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-sfg-network',
    id: 'en-us-x-sfg-network',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-US-language',
    id: 'en-US-language',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-sfg-local',
    id: 'en-us-x-sfg-local',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpd-local',
    id: 'en-us-x-tpd-local',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iob-local',
    id: 'en-us-x-iob-local',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iog-network',
    id: 'en-us-x-iog-network',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpd-network',
    id: 'en-us-x-tpd-network',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpc-network',
    id: 'en-us-x-tpc-network',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpf-network',
    id: 'en-us-x-tpf-network',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iog-local',
    id: 'en-us-x-iog-local',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iob-network',
    id: 'en-us-x-iob-network',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iol-network',
    id: 'en-us-x-iol-network',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-tpc-local',
    id: 'en-us-x-tpc-local',
  },
  {
    networkConnectionRequired: true,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iom-network',
    id: 'en-us-x-iom-network',
  },
  {
    networkConnectionRequired: false,
    quality: 400,
    latency: 200,
    notInstalled: false,
    language: 'en-US',
    name: 'en-us-x-iol-local',
    id: 'en-us-x-iol-local',
  },
]

const quiz = [
  'How well do you know about your school in the United State?',
  'What visa do you apply for?',
  "Why do you want to study for a master's degree?",
  'Why do you want to study in the United State?',
  'Why do you not want to bring your family to the United State?',
  'Why do you choose to study this major?',
  'Have you traveled overseas before?',
  'Why do you want to study in Iowa, not other states?',
  'Do you have any international English certificates?',
  'What company are you working for?',
  'What year will you graduate?',
  'What’s the address of the university you will study?',
  'How long did you work there?',
  'Why don’t you study in another country?',
  'What are you doing here?',
  'How do you pay the remaining cost?',
  'How can you adapt to the United State environment?',
  'How come you have to study English in the United State?',
  'Why do you choose this university, not another university?',
  'How long do you want to study in the United State?',
  'How does your wife have enough financial support for your children?',
  'What have you studied?',
  'Are you planning to work in the United State?',
  'What are you planning to study?',
  'Are you married?',
  "What's an F1 visa?",
  'What’s the cost of your study?',
  'Where do you live in the United State?',
  'Are you scared at COVID 19? How do you stay away at COVID 19?',
  'Tell me about what you are going to study in MIU?',
  'What do you know about the weather in IOWA State?',
  'What do you want to be in the future?',
  'How much money is available for your stay?',
  'Could you introduce yourself?',
  'Who will pay for your study?',
  'Do you want to stay back in the United State after finishing your studies?',
  'If a company gives you a very high salary and wants to keep you there? Are you sure you want to go back to Vietnam',
  'Tell me about a project that you are working on?',
  'What do you want to do after finishing your studies in the United State?',
  'How long did you stop studying? How much is your salary?',
  'What education qualifications do you hold?',
  'How do you know about MIU?',
  "Why don't you have any English certificate?",
  'How can you apply to MIU?',
  "You don't need to say anything, I already know this program",
  'I see all people come United State and looking for a job, no one come back to Vietnam',
]

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function HomeScreen() {
  useEffect(() => {
    // allVoices()

    Tts.addEventListener('tts-start', ttsEvents)
    Tts.addEventListener('tts-progress', ttsEvents)
    Tts.addEventListener('tts-finish', ttsEvents)
    Tts.addEventListener('tts-cancel', ttsEvents)

    // randomVoice()
  }, [])

  const [questions, setQuestions] = useState(quiz)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVoice, setSelectedVoice] = useState<Voice>()

  const reset = useCallback(() => {
    const shuffledArray = questions.sort((_, __) => 0.5 - Math.random())
    setQuestions(shuffledArray)
    setCurrentIndex(0)
  }, [questions])

  const stop = useCallback(() => {
    Tts.stop()
  }, [])

  const play = useCallback(() => {
    if (currentIndex + 1 > questions.length) {
      Tts.speak('Congratulation. Your visa approved!!!!!!')
      Alert.alert('Congratulation. Your visa approved!!!!!!')
      return
    }
    Tts.speak(questions[currentIndex])

    setCurrentIndex(currentIndex + 1)
  }, [currentIndex, questions])

  const ttsEvents = (event: TtsEvent) => {
    event
    // console.tron.log(event)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allVoices = async () => {
    const voices = await Tts.voices()
    console.tron.log(
      'voices',
      voices.filter(v => v.language.includes('en-US'))
    )

    Tts.engines().then(engines => console.tron.log('engines', engines))
  }

  const randomVoice = async () => {
    let voice: Voice | undefined = undefined
    if (Platform.OS === 'ios') {
      const max = enVoices.length - 1
      const index = randomIntFromInterval(0, max)
      voice = enVoices[index]
    } else if (Platform.OS === 'android') {
      const max = androidEnVoices.length - 1
      const index = randomIntFromInterval(0, max)
      voice = androidEnVoices[index]
    }

    if (!voice) {
      return
    }

    console.tron.log(voice)
    setSelectedVoice(voice)

    await Tts.setDefaultLanguage('en-US')
    await Tts.setDefaultVoice(voice.id)
  }

  return (
    <View style={styles.container}>
      <Text
        text={`id: ${selectedVoice?.id}\nname: ${selectedVoice?.name}\nlanguage: ${selectedVoice?.language}`}
        preset='header'
      />

      <ButtonText
        text='Random voice'
        onPress={() => {
          randomVoice()
        }}
        style={[styles.button, styles.reset]}
        preset='primary'
      />

      <ButtonText
        text='Reset'
        onPress={() => {
          reset()
        }}
        style={[styles.button, styles.reset]}
        preset='primary'
      />

      <ButtonText
        text='Stop'
        onPress={() => {
          stop()
        }}
        style={[styles.button, styles.reset]}
        preset='primary'
      />

      <Text text={`${currentIndex}/${questions.length}`} />

      <ButtonText
        text='Play'
        onPress={() => {
          play()
        }}
        style={[styles.button, styles.play]}
        preset='primary'
      />
    </View>
  )
}

export type HomeScreenParams = undefined

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: {
    backgroundColor: '#1da1f2',
    borderRadius: 25,
    width: '40%',
    height: 50,
    alignSelf: 'center',
  },
  reset: {
    margin: 20,
    backgroundColor: '#202327',
  },
  play: {
    margin: 50,
  },
})
