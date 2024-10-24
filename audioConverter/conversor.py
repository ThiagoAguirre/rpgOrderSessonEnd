from gtts import gTTS


def texto_para_audio(arquivo_txt, arquivo_audio):
    with open(arquivo_txt, 'r', encoding='utf-8') as file:
        texto = file.read()
     
    tts = gTTS(text=texto, lang='pt', slow=False)
    
    tts.save(arquivo_audio)
    print(f"Áudio salvo como {arquivo_audio}")

arquivo_txt = '../assets/rpgText/codification.txt'  
arquivo_audio = 'saida_audio.mp3'  

texto_para_audio(arquivo_txt, arquivo_audio)
