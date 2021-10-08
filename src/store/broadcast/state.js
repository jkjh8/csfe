export default function () {
  return {
    playFile: null,
    preview: false,
    previewFile: null,
    live: false,
    liveMode: 'Live',
    liveChannel: 1,
    ttsName: '',
    ttsText: '',
    ttsRate:  150,
    ttsVoice: null,
    ttsVoices: null,
    tts: {
      type: 'global',
      name: '',
      text: '',
      user_id: ''
    }
  }
}
