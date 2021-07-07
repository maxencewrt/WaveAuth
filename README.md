<p align="center">
  <img alt="react-native-nfc-rewriter" src="./images/nfc-rewriter-icon.png" width="300">
</p>
<p align="center">
  <h2 align="center">WaveAuth application</h2>
</p>

---

## How to Install

Lancer le projet sur mobile Android :

- Ouvrir un terminal et aller dans le répertoire projet
  exemple : cd Desktop/WaveAuth
  utiliser la commande <FONT color="red">"npm start"</FONT> pour lancer le serveur React

- Connecter son téléphone en ayant activé le mode développer
  Vérifier que le téléphone aparait en tapant la commande <FONT color="red">"adb devices"</FONT> dans un nouveau terminal

- Lancer Visual Studio + un terminal dans Visual Studio
  taper la commande <font color="red">"npx react-native run-android"</font>

  <strong>texte en gras ici</strong>.

## Problème connu + résolution

<p> error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup. Run CLI with --verbose flag for more details.
Error: Command failed: gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
</p>

## To do list

- Read NFC tags
  - uid
  - NFC technology
  - NDEF
- Write NDEF
  - RTD_URI
    - url, email, sms, tel, or custom scheme
  - RTD_TEXT
  - WIFI SIMPLE RECORD
- Toolkits
  - NfcA
    - Custom transceive
    - Erase all
    - Format to NDEF
  - IsoDep
    - Custom APDU (mostly Android)
- Save your own records
